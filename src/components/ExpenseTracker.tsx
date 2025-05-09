
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, TrendingUp, TrendingDown, Calendar, PieChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpenseTrackerProps {
  initialCurrency?: string;
}

export default function ExpenseTracker({ initialCurrency = "USD" }: ExpenseTrackerProps) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('focos_expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('general');
  const [currency, setCurrency] = useState(initialCurrency);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('focos_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!description || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
    setCategory('general');

    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  // Filter for expenses in the last 30 days
  const last30DaysExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    return expenseDate >= thirtyDaysAgo && expenseDate <= today;
  });

  const totalExpenses = last30DaysExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate category totals
  const categoryTotals = last30DaysExpenses.reduce((totals: {[key: string]: number}, expense) => {
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += expense.amount;
    return totals;
  }, {});

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Generate financial advice based on spending
  const getFinancialAdvice = () => {
    if (last30DaysExpenses.length === 0) {
      return "Start tracking your expenses to get personalized financial advice.";
    }

    const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    const percentageOfTotal = (highestCategory[1] / totalExpenses) * 100;

    if (percentageOfTotal > 50) {
      return `You're spending ${percentageOfTotal.toFixed(0)}% of your budget on ${highestCategory[0]}. Consider diversifying your expenses for better financial health.`;
    } else if (highestCategory[0] === "savings") {
      return "Great job prioritizing your savings! This will help secure your financial future.";
    } else {
      return "Your spending looks balanced. Continue monitoring your expenses and look for opportunities to increase savings.";
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wallet size={20} className="text-primary" />
          Monthly Expenses Tracker
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Enter expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-input w-full px-3 py-2"
            >
              <option value="housing">Housing/Utilities</option>
              <option value="food">Food/Groceries</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="savings">Savings</option>
              <option value="general">General</option>
            </select>
          </div>

          <Button onClick={addExpense} className="w-full glass-button">
            Add Expense
          </Button>
        </div>
      </div>

      {last30DaysExpenses.length > 0 && (
        <>
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {totalExpenses > 1000 ? (
                <TrendingUp size={20} className="text-destructive" />
              ) : (
                <TrendingDown size={20} className="text-green-500" />
              )}
              Last 30 Days Analysis
            </h3>

            <div className="space-y-4">
              <p className="text-lg font-medium">
                Total Expenses: {currency} {totalExpenses.toFixed(2)}
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <PieChart size={16} />
                  Spending by Category
                </h4>
                {Object.entries(categoryTotals).map(([cat, total]) => (
                  <div key={cat} className="flex justify-between items-center">
                    <span className="capitalize">{cat}</span>
                    <span>{currency} {total.toFixed(2)} ({((total / totalExpenses) * 100).toFixed(0)}%)</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Krishn's Financial Advice:</h4>
                <p className="text-sm">{getFinancialAdvice()}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <h3 className="text-md font-medium mb-3 flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              Recent Expenses
            </h3>

            <div className="space-y-2">
              {last30DaysExpenses
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center p-2 bg-background/50 rounded">
                    <div>
                      <span className="font-medium">{expense.description}</span>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(expense.date)} • <span className="capitalize">{expense.category}</span>
                      </div>
                    </div>
                    <span className="font-medium">{currency} {expense.amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
