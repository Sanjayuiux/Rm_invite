import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvitationGate } from './components/InvitationGate';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { InvitationIntro } from './components/InvitationIntro';
import { CoupleSection } from './components/CoupleSection';
import { WeddingSection } from './components/WeddingSection';
import { ReceptionSection } from './components/ReceptionSection';
import { Timeline } from './components/Timeline';
import { VenueSection } from './components/VenueSection';
import { FamilySection } from './components/FamilySection';
import { Gallery } from './components/Gallery';
import { RSVP } from './components/RSVP';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';
import { MusicController } from './components/MusicController';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [invitationOpened, setInvitationOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3B2226] paper-texture relative selection:bg-[#5C131D]/20 selection:text-[#4A0E17]">
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

            {/* The Reception Section */}
            <ReceptionSection />

            {/* Two Days Timeline */}
            <Timeline />

            {/* The Venue Section */}
            <VenueSection />

            {/* Family Section */}
            <FamilySection />

            {/* Photo Gallery & Lightbox */}
            <Gallery />

            {/* Stationery RSVP Form */}
            <RSVP />

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
