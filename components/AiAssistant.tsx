'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Article } from '@/lib/data';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { apiFetch, ApiError } from '@/lib/api-client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type AiChatResponse = {
  reply: string;
  rate: { remaining: number; resetAt: number };
};

export function AiAssistant({
  article,
  onClose,
  userProfile,
}: {
  article: Article;
  onClose: () => void;
  userProfile: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Bonjour ! Je suis l'assistant IA de NucleAtlas. Vous consultez l'article **${article.title}**. Comment puis-je vous aider ? (Ex : "Résume-moi cet article", "Explique-moi ce terme", "Traduis ce passage")`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const profileToMode = (p: string): 'patient' | 'medecin_non_nuc' | 'medecin_nuc' => {
    if (p === 'medecin_nuc' || p === 'admin') return 'medecin_nuc';
    if (p === 'medecin_non_nuc') return 'medecin_non_nuc';
    return 'patient';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const history = nextMessages
        .slice(0, -1)
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-10);

      const res = await apiFetch<AiChatResponse>('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          articleId: article.id,
          message: trimmed,
          history,
          userProfile: profileToMode(userProfile),
        }),
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Désolé, une erreur est survenue lors de la communication avec l'IA.";
      setMessages((prev) => [...prev, { role: 'assistant', content: message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside
      role="complementary"
      aria-label="Assistant IA"
      className="absolute top-0 right-0 bottom-0 w-full md:w-[400px] bg-bg2 border-l border-border-main shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300"
    >
      <header className="flex items-center justify-between p-4 border-b border-border-main bg-bg3">
        <div className="flex items-center gap-2 text-teal font-serif text-lg">
          <Sparkles className="w-4 h-4" aria-hidden="true" /> Assistant IA
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer l'assistant IA"
          className="text-text3 hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded-md p-1"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" role="log" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg p-3 text-[13px] leading-[1.6] ${
                m.role === 'user'
                  ? 'bg-teal text-bg rounded-br-none'
                  : 'bg-bg3 border border-border-main text-text-main rounded-bl-none prose dark:prose-invert prose-sm max-w-none'
              }`}
            >
              {m.role === 'user' ? (
                m.content
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                  {m.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-bg3 border border-border-main rounded-lg rounded-bl-none p-3 text-text3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Réflexion…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border-main bg-bg3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="ai-chat-input" className="sr-only">
            Votre question
          </label>
          <input
            id="ai-chat-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question…"
            className="flex-1 bg-bg border border-border-main rounded-md px-3 py-2 text-[13px] text-text-main outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/40 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Envoyer la question"
            className="bg-teal text-bg p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal2 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </aside>
  );
}
