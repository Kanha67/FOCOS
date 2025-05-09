
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface Sloka {
  id: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  chapter: number;
  verse: number;
}

const slokas: Sloka[] = [
  {
    id: 1,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results, and never be attached to not doing your duty.",
    chapter: 2,
    verse: 47
  },
  {
    id: 2,
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
    transliteration: "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga uchyate",
    translation: "Be steadfast in yoga, O Arjuna. Perform your duty and abandon all attachment to success or failure. Such evenness of mind is called yoga.",
    chapter: 2,
    verse: 48
  },
  {
    id: 3,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmy aham",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
    chapter: 4,
    verse: 7
  },
  {
    id: 4,
    sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।\nमामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः॥",
    transliteration: "man-manā bhava mad-bhakto mad-yājī māṁ namaskuru\nmām evaiṣyasi yuktvaivam ātmānaṁ mat-parāyaṇaḥ",
    translation: "Always think of Me, become My devotee, worship Me, and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.",
    chapter: 9,
    verse: 34
  },
  {
    id: 5,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ",
    translation: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    chapter: 18,
    verse: 66
  },
  {
    id: 6,
    sanskrit: "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते।\nइति मत्वा भजन्ते मां बुधा भावसमन्विताः॥",
    transliteration: "ahaṁ sarvasya prabhavo mattaḥ sarvaṁ pravartate\niti matvā bhajante māṁ budhā bhāva-samanvitāḥ",
    translation: "I am the source of all spiritual and material worlds. Everything emanates from Me. The wise who know this perfectly engage in My devotional service and worship Me with all their hearts.",
    chapter: 10,
    verse: 8
  },
  {
    id: 7,
    sanskrit: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते।\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः॥",
    transliteration: "bahūnāṁ janmanām ante jñānavān māṁ prapadyate\nvāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ",
    translation: "After many births and deaths, one who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare.",
    chapter: 7,
    verse: 19
  }
];

export default function SlokaOfTheDay() {
  const { settings } = useAppContext();
  const [todaysSloka, setTodaysSloka] = useState<Sloka | null>(null);

  // Don't render in Devotional mode
  if (settings.devotionalMode) {
    return null;
  }

  useEffect(() => {
    const getTodaysSloka = () => {
      // Check if we should get a new sloka for today
      const lastSlokaDate = localStorage.getItem('lastSlokaDate');
      const today = new Date().toDateString();

      if (lastSlokaDate !== today) {
        // It's a new day, get a new random sloka
        const randomIndex = Math.floor(Math.random() * slokas.length);
        const sloka = slokas[randomIndex];

        localStorage.setItem('currentSloka', JSON.stringify(sloka));
        localStorage.setItem('lastSlokaDate', today);

        setTodaysSloka(sloka);
      } else {
        // Use the same sloka as earlier today
        const savedSloka = localStorage.getItem('currentSloka');
        if (savedSloka) {
          setTodaysSloka(JSON.parse(savedSloka));
        } else {
          // Fallback if somehow we don't have a saved sloka
          const randomIndex = Math.floor(Math.random() * slokas.length);
          const sloka = slokas[randomIndex];
          setTodaysSloka(sloka);
        }
      }
    };

    getTodaysSloka();

    // Reset the sloka at midnight
    const checkDate = () => {
      const lastSlokaDate = localStorage.getItem('lastSlokaDate');
      const today = new Date().toDateString();

      if (lastSlokaDate !== today) {
        getTodaysSloka();
      }
    };

    // Check date when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkDate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!todaysSloka) {
    return null;
  }

  return (
    <Card className="glass-card p-6 animate-float">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={20} className="text-amber-400 animate-glow" />
        <h2 className="text-lg font-semibold divine-text">Sloka of the Day</h2>
      </div>

      <div className="space-y-3">
        <div className="bg-amber-800/10 p-4 rounded-lg border border-amber-500/20">
          <p className="text-amber-200/90 font-medium text-center text-sm leading-relaxed">{todaysSloka.sanskrit}</p>
        </div>

        <div className="italic text-sm text-amber-300/70 text-center">
          {todaysSloka.transliteration}
        </div>

        <div className="mt-4">
          <p className="text-sm leading-relaxed">{todaysSloka.translation}</p>
          <p className="text-xs text-amber-400 mt-2 text-right">— Chapter {todaysSloka.chapter}, Verse {todaysSloka.verse}</p>
        </div>
      </div>
    </Card>
  );
}
