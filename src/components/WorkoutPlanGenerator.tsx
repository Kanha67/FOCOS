import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dumbbell, Clock, Loader2, ChevronRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";

interface WorkoutPlan {
  goal: string;
  level: string;
  days: string;
  workouts: {
    day: string;
    exercises: {
      name: string;
      sets: number;
      reps: string;
      rest: string;
    }[];
  }[];
}

export default function WorkoutPlanGenerator() {
  const { settings } = useAppContext();
  const { toast } = useToast();
  const [goal, setGoal] = useState("strength");
  const [level, setLevel] = useState("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState("3");
  const [isLoading, setIsLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  
  const handleGeneratePlan = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the Gemini API
      // For now, we'll simulate a response with sample data
      setTimeout(() => {
        const samplePlan: WorkoutPlan = {
          goal,
          level,
          days: daysPerWeek,
          workouts: [
            {
              day: "Day 1 - Upper Body",
              exercises: [
                { name: "Push-ups", sets: 3, reps: "10-12", rest: "60 sec" },
                { name: "Dumbbell Rows", sets: 3, reps: "10-12", rest: "60 sec" },
                { name: "Shoulder Press", sets: 3, reps: "8-10", rest: "90 sec" },
                { name: "Bicep Curls", sets: 3, reps: "12-15", rest: "60 sec" },
                { name: "Tricep Dips", sets: 3, reps: "10-12", rest: "60 sec" }
              ]
            },
            {
              day: "Day 2 - Lower Body",
              exercises: [
                { name: "Squats", sets: 3, reps: "12-15", rest: "90 sec" },
                { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60 sec" },
                { name: "Calf Raises", sets: 3, reps: "15-20", rest: "60 sec" },
                { name: "Glute Bridges", sets: 3, reps: "12-15", rest: "60 sec" },
                { name: "Leg Raises", sets: 3, reps: "12-15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body",
              exercises: [
                { name: "Burpees", sets: 3, reps: "10", rest: "60 sec" },
                { name: "Mountain Climbers", sets: 3, reps: "20 total", rest: "45 sec" },
                { name: "Plank", sets: 3, reps: "30 sec hold", rest: "45 sec" },
                { name: "Jump Squats", sets: 3, reps: "12", rest: "60 sec" },
                { name: "Push-up to Row", sets: 3, reps: "8-10", rest: "90 sec" }
              ]
            }
          ]
        };
        
        setWorkoutPlan(samplePlan);
        setIsLoading(false);
        
        toast({
          title: "Workout Plan Generated",
          description: "Your personalized workout plan is ready!",
        });
      }, 1500);
    } catch (error) {
      console.error("Error generating workout plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate workout plan. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  const toggleDay = (day: string) => {
    if (expandedDay === day) {
      setExpandedDay(null);
    } else {
      setExpandedDay(day);
    }
  };
  
  return (
    <div className="space-y-6">
      {!workoutPlan ? (
        <Card className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Create Your Workout Plan</h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="glass-input mt-1">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Build Strength</SelectItem>
                  <SelectItem value="muscle">Build Muscle</SelectItem>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="endurance">Improve Endurance</SelectItem>
                  <SelectItem value="tone">Tone Body</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="level">Experience Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="glass-input mt-1">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="days">Days Per Week</Label>
              <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
                <SelectTrigger className="glass-input mt-1">
                  <SelectValue placeholder="Select days per week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 days</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="6">6 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleGeneratePlan} 
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Dumbbell size={16} className="mr-2" />
                Generate Workout Plan
              </>
            )}
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Workout Plan</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setWorkoutPlan(null)}
              className="text-xs"
            >
              Create New Plan
            </Button>
          </div>
          
          <Card className="glass-card p-4 mb-4 bg-blue-500/10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Dumbbell size={18} className="text-blue-500" />
                <span className="font-medium">Goal:</span>
              </div>
              <span className="capitalize">{workoutPlan.goal.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-500" />
                <span className="font-medium">Level:</span>
              </div>
              <span className="capitalize">{workoutPlan.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                <span className="font-medium">Frequency:</span>
              </div>
              <span>{workoutPlan.days} days per week</span>
            </div>
          </Card>
          
          <div className="space-y-3">
            {workoutPlan.workouts.map((workout, index) => (
              <Card key={index} className="glass-card overflow-hidden">
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleDay(workout.day)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Dumbbell size={16} className="text-blue-500" />
                    </div>
                    <span className="font-medium">{workout.day}</span>
                  </div>
                  <ChevronRight 
                    size={18} 
                    className={`text-blue-500 transition-transform duration-200 ${
                      expandedDay === workout.day ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
                
                {expandedDay === workout.day && (
                  <div className="px-4 pb-4 pt-1 space-y-3">
                    {workout.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="flex justify-between items-center p-2 rounded-lg bg-blue-500/5">
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rest: {exercise.rest}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
