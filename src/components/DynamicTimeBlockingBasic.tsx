import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

export default function DynamicTimeBlockingBasic() {
  const [activeDay, setActiveDay] = useState("monday");
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  // Format day name
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Time Blocking</h2>
        <Button size="sm">
          Add Block
        </Button>
      </div>
      
      {/* Day Selector */}
      <div className="flex overflow-x-auto hide-scrollbar">
        {days.map((day) => (
          <Button
            key={day}
            variant={activeDay === day ? "default" : "outline"}
            className="flex-1 text-xs py-1"
            onClick={() => setActiveDay(day)}
          >
            {formatDayName(day)}
          </Button>
        ))}
      </div>
      
      {/* Time Blocks */}
      <Card className="p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDayName(activeDay)}'s Schedule</span>
          </h3>
        </div>
        
        <div className="space-y-2">
          <div className="p-3 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Morning</h4>
            <p className="text-xs text-muted-foreground">No blocks scheduled</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-xs"
            >
              Add Morning Block
            </Button>
          </div>
          
          <div className="p-3 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Afternoon</h4>
            <p className="text-xs text-muted-foreground">No blocks scheduled</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-xs"
            >
              Add Afternoon Block
            </Button>
          </div>
          
          <div className="p-3 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Evening</h4>
            <p className="text-xs text-muted-foreground">No blocks scheduled</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-xs"
            >
              Add Evening Block
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Suggestions */}
      <Card className="p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} />
          <h3 className="text-sm font-semibold">Schedule Suggestions</h3>
        </div>
        
        <div className="p-3 border rounded-lg">
          <p className="text-sm">Consider adding a morning study session to start your day.</p>
        </div>
      </Card>
    </div>
  );
}
