import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";

interface Lesson {
  id: number;
  chapter: number;
  title: string;
  description: string;
  content: string;
}

const gitaLessons: Lesson[] = [
  {
    id: 1,
    chapter: 1,
    title: "Arjuna's Dilemma",
    description: "The conflict and confusion of Arjuna on the battlefield",
    content: "Arjuna, standing on the battlefield of Kurukshetra, is overcome with sorrow and compassion for his relatives on both sides. He is torn between his duty as a warrior and his love for his family, leading to a deep moral and spiritual crisis."
  },
  {
    id: 2,
    chapter: 2,
    title: "Transcendence through Knowledge (Sankhya Yoga)",
    description: "Krishna begins his teachings on the immortality of the soul and the duty to act",
    content: "Krishna explains the eternal nature of the soul and encourages Arjuna to rise above his doubts. He introduces the importance of performing one's duty (dharma) without attachment to results, laying the foundation for Karma Yoga."
  },
  {
    id: 3,
    chapter: 3,
    title: "Karma Yoga: The Path of Selfless Action",
    description: "Understanding selfless action and duty",
    content: "Krishna elaborates on Karma Yoga, emphasizing that one must act according to duty, but without attachment to outcomes. True freedom comes from selfless service and surrendering the results to the Divine."
  },
  {
    id: 4,
    chapter: 4,
    title: "Jnana Yoga: The Path of Knowledge and Wisdom",
    description: "The importance of knowledge and spiritual wisdom",
    content: "Krishna describes the significance of acquiring spiritual knowledge and acting with wisdom. He explains the role of the enlightened teacher (guru) and the process of attaining liberation through knowledge."
  },
  {
    id: 5,
    chapter: 5,
    title: "The Yoga of Renunciation",
    description: "Balancing renunciation and action",
    content: "Krishna teaches that both renunciation and selfless action lead to liberation, but selfless action (Karma Yoga) is superior for most people. The wise person sees no difference between action and renunciation when both are performed with detachment."
  },
  {
    id: 6,
    chapter: 6,
    title: "Meditation Guider: Dhyana Yoga",
    description: "How to meditate: step-by-step guidance for beginners",
    content: "Meditation is a journey inward. Here’s how to begin: 1) Choose a quiet, clean place and sit comfortably with your spine straight. 2) Close your eyes and take a few deep breaths. 3) Relax your body, let go of tension. 4) Focus on your breath, a mantra (like 'Om'), or the image of the Divine. 5) If thoughts arise, gently bring your attention back. 6) Start with 5–10 minutes daily, gradually increasing as you feel comfortable. 7) Meditate at the same time each day for consistency. 8) End your session with gratitude and a positive intention. Remember: Meditation is about practice, not perfection."
  },
  {
    id: 7,
    chapter: 7,
    title: "Spiritual Guidance & Roadmap",
    description: "A practical roadmap for spiritual growth in daily life",
    content: "Spiritual progress is a journey of self-discovery and transformation. Here’s a roadmap: 1) Begin with self-reflection: Who am I? What is my purpose? 2) Cultivate daily habits: reading sacred texts, prayer, and gratitude. 3) Practice mindfulness in all actions—be present and aware. 4) Develop virtues: kindness, honesty, patience, humility. 5) Seek the company of uplifting people and avoid negativity. 6) Face challenges as opportunities for growth. 7) Regularly review your progress and set new intentions. Remember, the spiritual path is unique for everyone—walk it with sincerity and an open heart."
  },
  {
    id: 8,
    chapter: 8,
    title: "The Eternal God (Akshara Brahma Yoga)",
    description: "Meditation on the Supreme at the time of death",
    content: "Krishna teaches that those who remember the Divine at the time of death attain the supreme destination. He explains the process of leaving the body and the importance of constant remembrance and meditation on God throughout life."
  },
  {
    id: 9,
    chapter: 9,
    title: "Karma: Daily Spiritual Practice Tasks",
    description: "Daily actions to align your life with spiritual values",
    content: "Here are daily tasks to deepen your spiritual practice: 1) Read or listen to a verse from the Bhagavad Gita. 2) Spend 5–10 minutes in meditation or silent reflection. 3) Practice gratitude by listing three things you’re thankful for. 4) Do one selfless act for someone else. 5) Use the habit tracker to monitor your progress. 6) Reflect on your actions before bed: Did I act with kindness and integrity? 7) Journal your experiences and insights. Consistency in these small tasks leads to lasting spiritual growth."
  },
  {
    id: 10,
    chapter: 10,
    title: "Divine Manifestations (Vibhuti Yoga)",
    description: "Recognizing the Divine everywhere",
    content: "Krishna describes his divine manifestations in the world: among mountains as the Himalayas, among rivers as the Ganges, among animals as the lion, and so on. By seeing the sacred in all things, one develops reverence for life and a deep sense of connection with the universe."
  },
  {
    id: 11,
    chapter: 11,
    title: "The Universal Form (Vishwaroopa Darshana)",
    description: "Krishna reveals his cosmic form to Arjuna",
    content: "Arjuna is granted divine vision and witnesses Krishna's universal form, encompassing all creation. This overwhelming vision teaches Arjuna about the infinite, awe-inspiring nature of the Divine and the insignificance of the individual ego."
  },
  {
    id: 12,
    chapter: 12,
    title: "The Yoga of Devotion (Bhakti Yoga)",
    description: "The supreme path of loving devotion",
    content: "Krishna explains the qualities of true devotees and the importance of loving devotion (bhakti) as the easiest and most effective path to God. He assures that anyone who worships with a pure heart is dear to Him."
  },
  {
    id: 13,
    chapter: 13,
    title: "The Field and Its Knower (Kshetra-Kshetrajna Vibhaga Yoga)",
    description: "Understanding the body, soul, and Supreme Soul",
    content: "Krishna distinguishes between the physical body (the field) and the soul (the knower of the field). True knowledge is to realize the distinction between the body and the soul, and to understand the presence of the Supreme Soul in all beings."
  },
  {
    id: 14,
    chapter: 14,
    title: "The Three Gunas (Qualities of Nature)",
    description: "Sattva, Rajas, and Tamas—modes of material nature",
    content: "Krishna describes the three gunas (qualities) that bind the soul to the body: sattva (goodness), rajas (passion), and tamas (ignorance). By transcending these, one attains liberation."
  },
  {
    id: 15,
    chapter: 15,
    title: "The Supreme Person (Purushottama Yoga)",
    description: "The eternal tree of life and the Supreme Person",
    content: "Krishna uses the metaphor of the cosmic tree to explain the material and spiritual worlds. The wise cut down this tree with the axe of detachment and seek refuge in the Supreme Person, realizing their eternal relationship with God."
  },
  {
    id: 16,
    chapter: 16,
    title: "Divine and Demonic Natures (Daivasura Sampad Vibhaga Yoga)",
    description: "The difference between divine and demonic qualities",
    content: "Krishna explains the characteristics of the divine (fearlessness, compassion, truthfulness) and the demonic (arrogance, anger, delusion). Cultivating divine qualities leads to liberation, while demonic qualities result in bondage."
  },
  {
    id: 17,
    chapter: 17,
    title: "Faith and Its Types (Shraddhatraya Vibhaga Yoga)",
    description: "Different kinds of faith and their effects",
    content: "Faith is shaped by one's nature (guna) and can be sattvic, rajasic, or tamasic. Krishna describes how faith influences worship, food, sacrifice, and charity, and how pure faith leads to spiritual progress."
  },
  {
    id: 18,
    chapter: 18,
    title: "Liberation through Renunciation (Moksha Sannyasa Yoga)",
    description: "The final teachings and the path to liberation",
    content: "Krishna summarizes all paths—karma, jnana, and bhakti—and encourages Arjuna to surrender completely to the Divine. By renouncing the fruits of action and acting with devotion, one attains supreme peace and liberation."
  }
];

export default function GitaLessons() {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  
  const toggleLesson = (id: number) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={20} className="text-amber-400" />
        <h2 className="text-xl font-bold divine-text">Gita Lessons</h2>
      </div>
      
      <div className="space-y-4">
        {gitaLessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className="glass-card overflow-hidden transition-all duration-300"
          >
            <div 
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleLesson(lesson.id)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-amber-400" />
                  <span className="text-amber-300 text-sm">Chapter {lesson.chapter}</span>
                </div>
                <h3 className="font-medium mt-1">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
              </div>
              <ChevronRight 
                size={20} 
                className={`text-amber-400 transition-transform duration-300 ${
                  expandedLesson === lesson.id ? 'rotate-90' : ''
                }`} 
              />
            </div>
            
            {expandedLesson === lesson.id && (
              <div className="px-4 pb-4 pt-2 border-t border-amber-500/20 animate-fade-in">
                <p className="text-sm leading-relaxed">{lesson.content}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 border-amber-500/30 text-amber-400 hover:text-amber-500 hover:bg-amber-500/10"
                >
                  Read Full Lesson
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
