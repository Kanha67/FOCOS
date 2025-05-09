import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, RefreshCw, DollarSign, History, Star, StarOff, Globe, TrendingUp, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

// Currency data with full names
const currencies = [
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "NPR", name: "Nepali Rupee", symbol: "रू" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" }
];

// Sample exchange rates (in a real app, these would come from an API)
const exchangeRates: Record<string, Record<string, number>> = {
  "USD": {
    "EUR": 0.92, "GBP": 0.79, "JPY": 149.50, "CAD": 1.36, "AUD": 1.52,
    "CHF": 0.90, "CNY": 7.24, "INR": 83.10, "NPR": 132.50, "SGD": 1.35,
    "NZD": 1.64, "HKD": 7.82, "KRW": 1345.20, "MXN": 16.75, "BRL": 5.05,
    "RUB": 91.20, "ZAR": 18.45, "TRY": 32.15, "SEK": 10.45, "USD": 1.0
  }
};

// Generate exchange rates for all currencies
Object.keys(exchangeRates).forEach(baseCurrency => {
  currencies.forEach(currency => {
    if (currency.code !== baseCurrency && !exchangeRates[currency.code]) {
      exchangeRates[currency.code] = {};
    }

    if (currency.code !== baseCurrency) {
      // If we have the rate for USD to X, calculate X to USD as 1/rate
      if (baseCurrency === "USD") {
        exchangeRates[currency.code]["USD"] = 1 / exchangeRates["USD"][currency.code];
      }

      // Calculate rates between non-USD currencies using USD as intermediary
      currencies.forEach(targetCurrency => {
        if (currency.code !== targetCurrency.code) {
          if (baseCurrency === "USD") {
            const rateToUSD = 1 / exchangeRates["USD"][currency.code];
            const rateFromUSDToTarget = exchangeRates["USD"][targetCurrency.code];
            exchangeRates[currency.code][targetCurrency.code] = rateToUSD * rateFromUSDToTarget;
          }
        } else {
          // Same currency
          exchangeRates[currency.code][currency.code] = 1.0;
        }
      });
    }
  });
});

// Type for conversion history
interface ConversionHistory {
  id: number;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  date: Date;
}

