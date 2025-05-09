import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import ThemeToggle from "@/components/ThemeToggle";
import { BookOpen, Heart, Search, Sparkles, BookMarked, Menu } from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";

// Auto translate component
const AutoTranslateSanskrit = ({ text }: { text: string }) => {
  return (
    <div className="text-sm text-white/70">
      <span className="text-blue-400">Auto-Translation:</span> {text}
    </div>
  );
};

const gitaChapters = [
  {
    number: 1,
    name: "Arjuna Vishada Yoga",
    englishTitle: "Arjuna's Dilemma",
    summary: `Arjuna is overcome with sorrow and confusion on the battlefield of Kurukshetra, seeing his relatives and friends on both sides. He questions the morality of war and is paralyzed by doubt. This chapter sets the stage for the teachings of Krishna, who prepares to guide Arjuna out of his despair.`
  },
  {
    number: 2,
    name: "Sankhya Yoga",
    englishTitle: "Transcendental Knowledge",
    summary: `Krishna begins his teachings, explaining the immortality of the soul, the importance of duty (dharma), and the path of selfless action (karma yoga). He urges Arjuna to rise above grief and confusion, and introduces the core philosophy of the Gita.`
  },
  {
    number: 3,
    name: "Karma Yoga",
    englishTitle: "Path of Selfless Service",
    summary: `Krishna emphasizes selfless action—performing one’s duty without attachment to results. He explains how karma yoga purifies the mind and leads to liberation, and why action is superior to inaction.`
  },
  {
    number: 4,
    name: "Jnana Karma Sanyasa Yoga",
    englishTitle: "Path of Knowledge and Renunciation of Action",
    summary: `Krishna reveals the wisdom of ancient sages, the secret of his divine incarnations, and the importance of knowledge combined with selfless action. He describes how right understanding and renunciation lead to freedom from bondage.`
  },
  {
    number: 5,
    name: "Karma Sanyasa Yoga",
    englishTitle: "Path of Renunciation",
    summary: `Krishna compares the paths of renunciation and selfless action, showing both can lead to liberation if performed with detachment. He teaches that inner renunciation is more important than outward withdrawal from the world.`
  },
  {
    number: 6,
    name: "Dhyana Yoga",
    englishTitle: "Path of Meditation",
    summary: `Krishna teaches the discipline of meditation, describing how to control the mind and senses. He explains the qualities of a true yogi and the bliss found in union with the divine through steady meditation.`
  },
  {
    number: 7,
    name: "Jnana Vijnana Yoga",
    englishTitle: "Self-Knowledge and Enlightenment",
    summary: `Krishna reveals his supreme nature as the source of all creation. He explains the difference between material and spiritual knowledge, and encourages Arjuna to seek the highest wisdom and devotion.`
  },
  {
    number: 8,
    name: "Akshara Brahma Yoga",
    englishTitle: "The Imperishable Absolute",
    summary: `Krishna describes the eternal, unchanging reality (Brahman) and the process of dying with a focused mind. He explains how remembrance of the divine at the time of death leads to liberation.`
  },
  {
    number: 9,
    name: "Raja Vidya Raja Guhya Yoga",
    englishTitle: "Yoga of Royal Knowledge and Royal Secret",
    summary: `Krishna reveals the most confidential spiritual knowledge, describing his all-pervading presence and the power of devotion. He assures that anyone, regardless of background, can attain him through loving faith.`
  },
  {
    number: 10,
    name: "Vibhuti Yoga",
    englishTitle: "Yoga of Divine Glories",
    summary: `Krishna describes his divine manifestations in the world and encourages Arjuna to recognize the divine in all aspects of creation. This chapter inspires awe and devotion by showing the infinite forms of the divine.`
  },
  {
    number: 11,
    name: "Vishwarupa Darshana Yoga",
    englishTitle: "Yoga of the Vision of the Universal Form",
    summary: `Krishna grants Arjuna divine vision to witness his cosmic, universal form, revealing the vastness and power of the divine. Arjuna is awestruck and realizes the true nature of Krishna as the supreme being.`
  },
  {
    number: 12,
    name: "Bhakti Yoga",
    englishTitle: "The Path of Devotion",
    summary: `Krishna explains the nature and power of devotion (bhakti), describing the qualities of true devotees and the simplicity of the path of loving surrender. Bhakti yoga is presented as the most accessible and fulfilling path to the divine.`
  },
  {
    number: 13,
    name: "Kshetra Kshetragna Vibhaga Yoga",
    englishTitle: "Yoga of Distinction Between the Field and the Knower of the Field",
    summary: `Krishna discusses the difference between the physical body (field) and the soul (knower of the field), and the importance of self-knowledge. He explains the qualities that lead to wisdom and liberation.`
  },
  {
    number: 14,
    name: "Gunatraya Vibhaga Yoga",
    englishTitle: "Yoga of the Division of the Three Gunas",
    summary: `Krishna explains the three fundamental qualities (gunas) of nature—sattva (goodness), rajas (passion), and tamas (ignorance)—and how they influence behavior and spiritual evolution. He teaches how to transcend these gunas to attain freedom.`
  },
  {
    number: 15,
    name: "Purushottama Yoga",
    englishTitle: "Yoga of the Supreme Divine Personality",
    summary: `Krishna describes the supreme self (Purushottama) beyond both the perishable world and the imperishable soul. He explains the eternal relationship between the individual soul and the supreme divine.`
  },
  {
    number: 16,
    name: "Daivasura Sampad Vibhaga Yoga",
    englishTitle: "Yoga of the Division Between the Divine and the Demonic",
    summary: `Krishna distinguishes between divine and demonic qualities, encouraging cultivation of virtues like fearlessness, compassion, and truthfulness, and warning against negative tendencies that lead to bondage.`
  },
  {
    number: 17,
    name: "Shraddhatraya Vibhaga Yoga",
    englishTitle: "Yoga of the Threefold Faith",
    summary: `Krishna analyzes the three types of faith arising from the gunas—sattvic, rajasic, and tamasic—and how these influence worship, food, and behavior. He encourages faith that uplifts and purifies the soul.`
  },
  {
    number: 18,
    name: "Moksha Sanyasa Yoga",
    englishTitle: "Yoga of Liberation by Renunciation",
    summary: `In the final chapter, Krishna summarizes all paths—action, knowledge, and devotion—and urges Arjuna to surrender completely to the divine will. Liberation (moksha) is achieved through selfless action, wisdom, and loving surrender.`
  }
];

