import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const Timeline: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: '-20px' });

  return (
    <section
      id="timeline"
      className="relative py-20 sm:py-32 px-5 sm:px-10 bg-[#F8F3E9] border-t border-[#541820]/8"
    >
      <div className="max-w-3xl mx-auto">
        <RevealAnimation delay={0}>
          <p className="text-center font-body text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#541820]/50 mb-5 sm:mb-6 font-light">
            Schedule
          </p>
          <h2 className="text-center font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#351015] font-light mb-14 sm:mb-20">
            Two days of celebration
          </h2>
        </RevealAnimation>

        <div className="relative" ref={lineRef}>
          {/* Animated vertical line (Left aligned on mobile, centered on sm+) */}
          <motion.div
            className="absolute left-[24px] sm:left-1/2 top-0 bottom-0 w-[0.5px] bg-[#541820]/20 origin-top -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-12 sm:space-y-20">
            {weddingData.timeline.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start gap-6 sm:gap-12 pl-14 sm:pl-0 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-[24px] sm:left-1/2 top-3 -translate-x-1/2 z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.25 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#F8F3E9] border-[1.5px] border-[#541820] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#541820]" />
                    </div>
                  </motion.div>

                  {/* Content Container */}
                  <div
                    className={`w-full sm:w-1/2 text-left ${
                      isEven ? 'sm:text-right sm:pr-10' : 'sm:text-left sm:pl-10'
                    }`}
                  >
                    <RevealAnimation
                      direction={isEven ? 'left' : 'right'}
                      delay={0.15 * index}
                    >
                      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#95666A] font-light mb-1.5">
                        {event.tag}
                      </p>

                      <p
                        className="font-serif text-[#541820] font-light leading-none mb-1"
                        style={{ fontSize: 'clamp(52px, 7vw, 80px)' }}
                      >
                        {event.date.split(' ')[0]}
                      </p>

                      <p className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#541820]/65 font-medium">
                        {event.date.split(' ')[1]} · {event.day}
                      </p>

                      <p className="font-body text-xs sm:text-sm text-[#95666A] font-light mt-1">
                        {event.time}
                      </p>

                      <h3 className="font-serif italic text-2xl sm:text-3xl text-[#351015] font-light mt-2.5 mb-1">
                        {event.title}
                      </h3>

                      <p className="font-body text-xs text-[#541820]/60 font-light">
                        {event.venue}
                      </p>
                    </RevealAnimation>
                  </div>

                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
