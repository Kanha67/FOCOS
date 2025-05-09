import { useEffect, useState } from "react";

export default function BreatherGuide({ cycles = 4 }: { cycles?: number }) {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>("inhale");
  const [count, setCount] = useState(0);
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    if (!anim) return;
    if (count >= cycles * 2) return;
    const timer = setTimeout(() => {
      setPhase(p => (p === "inhale" ? "exhale" : "inhale"));
      setCount(c => c + 1);
    }, 4000);
    return () => clearTimeout(timer);
  }, [phase, count, anim, cycles]);

  const reset = () => {
    setPhase("inhale");
    setCount(0);
    setAnim(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-32 h-32 sm:w-48 sm:h-48 mb-2">
        <div
          className={`absolute inset-0 rounded-full bg-amber-200/60 border-4 border-amber-400 transition-all duration-1000 flex items-center justify-center ${phase === 'inhale' ? 'scale-110' : 'scale-90'}`}
          style={{ transition: 'transform 3s cubic-bezier(0.4,0,0.2,1)' }}
        >
          <span className="text-xl font-bold text-amber-700">
            {phase === 'inhale' ? 'Inhale' : 'Exhale'}
          </span>
        </div>
      </div>
      <button onClick={reset} className="mt-2 px-4 py-1 rounded bg-amber-400 text-white font-semibold shadow hover:bg-amber-500 transition">Restart</button>
    </div>
  );
}
