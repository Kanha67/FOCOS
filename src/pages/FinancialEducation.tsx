import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, GraduationCap, TrendingUp, DollarSign, PiggyBank, LineChart, Building, Briefcase, CheckCircle2, LockKeyhole, Filter, Search, BookMarked } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import DesktopLayout from "@/components/DesktopLayout";

// Sample courses data
const courses = [
  {
    id: 1,
    title: "Personal Finance Basics",
    description: "Learn the fundamentals of managing your personal finances, budgeting, and saving.",
    level: "Beginner",
    duration: "4 weeks",
    modules: 8,
    progress: 75,
    category: "personal",
    icon: <PiggyBank size={20} className="text-green-500" />,
    locked: false
  },
  {
    id: 2,
    title: "Introduction to Investing",
    description: "Understand the basics of investing, different investment vehicles, and strategies.",
    level: "Beginner",
    duration: "6 weeks",
    modules: 12,
    progress: 50,
    category: "investing",
    icon: <TrendingUp size={20} className="text-blue-500" />,
    locked: false
  },
  {
    id: 3,
    title: "Advanced Stock Market Analysis",
    description: "Learn technical and fundamental analysis techniques for stock market investing.",
    level: "Advanced",
    duration: "8 weeks",
    modules: 16,
    progress: 25,
    category: "investing",
    icon: <LineChart size={20} className="text-purple-500" />,
    locked: false
  },
  {
    id: 4,
    title: "Retirement Planning",
    description: "Develop a comprehensive retirement plan and understand retirement accounts.",
    level: "Intermediate",
    duration: "5 weeks",
    modules: 10,
    progress: 0,
    category: "personal",
    icon: <Building size={20} className="text-amber-500" />,
    locked: true
  },
  {
    id: 5,
    title: "Tax Optimization Strategies",
    description: "Learn legal strategies to minimize your tax burden and maximize your returns.",
    level: "Advanced",
    duration: "6 weeks",
    modules: 12,
    progress: 0,
    category: "personal",
    icon: <DollarSign size={20} className="text-green-500" />,
    locked: true
  },
  {
    id: 6,
    title: "Real Estate Investing",
    description: "Understand real estate as an investment vehicle, from residential to commercial properties.",
    level: "Intermediate",
    duration: "7 weeks",
    modules: 14,
    progress: 10,
    category: "investing",
    icon: <Building size={20} className="text-blue-500" />,
    locked: false
  },
  {
    id: 7,
    title: "Entrepreneurship & Business Finance",
    description: "Learn financial management for small businesses and startups.",
    level: "Intermediate",
    duration: "8 weeks",
    modules: 16,
    progress: 0,
    category: "business",
    icon: <Briefcase size={20} className="text-purple-500" />,
    locked: true
  }
];

// Sample articles data
const articles = [
  {
    id: 1,
    title: "The 50/30/20 Budgeting Rule Explained",
    description: "Learn how to allocate your income using the popular 50/30/20 budgeting method.",
    readTime: "5 min",
    category: "personal",
    date: "2 days ago"
  },
  {
    id: 2,
    title: "Understanding Market Volatility",
    description: "What causes market volatility and how to navigate turbulent market conditions.",
    readTime: "8 min",
    category: "investing",
    date: "1 week ago"
  },
  {
    id: 3,
    title: "Emergency Funds: How Much Do You Need?",
    description: "Guidelines for building an emergency fund based on your personal situation.",
    readTime: "6 min",
    category: "personal",
    date: "3 days ago"
  },
  {
    id: 4,
    title: "Dividend Investing for Passive Income",
    description: "How to build a portfolio of dividend-paying stocks for regular income.",
    readTime: "10 min",
    category: "investing",
    date: "2 weeks ago"
  },
  {
    id: 5,
    title: "Debt Snowball vs. Debt Avalanche",
    description: "Comparing two popular debt repayment strategies to find what works for you.",
    readTime: "7 min",
    category: "personal",
    date: "5 days ago"
  }
];

