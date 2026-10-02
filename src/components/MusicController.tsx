import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface MusicControllerProps {
  shouldStart?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ shouldStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasStartedOnceRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);

  const startSynthDrone = () => {
    try {
      if (synthNodesRef.current) return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);

      const frequencies = [138.59, 207.65, 277.18, 311.13];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);
        oscGain.gain.setValueAtTime(0.25 / frequencies.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      synthNodesRef.current = { ctx, gain: masterGain };
    } catch {
      // Ignore
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

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        startSynthDrone();
        setIsPlaying(true);
      }
    } else {
      startSynthDrone();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthDrone();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

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

  useEffect(() => {
    if (shouldStart && !hasStartedOnceRef.current) {
      hasStartedOnceRef.current = true;
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
        onError={() => {}}
      />

      {/* Floating discreet music control in white and burgundy */}
      <div
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 group"
        role="region"
        aria-label="Background music controls"
      >
        <button
          onClick={togglePlay}
          className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-full border border-[#7B2431]/40 bg-[#FFFFFF]/95 backdrop-blur-md text-[#4A0E17] shadow-lg hover:border-[#5C131D] transition-all duration-300 flex items-center gap-2.5 active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#7B2431]"
          title={isPlaying ? 'Pause music' : 'Play music'}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-[#4A0E17] h-full animate-[pulse_1s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#C5A869] h-2/3 animate-[pulse_0.7s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-[#4A0E17] h-4/5 animate-[pulse_1.2s_ease-in-out_infinite_0.4s]" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-[#7B2431]/80" />
            )}
          </div>

          <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-normal text-[#4A0E17]">
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full border border-[#7B2431]/30 bg-[#FFFFFF]/95 backdrop-blur-md text-[#4A0E17] shadow-md flex items-center justify-center hover:border-[#5C131D] transition-all active:scale-95"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#854D56]" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </>
  );
};
