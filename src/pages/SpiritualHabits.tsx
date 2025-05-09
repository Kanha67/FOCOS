import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Heart, Sparkles, Feather, Flower, PlusCircle, BookMarked } from "lucide-react";
import SlokaFinder from "@/components/SlokaFinder";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

export default function SpiritualHabits() {
  const [plans, setPlans] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("habits");
  const [showMotivation, setShowMotivation] = useState(false);
  const [problem, setProblem] = useState("");

  const addPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setPlans([input.trim(), ...plans]);
      setInput("");
    }
  };

  const handleProblemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      setShowMotivation(true);
    }
  };

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={() => setActiveTab("habits")}
      >
        <Sparkles size={16} className="text-blue-400" />
        <span className="font-medium">Spiritual Habits</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Habit Tracker */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Habit Tracker</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <form onSubmit={addPlan} className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new spiritual habit..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 premium-input"
          />
          <Button type="submit" className="premium-button">
            <PlusCircle size={16} className="mr-1" />
            Add
          </Button>
        </form>

        {plans.length > 0 ? (
          <div className="space-y-3">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                className="p-3 bg-indigo-500/20 rounded-lg flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                    {idx + 1}
                  </div>
                  <span className="text-white/90">{plan}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="premium-button-outline text-xs"
                  onClick={() => setPlans(plans.filter((_, i) => i !== idx))}
                >
                  Remove
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground my-4">No spiritual habits added yet. Add your first one above!</p>
        )}
      </motion.div>

      {/* Sloka of the Day */}
      <motion.div
        className="glass-card p-6 border border-amber-200/50 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-amber-700 flex items-center gap-2">
            <BookMarked size={18} className="text-amber-500" />
            Sloka of the Day
          </h3>
        </div>

        <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
            "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
            मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results, and never be attached to not doing your duty."
          </p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-2 italic">
            — Bhagavad Gita, Chapter 2, Verse 47
          </p>
        </div>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-indigo-500/10">
          <TabsTrigger value="habits" onClick={() => setActiveTab("habits")} className="data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white">Habits</TabsTrigger>
          <TabsTrigger value="motivation" onClick={() => setActiveTab("motivation")} className="data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white">Motivation</TabsTrigger>
          <TabsTrigger value="wisdom" onClick={() => setActiveTab("wisdom")} className="data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white">Wisdom</TabsTrigger>
        </TabsList>

        <TabsContent value="habits">
          <div className="bg-indigo-500/10 p-4 rounded-xl mb-4">
            <h2 className="text-lg font-semibold mb-4 text-white">My Spiritual Habits</h2>
            <form onSubmit={addPlan} className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new spiritual habit..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 premium-input"
              />
              <Button type="submit" className="premium-button">
                <PlusCircle size={16} className="mr-1" />
                Add
              </Button>
            </form>

            {plans.length > 0 ? (
              <div className="space-y-3">
                {plans.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 bg-indigo-500/20 rounded-lg flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                        {idx + 1}
                      </div>
                      <span className="text-white/90">{plan}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="premium-button-outline text-xs"
                      onClick={() => setPlans(plans.filter((_, i) => i !== idx))}
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/70 my-4">No spiritual habits added yet. Add your first one above!</p>
            )}
          </div>

          <div className="bg-indigo-500/10 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">Suggested Spiritual Habits</h2>
            <div className="space-y-3">
              {[
                "Morning meditation for 10 minutes",
                "Read spiritual texts for 15 minutes daily",
                "Practice gratitude by listing 3 things you're thankful for",
                "Spend time in nature and reflect",
                "Journal about your spiritual insights",
                "Practice mindfulness during daily activities",
                "Engage in prayer or contemplation"
              ].map((suggestion, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 bg-indigo-500/20 rounded-lg flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                      <Sparkles size={12} />
                    </div>
                    <span className="text-white/90">{suggestion}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="premium-button-outline text-xs"
                    onClick={() => {
                      if (!plans.includes(suggestion)) {
                        setPlans([...plans, suggestion]);
                      }
                    }}
                  >
                    Add
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="motivation">
          <Card className="glass-card p-4 mb-4 border-amber-200/50 hover-glow">
            <h3 className="text-lg font-semibold mb-3 text-amber-700 flex items-center gap-2">
              <Sparkles className="text-amber-500 animate-glow" />
              Divine Motivation
            </h3>

            {!showMotivation ? (
              <div className="space-y-4">
                <p className="text-sm">
                  Are you facing any spiritual challenges or problems? Share them below for divine guidance and motivation.
                </p>

                <form onSubmit={handleProblemSubmit} className="space-y-3">
                  <Input
                    placeholder="Describe your spiritual challenge..."
                    value={problem}
                    onChange={e => setProblem(e.target.value)}
                    className="border-amber-200/50"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Seek Guidance
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50">
                  <p className="text-amber-800 dark:text-amber-200 italic">
                    "When you feel overwhelmed by life's challenges, remember that Lord Krishna is always with you. Just as he guided Arjuna through his darkest moments on the battlefield, he will guide you through yours."
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-amber-700">Divine Wisdom:</h4>
                  <p className="text-sm">
                    The Bhagavad Gita teaches us that challenges are opportunities for spiritual growth. Your current struggle is not a punishment but a chance to deepen your faith and connection with the divine.
                  </p>
                  <p className="text-sm mt-2">
                    Practice detachment (vairagya) from the outcomes while performing your duties with devotion. Remember Krishna's words: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-amber-300"
                  onClick={() => {
                    setShowMotivation(false);
                    setProblem("");
                  }}
                >
                  Ask Another Question
                </Button>
              </div>
            )}
          </Card>

          <Card className="glass-card p-4 border-amber-200/50 hover-glow">
            <h3 className="text-lg font-semibold mb-3 text-amber-700">Sloka of the Day</h3>

            <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results, and never be attached to not doing your duty."
              </p>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-2 italic">
                — Bhagavad Gita, Chapter 2, Verse 47
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="slokas" className="animate-fade-in">
          <SlokaFinder />
        </TabsContent>
      </Tabs>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Divine Motivation */}
      <motion.div
        className="glass-card p-6 border border-amber-200/50 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-amber-700 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500 animate-glow" />
            Divine Motivation
          </h3>
        </div>

        {!showMotivation ? (
          <div className="space-y-4">
            <p className="text-sm">
              Are you facing any spiritual challenges or problems? Share them below for divine guidance and motivation.
            </p>

            <form onSubmit={handleProblemSubmit} className="space-y-3">
              <Input
                placeholder="Describe your spiritual challenge..."
                value={problem}
                onChange={e => setProblem(e.target.value)}
                className="border-amber-200/50"
              />
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              >
                Seek Guidance
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50">
              <p className="text-amber-800 dark:text-amber-200 italic">
                "When you feel overwhelmed by life's challenges, remember that Lord Krishna is always with you. Just as he guided Arjuna through his darkest moments on the battlefield, he will guide you through yours."
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-amber-700">Divine Wisdom:</h4>
              <p className="text-sm">
                The Bhagavad Gita teaches us that challenges are opportunities for spiritual growth. Your current struggle is not a punishment but a chance to deepen your faith and connection with the divine.
              </p>
              <p className="text-sm mt-2">
                Practice detachment (vairagya) from the outcomes while performing your duties with devotion. Remember Krishna's words: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full border-amber-300"
              onClick={() => {
                setShowMotivation(false);
                setProblem("");
              }}
            >
              Ask Another Question
            </Button>
          </div>
        )}
      </motion.div>

      {/* Wisdom Resources */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={18} className="text-primary" />
            Wisdom Resources
          </h2>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-left">
            <BookOpen size={16} className="mr-2 text-blue-500" />
            <div>
              <p className="font-medium">Bhagavad Gita</p>
              <p className="text-xs text-muted-foreground">Explore the sacred text</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left">
            <Feather size={16} className="mr-2 text-purple-500" />
            <div>
              <p className="font-medium">Meditation Guides</p>
              <p className="text-xs text-muted-foreground">Learn meditation techniques</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start text-left">
            <Heart size={16} className="mr-2 text-red-500" />
            <div>
              <p className="font-medium">Devotional Practices</p>
              <p className="text-xs text-muted-foreground">Deepen your spiritual connection</p>
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
            onClick={() => setActiveTab("habits")}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="font-medium">Spiritual Habits</span>
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
        <h1 className="text-2xl font-bold premium-title">Spiritual Habits</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      <Tabs defaultValue="habits" className="mb-4">
        <TabsList className="grid grid-cols-3 mb-4 bg-indigo-500/10">
          <TabsTrigger value="habits" onClick={() => setActiveTab("habits")} className="data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white">Habits</TabsTrigger>
          <TabsTrigger value="motivation" onClick={() => setActiveTab("motivation")} className="data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white">Motivation</TabsTrigger>
          <TabsTrigger value="wisdom" onClick={() => setActiveTab("wisdom")} className="data-[state=active]:bg-indigo-500/30 data-[state=active]:text-white">Wisdom</TabsTrigger>
        </TabsList>

        <TabsContent value="habits">
          <div className="bg-indigo-500/10 p-4 rounded-xl mb-4">
            <h2 className="text-lg font-semibold mb-4 text-white">My Spiritual Habits</h2>
            <form onSubmit={addPlan} className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new spiritual habit..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 premium-input"
              />
              <Button type="submit" className="premium-button">
                <PlusCircle size={16} className="mr-1" />
                Add
              </Button>
            </form>

            {plans.length > 0 ? (
              <div className="space-y-3">
                {plans.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 bg-indigo-500/20 rounded-lg flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                        {idx + 1}
                      </div>
                      <span className="text-white/90">{plan}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="premium-button-outline text-xs"
                      onClick={() => setPlans(plans.filter((_, i) => i !== idx))}
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/70 my-4">No spiritual habits added yet. Add your first one above!</p>
            )}
          </div>

          <div className="bg-indigo-500/10 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-white">Suggested Spiritual Habits</h2>
            <div className="space-y-3">
              {[
                "Morning meditation for 10 minutes",
                "Read spiritual texts for 15 minutes daily",
                "Practice gratitude by listing 3 things you're thankful for",
                "Spend time in nature and reflect",
                "Journal about your spiritual insights",
                "Practice mindfulness during daily activities",
                "Engage in prayer or contemplation"
              ].map((suggestion, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 bg-indigo-500/20 rounded-lg flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                      <Sparkles size={12} />
                    </div>
                    <span className="text-white/90">{suggestion}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="premium-button-outline text-xs"
                    onClick={() => {
                      if (!plans.includes(suggestion)) {
                        setPlans([...plans, suggestion]);
                      }
                    }}
                  >
                    Add
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="motivation">
          <Card className="glass-card p-4 mb-4 border-amber-200/50 hover-glow">
            <h3 className="text-lg font-semibold mb-3 text-amber-700 flex items-center gap-2">
              <Sparkles className="text-amber-500 animate-glow" />
              Divine Motivation
            </h3>

            {!showMotivation ? (
              <div className="space-y-4">
                <p className="text-sm">
                  Are you facing any spiritual challenges or problems? Share them below for divine guidance and motivation.
                </p>

                <form onSubmit={handleProblemSubmit} className="space-y-3">
                  <Input
                    placeholder="Describe your spiritual challenge..."
                    value={problem}
                    onChange={e => setProblem(e.target.value)}
                    className="border-amber-200/50"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Seek Guidance
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50">
                  <p className="text-amber-800 dark:text-amber-200 italic">
                    "When you feel overwhelmed by life's challenges, remember that Lord Krishna is always with you. Just as he guided Arjuna through his darkest moments on the battlefield, he will guide you through yours."
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-amber-700">Divine Wisdom:</h4>
                  <p className="text-sm">
                    The Bhagavad Gita teaches us that challenges are opportunities for spiritual growth. Your current struggle is not a punishment but a chance to deepen your faith and connection with the divine.
                  </p>
                  <p className="text-sm mt-2">
                    Practice detachment (vairagya) from the outcomes while performing your duties with devotion. Remember Krishna's words: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-amber-300"
                  onClick={() => {
                    setShowMotivation(false);
                    setProblem("");
                  }}
                >
                  Ask Another Question
                </Button>
              </div>
            )}
          </Card>

          <Card className="glass-card p-4 border-amber-200/50 hover-glow">
            <h3 className="text-lg font-semibold mb-3 text-amber-700">Sloka of the Day</h3>

            <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results, and never be attached to not doing your duty."
              </p>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-2 italic">
                — Bhagavad Gita, Chapter 2, Verse 47
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="wisdom" className="animate-fade-in">
          <SlokaFinder />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Spiritual Habits"
      pageIcon={<Sparkles size={20} className="text-white" />}
      pageDescription="Cultivate spiritual practices and find divine wisdom"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
