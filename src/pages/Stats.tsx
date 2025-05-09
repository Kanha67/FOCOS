import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ThemeToggle from '@/components/ThemeToggle';
import { BarChart3, Calendar, Clock, PieChart as PieChartIcon, Activity, TrendingUp, Target, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DesktopLayout from '@/components/DesktopLayout';

export default function Stats() {
  const { habits, tasks, completedSessions } = useAppContext();
  const [timePeriod, setTimePeriod] = useState('weekly');

  const habitCompletionRate = Math.round(
    (habits.filter(h => h.completed).length / habits.length) * 100 || 0
  );

  const taskCompletionRate = Math.round(
    (tasks.filter(t => t.completed).length / tasks.length) * 100 || 0
  );

  // Sample data for charts
  const lineData = [
    { name: 'Habits', value: habitCompletionRate },
    { name: 'Tasks', value: taskCompletionRate },
    { name: 'Sessions', value: completedSessions },
  ];

  const weeklyData = [
    { name: 'Mon', habits: 3, tasks: 5, sessions: 2 },
    { name: 'Tue', habits: 4, tasks: 3, sessions: 1 },
    { name: 'Wed', habits: 2, tasks: 4, sessions: 2 },
    { name: 'Thu', habits: 5, tasks: 6, sessions: 3 },
    { name: 'Fri', habits: 3, tasks: 2, sessions: 1 },
    { name: 'Sat', habits: 4, tasks: 3, sessions: 2 },
    { name: 'Sun', habits: 5, tasks: 4, sessions: 3 },
  ];

  const pieData = [
    { name: 'Habits', value: habits.length, color: '#3b82f6' },
    { name: 'Tasks', value: tasks.length, color: '#8b5cf6' },
    { name: 'Completed', value: habits.filter(h => h.completed).length + tasks.filter(t => t.completed).length, color: '#10b981' },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  // Header actions for desktop layout
  const headerActions = (
    <>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        >
          <BarChart3 size={16} className="text-blue-400" />
          <span className="font-medium">Analytics</span>
        </Button>
      </div>
      <ThemeToggle />
    </>
  );

  // Time period selector component
  const TimePeriodSelector = () => (
    <div className="flex justify-center gap-1 p-1">
      <Button
        onClick={() => setTimePeriod('daily')}
        variant="ghost"
        className={`flex items-center justify-center gap-2 py-2.5 ${timePeriod === 'daily' ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-400' : ''} transition-all rounded-lg text-sm font-medium`}
      >
        <Clock size={16} />
        <span>Daily</span>
      </Button>
      <Button
        onClick={() => setTimePeriod('weekly')}
        variant="ghost"
        className={`flex items-center justify-center gap-2 py-2.5 ${timePeriod === 'weekly' ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-400' : ''} transition-all rounded-lg text-sm font-medium`}
      >
        <Calendar size={16} />
        <span>Weekly</span>
      </Button>
      <Button
        onClick={() => setTimePeriod('monthly')}
        variant="ghost"
        className={`flex items-center justify-center gap-2 py-2.5 ${timePeriod === 'monthly' ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-400' : ''} transition-all rounded-lg text-sm font-medium`}
      >
        <BarChart3 size={16} />
        <span>Monthly</span>
      </Button>
    </div>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Performance Overview */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Overview</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Target size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{habitCompletionRate}%</span>
              <p className="text-xs text-muted-foreground">Habit Completion</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Activity size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{taskCompletionRate}%</span>
              <p className="text-xs text-muted-foreground">Task Completion</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/15 transition-colors">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Zap size={20} className="text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-bold">{completedSessions}</span>
              <p className="text-xs text-muted-foreground">Focus Sessions</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Distribution Chart */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <PieChartIcon size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">Distribution</h2>
          </div>
        </div>

        <div className="flex justify-center">
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      {/* Time Period Selector */}
      <motion.div
        className="glass-card p-1.5 mb-6 rounded-xl shadow-md border border-indigo-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TimePeriodSelector />
      </motion.div>

      {/* Weekly Performance Chart */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <BarChart3 size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} Performance</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Visualize your {timePeriod} performance metrics across different categories.
        </p>

        <div className="bg-indigo-500/10 p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="habits" fill="#3b82f6" name="Habits" />
              <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks" />
              <Bar dataKey="sessions" fill="#10b981" name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Achievements */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">Achievements</h2>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full">
              <Award size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Productivity Master</h3>
              <p className="text-xs text-muted-foreground">Complete 10 tasks in a day</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Consistency King</h3>
              <p className="text-xs text-muted-foreground">Maintain 80% completion rate for a week</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl opacity-50">
            <div className="p-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Focus Champion</h3>
              <p className="text-xs text-muted-foreground">Complete 20 focus sessions</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trends */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">Trends</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Productivity Score</span>
              <span className="text-blue-500">+15% ↑</span>
            </div>
            <div className="h-2 bg-indigo-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Focus Time</span>
              <span className="text-blue-500">+8% ↑</span>
            </div>
            <div className="h-2 bg-indigo-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Habit Consistency</span>
              <span className="text-green-500">+23% ↑</span>
            </div>
            <div className="h-2 bg-indigo-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '82%' }}></div>
            </div>
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
            <BarChart3 size={16} className="text-blue-400" />
            <span className="font-medium">Analytics</span>
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
        <h1 className="text-2xl font-bold premium-title">Your Stats</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      <motion.div
        className="premium-card p-1.5 mb-6 rounded-xl shadow-md border border-indigo-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TimePeriodSelector />
      </motion.div>

      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Overview</h2>
          <span className="premium-badge">Premium</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Completion Rates</h2>
          <p className="text-sm text-muted-foreground">
            Track your {timePeriod} habit and task completion rates.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
              <span>Habit Completion:</span>
              <span className="text-lg font-semibold">{habitCompletionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Task Completion:</span>
              <span className="text-lg font-semibold">{taskCompletionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Completed Sessions:</span>
              <span className="text-lg font-semibold">{completedSessions}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Chart</h2>
          <span className="premium-badge">Premium</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Visualize your {timePeriod} performance metrics.
        </p>

        <div className="bg-indigo-500/10 p-4 rounded-xl">
          <LineChart width={320} height={200} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8, fill: '#3b82f6' }} />
          </LineChart>
        </div>
      </motion.div>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Analytics Dashboard"
      pageIcon={<BarChart3 size={20} className="text-white" />}
      pageDescription="Track your productivity and performance metrics"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
