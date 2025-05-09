import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface FinancialAdvisorChatProps {
  isFloating?: boolean;
}

export default function FinancialAdvisorChat({ isFloating = false }: FinancialAdvisorChatProps) {
  const { settings } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const apiKey = "AIzaSyCm8AtJXlV1wgJEM-md_HJrgG1WBs3yfJw";
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  useEffect(() => {
    // Set initial welcome message based on Divine mode
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: settings.divineMode
          ? "Hare Krishna! I am Vasudev, your divine guide. How may I help you on your spiritual and worldly journey today? Feel free to ask me any question."
          : "Hello! I am Vasudev, your personal AI assistant. I can help with productivity, spiritual guidance, study advice, workout plans, and more. What would you like to know?"
      },
    ]);

    // Reset conversation context when divine mode changes
    setConversationContext([]);
  }, [settings.divineMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for context
      const userHistory = messages
        .filter(msg => msg.id !== "welcome")
        .slice(-6) // Keep last 6 messages for context
        .map(msg => `${msg.role === "user" ? "User" : "Vasudev"}: ${msg.content}`)
        .join("\n");

      // Add current query to context for future reference
      setConversationContext(prev => [...prev.slice(-5), input.trim()]);

      // Modify the prompt based on Divine mode
      const prompt = settings.divineMode
        ? `You are Vasudev, a divine spiritual guide with deep knowledge of Hindu philosophy, the Bhagavad Gita, and spiritual practices.

Previous conversation:
${userHistory}

User's question: ${input.trim()}

Respond thoughtfully to the user's specific question. If they ask about spiritual matters, provide wisdom from Hindu texts. If they ask about personal matters, give compassionate advice. Be concise but helpful, using 2-4 sentences. Avoid generic responses. Do not provide financial advice or guidance on financial matters - instead, redirect them to seek spiritual wisdom.`
        : `You are Vasudev, a personal AI assistant with expertise in productivity, wellness, study techniques, workout planning, and life advice.

Previous conversation:
${userHistory}

User's question: ${input.trim()}

Respond directly to the user's specific question with helpful, practical advice. Be concise but informative, using 2-4 sentences. Tailor your response to their exact query rather than giving generic advice. If they ask about a specific feature of the FOCOS app, explain how it works.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 250,
          },
        }),
      });

      const data = await response.json();

      let responseText = "I apologize, I couldn't process your request at this moment.";
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        responseText = data.candidates[0].content.parts[0].text;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: responseText,
        },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col ${isFloating ? 'h-full' : 'h-[calc(100vh-13rem)]'} ${settings.divineMode ? 'divine-chat' : ''}`}>
      {!isFloating && (
        <div className={`glass-card p-4 mb-4 flex items-center gap-2 ${settings.divineMode ? 'border-amber-400/50' : ''}`}>
          {settings.divineMode ? (
            <Sparkles size={20} className="text-amber-400" />
          ) : (
            <Bot size={20} className="text-primary" />
          )}
          <div>
            <h2 className={`text-lg font-semibold ${settings.divineMode ? 'text-amber-400' : ''}`}>
              Vasudev - {settings.divineMode ? 'Divine Spiritual Guide' : 'Personal AI Assistant'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {settings.divineMode
                ? "Ask me about spiritual wisdom, meditation, and life's deeper meaning"
                : "Ask me anything about productivity, studies, workouts, or life advice"}
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 px-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : settings.divineMode
                    ? "bg-gradient-to-r from-amber-600/20 to-purple-600/20 backdrop-blur-lg border border-amber-400/20"
                    : "glass-card"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === "assistant" ? (
                  settings.divineMode ? <Sparkles size={18} className="mt-1 text-amber-400" /> : <Bot size={18} className="mt-1" />
                ) : (
                  <User size={18} className="mt-1" />
                )}
                <p className={`text-sm whitespace-pre-wrap ${settings.divineMode && message.role === "assistant" ? "text-amber-100" : ""}`}>
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={settings.divineMode ? "Ask about sacred teachings..." : "Ask for divine guidance..."}
          className={`glass-input ${settings.divineMode ? 'border-amber-400/30 focus:border-amber-400/70' : ''}`}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className={`glass-button ${settings.divineMode ? 'border-amber-400/30 bg-gradient-to-r from-amber-600/20 to-purple-600/20' : ''}`}
          disabled={isLoading || !input.trim()}
        >
          <Send size={18} className={settings.divineMode ? 'text-amber-400' : ''} />
        </Button>
      </form>
    </div>
  );
}
