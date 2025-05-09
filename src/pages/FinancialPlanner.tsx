import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Users, PieChart, BookOpen, Wallet, ArrowUpDown, BarChart, Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import StatsCard from "@/components/StatsCard";
import ExpenseTracker from "@/components/ExpenseTracker";
import CurrencyConverter from "@/components/CurrencyConverter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

export default function FinancialPlanner() {
  const [monthlySalary, setMonthlySalary] = useState<number>(0);
  const [familyMembers, setFamilyMembers] = useState<number>(1);
  const [showPlan, setShowPlan] = useState(false);
  const [currency, setCurrency] = useState<string>("USD");
  const [spendingHistory, setSpendingHistory] = useState<{category: string, amount: number, date: string}[]>([]);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  const { toast } = useToast();

  // Load spending history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('focos_spending_history');
    if (savedHistory) {
      setSpendingHistory(JSON.parse(savedHistory));
    }

    const savedSalary = localStorage.getItem('focos_monthly_salary');
    if (savedSalary) {
      const salary = Number(savedSalary);
      setMonthlySalary(salary);
      setRemainingBudget(salary);
    }
  }, []);

  const handleCalculate = () => {
    if (monthlySalary <= 0) {
      toast({
        title: "Invalid salary",
        description: "Please enter a valid monthly salary",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('focos_monthly_salary', monthlySalary.toString());
    setRemainingBudget(monthlySalary);

    setShowPlan(true);
    toast({
      title: "Financial plan generated!",
      description: "Your personalized budget has been created.",
    });
  };

  const handleAddExpense = (category: string, amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid expense amount",
        variant: "destructive",
      });
      return;
    }

    // Create new expense
    const newExpense = {
      category,
      amount,
      date: new Date().toISOString().split('T')[0]
    };

    // Update spending history
    const updatedHistory = [...spendingHistory, newExpense];
    setSpendingHistory(updatedHistory);

    // Save to localStorage
    localStorage.setItem('focos_spending_history', JSON.stringify(updatedHistory));

    // Update remaining budget
    setRemainingBudget(prev => prev - amount);

    toast({
      title: "Expense added",
      description: `${currency} ${amount} added to ${category}`,
    });
  };

  const necessities = Math.round(monthlySalary * 0.5);
  const perPerson = Math.round(necessities / (familyMembers || 1));
  const savings = Math.round(monthlySalary * 0.2);
  const wants = Math.round(monthlySalary * 0.3);

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
      >
        <Calculator size={16} className="text-blue-400" />
        <span className="font-medium">Calculator</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Financial Overview */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Financial Overview</h2>
          <span className="premium-badge">Premium</span>
        </div>

        {showPlan && (
          <div className="space-y-4">
            <StatsCard
              title="Monthly Income"
              value={`${currency} ${monthlySalary}`}
              subtitle="Total"
              className="bg-green-500/10 border-green-200"
            />

            <StatsCard
              title="Remaining Budget"
              value={`${currency} ${remainingBudget.toFixed(2)}`}
              subtitle="This month"
              className="bg-blue-500/10 border-blue-200"
            />
          </div>
        )}

        {!showPlan && (
          <div className="text-center py-6 text-muted-foreground">
            <p>No financial plan yet.</p>
            <p className="text-xs mt-1">Create a budget to see your overview.</p>
          </div>
        )}
      </motion.div>

      {/* Spending History */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart size={18} className="text-blue-500" />
            Spending History
          </h3>
        </div>

        {spendingHistory.length > 0 ? (
          <div className="space-y-3">
            {spendingHistory.slice(-5).reverse().map((expense, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-blue-500/5">
                <div>
                  <p className="font-medium capitalize">{expense.category}</p>
                  <p className="text-xs text-muted-foreground">{expense.date}</p>
                </div>
                <p className="text-sm font-medium">{currency} {expense.amount.toFixed(2)}</p>
              </div>
            ))}

            <div className="pt-2 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to clear your spending history?")) {
                    setSpendingHistory([]);
                    localStorage.removeItem('focos_spending_history');
                    toast({
                      title: "History cleared",
                      description: "Your spending history has been reset.",
                    });
                  }
                }}
              >
                Clear History
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No spending history yet.</p>
            <p className="text-xs mt-1">Add expenses to track your spending.</p>
          </div>
        )}
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="premium-card w-full p-1.5 mb-6 grid grid-cols-4 rounded-xl shadow-md border border-indigo-500/20">
          <TabsTrigger
            value="planner"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <Wallet size={16} />
            <span>Planner</span>
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <DollarSign size={16} />
            <span>Expenses</span>
          </TabsTrigger>
          <TabsTrigger
            value="converter"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <ArrowUpDown size={16} />
            <span>Convert</span>
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <BarChart size={16} />
            <span>Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="premium-fade-in space-y-6">
          <motion.div
            className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Enter Your Financial Details</h2>
              <span className="premium-badge">Premium</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign size={18} className="text-green-500" />
                  Monthly Income
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="number"
                    placeholder="Enter your total monthly income"
                    value={monthlySalary || ""}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    className="glass-input flex-1"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-full sm:w-[80px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar</SelectItem>
                      <SelectItem value="EUR">Euro</SelectItem>
                      <SelectItem value="GBP">British Pound</SelectItem>
                      <SelectItem value="INR">Indian Rupee</SelectItem>
                      <SelectItem value="NPR">Nepali Rupee</SelectItem>
                      <SelectItem value="JPY">Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users size={18} className="text-green-500" />
                  Family Members: {familyMembers}
                </Label>
                <Slider
                  defaultValue={[1]}
                  min={1}
                  max={10}
                  step={1}
                  value={[familyMembers]}
                  onValueChange={(value) => setFamilyMembers(value[0])}
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full glass-button hover-scale bg-green-500 hover:bg-green-600 text-white"
                disabled={monthlySalary <= 0}
              >
                Generate Financial Plan
              </Button>
            </div>
          </motion.div>

          {showPlan && (
            <motion.div
              className="premium-card p-5 border border-indigo-500/20 premium-glow-effect space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Your 50/30/20 Budget Plan</h2>
                <span className="premium-badge">Premium</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  title="Necessities (50%)"
                  value={`${currency} ${necessities}`}
                  subtitle={`${currency} ${perPerson} per person`}
                  className="col-span-2"
                />

                <StatsCard
                  title="Savings (20%)"
                  value={`${currency} ${savings}`}
                />

                <StatsCard
                  title="Wants (30%)"
                  value={`${currency} ${wants}`}
                />

                <StatsCard
                  title="Remaining Budget"
                  value={`${currency} ${remainingBudget.toFixed(2)}`}
                  subtitle="This month"
                  className="col-span-2 bg-green-500/10 border-green-200"
                />
              </div>

              <div className="bg-indigo-500/10 p-4 mt-4 rounded-xl">
                <h3 className="text-md font-medium mb-2 flex items-center gap-2 text-white">
                  <PieChart size={18} className="text-blue-400" />
                  Recommended Allocation
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Housing/Utilities: ~30% ({currency} {Math.round(monthlySalary * 0.3)})</li>
                  <li>• Food/Groceries: ~15% ({currency} {Math.round(monthlySalary * 0.15)})</li>
                  <li>• Transportation: ~5% ({currency} {Math.round(monthlySalary * 0.05)})</li>
                  <li>• Emergency Fund: ~10% ({currency} {Math.round(monthlySalary * 0.1)})</li>
                  <li>• Retirement: ~10% ({currency} {Math.round(monthlySalary * 0.1)})</li>
                  <li>• Personal/Entertainment: ~15% ({currency} {Math.round(monthlySalary * 0.15)})</li>
                  <li>• Others/Flexible: ~15% ({currency} {Math.round(monthlySalary * 0.15)})</li>
                </ul>

                <div className="mt-4 pt-4 border-t border-primary/20">
                  <h3 className="text-md font-medium mb-2">Quick Expense Entry</h3>
                  <div className="flex gap-2">
                    <Select defaultValue="housing">
                      <SelectTrigger className="glass-input flex-1">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Amount"
                      className="glass-input w-24"
                      id="expense-amount"
                    />
                    <Button
                      onClick={() => {
                        const amountInput = document.getElementById('expense-amount') as HTMLInputElement;
                        const categorySelect = document.querySelector('[data-value]') as HTMLElement;
                        const amount = Number(amountInput.value);
                        const category = categorySelect?.getAttribute('data-value') || 'other';

                        if (amount && category) {
                          handleAddExpense(category, amount);
                          amountInput.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseTracker initialCurrency={currency} />
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <CurrencyConverter />

          <div className="glass-card p-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BarChart size={18} className="text-blue-500" />
              Spending History
            </h3>

            {spendingHistory.length > 0 ? (
              <div className="space-y-3">
                {spendingHistory.slice(-5).reverse().map((expense, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-blue-500/5">
                    <div>
                      <p className="font-medium capitalize">{expense.category}</p>
                      <p className="text-xs text-muted-foreground">{expense.date}</p>
                    </div>
                    <p className="text-sm font-medium">{currency} {expense.amount.toFixed(2)}</p>
                  </div>
                ))}

                <div className="pt-2 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your spending history?")) {
                        setSpendingHistory([]);
                        localStorage.removeItem('focos_spending_history');
                        toast({
                          title: "History cleared",
                          description: "Your spending history has been reset.",
                        });
                      }
                    }}
                  >
                    Clear History
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No spending history yet.</p>
                <p className="text-xs mt-1">Add expenses to track your spending.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="glass-card p-4 animate-fade-in">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Financial Education
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-medium mb-2">Basic Financial Concepts</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about budgeting, savings, investments, and more through our curated resources.
                </p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-medium mb-2">Investment Fundamentals</h3>
                <p className="text-sm text-muted-foreground">
                  Understand different investment options and strategies for long-term wealth building.
                </p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-medium mb-2">Risk Management</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to protect your assets and manage financial risks effectively.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Financial Education */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            Financial Education
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium mb-2">Basic Financial Concepts</h3>
            <p className="text-sm text-muted-foreground">
              Learn about budgeting, savings, investments, and more through our curated resources.
            </p>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium mb-2">Investment Fundamentals</h3>
            <p className="text-sm text-muted-foreground">
              Understand different investment options and strategies for long-term wealth building.
            </p>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium mb-2">Risk Management</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to protect your assets and manage financial risks effectively.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Currency Converter Quick Access */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ArrowUpDown size={18} className="text-primary" />
            Quick Convert
          </h2>
        </div>

        <CurrencyConverter />
      </motion.div>
    </>
  );

  // Mobile content
  const mobileContent = (
    <div className="pt-6 pb-24 px-5 max-w-md mx-auto min-h-screen">
      {/* Premium Header */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
          >
            <Calculator size={16} className="text-blue-400" />
            <span className="font-medium">Calculator</span>
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
        <h1 className="text-2xl font-bold premium-title">Financial Planner</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      <Tabs defaultValue="planner" className="w-full">
        <TabsList className="premium-card w-full p-1.5 mb-6 grid grid-cols-4 rounded-xl shadow-md border border-indigo-500/20">
          <TabsTrigger
            value="planner"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <Wallet size={16} />
            <span>Planner</span>
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <DollarSign size={16} />
            <span>Expenses</span>
          </TabsTrigger>
          <TabsTrigger
            value="converter"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <ArrowUpDown size={16} />
            <span>Convert</span>
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-indigo-500/10 data-[state=active]:text-blue-400 transition-all rounded-lg text-sm font-medium"
          >
            <BarChart size={16} />
            <span>Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="premium-fade-in space-y-6">
          <motion.div
            className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Enter Your Financial Details</h2>
              <span className="premium-badge">Premium</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign size={18} className="text-green-500" />
                  Monthly Income
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="number"
                    placeholder="Enter your total monthly income"
                    value={monthlySalary || ""}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    className="glass-input flex-1"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-full sm:w-[80px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar</SelectItem>
                      <SelectItem value="EUR">Euro</SelectItem>
                      <SelectItem value="GBP">British Pound</SelectItem>
                      <SelectItem value="INR">Indian Rupee</SelectItem>
                      <SelectItem value="NPR">Nepali Rupee</SelectItem>
                      <SelectItem value="JPY">Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users size={18} className="text-green-500" />
                  Family Members: {familyMembers}
                </Label>
                <Slider
                  defaultValue={[1]}
                  min={1}
                  max={10}
                  step={1}
                  value={[familyMembers]}
                  onValueChange={(value) => setFamilyMembers(value[0])}
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full glass-button hover-scale bg-green-500 hover:bg-green-600 text-white"
                disabled={monthlySalary <= 0}
              >
                Generate Financial Plan
              </Button>
            </div>
          </motion.div>

          {showPlan && (
            <motion.div
              className="premium-card p-5 border border-indigo-500/20 premium-glow-effect space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Your 50/30/20 Budget Plan</h2>
                <span className="premium-badge">Premium</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  title="Necessities (50%)"
                  value={`${currency} ${necessities}`}
                  subtitle={`${currency} ${perPerson} per person`}
                  className="col-span-2"
                />

                <StatsCard
                  title="Savings (20%)"
                  value={`${currency} ${savings}`}
                />

                <StatsCard
                  title="Wants (30%)"
                  value={`${currency} ${wants}`}
                />

                <StatsCard
                  title="Remaining Budget"
                  value={`${currency} ${remainingBudget.toFixed(2)}`}
                  subtitle="This month"
                  className="col-span-2 bg-green-500/10 border-green-200"
                />
              </div>

              <div className="bg-indigo-500/10 p-4 mt-4 rounded-xl">
                <h3 className="text-md font-medium mb-2 flex items-center gap-2 text-white">
                  <PieChart size={18} className="text-blue-400" />
                  Recommended Allocation
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Housing/Utilities: ~30% ({currency} {Math.round(monthlySalary * 0.3)})</li>
                  <li>• Food/Groceries: ~15% ({currency} {Math.round(monthlySalary * 0.15)})</li>
                  <li>• Transportation: ~5% ({currency} {Math.round(monthlySalary * 0.05)})</li>
                  <li>• Emergency Fund: ~10% ({currency} {Math.round(monthlySalary * 0.1)})</li>
                  <li>• Retirement: ~10% ({currency} {Math.round(monthlySalary * 0.1)})</li>
                  <li>• Personal/Entertainment: ~15% ({currency} {Math.round(monthlySalary * 0.15)})</li>
                  <li>• Others/Flexible: ~15% ({currency} {Math.round(monthlySalary * 0.15)})</li>
                </ul>

                <div className="mt-4 pt-4 border-t border-primary/20">
                  <h3 className="text-md font-medium mb-2">Quick Expense Entry</h3>
                  <div className="flex gap-2">
                    <Select defaultValue="housing">
                      <SelectTrigger className="glass-input flex-1">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Amount"
                      className="glass-input w-24"
                      id="expense-amount"
                    />
                    <Button
                      onClick={() => {
                        const amountInput = document.getElementById('expense-amount') as HTMLInputElement;
                        const categorySelect = document.querySelector('[data-value]') as HTMLElement;
                        const amount = Number(amountInput.value);
                        const category = categorySelect?.getAttribute('data-value') || 'other';

                        if (amount && category) {
                          handleAddExpense(category, amount);
                          amountInput.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseTracker initialCurrency={currency} />
        </TabsContent>

        <TabsContent value="converter">
          <CurrencyConverter />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="glass-card p-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BarChart size={18} className="text-blue-500" />
              Spending History
            </h3>

            {spendingHistory.length > 0 ? (
              <div className="space-y-3">
                {spendingHistory.slice(-5).reverse().map((expense, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-blue-500/5">
                    <div>
                      <p className="font-medium capitalize">{expense.category}</p>
                      <p className="text-xs text-muted-foreground">{expense.date}</p>
                    </div>
                    <p className="text-sm font-medium">{currency} {expense.amount.toFixed(2)}</p>
                  </div>
                ))}

                <div className="pt-2 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your spending history?")) {
                        setSpendingHistory([]);
                        localStorage.removeItem('focos_spending_history');
                        toast({
                          title: "History cleared",
                          description: "Your spending history has been reset.",
                        });
                      }
                    }}
                  >
                    Clear History
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No spending history yet.</p>
                <p className="text-xs mt-1">Add expenses to track your spending.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Financial Planner"
      pageIcon={<DollarSign size={20} className="text-white" />}
      pageDescription="Manage your budget and track your expenses"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
