import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient"; // Ensure you have this helper or use fetch

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Mama Care, your AI pregnancy companion. How are you feeling today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput(""); // Clear input immediately
    
    // 1. Add User Message to UI
    const newMessages = [...messages, { role: "user", content: userMessage } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // 2. Send to Real AI Backend
      const res = await apiRequest("POST", "/api/chat", { message: userMessage });
      const data = await res.json();

      // 3. Add AI Response to UI
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages, 
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please check your internet connection." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="text-center mb-6 space-y-2">
        <h1 className="text-3xl font-bold text-pink-600 flex items-center justify-center gap-2">
          Pregnancy Assistant <Sparkles className="h-6 w-6 text-yellow-400" />
        </h1>
        <p className="text-muted-foreground">Ask me anything about your journey.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-pink-100 shadow-md bg-white/80 backdrop-blur">
        <CardContent className="flex-1 p-0 overflow-hidden relative">
          <ScrollArea className="h-full p-4 md:p-6">
            <div className="space-y-6 pb-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center border border-pink-200 shadow-sm">
                      <Bot size={18} className="text-pink-600" />
                    </div>
                  )}
                  
                  <div
                    className={`rounded-2xl px-5 py-3 max-w-[80%] shadow-sm text-sm md:text-base leading-relaxed ${
                      m.role === "user"
                        ? "bg-pink-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </div>

                  {m.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center border border-pink-600 shadow-sm">
                      <User size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <Bot size={18} className="text-pink-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none px-5 py-3 text-gray-500 text-sm">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2 max-w-3xl mx-auto"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="rounded-full border-pink-200 focus-visible:ring-pink-300"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full bg-pink-500 hover:bg-pink-600 shadow-sm h-10 w-10 shrink-0"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}