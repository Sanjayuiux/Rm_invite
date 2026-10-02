import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Monogram } from './Monogram';
import { Ornament } from './Ornament';

interface NavigationProps {
  visible: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ visible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Couple', href: '#couple' },
    { label: 'The Wedding', href: '#wedding' },
    { label: 'Reception', href: '#reception' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Venue', href: '#venue' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md py-3.5 border-b border-[#7B2431]/20 shadow-sm'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Scroll to top"
          >
            <Monogram size="sm" variant="burgundy" className="group-hover:scale-105 transition-transform" />
            <span className="font-serif text-[#4A0E17] text-sm tracking-[0.2em] uppercase hidden sm:inline">
              Manoj &amp; Ranjani
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="font-body text-[11px] lg:text-[12px] tracking-[0.22em] uppercase font-medium text-[#3B2226]/80 hover:text-[#5C131D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-[#7B2431] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center gap-2 text-[#5C131D] py-1.5 px-3 rounded border border-[#7B2431]/40 bg-[#FFFFFF]/90 backdrop-blur-sm active:scale-95 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <span className="font-body text-[11px] tracking-[0.2em] uppercase font-medium">Menu</span>
            <Menu className="w-4 h-4 text-[#5C131D]" />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Luxury Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10 select-none md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header: Monogram & Close */}
            <div className="flex items-center justify-between border-b border-[#7B2431]/20 pb-4">
              <div className="flex items-center gap-2.5">
                <Monogram size="sm" variant="burgundy" />
                <span className="font-serif text-[#4A0E17] text-sm tracking-[0.2em] uppercase">
                  Manoj &amp; Ranjani
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-[#7B2431]/40 flex items-center justify-center text-[#5C131D] active:scale-95 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-center justify-center gap-6 my-auto text-center">
              <Ornament type="small" color="#7B2431" className="opacity-60 mb-2" />
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="font-serif text-2xl sm:text-3xl text-[#4A0E17] hover:text-[#7B2431] transition-colors tracking-wide"
                >
                  {item.label}
                </motion.a>
              ))}
              <Ornament type="small" color="#7B2431" className="opacity-60 mt-2" />
            </div>

            {/* Footer details */}
            <div className="text-center border-t border-[#7B2431]/20 pt-4">
              <p className="font-body text-[11px] tracking-[0.25em] text-[#854D56] uppercase font-medium">
                22 November 2026 · Coimbatore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
