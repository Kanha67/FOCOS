import { useRef, useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function FlutePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { settings } = useAppContext();

  // Auto play/pause based on Divine Mode
  useEffect(() => {
    if (settings.divineMode) {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play();
        setPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setPlaying(false);
      }
    }
  }, [settings.divineMode]);

  // Only show button in Divine Mode
  if (!settings.divineMode) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  // Pause if user interacts with browser's native controls
  const handleAudioPause = () => setPlaying(false);
  const handleAudioPlay = () => setPlaying(true);

  return (
    <>
      <audio
        ref={audioRef}
        src="/flute/flute.mp3"
        onPause={handleAudioPause}
        onPlay={handleAudioPlay}
        loop
      />
      <button
        onClick={togglePlay}
        className={`fixed z-30 left-4 bottom-24 px-2 py-1 rounded-full shadow-lg glass-card border-2 border-amber-400 flex items-center gap-2 ${playing ? "animate-glow" : ""}`}
        style={{fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: playing ? '#b45309' : '#eab308', minHeight: 32, minWidth: 32}}
        aria-label={playing ? "Pause Divine Flute" : "Play Divine Flute"}
      >
        <span style={{fontSize: 16, marginRight: 4}} role="img" aria-label="flute">🎶</span>
        <span style={{fontSize:13,fontWeight:800,letterSpacing:0.5,textShadow:'0 1px 6px #fbbf2480',color: playing ? '#b45309' : '#eab308',transition: 'color 0.3s',userSelect: 'none'}}>Divine {playing ? 'Pause' : 'Play'}</span>
        <style>{`
          @keyframes glowPulse {
            0% { box-shadow: 0 0 14px 3px #fbbf24cc, 0 2px 4px #fbbf2480; }
            100% { box-shadow: 0 0 18px 8px #fde68a88, 0 2px 8px #fbbf24cc; }
          }
        `}</style>
      </button>
    </>
  );
}
