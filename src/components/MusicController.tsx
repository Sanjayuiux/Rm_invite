import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface MusicControllerProps {
  shouldStart?: boolean; // triggers playback after envelope opened
}

export const MusicController: React.FC<MusicControllerProps> = ({ shouldStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasStartedOnceRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);

  // Gentle synthesizer fallback (soothing Indian drone: Sa - Pa harmonic resonance)
  const startSynthDrone = () => {
    try {
      if (synthNodesRef.current) return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3); // Soft ambient volume
      masterGain.connect(ctx.destination);

      // C#3 (root 138.59Hz), G#3 (fifth 207.65Hz), C#4 (octave 277.18Hz), F3 (major third 174.61Hz)
      const frequencies = [138.59, 207.65, 277.18, 311.13];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle detune for warm chorus shimmer
        osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.25 / frequencies.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      synthNodesRef.current = { ctx, gain: masterGain };
    } catch {
      // Ignore if user blocked audio
    }
  };

  const stopSynthDrone = () => {
    if (synthNodesRef.current) {
      try {
        const { ctx, gain } = synthNodesRef.current;
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          ctx.close();
          synthNodesRef.current = null;
        }, 900);
      } catch {
        synthNodesRef.current = null;
      }
    }
  };

  // Play audio
  const playAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // If MP3 fails or is placeholder, use our meditative synth drone!
        startSynthDrone();
        setIsPlaying(true);
      }
    } else {
      startSynthDrone();
      setIsPlaying(true);
    }
  };

  // Pause audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthDrone();
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (synthNodesRef.current) {
      synthNodesRef.current.gain.gain.setValueAtTime(
        isMuted ? 0.06 : 0.0001,
        synthNodesRef.current.ctx.currentTime
      );
    }
    setIsMuted(!isMuted);
  };

  // Auto-start only once after invitation gate opens
  useEffect(() => {
    if (shouldStart && !hasStartedOnceRef.current) {
      hasStartedOnceRef.current = true;
      // Small graceful delay to let envelope transition conclude
      const timer = setTimeout(() => {
        playAudio();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [shouldStart]);

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingData.music.src}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // Handled gracefully via synth
        }}
      />

      {/* Floating discreet music control */}
      <div
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 group"
        role="region"
        aria-label="Background music controls"
      >
        <button
          onClick={togglePlay}
          className={`h-11 sm:h-12 px-3.5 sm:px-4 rounded-full border border-[#B69A61]/70 bg-[#F7F1E3]/95 backdrop-blur-md text-[#183B2C] shadow-lg hover:border-[#B69A61] transition-all duration-300 flex items-center gap-2.5 active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#B69A61]`}
          title={isPlaying ? 'Pause music' : 'Play music'}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {/* Animated sound wave bars or disc */}
          <div className="relative flex items-center justify-center w-5 h-5">
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-[#183B2C] h-full animate-[pulse_1s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#B69A61] h-2/3 animate-[pulse_0.7s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-[#183B2C] h-4/5 animate-[pulse_1.2s_ease-in-out_infinite_0.4s]" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-[#183B2C]/70" />
            )}
          </div>

          {/* Text label */}
          <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-[#183B2C]">
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>
        </button>

        {/* Separate Mute Toggle */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full border border-[#B69A61]/50 bg-[#F7F1E3]/95 backdrop-blur-md text-[#183B2C] shadow-md flex items-center justify-center hover:border-[#B69A61] transition-all active:scale-95"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#788D78]" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </>
  );
};
