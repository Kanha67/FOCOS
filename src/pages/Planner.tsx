import { useState } from "react";
import { motion } from "framer-motion";
import TaskList from "@/components/TaskList";
import StudyProgressTracker from "@/components/StudyProgressTracker";
import QuestionSolver from "@/components/QuestionSolver";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, BookOpen, Brain, Search, Calendar, BarChart2, CheckCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

export default function Planner() {
  const { tasks, addTask, toggleTask, deleteTask, settings, toggleDistractionFreeMode } = useAppContext();
  const [activeTab, setActiveTab] = useState("tasks");

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={toggleDistractionFreeMode}
      >
        <Shield size={16} className="text-blue-400" />
        <span className="font-medium">{settings.distractionFreeMode ? "Exit Focus" : "Focus Mode"}</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Stats Overview */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Study Stats</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <CheckCircle size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</span>
              <p className="text-xs text-muted-foreground">Tasks Completed</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Calendar size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{tasks.length}</span>
              <p className="text-xs text-muted-foreground">Total Tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <BarChart2 size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{Math.round((tasks.filter(t => t.completed).length / (tasks.length || 1)) * 100)}%</span>
              <p className="text-xs text-muted-foreground">Completion Rate</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Study Tips</h2>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <div className="p-1 bg-blue-500/20 rounded-full mt-0.5">
              <CheckCircle size={14} className="text-blue-400" />
            </div>
            <p>Break large tasks into smaller, manageable chunks</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="p-1 bg-blue-500/20 rounded-full mt-0.5">
              <CheckCircle size={14} className="text-blue-400" />
            </div>
            <p>Use the Pomodoro technique: 25 min focus, 5 min break</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="p-1 bg-blue-500/20 rounded-full mt-0.5">
              <CheckCircle size={14} className="text-blue-400" />
            </div>
            <p>Review your notes within 24 hours of taking them</p>
          </li>
        </ul>
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">Task Manager</h2>
          </div>
          <Button variant="outline" size="sm" className="text-xs">Add Task</Button>
        </div>

        <TaskList
          tasks={tasks}
          onAddTask={addTask}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </motion.div>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="w-full p-1.5 mb-6 grid grid-cols-2 rounded-xl shadow-md border border-indigo-500/20">
          <TabsTrigger
            value="progress"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <Brain size={18} />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger
            value="solver"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <Search size={18} />
            <span>Solver</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="premium-fade-in">
          <motion.div
            className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StudyProgressTracker />
          </motion.div>
        </TabsContent>

        <TabsContent value="solver" className="premium-fade-in">
          <motion.div
            className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionSolver />
          </motion.div>
        </TabsContent>
      </Tabs>
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
            onClick={toggleDistractionFreeMode}
          >
            <Shield size={16} className="text-blue-400" />
            <span className="font-medium">{settings.distractionFreeMode ? "Exit Focus" : "Focus Mode"}</span>
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
        <h1 className="text-2xl font-bold premium-title">Study Planner</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      <Tabs defaultValue="tasks" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="premium-card w-full p-1.5 mb-6 grid grid-cols-3 rounded-xl shadow-md border border-indigo-500/20">
          <TabsTrigger
            value="tasks"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <BookOpen size={18} />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <Brain size={18} />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger
            value="solver"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <Search size={18} />
            <span>Solver</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="premium-fade-in">
          <motion.div
            className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Today's Study Plan</h2>
              <span className="premium-badge">Premium</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Focus on your most important study tasks. Limit to 3 main priorities to stay effective.
            </p>
          </motion.div>

          <motion.div
            className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TaskList
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="progress" className="premium-fade-in">
          <motion.div
            className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StudyProgressTracker />
          </motion.div>
        </TabsContent>

        <TabsContent value="solver" className="premium-fade-in">
          <motion.div
            className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionSolver />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Study Planner"
      pageIcon={<Calendar size={20} className="text-white" />}
      pageDescription="Manage your study tasks and track your progress"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
