import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('gemini-3.5-flash');
  const [systemInstruction, setSystemInstruction] = useState('You are AMAN, a sophisticated, highly knowledgeable AI assistant representing Amanloka. You are polite, concise, and professional.');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, parts: m.parts })), // Formatting for Gemini API
          systemInstruction,
          model,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: data.text }] },
      ]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: `*Error: ${error.message}*` }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border border-[#333] rounded-2xl overflow-hidden bg-[#151515]">
      {/* Header */}
      <div className="p-4 border-b border-[#333] bg-[#111] flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="text-brand-white w-5 h-5 opacity-80" />
          <h3 className="font-heading font-bold text-brand-white uppercase tracking-widest text-xs">AMAN Assistant</h3>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono">
           <select 
            className="bg-[#111] border border-[#333] rounded-none px-3 py-1.5 text-brand-gray outline-none focus:border-brand-white uppercase tracking-wider"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="gemini-3.1-pro-preview">Pro (Complex Tasks)</option>
            <option value="gemini-3.5-flash">Flash (General Tasks)</option>
            <option value="gemini-3.1-flash-lite">Flash Lite (Fast)</option>
          </select>
        </div>
      </div>

      {/* Settings Panel (collapsible or static, let's keep it static but small) */}
      <div className="px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
        <input 
            type="text" 
            placeholder="System Instructions (e.g. 'You are a helpful assistant...')"
            value={systemInstruction}
            onChange={(e) => setSystemInstruction(e.target.value)}
            className="w-full bg-transparent text-xs text-gray-400 outline-none"
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center opacity-50"
            >
              <Bot className="w-12 h-12 mb-4 text-brand-white opacity-20" />
              <p className="text-brand-gray max-w-md font-light">How can AMAN assist you today? Select a model above and start typing.</p>
            </motion.div>
          )}
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-[#333] flex items-center justify-center ${msg.role === 'user' ? 'bg-[#222] text-white' : 'bg-transparent text-white'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[80%] px-5 py-3 ${msg.role === 'user' ? 'bg-[#111] border border-[#333] text-brand-white' : 'bg-transparent text-brand-gray'}`}>
                 <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:font-light prose-pre:bg-[#050505] prose-pre:border prose-pre:border-[#333]">
                    <Markdown>{msg.parts[0].text}</Markdown>
                 </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
               <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#333] bg-transparent text-white flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="flex items-center text-brand-white opacity-50">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="ml-3 text-xs tracking-widest uppercase font-mono">AMAN is thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#333] bg-[#111]">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full bg-[#050505] border border-[#333] rounded-none pl-5 pr-12 py-4 text-brand-white font-light focus:outline-none focus:border-brand-white transition-colors placeholder:text-[#444]"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-transparent text-brand-white hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
