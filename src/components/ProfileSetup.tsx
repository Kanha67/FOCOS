import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Target, Brain, BookOpen, Dumbbell, Heart, DollarSign, Clock, Sparkles } from "lucide-react";

export interface UserGoal {
  id: string;
  category: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

export interface UserPreference {
  studyPreference: string;
  workoutPreference: string;
  focusSessionLength: number;
  notificationFrequency: string;
  primaryFocusArea: string;
  dailyGoalHours: number;
  weeklyReportDay: string;
  offlineModeEnabled: boolean;
  cloudSyncEnabled: boolean;
}

export default function ProfileSetup() {
  const { settings, updateSettings } = useAppContext();
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [preferences, setPreferences] = useState<UserPreference>({
    studyPreference: "pomodoro",
    workoutPreference: "strength",
    focusSessionLength: 25,
    notificationFrequency: "medium",
    primaryFocusArea: "study",
    dailyGoalHours: 2,
    weeklyReportDay: "sunday",
    offlineModeEnabled: true,
    cloudSyncEnabled: false
  });
  
  // New goal form state
  const [newGoal, setNewGoal] = useState<Partial<UserGoal>>({
    category: "study",
    title: "",
    targetValue: 0,
    unit: "hours",
    deadline: ""
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("focos_username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    const savedBio = localStorage.getItem("focos_user_bio");
    if (savedBio) {
      setBio(savedBio);
    }
    
    const savedGoals = localStorage.getItem("focos_user_goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    
    const savedPreferences = localStorage.getItem("focos_user_preferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);
  
  // Save user data to localStorage when it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("focos_username", username);
    }
    
    if (bio) {
      localStorage.setItem("focos_user_bio", bio);
    }
    
    localStorage.setItem("focos_user_goals", JSON.stringify(goals));
    localStorage.setItem("focos_user_preferences", JSON.stringify(preferences));
  }, [username, bio, goals, preferences]);
  
  const handleUpdateProfile = () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem("focos_username", username);
    localStorage.setItem("focos_user_bio", bio);
    
    toast({
      title: "Success",
      description: "Profile updated successfully"
    });
  };
  
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const goal: UserGoal = {
      id: Date.now().toString(),
      category: newGoal.category || "study",
      title: newGoal.title,
      targetValue: newGoal.targetValue || 0,
      currentValue: 0,
      unit: newGoal.unit || "hours",
      deadline: newGoal.deadline,
      completed: false
    };
    
    setGoals(prev => [...prev, goal]);
    
    // Reset form
    setNewGoal({
      category: "study",
      title: "",
      targetValue: 0,
      unit: "hours",
      deadline: ""
    });
    
    toast({
      title: "Success",
      description: "Goal added successfully"
    });
  };
  
  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    
    toast({
      title: "Success",
      description: "Goal deleted successfully"
    });
  };
  
