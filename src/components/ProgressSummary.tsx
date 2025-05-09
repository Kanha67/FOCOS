import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Calendar, Clock, Target, TrendingUp, Award, BookOpen, Dumbbell, Heart, DollarSign } from "lucide-react";
import { UserGoal } from "./ProfileSetup";

// Mock data for charts
const mockDailyData = [
  { day: "Mon", study: 2.5, fitness: 1, productivity: 3 },
  { day: "Tue", study: 3, fitness: 0.5, productivity: 2 },
  { day: "Wed", study: 1.5, fitness: 1.5, productivity: 2.5 },
  { day: "Thu", study: 4, fitness: 0, productivity: 1 },
  { day: "Fri", study: 2, fitness: 2, productivity: 3 },
  { day: "Sat", study: 1, fitness: 3, productivity: 1.5 },
  { day: "Sun", study: 0.5, fitness: 1, productivity: 0.5 }
];

const mockWeeklyData = [
  { week: "Week 1", study: 12, fitness: 5, productivity: 10 },
  { week: "Week 2", study: 15, fitness: 8, productivity: 12 },
  { week: "Week 3", study: 10, fitness: 10, productivity: 15 },
  { week: "Week 4", study: 18, fitness: 7, productivity: 13 }
];

export default function ProgressSummary() {
  const { completedSessions, habits, tasks, userXp } = useAppContext();
  const [dailyStats, setDailyStats] = useState({
    studyHours: 0,
    fitnessHours: 0,
    tasksCompleted: 0,
    habitsCompleted: 0,
    focusSessions: 0,
    xpGained: 0
  });
  const [weeklyStats, setWeeklyStats] = useState({
    studyHours: 0,
    fitnessHours: 0,
    tasksCompleted: 0,
    habitsCompleted: 0,
    focusSessions: 0,
    xpGained: 0,
    streak: 0
  });
  const [goals, setGoals] = useState<UserGoal[]>([]);
  
  // Load user goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem("focos_user_goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);
  
  // Calculate daily stats (in a real app, this would come from actual tracking data)
  useEffect(() => {
    // For demo purposes, we'll use some calculated values based on the app state
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const completedHabitsCount = habits.filter(habit => habit.completed).length;
    
    // Get today's data from mock data (assuming today is the last day in the array)
    const todayData = mockDailyData[mockDailyData.length - 1];
    
    setDailyStats({
      studyHours: todayData.study,
      fitnessHours: todayData.fitness,
      tasksCompleted: completedTasksCount,
      habitsCompleted: completedHabitsCount,
      focusSessions: completedSessions % 5, // Just for demo
      xpGained: 30 + (completedTasksCount * 5) + (completedHabitsCount * 10) // Simple calculation for demo
    });
  }, [tasks, habits, completedSessions]);
  
  // Calculate weekly stats
  useEffect(() => {
    // Sum up the daily data for the week
    const weeklyStudyHours = mockDailyData.reduce((sum, day) => sum + day.study, 0);
    const weeklyFitnessHours = mockDailyData.reduce((sum, day) => sum + day.fitness, 0);
    
    setWeeklyStats({
      studyHours: weeklyStudyHours,
      fitnessHours: weeklyFitnessHours,
      tasksCompleted: tasks.length, // Assuming all tasks were created this week
      habitsCompleted: habits.filter(habit => habit.streak > 0).length,
      focusSessions: completedSessions,
      xpGained: userXp % 500, // Just for demo
      streak: Math.max(...habits.map(habit => habit.streak))
    });
  }, [tasks, habits, completedSessions, userXp]);
  
  // Get day name
  const getDayName = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };
  
  // Get date string
  const getDateString = () => {
    return new Date().toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get week range string
  const getWeekRangeString = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const startMonth = startOfWeek.toLocaleDateString("en-US", { month: 'short' });
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: 'short' });
    
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${now.getFullYear()}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${now.getFullYear()}`;
    }
  };
  
  // Simple bar chart component
  const SimpleBarChart = ({ data, maxValue }: { data: { label: string, value: number, color: string }[], maxValue: number }) => {
    return (
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{item.label}</span>
              <span>{item.value} {item.label === "Tasks" || item.label === "Habits" ? "" : "hrs"}</span>
            </div>
            <div className="h-2 w-full bg-background rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="glass-card w-full p-1 mb-4 grid grid-cols-2 rounded-xl shadow-md">
          <TabsTrigger 
            value="daily" 
            className="flex items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <Calendar size={16} />
            <span>Daily Summary</span>
          </TabsTrigger>
          <TabsTrigger 
            value="weekly" 
            className="flex items-center gap-1 py-2 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-sm font-medium"
          >
            <BarChart size={16} />
            <span>Weekly Summary</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Daily Summary Tab */}
        <TabsContent value="daily" className="space-y-4">
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <Calendar size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Daily Summary</h2>
                <p className="text-xs text-muted-foreground">
                  {getDayName()}, {getDateString()}
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto text-xs">
                <Clock size={14} className="mr-1" />
                Save Offline
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex flex-col items-center">
                <BookOpen size={20} className="text-blue-500 mb-1" />
                <span className="text-lg font-semibold">{dailyStats.studyHours}h</span>
                <span className="text-xs text-muted-foreground">Study Time</span>
              </div>
              
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex flex-col items-center">
                <Dumbbell size={20} className="text-green-500 mb-1" />
                <span className="text-lg font-semibold">{dailyStats.fitnessHours}h</span>
                <span className="text-xs text-muted-foreground">Fitness Time</span>
              </div>
              
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col items-center">
                <Target size={20} className="text-amber-500 mb-1" />
                <span className="text-lg font-semibold">{dailyStats.tasksCompleted}</span>
                <span className="text-xs text-muted-foreground">Tasks Completed</span>
              </div>
              
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 flex flex-col items-center">
                <Heart size={20} className="text-purple-500 mb-1" />
                <span className="text-lg font-semibold">{dailyStats.habitsCompleted}</span>
                <span className="text-xs text-muted-foreground">Habits Completed</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Today's Activity</h3>
              
              <SimpleBarChart 
                data={[
                  { label: "Study", value: dailyStats.studyHours, color: "bg-blue-500" },
                  { label: "Fitness", value: dailyStats.fitnessHours, color: "bg-green-500" },
                  { label: "Tasks", value: dailyStats.tasksCompleted, color: "bg-amber-500" },
                  { label: "Habits", value: dailyStats.habitsCompleted, color: "bg-purple-500" }
                ]}
                maxValue={Math.max(dailyStats.studyHours, dailyStats.fitnessHours, dailyStats.tasksCompleted, dailyStats.habitsCompleted, 5)}
              />
              
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <div className="flex items-center gap-1 text-xs">
                  <Award size={14} className="text-primary" />
                  <span>+{dailyStats.xpGained} XP gained today</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp size={14} className="text-green-500" />
                  <span>{dailyStats.focusSessions} focus sessions</span>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Goals Progress Card */}
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
                <Target size={24} className="text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Goals Progress</h2>
                <p className="text-xs text-muted-foreground">
                  {goals.filter(goal => goal.completed).length} of {goals.length} completed
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {goals.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  You haven't set any goals yet. Add goals in your profile settings!
                </p>
              ) : (
                goals.slice(0, 3).map(goal => (
                  <div 
                    key={goal.id} 
                    className={`p-3 rounded-lg border ${goal.completed ? 'bg-primary/10 border-primary/30' : 'bg-background/40 border-border/50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {goal.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {goal.currentValue}/{goal.targetValue} {goal.unit}
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
              
              {goals.length > 3 && (
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Goals
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>
        
        {/* Weekly Summary Tab */}
        <TabsContent value="weekly" className="space-y-4">
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <BarChart size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Weekly Summary</h2>
                <p className="text-xs text-muted-foreground">
                  {getWeekRangeString()}
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto text-xs">
                <Clock size={14} className="mr-1" />
                Export PDF
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex flex-col items-center">
                <BookOpen size={20} className="text-blue-500 mb-1" />
                <span className="text-lg font-semibold">{weeklyStats.studyHours}h</span>
                <span className="text-xs text-muted-foreground">Total Study Time</span>
              </div>
              
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex flex-col items-center">
                <Dumbbell size={20} className="text-green-500 mb-1" />
                <span className="text-lg font-semibold">{weeklyStats.fitnessHours}h</span>
                <span className="text-xs text-muted-foreground">Total Fitness Time</span>
              </div>
              
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col items-center">
                <Target size={20} className="text-amber-500 mb-1" />
                <span className="text-lg font-semibold">{weeklyStats.tasksCompleted}</span>
                <span className="text-xs text-muted-foreground">Tasks Completed</span>
              </div>
              
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 flex flex-col items-center">
                <TrendingUp size={20} className="text-purple-500 mb-1" />
                <span className="text-lg font-semibold">{weeklyStats.streak} days</span>
                <span className="text-xs text-muted-foreground">Longest Streak</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Weekly Activity</h3>
              
              <div className="flex justify-between mb-2">
                {mockDailyData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                    <div className="relative w-8 h-20">
                      <div 
                        className="absolute bottom-0 w-2 bg-blue-500 rounded-t-sm left-0"
                        style={{ height: `${(day.study / 4) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute bottom-0 w-2 bg-green-500 rounded-t-sm right-0"
                        style={{ height: `${(day.fitness / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Study</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fitness</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <div className="flex items-center gap-1 text-xs">
                  <Award size={14} className="text-primary" />
                  <span>+{weeklyStats.xpGained} XP this week</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs">
                  <Clock size={14} className="text-amber-500" />
                  <span>{weeklyStats.focusSessions} focus sessions</span>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Weekly Insights Card */}
          <Card className="glass-card p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
                <Brain size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Weekly Insights</h2>
                <p className="text-xs text-muted-foreground">
                  Personalized analysis of your week
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-background/40 border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-green-500" />
                  <h3 className="text-sm font-medium">Most Productive Day</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Thursday was your most productive day with 4 hours of study time and 1 completed task.
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-background/40 border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Dumbbell size={16} className="text-green-500" />
                  <h3 className="text-sm font-medium">Fitness Achievement</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  You spent {weeklyStats.fitnessHours} hours on fitness this week, which is {weeklyStats.fitnessHours > 7 ? "above" : "below"} your weekly goal.
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-background/40 border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={16} className="text-blue-500" />
                  <h3 className="text-sm font-medium">Study Pattern</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your study time is most effective in the morning. Consider scheduling important study sessions before noon.
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-background/40 border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={16} className="text-amber-500" />
                  <h3 className="text-sm font-medium">Recommendation</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Try to maintain a more consistent daily schedule. Your productivity varies significantly day to day.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
