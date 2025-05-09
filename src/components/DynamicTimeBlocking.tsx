import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Clock,
  Plus,
  Calendar,
  Trash2,
  Edit,
  MoveHorizontal,
  BookOpen,
  Dumbbell,
  Brain,
  DollarSign,
  Heart,
  Coffee,
  Sparkles,
  Bell,
  Repeat,
  Save,
  LayoutTemplate,
  AlertCircle,
  Flag,
  CheckCircle2,
  TimerReset
} from "lucide-react";

// Types
interface TimeBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: string;
  color: string;
  day: string;
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekdays' | 'weekends' | 'weekly';
  priority?: 'low' | 'medium' | 'high';
}

// Helper functions
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 5; hour < 24; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    slots.push(`${hourFormatted}:00 ${amPm}`);
    slots.push(`${hourFormatted}:30 ${amPm}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "study":
      return <BookOpen size={16} className="text-blue-500" />;
    case "fitness":
      return <Dumbbell size={16} className="text-green-500" />;
    case "meditation":
      return <Brain size={16} className="text-purple-500" />;
    case "finance":
      return <DollarSign size={16} className="text-amber-500" />;
    case "wellness":
      return <Heart size={16} className="text-red-500" />;
    case "break":
      return <Coffee size={16} className="text-orange-500" />;
    case "spiritual":
      return <Sparkles size={16} className="text-indigo-500" />;
    default:
      return <Clock size={16} className="text-gray-500" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "study":
      return "bg-blue-500/20 border-blue-500/50";
    case "fitness":
      return "bg-green-500/20 border-green-500/50";
    case "meditation":
      return "bg-purple-500/20 border-purple-500/50";
    case "finance":
      return "bg-amber-500/20 border-amber-500/50";
    case "wellness":
      return "bg-red-500/20 border-red-500/50";
    case "break":
      return "bg-orange-500/20 border-orange-500/50";
    case "spiritual":
      return "bg-indigo-500/20 border-indigo-500/50";
    default:
      return "bg-gray-500/20 border-gray-500/50";
  }
};

// Mock data for suggestions
const mockSuggestions = [
  "You have 30 minutes free at 3:00 PM. Consider adding a meditation session.",
  "Your study blocks are most effective in the morning based on your focus score.",
  "You haven't scheduled any fitness activities today. Consider a quick workout at 5:30 PM.",
  "You have a 2-hour gap at noon. This would be a good time for deep work on your project.",
  "Consider adding a short break after your 2-hour study session for better retention."
];

export default function DynamicTimeBlocking() {
  const { settings } = useAppContext();
  const { toast } = useToast();
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [newBlock, setNewBlock] = useState<Partial<TimeBlock>>({
    title: "",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    category: "study",
    day: "monday",
    isRecurring: false,
    priority: "medium"
  });
  const [editingBlock, setEditingBlock] = useState<TimeBlock | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaveTemplateDialogOpen, setIsSaveTemplateDialogOpen] = useState(false);
  const [isLoadTemplateDialogOpen, setIsLoadTemplateDialogOpen] = useState(false);
  const [activeDay, setActiveDay] = useState("monday");
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  const [templates, setTemplates] = useState<{id: string, name: string, blocks: TimeBlock[]}[]>([]);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [freeTimeNotifications, setFreeTimeNotifications] = useState<{time: string, suggestion: string}[]>([]);

  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Load time blocks from localStorage on component mount
  useEffect(() => {
    const savedBlocks = localStorage.getItem("focos_time_blocks");
    if (savedBlocks) {
      setTimeBlocks(JSON.parse(savedBlocks));
    } else {
      // Add some example blocks if none exist
      const exampleBlocks: TimeBlock[] = [
        {
          id: "1",
          title: "Morning Study",
          startTime: "8:00 AM",
          endTime: "10:00 AM",
          category: "study",
          color: "bg-blue-500/20",
          day: "monday",
          isRecurring: true,
          recurrencePattern: "weekdays",
          priority: "high"
        },
        {
          id: "2",
          title: "Workout",
          startTime: "5:30 PM",
          endTime: "6:30 PM",
          category: "fitness",
          color: "bg-green-500/20",
          day: "monday",
          isRecurring: true,
          recurrencePattern: "daily",
          priority: "medium"
        },
        {
          id: "3",
          title: "Meditation",
          startTime: "7:00 AM",
          endTime: "7:30 AM",
          category: "meditation",
          color: "bg-purple-500/20",
          day: "tuesday",
          isRecurring: false,
          priority: "low"
        }
      ];
      setTimeBlocks(exampleBlocks);
      localStorage.setItem("focos_time_blocks", JSON.stringify(exampleBlocks));
    }

    // Load saved templates
    const savedTemplates = localStorage.getItem("focos_time_block_templates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  // Save time blocks to localStorage when they change
  useEffect(() => {
    if (timeBlocks.length > 0) {
      localStorage.setItem("focos_time_blocks", JSON.stringify(timeBlocks));
    }
  }, [timeBlocks]);

  // Save templates to localStorage when they change
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem("focos_time_block_templates", JSON.stringify(templates));
    }
  }, [templates]);

  // Generate suggestions and detect free time
  useEffect(() => {
    // Get blocks for the active day
    const dayBlocks = timeBlocks.filter(block => block.day === activeDay);

    // Sort blocks by start time
    const sortedBlocks = [...dayBlocks].sort((a, b) => {
      const getMinutes = (time: string) => {
        try {
          const [hourStr, minuteStr] = time.split(':');
          let hour = parseInt(hourStr) || 0;

          // Handle cases where minuteStr might not be properly formatted
          let minute = 0;
          if (minuteStr) {
            const minuteParts = minuteStr.split(' ');
            if (minuteParts.length > 0) {
              minute = parseInt(minuteParts[0]) || 0;
            }
          }

          const isPM = time.includes('PM') && hour !== 12;
          const isAM = time.includes('AM') && hour === 12;

          if (isPM) hour += 12;
          if (isAM) hour = 0;

          // Ensure hour is within reasonable bounds
          hour = Math.max(0, Math.min(hour, 23));
          minute = Math.max(0, Math.min(minute, 59));

          return hour * 60 + minute;
        } catch (error) {
          console.error("Error parsing time for sorting:", time, error);
          return 0; // Default if parsing fails
        }
      };

      return getMinutes(a.startTime) - getMinutes(b.startTime);
    });

    // Find gaps in the schedule (free time)
    const freeTimeGaps: {startTime: string, endTime: string, durationMinutes: number}[] = [];

    if (sortedBlocks.length > 0) {
      // Helper function to convert time to minutes
      const getMinutes = (time: string) => {
        try {
          const [hourStr, minuteStr] = time.split(':');
          let hour = parseInt(hourStr) || 0;

          // Handle cases where minuteStr might not be properly formatted
          let minute = 0;
          if (minuteStr) {
            const minuteParts = minuteStr.split(' ');
            if (minuteParts.length > 0) {
              minute = parseInt(minuteParts[0]) || 0;
            }
          }

          const isPM = time.includes('PM') && hour !== 12;
          const isAM = time.includes('AM') && hour === 12;

          if (isPM) hour += 12;
          if (isAM) hour = 0;

          // Ensure hour is within reasonable bounds
          hour = Math.max(0, Math.min(hour, 23));
          minute = Math.max(0, Math.min(minute, 59));

          return hour * 60 + minute;
        } catch (error) {
          console.error("Error parsing time:", time, error);
          return 0; // Default if parsing fails
        }
      };

      // Helper function to convert minutes to time string
      const getTimeString = (minutes: number) => {
        try {
          let hour = Math.floor(minutes / 60);
          const minute = minutes % 60;
          const isPM = hour >= 12;

          if (hour > 12) hour -= 12;
          if (hour === 0) hour = 12;

          return `${hour}:${minute === 0 ? '00' : minute} ${isPM ? 'PM' : 'AM'}`;
        } catch (error) {
          console.error("Error formatting time:", minutes, error);
          return "12:00 PM"; // Default if formatting fails
        }
      };

      // Check for gaps between blocks
      for (let i = 0; i < sortedBlocks.length - 1; i++) {
        const currentBlockEnd = getMinutes(sortedBlocks[i].endTime);
        const nextBlockStart = getMinutes(sortedBlocks[i + 1].startTime);

        // If there's a gap of at least 30 minutes
        if (nextBlockStart - currentBlockEnd >= 30) {
          freeTimeGaps.push({
            startTime: sortedBlocks[i].endTime,
            endTime: sortedBlocks[i + 1].startTime,
            durationMinutes: nextBlockStart - currentBlockEnd
          });
        }
      }

      // Check for morning free time (before first block)
      const firstBlockStart = getMinutes(sortedBlocks[0].startTime);
      const dayStart = 8 * 60; // 8:00 AM

      if (firstBlockStart - dayStart >= 30) {
        freeTimeGaps.push({
          startTime: "8:00 AM",
          endTime: sortedBlocks[0].startTime,
          durationMinutes: firstBlockStart - dayStart
        });
      }

      // Check for evening free time (after last block)
      const lastBlockEnd = getMinutes(sortedBlocks[sortedBlocks.length - 1].endTime);
      const dayEnd = 22 * 60; // 10:00 PM

      if (dayEnd - lastBlockEnd >= 30) {
        freeTimeGaps.push({
          startTime: sortedBlocks[sortedBlocks.length - 1].endTime,
          endTime: "10:00 PM",
          durationMinutes: dayEnd - lastBlockEnd
        });
      }
    }

    // Generate personalized suggestions based on free time
    const newSuggestions: string[] = [];
    const newFreeTimeNotifications: {time: string, suggestion: string}[] = [];

    // Add suggestions based on free time gaps
    freeTimeGaps.forEach(gap => {
      const durationHours = Math.floor(gap.durationMinutes / 60);
      const durationMinutes = gap.durationMinutes % 60;
      const durationText = durationHours > 0
        ? `${durationHours} hour${durationHours > 1 ? 's' : ''}${durationMinutes > 0 ? ` ${durationMinutes} min` : ''}`
        : `${durationMinutes} minutes`;

      // Suggest different activities based on duration
      if (gap.durationMinutes >= 120) { // 2+ hours
        newSuggestions.push(`You have ${durationText} free between ${gap.startTime} and ${gap.endTime}. Consider adding a deep work session.`);
        newFreeTimeNotifications.push({
          time: gap.startTime,
          suggestion: `You have ${durationText} of free time. Add a deep work session?`
        });
      } else if (gap.durationMinutes >= 60) { // 1-2 hours
        newSuggestions.push(`You have ${durationText} free between ${gap.startTime} and ${gap.endTime}. Good time for a workout or study session.`);
        newFreeTimeNotifications.push({
          time: gap.startTime,
          suggestion: `You have ${durationText} of free time. Add a workout or study session?`
        });
      } else { // 30-60 minutes
        newSuggestions.push(`You have ${durationText} free between ${gap.startTime} and ${gap.endTime}. Perfect for a quick meditation or break.`);
        newFreeTimeNotifications.push({
          time: gap.startTime,
          suggestion: `You have ${durationText} of free time. Add a meditation session?`
        });
      }
    });

    // Add general suggestions
    if (sortedBlocks.length === 0) {
      newSuggestions.push("Your schedule is empty today. Consider adding some study or workout blocks.");
    } else if (!sortedBlocks.some(block => block.category === "meditation")) {
      newSuggestions.push("You don't have any meditation blocks scheduled. Consider adding a short meditation session.");
    }

    if (newSuggestions.length === 0) {
      // Add some default suggestions if none were generated
      newSuggestions.push(...mockSuggestions.sort(() => 0.5 - Math.random()).slice(0, 2));
    }

    setSuggestions(newSuggestions);
    setFreeTimeNotifications(newFreeTimeNotifications);

    // Show suggestion notification after a delay
    const timer = setTimeout(() => {
      if (newSuggestions.length > 0) {
        setShowSuggestion(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeDay, timeBlocks]);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId);
    e.dataTransfer.setData("text/plain", blockId);

    // Set the drag image
    const block = blockRefs.current[blockId];
    if (block) {
      const rect = block.getBoundingClientRect();
      e.dataTransfer.setDragImage(block, rect.width / 2, 20);
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, timeSlot: string) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, timeSlot: string) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData("text/plain");

    // Find the block
    const block = timeBlocks.find(b => b.id === blockId);
    if (!block) return;

    // Calculate duration in minutes
    const getMinutes = (time: string) => {
      const [hourStr, minuteStr] = time.split(':');
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr.split(' ')[0]);
      const isPM = time.includes('PM') && hour !== 12;
      const isAM = time.includes('AM') && hour === 12;

      if (isPM) hour += 12;
      if (isAM) hour = 0;

      return hour * 60 + minute;
    };

    const startMinutes = getMinutes(block.startTime);
    const endMinutes = getMinutes(block.endTime);
    const duration = endMinutes - startMinutes;

    // Calculate new end time
    const calculateEndTime = (start: string, durationMins: number) => {
      const [hourStr, rest] = start.split(':');
      let hour = parseInt(hourStr);
      const minuteStr = rest.split(' ')[0];
      const minute = parseInt(minuteStr);
      const period = start.includes('PM') ? 'PM' : 'AM';

      let totalMinutes = hour * 60 + minute + durationMins;
      let newHour = Math.floor(totalMinutes / 60);
      const newMinute = totalMinutes % 60;

      let newPeriod = period;
      if (newHour >= 12 && period === 'AM') {
        newPeriod = 'PM';
      }
      if (newHour > 12) {
        newHour -= 12;
      }
      if (newHour === 0) {
        newHour = 12;
      }

      return `${newHour}:${newMinute === 0 ? '00' : newMinute} ${newPeriod}`;
    };

    // Update the block
    const updatedBlocks = timeBlocks.map(b => {
      if (b.id === blockId) {
        return {
          ...b,
          startTime: timeSlot,
          endTime: calculateEndTime(timeSlot, duration)
        };
      }
      return b;
    });

    setTimeBlocks(updatedBlocks);
    setDraggedBlock(null);

    toast({
      title: "Time Block Updated",
      description: `"${block.title}" moved to ${timeSlot}`,
    });
  };

  // Add a new time block
  const handleAddBlock = () => {
    if (!newBlock.title || !newBlock.startTime || !newBlock.endTime || !newBlock.category || !newBlock.day) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newTimeBlock: TimeBlock = {
      id: Date.now().toString(),
      title: newBlock.title || "",
      startTime: newBlock.startTime || "9:00 AM",
      endTime: newBlock.endTime || "10:00 AM",
      category: newBlock.category || "study",
      color: getCategoryColor(newBlock.category || "study"),
      day: newBlock.day || "monday",
      isRecurring: newBlock.isRecurring || false,
      recurrencePattern: newBlock.recurrencePattern,
      priority: newBlock.priority || "medium"
    };

    setTimeBlocks(prev => [...prev, newTimeBlock]);
    setIsAddDialogOpen(false);

    // If the block is recurring, add it to other days based on pattern
    if (newTimeBlock.isRecurring && newTimeBlock.recurrencePattern) {
      const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
      const weekends = ["saturday", "sunday"];
      const allDays = [...weekdays, ...weekends];

      let daysToAdd: string[] = [];

      switch (newTimeBlock.recurrencePattern) {
        case "daily":
          daysToAdd = allDays.filter(day => day !== newTimeBlock.day);
          break;
        case "weekdays":
          daysToAdd = weekdays.filter(day => day !== newTimeBlock.day);
          break;
        case "weekends":
          daysToAdd = weekends.filter(day => day !== newTimeBlock.day);
          break;
        case "weekly":
          // Already added to the selected day
          break;
      }

      const recurringBlocks = daysToAdd.map(day => ({
        ...newTimeBlock,
        id: Date.now().toString() + day,
        day
      }));

      if (recurringBlocks.length > 0) {
        setTimeBlocks(prev => [...prev, ...recurringBlocks]);

        toast({
          title: "Recurring Block Added",
          description: `"${newTimeBlock.title}" added to multiple days based on your pattern`,
        });
      }
    }

    // Reset form
    setNewBlock({
      title: "",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      category: "study",
      day: "monday",
      isRecurring: false,
      priority: "medium"
    });

    toast({
      title: "Time Block Added",
      description: `"${newTimeBlock.title}" added to your schedule`,
    });
  };

  // Edit a time block
  const handleEditBlock = () => {
    if (!editingBlock) return;

    const updatedBlocks = timeBlocks.map(block =>
      block.id === editingBlock.id ? {
        ...editingBlock,
        color: getCategoryColor(editingBlock.category)
      } : block
    );

    setTimeBlocks(updatedBlocks);
    setIsEditDialogOpen(false);
    setEditingBlock(null);

    toast({
      title: "Time Block Updated",
      description: `"${editingBlock.title}" has been updated`,
    });
  };

  // Delete a time block
  const handleDeleteBlock = (id: string) => {
    const blockToDelete = timeBlocks.find(block => block.id === id);

    if (blockToDelete?.isRecurring) {
      // Ask if user wants to delete all recurring instances
      if (confirm("Do you want to delete all recurring instances of this block?")) {
        // Delete all blocks with the same title and category
        setTimeBlocks(prev => prev.filter(block =>
          !(block.title === blockToDelete.title && block.category === blockToDelete.category)
        ));

        toast({
          title: "Recurring Blocks Deleted",
          description: "All instances of this recurring block have been removed",
        });
      } else {
        // Delete just this instance
        setTimeBlocks(prev => prev.filter(block => block.id !== id));

        toast({
          title: "Block Instance Deleted",
          description: "This instance of the block has been removed",
        });
      }
    } else {
      // Delete the single block
      setTimeBlocks(prev => prev.filter(block => block.id !== id));

      toast({
        title: "Time Block Deleted",
        description: "The time block has been removed from your schedule",
      });
    }

    setIsEditDialogOpen(false);
    setEditingBlock(null);
  };

  // Save current schedule as a template
  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive"
      });
      return;
    }

    // Get blocks for the active day
    const dayBlocks = timeBlocks.filter(block => block.day === activeDay);

    if (dayBlocks.length === 0) {
      toast({
        title: "Error",
        description: "There are no blocks to save as a template",
        variant: "destructive"
      });
      return;
    }

    const newTemplate = {
      id: Date.now().toString(),
      name: newTemplateName,
      blocks: dayBlocks
    };

    setTemplates(prev => [...prev, newTemplate]);
    setNewTemplateName("");
    setIsSaveTemplateDialogOpen(false);

    toast({
      title: "Template Saved",
      description: `"${newTemplateName}" template has been saved`,
    });
  };

  // Load a template
  const handleLoadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);

    if (!template) return;

    // Ask for confirmation before overwriting existing blocks
    const dayBlocks = timeBlocks.filter(block => block.day === activeDay);

    if (dayBlocks.length > 0) {
      if (!confirm(`This will replace your current schedule for ${formatDayName(activeDay)}. Continue?`)) {
        return;
      }

      // Remove existing blocks for this day
      setTimeBlocks(prev => prev.filter(block => block.day !== activeDay));
    }

    // Add template blocks with new IDs
    const templateBlocks = template.blocks.map(block => ({
      ...block,
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      day: activeDay
    }));

    setTimeBlocks(prev => [...prev, ...templateBlocks]);
    setIsLoadTemplateDialogOpen(false);

    toast({
      title: "Template Loaded",
      description: `"${template.name}" template has been applied to ${formatDayName(activeDay)}`,
    });
  };

  // Delete a template
  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));

    toast({
      title: "Template Deleted",
      description: "The template has been removed",
    });
  };

  // Get time blocks for the active day
  const getTimeBlocksForDay = () => {
    return timeBlocks.filter(block => block.day === activeDay);
  };

  // Check if a time slot has a block
  const getBlockForTimeSlot = (timeSlot: string) => {
    return getTimeBlocksForDay().find(block => block.startTime === timeSlot);
  };

  // Format day name
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Time Blocking</h2>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none h-8 px-3"
              onClick={() => setViewMode("list")}
            >
              <Calendar size={16} className="mr-1" />
              List
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "ghost"}
              size="sm"
              className="rounded-none h-8 px-3"
              onClick={() => setViewMode("timeline")}
            >
              <Clock size={16} className="mr-1" />
              Timeline
            </Button>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1 h-8">
                <Plus size={16} />
                <span>Add Block</span>
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Time Block</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBlock.title}
                  onChange={(e) => setNewBlock({...newBlock, title: e.target.value})}
                  placeholder="e.g., Study Session, Workout, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Select
                    value={newBlock.startTime}
                    onValueChange={(value) => setNewBlock({...newBlock, startTime: value})}
                  >
                    <SelectTrigger id="startTime">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={`start-${slot}`} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Select
                    value={newBlock.endTime}
                    onValueChange={(value) => setNewBlock({...newBlock, endTime: value})}
                  >
                    <SelectTrigger id="endTime">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={`end-${slot}`} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newBlock.category}
                    onValueChange={(value) => setNewBlock({...newBlock, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <Select
                    value={newBlock.day}
                    onValueChange={(value) => setNewBlock({...newBlock, day: value})}
                  >
                    <SelectTrigger id="day">
                      <SelectValue placeholder="Select day" />
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
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isRecurring" className="flex items-center gap-2 cursor-pointer">
                    <Repeat size={16} className="text-primary" />
                    <span>Recurring Schedule</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={newBlock.isRecurring}
                    onChange={(e) => setNewBlock({...newBlock, isRecurring: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>

                {newBlock.isRecurring && (
                  <div className="mt-2">
                    <Label htmlFor="recurrencePattern">Recurrence Pattern</Label>
                    <Select
                      value={newBlock.recurrencePattern}
                      onValueChange={(value: 'daily' | 'weekdays' | 'weekends' | 'weekly') =>
                        setNewBlock({...newBlock, recurrencePattern: value})
                      }
                    >
                      <SelectTrigger id="recurrencePattern">
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newBlock.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    setNewBlock({...newBlock, priority: value})
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Low</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Medium</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span>High</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBlock}>Add Block</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Day Tabs */}
      <div className="flex justify-between items-center">
        <Tabs value={activeDay} onValueChange={setActiveDay} className="flex-1">
          <TabsList className="w-full flex overflow-x-auto hide-scrollbar">
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
              <TabsTrigger
                key={day}
                value={day}
                className="flex-1 text-xs py-1"
              >
                {formatDayName(day)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-1 ml-2">
          <Dialog open={isSaveTemplateDialogOpen} onOpenChange={setIsSaveTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Save size={14} className="mr-1" />
                <span className="text-xs">Save</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Save Schedule Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="e.g., Study Day, Workout Day, etc."
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This will save your current schedule for {formatDayName(activeDay)} as a template that you can apply to other days.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSaveTemplateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveTemplate}>Save Template</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isLoadTemplateDialogOpen} onOpenChange={setIsLoadTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <LayoutTemplate size={14} className="mr-1" />
                <span className="text-xs">Load</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Load Schedule Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {templates.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No templates saved yet. Create a schedule and save it as a template first.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <LayoutTemplate size={16} className="text-primary" />
                          <span>{template.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {template.blocks.length} blocks
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => handleLoadTemplate(template.id)}
                          >
                            Apply
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLoadTemplateDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Time Blocks */}
      <Card className="glass-card p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDayName(activeDay)}'s Schedule</span>
          </h3>
          <Badge variant="outline" className="text-xs">
            {getTimeBlocksForDay().length} blocks
          </Badge>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
            {timeSlots.map((timeSlot) => {
              const block = getBlockForTimeSlot(timeSlot);

              return (
                <div
                  key={timeSlot}
                  className={`p-2 rounded-lg border ${block ? getCategoryColor(block.category) : 'border-dashed border-border/50'}`}
                  onDragOver={(e) => handleDragOver(e, timeSlot)}
                  onDrop={(e) => handleDrop(e, timeSlot)}
                >
                  {block ? (
                    <div
                      ref={(el) => blockRefs.current[block.id] = el}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                      className="flex items-center justify-between cursor-move"
                    >
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(block.category)}
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-medium">{block.title}</p>
                            {block.isRecurring && (
                              <Repeat size={12} className="text-muted-foreground" />
                            )}
                            {block.priority === "high" && (
                              <AlertCircle size={12} className="text-red-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {block.startTime} - {block.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            setEditingBlock(block);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit size={14} />
                        </Button>
                        <MoveHorizontal size={14} className="text-muted-foreground" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{timeSlot}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          setNewBlock({
                            ...newBlock,
                            startTime: timeSlot,
                            day: activeDay
                          });
                          setIsAddDialogOpen(true);
                        }}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Timeline view
          <div className="relative max-h-[500px] overflow-y-auto pr-2">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-border/50"></div>

            {/* Time markers */}
            {timeSlots.filter(slot => slot.endsWith("00 AM") || slot.endsWith("00 PM")).map((timeSlot) => (
              <div key={timeSlot} className="flex items-center h-12 relative">
                <div className="w-16 pr-2 text-right">
                  <span className="text-xs font-medium">{timeSlot}</span>
                </div>
                <div className="absolute left-16 w-2 h-2 rounded-full bg-border -translate-x-1"></div>
                <div className="flex-1 pl-4 border-t border-dashed border-border/30"></div>
              </div>
            ))}

            {/* Blocks on timeline */}
            {getTimeBlocksForDay().map((block) => {
              // Calculate position and height based on time
              const getTimePosition = (timeStr: string) => {
                try {
                  const [hourStr, minuteStr] = timeStr.split(':');
                  let hour = parseInt(hourStr) || 0;

                  // Handle cases where minuteStr might not be properly formatted
                  let minute = 0;
                  if (minuteStr) {
                    const minuteParts = minuteStr.split(' ');
                    if (minuteParts.length > 0) {
                      minute = parseInt(minuteParts[0]) || 0;
                    }
                  }

                  const isPM = timeStr.includes('PM') && hour !== 12;
                  const isAM = timeStr.includes('AM') && hour === 12;

                  if (isPM) hour += 12;
                  if (isAM) hour = 0;

                  // Ensure hour is within reasonable bounds
                  hour = Math.max(0, Math.min(hour, 23));
                  minute = Math.max(0, Math.min(minute, 59));

                  // Calculate position: each hour is 48px (12px for the hour marker + 36px for the space)
                  // Start from 5 AM (5 * 48px)
                  const baseHour = 5; // 5 AM
                  const hourPosition = (hour - baseHour) * 48;
                  const minutePosition = (minute / 60) * 48;

                  return Math.max(0, hourPosition + minutePosition);
                } catch (error) {
                  console.error("Error parsing time:", timeStr, error);
                  return 0; // Default position if parsing fails
                }
              };

              try {
                const startPosition = getTimePosition(block.startTime);
                const endPosition = getTimePosition(block.endTime);
                const blockHeight = Math.max(24, endPosition - startPosition); // Ensure minimum height

                return (
                  <div
                    key={block.id}
                    className={`absolute left-20 right-2 rounded-lg ${getCategoryColor(block.category)} cursor-pointer`}
                    style={{
                      top: `${startPosition}px`,
                      height: `${blockHeight}px`,
                      minHeight: '24px'
                    }}
                    onClick={() => {
                      setEditingBlock(block);
                      setIsEditDialogOpen(true);
                    }}
                  >
                  <div className="p-2 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(block.category)}
                        <span className="text-sm font-medium">{block.title}</span>
                        {block.isRecurring && (
                          <Repeat size={12} className="text-muted-foreground" />
                        )}
                      </div>
                      {block.priority === "high" && (
                        <AlertCircle size={12} className="text-red-500" />
                      )}
                    </div>
                    {blockHeight >= 36 && (
                      <p className="text-xs text-muted-foreground">
                        {block.startTime} - {block.endTime}
                      </p>
                    )}
                  </div>
                </div>
              );
              } catch (error) {
                console.error("Error rendering time block:", block, error);
                return null; // Skip rendering this block if there's an error
              }
            })}
          </div>
        )}
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="glass-card p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className={settings.divineMode ? "text-amber-500" : "text-primary"} />
            <h3 className="text-sm font-semibold">Schedule Suggestions</h3>
          </div>

          <div className="space-y-2">
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
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Time Block</DialogTitle>
          </DialogHeader>
          {editingBlock && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingBlock.title}
                  onChange={(e) => setEditingBlock({...editingBlock, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startTime">Start Time</Label>
                  <Select
                    value={editingBlock.startTime}
                    onValueChange={(value) => setEditingBlock({...editingBlock, startTime: value})}
                  >
                    <SelectTrigger id="edit-startTime">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={`edit-start-${slot}`} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-endTime">End Time</Label>
                  <Select
                    value={editingBlock.endTime}
                    onValueChange={(value) => setEditingBlock({...editingBlock, endTime: value})}
                  >
                    <SelectTrigger id="edit-endTime">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={`edit-end-${slot}`} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingBlock.category}
                    onValueChange={(value) => setEditingBlock({...editingBlock, category: value})}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-day">Day</Label>
                  <Select
                    value={editingBlock.day}
                    onValueChange={(value) => setEditingBlock({...editingBlock, day: value})}
                  >
                    <SelectTrigger id="edit-day">
                      <SelectValue placeholder="Select day" />
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
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-isRecurring" className="flex items-center gap-2 cursor-pointer">
                    <Repeat size={16} className="text-primary" />
                    <span>Recurring Schedule</span>
                  </Label>
                  <input
                    type="checkbox"
                    id="edit-isRecurring"
                    checked={editingBlock.isRecurring}
                    onChange={(e) => setEditingBlock({...editingBlock, isRecurring: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>

                {editingBlock.isRecurring && (
                  <div className="mt-2">
                    <Label htmlFor="edit-recurrencePattern">Recurrence Pattern</Label>
                    <Select
                      value={editingBlock.recurrencePattern}
                      onValueChange={(value: 'daily' | 'weekdays' | 'weekends' | 'weekly') =>
                        setEditingBlock({...editingBlock, recurrencePattern: value})
                      }
                    >
                      <SelectTrigger id="edit-recurrencePattern">
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={editingBlock.priority || "medium"}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    setEditingBlock({...editingBlock, priority: value})
                  }
                >
                  <SelectTrigger id="edit-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Low</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Medium</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span>High</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => editingBlock && handleDeleteBlock(editingBlock.id)}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditBlock}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Free Time Notifications */}
      {freeTimeNotifications.length > 0 && showSuggestion && (
        <div className="fixed bottom-24 right-4 max-w-xs animate-slide-up">
          <Card className="glass-card p-3 rounded-xl shadow-lg border border-primary/30">
            <div className="flex items-start gap-2">
              <div className="bg-primary/20 p-2 rounded-full">
                <Bell size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Free Time Available</h4>
                <p className="text-xs text-muted-foreground mt-1">{freeTimeNotifications[0].suggestion}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -mt-1 -mr-1"
                onClick={() => setShowSuggestion(false)}
              >
                ×
              </Button>
            </div>
            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setNewBlock({
                    ...newBlock,
                    startTime: freeTimeNotifications[0].time,
                    day: activeDay
                  });
                  setIsAddDialogOpen(true);
                  setShowSuggestion(false);
                }}
              >
                <Plus size={12} className="mr-1" />
                Add Block
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowSuggestion(false)}
              >
                Dismiss
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* General Suggestions */}
      {suggestions.length > 0 && showSuggestion && freeTimeNotifications.length === 0 && (
        <div className="fixed bottom-24 right-4 max-w-xs animate-slide-up">
          <Card className="glass-card p-3 rounded-xl shadow-lg border border-primary/30">
            <div className="flex items-start gap-2">
              <div className="bg-primary/20 p-2 rounded-full">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">Schedule Suggestion</h4>
                <p className="text-xs text-muted-foreground mt-1">{suggestions[0]}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -mt-1 -mr-1"
                onClick={() => setShowSuggestion(false)}
              >
                ×
              </Button>
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowSuggestion(false)}
              >
                Dismiss
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
