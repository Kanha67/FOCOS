import { motion } from "framer-motion";
import FinancialAdvisorChat from "@/components/FinancialAdvisorChat";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, MessageCircle, BookOpen, Lightbulb } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

export default function FinancialChat() {
  const { settings, toggleDistractionFreeMode } = useAppContext();

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={toggleDistractionFreeMode}
      >
        <Shield size={16} className="text-blue-400" />
        <span className="font-medium">{settings.distractionFreeMode ? "Exit Focus" : "Focus Mode"}</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 h-[calc(100vh-12rem)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FinancialAdvisorChat />
      </motion.div>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Financial Tips */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" />
            Financial Tips
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <h3 className="font-medium mb-2">Emergency Fund</h3>
            <p className="text-sm text-muted-foreground">
              Aim to save 3-6 months of expenses in an easily accessible account for emergencies.
            </p>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="font-medium mb-2">Debt Management</h3>
            <p className="text-sm text-muted-foreground">
              Pay off high-interest debt first while maintaining minimum payments on other debts.
            </p>
          </div>

          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h3 className="font-medium mb-2">Investment Strategy</h3>
            <p className="text-sm text-muted-foreground">
              Consider a diversified portfolio with a mix of stocks, bonds, and other assets based on your risk tolerance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            Resources
          </h2>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-left">
            <DollarSign size={16} className="mr-2 text-green-500" />
            <div>
              <p className="font-medium">Budget Templates</p>
              <p className="text-xs text-muted-foreground">Download helpful budget templates</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left">
            <BookOpen size={16} className="mr-2 text-blue-500" />
            <div>
              <p className="font-medium">Financial Glossary</p>
              <p className="text-xs text-muted-foreground">Learn common financial terms</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left">
            <MessageCircle size={16} className="mr-2 text-purple-500" />
            <div>
              <p className="font-medium">Ask Common Questions</p>
              <p className="text-xs text-muted-foreground">Quick answers to FAQs</p>
            </div>
          </Button>
        </div>
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
            onClick={toggleDistractionFreeMode}
          >
            <Shield size={16} className="text-blue-400" />
            <span className="font-medium">{settings.distractionFreeMode ? "Exit Focus" : "Focus Mode"}</span>
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
        <h1 className="text-2xl font-bold premium-title">
          {settings.divineMode ? "Spiritual Guide" : "Financial Advisor"}
        </h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Chat Component */}
      <motion.div
        className="premium-card border border-indigo-500/20 premium-glow-effect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FinancialAdvisorChat />
      </motion.div>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle={settings.divineMode ? "Spiritual Guide" : "Financial Advisor"}
      pageIcon={<MessageCircle size={20} className="text-white" />}
      pageDescription="Get personalized financial advice and guidance"
      headerActions={headerActions}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
