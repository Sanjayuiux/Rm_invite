import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check if hovering interactive element
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, select, textarea, [role="button"], .clickable');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#B69A61]/70 pointer-events-none"
        animate={{
          x: mousePosition.x - (isHovered ? 20 : 12),
          y: mousePosition.y - (isHovered ? 20 : 12),
          width: isHovered ? 40 : 24,
          height: isHovered ? 40 : 24,
          borderColor: isHovered ? '#183B2C' : 'rgba(182, 154, 97, 0.75)',
          backgroundColor: isHovered ? 'rgba(182, 154, 97, 0.12)' : 'transparent',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.5,
        }}
      />
      {/* Tiny center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-[#183B2C] pointer-events-none"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          opacity: isHovered ? 0.4 : 0.9,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 800,
          mass: 0.1,
        }}
      />
    </div>
  );
};