async function translateSanskritToEnglish(text: string): Promise<string> {
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: "sa", target: "en", format: "text" })
    });
    const data = await res.json();
    return data.translatedText || "Translation unavailable.";
  } catch {
    return "Translation unavailable.";
  }
}

export default function Gita() {
  const { settings, updateSettings } = useAppContext();

  // Only show Gita content in Divine Mode
  if (!settings.divineMode) {
    return (
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
              onClick={() => {
                // Enable divine mode
                updateSettings({ divineMode: true });
              }}
            >
              <Sparkles size={16} className="text-blue-400" />
              <span className="font-medium">Enable Divine Mode</span>
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
          <h1 className="text-2xl font-bold premium-title">Bhagavad Gita</h1>
          <motion.div
            className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          className="premium-card p-5 border border-indigo-500/20 premium-glow-effect"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Divine Mode Required</h2>
            <span className="premium-badge">Premium</span>
          </div>
          <p className="text-white/70 mb-4">The Bhagavad Gita section is only available in Divine Mode. Enable Divine Mode to access the wisdom of Krishna.</p>
          <Button
            className="premium-button w-full py-2.5"
            onClick={() => {
              // Enable divine mode
              updateSettings({ divineMode: true });
            }}
          >
            Enable Divine Mode
          </Button>
        </motion.div>
      </div>
    );
  }

  // Sloka Finder State
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
  // Sloka of the day state
  const [slokaOfDay, setSlokaOfDay] = useState<any>(null);
  const [slokaOfDayTranslation, setSlokaOfDayTranslation] = useState<string>("");

  useEffect(() => {
    // Fetch sloka of the day using the API
    const fetchSlokaOfDay = async () => {
      try {
        // Use the date to generate a consistent chapter and verse for the day
        const today = new Date();
        const daySeed = today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();

        // Get chapters information to determine verse counts
        const chaptersResponse = await fetch('https://vedicscriptures.github.io/chapters');

        if (!chaptersResponse.ok) {
          throw new Error('Failed to fetch chapters information');
        }

        const chapters = await chaptersResponse.json();

        // Use the date seed to select a chapter (1-18)
        const chapterIndex = daySeed % chapters.length;
        const selectedChapter = chapters[chapterIndex];

        // Use the date seed to select a verse from that chapter
        const verseNumber = (daySeed % selectedChapter.verses_count) + 1;

        // Fetch the sloka
        const slokaResponse = await fetch(`https://vedicscriptures.github.io/slok/${selectedChapter.chapter_number}/${verseNumber}`);

        if (!slokaResponse.ok) {
          throw new Error('Failed to fetch sloka of the day');
        }

        const data = await slokaResponse.json();

        // Format the data for our component
        const formattedSloka = {
          ...data,
          chapter: selectedChapter.chapter_number,
          verse: verseNumber,
          slok: data.slok || "",
          eng: data.purohit?.et || data.siva?.et || data.adi?.et || data.gambir?.et || "Translation not available"
        };

        setSlokaOfDay(formattedSloka);
        setSlokaOfDayTranslation(formattedSloka.eng);
      } catch (err) {
        console.error("Error fetching sloka of the day:", err);

        // Fallback to local data if API fails
        const mockSlokas = [
          { chapter: 1, verse: 1, slok: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१-१||", eng: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?" },
          { chapter: 2, verse: 47, slok: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||२-४७||", eng: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction." },
          { chapter: 4, verse: 7, slok: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||४-७||", eng: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth." },
          { chapter: 9, verse: 22, slok: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते | तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||९-२२||", eng: "For those who worship Me exclusively with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have." },
          { chapter: 18, verse: 66, slok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||१८-६६||", eng: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear." }
        ];

        // Use the date to select a consistent sloka for the day
        const today = new Date();
        const daySeed = today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();
        const slokaIndex = daySeed % mockSlokas.length;
        const todaysSloka = mockSlokas[slokaIndex];

        setSlokaOfDay(todaysSloka);
        setSlokaOfDayTranslation(todaysSloka.eng);
      }
    };

    fetchSlokaOfDay();
  }, []);

  const fetchSloka = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    setSloka(null);

    try {
      // Use the Vedic Scriptures API to fetch the sloka
      const response = await fetch(`https://vedicscriptures.github.io/slok/${chapter}/${verse}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch sloka: ${response.status}`);
      }

      const data = await response.json();

      // Format the data for our component
      setSloka({
        ...data,
        chapter: chapter,
        verse: verse,
        eng: data.purohit?.et || data.siva?.et || data.adi?.et || data.gambir?.et || "Translation not available"
      });
    } catch (err: any) {
      console.error("Error fetching sloka:", err);
      setError("Could not fetch sloka. Please check chapter and verse number.");

      // Fallback to local data if API fails
      const mockSlokas = [
        { chapter: 1, verse: 1, slok: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१-१||", eng: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?" },
        { chapter: 2, verse: 47, slok: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||२-४७||", eng: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction." },
        { chapter: 4, verse: 7, slok: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||४-७||", eng: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth." },
        { chapter: 9, verse: 22, slok: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते | तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||९-२२||", eng: "For those who worship Me exclusively with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have." },
        { chapter: 18, verse: 66, slok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||१८-६६||", eng: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear." }
      ];

      // Try to find a matching sloka in our local data as fallback
      const foundSloka = mockSlokas.find(s => s.chapter === chapter && s.verse === verse);

      if (foundSloka) {
        setSloka(foundSloka);
        setError(""); // Clear error if we found a local fallback
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomSloka = async () => {
    setRandomLoading(true);
    setRandomError("");
    setSloka(null);

    try {
      // First, fetch the chapter information to get verse counts
      const chaptersResponse = await fetch('https://vedicscriptures.github.io/chapters');

      if (!chaptersResponse.ok) {
        throw new Error('Failed to fetch chapters information');
      }

      const chapters = await chaptersResponse.json();

      // Select a random chapter (1-18)
      const randomChapterIndex = Math.floor(Math.random() * chapters.length);
      const randomChapter = chapters[randomChapterIndex];

      // Select a random verse from that chapter
      const randomVerse = Math.floor(Math.random() * randomChapter.verses_count) + 1;

      // Set the chapter and verse
      setChapter(randomChapter.chapter_number);
      setVerse(randomVerse);

      // Fetch the sloka
      const slokaResponse = await fetch(`https://vedicscriptures.github.io/slok/${randomChapter.chapter_number}/${randomVerse}`);

      if (!slokaResponse.ok) {
        throw new Error('Failed to fetch random sloka');
      }

      const data = await slokaResponse.json();

      // Format the data for our component
      setSloka({
        ...data,
        chapter: randomChapter.chapter_number,
        verse: randomVerse,
        eng: data.purohit?.et || data.siva?.et || data.adi?.et || data.gambir?.et || "Translation not available"
      });
    } catch (err) {
      console.error("Error fetching random sloka:", err);
      setRandomError("Could not fetch random sloka. Using fallback data.");

      // Fallback to local data
      const mockSlokas = [
        { chapter: 1, verse: 1, slok: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१-१||", eng: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?" },
        { chapter: 2, verse: 47, slok: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||२-४७||", eng: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction." },
        { chapter: 4, verse: 7, slok: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||४-७||", eng: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth." },
        { chapter: 9, verse: 22, slok: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते | तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||९-२२||", eng: "For those who worship Me exclusively with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have." },
        { chapter: 18, verse: 66, slok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||१८-६६||", eng: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear." }
      ];

      // Select a random sloka from our predefined list
      const randomIndex = Math.floor(Math.random() * mockSlokas.length);
      const randomSloka = mockSlokas[randomIndex];

      setChapter(randomSloka.chapter);
      setVerse(randomSloka.verse);
      setSloka(randomSloka);
      setRandomError(""); // Clear error if we found a local fallback
    } finally {
      setRandomLoading(false);
    }
  };

  const addFavorite = () => {
    if (!sloka) return;
    const fav = {chapter, verse, sloka};
    const exists = favorites.some(f => f.chapter === chapter && f.verse === verse);
    if (!exists) {
      const updated = [fav, ...favorites];
      setFavorites(updated);
      localStorage.setItem('gita_favorites', JSON.stringify(updated));
    }
  };

  const removeFavorite = (c:number, v:number) => {
    const updated = favorites.filter(f => !(f.chapter === c && f.verse === v));
    setFavorites(updated);
    localStorage.setItem('gita_favorites', JSON.stringify(updated));
  };

  function AutoTranslateSanskrit({ text }: { text: string }) {
    const [translation, setTranslation] = useState<string>("Translating...");
    useEffect(() => {
      let mounted = true;
      translateSanskritToEnglish(text).then(result => { if (mounted) setTranslation(result); });
      return () => { mounted = false; };
    }, [text]);
    return <span className="italic text-gray-400">{translation}</span>;
  }

  // Header actions for desktop layout
  const headerActions = (
    <>
      <Button
        variant="outline"
        className="premium-button-outline flex items-center gap-2 text-sm premium-scale"
        onClick={fetchRandomSloka}
      >
        <Search size={16} className="text-blue-400" />
        <span className="font-medium">Random Verse</span>
      </Button>
      <ThemeToggle />
    </>
  );

  // Left column content for desktop layout
  const leftColumnContent = (
    <>
      {/* Chapter Navigation */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Menu size={18} className="text-primary" />
            Chapter Navigation
          </h2>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          {gitaChapters.map((chapter) => (
            <Button
              key={chapter.number}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => {
                setChapter(chapter.number);
                setVerse(1);
                fetchSloka();
              }}
            >
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium mr-2">
                {chapter.number}
              </div>
              <div>
                <p className="font-medium">{chapter.name}</p>
                <p className="text-xs text-muted-foreground">{chapter.englishTitle}</p>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
    </>
  );

  // Middle column content for desktop layout
  const middleColumnContent = (
    <>
      {/* Sloka Finder */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-blue-400" />
            <h2 className="text-lg font-semibold">Sloka Finder</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs text-blue-400 mb-1 block">Chapter</label>
            <Input
              type="number"
              min="1"
              max="18"
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
              className="premium-input"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-blue-400 mb-1 block">Verse</label>
            <Input
              type="number"
              min="1"
              value={verse}
              onChange={(e) => setVerse(parseInt(e.target.value) || 1)}
              className="premium-input"
            />
          </div>
          <div className="flex items-end">
            <Button
              className="premium-button h-10"
              onClick={fetchSloka}
              disabled={loading}
            >
              {loading ? "Loading..." : "Find"}
            </Button>
          </div>
        </div>

        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
      </motion.div>

      {/* Sloka Result */}
      {sloka && (
        <motion.div
          className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-lg font-semibold">Chapter {chapter}, Verse {verse}</div>
              <div className="text-xs text-blue-400">{gitaChapters[chapter-1]?.name || ""}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="premium-button-outline flex items-center gap-1"
              onClick={addFavorite}
            >
              <Heart size={14} className="text-blue-400" />
              <span>Save</span>
            </Button>
          </div>

          <div className="bg-indigo-500/10 p-4 rounded-xl mb-4">
            <p className="font-medium whitespace-pre-line">{sloka.slok || "No sloka found."}</p>
          </div>
          <div className="space-y-2">
            {sloka.eng && <p className="text-sm text-muted-foreground"><span className="text-blue-400">English:</span> {sloka.eng}</p>}
            {sloka.hindi && <p className="text-sm text-muted-foreground"><span className="text-blue-400">Hindi:</span> {sloka.hindi}</p>}
            {!sloka.eng && !sloka.hindi && <AutoTranslateSanskrit text={sloka.slok} />}
          </div>
        </motion.div>
      )}

      {/* Sloka of the Day Section - Hide in Devotional mode */}
      {!settings.devotionalMode && !sloka && (
        <motion.div
          className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sloka of the Day</h2>
            <span className="premium-badge">Premium</span>
          </div>

          {slokaOfDay ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                  <BookOpen size={16} className="text-blue-400" />
                </div>
                <div className="font-medium">Sloka {slokaOfDay.chapter}:{slokaOfDay.verse}</div>
              </div>

              <div className="bg-indigo-500/10 p-4 rounded-xl">
                <p className="font-medium whitespace-pre-line">{slokaOfDay.slok}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground"><span className="text-blue-400">English:</span> {slokaOfDayTranslation}</p>
                {slokaOfDay.hindi && <p className="text-sm text-muted-foreground"><span className="text-blue-400">Hindi:</span> {slokaOfDay.hindi}</p>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-6">
              <div className="h-8 w-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"></div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );

  // Right column content for desktop layout
  const rightColumnContent = (
    <>
      {/* Chapter Summary */}
      <motion.div
        className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookMarked size={18} className="text-primary" />
            Chapter Summary
          </h2>
        </div>

        <div className="bg-indigo-500/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
              {chapter}
            </div>
            <div>
              <div className="font-medium">{gitaChapters[chapter-1]?.name || ""}</div>
              <div className="text-xs text-blue-400 italic">{gitaChapters[chapter-1]?.englishTitle || ""}</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground whitespace-pre-line">{gitaChapters[chapter-1]?.summary || ""}</div>
        </div>
      </motion.div>

      {/* Favorite Slokas */}
      {favorites.length > 0 && (
        <motion.div
          className="glass-card p-6 border border-indigo-500/20 premium-glow-effect hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-red-400" />
              <h2 className="text-lg font-semibold">Favorite Slokas</h2>
            </div>
            <span className="premium-badge">Premium</span>
          </div>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            {favorites.map(fav => (
              <div key={`${fav.chapter}:${fav.verse}`} className="bg-indigo-500/10 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                      {fav.chapter}:{fav.verse}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="premium-button-outline flex items-center gap-1 text-xs"
                    onClick={() => removeFavorite(fav.chapter, fav.verse)}
                  >
                    <span>Remove</span>
                  </Button>
                </div>
                <div className="mb-2 font-medium whitespace-pre-line">{fav.sloka.slok}</div>
                <div className="space-y-1">
                  {fav.sloka.eng && <p className="text-sm text-muted-foreground"><span className="text-blue-400">English:</span> {fav.sloka.eng}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
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
        <h1 className="text-2xl font-bold premium-title">Bhagavad Gita</h1>
        <motion.div
          className="mx-auto mt-2 w-32 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Note about translation */}
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Sparkles size={16} className="text-blue-400" />
          <p>If the English translation of a sloka is not available, you can ask Vasudev the Divine Chatbox for a deeper explanation or meaning.</p>
        </div>
      </motion.div>
      {/* Sloka of the Day Section - Hide in Devotional mode */}
      {!settings.devotionalMode && (
        <motion.div
          className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Sloka of the Day</h2>
            <span className="premium-badge">Premium</span>
          </div>

          {slokaOfDay ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center">
                  <BookOpen size={16} className="text-blue-400" />
                </div>
                <div className="text-white/90 font-medium">Sloka {slokaOfDay.chapter}:{slokaOfDay.verse}</div>
              </div>

              <div className="bg-indigo-500/10 p-4 rounded-xl">
                <p className="text-white/90 font-medium whitespace-pre-line">{slokaOfDay.slok}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-white/70"><span className="text-blue-400">English:</span> {slokaOfDayTranslation}</p>
                {slokaOfDay.hindi && <p className="text-sm text-white/70"><span className="text-blue-400">Hindi:</span> {slokaOfDay.hindi}</p>}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-6">
              <div className="h-8 w-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"></div>
            </div>
          )}
        </motion.div>
      )}
      {/* Sloka Finder */}
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Sloka Finder</h2>
          </div>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs text-blue-400 mb-1 block">Chapter</label>
            <Input
              type="number"
              min="1"
              max="18"
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
              className="premium-input"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-blue-400 mb-1 block">Verse</label>
            <Input
              type="number"
              min="1"
              value={verse}
              onChange={(e) => setVerse(parseInt(e.target.value) || 1)}
              className="premium-input"
            />
          </div>
          <div className="flex items-end">
            <Button
              className="premium-button h-10"
              onClick={fetchSloka}
              disabled={loading}
            >
              {loading ? "Loading..." : "Find"}
            </Button>
          </div>
        </div>

        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
      </motion.div>

      {/* Sloka Result */}
      {sloka && (
        <motion.div
          className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-lg font-semibold text-white">Chapter {chapter}, Verse {verse}</div>
              <div className="text-xs text-blue-400">{gitaChapters[chapter-1]?.name || ""}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="premium-button-outline flex items-center gap-1"
              onClick={addFavorite}
            >
              <Heart size={14} className="text-blue-400" />
              <span>Save</span>
            </Button>
          </div>

          <div className="bg-indigo-500/10 p-4 rounded-xl mb-4">
            <p className="text-white/90 font-medium whitespace-pre-line">{sloka.slok || "No sloka found."}</p>
          </div>
          <div className="space-y-2">
            {sloka.eng && <p className="text-sm text-white/70"><span className="text-blue-400">English:</span> {sloka.eng}</p>}
            {sloka.hindi && <p className="text-sm text-white/70"><span className="text-blue-400">Hindi:</span> {sloka.hindi}</p>}
            {!sloka.eng && !sloka.hindi && <AutoTranslateSanskrit text={sloka.slok} />}
          </div>
        </motion.div>
      )}
      {/* Gita Chapters & Summaries */}
      <motion.div
        className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Gita Chapters & Summaries</h2>
          <span className="premium-badge">Premium</span>
        </div>

        <div className="space-y-4">
          {gitaChapters.map((chapter, idx) => (
            <div key={chapter.number} className="bg-indigo-500/10 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                  {chapter.number}
                </div>
                <div>
                  <div className="text-white font-medium">{chapter.name}</div>
                  <div className="text-xs text-blue-400 italic">{chapter.englishTitle}</div>
                </div>
              </div>
              <div className="text-sm text-white/70 whitespace-pre-line">{chapter.summary}</div>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Favorite Slokas */}
      {favorites.length > 0 && (
        <motion.div
          className="premium-card p-5 border border-indigo-500/20 premium-glow-effect mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Favorite Slokas</h2>
            </div>
            <span className="premium-badge">Premium</span>
          </div>

          <ul className="space-y-4">
            {favorites.map(fav => (
              <li key={`${fav.chapter}:${fav.verse}`} className="bg-indigo-500/10 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/40 flex items-center justify-center text-xs text-blue-400 font-medium">
                      {fav.chapter}:{fav.verse}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="premium-button-outline flex items-center gap-1 text-xs"
                    onClick={() => removeFavorite(fav.chapter, fav.verse)}
                  >
                    <span>Remove</span>
                  </Button>
                </div>
                <div className="mb-2 text-white/90 font-medium whitespace-pre-line">{fav.sloka.slok}</div>
                <div className="space-y-1">
                  {fav.sloka.eng && <p className="text-sm text-white/70"><span className="text-blue-400">English:</span> {fav.sloka.eng}</p>}
                  {fav.sloka.hindi && <p className="text-sm text-white/70"><span className="text-blue-400">Hindi:</span> {fav.sloka.hindi}</p>}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );

  return (
    <DesktopLayout
      pageTitle="Bhagavad Gita"
      pageIcon={<BookOpen size={20} className="text-white" />}
      pageDescription="Explore the sacred wisdom of the Bhagavad Gita"
      headerActions={headerActions}
      leftColumn={leftColumnContent}
      middleColumn={middleColumnContent}
      rightColumn={rightColumnContent}
    >
      {mobileContent}
    </DesktopLayout>
  );
}