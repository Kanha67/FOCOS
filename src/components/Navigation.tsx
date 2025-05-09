import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart2,
  Settings,
  DollarSign,
  MessageCircle,
  BookOpen,
  Feather,
  Dumbbell,
  CalendarDays,
  MoreHorizontal,
  Menu,
  User,
  Clock,
  Sparkles,
  GraduationCap,
  CurrencyIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [username, setUsername] = useState<string | null>(null);
  const { settings } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if we're on the Index page
    if (location.pathname === "/index") {
      return;
    }

    // Get username from localStorage
    const savedUsername = localStorage.getItem("focos_username");

    // If no username and not on Index page, redirect to Index
    if (!savedUsername) {
      window.location.href = "/index";
      return;
    }

    setUsername(savedUsername);
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Don't show navigation on the index/splash page or in distraction-free mode
  if (location.pathname === "/index" || settings.distractionFreeMode) {
    return null;
  }

  // Define main navigation items based on mode
  const mainNavItems = settings.devotionalMode ? [
    {
      path: "/gita",
      label: "Gita",
      icon: <BookOpen size={22} className="animate-glow text-purple-500" />
    },
    {
      path: "/spiritual-habits",
      label: "Devotion",
      icon: <Feather size={22} className="animate-glow text-purple-500" />
    },
    {
      path: "/meditator",
      label: "Meditate",
      icon: <Dumbbell size={22} className="animate-glow text-purple-500" />
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <User size={22} className="animate-glow text-purple-500" />
    }
  ] : settings.divineMode ? [
    {
      path: "/gita",
      label: "Gita",
      icon: <BookOpen size={22} className={activeTab === "/gita" ? "animate-glow" : ""} />
    },
    {
      path: "/spiritual-habits",
      label: "Spiritual",
      icon: <Feather size={22} className={activeTab === "/spiritual-habits" ? "animate-glow" : ""} />
    },
    {
      path: "/wisdom",
      label: "Wisdom",
      icon: <Sparkles size={22} className={activeTab === "/wisdom" ? "animate-glow" : ""} />
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <User size={22} className={activeTab === "/profile" ? "animate-glow" : ""} />
    }
  ] : [
    {
      path: "/",
      label: "Home",
      icon: <Home size={22} />
    },
    {
      path: "/planner",
      label: "Planner",
      icon: <Calendar size={22} />
    },
    {
      path: "/workout",
      label: "Workout",
      icon: <Dumbbell size={22} />
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <User size={22} />
    }
  ];

  // Define secondary navigation items for the More menu
  const moreNavItems = settings.devotionalMode ? [
    {
      path: "/calendar",
      label: "Calendar",
      icon: <CalendarDays size={20} className="text-purple-500" />
    },
    {
      path: "/time-blocking",
      label: "Time Blocks",
      icon: <Clock size={20} className="text-purple-500" />
    },
    {
      path: "/stats",
      label: "Karma",
      icon: <BarChart2 size={20} className="text-purple-500" />
    },
    {
      path: "/financial-chat",
      label: "Guidance",
      icon: <MessageCircle size={20} className="text-purple-500" />
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings size={20} className="text-purple-500" />
    }
  ] : [
    {
      path: "/calendar",
      label: "Calendar",
      icon: <CalendarDays size={20} />
    },
    {
      path: "/time-blocking",
      label: "Time Blocks",
      icon: <Clock size={20} />
    },
    {
      path: "/stats",
      label: settings.divineMode ? "Karma" : "Stats",
      icon: <BarChart2 size={20} />
    },
    {
      path: settings.divineMode ? "/meditator" : "/financial-planner",
      label: settings.divineMode ? "Meditator" : "Finance",
      icon: settings.divineMode ? <Feather size={20} /> : <DollarSign size={20} />
    },
    {
      path: settings.divineMode ? "/workout" : "/currency-converter",
      label: settings.divineMode ? "Workout" : "Currency",
      icon: settings.divineMode ? <Dumbbell size={20} /> : <CurrencyIcon size={20} />
    },
    {
      path: settings.divineMode ? "/financial-chat" : "/financial-education",
      label: settings.divineMode ? "Spiritual Guide" : "Education",
      icon: settings.divineMode ? <MessageCircle size={20} /> : <GraduationCap size={20} />
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings size={20} />
    }
  ];

  return (
    <nav className="premium-nav fixed bottom-0 left-0 right-0 z-50 border-t border-indigo-500/20 backdrop-blur-xl bg-background/80 shadow-lg shadow-indigo-500/10 responsive-nav lg:bottom-auto lg:top-0 lg:border-t-0 lg:border-b lg:border-indigo-500/20">
      <div className="flex justify-around items-center px-2 py-2 sm:py-3 max-w-md mx-auto lg:max-w-6xl lg:justify-between lg:py-3">
        {/* Logo for desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 rounded-full shadow-sm bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">F</div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">FOCOS</span>
        </div>

        {/* Main navigation items */}
        <div className="flex justify-around items-center w-full lg:w-auto lg:gap-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setActiveTab(item.path)}
              className="premium-nav-item flex flex-col items-center relative px-2 premium-scale lg:flex-row lg:gap-2 lg:px-3 lg:py-2"
            >
              <div className={cn(
                "relative p-2 rounded-xl transition-all duration-300 lg:p-1.5",
                activeTab === item.path ? "bg-indigo-500/10" : ""
              )}>
                {activeTab === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl bg-indigo-500/10"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <div className="relative z-10">
                  {item.icon}
                </div>
              </div>
              <span className="text-xs mt-1 font-medium lg:text-sm lg:mt-0">{item.label}</span>
              {activeTab === item.path && (
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 lg:bottom-0 lg:w-full"
                  layoutId="nav-underline"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: activeTab === item.path ? (window.innerWidth >= 1024 ? "100%" : 32) : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}

        {/* More dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "premium-nav-item flex flex-col items-center relative px-2 premium-scale lg:flex-row lg:gap-2 lg:px-3 lg:py-2",
              moreNavItems.some(item => item.path === activeTab) && "active"
            )}>
              <div className={cn(
                "relative p-2 rounded-xl transition-all duration-300 lg:p-1.5",
                moreNavItems.some(item => item.path === activeTab) ? "bg-indigo-500/10" : ""
              )}>
                {moreNavItems.some(item => item.path === activeTab) && (
                  <motion.div
                    layoutId="more-nav-indicator"
                    className="absolute inset-0 rounded-xl bg-indigo-500/10"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <div className="relative z-10">
                  <Menu size={22} />
                </div>
              </div>
              <span className="text-xs mt-1 font-medium lg:text-sm lg:mt-0">More</span>
              {moreNavItems.some(item => item.path === activeTab) && (
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 lg:bottom-0 lg:w-full"
                  layoutId="more-nav-underline"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: moreNavItems.some(item => item.path === activeTab) ? (window.innerWidth >= 1024 ? "100%" : 32) : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-3 premium-card border border-indigo-500/20 rounded-xl lg:w-64">
            {moreNavItems
              .filter(item => item.path !== null) // Filter out null items
              .map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    onClick={() => setActiveTab(item.path)}
                    className={cn(
                      "flex items-center gap-3 py-2.5 px-3 rounded-lg w-full transition-all duration-200",
                      activeTab === item.path
                        ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-400"
                        : "hover:bg-indigo-500/5"
                    )}
                  >
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      activeTab === item.path
                        ? "bg-blue-500/10"
                        : "bg-indigo-500/5"
                    )}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
