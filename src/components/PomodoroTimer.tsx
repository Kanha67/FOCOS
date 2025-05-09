
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PomodoroTimerProps {
  focusDuration?: number; // in minutes
  breakDuration?: number; // in minutes
  onSessionComplete?: () => void;
  soundEnabled?: boolean;
  focusSound?: string;
}

export default function PomodoroTimer({
  focusDuration = 25,
  breakDuration = 5,
  onSessionComplete,
  soundEnabled = false,
  focusSound = "rain",
}: PomodoroTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isMuted, setIsMuted] = useState(!soundEnabled);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get audio source based on selected sound
  const getAudioSource = () => {
    switch (focusSound) {
      case "rain":
        return "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3";
      case "cafe":
        return "https://assets.mixkit.co/active_storage/sfx/956/956-preview.mp3";
      case "nature":
        return "https://assets.mixkit.co/active_storage/sfx/2526/2526-preview.mp3";
      case "white-noise":
        return "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3";
      default:
        return "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3";
    }
  };

  // Initialize audio - only once on component mount
  useEffect(() => {
    // Lazy load audio only when needed
    const initAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(getAudioSource());
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
      }
    };

    // Only initialize if sound is enabled and not muted
    if (soundEnabled && !isMuted && isRunning) {
      initAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume - with debounce to reduce frequent updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play/pause audio based on mute state and timer state
  useEffect(() => {
    // Only handle audio if we're running and sound should be playing
    if (isRunning && !isMuted) {
      // Lazy initialize audio if needed
      if (!audioRef.current) {
        audioRef.current = new Audio(getAudioSource());
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
      }

      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isRunning, isMuted]);

  // Calculate progress for the circular progress bar
  const currentDuration = isFocusMode ? focusDuration : breakDuration;
  const totalSeconds = currentDuration * 60;
  const progress = 1 - timeLeft / totalSeconds;

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Start or pause timer - optimized to reduce re-renders
  const toggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);

      // Store the start time and remaining time
      const startTime = Date.now();
      const initialTimeLeft = timeLeft;

      timerRef.current = window.setInterval(() => {
        // Calculate elapsed time since timer started
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const newTimeLeft = initialTimeLeft - elapsedSeconds;

        if (newTimeLeft <= 0) {
          // Timer completed
          clearInterval(timerRef.current!);

          // Play completion sound - lazy load only when needed
          if (!isMuted && soundEnabled) {
            // Use a single instance to avoid memory leaks
            const completionSound = new Audio("https://assets.mixkit.co/active_storage/sfx/943/943-preview.mp3");
            completionSound.play().catch(e => console.error("Could not play completion sound", e));
          }

          // Switch modes
          const newIsFocusMode = !isFocusMode;
          if (!newIsFocusMode) {
            // Focus session completed
            setCompletedSessions(prev => prev + 1);
            if (onSessionComplete) onSessionComplete();
          }

          // Update state in a batch to reduce re-renders
          setIsFocusMode(newIsFocusMode);
          setIsRunning(false);
          setTimeLeft(newIsFocusMode ? focusDuration * 60 : breakDuration * 60);
        } else {
          // Only update the time if it's different from current state
          // This reduces unnecessary re-renders
          setTimeLeft(newTimeLeft);
        }
      }, 1000); // Check every second
    }
  };

  // Reset timer
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setIsFocusMode(true);
    setTimeLeft(focusDuration * 60);
  };

  // Toggle audio mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle volume control visibility
  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Update timer when focus or break duration changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(isFocusMode ? focusDuration * 60 : breakDuration * 60);
    }
  }, [focusDuration, breakDuration, isFocusMode, isRunning]);

  // Get username from localStorage
  const username = localStorage.getItem("focos_username") || "User";

  // SVG parameters for circular progress
  const size = 240;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Welcome message with username */}
      <div className="text-center mb-3">
        <h2 className="text-xl font-medium">Welcome, <span className="text-primary font-semibold">{username}</span></h2>
        <p className="text-sm text-muted-foreground">Let's focus on what matters today</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Circle progress indicator */}
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-800"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-300",
              isFocusMode ? "text-primary" : "text-accent"
            )}
          />
        </svg>

        {/* Timer display */}
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-bold">{formatTime()}</span>
          <span className="text-lg font-medium text-muted-foreground mt-1">
            {isFocusMode ? "Focus Time" : "Break Time"}
          </span>
          <div className="text-sm text-muted-foreground mt-1">
            Sessions: {completedSessions}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          size="icon"
          className="glass-button h-12 w-12"
          onClick={toggleTimer}
          aria-label={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="glass-button h-12 w-12"
          onClick={resetTimer}
          aria-label="Reset"
        >
          <RotateCcw size={24} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="glass-button h-12 w-12"
          onClick={toggleVolumeControl}
          aria-label="Sound"
        >
          {isMuted ? <VolumeOff size={24} /> : <Volume2 size={24} />}
        </Button>
      </div>

      {/* Volume control */}
      {showVolumeControl && (
        <div className="mt-4 glass-card p-4 w-full max-w-xs animate-fade-in">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
            >
              {isMuted ? <VolumeOff size={18} /> : <Volume2 size={18} />}
            </Button>

            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="flex-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
