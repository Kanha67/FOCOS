import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FocosLogoAnimationProps {
  className?: string;
}

export default function FocosLogoAnimation({ className }: FocosLogoAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll('.letter');
    let currentIndex = 0;

    const animateLetters = () => {
      letters.forEach((letter, index) => {
        letter.classList.remove('text-primary', 'animate-pulse');
      });

      letters[currentIndex].classList.add('text-primary', 'animate-pulse');
      currentIndex = (currentIndex + 1) % letters.length;
    };

    // Initial animation
    animateLetters();

    // Set interval for continuous animation
    const interval = setInterval(animateLetters, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex justify-center items-center font-extrabold text-3xl tracking-widest mb-4 text-indigo-950 dark:text-white",
        className
      )}
    >
      <span className="letter transition-all duration-300">F</span>
      <span className="letter transition-all duration-300">O</span>
      <span className="letter transition-all duration-300">C</span>
      <span className="letter transition-all duration-300">O</span>
      <span className="letter transition-all duration-300">S</span>
    </div>
  );
}
