import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navigation from "./components/Navigation";
import FloatingChatButton from "./components/FloatingChatButton";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import "./App.css";
import "./styles/premium-theme.css";
import "./styles/modern-theme.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import FinancialPlanner from "./pages/FinancialPlanner";
import FinancialChat from "./pages/FinancialChat";
import NotFound from "./pages/NotFound";
import SpiritualHabits from "./pages/SpiritualHabits";
import Meditator from "./pages/Meditator";
import FlutePlayer from "./components/FlutePlayer";
import Gita from "./pages/Gita";
import Workout from "./pages/Workout";
import CalendarPage from "./pages/CalendarPage";
import Profile from "./pages/Profile";
import TimeBlockingPage from "./pages/TimeBlockingPage";
import WisdomPage from "./pages/WisdomPage";
import CurrencyConverter from "./pages/CurrencyConverter";
import FinancialEducation from "./pages/FinancialEducation";
import { useAppContext } from "./context/AppContext";
import { ReactNode, useState, useEffect } from "react";
import ModernSplashScreen from "./components/ModernSplashScreen";

const queryClient = new QueryClient();

// Layout wrapper component to add padding for the navigation bar
const PageWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { settings } = useAppContext();

  // Don't add padding on index page or in distraction-free mode
  const shouldAddPadding = location.pathname !== "/index" && !settings.distractionFreeMode;

  return (
    <div
      className={`responsive-container ${shouldAddPadding ? "pb-24 lg:pb-6 lg:pt-20 mobile-nav-padding lg:mobile-nav-padding-none safe-area-padding" : ""}`}
      style={{
        minHeight: shouldAddPadding ? 'calc(100dvh - 70px)' : '100dvh',
        // No max-width constraint to allow full-width on larger screens
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/index" element={<Index />} />
        <Route path="/planner" element={<PageWrapper><Planner /></PageWrapper>} />
        <Route path="/stats" element={<PageWrapper><Stats /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
        <Route path="/financial-planner" element={<PageWrapper><FinancialPlanner /></PageWrapper>} />
        <Route path="/financial-chat" element={<PageWrapper><FinancialChat /></PageWrapper>} />
        <Route path="/spiritual-habits" element={<PageWrapper><SpiritualHabits /></PageWrapper>} />
        <Route path="/meditator" element={<PageWrapper><Meditator /></PageWrapper>} />
        <Route path="/gita" element={<PageWrapper><Gita /></PageWrapper>} />
        <Route path="/workout" element={<PageWrapper><Workout /></PageWrapper>} />
        <Route path="/calendar" element={<PageWrapper><CalendarPage /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/time-blocking" element={<PageWrapper><TimeBlockingPage /></PageWrapper>} />
        <Route path="/wisdom" element={<PageWrapper><WisdomPage /></PageWrapper>} />
        <Route path="/currency-converter" element={<PageWrapper><CurrencyConverter /></PageWrapper>} />
        <Route path="/financial-education" element={<PageWrapper><FinancialEducation /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
      <Navigation />
      <FlutePlayer />
      <FloatingChatButton />
    </>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Check if we should show splash screen (only on first load)
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      // Set flag to not show splash again in this session
      localStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash ? (
            <ModernSplashScreen onComplete={() => setShowSplash(false)} />
          ) : (
            <div className="premium-background premium-scrollbar min-vh-fix w-full max-w-full overflow-x-hidden">
              {/* Simplified background elements - reduced for performance */}
              <div className="fixed inset-0 z-0 overflow-hidden opacity-10 dark:opacity-20 pointer-events-none">
                {/* Static gradient orbs instead of animated */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/5 to-indigo-600/5 dark:from-blue-600/10 dark:to-indigo-600/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-600/5 to-violet-600/5 dark:from-indigo-600/10 dark:to-violet-600/10 blur-3xl" />

                {/* Reduced grid lines for better performance */}
                <div className="absolute inset-0 grid grid-cols-6 h-full w-full opacity-0 dark:opacity-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-6 h-full w-full opacity-0 dark:opacity-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
                    />
                  ))}
                </div>
              </div>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </div>
          )}
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
