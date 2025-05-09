import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Brain, 
  Target, 
  Sparkles, 
  BarChart, 
  Clock, 
  Sun, 
  Moon, 
  Zap, 
  Heart, 
  Smile, 
  Frown, 
  Meh,
  CheckCircle2,
  BookOpen,
  Dumbbell,
  DollarSign
} from "lucide-react";

// Mock data for demo purposes
const mockTasks = [
  { id: 1, title: "Complete math assignment", completed: false, category: "study", priority: "high" },
  { id: 2, title: "30 minute workout", completed: true, category: "fitness", priority: "medium" },
  { id: 3, title: "Meditate for 10 minutes", completed: false, category: "wellness", priority: "medium" },
  { id: 4, title: "Review monthly budget", completed: false, category: "finance", priority: "low" }
];

const mockMeetings = [
  { id: 1, title: "Study group", time: "14:00", duration: 60 },
  { id: 2, title: "Yoga class", time: "18:30", duration: 45 }
];

const mockSuggestions = [
  "Take a 5-minute break to stretch and refresh your mind.",
  "Your focus score is higher in the morning. Consider scheduling important tasks before noon.",
  "You've been consistent with your meditation habit. Try increasing the duration by 2 minutes.",
  "Based on your spending patterns, consider setting a budget for dining out.",
  "Your sleep pattern has been irregular. Try to maintain a consistent sleep schedule.",
  "You've been making great progress on your fitness goals. Consider adding a new challenge.",
  "Remember to drink water throughout the day to stay hydrated and maintain focus."
];

