import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Wind, Heart, Sparkles, Clock, BarChart, Moon } from "lucide-react";
import BreatherGuide from "@/components/BreatherGuide";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

const DAILY_MANTRA = "Om Shanti Shanti Shanti";

export default function Meditator() {
  const [breathCount, setBreathCount] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>("inhale");

  const startBreathing = () => {
    setBreathing(true);
    setBreathCount(0);
    setPhase("inhale");
    let count = 0;
    const breathe = () => {
      setPhase(p => (p === "inhale" ? "exhale" : "inhale"));
      setBreathCount(++count);
      if (count < 6) setTimeout(breathe, 4000);
      else setBreathing(false);
    };
    setTimeout(breathe, 4000);
  };

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={startBreathing}
      >
        <Wind size={16} className="text-blue-400" />
        <span className="font-medium">Start Breathing</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Meditation Stats */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Meditation Stats</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Clock size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Time</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <p className="text-lg font-semibold">45 min</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <BarChart size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Sessions</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <p className="text-lg font-semibold">5</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Moon size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Streak</p>
                <p className="text-xs text-muted-foreground">Consecutive days</p>
              </div>
            </div>
            <p className="text-lg font-semibold">3</p>
          </div>
        </div>
      </motion.div>

      {/* Daily Mantra */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            <h2 className="text-lg font-semibold">Daily Mantra</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="bg-indigo-500/10 p-4 rounded-xl mb-4 text-center">
          <p className="font-medium text-lg">{DAILY_MANTRA}</p>
        </div>
        <p className="text-sm text-muted-foreground">Repeat this mantra 3 times during your meditation session for optimal results.</p>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Breathe Practice</h2>
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
            onClick={startBreathing}
          >
            <Wind size={16} className="text-blue-400" />
            <span className="font-medium">Start</span>
          </Button>
        </div>
        <p className="mb-4 text-muted-foreground">Follow this animated guide for a calming, mindful breathing exercise.</p>
        <div className="flex justify-center">
          <BreatherGuide cycles={4} />
        </div>
      </motion.div>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Meditation Tips */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-blue-400" />
            <h2 className="text-lg font-semibold">Meditation Tips</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-3">
          {[
            "Find a quiet place where you won't be disturbed",
            "Sit in a comfortable position with your back straight",
            "Close your eyes and focus on your breath",
            "When your mind wanders, gently bring it back to your breath",
            "Start with 5 minutes and gradually increase your time",
            "Be patient with yourself - meditation is a practice"
          ].map((tip, index) => (
            <motion.div
              key={index}
              className="bg-indigo-500/10 p-3 rounded-lg flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm">{tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className="pt-6 pb-24 px-5 max-w-md mx-auto min-h-screen">
      {/* Premium Header */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
            onClick={startBreathing}
          >
            <Wind size={16} className="text-blue-400" />
            <span className="font-medium">Start Breathing</span>
          </Button>
        </div>
        <ThemeToggle />
      </motion.div>

      {/* Premium Title */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold premium-title">Meditation Guide</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Meditation Tips</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-3">
          {[
            "Find a quiet place where you won't be disturbed",
            "Sit in a comfortable position with your back straight",
            "Close your eyes and focus on your breath",
            "When your mind wanders, gently bring it back to your breath",
            "Start with 5 minutes and gradually increase your time",
            "Be patient with yourself - meditation is a practice"
          ].map((tip, index) => (
            <motion.div
              key={index}
              className="bg-indigo-500/10 p-3 rounded-lg flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
            >
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-white/80 text-sm">{tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Daily Mantra</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="bg-indigo-500/10 p-4 rounded-xl mb-4 text-center">
          <p className="text-white/90 font-medium text-lg">{DAILY_MANTRA}</p>
        </div>
        <p className="text-sm text-white/70">Repeat this mantra 3 times during your meditation session for optimal results.</p>
      </motion.div>

      <Card className="glass-card p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Breathe Practice</h3>
        <p className="mb-2">Follow this animated guide for a calming, mindful breathing exercise.</p>
        <BreatherGuide cycles={4} />
      </Card>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Meditation Guide"
      pageIcon={<Wind size={20} className="text-white" />}
      pageDescription="Practice mindfulness and breathing exercises"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
