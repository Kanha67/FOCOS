
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PomodoroTimer from "@/components/PomodoroTimer";
import HabitTracker from "@/components/HabitTracker";
import MotivationalQuote from "@/components/MotivationalQuote";
import ThemeToggle from "@/components/ThemeToggle";
import BreatheMode from "@/components/BreatheMode";
import FocosLogoAnimation from "@/components/FocosLogoAnimation";
import SmartDashboard from "@/components/SmartDashboard";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ChevronRight, MessageCircle, Sparkles, LayoutDashboard, Clock,
  BarChart3, Calendar, Settings, User, Gauge, Zap, Target, Flame, Award } from "lucide-react";
import GitaLessons from "@/components/GitaLessons";
import SlokaOfTheDay from "@/components/SlokaOfTheDay";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const { habits, toggleHabit, settings, completedSessions, incrementCompletedSessions } = useAppContext();
  const [showBreatheMode, setShowBreatheMode] = useState(false);

  const handleSessionComplete = () => {
    incrementCompletedSessions();
  };

  const navigateToChatbot = () => {
    navigate('/financial-chat');
  };

  return (
    <div className="pt-6 pb-24 px-5 mx-auto min-h-screen max-w-md md:max-w-2xl lg:max-w-6xl xl:max-w-7xl">
      {/* Desktop Header - Only visible on large screens */}
      <motion.div
        className="hidden lg:flex justify-between items-center mb-8 px-4 py-3 glass-card"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <p className="text-xs text-muted-foreground">Welcome back to FOCOS</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
            onClick={() => setShowBreatheMode(true)}
          >
            <Clock size={16} className="text-blue-400" />
            <span className="font-medium">Breathe Mode</span>
          </Button>
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
            onClick={navigateToChatbot}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="font-medium">Vasudev AI</span>
          </Button>
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Mobile Header - Only visible on small screens */}
      <motion.div
        className="flex lg:hidden justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
            onClick={() => setShowBreatheMode(true)}
          >
            <Clock size={16} className="text-blue-400" />
            <span className="font-medium">Breathe</span>
          </Button>
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
            onClick={navigateToChatbot}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="font-medium">Vasudev</span>
          </Button>
        </div>
        <ThemeToggle />
      </motion.div>

      {/* Premium Logo Animation - Smaller on desktop */}
      <motion.div
        className="mb-8 text-center lg:mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative inline-block">
          <FocosLogoAnimation className="text-blue-500 premium-scale" />
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Main Content - Different layout for desktop and mobile */}
      <div className="lg:hidden">
        {/* Mobile Tabs */}
        <Tabs defaultValue="smart" className="mt-4">
          <TabsList className="premium-card w-full p-1.5 mb-6 grid grid-cols-2 rounded-xl shadow-md border border-indigo-500/20">
            <TabsTrigger
              value="smart"
              className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
            >
              <Gauge size={18} />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="classic"
              className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
            >
              <Clock size={18} />
              <span>Focus</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="smart" className="mt-0 premium-fade-in">
            {/* Premium Smart Dashboard - Mobile */}
            <div className="space-y-6">
              {/* Stats Overview */}
              <motion.div
                className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Today's Overview</h2>
                  <span className="premium-badge">Premium</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-indigo-500/10 rounded-xl">
                    <div className="p-2 bg-blue-500/20 rounded-full mb-2">
                      <Target size={20} className="text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold">{habits.filter(h => h.completed).length}</span>
                    <span className="text-xs text-muted-foreground">Tasks Completed</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-indigo-500/10 rounded-xl">
                    <div className="p-2 bg-blue-500/20 rounded-full mb-2">
                      <Flame size={20} className="text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold">{completedSessions}</span>
                    <span className="text-xs text-muted-foreground">Focus Sessions</span>
                  </div>
                </div>
              </motion.div>

              <SmartDashboard />
            </div>
          </TabsContent>

          <TabsContent value="classic" className="mt-0 premium-fade-in">
            <div className="space-y-6">
              {/* Motivational Quote */}
              <motion.div
                className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MotivationalQuote />
              </motion.div>

              {/* Pomodoro Timer */}
              <motion.div
                className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <PomodoroTimer
                    focusDuration={settings.focusDuration}
                    breakDuration={settings.breakDuration}
                    onSessionComplete={handleSessionComplete}
                  />
                </div>
              </motion.div>

              {/* Habit Tracker */}
              <motion.div
                className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HabitTracker habits={habits} onToggleHabit={toggleHabit} />
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Layout - Multi-column grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - 3/12 width */}
          <div className="col-span-3 space-y-6">
            {/* Stats Overview */}
            <motion.div
              className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Today's Overview</h2>
                <span className="premium-badge">Premium</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <Target size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">{habits.filter(h => h.completed).length}</span>
                    <p className="text-xs text-muted-foreground">Tasks Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <Flame size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">{completedSessions}</span>
                    <p className="text-xs text-muted-foreground">Focus Sessions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <Award size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">{completedSessions * 10}</span>
                    <p className="text-xs text-muted-foreground">XP Points</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
              className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MotivationalQuote />
            </motion.div>
          </div>

          {/* Middle Column - 5/12 width */}
          <div className="col-span-5 space-y-6">
            {/* Smart Dashboard */}
            <motion.div
              className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <LayoutDashboard size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold">Smart Dashboard</h2>
                </div>
                <Button variant="outline" size="sm" className="text-xs">Customize</Button>
              </div>
              <SmartDashboard />
            </motion.div>
          </div>

          {/* Right Column - 4/12 width */}
          <div className="col-span-4 space-y-6">
            {/* Pomodoro Timer */}
            <motion.div
              className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Clock size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold">Focus Timer</h2>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <PomodoroTimer
                  focusDuration={settings.focusDuration}
                  breakDuration={settings.breakDuration}
                  onSessionComplete={handleSessionComplete}
                />
              </div>
            </motion.div>

            {/* Habit Tracker */}
            <motion.div
              className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Target size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold">Habit Tracker</h2>
                </div>
              </div>
              <HabitTracker habits={habits} onToggleHabit={toggleHabit} />
            </motion.div>
          </div>
        </div>
      </div>

      {showBreatheMode && (
        <motion.div
          className="fixed inset-0 bg-[#0A0A1E]/90 backdrop-blur-lg z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="premium-card p-8 max-w-md w-full border border-indigo-500/30"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <motion.h2
                className="text-2xl font-bold mb-2 premium-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Breathe Mode
              </motion.h2>
              <motion.p
                className="text-base text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Take a moment to center yourself
              </motion.p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Animated breathe circle */}
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 absolute"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.1
                    }}
                  />
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/40 to-indigo-500/40 absolute"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  />
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/50 to-indigo-500/50 absolute"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                </motion.div>

                {/* Animated text */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.p
                    className="text-white font-medium"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {Math.floor((Date.now() / 4000) % 2) === 0 ? "Inhale..." : "Exhale..."}
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-lg font-medium text-white/80">Focus on your breath</p>
              <div className="premium-divider my-4"></div>
              <p className="text-sm text-white/60">Breathe in for 4 seconds, hold for 4 seconds, exhale for 4 seconds</p>
            </div>

            <Button
              onClick={() => setShowBreatheMode(false)}
              className="premium-button w-full py-2.5"
            >
              Exit Breathe Mode
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Beta Version Notice */}
      <motion.div
        className="fixed bottom-16 lg:bottom-4 left-0 right-0 flex justify-center z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="glass-card px-4 py-2 border border-amber-500/30 bg-amber-500/10 text-center max-w-md mx-auto">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <span className="font-semibold">BETA VERSION</span> - Please report any bugs on Instagram:
            <a
              href="https://instagram.com/uniqueshiwakoti5"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium ml-1 underline hover:text-amber-600 dark:hover:text-amber-300"
            >
              @uniqueshiwakoti5
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
