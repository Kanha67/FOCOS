import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, Dumbbell, Flame, TrendingUp, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample workout data
const workoutData = [
  { day: "Mon", calories: 320, duration: 45, intensity: 7 },
  { day: "Tue", calories: 0, duration: 0, intensity: 0 },
  { day: "Wed", calories: 450, duration: 60, intensity: 8 },
  { day: "Thu", calories: 0, duration: 0, intensity: 0 },
  { day: "Fri", calories: 380, duration: 50, intensity: 7 },
  { day: "Sat", calories: 0, duration: 0, intensity: 0 },
  { day: "Sun", calories: 280, duration: 40, intensity: 6 }
];

// Sample workout history
const workoutHistory = [
  { id: 1, date: "2023-06-10", type: "Upper Body", duration: 45, calories: 320 },
  { id: 2, date: "2023-06-08", type: "Lower Body", duration: 60, calories: 450 },
  { id: 3, date: "2023-06-06", type: "Full Body", duration: 50, calories: 380 },
  { id: 4, date: "2023-06-04", type: "Cardio", duration: 40, calories: 280 },
  { id: 5, date: "2023-06-02", type: "Upper Body", duration: 45, calories: 310 }
];

export default function WorkoutTracker() {
  const { toast } = useToast();
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  
  const handleAddWorkout = () => {
    setShowAddWorkout(true);
    toast({
      title: "Coming Soon",
      description: "Workout logging will be available in the next update!",
    });
    setTimeout(() => setShowAddWorkout(false), 2000);
  };
  
  // Calculate stats
  const totalWorkouts = workoutHistory.length;
  const totalCalories = workoutHistory.reduce((sum, workout) => sum + workout.calories, 0);
  const totalMinutes = workoutHistory.reduce((sum, workout) => sum + workout.duration, 0);
  const avgCaloriesPerWorkout = Math.round(totalCalories / totalWorkouts);
  
  return (
    <div className="space-y-6">
      <Card className="glass-card p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={workoutData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="calories" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                name="Calories Burned"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="duration" 
                stroke="#82ca9d" 
                name="Duration (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell size={18} className="text-purple-500" />
            <h3 className="font-semibold">Total Workouts</h3>
          </div>
          <p className="text-2xl font-bold">{totalWorkouts}</p>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </Card>
        
        <Card className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={18} className="text-orange-500" />
            <h3 className="font-semibold">Calories Burned</h3>
          </div>
          <p className="text-2xl font-bold">{totalCalories}</p>
          <p className="text-xs text-muted-foreground">~{avgCaloriesPerWorkout} per workout</p>
        </Card>
      </div>
      
      <Card className="glass-card p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Workouts</h3>
          <Button 
            size="sm" 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleAddWorkout}
          >
            <Plus size={16} className="mr-1" />
            Log Workout
          </Button>
        </div>
        
        <div className="space-y-3">
          {workoutHistory.slice(0, 3).map((workout) => (
            <div key={workout.id} className="flex justify-between items-center p-3 rounded-lg bg-blue-500/5">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500" />
                  <span className="text-sm">{workout.date}</span>
                </div>
                <p className="font-medium mt-1">{workout.type}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-sm">{workout.calories} kcal</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{workout.duration} minutes</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 text-center">
          <Button variant="link" size="sm" className="text-blue-500">
            View All Workouts
          </Button>
        </div>
      </Card>
      
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3">Monthly Progress</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Strength</span>
              <span className="text-xs text-muted-foreground">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Endurance</span>
              <span className="text-xs text-muted-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Flexibility</span>
              <span className="text-xs text-muted-foreground">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}
