import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';

interface InvitationGateProps {
  onOpenComplete: () => void;
}

// Coordinate constants in SVG viewBox (0 0 360 500)
// Ribbon sits in dedicated divider zone at Y = 150 (between invitation intro and couple's names)
const KNOT_X = 180;
const KNOT_Y = 150;
const RESTING_TIP_X = 214;
const RESTING_TIP_Y = 202;
const RESTING_DIST = Math.hypot(RESTING_TIP_X - KNOT_X, RESTING_TIP_Y - KNOT_Y); // ~62px
const PULL_THRESHOLD = 50; // Drag distance in SVG units to release

export const InvitationGate: React.FC<InvitationGateProps> = ({ onOpenComplete }) => {
  // Phases: 'idle' -> 'dragging' -> 'untying' -> 'revealed'
  const [phase, setPhase] = useState<'idle' | 'dragging' | 'untying' | 'revealed'>('idle');
  const [hasInteractionStarted, setHasInteractionStarted] = useState(false);
  const [currentTip, setCurrentTip] = useState({ x: RESTING_TIP_X, y: RESTING_TIP_Y });
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; startTipX: number; startTipY: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasNavigatedRef = useRef(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Cleanup timers & animation frame loops on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Prevent browser scrolling and gestures strictly while actively pulling the ribbon
  useEffect(() => {
    if (isPointerActive) {
      const preventTouch = (e: TouchEvent) => {
        if (e.cancelable) e.preventDefault();
      };
      document.addEventListener('touchmove', preventTouch, { passive: false });
      return () => {
        document.removeEventListener('touchmove', preventTouch);
      };
    }
  }, [isPointerActive]);

  // Navigate to main invitation page (strictly once)
  const navigateToMain = useCallback(() => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    onOpenComplete();
  }, [onOpenComplete]);

  // Immediate skip option (visible only before pull interaction starts)
  const handleSkip = useCallback(() => {
    if (hasInteractionStarted) return;
    setHasInteractionStarted(true);
    navigateToMain();
  }, [hasInteractionStarted, navigateToMain]);

  // Progressive untying release sequence and exact 2-second auto-transition
  const triggerUntieSequence = useCallback(() => {
    if (phase === 'untying' || phase === 'revealed' || hasNavigatedRef.current) return;

    setHasInteractionStarted(true);
    setPhase('untying');
    setPullProgress(1);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore
      }
    }

    if (prefersReducedMotion) {
      setPhase('revealed');
      transitionTimerRef.current = setTimeout(() => {
        navigateToMain();
      }, 2000);
      return;
    }

    // 1. Ribbon unloops and slides smoothly off the card (0 - 750ms)
    // 2. Untie completes -> Completed state remains visible for exactly 2 seconds
    // 3. Automatically transitions to the main invitation page
    setTimeout(() => {
      setPhase('revealed');

      transitionTimerRef.current = setTimeout(() => {
        navigateToMain();
      }, 2000);
    }, 750);
  }, [phase, prefersReducedMotion, navigateToMain]);

  // Accessible button handler
  const handleAccessibleOpen = () => {
    if (phase !== 'idle') return;
    setHasInteractionStarted(true);
    triggerUntieSequence();
  };

  // Convert client screen coordinates to exact SVG coordinates via CTM
  const getSvgCoordinates = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  };

  // Spring back to resting tied state if released early
  const springBackToRest = useCallback(() => {
    let tipX = currentTip.x;
    let tipY = currentTip.y;
    let vx = 0;
    let vy = 0;
    const targetX = RESTING_TIP_X;
    const targetY = RESTING_TIP_Y;
    const k = 0.22;
    const damping = 0.72;

    const step = () => {
      const ax = (targetX - tipX) * k;
      const ay = (targetY - tipY) * k;
      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;
      tipX += vx;
      tipY += vy;

      const currentDist = Math.hypot(tipX - KNOT_X, tipY - KNOT_Y);
      const pullDist = currentDist - RESTING_DIST;
      const p = Math.max(0, Math.min(1, pullDist / PULL_THRESHOLD));

      setCurrentTip({ x: tipX, y: tipY });
      setPullProgress(p);

      if (Math.hypot(tipX - targetX, tipY - targetY) < 0.4 && Math.hypot(vx, vy) < 0.4) {
        setCurrentTip({ x: targetX, y: targetY });
        setPullProgress(0);
        setPhase('idle');
        return;
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
  }, [currentTip]);

  // -------------------------------------------------------------
  // Pointer & Touch Handlers
  // -------------------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent<SVGElement>) => {
    if (phase !== 'idle' || hasNavigatedRef.current) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    // Hide skip animation option immediately upon interaction
    setHasInteractionStarted(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const svgPt = getSvgCoordinates(e.clientX, e.clientY);
    dragStartRef.current = {
      pointerX: svgPt.x,
      pointerY: svgPt.y,
      startTipX: currentTip.x,
      startTipY: currentTip.y,
    };

    setIsPointerActive(true);
    setPhase('dragging');
  };

  const handlePointerMove = (e: React.PointerEvent<SVGElement>) => {
    if (!isPointerActive || !dragStartRef.current || phase === 'untying' || phase === 'revealed') return;

    const currentSvgPt = getSvgCoordinates(e.clientX, e.clientY);
    const dx = currentSvgPt.x - dragStartRef.current.pointerX;
    const dy = currentSvgPt.y - dragStartRef.current.pointerY;

    const newTipX = dragStartRef.current.startTipX + dx;
    const newTipY = dragStartRef.current.startTipY + dy;

    const currentDist = Math.hypot(newTipX - KNOT_X, newTipY - KNOT_Y);
    const pullDist = currentDist - RESTING_DIST;
    const p = Math.max(0, Math.min(1.15, pullDist / PULL_THRESHOLD));

    setCurrentTip({ x: newTipX, y: newTipY });
    setPullProgress(p);

    if (p >= 1.0) {
      setIsPointerActive(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
      triggerUntieSequence();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGElement>) => {
    if (!isPointerActive) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    setIsPointerActive(false);

    if (pullProgress >= 0.7) {
      triggerUntieSequence();
    } else {
      springBackToRest();
    }
    dragStartRef.current = null;
  };

  // -------------------------------------------------------------
  // Coordinated Symmetrical Ribbon Geometry
  // -------------------------------------------------------------
  // Right Tail Curve (anchored at knot `185, 154`, follows fingertip)
  const tailCp1X = 185 + (currentTip.x - 185) * 0.28 + 10 * (1 - pullProgress);
  const tailCp1Y = 154 + (currentTip.y - 154) * 0.42;
  const tailCp2X = 185 + (currentTip.x - 185) * 0.72;
  const tailCp2Y = 154 + (currentTip.y - 154) * 0.82;
  const rightTailPath = `M 185,154 C ${tailCp1X},${tailCp1Y} ${tailCp2X},${tailCp2Y} ${currentTip.x},${currentTip.y}`;

  // Swallowtail notch angle and points at right tail tip
  const tailTangentAngle = Math.atan2(currentTip.y - tailCp2Y, currentTip.x - tailCp2X);
  const nx = -Math.sin(tailTangentAngle);
  const ny = Math.cos(tailTangentAngle);
  const hw = 14;
  const notchDepth = 11;
  const pNotchLeft = `${currentTip.x + nx * hw},${currentTip.y + ny * hw}`;
  const pNotchRight = `${currentTip.x - nx * hw},${currentTip.y - ny * hw}`;
  const pNotchApex = `${currentTip.x - Math.cos(tailTangentAngle) * notchDepth},${currentTip.y - Math.sin(tailTangentAngle) * notchDepth}`;
  const pNotchOuter = `${currentTip.x + Math.cos(tailTangentAngle) * 9},${currentTip.y + Math.sin(tailTangentAngle) * 9}`;
  const rightNotchMaskPoints = `${pNotchLeft} ${pNotchApex} ${pNotchRight} ${pNotchOuter}`;

  // Right Loop: unthreads progressively into the knot
  const loopScale = Math.max(0.01, 1 - pullProgress * 0.98);
  const loopW = 66 * loopScale;
  const loopH = 20 * Math.max(0.05, 1 - pullProgress * 0.85);
  const rCp1X = 184 + loopW * 0.45;
  const rCp1Y = 148 - loopH * 1.1;
  const rApexX = 184 + loopW;
  const rApexY = 150;
  const rCp2X = 184 + loopW * 0.65;
  const rCp2Y = 152 + loopH * 0.95;
  const rightLoopPath = `M 184,148 C ${rCp1X},${rCp1Y} ${rApexX},${rApexY - loopH * 0.2} ${rApexX},${rApexY} C ${rApexX},${rApexY + loopH * 0.4} ${rCp2X},${rCp2Y} 184,152`;

  // Left Loop: perfectly symmetrical to right loop, with subtle knot pull tension
  const leftTug = pullProgress * 4;
  const leftLoopW = 66;
  const leftLoopH = 20;
  const lCp1X = 176 + leftTug - leftLoopW * 0.45;
  const lCp1Y = 148 - leftLoopH * 1.1;
  const lApexX = 176 + leftTug - leftLoopW;
  const lApexY = 150;
  const lCp2X = 176 + leftTug - leftLoopW * 0.65;
  const lCp2Y = 152 + leftLoopH * 0.95;
  const leftLoopPath = `M ${176 + leftTug},148 C ${lCp1X},${lCp1Y} ${lApexX},${lApexY - leftLoopH * 0.2} ${lApexX},${lApexY} C ${lApexX},${lApexY + leftLoopH * 0.4} ${lCp2X},${lCp2Y} ${176 + leftTug},152`;

  // Left Tail: drapes compactly to the left, terminating safely before the names
  const leftTailPath = `M ${175 + leftTug * 0.5},154 C ${164 + leftTug * 0.3},172 154,188 146,202`;

  const isRibbonReleased = phase === 'untying' || phase === 'revealed';
  const isCardRevealed = phase === 'revealed';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-between py-2 px-3 sm:py-5 sm:px-6 md:px-8 select-none overflow-y-auto overflow-x-hidden min-h-dvh"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }}
        style={{ backgroundColor: '#F8F3E9' }}
      >
        {/* Subtle physical paper texture background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#541820 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Ambient atmospheric depth glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.7) 0%, rgba(248,243,233,0) 72%)',
          }}
        />

        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="polite">
          {isCardRevealed
            ? 'The wedding invitation is open. R.S. Manoj & K. Ranjani invite you to their wedding on Sunday, 22 November 2026 from 06:00 AM to 07:15 AM at Sri Lakshmi Mahal, Kovilpalayam, Coimbatore.'
            : 'Wedding invitation. Pull the ribbon tail to untie your invitation.'}
        </div>

        {/* ========================================================================= */}
        {/* TOP BAR: BALANCED RESPONSIVE HEADER */}
        {/* ========================================================================= */}
        <header className="relative w-full max-w-lg mx-auto text-center z-20 pt-1 sm:pt-2 px-2">
          {/* Discreet "Skip animation" in top-right corner (hidden once pulled) */}
          <AnimatePresence>
            {!hasInteractionStarted && (
              <motion.div
                key="skip-wrapper"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                className="absolute -top-1 right-1 sm:top-1 sm:right-3 z-30"
              >
                <button
                  onClick={handleSkip}
                  className="font-body text-[8px] sm:text-[9.5px] tracking-[0.16em] uppercase text-[#541820]/45 hover:text-[#541820] transition-colors py-1 px-1.5 hover:underline underline-offset-2 focus:outline-none cursor-pointer"
                  aria-label="Skip animation and view invitation directly"
                >
                  Skip animation
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered Top Label */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-5 h-[0.5px] bg-[#541820]/30" />
            <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] uppercase font-body font-light text-[#95666A]">
              Wedding Invitation
            </span>
            <span className="w-5 h-[0.5px] bg-[#541820]/30" />
          </div>

          {/* Title: Elegant, Centered Serif */}
          <h1 className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#351015] font-light leading-snug max-w-xs sm:max-w-sm mx-auto">
            A Little Something, Tied with Love
          </h1>

          {/* Instructions: Compact Uppercase */}
          <p className="font-body text-[8px] sm:text-[9.5px] tracking-[0.18em] uppercase text-[#95666A] font-light mt-0.5 sm:mt-1">
            Pull the ribbon to untie your invitation.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* CENTER STAGE: STATIONERY CARD WRAPPED IN PROPORTIONAL SATIN RIBBON */}
        {/* ========================================================================= */}
        <div className="relative my-auto flex items-center justify-center w-[calc(100vw-32px)] max-w-[310px] sm:max-w-[360px] aspect-[1/1.388] z-30 [perspective:1400px]">
          {/* Card Physical Shadow */}
          <motion.div
            className="absolute -inset-3 sm:-inset-5 rounded-2xl pointer-events-none"
            animate={{
              opacity: isCardRevealed ? 0.28 : 0.22,
              filter: isCardRevealed ? 'blur(36px)' : 'blur(24px)',
              scale: isCardRevealed ? 1.04 : 1,
            }}
            style={{
              background: 'radial-gradient(ellipse at 50% 55%, rgba(53,16,21,0.55) 0%, rgba(53,16,21,0.18) 55%, transparent 75%)',
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ======================================================================= */}
          {/* BASE COTTON INVITATION FOLIO */}
          {/* ======================================================================= */}
          <div
            className="relative w-full h-full rounded-[4px] overflow-hidden flex flex-col justify-between py-3 px-3.5 sm:py-5 sm:px-6 text-center"
            style={{
              backgroundColor: '#FAF6F0',
              boxShadow: '0 16px 40px -8px rgba(53,16,21,0.2), 0 4px 12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(84,24,32,0.1)',
            }}
          >
            {/* Fine letterpress gold foil framing */}
            <div className="absolute inset-2 sm:inset-3 border border-[#B69A61]/45 pointer-events-none" />
            <div className="absolute inset-[11px] sm:inset-[15px] border border-dashed border-[#541820]/15 pointer-events-none" />

            {/* Corner filigree accents */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#B69A61]/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#B69A61]/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#B69A61]/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#B69A61]/60 pointer-events-none" />

            {/* ------------------------------------------------------------------- */}
            {/* INVITATION CONTENT: STRICT CLEAR VERTICAL HIERARCHY */}
            {/* ------------------------------------------------------------------- */}
            <motion.div
              className="relative z-10 w-full h-full flex flex-col justify-between items-center py-0.5"
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: isCardRevealed ? 1 : 0.65,
                scale: isCardRevealed ? 1 : 0.98,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* TOP ZONE: 1. Family introduction & 2. Invitation message */}
              <div className="flex flex-col items-center pt-1">
                <span className="font-body text-[7.5px] sm:text-[9px] tracking-[0.25em] uppercase text-[#95666A] font-light">
                  Together With Our Families
                </span>
                <div className="w-8 h-[0.5px] bg-[#B69A61]/50 my-1" />
                <p className="font-body text-[8px] sm:text-[9.5px] tracking-[0.16em] uppercase text-[#541820]/75 font-light">
                  We Invite You To Celebrate The Wedding Of
                </p>
              </div>

              {/* DEDICATED VISUAL GAP FOR RIBBON (Ribbon wraps here at Y = 150) */}
              <div className="w-full h-14 sm:h-16 shrink-0 pointer-events-none" aria-hidden="true" />

              {/* MIDDLE ZONE: 3. Couple's Names (Sitting below ribbon, NEVER obscured) */}
              <div className="flex flex-col items-center py-0.5">
                <motion.h2
                  className="font-serif italic text-2xl sm:text-3xl text-[#351015] font-light leading-none tracking-normal"
                  animate={{
                    y: isCardRevealed ? 0 : 3,
                    opacity: isCardRevealed ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  R.S. Manoj
                </motion.h2>

                <div className="flex items-center justify-center gap-2 my-0.5">
                  <span className="w-4 h-[0.5px] bg-[#B69A61]/40" />
                  <span className="font-serif italic text-sm sm:text-base text-[#95666A] opacity-90">&amp;</span>
                  <span className="w-4 h-[0.5px] bg-[#B69A61]/40" />
                </div>

                <motion.h2
                  className="font-serif italic text-2xl sm:text-3xl text-[#351015] font-light leading-none tracking-normal"
                  animate={{
                    y: isCardRevealed ? 0 : 3,
                    opacity: isCardRevealed ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  K. Ranjani
                </motion.h2>
              </div>

              {/* LOWER ZONE: 4. Date, 5. Time, 6. Venue */}
              <div className="flex flex-col items-center gap-0.5 w-full pb-1">
                <div className="w-10 h-[0.5px] bg-[#B69A61]/50 mb-1" />

                {/* 4. Wedding Date */}
                <motion.p
                  className="font-serif italic text-base sm:text-lg text-[#541820] font-light leading-tight"
                  animate={{ opacity: isCardRevealed ? 1 : 0.85 }}
                >
                  Sunday, 22 November 2026
                </motion.p>

                {/* 5. Wedding Time */}
                <p className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] text-[#95666A] uppercase font-light mt-0.5">
                  06:00 AM – 07:15 AM
                </p>

                {/* 6. Venue */}
                <p className="font-serif italic text-[10.5px] sm:text-xs text-[#541820]/75 mt-0.5">
                  Sri Lakshmi Mahal · Kovilpalayam, Coimbatore
                </p>
              </div>
            </motion.div>
          </div>

          {/* ======================================================================= */}
          {/* PROPORTIONAL SATIN RIBBON (Dedicated Y = 150 divider band) */}
          {/* ======================================================================= */}
          <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
            <svg
              ref={svgRef}
              viewBox="0 0 360 500"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full overflow-visible select-none pointer-events-none"
            >
              <defs>
                {/* Deep Burgundy Satin Base Gradient */}
                <linearGradient id="satinFabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#35080E" />
                  <stop offset="22%" stopColor="#581620" />
                  <stop offset="48%" stopColor="#7B1E2D" />
                  <stop offset="74%" stopColor="#541820" />
                  <stop offset="100%" stopColor="#2A060B" />
                </linearGradient>

                {/* Horizontal Waist Band Gradient */}
                <linearGradient id="satinWaistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#32070C" />
                  <stop offset="20%" stopColor="#5E1823" />
                  <stop offset="45%" stopColor="#802130" />
                  <stop offset="70%" stopColor="#541820" />
                  <stop offset="100%" stopColor="#260408" />
                </linearGradient>

                {/* Satin Specular Lustre Reflection */}
                <linearGradient id="satinLusterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B83E54" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#E27287" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#9E2F42" stopOpacity="0.2" />
                </linearGradient>

                {/* Knot Radial Shading */}
                <radialGradient id="satinKnotGrad" cx="38%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#822232" />
                  <stop offset="52%" stopColor="#541820" />
                  <stop offset="85%" stopColor="#32080D" />
                  <stop offset="100%" stopColor="#200406" />
                </radialGradient>

                {/* Contact Drop Shadow Filter */}
                <filter id="satinContactShadow" x="-20%" y="-20%" width="150%" height="150%">
                  <feDropShadow dx="0" dy="3.5" stdDeviation="3.2" floodColor="#220407" floodOpacity="0.38" />
                </filter>

                {/* Knot Drop Shadow */}
                <filter id="knotDropShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#180305" floodOpacity="0.45" />
                </filter>

                {/* Right tail swallowtail V-notch mask */}
                <mask id="rightTailNotchMask">
                  <rect x="-100" y="-100" width="560" height="700" fill="white" />
                  <polygon points={rightNotchMaskPoints} fill="black" />
                </mask>

                {/* Left tail swallowtail V-notch mask */}
                <mask id="leftTailNotchMask">
                  <rect x="-100" y="-100" width="560" height="700" fill="white" />
                  <polygon points="135,206 146,193 157,206 146,214" fill="black" />
                </mask>
              </defs>

              {/* ------------------------------------------------------------- */}
              {/* LEFT RIBBON STRAND (Band + Left Loop + Left Tail) */}
              {/* ------------------------------------------------------------- */}
              <g
                style={{
                  transformOrigin: '180px 150px',
                  transform: isRibbonReleased ? 'translate3d(-290px, 25px, 0) rotate(-14deg)' : 'translate3d(0,0,0)',
                  opacity: isRibbonReleased ? 0 : 1,
                  transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease',
                }}
              >
                {/* Horizontal Left Band (Height = 26, centered at Y = 150) */}
                <rect
                  x="-3"
                  y="137"
                  width="183"
                  height="26"
                  fill="url(#satinWaistGrad)"
                  filter="url(#satinContactShadow)"
                />
                <rect x="-3" y="137" width="183" height="1" fill="rgba(255,200,200,0.25)" />
                <rect x="-3" y="162" width="183" height="1" fill="rgba(0,0,0,0.35)" />

                {/* Left Tail Shadow & Fabric (Safe length: ends at Y = 202) */}
                <path
                  d={leftTailPath}
                  fill="none"
                  stroke="#220407"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  opacity="0.32"
                  transform="translate(0, 3.5)"
                  filter="url(#satinContactShadow)"
                  mask="url(#leftTailNotchMask)"
                />
                <path
                  d={leftTailPath}
                  fill="none"
                  stroke="url(#satinFabricGrad)"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  mask="url(#leftTailNotchMask)"
                />
                <path
                  d={leftTailPath}
                  fill="none"
                  stroke="url(#satinLusterGrad)"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  opacity="0.65"
                  mask="url(#leftTailNotchMask)"
                />

                {/* Symmetrical Left Loop Shadow & Fabric */}
                <path
                  d={leftLoopPath}
                  fill="none"
                  stroke="#220407"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.28"
                  transform="translate(0, 3)"
                  filter="url(#satinContactShadow)"
                />
                <path
                  d={leftLoopPath}
                  fill="none"
                  stroke="url(#satinFabricGrad)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={leftLoopPath}
                  fill="none"
                  stroke="url(#satinLusterGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </g>

              {/* ------------------------------------------------------------- */}
              {/* RIGHT RIBBON STRAND (Band + Right Loop + Grabbed Tail) */}
              {/* ------------------------------------------------------------- */}
              <g
                style={{
                  transformOrigin: '180px 150px',
                  transform: isRibbonReleased ? 'translate3d(290px, 30px, 0) rotate(16deg)' : 'translate3d(0,0,0)',
                  opacity: isRibbonReleased ? 0 : 1,
                  transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease',
                }}
              >
                {/* Horizontal Right Band */}
                <rect
                  x="180"
                  y="137"
                  width="183"
                  height="26"
                  fill="url(#satinWaistGrad)"
                  filter="url(#satinContactShadow)"
                />
                <rect x="180" y="137" width="183" height="1" fill="rgba(255,200,200,0.25)" />
                <rect x="180" y="162" width="183" height="1" fill="rgba(0,0,0,0.35)" />

                {/* Symmetrical Right Loop (unthreads smoothly into knot) */}
                {loopScale > 0.04 && (
                  <>
                    <path
                      d={rightLoopPath}
                      fill="none"
                      stroke="#220407"
                      strokeWidth="24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.28"
                      transform="translate(0, 3)"
                      filter="url(#satinContactShadow)"
                    />
                    <path
                      d={rightLoopPath}
                      fill="none"
                      stroke="url(#satinFabricGrad)"
                      strokeWidth="24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={rightLoopPath}
                      fill="none"
                      stroke="url(#satinLusterGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </>
                )}

                {/* Right Tail Shadow */}
                <path
                  d={rightTailPath}
                  fill="none"
                  stroke="#220407"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  opacity="0.32"
                  transform="translate(0, 3.5)"
                  filter="url(#satinContactShadow)"
                  mask="url(#rightTailNotchMask)"
                />

                {/* Right Tail Fabric (constant width = 24) */}
                <path
                  d={rightTailPath}
                  fill="none"
                  stroke="url(#satinFabricGrad)"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  mask="url(#rightTailNotchMask)"
                />

                {/* Satin Specular Lustre Highlight */}
                <path
                  d={rightTailPath}
                  fill="none"
                  stroke="url(#satinLusterGrad)"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  opacity="0.75"
                  mask="url(#rightTailNotchMask)"
                />
              </g>

              {/* ------------------------------------------------------------- */}
              {/* THE SATIN KNOT (Centered horizontally at X = 180, Y = 150) */}
              {/* ------------------------------------------------------------- */}
              <g
                style={{
                  transformOrigin: '180px 150px',
                  transform: isRibbonReleased
                    ? 'translate3d(0, -8px, 0) scale(0.6)'
                    : `rotate(${pullProgress * 12}deg) scale(${1 - pullProgress * 0.08})`,
                  opacity: isRibbonReleased ? 0 : 1,
                  transition: isRibbonReleased
                    ? 'transform 0.5s ease-out, opacity 0.45s ease-out'
                    : 'transform 0.08s ease-out',
                }}
              >
                <rect
                  x="167"
                  y="137"
                  width="26"
                  height="26"
                  rx="5.5"
                  fill="url(#satinKnotGrad)"
                  filter="url(#knotDropShadow)"
                />

                <path
                  d="M 174,139 Q 177,150 175,161"
                  stroke="rgba(30,4,7,0.65)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 186,139 Q 183,150 185,161"
                  stroke="rgba(30,4,7,0.65)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />

                <circle
                  cx="180"
                  cy="150"
                  r="6.5"
                  stroke="rgba(182,154,97,0.4)"
                  strokeWidth="0.7"
                  strokeDasharray="2,2"
                  fill="none"
                />
                <text
                  x="180"
                  y="152.5"
                  textAnchor="middle"
                  fill="#F8F3E9"
                  fontSize="6"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                  fontStyle="italic"
                  opacity="0.85"
                >
                  M&amp;R
                </text>
              </g>

              {/* ------------------------------------------------------------- */}
              {/* DIRECT INTERACTIVE HIT AREA ON VISIBLE TAIL END */}
              {/* ------------------------------------------------------------- */}
              {!isRibbonReleased && (
                <g>
                  {/* Generous touch circle (radius 30) with touch-action: none */}
                  <circle
                    cx={currentTip.x}
                    cy={currentTip.y}
                    r="30"
                    fill="transparent"
                    className="pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
                    style={{ touchAction: 'none' }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    role="slider"
                    aria-label="Drag ribbon end to untie invitation"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pullProgress * 100)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        triggerUntieSequence();
                      }
                    }}
                  />

                  {/* Elegant Pull Indicator Pill positioned neatly below tail */}
                  {pullProgress === 0 && (
                    <g
                      transform={`translate(${currentTip.x}, ${currentTip.y + 13})`}
                      className="pointer-events-none"
                    >
                      <rect
                        x="-16"
                        y="0"
                        width="32"
                        height="14"
                        rx="7"
                        fill="rgba(84, 24, 32, 0.92)"
                        stroke="rgba(182, 154, 97, 0.5)"
                        strokeWidth="0.7"
                      />
                      <text
                        x="-2"
                        y="9.8"
                        textAnchor="middle"
                        fill="#F8F3E9"
                        fontSize="6.5"
                        fontFamily="Manrope, sans-serif"
                        letterSpacing="1"
                        fontWeight="300"
                      >
                        PULL
                      </text>
                      <text
                        x="8.5"
                        y="9.8"
                        fill="#B69A61"
                        fontSize="7.5"
                        fontFamily="sans-serif"
                      >
                        ↓
                      </text>
                    </g>
                  )}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: COUPLE NAMES & ACCESSIBLE BUTTON */}
        {/* ========================================================================= */}
        <footer className="w-full max-w-sm mx-auto text-center pb-1.5 sm:pb-3 z-20 flex flex-col items-center gap-1.5 sm:gap-2">
          <motion.div
            animate={{
              opacity: isCardRevealed ? 0 : 1,
              y: isCardRevealed ? 12 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-serif italic text-lg sm:text-2xl text-[#351015] font-light leading-snug">
              {weddingData.couple.displayNames.groom}
              <span className="font-serif text-base sm:text-lg text-[#95666A] mx-1.5 not-italic">&amp;</span>
              {weddingData.couple.displayNames.bride}
            </p>
            <p className="font-body text-[8px] sm:text-[9.5px] tracking-[0.24em] uppercase text-[#95666A] font-light mt-0.5">
              22 November 2026 · Coimbatore
            </p>
          </motion.div>

          {/* Accessible Alternative Button */}
          <motion.div
            animate={{
              opacity: isCardRevealed ? 0 : 1,
              scale: isCardRevealed ? 0.95 : 1,
            }}
            transition={{ duration: 0.35 }}
          >
            <button
              onClick={handleAccessibleOpen}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-1.5 sm:px-7 sm:py-2.5 bg-[#541820] text-[#F8F3E9] border border-[#541820] tracking-[0.22em] uppercase font-body text-[9.5px] sm:text-[11px] font-normal shadow-sm transition-all duration-300 hover:bg-[#351015] active:scale-[0.98] cursor-pointer focus:outline-none"
              aria-label="Open invitation directly"
            >
              <span>Open Invitation</span>
              <span className="font-sans text-xs group-hover:translate-x-1 transition-transform duration-300 opacity-80">
                →
              </span>
            </button>
          </motion.div>

          <p className="text-[8px] sm:text-[9px] text-[#541820]/45 tracking-[0.18em] uppercase font-body font-light">
            Pull ribbon tail or tap to open
          </p>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
export default InvitationGate;
