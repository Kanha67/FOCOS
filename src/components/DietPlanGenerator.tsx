import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Apple, Loader2, ChevronRight, Utensils, Flame } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";

interface MealPlan {
  goal: string;
  dietType: string;
  calories: number;
  meals: {
    name: string;
    foods: {
      name: string;
      portion: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }[];
    totalCalories: number;
  }[];
}

export default function DietPlanGenerator() {
  const { settings } = useAppContext();
  const { toast } = useToast();
  const [goal, setGoal] = useState("weight-loss");
  const [dietType, setDietType] = useState("balanced");
  const [calories, setCalories] = useState("2000");
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  
  const handleGeneratePlan = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the Gemini API
      // For now, we'll simulate a response with sample data
      setTimeout(() => {
        const samplePlan: MealPlan = {
          goal: goal,
          dietType: dietType,
          calories: parseInt(calories),
          meals: [
            {
              name: "Breakfast",
              foods: [
                { name: "Oatmeal with berries", portion: "1 cup", calories: 300, protein: 10, carbs: 45, fat: 6 },
                { name: "Greek yogurt", portion: "1/2 cup", calories: 100, protein: 15, carbs: 5, fat: 0 },
                { name: "Almonds", portion: "10 nuts", calories: 70, protein: 3, carbs: 2, fat: 6 }
              ],
              totalCalories: 470
            },
            {
              name: "Lunch",
              foods: [
                { name: "Grilled chicken breast", portion: "4 oz", calories: 180, protein: 35, carbs: 0, fat: 4 },
                { name: "Quinoa", portion: "1/2 cup", calories: 110, protein: 4, carbs: 20, fat: 2 },
                { name: "Mixed vegetables", portion: "1 cup", calories: 80, protein: 2, carbs: 15, fat: 0 }
              ],
              totalCalories: 370
            },
            {
              name: "Snack",
              foods: [
                { name: "Apple", portion: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
                { name: "Peanut butter", portion: "1 tbsp", calories: 90, protein: 4, carbs: 3, fat: 8 }
              ],
              totalCalories: 185
            },
            {
              name: "Dinner",
              foods: [
                { name: "Salmon", portion: "4 oz", calories: 200, protein: 22, carbs: 0, fat: 12 },
                { name: "Brown rice", portion: "1/2 cup", calories: 110, protein: 2, carbs: 22, fat: 1 },
                { name: "Steamed broccoli", portion: "1 cup", calories: 55, protein: 4, carbs: 10, fat: 0 }
              ],
              totalCalories: 365
            }
          ]
        };
        
        setMealPlan(samplePlan);
        setIsLoading(false);
        
        toast({
          title: "Diet Plan Generated",
          description: "Your personalized meal plan is ready!",
        });
      }, 1500);
    } catch (error) {
      console.error("Error generating diet plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate diet plan. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  const toggleMeal = (meal: string) => {
    if (expandedMeal === meal) {
      setExpandedMeal(null);
    } else {
      setExpandedMeal(meal);
    }
  };
  
  return (
    <div className="space-y-6">
      {!mealPlan ? (
        <Card className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Create Your Diet Plan</h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="goal">Nutrition Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="glass-input mt-1">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="performance">Athletic Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dietType">Diet Type</Label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger className="glass-input mt-1">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high-protein">High Protein</SelectItem>
                  <SelectItem value="low-carb">Low Carb</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="calories">Daily Calories</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="glass-input mt-1"
                min="1200"
                max="4000"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleGeneratePlan} 
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Apple size={16} className="mr-2" />
                Generate Diet Plan
              </>
            )}
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Diet Plan</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setMealPlan(null)}
              className="text-xs"
            >
              Create New Plan
            </Button>
          </div>
          
          <Card className="glass-card p-4 mb-4 bg-green-500/10">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Apple size={18} className="text-green-500" />
                <span className="font-medium">Goal:</span>
              </div>
              <span className="capitalize">{mealPlan.goal.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-green-500" />
                <span className="font-medium">Diet Type:</span>
              </div>
              <span className="capitalize">{mealPlan.dietType.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-green-500" />
                <span className="font-medium">Daily Calories:</span>
              </div>
              <span>{mealPlan.calories} kcal</span>
            </div>
          </Card>
          
          <div className="space-y-3">
            {mealPlan.meals.map((meal, index) => (
              <Card key={index} className="glass-card overflow-hidden">
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleMeal(meal.name)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Utensils size={16} className="text-green-500" />
                    </div>
                    <span className="font-medium">{meal.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{meal.totalCalories} kcal</span>
                    <ChevronRight 
                      size={18} 
                      className={`text-green-500 transition-transform duration-200 ${
                        expandedMeal === meal.name ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </div>
                
                {expandedMeal === meal.name && (
                  <div className="px-4 pb-4 pt-1 space-y-3">
                    {meal.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="flex justify-between p-2 rounded-lg bg-green-500/5">
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {food.portion} • {food.calories} kcal
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="text-blue-500">{food.protein}g P</span> • 
                          <span className="text-amber-500"> {food.carbs}g C</span> • 
                          <span className="text-red-500"> {food.fat}g F</span>
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
