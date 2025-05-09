
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";
import DevotionalModeToggle from "@/components/DevotionalModeToggle";
import { useToast } from "@/components/ui/use-toast";
import { Sun, Moon, Sparkles } from "lucide-react";

export default function AppearanceSettings() {
  const { settings, updateSettings } = useAppContext();
  const { toast } = useToast();

  const handleColorChange = (color: string) => {
    updateSettings({ primaryColor: color });
    toast({
      title: "Theme updated",
      description: "Your app theme color has been updated",
    });
  };

  const handleFocusDurationChange = (value: number[]) => {
    updateSettings({ focusDuration: value[0] });
    toast({
      title: "Focus duration updated",
      description: `Focus duration set to ${value[0]} minutes`,
      duration: 1500,
    });
  };

  const handleBreakDurationChange = (value: number[]) => {
    updateSettings({ breakDuration: value[0] });
    toast({
      title: "Break duration updated",
      description: `Break duration set to ${value[0]} minutes`,
      duration: 1500,
    });
  };

  const handleToggleDivineMode = () => {
    const newSettings = {
      divineMode: !settings.divineMode,
      primaryColor: !settings.divineMode ? "#FFA726" : "#9b87f5"
    };

    updateSettings(newSettings);

    document.body.classList.add('mode-transition');
    setTimeout(() => {
      document.body.classList.remove('mode-transition');
    }, 1000);

    toast({
      title: settings.divineMode ? "Divine mode disabled" : "Divine mode enabled",
      description: settings.divineMode
        ? "Returning to normal mode"
        : "Embracing the divine wisdom of Krishna",
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <Sun size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Theme Mode</h2>
            <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
            <Sparkles size={20} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Divine Mode</h2>
            <p className="text-xs text-muted-foreground">Experience Krishna's divine guidance</p>
          </div>
        </div>
        <Button
          variant={settings.divineMode ? "default" : "outline"}
          onClick={handleToggleDivineMode}
          className={`w-full transition-all duration-300 ${settings.divineMode ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}`}
        >
          {settings.divineMode ? "Disable Divine Mode" : "Enable Divine Mode"}
        </Button>
      </Card>

      <DevotionalModeToggle />

      <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
        <div className="grid grid-cols-5 gap-3">
          <button
            onClick={() => handleColorChange("#9b87f5")}
            className="h-10 w-10 rounded-full bg-[#9b87f5] transition-all duration-200 hover:scale-110 shadow-md"
            style={{ outline: settings.primaryColor === "#9b87f5" ? "2px solid currentColor" : "none" }}
          />
          <button
            onClick={() => handleColorChange("#33C3F0")}
            className="h-10 w-10 rounded-full bg-[#33C3F0] transition-all duration-200 hover:scale-110 shadow-md"
            style={{ outline: settings.primaryColor === "#33C3F0" ? "2px solid currentColor" : "none" }}
          />
          <button
            onClick={() => handleColorChange("#FF6B6B")}
            className="h-10 w-10 rounded-full bg-[#FF6B6B] transition-all duration-200 hover:scale-110 shadow-md"
            style={{ outline: settings.primaryColor === "#FF6B6B" ? "2px solid currentColor" : "none" }}
          />
          <button
            onClick={() => handleColorChange("#4CAF50")}
            className="h-10 w-10 rounded-full bg-[#4CAF50] transition-all duration-200 hover:scale-110 shadow-md"
            style={{ outline: settings.primaryColor === "#4CAF50" ? "2px solid currentColor" : "none" }}
          />
          <button
            onClick={() => handleColorChange("#FFA726")}
            className="h-10 w-10 rounded-full bg-[#FFA726] transition-all duration-200 hover:scale-110 shadow-md"
            style={{ outline: settings.primaryColor === "#FFA726" ? "2px solid currentColor" : "none" }}
          />
        </div>
      </Card>

      <Card className="glass-card p-5 mb-5 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Focus Duration</Label>
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">{settings.focusDuration} min</span>
            </div>
            <Slider
              defaultValue={[settings.focusDuration]}
              min={5}
              max={60}
              step={5}
              value={[settings.focusDuration]}
              onValueChange={handleFocusDurationChange}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Break Duration</Label>
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">{settings.breakDuration} min</span>
            </div>
            <Slider
              defaultValue={[settings.breakDuration]}
              min={1}
              max={15}
              step={1}
              value={[settings.breakDuration]}
              onValueChange={handleBreakDurationChange}
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
