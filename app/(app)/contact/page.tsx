'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Twitter, Linkedin, Facebook, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-text-main sm:text-5xl font-serif"
          >
            Nous Contacter
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-text2"
          >
            Une question, une suggestion ou un partenariat ? N'hésitez pas à nous écrire.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 space-y-6"
          >
            <div className="bg-bg2 p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="w-12 h-12 bg-teal/10 text-teal rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-text-main mb-2">Email</h3>
              <p className="text-text2 mb-4">Pour toute demande générale ou support technique.</p>
              <a href="mailto:contact@nucleatlas.org" className="text-teal hover:text-teal-dark font-medium transition-colors">
                contact@nucleatlas.org
              </a>
            </div>

            <div className="bg-bg2 p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-text-main mb-2">Réseaux Sociaux</h3>
              <p className="text-text2 mb-4">Suivez notre actualité et rejoignez la communauté.</p>
              <div className="flex gap-4">
                <a href="https://twitter.com/nucleatlas" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg3 text-text2 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/nucleatlas" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg3 text-text2 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/nucleatlas" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg3 text-text2 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-bg2 p-6 sm:p-8 rounded-2xl border border-border-main shadow-sm"
          >
            <h2 className="text-2xl font-bold text-text-main mb-6">Envoyez-nous un message</h2>
            
            {isSubmitted ? (
              <div className="bg-teal/10 border border-teal/20 text-teal p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">Nom complet *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                      placeholder="Dr. Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">Adresse email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                      placeholder="jean.dupont@hopital.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-main mb-2">Sujet *</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                    placeholder="Comment puis-je contribuer ?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors resize-none"
                    placeholder="Votre message ici..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-teal text-white px-6 py-3.5 rounded-xl hover:bg-teal-dark transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
