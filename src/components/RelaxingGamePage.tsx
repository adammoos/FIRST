import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface RelaxingGamePageProps {
  onBack: () => void;
}

// Pentatonic scale frequencies
const NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

const CALM_TIPS = [
  'Breathe in deeply...',
  'Relax ',
  'You are doing great',
  'Stay present',
  'its ok',
  'clam down',
  'Listen to the music',
  '5aleha 3la rabi',
  'take it easy',
  'your not alone',
  
  
];

export function RelaxingGamePage({ onBack }: RelaxingGamePageProps) {
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTip, setActiveTip] = useState<string | null>(null);

  // ✅ Orb position state (FIXED)
  const [orbPosition, setOrbPosition] = useState({ x: 50, y: 50 });

  const audioContextRef = useRef<AudioContext | null>(null);

  /* -------------------- AUDIO -------------------- */
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playNote = () => {
    if (isMuted || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const note = NOTES[Math.floor(Math.random() * NOTES.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2);
  };

  /* -------------------- ORB CLICK -------------------- */
  const handleOrbClick = () => {
    initAudio();
    playNote();
    setScore(s => s + 1);

    const tip = CALM_TIPS[Math.floor(Math.random() * CALM_TIPS.length)];
    setActiveTip(tip);
    setTimeout(() => setActiveTip(null), 3000);

    // ✅ Move orb to random position
    setOrbPosition({
      x: Math.random() * 70 + 10, // keep inside bounds
      y: Math.random() * 70 + 10,
    });
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="relative h-[85vh] w-full bg-[#f8fafc] rounded-3xl overflow-hidden border border-white/50 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-rose-50 opacity-80" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Harmony Orb</h2>
            <p className="text-sm text-slate-500">Touch to resonate</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="px-4 py-2 bg-white/40 rounded-full">
            {score} Harmony points
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
      </div>

      {/* Calm Tip */}
      <AnimatePresence>
        {activeTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div className="bg-white/80 px-6 py-3 rounded-full flex items-center gap-2">
              <Sparkles className="text-amber-400" />
              {activeTip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${orbPosition.x}-${orbPosition.y}`}
            onClick={handleOrbClick}
            className="absolute rounded-full cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -25, 0],
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              left: `${orbPosition.x}%`,
              top: `${orbPosition.y}%`,
              width: 160,
              height: 160,
              background:
                'radial-gradient(circle at 30% 30%, rgba(45,212,191,0.9), rgba(45,212,191,0.25))',
              boxShadow: '0 0 60px rgba(45,212,191,0.6)',
              border: '1px solid rgba(255,255,255,0.6)',
            }}
          >
            <div className="absolute top-[20%] left-[20%] w-[40%] h-[20%] bg-white/80 rounded-full blur-sm" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center text-slate-400 text-xs tracking-widest">
        Slow down • Focus • Breathe
      </div>
    </div>
  );
}
