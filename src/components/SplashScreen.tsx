import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(1);
  
  useEffect(() => {
    // Stage 1: "Ishrevi.io Presents" (2.5 seconds)
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 2500);
    
    // Stage 2: "FOCOS your complete all in one manager" (2.5 seconds)
    const timer2 = setTimeout(() => {
      setStage(3);
    }, 5000);
    
    // Stage 3: "Developer - Unique Shiwakoti" (2 seconds)
    const timer3 = setTimeout(() => {
      setStage(4);
    }, 7000);
    
    // Stage 4: Final FOCOS animation (2 seconds)
    const timer4 = setTimeout(() => {
      onComplete();
    }, 9000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-[#0A0A1E] flex flex-col items-center justify-center z-50 overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Advanced animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={`v-${i}`}
                  className="h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 0.3, height: '100%' }}
                  transition={{ delay: i * 0.1, duration: 1.5 }}
                />
              ))}
            </div>
            <div className="absolute inset-0 grid grid-rows-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={`h-${i}`}
                  className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 0.3, width: '100%' }}
                  transition={{ delay: i * 0.1, duration: 1.5 }}
                />
              ))}
            </div>
          </div>
          
          {/* Floating particles */}
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full",
                i % 5 === 0 ? "w-1.5 h-1.5 bg-blue-400/40" : 
                i % 4 === 0 ? "w-2 h-2 bg-purple-400/30" : 
                i % 3 === 0 ? "w-1 h-1 bg-indigo-400/50" : 
                "w-0.5 h-0.5 bg-white/50"
              )}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight - 100,
                  Math.random() * window.innerHeight
                ]
              }}
              transition={{ 
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-violet-600/15 to-purple-600/15 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [20, -20, 20],
            y: [20, -20, 20]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
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
              <motion.div
                className="relative"
                animate={{ 
                  filter: ["blur(10px)", "blur(0px)"],
                }}
                transition={{ duration: 1.2 }}
              >
                <motion.h2 
                  className="text-3xl md:text-5xl font-light text-white/90 tracking-wider"
                  animate={{ 
                    letterSpacing: ["0.05em", "0.15em", "0.1em"],
                    textShadow: ["0 0 20px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 20px rgba(59, 130, 246, 0.2)"]
                  }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-semibold"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                    }}
                    transition={{ 
                      duration: 5, 
                      ease: "easeInOut", 
                      repeat: Infinity 
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Ishrevi.io
                  </motion.span>
                  {" "}
                  <span className="font-light">Presents</span>
                </motion.h2>
                
                {/* Animated line */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mt-2 mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Stage 2: FOCOS your complete all in one manager */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-6"
            >
              <motion.div className="space-y-3">
                <motion.h1 
                  className="text-5xl md:text-7xl font-black tracking-wide text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                    }}
                    transition={{ 
                      duration: 8, 
                      ease: "easeInOut", 
                      repeat: Infinity 
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    FOCOS
                  </motion.span>
                </motion.h1>
                
                <motion.p
                  className="text-lg md:text-xl text-white/80 font-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  your <span className="text-blue-400 font-medium">complete</span> all in one manager
                </motion.p>
                
                {/* Animated underline */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Stage 3: Developer - Unique Shiwakoti */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center absolute bottom-20"
            >
              <motion.div className="relative">
                <motion.p 
                  className="text-base md:text-lg text-white/80 font-light"
                  animate={{ y: [10, 0], opacity: [0, 1] }}
                  transition={{ duration: 1 }}
                >
                  Developer
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-medium mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Unique Shiwakoti
                </motion.p>
                
                {/* Animated line */}
                <motion.div
                  className="h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mt-2 mx-auto"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100px", opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Stage 4: Final FOCOS animation */}
        <AnimatePresence>
          {stage === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative">
                {/* Animated hexagon background */}
                <motion.div
                  className="absolute -inset-20 opacity-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <motion.path
                      d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
                      fill="none"
                      stroke="url(#hexGradient)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                
                {/* Animated letters */}
                <motion.h1 
                  className="text-6xl md:text-8xl font-black tracking-wider text-white relative z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {["F", "O", "C", "O", "S"].map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-500"
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      style={{
                        textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
                
                {/* Animated underline */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
