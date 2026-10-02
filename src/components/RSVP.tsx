import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { PrimaryButton } from './PrimaryButton';
import { Ornament } from './Ornament';
import { RevealAnimation } from './RevealAnimation';

export interface RSVPFormData {
  name: string;
  phone: string;
  attending: 'yes' | 'no' | '';
  guests: number;
  message: string;
}

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    phone: '',
    attending: '',
    guests: 1,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact number.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.attending) {
      newErrors.attending = 'Please let us know if you can attend.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existingRsvps.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existingRsvps));
    } catch {
      // LocalStorage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section
      id="rsvp"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#FAF4F5]/60 border-y border-[#7B2431]/20"
    >
      <div className="max-w-2xl mx-auto">
        <RevealAnimation delay={0}>
          <div className="text-center mb-10 sm:mb-12">
            <SectionLabel>RSVP</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
              Will You Join Us?
            </h2>
            <p className="font-body text-sm sm:text-base text-[#3B2226]/80 font-light mt-2 max-w-md mx-auto">
              We would be delighted to celebrate this special occasion with you.
            </p>
          </div>
        </RevealAnimation>

        {/* Stationery RSVP Card in Pure White with Burgundy Framing */}
        <RevealAnimation delay={0.15}>
          <div className="relative bg-[#FFFFFF] border border-[#7B2431]/30 p-7 sm:p-12 shadow-sm">
            {/* Subtle inner border for letterpress/stationery feel */}
            <div className="absolute inset-2 border border-dashed border-[#7B2431]/15 pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 space-y-7"
                  noValidate
                >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block font-body text-[11px] uppercase tracking-[0.25em] text-[#4A0E17] font-semibold mb-2"
                  >
                    Your Full Name <span className="text-[#7B2431]">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-transparent border-b border-[#3B2226]/20 focus:border-[#4A0E17] py-2 text-base text-[#3B2226] placeholder:text-[#3B2226]/35 focus:outline-none transition-colors font-body"
                  />
                  {errors.name && (
                    <p className="font-body text-xs text-[#9d2424] mt-1.5 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor="rsvp-phone"
                    className="block font-body text-[11px] uppercase tracking-[0.25em] text-[#4A0E17] font-semibold mb-2"
                  >
                    Phone / WhatsApp Number <span className="text-[#7B2431]">*</span>
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-transparent border-b border-[#3B2226]/20 focus:border-[#4A0E17] py-2 text-base text-[#3B2226] placeholder:text-[#3B2226]/35 focus:outline-none transition-colors font-body"
                  />
                  {errors.phone && (
                    <p className="font-body text-xs text-[#9d2424] mt-1.5 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Attendance Options */}
                <div>
                  <span className="block font-body text-[11px] uppercase tracking-[0.25em] text-[#4A0E17] font-semibold mb-3">
                    Will You Attend? <span className="text-[#7B2431]">*</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Option: Yes */}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, attending: 'yes' });
                        if (errors.attending) setErrors({ ...errors, attending: '' });
                      }}
                      className={`py-3 px-4 text-center border font-body text-xs sm:text-[13px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
                        formData.attending === 'yes'
                          ? 'border-[#5C131D] bg-[#5C131D] text-[#FFFFFF] font-semibold shadow-sm'
                          : 'border-[#7B2431]/30 text-[#3B2226]/80 hover:border-[#5C131D] bg-white'
                      }`}
                    >
                      Yes, I'll be there
                    </button>

                    {/* Option: No */}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, attending: 'no' });
                        if (errors.attending) setErrors({ ...errors, attending: '' });
                      }}
                      className={`py-3 px-4 text-center border font-body text-xs sm:text-[13px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
                        formData.attending === 'no'
                          ? 'border-[#5C131D] bg-[#5C131D] text-[#FFFFFF] font-semibold shadow-sm'
                          : 'border-[#7B2431]/30 text-[#3B2226]/80 hover:border-[#5C131D] bg-white'
                      }`}
                    >
                      Sorry, I can't make it
                    </button>
                  </div>
                  {errors.attending && (
                    <p className="font-body text-xs text-[#9d2424] mt-1.5 font-medium">{errors.attending}</p>
                  )}
                </div>

                {/* Number of Guests (Only if attending) */}
                {formData.attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="rsvp-guests"
                      className="block font-body text-[11px] uppercase tracking-[0.25em] text-[#4A0E17] font-semibold mb-2"
                    >
                      Number of Guests (Including Yourself)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, guests: num })}
                          className={`w-10 h-10 border text-center font-serif text-lg transition-all cursor-pointer ${
                            formData.guests === num
                              ? 'border-[#5C131D] bg-[#5C131D] text-[#FFFFFF]'
                              : 'border-[#7B2431]/30 text-[#3B2226] hover:border-[#5C131D] bg-white'
                          }`}
                        >
                          {num === 5 ? '5+' : num}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Personal Message */}
                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="block font-body text-[11px] uppercase tracking-[0.25em] text-[#4A0E17] font-semibold mb-2"
                  >
                    Warm Wishes or Note to Couple (Optional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your blessings or note for Manoj & Ranjani..."
                    className="w-full bg-transparent border-b border-[#3B2226]/20 focus:border-[#4A0E17] py-2 text-sm text-[#3B2226] placeholder:text-[#3B2226]/35 focus:outline-none transition-colors font-body resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 text-center">
                  <PrimaryButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm RSVP'}
                  </PrimaryButton>
                </div>
              </motion.form>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#5C131D] text-[#FFFFFF] mx-auto flex items-center justify-center mb-5 border border-[#C5A869]">
                  <Check className="w-8 h-8 text-[#C5A869]" />
                </div>

                <h3 className="font-serif text-4xl sm:text-5xl text-[#4A0E17] font-normal leading-tight mb-2">
                  Thank You
                </h3>

                <p className="font-body text-sm sm:text-base text-[#3B2226]/80 font-light max-w-sm mx-auto leading-relaxed mb-6">
                  Your response has been received with gratitude. We look forward to celebrating with you!
                </p>

                <div className="inline-flex items-center gap-1.5 text-[#7B2431] font-serif text-2xl sm:text-3xl">
                  <Heart className="w-4 h-4 fill-current text-[#7B2431] shrink-0" />
                  <span>With Love, Manoj &amp; Ranjani</span>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', attending: '', guests: 1, message: '' });
                    }}
                    className="font-body text-xs uppercase tracking-[0.2em] text-[#854D56] hover:text-[#4A0E17] underline underline-offset-4 cursor-pointer"
                  >
                    Submit another response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </RevealAnimation>

        <div className="text-center mt-10">
          <Ornament type="small" color="#7B2431" className="opacity-50" />
        </div>
      </div>
    </section>
  );
};
