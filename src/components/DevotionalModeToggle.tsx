import { Flower, Sparkles, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DevotionalModeToggle() {
  const { settings, updateSettings } = useAppContext();
  const [isDevotionalMode, setIsDevotionalMode] = useState(settings.devotionalMode);

  // Sync with app context on component mount
  useEffect(() => {
    setIsDevotionalMode(settings.devotionalMode);
  }, [settings.devotionalMode]);

  // Toggle devotional mode
  const toggleDevotionalMode = () => {
    const newValue = !isDevotionalMode;
    setIsDevotionalMode(newValue);
    updateSettings({ devotionalMode: newValue });

    // If enabling devotional mode, also enable divine mode
    if (newValue && !settings.divineMode) {
      updateSettings({ divineMode: true });
    }
  };

  return (
    <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/40 flex items-center justify-center">
          <Moon size={20} className="text-purple-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Devotional Mode</h2>
          <p className="text-xs text-muted-foreground">Enhanced spiritual experience</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Devotional Mode</Label>
            <p className="text-xs text-muted-foreground">
              Immerse yourself in a deeper spiritual experience with devotional themes, mantras, and content
            </p>
          </div>
          <Switch
            checked={isDevotionalMode}
            onCheckedChange={toggleDevotionalMode}
            className="data-[state=checked]:bg-purple-500"
          />
        </div>

        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm">
            Devotional Mode enhances Divine Mode with:
          </p>
          <ul className="text-xs space-y-1 mt-2">
            <li className="flex items-center gap-1">
              <Flower size={12} className="text-purple-500" />
              <span>Spiritual mantras and chants</span>
            </li>
            <li className="flex items-center gap-1">
              <Sparkles size={12} className="text-purple-500" />
              <span>Enhanced meditation features</span>
            </li>
            <li className="flex items-center gap-1">
              <Moon size={12} className="text-purple-500" />
              <span>Sacred texts and teachings</span>
            </li>
          </ul>
        </div>

        <Button
          variant={isDevotionalMode ? "default" : "outline"}
          onClick={toggleDevotionalMode}
          className={`w-full transition-all duration-300 ${isDevotionalMode ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}`}
        >
          {isDevotionalMode ? "Disable Devotional Mode" : "Enable Devotional Mode"}
        </Button>
      </div>
    </Card>
  );
}