export default function CurrencyConverter() {
  const navigate = useNavigate();
  const { settings } = useAppContext();
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load history and favorites from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("currency_conversion_history");
    if (savedHistory) {
      // Parse dates properly
      const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        date: new Date(item.date)
      }));
      setHistory(parsedHistory);
    }

    const savedFavorites = localStorage.getItem("currency_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save history and favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("currency_conversion_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("currency_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Convert currencies
  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) return;

    const numericAmount = Number(amount);
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = numericAmount * rate;

    setResult(convertedAmount);

    // Add to history
    const newHistoryItem: ConversionHistory = {
      id: Date.now(),
      fromCurrency,
      toCurrency,
      amount: numericAmount,
      result: convertedAmount,
      date: new Date()
    };

    setHistory([newHistoryItem, ...history.slice(0, 9)]); // Keep only last 10 items
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Recalculate after swap
    setTimeout(convertCurrency, 0);
  };

  // Toggle favorite status
  const toggleFavorite = (pair: string) => {
    if (favorites.includes(pair)) {
      setFavorites(favorites.filter(fav => fav !== pair));
    } else {
      setFavorites([...favorites, pair]);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get currency symbol
  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '';
  };

  // Format amount with currency symbol
  const formatAmount = (amount: number, currencyCode: string) => {
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Check if a pair is favorited
  const isPairFavorite = () => {
    return favorites.includes(`${fromCurrency}-${toCurrency}`);
  };

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="text-blue-400" />
        <span className="font-medium">Back</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Popular Currencies */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            Popular Currencies
          </h2>
        </div>

        <div className="space-y-3">
          {["USD", "EUR", "GBP", "JPY", "INR", "NPR", "CAD", "AUD"].map((code) => {
            const currency = currencies.find(c => c.code === code);
            if (!currency) return null;

            return (
              <Button
                key={code}
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  setFromCurrency(code);
                  convertCurrency();
                }}
              >
                <span>{currency.name}</span>
                <span className="text-muted-foreground">{code}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Favorites */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Star size={18} className="text-amber-500" />
            Favorite Pairs
          </h2>
          <span className="text-xs text-muted-foreground">{favorites.length} saved</span>
        </div>

        <div className="space-y-3">
          {favorites.length > 0 ? (
            favorites.map((pair) => {
              const [from, to] = pair.split('-');
              return (
                <div key={pair} className="flex justify-between items-center p-3 bg-indigo-500/10 rounded-lg">
                  <div>
                    <p className="font-medium">{from} → {to}</p>
                    <p className="text-xs text-muted-foreground">
                      1 {from} = {exchangeRates[from][to].toFixed(4)} {to}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setFromCurrency(from);
                      setToCurrency(to);
                      convertCurrency();
                    }}
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No favorites yet. Star a currency pair to add it here.
            </p>
          )}
        </div>
      </Card>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      {/* Converter Card */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/40 flex items-center justify-center">
            <DollarSign size={24} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Currency Exchange</h2>
            <p className="text-xs text-muted-foreground">
              Convert between world currencies
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => toggleFavorite(`${fromCurrency}-${toCurrency}`)}
          >
            {isPairFavorite() ? (
              <Star size={18} className="text-amber-500 fill-amber-500" />
            ) : (
              <StarOff size={18} />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <Label htmlFor="desktop-amount">Amount</Label>
            <Input
              id="desktop-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-5 gap-2 items-end">
            <div className="col-span-2">
              <Label htmlFor="desktop-fromCurrency">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="desktop-fromCurrency" className="mt-1">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={swapCurrencies}
                className="rounded-full h-10 w-10 bg-muted/50"
              >
                <ArrowRight size={18} />
              </Button>
            </div>

            <div className="col-span-2">
              <Label htmlFor="desktop-toCurrency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="desktop-toCurrency" className="mt-1">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={convertCurrency}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 mb-4"
        >
          <RefreshCw size={16} className="mr-2" />
          Convert
        </Button>

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border rounded-lg bg-card/50 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">
              {formatAmount(Number(amount), fromCurrency)} =
            </p>
            <p className="text-2xl font-bold">
              {formatAmount(result, toCurrency)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency].toFixed(4)} {toCurrency}
            </p>
          </motion.div>
        )}
      </Card>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Exchange Rate Trends */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Exchange Rate Trends
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">USD/EUR</p>
              <p className="text-green-500 text-sm">+0.2%</p>
            </div>
            <div className="h-10 bg-indigo-500/5 rounded-md overflow-hidden relative">
              <div className="absolute inset-0 flex items-end">
                <div className="h-3 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-4 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-5 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-6 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-4 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-7 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-5 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-8 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-7 w-2 bg-blue-500/50 mx-[1px]"></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">USD/GBP</p>
              <p className="text-red-500 text-sm">-0.1%</p>
            </div>
            <div className="h-10 bg-indigo-500/5 rounded-md overflow-hidden relative">
              <div className="absolute inset-0 flex items-end">
                <div className="h-6 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-7 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-5 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-4 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-3 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-5 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-4 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-3 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-2 w-2 bg-blue-500/50 mx-[1px]"></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">USD/JPY</p>
              <p className="text-green-500 text-sm">+0.5%</p>
            </div>
            <div className="h-10 bg-indigo-500/5 rounded-md overflow-hidden relative">
              <div className="absolute inset-0 flex items-end">
                <div className="h-2 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-3 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-4 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-5 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-6 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-7 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-8 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-9 w-2 bg-blue-500/50 mx-[1px]"></div>
                <div className="h-8 w-2 bg-blue-500/50 mx-[1px]"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Conversion History */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <History size={18} className="text-primary" />
            Recent Conversions
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide" : "Show"}
          </Button>
        </div>

        {showHistory && (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item.id} className="p-3 bg-indigo-500/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {formatAmount(item.amount, item.fromCurrency)} → {formatAmount(item.result, item.toCurrency)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setFromCurrency(item.fromCurrency);
                        setToCurrency(item.toCurrency);
                        setAmount(item.amount.toString());
                        convertCurrency();
                      }}
                    >
                      <RefreshCw size={16} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No conversion history yet
              </p>
            )}
          </div>
        )}
      </Card>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className={`pt-4 pb-24 px-4 max-w-md mx-auto min-h-screen ${
      settings.devotionalMode ? "devotional-background" :
      settings.divineMode ? "divine-background" :
      ""
    }`}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className={`text-2xl font-bold ${
          settings.devotionalMode ? "text-purple-500" :
          settings.divineMode ? "text-amber-500" :
          "text-primary"
        }`}>
          Currency Converter
        </h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Converter Card */}
      <Card className="glass-card p-4 mb-6 rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/40 flex items-center justify-center">
            <DollarSign size={24} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Currency Exchange</h2>
            <p className="text-xs text-muted-foreground">
              Convert between world currencies
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => toggleFavorite(`${fromCurrency}-${toCurrency}`)}
          >
            {isPairFavorite() ? (
              <Star size={18} className="text-amber-500 fill-amber-500" />
            ) : (
              <StarOff size={18} />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-5 gap-2 items-end">
            <div className="col-span-2">
              <Label htmlFor="fromCurrency">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="fromCurrency" className="mt-1">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={swapCurrencies}
                className="rounded-full h-10 w-10 bg-muted/50"
              >
                <ArrowRight size={18} />
              </Button>
            </div>

            <div className="col-span-2">
              <Label htmlFor="toCurrency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="toCurrency" className="mt-1">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center">
                        <span className="mr-2">{currency.symbol}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={convertCurrency}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 mb-4"
        >
          <RefreshCw size={16} className="mr-2" />
          Convert
        </Button>

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border rounded-lg bg-card/50 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">
              {formatAmount(Number(amount), fromCurrency)} =
            </p>
            <p className="text-2xl font-bold">
              {formatAmount(result, toCurrency)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency].toFixed(4)} {toCurrency}
            </p>
          </motion.div>
        )}
      </Card>

      {/* History Card */}
      <Card className="glass-card p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History size={18} className="text-muted-foreground" />
            <h3 className="text-base font-medium">Conversion History</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide" : "Show"}
          </Button>
        </div>

        {showHistory && (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {history.length > 0 ? (
              history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 border rounded-lg text-sm flex justify-between items-center"
                >
                  <div>
                    <p>
                      {formatAmount(item.amount, item.fromCurrency)} → {formatAmount(item.result, item.toCurrency)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      setFromCurrency(item.fromCurrency);
                      setToCurrency(item.toCurrency);
                      setAmount(item.amount.toString());
                      setTimeout(convertCurrency, 0);
                    }}
                  >
                    <RefreshCw size={14} />
                  </Button>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No conversion history yet
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Currency Converter"
      pageIcon={<DollarSign size={20} className="text-white" />}
      pageDescription="Convert between world currencies"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
