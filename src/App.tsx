import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { InvitationGate } from './components/InvitationGate';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { InvitationIntro } from './components/InvitationIntro';
import { CoupleSection } from './components/CoupleSection';
import { WeddingSection } from './components/WeddingSection';
import { Timeline } from './components/Timeline';
import { VenueSection } from './components/VenueSection';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';
import { MusicController } from './components/MusicController';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [invitationOpened, setInvitationOpened] = useState(false);

  useEffect(() => {
    if (!invitationOpened) return;

    // Framer-grade inertial smooth scrolling physics (optimized for 60-120Hz mobile & desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Do not hijack mobile touch scroll
      touchMultiplier: 1.0,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth navigation anchor click handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: -40, duration: 1.4 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [invitationOpened]);

  return (
    <div className="min-h-screen bg-[#F8F3E9] text-[#541820] paper-texture relative selection:bg-[#541820]/20 selection:text-[#351015]">
      {/* Desktop Subtle Circular Cursor */}
      <CustomCursor />

      {/* Opening Invitation Gate (Envelope Experience) */}
      <AnimatePresence>
        {!invitationOpened && (
          <InvitationGate
            onOpenComplete={() => {
              setInvitationOpened(true);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Wedding Website (reveals after envelope is opened) */}
      {invitationOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Fixed Responsive Navigation */}
          <Navigation visible={invitationOpened} />

          {/* Floating Music Controller */}
          <MusicController shouldStart={invitationOpened} />

          <main>
            {/* Hero Section */}
            <Hero />

            {/* Wedding Invitation Formal Intro & Parents' Blessing */}
            <InvitationIntro />

            {/* The Couple Section */}
            <CoupleSection />

            {/* The Wedding Ceremony & Save the Date with Live Countdown */}
            <WeddingSection />

            {/* Two Days Timeline / Schedule */}
            <Timeline />

            {/* Venue / Location Section */}
            <VenueSection />

            {/* Final Emotional Photograph Section */}
            <FinalSection />
          </main>

          {/* Final Closing & Appreciation Footer */}
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default App;
