import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Copy, Share } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample Bhagavad Gita verses
const gitaVerses = [
  {
    chapter: 1,
    verse: 1,
    sanskrit: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१-१||",
    translation: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?",
    explanation: "The Bhagavad Gita begins with King Dhritarashtra asking his secretary Sanjaya about the battle between his sons (the Kauravas) and their cousins (the Pandavas) on the sacred field of Kurukshetra. This sets the stage for the entire dialogue."
  },
  {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||२-४७||",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to inaction.",
    explanation: "This is one of the most famous verses of the Gita, teaching the principle of detached action (nishkama karma). Krishna advises Arjuna to focus on performing his duty without being attached to the results, whether success or failure."
  },
  {
    chapter: 4,
    verse: 7,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||४-७||",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
    explanation: "Krishna explains his divine incarnations (avatars), stating that he appears in the world whenever there is a decline in dharma (righteousness) and a rise in adharma (unrighteousness) to protect the virtuous and annihilate the wicked."
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते | तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||९-२२||",
    translation: "For those who worship Me exclusively with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have.",
    explanation: "Krishna promises to take care of the material and spiritual needs of those who worship him with single-minded devotion. This verse emphasizes the protective nature of divine grace for sincere devotees."
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||१८-६६||",
    translation: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    explanation: "In this culminating verse of the Gita, Krishna asks Arjuna to abandon all other paths and simply surrender to him. He promises to free Arjuna from all karmic reactions and tells him not to worry. This verse encapsulates the essence of bhakti yoga (the path of devotion)."
  }
];

export default function SlokaFinder() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<typeof gitaVerses>([]);
  const [selectedVerse, setSelectedVerse] = useState<(typeof gitaVerses)[0] | null>(null);
  
  const handleSearch = () => {
    let results = [...gitaVerses];
    
    // Filter by chapter if selected
    if (selectedChapter !== "all") {
      results = results.filter(verse => verse.chapter === parseInt(selectedChapter));
    }
    
    // Filter by search term if provided
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(verse => 
        verse.translation.toLowerCase().includes(term) || 
        verse.explanation.toLowerCase().includes(term)
      );
    }
    
    setSearchResults(results);
    
    if (results.length === 0) {
      toast({
        title: "No Results",
        description: "No verses found matching your search criteria.",
      });
    }
  };
  
  const handleCopyVerse = (verse: (typeof gitaVerses)[0]) => {
    const textToCopy = `Bhagavad Gita ${verse.chapter}.${verse.verse}\n\n${verse.sanskrit}\n\n${verse.translation}`;
    navigator.clipboard.writeText(textToCopy);
    
    toast({
      title: "Copied to Clipboard",
      description: `Bhagavad Gita ${verse.chapter}.${verse.verse} copied successfully.`,
    });
  };
  
  const handleShareVerse = (verse: (typeof gitaVerses)[0]) => {
    // In a real app, this would use the Web Share API
    toast({
      title: "Share Feature",
      description: "Sharing functionality will be available in the next update!",
    });
  };
  
  return (
    <Card className="glass-card p-4 space-y-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen size={18} className="text-amber-500" />
        <h3 className="font-semibold text-amber-700">Bhagavad Gita Sloka Finder</h3>
      </div>
      
      <div className="flex gap-2">
        <Select value={selectedChapter} onValueChange={setSelectedChapter}>
          <SelectTrigger className="glass-input border-amber-200/50">
            <SelectValue placeholder="Select Chapter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Chapters</SelectItem>
            <SelectItem value="1">Chapter 1</SelectItem>
            <SelectItem value="2">Chapter 2</SelectItem>
            <SelectItem value="3">Chapter 3</SelectItem>
            <SelectItem value="4">Chapter 4</SelectItem>
            <SelectItem value="5">Chapter 5</SelectItem>
            <SelectItem value="6">Chapter 6</SelectItem>
            <SelectItem value="7">Chapter 7</SelectItem>
            <SelectItem value="8">Chapter 8</SelectItem>
            <SelectItem value="9">Chapter 9</SelectItem>
            <SelectItem value="10">Chapter 10</SelectItem>
            <SelectItem value="11">Chapter 11</SelectItem>
            <SelectItem value="12">Chapter 12</SelectItem>
            <SelectItem value="13">Chapter 13</SelectItem>
            <SelectItem value="14">Chapter 14</SelectItem>
            <SelectItem value="15">Chapter 15</SelectItem>
            <SelectItem value="16">Chapter 16</SelectItem>
            <SelectItem value="17">Chapter 17</SelectItem>
            <SelectItem value="18">Chapter 18</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex-1 relative">
          <Input
            placeholder="Search by keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input border-amber-200/50"
          />
        </div>
        
        <Button 
          onClick={handleSearch}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          <Search size={16} className="mr-1" />
          Search
        </Button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="space-y-3 mt-2">
          <h4 className="text-sm font-medium text-amber-700">Search Results:</h4>
          
          {searchResults.map((verse, index) => (
            <Card 
              key={index} 
              className="p-3 border border-amber-200/30 hover:border-amber-400/50 transition-colors cursor-pointer"
              onClick={() => setSelectedVerse(verse)}
            >
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-amber-700">
                  Chapter {verse.chapter}, Verse {verse.verse}
                </h5>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-amber-600 hover:text-amber-700 hover:bg-amber-100/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyVerse(verse);
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-amber-600 hover:text-amber-700 hover:bg-amber-100/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareVerse(verse);
                    }}
                  >
                    <Share size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {verse.translation}
              </p>
            </Card>
          ))}
        </div>
      )}
      
      {selectedVerse && (
        <Card className="p-4 mt-4 border border-amber-300/50 bg-amber-50/50 dark:bg-amber-900/10">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-amber-700">
              Bhagavad Gita Chapter {selectedVerse.chapter}, Verse {selectedVerse.verse}
            </h4>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 border-amber-200"
                onClick={() => handleCopyVerse(selectedVerse)}
              >
                <Copy size={14} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 border-amber-200"
                onClick={() => handleShareVerse(selectedVerse)}
              >
                <Share size={14} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-medium text-amber-600 mb-1">Sanskrit:</h5>
              <p className="text-sm font-medium">{selectedVerse.sanskrit}</p>
            </div>
            
            <div>
              <h5 className="text-xs font-medium text-amber-600 mb-1">Translation:</h5>
              <p className="text-sm">{selectedVerse.translation}</p>
            </div>
            
            <div>
              <h5 className="text-xs font-medium text-amber-600 mb-1">Explanation:</h5>
              <p className="text-sm text-muted-foreground">{selectedVerse.explanation}</p>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
}
