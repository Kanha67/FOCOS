import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Calendar, ChevronRight, Flame, Apple, LineChart, Clock, Heart, Award, Activity, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";
import WorkoutPlanGenerator from "@/components/WorkoutPlanGenerator";
import DietPlanGenerator from "@/components/DietPlanGenerator";
import WorkoutTracker from "@/components/WorkoutTracker";
import DesktopLayout from "@/components/DesktopLayout";
import ThemeToggle from "@/components/ThemeToggle";

export default function Workout() {
  const { settings } = useAppContext();
  const [activeTab, setActiveTab] = useState("plan");
  const { toast } = useToast();

  // Sample workout stats - in a real app, these would come from a database or context
  const workoutStats = {
    weeklyWorkouts: 3,
    weeklyGoal: 5,
    caloriesBurned: 1250,
    weeklyProgress: 60,
    streakDays: 4
  };

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
      >
        <Activity size={16} className="text-blue-400" />
        <span className="font-medium">Start Workout</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Fitness Stats */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Fitness Stats</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Dumbbell size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{workoutStats.weeklyWorkouts}/{workoutStats.weeklyGoal}</span>
              <p className="text-xs text-muted-foreground">Weekly Workouts</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Flame size={20} className="text-orange-500" />
            </div>
            <div>
              <span className="text-2xl font-bold">{workoutStats.caloriesBurned}</span>
              <p className="text-xs text-muted-foreground">Calories Burned</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Calendar size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{workoutStats.streakDays}</span>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Weekly Progress</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Workouts</span>
              <span className="font-medium">{workoutStats.weeklyProgress}%</span>
            </div>
            <Progress value={workoutStats.weeklyProgress} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Calories</span>
              <span className="font-medium">70%</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Protein</span>
              <span className="font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </div>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <Tabs defaultValue="plan" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6 glass-card p-1">
          <TabsTrigger value="plan" className="text-sm">Workout Plan</TabsTrigger>
          <TabsTrigger value="diet" className="text-sm">Diet Plan</TabsTrigger>
          <TabsTrigger value="progress" className="text-sm">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="desktop-fade-in">
          <motion.div
            className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WorkoutPlanGenerator />
          </motion.div>
        </TabsContent>

        <TabsContent value="diet" className="desktop-fade-in">
          <motion.div
            className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DietPlanGenerator />
          </motion.div>
        </TabsContent>

        <TabsContent value="progress" className="desktop-fade-in">
          <motion.div
            className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WorkoutTracker />
          </motion.div>
        </TabsContent>
      </Tabs>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Quick Actions */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>

        <div className="space-y-3">
          <Button className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 text-blue-500">
            <Activity size={18} />
            <span>Start Workout Session</span>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2">
            <Heart size={18} />
            <span>Log Health Metrics</span>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2">
            <Apple size={18} />
            <span>Log Meal</span>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2">
            <BarChart2 size={18} />
            <span>View Detailed Stats</span>
          </Button>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Achievements</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
              <Award size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Consistency Champion</h3>
              <p className="text-xs text-muted-foreground">Complete workouts 5 days in a row</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full">
              <Flame size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Calorie Crusher</h3>
              <p className="text-xs text-muted-foreground">Burn 5000 calories in a week</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl opacity-50">
            <div className="p-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full">
              <Dumbbell size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Strength Master</h3>
              <p className="text-xs text-muted-foreground">Complete 20 strength workouts</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className="pt-4 pb-24 px-4 max-w-md mx-auto min-h-screen workout-theme">
      <h1 className="text-2xl font-bold text-center mb-2">Fitness Journey</h1>

      <Card className="glass-card p-4 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover-glow animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Dumbbell size={20} className="text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold">Weekly Progress</h2>
              <p className="text-xs text-muted-foreground">
                {workoutStats.weeklyWorkouts}/{workoutStats.weeklyGoal} workouts completed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-blue-400" />
            <span className="text-sm font-medium">{workoutStats.streakDays} day streak</span>
          </div>
        </div>

        <Progress value={workoutStats.weeklyProgress} className="h-2 mb-2" />

        <div className="flex flex-col sm:flex-row justify-between text-sm">
          <div className="flex items-center gap-1 mb-1 sm:mb-0">
            <Flame size={16} className="text-orange-500" />
            <span>{workoutStats.caloriesBurned} calories</span>
          </div>
          <span className="text-blue-400">{workoutStats.weeklyProgress}% of weekly goal</span>
        </div>
      </Card>

      <Tabs defaultValue="plan" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="plan" className="text-xs sm:text-sm">Workout Plan</TabsTrigger>
          <TabsTrigger value="diet" className="text-xs sm:text-sm">Diet Plan</TabsTrigger>
          <TabsTrigger value="progress" className="text-xs sm:text-sm">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="animate-fade-in">
          <WorkoutPlanGenerator />
        </TabsContent>

        <TabsContent value="diet" className="animate-fade-in">
          <DietPlanGenerator />
        </TabsContent>

        <TabsContent value="progress" className="animate-fade-in">
          <WorkoutTracker />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Fitness Journey"
      pageIcon={<Dumbbell size={20} className="text-white" />}
      pageDescription="Track your workouts and maintain a healthy lifestyle"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
