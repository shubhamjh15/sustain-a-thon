import React, { useState, useRef, useEffect } from 'react';
import { NeoCard } from '../components/ui/NeoCard';
import { NeoButton } from '../components/ui/NeoButton';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, UserStats } from '../types';
import { Send, Bot, User } from 'lucide-react';

interface AiAssistantProps {
  userStats?: UserStats;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ userStats }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Hi! I\'m EcoBot 🌱. I see you\'re doing great! Ask me for a tip or check your impact stats.', timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    // Pass userStats to the service
    const responseText = await getGeminiResponse(history, userMsg.text, userStats);
    
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-4xl mx-auto pb-4">
      <div className="flex-none mb-4">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          <Bot className="text-neo-green" size={32} /> EcoBot Assistant
        </h2>
        <p className="text-gray-600">Your personal AI sustainability coach. Powered by Gemini.</p>
      </div>

      <NeoCard className="flex-1 flex flex-col overflow-hidden !p-0 bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-neo-yellow' : 'bg-neo-green'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-xl border-2 border-black shadow-neo-sm text-sm md:text-base font-medium ${msg.role === 'user' ? 'bg-neo-blue text-white' : 'bg-white'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="flex items-center gap-2 bg-white p-3 rounded-xl border-2 border-black shadow-neo-sm">
                 <div className="animate-bounce w-2 h-2 bg-neo-green rounded-full"></div>
                 <div className="animate-bounce w-2 h-2 bg-neo-blue rounded-full delay-100"></div>
                 <div className="animate-bounce w-2 h-2 bg-neo-pink rounded-full delay-200"></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t-4 border-black bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for an eco-tip..."
              className="flex-1 border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neo-green font-medium"
              disabled={loading}
            />
            <NeoButton onClick={handleSend} disabled={loading} size="md">
              <Send size={20} />
            </NeoButton>
          </div>
        </div>
      </NeoCard>
    </div>
  );
};