export default function FinancialEducation() {
  const navigate = useNavigate();
  const { settings } = useAppContext();
  const [activeTab, setActiveTab] = useState("courses");
  const [courseFilter, setCourseFilter] = useState("all");
  const [articleFilter, setArticleFilter] = useState("all");

  // Filter courses based on selected category
  const filteredCourses = courseFilter === "all"
    ? courses
    : courses.filter(course => course.category === courseFilter);

  // Filter articles based on selected category
  const filteredArticles = articleFilter === "all"
    ? articles
    : articles.filter(article => article.category === articleFilter);

  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-700 dark:text-green-300";
      case "Intermediate":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-300";
      case "Advanced":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-300";
    }
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
      {/* Course Categories */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter size={18} className="text-primary" />
            Categories
          </h2>
        </div>

        <div className="space-y-2">
          <Button
            variant={courseFilter === "all" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setCourseFilter("all")}
          >
            <BookOpen size={16} className="mr-2 text-primary" />
            All Courses
          </Button>

          <Button
            variant={courseFilter === "personal" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setCourseFilter("personal")}
          >
            <PiggyBank size={16} className="mr-2 text-green-500" />
            Personal Finance
          </Button>

          <Button
            variant={courseFilter === "investing" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setCourseFilter("investing")}
          >
            <TrendingUp size={16} className="mr-2 text-blue-500" />
            Investing
          </Button>

          <Button
            variant={courseFilter === "business" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setCourseFilter("business")}
          >
            <Briefcase size={16} className="mr-2 text-purple-500" />
            Business Finance
          </Button>
        </div>
      </Card>

      {/* Your Progress */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 size={18} className="text-primary" />
            Your Progress
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Courses Completed</span>
            <span className="font-medium">3/7</span>
          </div>
          <Progress value={42} className="h-2" />

          <div className="flex items-center justify-between">
            <span className="text-sm">Articles Read</span>
            <span className="font-medium">10/15</span>
          </div>
          <Progress value={66} className="h-2" />

          <div className="flex items-center justify-between">
            <span className="text-sm">Total Learning Time</span>
            <span className="font-medium">12h 30m</span>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-green-500" />
              <div>
                <p className="font-medium">Next Achievement</p>
                <p className="text-xs text-muted-foreground">Complete 5 courses</p>
              </div>
            </div>
            <Progress value={60} className="h-2 mt-2" />
          </div>
        </div>
      </Card>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      {/* Featured Course Card */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/40 flex items-center justify-center">
            <GraduationCap size={24} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Featured Course</h2>
            <p className="text-xs text-muted-foreground">
              Continue your financial education
            </p>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-card/50 mb-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-base font-medium">Introduction to Investing</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Understand the basics of investing, different investment vehicles, and strategies.
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getLevelColor("Beginner")}>
                    Beginner
                  </Badge>
                  <span className="text-xs text-muted-foreground">6 weeks</span>
                </div>
                <span className="text-xs font-medium">6/12 modules</span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium">50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              Continue Learning
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs">3 courses completed</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} className="text-muted-foreground" />
            <span className="text-xs">10 articles read</span>
          </div>
        </div>
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
            Search Resources
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for courses or articles..."
              className="w-full p-2 rounded-md bg-background border border-input"
            />
            <Button>
              <Search size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">investing</Button>
            <Button variant="outline" size="sm">budget</Button>
            <Button variant="outline" size="sm">retirement</Button>
            <Button variant="outline" size="sm">stocks</Button>
          </div>
        </div>
      </Card>

      {/* Learning Library */}
      <Card className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/40 flex items-center justify-center">
            <BookMarked size={20} className="text-purple-500" />
          </div>
          <h2 className="text-lg font-semibold">Recommended</h2>
        </div>

        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {courses.slice(0, 3).map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 border rounded-lg hover:bg-card/50 transition-colors relative ${
                  course.locked ? "opacity-70" : ""
                }`}
              >
                {course.locked && (
                  <div className="absolute top-2 right-2">
                    <LockKeyhole size={16} className="text-muted-foreground" />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center flex-shrink-0">
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="articles" className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {articles.slice(0, 3).map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <h4 className="text-sm font-medium">{article.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category === "personal" ? "Personal Finance" : "Investing"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{article.readTime} read</span>
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
          Financial Education
        </h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      {/* Featured Course Card */}
      <Card className="glass-card p-4 mb-6 rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/40 flex items-center justify-center">
            <GraduationCap size={24} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Featured Course</h2>
            <p className="text-xs text-muted-foreground">
              Continue your financial education
            </p>
          </div>
        </div>

        <div className="p-3 border rounded-lg bg-card/50 mb-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-base font-medium">Introduction to Investing</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Understand the basics of investing, different investment vehicles, and strategies.
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getLevelColor("Beginner")}>
                    Beginner
                  </Badge>
                  <span className="text-xs text-muted-foreground">6 weeks</span>
                </div>
                <span className="text-xs font-medium">6/12 modules</span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium">50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              Continue Learning
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs">3 courses completed</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} className="text-muted-foreground" />
            <span className="text-xs">10 articles read</span>
          </div>
        </div>
      </Card>

      {/* Learning Library */}
      <Card className="glass-card p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/40 flex items-center justify-center">
            <BookOpen size={20} className="text-purple-500" />
          </div>
          <h2 className="text-lg font-semibold">Learning Library</h2>
        </div>

        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">All Courses</h3>
              <div className="flex gap-1">
                <Button
                  variant={courseFilter === "all" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setCourseFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={courseFilter === "personal" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setCourseFilter("personal")}
                >
                  Personal
                </Button>
                <Button
                  variant={courseFilter === "investing" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setCourseFilter("investing")}
                >
                  Investing
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 border rounded-lg hover:bg-card/50 transition-colors relative ${
                    course.locked ? "opacity-70" : ""
                  }`}
                >
                  {course.locked && (
                    <div className="absolute top-2 right-2">
                      <LockKeyhole size={16} className="text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center flex-shrink-0">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{course.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getLevelColor(course.level)}>
                            {course.level}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                        </div>
                      </div>

                      {course.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Financial Articles</h3>
              <div className="flex gap-1">
                <Button
                  variant={articleFilter === "all" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setArticleFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={articleFilter === "personal" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setArticleFilter("personal")}
                >
                  Personal
                </Button>
                <Button
                  variant={articleFilter === "investing" ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setArticleFilter("investing")}
                >
                  Investing
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 border rounded-lg hover:bg-card/50 transition-colors"
                >
                  <h4 className="text-sm font-medium">{article.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category === "personal" ? "Personal Finance" : "Investing"}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{article.readTime} read</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Financial Education"
      pageIcon={<BookOpen size={20} className="text-white" />}
      pageDescription="Learn about personal finance and investing"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}
