import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate = '2026-11-22T06:00:00+05:30'
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPassed) {
    return (
      <div className="text-center py-6">
        <p className="font-serif text-2xl text-[#4A0E17] italic">
          The auspicious wedding celebrations have begun.
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div
      className="w-full max-w-xl mx-auto py-8 sm:py-12 select-none"
      aria-label="Countdown to wedding ceremony"
    >
      <div className="grid grid-cols-4 gap-2 sm:gap-6 text-center">
        {units.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center relative">
            {/* Elegant Serif Number */}
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal tracking-tight">
              {unit.value}
            </span>

            {/* Small uppercase label */}
            <span className="font-body text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-[#854D56] font-semibold mt-1">
              {unit.label}
            </span>

            {/* Subtle separator colon except for last item */}
            {index < units.length - 1 && (
              <span className="hidden sm:block absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/2 text-[#7B2431]/40 font-serif text-xl">
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
