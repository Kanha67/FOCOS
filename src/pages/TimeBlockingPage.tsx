import { useAppContext } from "@/context/AppContext";
import DynamicTimeBlockingBasic from "@/components/DynamicTimeBlockingBasic";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Plus,
  CheckCircle,
  BarChart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

export default function TimeBlockingPage() {
  const { settings } = useAppContext();
  const navigate = useNavigate();

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="text-blue-400" />
        <span className="font-medium">Back</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Time Block Templates */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Block Templates</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Deep Work Session</p>
                <p className="text-xs text-muted-foreground">2 hours of focused work</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Workout Routine</p>
                <p className="text-xs text-muted-foreground">45 minutes exercise</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Meditation Break</p>
                <p className="text-xs text-muted-foreground">15 minutes mindfulness</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Financial Review</p>
                <p className="text-xs text-muted-foreground">30 minutes budget check</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Productivity Stats */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BarChart size={18} className="text-primary" />
            Productivity Stats
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Clock size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Deep Work</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <p className="text-lg font-semibold">12h</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <CheckCircle size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Tasks Completed</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <p className="text-lg font-semibold">18</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                <Calendar size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Scheduled Hours</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
            <p className="text-lg font-semibold">32h</p>
          </div>
        </div>
      </Card>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
            <Clock size={24} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Dynamic Time Planner</h2>
            <p className="text-xs text-muted-foreground">
              Organize your day with drag-and-drop time blocks
            </p>
          </div>
        </div>

        <p className="text-sm mb-4">
          Create a visual schedule by adding time blocks for different activities.
          Drag and drop blocks to rearrange your schedule as needed.
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
            <span>Study</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
            <span>Fitness</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
            <span>Meditation</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500"></div>
            <span>Finance</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-500/20 text-red-700 dark:text-red-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
            <span>Wellness</span>
          </div>
        </div>
      </Card>

      <DynamicTimeBlockingBasic />
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Quick Add Block */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Add Block</h2>
          <Button
            variant="outline"
            size="sm"
            className="premium-button-outline flex items-center gap-1 text-xs"
          >
            <Plus size={14} className="text-blue-400" />
            <span>Add</span>
          </Button>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Block title"
              className="w-full p-2 rounded-md bg-background border border-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
              <input
                type="time"
                className="w-full p-2 rounded-md bg-background border border-input"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Time</label>
              <input
                type="time"
                className="w-full p-2 rounded-md bg-background border border-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select className="w-full p-2 rounded-md bg-background border border-input">
              <option value="study">Study</option>
              <option value="work">Work</option>
              <option value="fitness">Fitness</option>
              <option value="meditation">Meditation</option>
              <option value="finance">Finance</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Day</label>
            <select className="w-full p-2 rounded-md bg-background border border-input">
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Color Legend */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Color Legend</h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">Study</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Fitness</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-sm">Meditation</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="text-sm">Finance</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm">Wellness</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span className="text-sm">Other</span>
          </div>
        </div>
      </Card>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className={`pt-2 sm:pt-4 pb-24 px-2 sm:px-4 max-w-md mx-auto min-h-screen ${
      settings.devotionalMode ? "devotional-background" :
      settings.divineMode ? "divine-background" :
      ""
    }`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <ArrowLeft size={18} className="sm:size-20" />
        </Button>
        <h1 className={`text-xl sm:text-2xl font-bold ${
          settings.devotionalMode ? "text-purple-500" :
          settings.divineMode ? "text-amber-500" :
          "text-primary"
        }`}>
          Time Blocking
        </h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      <Card className="glass-card p-3 sm:p-4 mb-4 sm:mb-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
            <Clock size={20} className="sm:size-24 text-blue-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold">Dynamic Time Planner</h2>
            <p className="text-xs text-muted-foreground">
              Organize your day with drag-and-drop time blocks
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm mb-3 sm:mb-4">
          Create a visual schedule by adding time blocks for different activities.
          Drag and drop blocks to rearrange your schedule as needed.
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
            <span>Study</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
            <span>Fitness</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
            <span>Meditation</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500"></div>
            <span>Finance</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-500/20 text-red-700 dark:text-red-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
            <span>Wellness</span>
          </div>
        </div>
      </Card>

      <DynamicTimeBlockingBasic />
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Time Blocking"
      pageIcon={<Clock size={20} className="text-white" />}
      pageDescription="Organize your day with time blocks"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
