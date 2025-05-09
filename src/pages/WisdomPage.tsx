import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Quote, Sparkles, Heart, Share2, Bookmark, BookMarked, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

// Sample wisdom quotes
const wisdomQuotes = [
  {
    id: 1,
    text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    source: "Bhagavad Gita, Chapter 2, Verse 47",
    category: "karma"
  },
  {
    id: 2,
    text: "The mind is restless and difficult to restrain, but it is subdued by practice.",
    source: "Bhagavad Gita, Chapter 6, Verse 35",
    category: "mind"
  },
  {
    id: 3,
    text: "Whatever action is performed by a great man, common men follow in his footsteps, and whatever standards he sets by exemplary acts, all the world pursues.",
    source: "Bhagavad Gita, Chapter 3, Verse 21",
    category: "leadership"
  },
  {
    id: 4,
    text: "For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind will remain the greatest enemy.",
    source: "Bhagavad Gita, Chapter 6, Verse 6",
    category: "mind"
  },
  {
    id: 5,
    text: "The wise see that there is action in the midst of inaction and inaction in the midst of action.",
    source: "Bhagavad Gita, Chapter 4, Verse 18",
    category: "karma"
  },
  {
    id: 6,
    text: "The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind.",
    source: "Bhagavad Gita, Chapter 2, Verse 23",
    category: "soul"
  },
  {
    id: 7,
    text: "There is neither this world, nor the world beyond, nor happiness for the one who doubts.",
    source: "Bhagavad Gita, Chapter 4, Verse 40",
    category: "faith"
  },
  {
    id: 8,
    text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    source: "Bhagavad Gita, Chapter 6, Verse 19",
    category: "meditation"
  }
];

// Sample wisdom teachings
const wisdomTeachings = [
  {
    id: 1,
    title: "The Four Noble Truths",
    content: "The Four Noble Truths comprise the essence of Buddha's teachings. They are the truth of suffering, the truth of the cause of suffering, the truth of the end of suffering, and the truth of the path that leads to the end of suffering.",
    category: "buddhism"
  },
  {
    id: 2,
    title: "The Eightfold Path",
    content: "The Noble Eightfold Path is the path to the end of suffering. It consists of right view, right intention, right speech, right action, right livelihood, right effort, right mindfulness, and right concentration.",
    category: "buddhism"
  },
  {
    id: 3,
    title: "Karma Yoga",
    content: "Karma Yoga is the path of selfless action. It teaches that one should act without attachment to the fruits of one's actions, dedicating the results to the Divine.",
    category: "hinduism"
  },
  {
    id: 4,
    title: "Bhakti Yoga",
    content: "Bhakti Yoga is the path of devotion. It involves surrendering oneself to the Divine through acts of worship, prayer, and devotion.",
    category: "hinduism"
  },
  {
    id: 5,
    title: "Jnana Yoga",
    content: "Jnana Yoga is the path of knowledge. It involves the pursuit of spiritual wisdom through study, reflection, and meditation on the nature of existence.",
    category: "hinduism"
  }
];