  const handleToggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const handleUpdatePreferences = () => {
    localStorage.setItem("focos_user_preferences", JSON.stringify(preferences));
    
    // Update app settings based on preferences
    updateSettings({
      focusDuration: preferences.focusSessionLength,
      notificationsEnabled: preferences.notificationFrequency !== "none"
    });
    
    toast({
      title: "Success",
      description: "Preferences updated successfully"
    });
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "study":
        return <BookOpen size={16} className="text-blue-500" />;
      case "fitness":
        return <Dumbbell size={16} className="text-green-500" />;
      case "health":
        return <Heart size={16} className="text-red-500" />;
      case "finance":
        return <DollarSign size={16} className="text-amber-500" />;
      case "spiritual":
        return <Sparkles size={16} className="text-purple-500" />;
      default:
        return <Target size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="glass-card w-full p-1 mb-4 grid grid-cols-3 rounded-xl shadow-md">
          <TabsTrigger 
            value="profile" 
            className="flex items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="goals" 
            className="flex items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Target size={16} />
            <span>Goals</span>
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="flex items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Brain size={16} />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Your Profile</h2>
                <p className="text-xs text-muted-foreground">Personalize your FOCOS experience</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself and your goals"
                  className="glass-input min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={handleUpdateProfile}
                className="w-full"
              >
                Save Profile
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
                <Target size={24} className="text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Your Goals</h2>
                <p className="text-xs text-muted-foreground">Set and track your personal goals</p>
              </div>
            </div>
            
            {/* Add New Goal Form */}
            <div className="space-y-4 mb-6 p-4 bg-background/40 rounded-lg border border-border/50">
              <h3 className="text-sm font-semibold">Add New Goal</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-category">Category</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) => setNewGoal({...newGoal, category: value})}
                  >
                    <SelectTrigger id="goal-category" className="glass-input">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Deadline</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="glass-input"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g., Read 10 books, Run 5km, etc."
                  className="glass-input"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Value</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({...newGoal, targetValue: Number(e.target.value)})}
                    className="glass-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-unit">Unit</Label>
                  <Select
                    value={newGoal.unit}
                    onValueChange={(value) => setNewGoal({...newGoal, unit: value})}
                  >
                    <SelectTrigger id="goal-unit" className="glass-input">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="pages">Pages</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="km">Kilometers</SelectItem>
                      <SelectItem value="sessions">Sessions</SelectItem>
                      <SelectItem value="percent">Percent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleAddGoal}
                className="w-full"
              >
                Add Goal
              </Button>
            </div>
            
            {/* Goals List */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Your Current Goals</h3>
              
              {goals.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  You haven't set any goals yet. Add your first goal above!
                </p>
              ) : (
                goals.map(goal => (
                  <div 
                    key={goal.id} 
                    className={`p-3 rounded-lg border ${goal.completed ? 'bg-primary/10 border-primary/30' : 'bg-background/40 border-border/50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(goal.category)}
                        <span className={`text-sm font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={goal.completed}
                          onCheckedChange={() => handleToggleGoal(goal.id)}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>
                        Progress: {goal.currentValue}/{goal.targetValue} {goal.unit}
                      </span>
                      <span>
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${Math.min(100, (goal.currentValue / goal.targetValue) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
                <Brain size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Your Preferences</h2>
                <p className="text-xs text-muted-foreground">Customize your app experience</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-3">
                <Label>Primary Focus Area</Label>
                <Select
                  value={preferences.primaryFocusArea}
                  onValueChange={(value) => setPreferences({...preferences, primaryFocusArea: value})}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="study">Study</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="spiritual">Spiritual</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Study Preference</Label>
                <Select
                  value={preferences.studyPreference}
                  onValueChange={(value) => setPreferences({...preferences, studyPreference: value})}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select study method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pomodoro">Pomodoro Technique</SelectItem>
                    <SelectItem value="flowstate">Flow State</SelectItem>
                    <SelectItem value="spaced">Spaced Repetition</SelectItem>
                    <SelectItem value="active">Active Recall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Workout Preference</Label>
                <Select
                  value={preferences.workoutPreference}
                  onValueChange={(value) => setPreferences({...preferences, workoutPreference: value})}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Focus Session Length</Label>
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                    {preferences.focusSessionLength} min
                  </span>
                </div>
                <Slider
                  min={5}
                  max={60}
                  step={5}
                  value={[preferences.focusSessionLength]}
                  onValueChange={(value) => setPreferences({...preferences, focusSessionLength: value[0]})}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Daily Goal Hours</Label>
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                    {preferences.dailyGoalHours} hours
                  </span>
                </div>
                <Slider
                  min={1}
                  max={12}
                  step={0.5}
                  value={[preferences.dailyGoalHours]}
                  onValueChange={(value) => setPreferences({...preferences, dailyGoalHours: value[0]})}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Notification Frequency</Label>
                <Select
                  value={preferences.notificationFrequency}
                  onValueChange={(value) => setPreferences({...preferences, notificationFrequency: value})}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select notification frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (Frequent Reminders)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="low">Low (Minimal)</SelectItem>
                    <SelectItem value="none">None (Disabled)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Weekly Report Day</Label>
                <Select
                  value={preferences.weeklyReportDay}
                  onValueChange={(value) => setPreferences({...preferences, weeklyReportDay: value})}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select day for weekly report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Sync & Storage</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="offline-mode"
                    checked={preferences.offlineModeEnabled}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, offlineModeEnabled: checked as boolean})
                    }
                  />
                  <Label htmlFor="offline-mode" className="text-sm cursor-pointer">
                    Enable Offline Mode
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cloud-sync"
                    checked={preferences.cloudSyncEnabled}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, cloudSyncEnabled: checked as boolean})
                    }
                  />
                  <Label htmlFor="cloud-sync" className="text-sm cursor-pointer">
                    Enable Cloud Sync
                  </Label>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  Note: Cloud sync requires an account. Your data is always stored locally first for privacy.
                </p>
              </div>
              
              <Button 
                onClick={handleUpdatePreferences}
                className="w-full"
              >
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
