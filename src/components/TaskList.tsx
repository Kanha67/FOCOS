
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onAddTask: (title: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskList({ tasks, onAddTask, onToggleTask, onDeleteTask }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };
  
  return (
    <div className="glass-card p-4 animate-scale-in">
      <h2 className="text-lg font-semibold mb-4">Today's Focus Tasks</h2>
      
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="glass-input"
        />
        <Button variant="outline" className="glass-button" type="submit">
          <Plus size={18} />
        </Button>
      </form>
      
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No tasks added yet. Add your most important tasks for today.
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                task.completed ? "bg-primary/10 dark:bg-primary/20" : "bg-secondary/50"
              )}
            >
              <div className="flex items-center">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center mr-3 transition-colors",
                    task.completed 
                      ? "bg-primary text-white" 
                      : "bg-white/50 dark:bg-white/10 border border-primary/20"
                  )}
                >
                  {task.completed && <Check size={12} />}
                </button>
                <span className={cn(
                  task.completed && "line-through text-muted-foreground"
                )}>{task.title}</span>
              </div>
              <button 
                onClick={() => onDeleteTask(task.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
