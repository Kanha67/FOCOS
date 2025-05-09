import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [storedUsername, setStoredUsername] = useState<string | null>(null);
  const [animation, setAnimation] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setShowSplash(true);
    const timer1 = setTimeout(() => setAnimation(2), 1200);
    const timer2 = setTimeout(() => setAnimation(3), 2200);
    const timer3 = setTimeout(() => setShowSplash(false), 3200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    // Check if username exists
    const savedUsername = localStorage.getItem("focos_username");
    setStoredUsername(savedUsername);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("focos_username", username.trim());
    toast({
      title: "Welcome to focos!",
      description: "Your productivity journey begins now.",
    });
    navigate("/");
  };

  const handleContinue = () => {
    navigate("/");
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-amber-300 to-purple-200 animate-fade-in">
        <div className="relative flex flex-col items-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-purple-500 to-amber-700 bg-clip-text text-transparent animate-focos-wave drop-shadow-xl">
            FOCOS
          </h1>
          <div className="flex mt-2 gap-2 animate-bounce-in">
            <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></span>
            <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
            <span className="w-3 h-3 bg-amber-700 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></span>
          </div>
          <p className="mt-4 text-lg text-purple-700 animate-fade-in">Your personal all rounder manager</p>
          <style>{`
            @keyframes focosWave {
              0% { letter-spacing: 0.1em; transform: scale(1) rotate(-2deg); opacity: 0.7; }
              20% { letter-spacing: 0.25em; transform: scale(1.13) rotate(2deg); opacity: 1; }
              40% { letter-spacing: 0.05em; transform: scale(0.96) rotate(-3deg); opacity: 1; }
              60% { letter-spacing: 0.18em; transform: scale(1.07) rotate(1deg); opacity: 1; }
              80% { letter-spacing: 0.1em; transform: scale(1.01) rotate(-1deg); opacity: 0.98; }
              100% { letter-spacing: 0.1em; transform: scale(1) rotate(0deg); opacity: 0.95; }
            }
            .animate-focos-wave {
              animation: focosWave 2.6s cubic-bezier(.65,.05,.36,1) 1;
            }
            @keyframes bounceIn {
              0% { transform: translateY(30px); opacity: 0; }
              60% { transform: translateY(-8px); opacity: 1; }
              80% { transform: translateY(4px); }
              100% { transform: translateY(0); }
            }
            .animate-bounce-in {
              animation: bounceIn 1.1s 0.6s both;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="glass-card p-8 w-full max-w-md animate-scale-in">
        <h1 className="text-4xl font-bold text-center mb-2">FOCOS</h1>
        <p className="text-center mb-8 text-muted-foreground">Your personal all rounder manager</p>
        {!storedUsername ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Choose a username to get started
              </label>
              <Input
                id="username"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass-input"
                maxLength={20}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full glass-button"
            >
              Get Started
            </Button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="space-y-2 animate-fade-in">
              <h2 className="text-2xl font-semibold">Welcome back,</h2>
              <p className="text-3xl font-bold text-primary">{storedUsername}</p>
            </div>
            
            <Button 
              onClick={handleContinue}
              className="w-full glass-button"
            >
              Continue
            </Button>
          </div>
        )}
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Developed by Unique Shiwakoti</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
