import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarCell, CalendarGrid, CalendarHeader, CalendarHeading, CalendarMonthView, CalendarNextButton, CalendarPrevButton, CalendarTitle } from "@/components/ui/calendar-components";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Plus, X, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Event {
  id: string;
  title: string;
  date: Date;
  priority: "high" | "medium" | "low";
  notes?: string;
}

export default function EventCalendar() {
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem("focos_events");
    return savedEvents ? JSON.parse(savedEvents, (key, value) => {
      if (key === "date") return new Date(value);
      return value;
    }) : [];
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: new Date(),
    priority: "medium",
    notes: ""
  });

  const { toast } = useToast();

  const saveEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    localStorage.setItem("focos_events", JSON.stringify(updatedEvents));
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast({
        title: "Event title required",
        description: "Please enter a title for your event",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      date: selectedDate || new Date()
    };

    const updatedEvents = [...events, event];
    saveEvents(updatedEvents);

    setIsAddEventOpen(false);
    setNewEvent({
      title: "",
      date: new Date(),
      priority: "medium",
      notes: ""
    });

    toast({
      title: "Event added",
      description: `"${event.title}" has been added to your calendar`,
    });
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveEvents(updatedEvents);

    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar",
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-green-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-4">
      <Card className="glass-card p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon size={18} className="text-primary" />
            Event Calendar
          </h3>
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus size={16} />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event for {selectedDate ? formatDate(selectedDate) : "today"}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newEvent.priority}
                    onValueChange={(value: "high" | "medium" | "low") =>
                      setNewEvent({ ...newEvent, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (Red)</SelectItem>
                      <SelectItem value="medium">Medium (Green)</SelectItem>
                      <SelectItem value="low">Low (Blue)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Add notes"
                    value={newEvent.notes}
                    onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg overflow-hidden">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          >
            <CalendarHeader>
              <CalendarTitle />
              <div className="flex items-center gap-1">
                <CalendarPrevButton />
                <CalendarNextButton />
              </div>
            </CalendarHeader>
            <CalendarGrid>
              <CalendarHeading />
              <CalendarMonthView>
                {(date) => {
                  const dateEvents = getEventsForDate(date);
                  const hasEvents = dateEvents.length > 0;

                  return (
                    <CalendarCell date={date}>
                      <div className="relative h-full w-full p-2">
                        <div>{date.getDate()}</div>
                        {hasEvents && (
                          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                            {dateEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                className={`h-1.5 w-1.5 rounded-full ${getPriorityColor(event.priority)}`}
                              />
                            ))}
                            {dateEvents.length > 3 && (
                              <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </CalendarCell>
                  );
                }}
              </CalendarMonthView>
            </CalendarGrid>
          </Calendar>
        </div>
      </Card>

      {selectedDate && (
        <Card className="glass-card p-4">
          <h3 className="text-md font-medium mb-3">
            Events for {formatDate(selectedDate)}
          </h3>

          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="flex justify-between items-start p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-3 w-3 rounded-full mt-1.5 ${getPriorityColor(event.priority)}`} />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      {event.notes && (
                        <p className="text-xs text-muted-foreground mt-1">{event.notes}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-destructive/10"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No events for this day.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setIsAddEventOpen(true)}
              >
                <Plus size={14} className="mr-1" />
                Add Event
              </Button>
            </div>
          )}
        </Card>
      )}

      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-xs">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-xs">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-xs">Low Priority</span>
        </div>
      </div>
    </div>
  );
}
