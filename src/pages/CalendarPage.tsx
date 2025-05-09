import { motion } from "framer-motion";
import EventCalendar from "@/components/EventCalendar";
import { useAppContext } from "@/context/AppContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";

export default function CalendarPage() {
  const { settings } = useAppContext();

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
      >
        <Plus size={16} className="text-blue-400" />
        <span className="font-medium">Add Event</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Month View */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Month View</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="calendar-mini">
          <EventCalendar mini={true} />
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Upcoming Events
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Team Meeting</p>
                <p className="text-xs text-muted-foreground">Today, 2:00 PM - 3:30 PM</p>
              </div>
              <div className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded-full">
                Work
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Gym Session</p>
                <p className="text-xs text-muted-foreground">Tomorrow, 6:00 AM - 7:30 AM</p>
              </div>
              <div className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-full">
                Health
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Project Deadline</p>
                <p className="text-xs text-muted-foreground">Friday, All Day</p>
              </div>
              <div className="bg-purple-500/20 text-purple-500 text-xs px-2 py-1 rounded-full">
                Important
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      {/* Calendar Component */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Schedule</h2>
          <span className="premium-badge">Premium</span>
        </div>
        <EventCalendar />
      </motion.div>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Event Details */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Event Details</h2>
          <Button
            variant="outline"
            size="sm"
            className="premium-button-outline flex items-center gap-1 text-xs"
          >
            <Plus size={14} className="text-blue-400" />
            <span>New</span>
          </Button>
        </div>

        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold">Team Meeting</h3>
            <div className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded-full">
              Work
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-400" />
              <p className="text-sm">Today, 2:00 PM - 3:30 PM</p>
            </div>

            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-blue-400 mt-1" />
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">Weekly team sync to discuss project progress and upcoming tasks.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-blue-400 mt-1" />
              <div>
                <p className="text-sm font-medium">To-Do</p>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  <li>Prepare project update slides</li>
                  <li>Review last week's action items</li>
                  <li>Share progress on current tasks</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1">Edit</Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-600">Delete</Button>
          </div>
        </div>

        <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <h3 className="text-md font-medium mb-2">Quick Add Event</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Event title"
              className="w-full p-2 rounded-md bg-background border border-input"
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 p-2 rounded-md bg-background border border-input"
              />
              <input
                type="time"
                className="w-24 p-2 rounded-md bg-background border border-input"
              />
            </div>
            <Button className="w-full">Add Event</Button>
          </div>
        </div>
      </motion.div>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className="pt-6 pb-24 px-5 max-w-md mx-auto min-h-screen">
      {/* Premium Header */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
          >
            <Plus size={16} className="text-blue-400" />
            <span className="font-medium">Add Event</span>
          </Button>
        </div>
        <ThemeToggle />
      </motion.div>

      {/* Premium Title */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold premium-title">Calendar</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Calendar Component */}
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Your Schedule</h2>
          <span className="premium-badge">Premium</span>
        </div>
        <EventCalendar />
      </motion.div>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Calendar"
      pageIcon={<Calendar size={20} className="text-white" />}
      pageDescription="Manage your schedule and events"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
