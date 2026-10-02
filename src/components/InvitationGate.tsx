import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ornament } from './Ornament';
import { Monogram } from './Monogram';
import { weddingData } from '../data/weddingData';

interface InvitationGateProps {
  onOpenComplete: () => void;
}

export const InvitationGate: React.FC<InvitationGateProps> = ({ onOpenComplete }) => {
  // Steps: 'idle' -> 'opening' -> 'card-rising' -> 'zooming' -> 'done'
  const [animationStep, setAnimationStep] = useState<'idle' | 'opening' | 'card-rising' | 'zooming'>('idle');

  const handleOpen = () => {
    if (animationStep !== 'idle') return;

    // STEP 01 & 02 & 03: Scale slightly, darken backdrop, move seal
    setAnimationStep('opening');

    // STEP 04 & 05: Flap opens, card emerges from envelope
    setTimeout(() => {
      setAnimationStep('card-rising');
    }, 600);

    // STEP 06: Card moves toward the screen
    setTimeout(() => {
      setAnimationStep('zooming');
    }, 1300);

    // STEP 07 & 08: Transition into Hero section
    setTimeout(() => {
      onOpenComplete();
    }, 2100);
  };

  const isOpened = animationStep !== 'idle';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        style={{
          backgroundColor: isOpened ? '#380B12' : '#FAF7F2',
          transition: 'background-color 1.2s ease',
        }}
      >
        {/* Subtle noise paper grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#4A0E17_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* TOP: You are cordially invited */}
        <motion.header
          className="text-center pt-2 sm:pt-4 z-20"
          animate={{
            opacity: isOpened ? 0 : 1,
            y: isOpened ? -20 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-6 h-[1px] bg-[#7B2431]/40" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-body font-medium text-[#7B2431]">
              Private Invitation
            </span>
            <span className="w-6 h-[1px] bg-[#7B2431]/40" />
          </div>

          <h2 className="font-serif text-lg sm:text-2xl text-[#4A0E17] tracking-[0.18em] font-normal uppercase">
            You are cordially invited
          </h2>
        </motion.header>

        {/* CENTER: Interactive Physical Envelope */}
        <div className="relative my-auto flex items-center justify-center w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] aspect-[1.42/1] z-30 perspective-[1400px]">
          {/* Main Envelope Wrapper */}
          <motion.div
            onClick={handleOpen}
            className="relative w-full h-full cursor-pointer group"
            animate={{
              scale: animationStep === 'opening' ? 1.03 : animationStep === 'card-rising' ? 1.02 : 1,
              y: animationStep === 'opening' ? -8 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="button"
            tabIndex={0}
            aria-label="Tap to open the wedding invitation envelope"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* Envelope Drop Shadow */}
            <div className="absolute -inset-2 bg-[#4A0E17]/15 rounded-sm filter blur-lg transition-opacity duration-500 group-hover:opacity-30" />

            {/* ENVELOPE BACK LINING (Deep Royal Burgundy interior paper) */}
            <div className="absolute inset-0 bg-[#4A0E17] rounded-sm overflow-hidden shadow-inner border border-[#C5A869]/40">
              {/* Gold foil delicate lining motif inside */}
              <div className="absolute inset-3 border border-dashed border-[#C5A869]/25 flex items-center justify-center">
                <Ornament type="mandala" color="#C5A869" className="opacity-25 w-24 h-24" />
              </div>
            </div>

            {/* INVITATION CARD (Crisp white tucked inside, emerges and zooms) */}
            <motion.div
              className="absolute left-[5%] right-[5%] top-[6%] bottom-[6%] bg-[#FFFFFF] rounded-[2px] shadow-md border border-[#7B2431]/40 p-4 sm:p-6 flex flex-col justify-between items-center text-center origin-center z-15 overflow-hidden"
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={
                animationStep === 'card-rising'
                  ? { y: '-65%', scale: 1.05, opacity: 1, zIndex: 40 }
                  : animationStep === 'zooming'
                  ? { y: '-40%', scale: 2.8, opacity: 0.95, zIndex: 60 }
                  : { y: 0, scale: 1, opacity: 1 }
              }
              transition={{
                duration: animationStep === 'zooming' ? 0.8 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Inner card border */}
              <div className="absolute inset-2 border border-[#7B2431]/30 pointer-events-none" />

              {/* Card top */}
              <div className="relative z-10">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#7B2431] font-body">
                  Wedding Invitation
                </span>
                <Ornament type="small" color="#7B2431" className="opacity-60 my-1" />
              </div>

              {/* Card center names */}
              <div className="relative z-10 py-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E17] tracking-wide font-normal leading-tight">
                  {weddingData.couple.displayNames.groom}
                </h3>
                <span className="font-serif text-lg sm:text-xl text-[#854D56] my-0.5 block opacity-75">
                  &amp;
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E17] tracking-wide font-normal leading-tight">
                  {weddingData.couple.displayNames.bride}
                </h3>
              </div>

              {/* Card bottom */}
              <div className="relative z-10">
                <p className="font-body text-[10px] tracking-[0.25em] text-[#3B2226]/70 uppercase">
                  {weddingData.wedding.dayNumber} · 11 · 2026
                </p>
                <p className="font-serif text-[11px] text-[#854D56] mt-0.5">
                  Coimbatore
                </p>
              </div>
            </motion.div>

            {/* ENVELOPE FRONT POCKET (Pure White textured side & bottom folds with Burgundy trim) */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
              {/* Left fold */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#FFFFFF] origin-left border-r border-[#EFE8E5]"
                style={{
                  clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                  boxShadow: 'inset -2px 0 6px rgba(74,14,23,0.05)',
                }}
              >
                <div className="absolute inset-0 border-l-2 border-[#4A0E17]" />
              </div>

              {/* Right fold */}
              <div
                className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#FFFFFF] origin-right border-l border-[#EFE8E5]"
                style={{
                  clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                  boxShadow: 'inset 2px 0 6px rgba(74,14,23,0.05)',
                }}
              >
                <div className="absolute inset-0 border-r-2 border-[#4A0E17]" />
              </div>

              {/* Bottom fold (upward triangle) */}
              <div
                className="absolute left-0 right-0 bottom-0 h-3/5 bg-[#FAF7F2] border-t border-[#EFE8E5]"
                style={{
                  clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
                  boxShadow: '0 -2px 10px rgba(74,14,23,0.08)',
                }}
              >
                <div className="absolute inset-0 border-b-2 border-[#4A0E17]" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center opacity-60">
                  <Ornament type="small" color="#7B2431" className="w-8 opacity-40" />
                </div>
              </div>
            </div>

            {/* ENVELOPE TOP FLAP (Opens upward via 3D rotateX) */}
            <motion.div
              className="absolute left-0 right-0 top-0 h-[62%] origin-top z-30 pointer-events-none"
              initial={{ rotateX: 0 }}
              animate={{
                rotateX: isOpened ? 180 : 0,
                zIndex: isOpened ? 10 : 30,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front of flap (Closed state face in White with Burgundy trim) */}
              <div
                className="absolute inset-0 bg-[#FFFFFF] border-b border-[#EFE8E5]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: '0 4px 12px rgba(74,14,23,0.12)',
                }}
              >
                <div className="absolute inset-0 border-t-2 border-[#4A0E17]" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center opacity-50">
                  <Ornament type="small" color="#7B2431" className="w-8 opacity-40" />
                </div>
              </div>

              {/* Back of flap (when opened, reveals burgundy interior lining) */}
              <div
                className="absolute inset-0 bg-[#4A0E17] border-b border-[#C5A869]/50"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateY(180deg) rotateZ(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Ornament type="small" color="#C5A869" />
                </div>
              </div>
            </motion.div>

            {/* CENTRAL WAX SEAL WITH M&R MONOGRAM */}
            <motion.div
              className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-40"
              animate={
                isOpened
                  ? {
                      scale: 0.85,
                      opacity: 0,
                      y: -25,
                      transition: { duration: 0.35, ease: 'easeOut' },
                    }
                  : {
                      scale: 1,
                      opacity: 1,
                      y: 0,
                    }
              }
            >
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                {/* Wax seal outer luxury monogram */}
                <Monogram size="lg" variant="white" className="shadow-2xl border-2 border-[#C5A869]" />
                {/* Tiny seal highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM: Couple Display Names, Date & Prominent CTA */}
        <motion.footer
          className="text-center pb-3 sm:pb-6 z-20 flex flex-col items-center gap-3.5"
          animate={{
            opacity: isOpened ? 0 : 1,
            y: isOpened ? 20 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-normal leading-[1.2]">
              {weddingData.couple.displayNames.groom}
              <span className="font-serif text-2xl sm:text-3xl text-[#7B2431] mx-2 opacity-85">
                &amp;
              </span>
              {weddingData.couple.displayNames.bride}
            </h1>
            <p className="font-body text-xs tracking-[0.2em] text-[#854D56] uppercase mt-1">
              22 November 2026
            </p>
          </div>

          {/* OPEN INVITATION CTA BUTTON */}
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 bg-[#5C131D] text-[#FFFFFF] border border-[#7B2431] rounded-none tracking-[0.2em] uppercase font-body text-xs sm:text-[13px] font-normal shadow-md transition-all duration-300 hover:bg-[#4A0E17] active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7B2431]"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span>Open Invitation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] group-hover:scale-125 transition-transform" />
            </span>
            {/* Subtle button border glow */}
            <div className="absolute inset-0 border border-[#C5A869]/30 m-[2px] pointer-events-none" />
          </button>

          <p className="text-[10px] text-[#3B2226]/50 tracking-wider uppercase font-body">
            Tap envelope or button to begin
          </p>
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  );
};