export default function SmartDashboard() {
  const { settings, habits, completedSessions, userXp } = useAppContext();
  const [focusScore, setFocusScore] = useState<number>(0);
  const [mood, setMood] = useState<"happy" | "neutral" | "sad" | null>(null);
  const [todaysTasks, setTodaysTasks] = useState(mockTasks);
  const [todaysMeetings, setTodaysMeetings] = useState(mockMeetings);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning");
  
  // Calculate time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay("morning");
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay("afternoon");
    } else if (hour >= 17 && hour < 21) {
      setTimeOfDay("evening");
    } else {
      setTimeOfDay("night");
    }
  }, []);
  
  // Calculate focus score based on completed sessions, habits, and time of day
  useEffect(() => {
    // This would ideally use a more sophisticated algorithm with real data
    const baseScore = 50;
    const completedSessionsBonus = Math.min(completedSessions * 2, 20);
    const habitsBonus = Math.min(habits.filter(h => h.completed).length * 5, 20);
    const timeBonus = timeOfDay === "morning" ? 10 : timeOfDay === "afternoon" ? 5 : 0;
    
    const calculatedScore = Math.min(baseScore + completedSessionsBonus + habitsBonus + timeBonus, 100);
    setFocusScore(calculatedScore);
  }, [completedSessions, habits, timeOfDay]);
  
  // Generate AI suggestions
  useEffect(() => {
    // In a real implementation, this would call an AI service
    // For now, we'll randomly select 3 suggestions
    const selectedSuggestions = [...mockSuggestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setSuggestions(selectedSuggestions);
  }, []);
  
  // Toggle task completion
  const toggleTask = (id: number) => {
    setTodaysTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  // Get greeting based on time of day
  const getGreeting = () => {
    switch (timeOfDay) {
      case "morning": return "Good morning";
      case "afternoon": return "Good afternoon";
      case "evening": return "Good evening";
      case "night": return "Good night";
      default: return "Hello";
    }
  };
  
  // Get mood icon
  const getMoodIcon = () => {
    switch (mood) {
      case "happy": return <Smile className="text-green-500" />;
      case "neutral": return <Meh className="text-amber-500" />;
      case "sad": return <Frown className="text-red-500" />;
      default: return null;
    }
  };
  
  // Get focus score color
  const getFocusScoreColor = () => {
    if (focusScore >= 80) return "text-green-500";
    if (focusScore >= 60) return "text-blue-500";
    if (focusScore >= 40) return "text-amber-500";
    return "text-red-500";
  };
  
  // Get progress color
  const getProgressColor = () => {
    if (focusScore >= 80) return "bg-green-500";
    if (focusScore >= 60) return "bg-blue-500";
    if (focusScore >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header with greeting and date */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-bold">
            {getGreeting()}, {localStorage.getItem("focos_username") || "User"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {timeOfDay === "morning" || timeOfDay === "afternoon" ? (
            <Sun size={20} className="text-amber-500" />
          ) : (
            <Moon size={20} className="text-blue-500" />
          )}
          <Badge variant="outline" className="px-2 py-1 capitalize">
            {timeOfDay}
          </Badge>
        </div>
      </div>
      
      {/* Focus Score and Mood */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass-card p-3 rounded-xl shadow-md hover-glow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Focus Score</h3>
            <Zap size={16} className="text-amber-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className={`text-2xl font-bold ${getFocusScoreColor()}`}>{focusScore}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
          <Progress value={focusScore} className={`h-1.5 mt-2 ${getProgressColor()}`} />
        </Card>
        
        <Card className="glass-card p-3 rounded-xl shadow-md hover-glow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Today's Mood</h3>
            <Heart size={16} className="text-red-500" />
          </div>
          {mood ? (
            <div className="flex items-center gap-2">
              {getMoodIcon()}
              <span className="text-sm capitalize">{mood}</span>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto" 
                onClick={() => setMood("happy")}
              >
                <Smile size={24} className="text-green-500 hover:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto" 
                onClick={() => setMood("neutral")}
              >
                <Meh size={24} className="text-amber-500 hover:scale-110 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto" 
                onClick={() => setMood("sad")}
              >
                <Frown size={24} className="text-red-500 hover:scale-110 transition-transform" />
              </Button>
            </div>
          )}
        </Card>
      </div>
      
      {/* Today's Overview */}
      <Card className="glass-card p-4 rounded-xl shadow-md hover-glow">
        <Tabs defaultValue="tasks">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Today's Overview</h3>
            <TabsList className="h-8 p-1">
              <TabsTrigger value="tasks" className="text-xs px-2 py-1 h-6">
                Tasks
              </TabsTrigger>
              <TabsTrigger value="habits" className="text-xs px-2 py-1 h-6">
                Habits
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-xs px-2 py-1 h-6">
                Schedule
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tasks" className="mt-0">
            <div className="space-y-2">
              {todaysTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No tasks for today. Add some to get started!
                </p>
              ) : (
                todaysTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-2 rounded-lg border ${
                      task.completed ? 'bg-primary/10 border-primary/30' : 'bg-background/40 border-border/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => toggleTask(task.id)}
                      >
                        <CheckCircle2 
                          size={18} 
                          className={task.completed ? 'text-primary' : 'text-muted-foreground'}
                          fill={task.completed ? 'currentColor' : 'none'}
                        />
                      </Button>
                      <div>
                        <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-1">
                          {task.category === "study" && <BookOpen size={12} className="text-blue-500" />}
                          {task.category === "fitness" && <Dumbbell size={12} className="text-green-500" />}
                          {task.category === "finance" && <DollarSign size={12} className="text-amber-500" />}
                          {task.category === "wellness" && <Heart size={12} className="text-red-500" />}
                          <span className="text-xs text-muted-foreground capitalize">{task.category}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        task.priority === "high" ? 'border-red-500 text-red-500' :
                        task.priority === "medium" ? 'border-amber-500 text-amber-500' :
                        'border-blue-500 text-blue-500'
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="habits" className="mt-0">
            <div className="space-y-2">
              {habits.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No habits tracked yet. Add some to build consistency!
                </p>
              ) : (
                habits.map(habit => (
                  <div 
                    key={habit.id} 
                    className={`flex items-center justify-between p-2 rounded-lg border ${
                      habit.completed ? 'bg-primary/10 border-primary/30' : 'bg-background/40 border-border/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${habit.completed ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                      <p className={`text-sm ${habit.completed ? 'text-muted-foreground' : ''}`}>
                        {habit.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-0">
            <div className="space-y-2">
              {todaysMeetings.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No meetings scheduled for today.
                </p>
              ) : (
                todaysMeetings.map(meeting => (
                  <div 
                    key={meeting.id} 
                    className="flex items-center justify-between p-2 rounded-lg border bg-background/40 border-border/50"
                  >
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <p className="text-sm">{meeting.title}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {meeting.time} • {meeting.duration} min
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Vasudev's Suggestions */}
      <Card className="glass-card p-4 rounded-xl shadow-md hover-glow">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className={settings.divineMode ? "text-amber-500" : "text-primary"} />
          <h3 className="text-sm font-semibold">Today's Suggestions from Vasudev</h3>
        </div>
        
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="p-2 rounded-lg bg-primary/5 border border-primary/20"
            >
              <p className="text-sm">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>
      
      {/* XP and Level */}
      <Card className="glass-card p-3 rounded-xl shadow-md hover-glow">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-primary" />
            <h3 className="text-sm font-semibold">Your Progress</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Level {Math.floor(userXp / 100) + 1}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{userXp % 100} XP</span>
            <span>100 XP</span>
          </div>
          <Progress value={userXp % 100} className="h-1.5" />
          <p className="text-xs text-muted-foreground text-center mt-1">
            {100 - (userXp % 100)} XP until next level
          </p>
        </div>
      </Card>
    </div>
  );
}
