import React from 'react';
import { motion } from 'framer-motion';

interface RevealAnimationProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  blur?: boolean;
}

export const RevealAnimation: React.FC<RevealAnimationProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.75,
  className = '',
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 22, x: 0 };
      case 'down':
        return { y: -22, x: 0 };
      case 'left':
        return { x: 22, y: 0 };
      case 'right':
        return { x: -22, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: '0px 0px -40px 0px', amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={`[will-change:transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
};
