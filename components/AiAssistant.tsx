'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Article } from '@/lib/data';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AiAssistant({ article, onClose, userProfile }: { article: Article, onClose: () => void, userProfile: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Bonjour ! Je suis l'assistant IA de MedNuc Atlas. Vous consultez l'article **${article.title}**. Comment puis-je vous aider ? (Ex: "Résume-moi cet article", "Explique-moi ce terme", "Traduis ce passage")` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const systemInstruction = `
        Tu es l'assistant IA de MedNuc Atlas, une encyclopédie de médecine nucléaire.
        L'utilisateur actuel a le profil : ${userProfile}.
        Adapte ton vocabulaire et ton niveau de détail à ce profil (vulgarisé pour un patient, technique pour un médecin).
        Utilise le contexte de l'article suivant pour répondre si pertinent :
        ${JSON.stringify(article)}
        
        Règles :
        - Reste dans le domaine de la médecine nucléaire et de l'imagerie médicale.
        - Si la question est hors sujet, redirige poliment vers le sujet de l'article.
        - Utilise le format Markdown pour structurer ta réponse (gras, listes).
        - Ne donne pas de conseils médicaux personnels.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction,
          temperature: 0.3,
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Je n'ai pas pu générer de réponse." }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur est survenue lors de la communication avec l'IA." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-full md:w-[400px] bg-bg2 border-l border-border-main shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 border-b border-border-main bg-bg3">
        <div className="flex items-center gap-2 text-teal font-serif text-lg">
          <Sparkles className="w-4 h-4" /> Assistant IA
        </div>
        <button onClick={onClose} className="text-text3 hover:text-text-main transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-[13px] leading-[1.6] ${
              m.role === 'user' ? 'bg-teal text-bg rounded-br-none' : 'bg-bg3 border border-border-main text-text-main rounded-bl-none prose prose-invert prose-sm max-w-none'
            }`}>
              {m.role === 'user' ? (
                m.content
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-bg3 border border-border-main rounded-lg rounded-bl-none p-3 text-text3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Réflexion...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border-main bg-bg3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 bg-bg border border-border-main rounded-md px-3 py-2 text-[13px] text-text-main outline-none focus:border-teal/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-teal text-bg p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal2 transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