export default function WisdomPage() {
  const navigate = useNavigate();
  const { settings } = useAppContext();
  const [activeTab, setActiveTab] = useState("quotes");
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);

  // Load saved items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wisdom_saved_items");
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  // Save items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("wisdom_saved_items", JSON.stringify(savedItems));
  }, [savedItems]);

  // Toggle save status of an item
  const toggleSave = (id: number) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(itemId => itemId !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  // Get next quote
  const getNextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % wisdomQuotes.length);
  };

  // Get previous quote
  const getPrevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + wisdomQuotes.length) % wisdomQuotes.length);
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
      {/* Categories */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter size={18} className="text-primary" />
            Categories
          </h2>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            Karma
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            Mind
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Leadership
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            Soul
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            Faith
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            Meditation
          </Button>
        </div>
      </Card>

      {/* Saved Items */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookMarked size={18} className="text-primary" />
            Saved Wisdom
          </h2>
          <span className="text-xs text-muted-foreground">{savedItems.length} items</span>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {savedItems.length > 0 ? (
            savedItems.map(id => {
              const quote = wisdomQuotes.find(q => q.id === id);
              const teaching = wisdomTeachings.find(t => t.id === id);

              if (quote) {
                return (
                  <div key={id} className="p-3 bg-indigo-500/10 rounded-lg">
                    <p className="text-sm italic">{quote.text.length > 100 ? quote.text.substring(0, 100) + '...' : quote.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">— {quote.source}</p>
                  </div>
                );
              }

              if (teaching) {
                return (
                  <div key={id} className="p-3 bg-indigo-500/10 rounded-lg">
                    <p className="text-sm font-medium">{teaching.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{teaching.content.substring(0, 100)}...</p>
                  </div>
                );
              }

              return null;
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">No saved items yet</p>
          )}
        </div>
      </Card>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      {/* Daily Wisdom Card */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-pink-500/40 flex items-center justify-center">
            <Sparkles size={24} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Daily Wisdom</h2>
            <p className="text-xs text-muted-foreground">
              Insights for spiritual growth
            </p>
          </div>
        </div>

        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex items-start mb-2">
            <Quote size={18} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
            <p className="text-base italic">{wisdomQuotes[currentQuote].text}</p>
          </div>
          <p className="text-sm text-right text-muted-foreground mt-2">— {wisdomQuotes[currentQuote].source}</p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => toggleSave(wisdomQuotes[currentQuote].id)}
              >
                {savedItems.includes(wisdomQuotes[currentQuote].id) ? (
                  <BookMarked size={16} className="text-amber-500" />
                ) : (
                  <Bookmark size={16} />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Share2 size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Heart size={16} />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={getPrevQuote}
              >
                Previous
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600"
                onClick={getNextQuote}
              >
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Search */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Search size={18} className="text-primary" />
            Search Wisdom
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for wisdom..."
              className="w-full p-2 rounded-md bg-background border border-input"
            />
            <Button>
              <Search size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">karma</Button>
            <Button variant="outline" size="sm">meditation</Button>
            <Button variant="outline" size="sm">peace</Button>
            <Button variant="outline" size="sm">dharma</Button>
          </div>
        </div>
      </Card>

      {/* Wisdom Library */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/40 flex items-center justify-center">
            <BookOpen size={20} className="text-purple-500" />
          </div>
          <h2 className="text-lg font-semibold">Wisdom Library</h2>
        </div>

        <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {wisdomQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start">
                  <Quote size={16} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">{quote.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">— {quote.source}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => toggleSave(quote.id)}
                  >
                    {savedItems.includes(quote.id) ? (
                      <BookMarked size={14} className="text-amber-500" />
                    ) : (
                      <Bookmark size={14} />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="teachings" className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {wisdomTeachings.map((teaching) => (
              <motion.div
                key={teaching.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <h3 className="text-base font-medium mb-1">{teaching.title}</h3>
                <p className="text-sm text-muted-foreground">{teaching.content}</p>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => toggleSave(teaching.id)}
                  >
                    {savedItems.includes(teaching.id) ? (
                      <BookMarked size={14} className="text-amber-500" />
                    ) : (
                      <Bookmark size={14} />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
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
          Divine Wisdom
        </h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Daily Wisdom Card */}
      <Card className="glass-card p-4 mb-6 rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500/20 to-pink-500/40 flex items-center justify-center">
            <Sparkles size={24} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Daily Wisdom</h2>
            <p className="text-xs text-muted-foreground">
              Insights for spiritual growth
            </p>
          </div>
        </div>

        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex items-start mb-2">
            <Quote size={18} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
            <p className="text-base italic">{wisdomQuotes[currentQuote].text}</p>
          </div>
          <p className="text-sm text-right text-muted-foreground mt-2">— {wisdomQuotes[currentQuote].source}</p>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => toggleSave(wisdomQuotes[currentQuote].id)}
              >
                {savedItems.includes(wisdomQuotes[currentQuote].id) ? (
                  <BookMarked size={16} className="text-amber-500" />
                ) : (
                  <Bookmark size={16} />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Share2 size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Heart size={16} />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={getPrevQuote}
              >
                Previous
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600"
                onClick={getNextQuote}
              >
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>

      {/* Wisdom Library */}
      <Card className="glass-card p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/40 flex items-center justify-center">
            <BookOpen size={20} className="text-purple-500" />
          </div>
          <h2 className="text-lg font-semibold">Wisdom Library</h2>
        </div>

        <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-4">
            {wisdomQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start">
                  <Quote size={16} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">{quote.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">— {quote.source}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => toggleSave(quote.id)}
                  >
                    {savedItems.includes(quote.id) ? (
                      <BookMarked size={14} className="text-amber-500" />
                    ) : (
                      <Bookmark size={14} />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="teachings" className="space-y-4">
            {wisdomTeachings.map((teaching) => (
              <motion.div
                key={teaching.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <h3 className="text-base font-medium mb-1">{teaching.title}</h3>
                <p className="text-sm text-muted-foreground">{teaching.content}</p>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => toggleSave(teaching.id)}
                  >
                    {savedItems.includes(teaching.id) ? (
                      <BookMarked size={14} className="text-amber-500" />
                    ) : (
                      <Bookmark size={14} />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Divine Wisdom"
      pageIcon={<Sparkles size={20} className="text-white" />}
      pageDescription="Explore spiritual wisdom and teachings"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
