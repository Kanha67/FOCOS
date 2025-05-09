
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ListCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  icon?: string;
}

interface HabitTrackerProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
}

export default function HabitTracker({ habits, onToggleHabit }: HabitTrackerProps) {
  const { toast } = useToast();
  
  const handleToggle = (id: string, completed: boolean, name: string) => {
    onToggleHabit(id);
    
    if (!completed) {
      toast({
        title: "Habit completed! 🎉",
        description: `You've completed "${name}" - keep it up!`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full glass-card p-4 animate-scale-in">
      <div className="flex items-center mb-4">
        <ListCheck className="mr-2 text-primary" />
        <h2 className="text-lg font-semibold">Daily Habits</h2>
      </div>
      
      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No habits added yet. Create one in Settings.
          </div>
        ) : (
          habits.map((habit) => (
            <div 
              key={habit.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl transition-colors",
                habit.completed ? "bg-primary/10 dark:bg-primary/20" : "bg-secondary/50"
              )}
            >
              <div className="flex items-center">
                <button
                  onClick={() => handleToggle(habit.id, habit.completed, habit.name)}
                  className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center mr-3 transition-colors",
                    habit.completed 
                      ? "bg-primary text-white" 
                      : "bg-white/50 dark:bg-white/10 border border-primary/20"
                  )}
                >
                  {habit.completed && <Check size={14} />}
                </button>
                <span className={cn(
                  habit.completed && "line-through text-muted-foreground"
                )}>{habit.name}</span>
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                {habit.streak} day{habit.streak !== 1 ? "s" : ""}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
