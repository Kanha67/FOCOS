
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";

export default function NotificationSettings() {
  const { notifications, addNotification, toggleNotification, deleteNotification } = useAppContext();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const { toast } = useToast();
  
  const handleAddNotification = () => {
    if (!title.trim() || !message.trim() || !time.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    addNotification(title, message, time);
    
    setTitle("");
    setMessage("");
    setTime("");
    
    toast({
      title: "Notification added",
      description: "Your notification has been scheduled",
    });
  };
  
  const handleToggleNotification = (id: string) => {
    toggleNotification(id);
  };
  
  const handleDeleteNotification = (id: string) => {
    deleteNotification(id);
    
    toast({
      title: "Notification deleted",
      description: "Your notification has been removed",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="glass-card p-4 space-y-3">
        <h3 className="text-sm font-medium mb-2">Add Reminder</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Title (e.g., Time to focus!)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="glass-input w-full"
          />
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="glass-input w-full"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="glass-input w-full"
          />
          <Button
            onClick={handleAddNotification}
            className="w-full glass-button"
            size="sm"
          >
            <Bell size={16} className="mr-2" /> Add Reminder
          </Button>
        </div>
      </div>
      
      {notifications.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Your Reminders</h3>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="glass-card p-3 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.time} - {notification.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={notification.enabled}
                  onCheckedChange={() => handleToggleNotification(notification.id)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="h-7 w-7"
                >
                  &times;
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
