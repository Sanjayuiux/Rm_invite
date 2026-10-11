import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Monogram } from './Monogram';

interface NavigationProps {
  visible: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ visible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Couple', href: '#couple' },
    { label: 'The Day', href: '#wedding' },
    { label: 'Schedule', href: '#timeline' },
    { label: 'Location', href: '#venue' },
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
            ? 'bg-[#F8F3E9]/95 backdrop-blur-md py-3.5 border-b border-[#541820]/15 shadow-sm'
            : 'bg-gradient-to-b from-[#1A0508]/80 via-[#1A0508]/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Scroll to top"
          >
            <Monogram
              size="sm"
              variant={isScrolled ? 'burgundy' : 'white'}
              className="group-hover:scale-105 transition-transform"
            />
            <span
              className={`font-body text-[11px] sm:text-xs tracking-[0.22em] uppercase hidden sm:inline font-medium transition-colors ${
                isScrolled ? 'text-[#541820]' : 'text-[#F8F3E9] drop-shadow-sm'
              }`}
            >
              M&amp;R
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
                className={`font-body text-[11px] lg:text-[12px] tracking-[0.24em] uppercase font-medium transition-colors relative py-1 ${
                  isScrolled
                    ? 'text-[#541820]/80 hover:text-[#541820]'
                    : 'text-[#F8F3E9]/90 hover:text-[#F8F3E9] drop-shadow-sm'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] ${
                  isScrolled ? 'after:bg-[#541820]' : 'after:bg-[#F8F3E9]'
                } hover:after:w-full after:transition-all after:duration-300`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Share Button */}
          <div className="hidden md:block">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({ title: 'Manoj & Ranjani Wedding', url }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(url).catch(() => {});
                }
              }}
              className={`font-body text-[10px] tracking-[0.22em] uppercase font-medium transition-all px-4 py-2 border ${
                isScrolled
                  ? 'text-[#541820] border-[#541820]/35 hover:bg-[#541820] hover:text-[#F8F3E9]'
                  : 'text-[#F8F3E9] border-[#F8F3E9]/40 hover:bg-[#F8F3E9]/15 drop-shadow-sm'
              }`}
            >
              Share Invitation
            </a>
          </div>

          {/* Mobile Menu Trigger Button (Prominent pill design with solid contrast) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden flex items-center gap-2 py-2 px-3.5 border transition-all active:scale-95 focus:outline-none ${
              isScrolled
                ? 'text-[#541820] border-[#541820]/30 bg-[#F8F3E9]/95 shadow-sm'
                : 'text-[#F8F3E9] border-[#F8F3E9]/40 bg-[#1A0508]/60 backdrop-blur-md shadow-md'
            }`}
            aria-label="Open navigation menu"
          >
            <span className="font-body text-[10px] tracking-[0.22em] uppercase font-medium">Menu</span>
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#F8F3E9] flex flex-col px-8 py-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2.5">
                <Monogram size="sm" variant="burgundy" />
                <span className="font-body text-[#541820] text-[11px] tracking-[0.22em] uppercase font-medium">
                  Manoj &amp; Ranjani
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 border border-[#541820]/30 flex items-center justify-center text-[#541820] active:scale-95 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-8 my-auto">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="font-serif italic text-3xl sm:text-4xl text-[#541820] hover:text-[#351015] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="text-center border-t border-[#541820]/10 pt-6">
              <p className="font-body text-[10px] tracking-[0.25em] text-[#95666A] uppercase font-light">
                21 &amp; 22 November 2026 · Coimbatore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
