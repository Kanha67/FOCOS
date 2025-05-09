
import React, { createContext, useState, useEffect, useContext } from 'react';

// Types for our data
export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  icon?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  enabled: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface AppSettings {
  focusDuration: number; // in minutes
  breakDuration: number; // in minutes
  soundEnabled: boolean;
  focusSound: string; // 'rain', 'cafe', 'nature', 'white-noise', 'none'
  primaryColor: string; // for theme customization
  appName: string; // for app name customization
  notificationsEnabled: boolean;
  distractionFreeMode: boolean;
  divineMode: boolean; // Setting for Divine mode
  devotionalMode: boolean; // Setting for Devotional mode (enhanced spiritual features)
  darkMode: boolean; // Setting for Dark mode
}

interface AppContextType {
  habits: Habit[];
  tasks: Task[];
  settings: AppSettings;
  completedSessions: number;
  notifications: Notification[];
  userXp: number;
  achievements: Achievement[];
  toggleHabit: (id: string) => void;
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleTask: (id: string) => void;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  incrementCompletedSessions: () => void;
  addNotification: (title: string, message: string, time: string) => void;
  toggleNotification: (id: string) => void;
  deleteNotification: (id: string) => void;
  addXp: (amount: number) => void;
  toggleDistractionFreeMode: () => void;
}

const defaultSettings: AppSettings = {
  focusDuration: 25,
  breakDuration: 5,
  soundEnabled: true,
  focusSound: 'rain',
  primaryColor: '#9b87f5', // Default purple
  appName: 'FOCOS', // Default app name
  notificationsEnabled: true,
  distractionFreeMode: false,
  divineMode: false, // Default is normal mode
  devotionalMode: false, // Default is normal mode
  darkMode: false, // Default is light mode
};

// Default habits
const defaultHabits: Habit[] = [
  { id: '1', name: 'Drink water', completed: false, streak: 0 },
  { id: '2', name: 'Read 20 pages', completed: false, streak: 3 },
  { id: '3', name: 'Exercise', completed: false, streak: 1 },
];

// Default achievements
const defaultAchievements: Achievement[] = [
  { id: '1', title: 'First Focus', description: 'Complete your first focus session', unlocked: false, icon: 'award' },
  { id: '2', title: 'Habit Master', description: 'Complete all habits for 3 days in a row', unlocked: false, icon: 'star' },
  { id: '3', title: 'Productivity Pro', description: 'Complete 10 focus sessions', unlocked: false, icon: 'award' },
];

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  // Load data from localStorage or use defaults
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : defaultHabits;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    const saved = localStorage.getItem('completedSessions');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [userXp, setUserXp] = useState<number>(() => {
    const saved = localStorage.getItem('userXp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : defaultAchievements;
  });

  // Apply theme changes (Divine mode, Devotional mode, and Dark mode)
  useEffect(() => {
    // Handle Divine mode
    if (settings.divineMode) {
      document.documentElement.classList.add('divine-mode');
    } else {
      document.documentElement.classList.remove('divine-mode');
    }

    // Handle Devotional mode
    if (settings.devotionalMode) {
      document.documentElement.classList.add('devotional-mode');
    } else {
      document.documentElement.classList.remove('devotional-mode');
    }

    // Handle Dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    // Apply primary color as CSS variable
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
  }, [settings.divineMode, settings.devotionalMode, settings.darkMode, settings.primaryColor]);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('completedSessions', completedSessions.toString());
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('userXp', userXp.toString());
  }, [userXp]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Reset habits at midnight
  useEffect(() => {
    const checkDate = () => {
      const lastResetDate = localStorage.getItem('lastResetDate');
      const today = new Date().toDateString();

      if (lastResetDate !== today) {
        // Update streaks before resetting completion status
        const updatedHabits = habits.map(habit => ({
          ...habit,
          streak: habit.completed ? habit.streak + 1 : 0,
          completed: false,
        }));

        setHabits(updatedHabits);
        localStorage.setItem('lastResetDate', today);
      }
    };

    checkDate(); // Check on initial render

    // Check again if the tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkDate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [habits]);

  // Habit functions
  const toggleHabit = (id: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );

    // Add XP when completing a habit
    const habit = habits.find(h => h.id === id);
    if (habit && !habit.completed) {
      addXp(10);
    }
  };

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      completed: false,
      streak: 0,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  // Task functions
  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    // Add XP when completing a task
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      addXp(5);
    }
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Settings functions
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Track completed sessions
  const incrementCompletedSessions = () => {
    setCompletedSessions(prev => prev + 1);
    addXp(20);

    // Check achievements
    const updatedAchievements = [...achievements];

    // First focus achievement
    if (!updatedAchievements[0].unlocked) {
      updatedAchievements[0].unlocked = true;
    }

    // Productivity pro achievement
    if (completedSessions + 1 >= 10 && !updatedAchievements[2].unlocked) {
      updatedAchievements[2].unlocked = true;
    }

    setAchievements(updatedAchievements);
  };

  // Notification functions
  const addNotification = (title: string, message: string, time: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      time,
      enabled: true,
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // XP system
  const addXp = (amount: number) => {
    setUserXp(prev => prev + amount);
  };

  // Distraction-free mode
  const toggleDistractionFreeMode = () => {
    const newMode = !settings.distractionFreeMode;
    updateSettings({ distractionFreeMode: newMode });

    // Play focus music if entering distraction-free mode
    if (newMode) {
      // In a real implementation, this would play focus music
      console.log("Playing focus music");
    } else {
      // Stop music when exiting
      console.log("Stopping focus music");
    }
  };

  const value = {
    habits,
    tasks,
    settings,
    completedSessions,
    notifications,
    userXp,
    achievements,
    toggleHabit,
    addHabit,
    deleteHabit,
    toggleTask,
    addTask,
    deleteTask,
    updateSettings,
    incrementCompletedSessions,
    addNotification,
    toggleNotification,
    deleteNotification,
    addXp,
    toggleDistractionFreeMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
