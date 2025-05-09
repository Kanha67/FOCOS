
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function ThemeToggle() {
  const { settings, updateSettings } = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  // Sync with localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }

    // Update app context with theme change
    updateSettings({ darkMode: isDarkMode });
  }, [isDarkMode, updateSettings]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="glass-button p-2 text-foreground transition-all duration-300"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
    </button>
  );
}
