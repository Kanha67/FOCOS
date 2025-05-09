import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Award, BarChart, Cloud, HardDrive, Home, BookOpen, Dumbbell, Settings, Calendar, MessageCircle, Sparkles, Heart, DollarSign, Brain, Sun, Moon, Target, Clock } from "lucide-react";
import ProfileSetup from "@/components/ProfileSetup";
import AchievementSystem from "@/components/AchievementSystem";
import ProgressSummary from "@/components/ProgressSummary";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

export default function Profile() {
  const { settings, updateSettings } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "offline">("offline");

  // Toggle Divine Mode
  const toggleDivineMode = () => {
    updateSettings({ divineMode: !settings.divineMode });

    toast({
      title: settings.divineMode ? "Divine Mode Disabled" : "Divine Mode Enabled",
      description: settings.divineMode
        ? "Returning to standard mode."
        : "Experience Krishna's divine guidance.",
    });
  };

  // Toggle Devotional Mode
  const toggleDevotionalMode = () => {
    updateSettings({ devotionalMode: !settings.devotionalMode });

    // If enabling devotional mode, also enable divine mode
    if (!settings.devotionalMode && !settings.divineMode) {
      updateSettings({ divineMode: true });
    }

    toast({
      title: settings.devotionalMode ? "Devotional Mode Disabled" : "Devotional Mode Enabled",
      description: settings.devotionalMode
        ? "Returning to standard mode."
        : "Enhanced spiritual experience activated.",
    });
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });

    toast({
      title: settings.darkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: settings.darkMode
        ? "Switching to light theme."
        : "Switching to dark theme.",
    });
  };

  const handleSyncData = () => {
    setSyncStatus("syncing");

    // Simulate sync process
    setTimeout(() => {
      setSyncStatus("synced");
      toast({
        title: "Data Synced",
        description: "Your data has been successfully synced to the cloud.",
      });
    }, 2000);
  };

  const handleExportData = () => {
    // In a real app, this would export all user data to a JSON file
    const userData = {
      profile: localStorage.getItem("focos_username"),
      bio: localStorage.getItem("focos_user_bio"),
      goals: localStorage.getItem("focos_user_goals"),
      preferences: localStorage.getItem("focos_user_preferences"),
      habits: localStorage.getItem("habits"),
      tasks: localStorage.getItem("tasks"),
      settings: localStorage.getItem("settings"),
      completedSessions: localStorage.getItem("completedSessions"),
      notifications: localStorage.getItem("notifications"),
      userXp: localStorage.getItem("userXp"),
      achievements: localStorage.getItem("achievements")
    };

    // Create a downloadable file
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "focos_backup_" + new Date().toISOString().split("T")[0] + ".json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    });
  };

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={() => navigate("/settings")}
      >
        <Settings size={16} className="text-blue-400" />
        <span className="font-medium">Settings</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* User Profile Card */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center mb-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center mb-3">
            <User size={32} className="text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">
            {localStorage.getItem("focos_username") || "FOCOS User"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {localStorage.getItem("focos_user_bio") || "No bio yet. Add one in your profile settings."}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={settings.darkMode ? "default" : "outline"}
            size="icon"
            className={`h-9 w-9 rounded-full ${settings.darkMode ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "border border-indigo-500/30"}`}
            onClick={toggleDarkMode}
          >
            <Moon size={16} className="text-white" />
          </Button>

          <Button
            variant={settings.divineMode ? "default" : "outline"}
            size="icon"
            className={`h-9 w-9 rounded-full ${settings.divineMode ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "border border-indigo-500/30"}`}
            onClick={toggleDivineMode}
          >
            <Sparkles size={16} className="text-white" />
          </Button>

          <Button
            variant={settings.devotionalMode ? "default" : "outline"}
            size="icon"
            className={`h-9 w-9 rounded-full ${settings.devotionalMode ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "border border-indigo-500/30"}`}
            onClick={toggleDevotionalMode}
          >
            <Heart size={16} className="text-white" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Award size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">XP Level</p>
                <p className="text-xs text-muted-foreground">Current progress</p>
              </div>
            </div>
            <p className="text-lg font-semibold">12</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Target size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Goals</p>
                <p className="text-xs text-muted-foreground">Active goals</p>
              </div>
            </div>
            <p className="text-lg font-semibold">3</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Clock size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Focus Time</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <p className="text-lg font-semibold">8h 45m</p>
          </div>
        </div>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <Tabs defaultValue="profile" className="w-full animate-fade-in">
        <TabsList className="glass-card w-full p-1 mb-6 grid grid-cols-4 rounded-xl shadow-md">
          <TabsTrigger
            value="profile"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <User size={18} />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Award size={18} />
            <span className="text-xs">XP</span>
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <BarChart size={18} />
            <span className="text-xs">Progress</span>
          </TabsTrigger>
          <TabsTrigger
            value="sync"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Cloud size={18} />
            <span className="text-xs">Sync</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSetup />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementSystem />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressSummary />
        </TabsContent>

        <TabsContent value="sync">
          <div className="glass-card p-5 rounded-xl shadow-lg space-y-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
                <Cloud size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Cloud Sync</h2>
                <div className="text-xs flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${
                    syncStatus === "synced" ? "bg-green-500" :
                    syncStatus === "syncing" ? "bg-amber-500 animate-pulse" :
                    "bg-red-500"
                  }`}></div>
                  {syncStatus === "synced" ? "Synced" :
                   syncStatus === "syncing" ? "Syncing..." :
                   "Offline"}
                </div>
              </div>
            </div>

            <p className="text-sm">
              Your data is always stored locally first for privacy. Enable cloud sync to access your data across multiple devices.
            </p>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleSyncData}
              >
                Sync Now
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "This feature will be available in a future update.",
                  });
                }}
              >
                Sync Settings
              </Button>
            </div>
          </div>

          <div className="glass-card p-5 rounded-xl shadow-lg space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
                <HardDrive size={24} className="text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Local Storage</h2>
                <p className="text-xs text-muted-foreground">
                  Manage your local data
                </p>
              </div>
            </div>

            <p className="text-sm">
              Your data is stored locally on this device. You can export your data for backup or import it on another device.
            </p>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="secondary"
                onClick={handleExportData}
              >
                Export Data
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "This feature will be available in a future update.",
                  });
                }}
              >
                Import Data
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Exporting data creates a backup file that you can save to your device. This file contains all your FOCOS data.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Quick Navigation */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Access</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2 bg-indigo-500/10 p-3 rounded-xl">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/")}
            >
              <Home size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Home</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/planner")}
            >
              <BookOpen size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Study</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/workout")}
            >
              <Dumbbell size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Workout</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/calendar")}
            >
              <Calendar size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Calendar</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/settings")}
            >
              <Settings size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Settings</span>
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-1 border-t border-border/30">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/spiritual-habits")}
            >
              <Sparkles size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Spirit</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/gita")}
            >
              <Heart size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Gita</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/financial-planner")}
            >
              <DollarSign size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Finance</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/meditator")}
            >
              <Brain size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Meditate</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/financial-chat")}
            >
              <MessageCircle size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Chat</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center mt-0.5">
                  <BookOpen size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Study Session Completed</p>
                  <p className="text-xs text-muted-foreground">45 minutes of focused work</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center mt-0.5">
                  <Award size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Achievement Unlocked</p>
                  <p className="text-xs text-muted-foreground">Early Bird: 5 morning sessions</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center mt-0.5">
                  <Target size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Goal Progress</p>
                  <p className="text-xs text-muted-foreground">75% complete: Read 30 pages daily</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
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
            onClick={() => navigate("/settings")}
          >
            <Settings size={16} className="text-blue-400" />
            <span className="font-medium">Settings</span>
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
        <h1 className="text-2xl font-bold premium-title">Your Profile</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Theme Toggle */}
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Theme Settings</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
              <Sparkles size={18} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Experience Mode</h3>
              <p className="text-xs text-white/70">Customize your app experience</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={settings.darkMode ? "default" : "outline"}
              size="icon"
              className={`h-9 w-9 rounded-full ${settings.darkMode ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "border border-indigo-500/30"}`}
              onClick={toggleDarkMode}
            >
              <Moon size={16} className="text-white" />
            </Button>

            <Button
              variant={settings.divineMode ? "default" : "outline"}
              size="icon"
              className={`h-9 w-9 rounded-full ${settings.divineMode ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "border border-indigo-500/30"}`}
              onClick={toggleDivineMode}
            >
              <Sparkles size={16} className="text-white" />
            </Button>

            <Button
              variant={settings.devotionalMode ? "default" : "outline"}
              size="icon"
              className={`h-9 w-9 rounded-full ${settings.devotionalMode ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "border border-indigo-500/30"}`}
              onClick={toggleDevotionalMode}
            >
              <Heart size={16} className="text-white" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Quick Access</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2 bg-indigo-500/10 p-3 rounded-xl">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/")}
            >
              <Home size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Home</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/planner")}
            >
              <BookOpen size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Study</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/workout")}
            >
              <Dumbbell size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Workout</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/calendar")}
            >
              <Calendar size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Calendar</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/settings")}
            >
              <Settings size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Settings</span>
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-1 border-t border-border/30">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/spiritual-habits")}
            >
              <Sparkles size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Spirit</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/gita")}
            >
              <Heart size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Gita</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/financial-planner")}
            >
              <DollarSign size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Finance</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/meditator")}
            >
              <Brain size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Meditate</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 py-2 h-auto"
              onClick={() => navigate("/financial-chat")}
            >
              <MessageCircle size={18} className={settings.devotionalMode ? "text-purple-500" : settings.divineMode ? "text-amber-500" : "text-primary"} />
              <span className="text-xs">Chat</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="profile" className="w-full animate-fade-in">
        <TabsList className="glass-card w-full p-1 mb-6 grid grid-cols-4 rounded-xl shadow-md">
          <TabsTrigger
            value="profile"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <User size={18} />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Award size={18} />
            <span className="text-xs">XP</span>
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <BarChart size={18} />
            <span className="text-xs">Progress</span>
          </TabsTrigger>
          <TabsTrigger
            value="sync"
            className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Cloud size={18} />
            <span className="text-xs">Sync</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSetup />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementSystem />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressSummary />
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="glass-card p-5 rounded-xl shadow-lg space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
                <Cloud size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Cloud Sync</h2>
                <p className="text-xs text-muted-foreground">
                  Sync your data across devices
                </p>
              </div>
              <div className={`ml-auto px-2 py-1 rounded-full text-xs ${
                syncStatus === "synced" ? "bg-green-500/20 text-green-500" :
                syncStatus === "syncing" ? "bg-amber-500/20 text-amber-500" :
                "bg-gray-500/20 text-gray-500"
              }`}>
                {syncStatus === "synced" ? "Synced" :
                 syncStatus === "syncing" ? "Syncing..." :
                 "Offline"}
              </div>
            </div>

            <p className="text-sm">
              Your data is always stored locally first for privacy. Enable cloud sync to access your data across multiple devices.
            </p>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleSyncData}
              >
                Sync Now
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "This feature will be available in a future update.",
                  });
                }}
              >
                Sync Settings
              </Button>
            </div>
          </div>

          <div className="glass-card p-5 rounded-xl shadow-lg space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
                <HardDrive size={24} className="text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Local Storage</h2>
                <p className="text-xs text-muted-foreground">
                  Manage your local data
                </p>
              </div>
            </div>

            <p className="text-sm">
              Your data is stored locally on this device. You can export your data for backup or import it on another device.
            </p>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="secondary"
                onClick={handleExportData}
              >
                Export Data
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "This feature will be available in a future update.",
                  });
                }}
              >
                Import Data
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Exporting data creates a backup file that you can save to your device. This file contains all your FOCOS data.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Profile"
      pageIcon={<User size={20} className="text-white" />}
      pageDescription="Manage your profile, achievements, and preferences"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
