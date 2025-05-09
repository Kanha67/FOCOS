import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppearanceSettings from "@/components/AppearanceSettings";
import NotificationSettings from "@/components/NotificationSettings";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  Gamepad,
  Info,
  Bell,
  User,
  Sparkles,
  Eye,
  Trash2,
  ChevronRight,
  Shield,
  Cloud,
  Lock,
  Palette,
  Smartphone,
  HelpCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import DesktopLayout from "@/components/DesktopLayout";
import ThemeToggle from "@/components/ThemeToggle";

export default function Settings() {
  const { toast } = useToast();
  const { settings, updateSettings } = useAppContext();
  const [username, setUsername] = useState(() => localStorage.getItem("focos_username") || "");

  const handleUpdateUsername = () => {
    if (username.trim()) {
      localStorage.setItem("focos_username", username);
      toast({
        title: "Username updated",
        description: "Your username has been updated successfully",
      });
    }
  };

  const handleToggleDistractionFree = () => {
    updateSettings({ distractionFreeMode: !settings.distractionFreeMode });
    toast({
      title: settings.distractionFreeMode ? "Distraction-free mode disabled" : "Distraction-free mode enabled",
      description: settings.distractionFreeMode
        ? "All elements are now visible"
        : "Navigation and non-essential elements are hidden",
    });
  };

  const handleToggleDivineMode = () => {
    updateSettings({ divineMode: !settings.divineMode });
    toast({
      title: settings.divineMode ? "Divine mode disabled" : "Divine mode enabled",
      description: settings.divineMode
        ? "Returning to normal mode"
        : "Embracing the divine wisdom of Krishna",
    });
  };

  const handleClearData = () => {
    // Show confirmation before clearing data
    if (confirm("Are you sure you want to clear all app data? This cannot be undone.")) {
      localStorage.clear();
      toast({
        title: "Data cleared",
        description: "All app data has been cleared. The app will now reload.",
      });

      // Redirect to index after clearing data
      setTimeout(() => {
        window.location.href = "/index";
      }, 2000);
    }
  };

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={handleToggleDivineMode}
      >
        <Sparkles size={16} className="text-blue-400" />
        <span className="font-medium">{settings.divineMode ? 'Disable Divine Mode' : 'Enable Divine Mode'}</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout - Navigation menu
  const leftColumnContent = (
    <>
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <SettingsIcon size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-xs text-muted-foreground">Configure your preferences</p>
          </div>
        </div>

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <User size={18} />
            <span>Profile</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <Eye size={18} />
            <span>Appearance</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <Bell size={18} />
            <span>Notifications</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <Shield size={18} />
            <span>Privacy & Security</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <Cloud size={18} />
            <span>Backup & Sync</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <Info size={18} />
            <span>About</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 py-3 text-left">
            <HelpCircle size={18} />
            <span>Help & Support</span>
          </Button>
        </div>
      </motion.div>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className={`pt-6 pb-24 px-4 max-w-md mx-auto min-h-screen ${settings.divineMode ? "divine-background" : ""}`}>
      <h1 className={`text-2xl font-bold mb-6 animate-fade-in text-center ${settings.divineMode ? "text-amber-700" : "text-primary"}`}>
        Settings
      </h1>
      <Tabs defaultValue="profile" className="w-full animate-fade-in">
        <TabsList className="glass-card w-full p-1.5 mb-6 grid grid-cols-4 rounded-xl shadow-md">
          <TabsTrigger
            value="profile"
            className="flex flex-col items-center gap-1 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <User size={18} />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex flex-col items-center gap-1 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Eye size={18} />
            <span className="text-xs">Theme</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex flex-col items-center gap-1 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Bell size={18} />
            <span className="text-xs">Alerts</span>
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="flex flex-col items-center gap-1 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Info size={18} />
            <span className="text-xs">About</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="animate-scale-in">
          <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-xs text-muted-foreground">Manage your username</p>
              </div>
            </div>
            <div className="space-y-2">
              <input
                className="w-full px-3 py-2 rounded-lg border border-input bg-background/80 focus:ring-2 focus:ring-primary/30 outline-none text-sm transition-all"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                maxLength={32}
              />
              <Button className="w-full mt-2" onClick={handleUpdateUsername}>
                Update Username
              </Button>
            </div>
          </Card>
          <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-400/40 flex items-center justify-center">
                <Eye size={20} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Distraction-Free Mode</h2>
                <p className="text-xs text-muted-foreground">Minimal UI for better focus</p>
              </div>
            </div>
            <Button
              variant={settings.distractionFreeMode ? "default" : "outline"}
              className={`w-full ${settings.distractionFreeMode ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
              onClick={handleToggleDistractionFree}
            >
              {settings.distractionFreeMode ? 'Disable Distraction-Free' : 'Enable Distraction-Free'}
            </Button>
          </Card>
          <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400/20 to-red-400/40 flex items-center justify-center">
                <Trash2 size={20} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Data Management</h2>
                <p className="text-xs text-muted-foreground">Manage your app data</p>
              </div>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleClearData}
            >
              Clear All App Data
            </Button>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="animate-scale-in">
          <AppearanceSettings />
        </TabsContent>
        <TabsContent value="notifications" className="animate-scale-in">
          <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
                <Bell size={20} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Notification Settings</h2>
                <p className="text-xs text-muted-foreground">Manage alerts and reminders</p>
              </div>
            </div>
          </Card>
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="about" className="animate-scale-in">
          <Card className="glass-card p-5 space-y-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/40 flex items-center justify-center">
                <Info size={20} className="text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">About</h2>
                <p className="text-xs text-muted-foreground">App information and support</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-background/40 p-3 rounded-lg border border-border/50">
                <h3 className="font-semibold">FOCOS</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Version 1.2.0</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Latest</span>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-500">✓</span>
                  </div>
                  <h3 className="text-sm font-semibold text-green-600">What's New in v1.2.0</h3>
                </div>
                <ul className="space-y-1 text-xs pl-7 list-disc text-muted-foreground">
                  <li>Profile setup with goals & preferences</li>
                  <li>XP & achievement system (Gamified Progress)</li>
                  <li>Daily/Weekly summaries with insights</li>
                  <li>Offline support + cloud sync</li>
                  <li>Fully local storage fallback for privacy</li>
                  <li>Enhanced solver with definitions</li>
                  <li>New Devotional Mode with spiritual features</li>
                </ul>
              </div>
              <p className="text-sm leading-relaxed">
                FOCOS is a personal productivity and life guidance assistant that helps you focus, track habits, manage your finances, and receive divine wisdom.
                With features like Pomodoro timer, habit tracking, financial planning, and spiritual guidance, FOCOS is designed to improve your life holistically.
              </p>

              <div className="mt-4 mb-4">
                <h3 className="font-semibold text-primary mb-2">Upcoming Updates</h3>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <div>
                        <span className="font-medium">Advanced Theme System</span>
                        <p className="text-xs text-muted-foreground">Custom color palettes, theme presets, and seasonal themes with automatic switching</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <div>
                        <span className="font-medium">Enhanced Progress Tracking</span>
                        <p className="text-xs text-muted-foreground">Detailed analytics, progress visualization, and personalized insights based on your activity</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-purple-500 mt-1"></div>
                      <div>
                        <span className="font-medium">AI-Powered Recommendations</span>
                        <p className="text-xs text-muted-foreground">Personalized suggestions for habits, study techniques, and productivity improvements</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-amber-500 mt-1"></div>
                      <div>
                        <span className="font-medium">Cross-Device Sync</span>
                        <p className="text-xs text-muted-foreground">Seamless synchronization across all your devices with end-to-end encryption</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-red-500 mt-1"></div>
                      <div>
                        <span className="font-medium">Community Features</span>
                        <p className="text-xs text-muted-foreground">Connect with like-minded users, share achievements, and participate in challenges</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 hover:bg-background/50 rounded-lg transition-colors">
                  <div className="text-sm">
                    <p className="font-medium">Developer</p>
                    <p className="text-muted-foreground">Unique Shiwakoti</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex justify-between items-center p-2 hover:bg-background/50 rounded-lg transition-colors">
                  <div className="text-sm">
                    <p className="font-medium">Organization</p>
                    <p className="text-muted-foreground">Ishrevi.io</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
                <Separator />
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  For feature requests or bug reports, DM on Instagram: uniqueshiwakoti5
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
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
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-xs text-muted-foreground">Manage your username</p>
          </div>
        </div>
        <div className="space-y-2">
          <input
            className="w-full px-3 py-2 rounded-lg border border-input bg-background/80 focus:ring-2 focus:ring-primary/30 outline-none text-sm transition-all"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
            maxLength={32}
          />
          <Button className="w-full mt-2" onClick={handleUpdateUsername}>
            Update Username
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-400/40 flex items-center justify-center">
            <Eye size={20} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Appearance</h2>
            <p className="text-xs text-muted-foreground">Customize the look and feel</p>
          </div>
        </div>
        <AppearanceSettings />
      </motion.div>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-400/40 flex items-center justify-center">
            <Sparkles size={20} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Special Modes</h2>
            <p className="text-xs text-muted-foreground">Enable special app modes</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/15 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-blue-500" />
                <h3 className="font-medium">Distraction-Free Mode</h3>
              </div>
              <div className={`w-10 h-5 rounded-full ${settings.distractionFreeMode ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${settings.distractionFreeMode ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Hide navigation and non-essential elements for better focus</p>
            <Button
              variant={settings.distractionFreeMode ? "default" : "outline"}
              size="sm"
              className={`w-full mt-2 ${settings.distractionFreeMode ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
              onClick={handleToggleDistractionFree}
            >
              {settings.distractionFreeMode ? 'Disable' : 'Enable'}
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-amber-500/10 hover:bg-amber-500/15 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <h3 className="font-medium">Divine Mode</h3>
              </div>
              <div className={`w-10 h-5 rounded-full ${settings.divineMode ? 'bg-amber-500' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${settings.divineMode ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Embrace the divine wisdom of Krishna with a spiritual theme</p>
            <Button
              variant={settings.divineMode ? "default" : "outline"}
              size="sm"
              className={`w-full mt-2 ${settings.divineMode ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}
              onClick={handleToggleDivineMode}
            >
              {settings.divineMode ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400/20 to-red-400/40 flex items-center justify-center">
            <Trash2 size={20} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Data Management</h2>
            <p className="text-xs text-muted-foreground">Manage your app data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/10 hover:bg-red-500/15 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 size={18} className="text-red-500" />
              <h3 className="font-medium">Clear All Data</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">This will permanently delete all your app data including tasks, habits, and settings.</p>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleClearData}
            >
              Clear All App Data
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );

  return (
    <DesktopLayout
      pageTitle="Settings"
      pageIcon={<SettingsIcon size={20} className="text-white" />}
      pageDescription="Customize your app preferences"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
