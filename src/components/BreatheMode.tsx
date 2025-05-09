
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BreatheModeProps {
  onClose: () => void;
  duration?: number; // Duration in seconds
}

export default function BreatheMode({ onClose, duration = 60 }: BreatheModeProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [breathePhase, setBreathePhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Switch between breathe phases
    const phaseInterval = setInterval(() => {
      setBreathePhase((current) => {
        if (current === "inhale") return "hold";
        if (current === "hold") return "exhale";
        return "inhale";
      });
    }, 4000); // 4 seconds per phase

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      onClose();
    }
  }, [timeLeft, onClose]);

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X size={24} />
      </Button>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8">Take a moment to breathe</h2>
        
        <div className="relative mb-10">
          <div 
            className={`w-60 h-60 rounded-full border-4 border-primary mx-auto flex items-center justify-center
              ${breathePhase === "inhale" ? "animate-[scale-in_4s_ease-in-out_infinite]" : 
                breathePhase === "exhale" ? "animate-[scale-out_4s_ease-in-out_infinite]" : 
                "scale-110"}`}
          >
            <div className="text-2xl font-semibold">
              {breathePhase === "inhale" ? "Inhale" : breathePhase === "hold" ? "Hold" : "Exhale"}
            </div>
          </div>
        </div>
        
        <div className="text-lg mb-8">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>

        <Button 
          onClick={() => setIsActive(!isActive)}
          variant="outline"
          className="glass-button px-6"
        >
          {isActive ? "Pause" : "Resume"}
        </Button>
      </div>
    </div>
  );
}
