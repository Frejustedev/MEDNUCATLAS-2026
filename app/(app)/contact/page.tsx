'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Twitter, Linkedin, Facebook, MessageSquare, Loader2 } from 'lucide-react';
import { apiFetch, ApiError } from '@/lib/api-client';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorText, setErrorText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    setIsSubmitting(true);
    try {
      await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setFormData(INITIAL_FORM);
      setIsSubmitted(true);
    } catch (error) {
      setErrorText(error instanceof ApiError ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
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
            Une question, une suggestion ou un partenariat ? Écris-nous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 space-y-6"
          >
            <div className="bg-bg2 p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="w-12 h-12 bg-teal/10 text-teal rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-text-main mb-2">Email</h3>
              <p className="text-text2 mb-4">Pour toute demande générale ou support technique.</p>
              <a
                href="mailto:contact@nucleatlas.org"
                className="text-teal hover:text-teal-dark font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded"
              >
                contact@nucleatlas.org
              </a>
            </div>

            <div className="bg-bg2 p-6 rounded-2xl border border-border-main shadow-sm">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-text-main mb-2">Réseaux sociaux</h3>
              <p className="text-text2 mb-4">Suis notre actualité.</p>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/nucleatlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter NucleAtlas"
                  className="p-2 bg-bg3 text-text2 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Twitter className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com/company/nucleatlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn NucleAtlas"
                  className="p-2 bg-bg3 text-text2 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://facebook.com/nucleatlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook NucleAtlas"
                  className="p-2 bg-bg3 text-text2 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-bg2 p-6 sm:p-8 rounded-2xl border border-border-main shadow-sm"
          >
            <h2 className="text-2xl font-bold text-text-main mb-6">Envoyez-nous un message</h2>

            {isSubmitted ? (
              <div className="bg-teal/10 border border-teal/20 text-teal p-6 rounded-xl text-center" role="status">
                <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                <p>Merci. Nous te répondrons sous peu.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 text-sm border border-teal text-teal rounded-lg hover:bg-teal/10 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot — invisible aux humains, attire les bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">
                    Ne remplis pas ce champ
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      type="text"
                      id="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      minLength={2}
                      maxLength={150}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                      placeholder="Dr. Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                      placeholder="jean.dupont@hopital.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-main mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    minLength={3}
                    maxLength={200}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                    placeholder="Comment puis-je contribuer ?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    minLength={10}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-main border border-border-main rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors resize-none"
                    placeholder="Votre message ici…"
                  />
                  <div className="text-xs text-text3 mt-1 text-right">{formData.message.length}/5000</div>
                </div>

                {errorText && (
                  <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                    {errorText}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-teal text-white px-6 py-3.5 rounded-xl hover:bg-teal-dark transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      Envoi…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Envoyer le message
                    </>
                  )}
                </button>

                <p className="text-xs text-text3 text-center">
                  En envoyant ce formulaire, tes données sont stockées pour traitement par l&apos;équipe NucleAtlas.
                  Voir notre{' '}
                  <a href="/mentions-legales" className="underline hover:text-teal">politique de confidentialité</a>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
