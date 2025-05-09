import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowRight, RefreshCw, DollarSign, ArrowLeftRight, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Sample exchange rates (in a real app, these would come from an API)
const exchangeRates = {
  USD: 1,      // US Dollar (base currency)
  EUR: 0.92,   // Euro
  GBP: 0.79,   // British Pound
  JPY: 149.82, // Japanese Yen
  CAD: 1.36,   // Canadian Dollar
  AUD: 1.52,   // Australian Dollar
  INR: 83.12,  // Indian Rupee
  NPR: 132.50, // Nepali Rupee
  CNY: 7.24,   // Chinese Yuan
  BRL: 5.05,   // Brazilian Real
  ZAR: 18.41,  // South African Rand
  MXN: 16.73,  // Mexican Peso
  SGD: 1.34,   // Singapore Dollar
  NZD: 1.64,   // New Zealand Dollar
  CHF: 0.89,   // Swiss Franc
  SEK: 10.42,  // Swedish Krona
  AED: 3.67,   // UAE Dirham
  KRW: 1344.76 // South Korean Won
};

// Function to get full currency names
const getCurrencyFullName = (code: string): string => {
  const currencyNames: Record<string, string> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    INR: "Indian Rupee",
    NPR: "Nepali Rupee",
    CNY: "Chinese Yuan",
    BRL: "Brazilian Real",
    ZAR: "South African Rand",
    MXN: "Mexican Peso",
    SGD: "Singapore Dollar",
    NZD: "New Zealand Dollar",
    CHF: "Swiss Franc",
    SEK: "Swedish Krona"
  };

  return `${code} - ${currencyNames[code] || code}`;
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [conversionHistory, setConversionHistory] = useState<Array<{from: string, to: string, amount: string, result: number, date: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Convert on initial load
    handleConvert();
    
    // Load conversion history from localStorage
    const savedHistory = localStorage.getItem('focos_conversion_history');
    if (savedHistory) {
      try {
        setConversionHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse conversion history:', e);
      }
    }
  }, []);

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to convert",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Convert to USD first (if not already USD)
      let valueInUSD = Number(amount);
      if (fromCurrency !== "USD") {
        valueInUSD = Number(amount) / exchangeRates[fromCurrency as keyof typeof exchangeRates];
      }

      // Then convert from USD to target currency
      const result = valueInUSD * exchangeRates[toCurrency as keyof typeof exchangeRates];

      setConvertedAmount(result);
      setIsLoading(false);
      
      // Add to history
      const newHistory = {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
        result: result,
        date: new Date().toISOString()
      };
      
      const updatedHistory = [newHistory, ...conversionHistory.slice(0, 9)]; // Keep last 10 conversions
      setConversionHistory(updatedHistory);
      
      // Save to localStorage
      localStorage.setItem('focos_conversion_history', JSON.stringify(updatedHistory));
    }, 500);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    // Trigger conversion after state update
    setTimeout(() => {
      handleConvert();
    }, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="premium-card premium-card-lg p-5 space-y-4 premium-glow-effect">
        <div className="flex justify-between items-center">
          <h3 className="premium-title text-xl font-semibold flex items-center gap-2">
            <Sparkles size={18} className="text-blue-400" />
            Currency Converter
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs premium-button-outline"
          >
            {showHistory ? "Hide History" : "Show History"}
          </Button>
        </div>

        <AnimatePresence>
          {!showHistory ? (
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="converter"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                  <label className="text-xs text-muted-foreground mb-1 block">Amount</label>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="premium-input w-full"
                    min="0"
                    step="0.01"
                    ref={inputRef}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleConvert();
                      }
                    }}
                  />
                </div>

                <div className="w-full sm:w-auto">
                  <label className="text-xs text-muted-foreground mb-1 block">From</label>
                  <Select value={fromCurrency} onValueChange={(value) => {
                    setFromCurrency(value);
                    setTimeout(() => handleConvert(), 100);
                  }}>
                    <SelectTrigger className="w-full sm:w-[140px] premium-input">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent className="premium-glass">
                      {Object.keys(exchangeRates).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {getCurrencyFullName(currency)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapCurrencies}
                  className="rounded-full h-10 w-10 premium-button-outline premium-scale"
                >
                  <ArrowLeftRight size={18} />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                  <label className="text-xs text-muted-foreground mb-1 block">Converted Amount</label>
                  <Input
                    type="text"
                    placeholder="Converted Amount"
                    value={convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
                    readOnly
                    className="premium-input w-full font-medium"
                  />
                </div>

                <div className="w-full sm:w-auto">
                  <label className="text-xs text-muted-foreground mb-1 block">To</label>
                  <Select value={toCurrency} onValueChange={(value) => {
                    setToCurrency(value);
                    setTimeout(() => handleConvert(), 100);
                  }}>
                    <SelectTrigger className="w-full sm:w-[140px] premium-input">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent className="premium-glass">
                      {Object.keys(exchangeRates).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {getCurrencyFullName(currency)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleConvert}
                className="w-full premium-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert"
                )}
              </Button>

              {convertedAmount !== null && (
                <motion.div 
                  className="glass-card p-3 rounded-xl text-center"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-medium">
                    {amount} {getCurrencyFullName(fromCurrency).split(' - ')[1]} = <span className="text-blue-400">{convertedAmount.toFixed(2)}</span> {getCurrencyFullName(toCurrency).split(' - ')[1]}
                  </p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Exchange rate: 1 {fromCurrency} = {(exchangeRates[toCurrency as keyof typeof exchangeRates] / exchangeRates[fromCurrency as keyof typeof exchangeRates]).toFixed(4)} {toCurrency}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="history"
            >
              <div className="premium-divider"></div>
              <h4 className="text-sm font-medium">Recent Conversions</h4>
              
              <div className="max-h-[250px] overflow-y-auto premium-scrollbar pr-1">
                {conversionHistory.length > 0 ? (
                  <div className="space-y-2">
                    {conversionHistory.map((item, index) => {
                      const date = new Date(item.date);
                      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                      
                      return (
                        <motion.div 
                          key={index} 
                          className="premium-glass-lighter p-3 rounded-lg text-sm"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">
                                {item.amount} {item.from} → {item.result.toFixed(2)} {item.to}
                              </p>
                              <p className="text-xs text-muted-foreground">{formattedDate}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => {
                                setAmount(item.amount);
                                setFromCurrency(item.from);
                                setToCurrency(item.to);
                                setShowHistory(false);
                                setTimeout(() => handleConvert(), 100);
                              }}
                            >
                              <ArrowRight size={14} />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No conversion history yet</p>
                  </div>
                )}
              </div>
              
              {conversionHistory.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your conversion history?")) {
                      setConversionHistory([]);
                      localStorage.removeItem('focos_conversion_history');
                      toast({
                        title: "History cleared",
                        description: "Your conversion history has been reset.",
                      });
                    }
                  }}
                >
                  Clear History
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
