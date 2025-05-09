import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Star, Trophy, Zap, Target, BookOpen, Dumbbell, Brain, Heart, Sparkles } from "lucide-react";

export default function AchievementSystem() {
  const { userXp, achievements } = useAppContext();
  const [level, setLevel] = useState(1);
  const [xpToNextLevel, setXpToNextLevel] = useState(100);
  const [xpProgress, setXpProgress] = useState(0);
  
  // Calculate level and XP progress
  useEffect(() => {
    // Simple level calculation: Each level requires 100 * level XP
    let remainingXp = userXp;
    let currentLevel = 1;
    let xpRequired = 100;
    
    while (remainingXp >= xpRequired) {
      remainingXp -= xpRequired;
      currentLevel++;
      xpRequired = 100 * currentLevel;
    }
    
    setLevel(currentLevel);
    setXpToNextLevel(xpRequired);
    setXpProgress(Math.floor((remainingXp / xpRequired) * 100));
  }, [userXp]);
  
  // Define achievement categories
  const achievementCategories = [
    { id: "all", label: "All", icon: <Trophy size={16} /> },
    { id: "study", label: "Study", icon: <BookOpen size={16} /> },
    { id: "fitness", label: "Fitness", icon: <Dumbbell size={16} /> },
    { id: "productivity", label: "Productivity", icon: <Zap size={16} /> },
    { id: "spiritual", label: "Spiritual", icon: <Sparkles size={16} /> }
  ];
  
  // Define all achievements
  const allAchievements = [
    // Study achievements
    { 
      id: "study_1", 
      title: "Study Beginner", 
      description: "Complete your first study session", 
      category: "study",
      xpReward: 50,
      icon: <BookOpen size={20} className="text-blue-500" />,
      unlocked: achievements.some(a => a.id === "1" && a.unlocked),
      progress: 100
    },
    { 
      id: "study_2", 
      title: "Knowledge Seeker", 
      description: "Complete 10 study sessions", 
      category: "study",
      xpReward: 100,
      icon: <BookOpen size={20} className="text-blue-500" />,
      unlocked: achievements.some(a => a.id === "3" && a.unlocked),
      progress: 70
    },
    { 
      id: "study_3", 
      title: "Academic Master", 
      description: "Study for a total of 50 hours", 
      category: "study",
      xpReward: 200,
      icon: <BookOpen size={20} className="text-blue-500" />,
      unlocked: false,
      progress: 35
    },
    
    // Fitness achievements
    { 
      id: "fitness_1", 
      title: "Fitness Starter", 
      description: "Complete your first workout", 
      category: "fitness",
      xpReward: 50,
      icon: <Dumbbell size={20} className="text-green-500" />,
      unlocked: true,
      progress: 100
    },
    { 
      id: "fitness_2", 
      title: "Consistent Athlete", 
      description: "Complete workouts for 7 days in a row", 
      category: "fitness",
      xpReward: 150,
      icon: <Dumbbell size={20} className="text-green-500" />,
      unlocked: false,
      progress: 40
    },
    
    // Productivity achievements
    { 
      id: "productivity_1", 
      title: "Task Master", 
      description: "Complete 20 tasks", 
      category: "productivity",
      xpReward: 100,
      icon: <Zap size={20} className="text-amber-500" />,
      unlocked: false,
      progress: 60
    },
    { 
      id: "productivity_2", 
      title: "Habit Builder", 
      description: "Maintain a habit for 21 days", 
      category: "productivity",
      xpReward: 200,
      icon: <Zap size={20} className="text-amber-500" />,
      unlocked: false,
      progress: 20
    },
    
    // Spiritual achievements
    { 
      id: "spiritual_1", 
      title: "Inner Peace", 
      description: "Complete 5 meditation sessions", 
      category: "spiritual",
      xpReward: 100,
      icon: <Sparkles size={20} className="text-purple-500" />,
      unlocked: false,
      progress: 80
    }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* XP and Level Card */}
      <Card className="glass-card p-5 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
            <Star size={24} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Level {level}</h2>
            <p className="text-xs text-muted-foreground">
              {userXp} XP total • {xpProgress}% to next level
            </p>
          </div>
          <Badge variant="outline" className="ml-auto px-2 py-1 bg-amber-500/10">
            {level < 5 ? "Beginner" : level < 10 ? "Intermediate" : level < 20 ? "Advanced" : "Master"}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Level {level}</span>
            <span>Level {level + 1}</span>
          </div>
          <Progress value={xpProgress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {xpToNextLevel - Math.floor(xpProgress * xpToNextLevel / 100)} XP needed for next level
          </p>
        </div>
      </Card>
      
      {/* Achievements Card */}
      <Card className="glass-card p-5 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <Award size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Achievements</h2>
            <p className="text-xs text-muted-foreground">
              {allAchievements.filter(a => a.unlocked).length} of {allAchievements.length} unlocked
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full mb-4 flex overflow-x-auto hide-scrollbar">
            {achievementCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id} 
                className="flex items-center gap-1 py-1 px-3 data-[state=active]:bg-primary/10 data-[state=active]:shadow-sm transition-all rounded-lg text-xs font-medium"
              >
                {category.icon}
                <span>{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {achievementCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-3">
              {allAchievements
                .filter(achievement => category.id === "all" || achievement.category === category.id)
                .map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`p-3 rounded-lg border ${achievement.unlocked ? 'bg-primary/10 border-primary/30' : 'bg-background/40 border-border/50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{achievement.title}</h3>
                          <Badge variant={achievement.unlocked ? "default" : "outline"} className="text-xs">
                            {achievement.unlocked ? "Unlocked" : `+${achievement.xpReward} XP`}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                        {!achievement.unlocked && (
                          <div className="mt-2">
                            <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1 text-muted-foreground">
                              {achievement.progress}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
