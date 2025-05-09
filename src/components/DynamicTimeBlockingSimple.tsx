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
  Bell
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

export default function DynamicTimeBlockingSimple() {
  const { settings } = useAppContext();
  const { toast } = useToast();
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [newBlock, setNewBlock] = useState<Partial<TimeBlock>>({
    title: "",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    category: "study",
    day: "monday"
  });
  const [editingBlock, setEditingBlock] = useState<TimeBlock | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeDay, setActiveDay] = useState("monday");
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Load time blocks from localStorage on component mount
  useEffect(() => {
    try {
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
            day: "monday"
          },
          {
            id: "2",
            title: "Workout",
            startTime: "5:30 PM",
            endTime: "6:30 PM",
            category: "fitness",
            color: "bg-green-500/20",
            day: "monday"
          },
          {
            id: "3",
            title: "Meditation",
            startTime: "7:00 AM",
            endTime: "7:30 AM",
            category: "meditation",
            color: "bg-purple-500/20",
            day: "tuesday"
          }
        ];
        setTimeBlocks(exampleBlocks);
        localStorage.setItem("focos_time_blocks", JSON.stringify(exampleBlocks));
      }
    } catch (error) {
      console.error("Error loading time blocks:", error);
      // Use default blocks if there's an error
      const defaultBlocks: TimeBlock[] = [
        {
          id: "default-1",
          title: "Example Block",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          category: "study",
          color: "bg-blue-500/20",
          day: "monday"
        }
      ];
      setTimeBlocks(defaultBlocks);
    }
  }, []);

  // Save time blocks to localStorage when they change
  useEffect(() => {
    try {
      if (timeBlocks.length > 0) {
        localStorage.setItem("focos_time_blocks", JSON.stringify(timeBlocks));
      }
    } catch (error) {
      console.error("Error saving time blocks:", error);
    }
  }, [timeBlocks]);

  // Generate suggestions
  useEffect(() => {
    try {
      // For simplicity, just use random suggestions
      const selectedSuggestions = [...mockSuggestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 1);

      setSuggestions(selectedSuggestions);

      // Show suggestion notification after a delay
      const timer = setTimeout(() => {
        if (selectedSuggestions.length > 0) {
          setShowSuggestion(true);
        }
      }, 5000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    }
  }, [activeDay]);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    try {
      setDraggedBlock(blockId);
      e.dataTransfer.setData("text/plain", blockId);

      // Set the drag image
      const block = blockRefs.current[blockId];
      if (block) {
        const rect = block.getBoundingClientRect();
        e.dataTransfer.setDragImage(block, rect.width / 2, 20);
      }
    } catch (error) {
      console.error("Error starting drag:", error);
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, timeSlot: string) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, timeSlot: string) => {
    try {
      e.preventDefault();
      const blockId = e.dataTransfer.getData("text/plain");

      // Find the block
      const block = timeBlocks.find(b => b.id === blockId);
      if (!block) return;

      // Update the block with the new start time and keep the same duration
      const updatedBlocks = timeBlocks.map(b => {
        if (b.id === blockId) {
          return {
            ...b,
            startTime: timeSlot,
            endTime: timeSlot // Simplified - in a real app, calculate the end time
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
    } catch (error) {
      console.error("Error dropping block:", error);
    }
  };

  // Add a new time block
  const handleAddBlock = () => {
    try {
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
        day: newBlock.day || "monday"
      };

      setTimeBlocks(prev => [...prev, newTimeBlock]);
      setIsAddDialogOpen(false);

      // Reset form
      setNewBlock({
        title: "",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        category: "study",
        day: "monday"
      });

      toast({
        title: "Time Block Added",
        description: `"${newTimeBlock.title}" added to your schedule`,
      });
    } catch (error) {
      console.error("Error adding block:", error);
    }
  };

  // Edit a time block
  const handleEditBlock = () => {
    try {
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
    } catch (error) {
      console.error("Error editing block:", error);
    }
  };

  // Delete a time block
  const handleDeleteBlock = (id: string) => {
    try {
      setTimeBlocks(prev => prev.filter(block => block.id !== id));
      setIsEditDialogOpen(false);
      setEditingBlock(null);

      toast({
        title: "Time Block Deleted",
        description: "The time block has been removed from your schedule",
      });
    } catch (error) {
      console.error("Error deleting block:", error);
    }
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
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-xl font-bold">Time Blocking</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1 w-full sm:w-auto">
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBlock}>Add Block</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Day Tabs - Responsive */}
      <Tabs value={activeDay} onValueChange={setActiveDay}>
        <TabsList className="w-full flex overflow-x-auto hide-scrollbar">
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              className="flex-1 text-xs py-1"
            >
              {/* Show full name on larger screens, first letter on mobile */}
              <span className="hidden sm:inline">{formatDayName(day)}</span>
              <span className="sm:hidden">{formatDayName(day).charAt(0)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Time Blocks - Responsive */}
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

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
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
                          <p className="text-sm font-medium">{block.title}</p>
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
        </div>

        {/* Tablet/Mobile View - Condensed */}
        <div className="md:hidden">
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {/* Morning */}
            <div className="border rounded-lg p-3">
              <h4 className="text-xs font-medium mb-2">Morning (5 AM - 12 PM)</h4>
              <div className="space-y-2">
                {timeSlots
                  .filter(slot => slot.includes('AM'))
                  .map((timeSlot) => {
                    const block = getBlockForTimeSlot(timeSlot);
                    if (!block) return null;

                    return (
                      <div
                        key={timeSlot}
                        className={`p-2 rounded-lg ${getCategoryColor(block.category)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(block.category)}
                            <div>
                              <p className="text-sm font-medium">{block.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {block.startTime} - {block.endTime}
                              </p>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    );
                  }).filter(Boolean)}

                {!timeSlots
                  .filter(slot => slot.includes('AM'))
                  .some(timeSlot => getBlockForTimeSlot(timeSlot)) && (
                  <div className="text-center py-2 text-xs text-muted-foreground">
                    No morning blocks scheduled
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1 text-xs"
                  onClick={() => {
                    setNewBlock({
                      ...newBlock,
                      startTime: "9:00 AM",
                      day: activeDay
                    });
                    setIsAddDialogOpen(true);
                  }}
                >
                  <Plus size={12} className="mr-1" />
                  Add Morning Block
                </Button>
              </div>
            </div>

            {/* Afternoon */}
            <div className="border rounded-lg p-3">
              <h4 className="text-xs font-medium mb-2">Afternoon (12 PM - 5 PM)</h4>
              <div className="space-y-2">
                {timeSlots
                  .filter(slot => slot.includes('PM') && parseInt(slot.split(':')[0]) < 5)
                  .map((timeSlot) => {
                    const block = getBlockForTimeSlot(timeSlot);
                    if (!block) return null;

                    return (
                      <div
                        key={timeSlot}
                        className={`p-2 rounded-lg ${getCategoryColor(block.category)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(block.category)}
                            <div>
                              <p className="text-sm font-medium">{block.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {block.startTime} - {block.endTime}
                              </p>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    );
                  }).filter(Boolean)}

                {!timeSlots
                  .filter(slot => slot.includes('PM') && parseInt(slot.split(':')[0]) < 5)
                  .some(timeSlot => getBlockForTimeSlot(timeSlot)) && (
                  <div className="text-center py-2 text-xs text-muted-foreground">
                    No afternoon blocks scheduled
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1 text-xs"
                  onClick={() => {
                    setNewBlock({
                      ...newBlock,
                      startTime: "2:00 PM",
                      day: activeDay
                    });
                    setIsAddDialogOpen(true);
                  }}
                >
                  <Plus size={12} className="mr-1" />
                  Add Afternoon Block
                </Button>
              </div>
            </div>

            {/* Evening */}
            <div className="border rounded-lg p-3">
              <h4 className="text-xs font-medium mb-2">Evening (5 PM - 11 PM)</h4>
              <div className="space-y-2">
                {timeSlots
                  .filter(slot => slot.includes('PM') && parseInt(slot.split(':')[0]) >= 5)
                  .map((timeSlot) => {
                    const block = getBlockForTimeSlot(timeSlot);
                    if (!block) return null;

                    return (
                      <div
                        key={timeSlot}
                        className={`p-2 rounded-lg ${getCategoryColor(block.category)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(block.category)}
                            <div>
                              <p className="text-sm font-medium">{block.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {block.startTime} - {block.endTime}
                              </p>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    );
                  }).filter(Boolean)}

                {!timeSlots
                  .filter(slot => slot.includes('PM') && parseInt(slot.split(':')[0]) >= 5)
                  .some(timeSlot => getBlockForTimeSlot(timeSlot)) && (
                  <div className="text-center py-2 text-xs text-muted-foreground">
                    No evening blocks scheduled
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1 text-xs"
                  onClick={() => {
                    setNewBlock({
                      ...newBlock,
                      startTime: "7:00 PM",
                      day: activeDay
                    });
                    setIsAddDialogOpen(true);
                  }}
                >
                  <Plus size={12} className="mr-1" />
                  Add Evening Block
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Suggestions - Responsive */}
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
                className="p-2 sm:p-3 rounded-lg bg-primary/5 border border-primary/20"
              >
                <p className="text-xs sm:text-sm">{suggestion}</p>
              </div>
            ))}
          </div>

          {/* Mobile-only quick actions */}
          <div className="mt-3 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                setNewBlock({
                  ...newBlock,
                  startTime: "9:00 AM",
                  day: activeDay
                });
                setIsAddDialogOpen(true);
              }}
            >
              <Plus size={12} className="mr-1" />
              Add Suggested Block
            </Button>
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

      {/* Notification - Responsive */}
      {showSuggestion && suggestions.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-24 right-2 sm:right-4 max-w-[calc(100vw-1rem)] sm:max-w-xs animate-slide-up z-50">
          <Card className="glass-card p-3 rounded-xl shadow-lg border border-primary/30">
            <div className="flex items-start gap-2">
              <div className="bg-primary/20 p-2 rounded-full hidden sm:flex">
                <Bell size={16} className="text-primary" />
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
            <div className="flex justify-between sm:justify-end mt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs sm:hidden"
                onClick={() => {
                  setNewBlock({
                    ...newBlock,
                    startTime: "9:00 AM",
                    day: activeDay
                  });
                  setIsAddDialogOpen(true);
                  setShowSuggestion(false);
                }}
              >
                <Plus size={12} className="mr-1" />
                Add
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
    </div>
  );
}
