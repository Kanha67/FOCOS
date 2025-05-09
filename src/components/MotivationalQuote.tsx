
import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "It's not about having time, it's about making time.", author: "Unknown" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Productivity is never an accident. It is always the result of a commitment to excellence.", author: "Paul J. Meyer" },
  { text: "Financial freedom is available to those who learn about it and work for it.", author: "Robert Kiyosaki" }
];

export default function MotivationalQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Get a random quote
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };
    
    // Check if we need a new quote
    const checkAndUpdateQuote = () => {
      const savedDate = localStorage.getItem('quoteDate');
      const today = new Date().toDateString();
      
      if (savedDate !== today) {
        const newQuote = getRandomQuote();
        setQuote(newQuote);
        localStorage.setItem('quoteDate', today);
        localStorage.setItem('currentQuote', JSON.stringify(newQuote));
      } else {
        // Use the saved quote from today
        const savedQuote = localStorage.getItem('currentQuote');
        if (savedQuote) {
          setQuote(JSON.parse(savedQuote));
        } else {
          // Fallback if somehow the quote wasn't saved
          const newQuote = getRandomQuote();
          setQuote(newQuote);
          localStorage.setItem('currentQuote', JSON.stringify(newQuote));
        }
      }
    };
    
    checkAndUpdateQuote();
    
    // Set up interval to check the date every hour (in case the app stays open overnight)
    const intervalId = setInterval(checkAndUpdateQuote, 60 * 60 * 1000); // every hour
    
    return () => clearInterval(intervalId);
  }, []);
  
  if (!quote) return null;
  
  return (
    <div className={`glass-card p-5 mx-auto text-center mb-6 max-w-md ${fadeIn ? 'animate-fade-in' : ''}`}>
      <p className="text-md font-medium mb-1">{quote.text}</p>
      <p className="text-sm text-muted-foreground">— {quote.author}</p>
    </div>
  );
}
