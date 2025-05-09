import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Calendar Header Component
interface CalendarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CalendarHeader({ children, className }: CalendarHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-2 py-2", className)}>
      {children}
    </div>
  );
}

// Calendar Title Component
interface CalendarTitleProps {
  className?: string;
}

export function CalendarTitle({ className }: CalendarTitleProps) {
  // This would typically get the current month/year from context
  // For now, we'll just display the current month and year
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  return (
    <div className={cn("text-sm font-medium", className)}>
      {month} {year}
    </div>
  );
}

// Calendar Navigation Buttons
export function CalendarPrevButton() {
  return (
    <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0">
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous month</span>
    </Button>
  );
}

export function CalendarNextButton() {
  return (
    <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0">
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next month</span>
    </Button>
  );
}

// Calendar Grid Component
interface CalendarGridProps {
  children: React.ReactNode;
  className?: string;
}

export function CalendarGrid({ children, className }: CalendarGridProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}

// Calendar Heading Component (days of week)
export function CalendarHeading() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return (
    <div className="flex w-full">
      {daysOfWeek.map((day) => (
        <div key={day} className="flex-1 text-center text-muted-foreground text-xs">
          {day}
        </div>
      ))}
    </div>
  );
}

// Calendar Month View Component
interface CalendarMonthViewProps {
  children: (date: Date) => React.ReactNode;
  className?: string;
}

export function CalendarMonthView({ children, className }: CalendarMonthViewProps) {
  // Generate dates for the current month
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Create an array of dates for the month
  const dates: Date[] = [];
  
  // Add previous month's days to fill the first week
  for (let i = 0; i < firstDayOfWeek; i++) {
    const day = new Date(year, month, -firstDayOfWeek + i + 1);
    dates.push(day);
  }
  
  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(year, month, i);
    dates.push(day);
  }
  
  // Add next month's days to fill the last week
  const remainingDays = 7 - (dates.length % 7 || 7);
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, month + 1, i);
    dates.push(day);
  }
  
  // Group dates into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }
  
  return (
    <div className={cn("space-y-1", className)}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex w-full">
          {week.map((date) => (
            <div key={date.toISOString()} className="flex-1">
              {children(date)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Calendar Cell Component
interface CalendarCellProps {
  date: Date;
  children: React.ReactNode;
  className?: string;
}

export function CalendarCell({ date, children, className }: CalendarCellProps) {
  const isCurrentMonth = date.getMonth() === new Date().getMonth();
  
  return (
    <div
      className={cn(
        "h-9 w-full p-0 text-center text-sm relative",
        !isCurrentMonth && "text-muted-foreground opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}
