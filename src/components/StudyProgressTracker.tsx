import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Clock, Award, TrendingUp, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: string;
}

export default function StudyProgressTracker() {
  const { toast } = useToast();
  const [studySessions, setStudySessions] = useState<StudySession[]>([
    { id: "1", subject: "Mathematics", duration: 60, date: "2023-06-10" },
    { id: "2", subject: "Physics", duration: 45, date: "2023-06-09" },
    { id: "3", subject: "Computer Science", duration: 90, date: "2023-06-08" },
    { id: "4", subject: "English", duration: 30, date: "2023-06-07" },
    { id: "5", subject: "Mathematics", duration: 45, date: "2023-06-06" }
  ]);
  
  // Calculate total study time
  const totalStudyTime = studySessions.reduce((total, session) => total + session.duration, 0);
  
  // Calculate subject breakdown
  const subjectBreakdown = studySessions.reduce((acc, session) => {
    if (!acc[session.subject]) {
      acc[session.subject] = 0;
    }
    acc[session.subject] += session.duration;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate daily streak
  const dailyStreak = 5; // In a real app, this would be calculated based on consecutive days
  
  // Calculate progress towards weekly goal (e.g., 10 hours per week)
  const weeklyGoal = 600; // 10 hours in minutes
  const weeklyProgress = Math.min(100, Math.round((totalStudyTime / weeklyGoal) * 100));
  
  return (
    <div className="space-y-4">
      <Card className="glass-card p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <BookOpen size={20} className="text-indigo-500" />
            </div>
            <div>
              <h2 className="font-semibold">Study Progress</h2>
              <p className="text-xs text-muted-foreground">Weekly Goal: 10 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Award size={16} className="text-amber-400" />
            <span className="text-sm font-medium">{dailyStreak} day streak</span>
          </div>
        </div>
        
        <Progress value={weeklyProgress} className="h-2 mb-2" />
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-indigo-500" />
            <span>{Math.floor(totalStudyTime / 60)} hrs {totalStudyTime % 60} mins</span>
          </div>
          <span className="text-indigo-400">{weeklyProgress}% of weekly goal</span>
        </div>
      </Card>
      
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Brain size={18} className="text-purple-500" />
          Subject Breakdown
        </h3>
        
        <div className="space-y-3">
          {Object.entries(subjectBreakdown).map(([subject, minutes]) => (
            <div key={subject}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{subject}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.floor(minutes / 60)}h {minutes % 60}m
                </span>
              </div>
              <Progress 
                value={Math.round((minutes / totalStudyTime) * 100)} 
                className="h-2" 
                indicatorClassName={
                  subject === "Mathematics" ? "bg-blue-500" :
                  subject === "Physics" ? "bg-green-500" :
                  subject === "Computer Science" ? "bg-purple-500" :
                  "bg-amber-500"
                }
              />
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="glass-card p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp size={18} className="text-green-500" />
            Recent Study Sessions
          </h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: "Session logging will be available in the next update!",
              });
            }}
          >
            Log Session
          </Button>
        </div>
        
        <div className="space-y-2">
          {studySessions.slice(0, 3).map((session) => (
            <div key={session.id} className="flex justify-between items-center p-2 rounded-lg bg-indigo-500/5">
              <div>
                <p className="font-medium">{session.subject}</p>
                <p className="text-xs text-muted-foreground">{session.date}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.floor(session.duration / 60)}h {session.duration % 60}m
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-500" />
          Daily Challenge
        </h3>
        
        <div className="p-3 rounded-lg bg-amber-500/10">
          <p className="font-medium text-sm mb-2">Physics Challenge:</p>
          <p className="text-sm">A ball is thrown vertically upward with an initial velocity of 20 m/s. How high will it go?</p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 w-full text-xs"
            onClick={() => {
              toast({
                title: "Answer",
                description: "The ball will reach a height of 20.4 meters (using h = v²/2g, where g = 9.8 m/s²).",
              });
            }}
          >
            Show Answer
          </Button>
        </div>
      </Card>
    </div>
  );
}
