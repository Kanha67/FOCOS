import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function GitaLessons() {
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [sloka, setSloka] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [randomLoading, setRandomLoading] = useState(false);
  const [randomError, setRandomError] = useState("");
  const [favorites, setFavorites] = useState<{chapter: number, verse: number, sloka: any}[]>(() => {
    const saved = localStorage.getItem('gita_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchSloka = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    setSloka(null);
    try {
      const response = await fetch(`https://vedicscriptures.github.io/slok/${chapter}/${verse}`);
      if (!response.ok) throw new Error("Sloka not found");
      const data = await response.json();
      setSloka(data);
    } catch (err: any) {
      setError("Could not fetch sloka. Please check chapter and verse.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchRandomSloka = async () => {
    setRandomLoading(true);
    setRandomError("");
    try {
      // Generate random chapter (1-18) and verse (1-78)
      const randomChapter = Math.floor(Math.random() * 18) + 1;
      const randomVerse = Math.floor(Math.random() * 78) + 1;
      
      setChapter(randomChapter);
      setVerse(randomVerse);
      
      const response = await fetch(`https://vedicscriptures.github.io/slok/${randomChapter}/${randomVerse}`);
      if (!response.ok) throw new Error("Random sloka not found");
      const data = await response.json();
      setSloka(data);
    } catch (err: any) {
      setRandomError("Could not fetch random sloka. Please try again.");
    } finally {
      setRandomLoading(false);
    }
  };
  
  const addFavorite = () => {
    if (!sloka) return;
    
    const newFavorite = {
      chapter,
      verse,
      sloka
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('gita_favorites', JSON.stringify(updatedFavorites));
  };
  
  const removeFavorite = (chapter: number, verse: number) => {
    const updatedFavorites = favorites.filter(
      fav => !(fav.chapter === chapter && fav.verse === verse)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('gita_favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="responsive-container pt-6 pb-24 min-vh-fix w-full max-w-full">
      {/* Premium Header */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-full sm:w-auto">
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale w-full sm:w-auto justify-center"
            onClick={fetchRandomSloka}
          >
            <Search size={16} className="text-blue-400" />
            <span className="font-medium">Random Verse</span>
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
        <h1 className="text-2xl font-bold premium-title">Bhagavad Gita Lessons</h1>
        <motion.div 
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
      
      {/* Sloka Finder */}
      <motion.div
        className="premium-card p-4 sm:p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Find a Verse</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>
        
        <div className="space-y-4">
          <form onSubmit={fetchSloka} className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Chapter</label>
              <Input
                type="number"
                min="1"
                max="18"
                value={chapter}
                onChange={(e) => setChapter(Number(e.target.value))}
                className="premium-input w-full"
              />
            </div>
            <div className="w-full sm:flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Verse</label>
              <Input
                type="number"
                min="1"
                max="78"
                value={verse}
                onChange={(e) => setVerse(Number(e.target.value))}
                className="premium-input w-full"
              />
            </div>
            <div className="flex sm:items-end mt-3 sm:mt-0">
              <Button
                type="submit"
                className="premium-button w-full sm:w-auto"
                onClick={fetchSloka}
                disabled={loading}
              >
                {loading ? "Loading..." : "Find"}
              </Button>
            </div>
          </form>
          
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
          {randomError && <div className="text-red-400 text-sm mt-2">{randomError}</div>}
        </div>
      </motion.div>
      
      {/* Sloka Result */}
      {sloka && (
        <motion.div 
          className="premium-card p-4 sm:p-5 border border-indigo-500/20 premium-glow-effect mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <div>
              <div className="text-lg font-semibold text-white">Chapter {chapter}, Verse {verse}</div>
              <div className="text-xs text-blue-400">Bhagavad Gita</div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="premium-button-outline flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-start" 
              onClick={addFavorite}
            >
              <Heart size={14} className="text-blue-400" />
              <span>Save</span>
            </Button>
          </div>
          
          <div className="bg-indigo-500/10 p-3 sm:p-4 rounded-xl mb-4">
            <p className="text-white/90 font-medium whitespace-pre-line text-sm sm:text-base">{sloka.slok || "No sloka found."}</p>
          </div>
          <div className="space-y-2">
            {sloka.eng && <p className="text-sm text-white/70"><span className="text-blue-400">English:</span> {sloka.eng}</p>}
            {sloka.hindi && <p className="text-sm text-white/70"><span className="text-blue-400">Hindi:</span> {sloka.hindi}</p>}
          </div>
        </motion.div>
      )}
      
      {/* Favorite Slokas */}
      {favorites.length > 0 && (
        <motion.div 
          className="premium-card p-4 sm:p-5 border border-indigo-500/20 premium-glow-effect mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Favorite Verses</h2>
            </div>
            <span className="premium-badge">Premium</span>
          </div>
          
          <ul className="space-y-4">
            {favorites.map(fav => (
              <li key={`${fav.chapter}:${fav.verse}`} className="bg-indigo-500/10 p-3 sm:p-4 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                      {fav.chapter}:{fav.verse}
                    </div>
                    <span className="text-sm text-white/80">Bhagavad Gita</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="premium-button-outline flex items-center gap-1 text-xs w-full sm:w-auto justify-center" 
                    onClick={() => removeFavorite(fav.chapter, fav.verse)}
                  >
                    <span>Remove</span>
                  </Button>
                </div>
                <div className="mb-2 text-white/90 font-medium whitespace-pre-line text-sm sm:text-base">{fav.sloka.slok}</div>
                <div className="space-y-1">
                  {fav.sloka.eng && <p className="text-xs sm:text-sm text-white/70"><span className="text-blue-400">English:</span> {fav.sloka.eng}</p>}
                  {fav.sloka.hindi && <p className="text-xs sm:text-sm text-white/70"><span className="text-blue-400">Hindi:</span> {fav.sloka.hindi}</p>}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
