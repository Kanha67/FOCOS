import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function ModernSplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    // Stage 1: "Ishrevi.io Presents" (1.5 seconds)
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 1500);

    // Stage 2: "Your Complete Manager" (1.5 seconds)
    const timer2 = setTimeout(() => {
      setStage(3);
    }, 3000);

    // Stage 3: "Developer - Unique Shiwakoti #vibecoding" (1.5 seconds)
    const timer3 = setTimeout(() => {
      setStage(4);
    }, 4500);

    // Stage 4: "FOCOS" animation (1.5 seconds)
    const timer4 = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-indigo-950 dark:via-purple-900 dark:to-violet-950 flex flex-col items-center justify-center z-50">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Simplified static background without animations */}
        <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-30" />

        {/* Stage 1: Ishrevi.io Presents */}
        <AnimatePresence>
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h2
                className="text-2xl md:text-4xl font-light text-indigo-950/90 dark:text-white/90 tracking-wider"
                animate={{ letterSpacing: ["0.1em", "0.2em", "0.1em"] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">Ishrevi.io</span> Presents
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Your Complete Manager */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold text-indigo-950 dark:text-white"
                animate={{
                  y: [0, -10, 0],
                  textShadow: [
                    "0 0 0px rgba(79,70,229,0)",
                    "0 0 20px rgba(79,70,229,0.5)",
                    "0 0 0px rgba(79,70,229,0)"
                  ]
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Complete</span> Manager
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Developer - Unique Shiwakoti #vibecoding */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center absolute bottom-16"
            >
              <motion.p
                className="text-sm md:text-base text-indigo-950/70 dark:text-white/70"
                animate={{ y: [10, 0] }}
                transition={{ duration: 1 }}
              >
                Developer - <span className="text-amber-600 dark:text-amber-300">Unique Shiwakoti</span>
              </motion.p>
              <motion.p
                className="text-xs md:text-sm text-indigo-950/50 dark:text-white/50 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                #vibecoding
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 4: FOCOS animation with Star Logo - Simplified */}
        <AnimatePresence>
          {stage === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="relative flex flex-col items-center">
                {/* FOCOS Logo */}
                <div
                  className="w-24 h-24 md:w-32 md:h-32 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-5xl md:text-6xl"
                >
                  F
                </div>

                {/* FOCOS text */}
                <h1 className="text-5xl md:text-7xl font-black tracking-widest text-indigo-950 dark:text-white">
                  FOCOS
                </h1>

                {/* Simple underline */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
