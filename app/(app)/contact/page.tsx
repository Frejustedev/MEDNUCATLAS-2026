'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-text-main mb-4">Contactez-nous</h1>
        <p className="text-lg text-text2 max-w-2xl mx-auto">
          Vous avez une question, une suggestion ou besoin d&apos;aide ? N&apos;hésitez pas à nous contacter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-bg2 border border-border-main rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-text-main mb-6">Nos Coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h3 className="font-medium text-text-main mb-1">Email</h3>
                  <p className="text-text2 text-sm">contact@nucleatlas.com</p>
                  <p className="text-text3 text-xs mt-1">Nous répondons généralement sous 24h.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-text-main mb-1">Téléphone</h3>
                  <p className="text-text2 text-sm">+33 (0)1 23 45 67 89</p>
                  <p className="text-text3 text-xs mt-1">Du lundi au vendredi, de 9h à 18h.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-text-main mb-1">Adresse</h3>
                  <p className="text-text2 text-sm">
                    123 Avenue de la Médecine<br />
                    75000 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-bg2 border border-border-main rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-serif text-text-main mb-6">Envoyez-nous un message</h2>
          
          {isSuccess ? (
            <div className="bg-teal/10 border border-teal/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-text-main mb-2">Message envoyé !</h3>
              <p className="text-text2 text-sm">
                Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-6 text-teal hover:text-teal2 text-sm font-medium transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text2 mb-1.5">Prénom</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text2 mb-1.5">Nom</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors"
                    placeholder="Dupont"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-text2 mb-1.5">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text2 mb-1.5">Sujet</label>
                <select 
                  required
                  className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors appearance-none"
                >
                  <option value="" className="bg-bg text-text-main">Sélectionnez un sujet</option>
                  <option value="support" className="bg-bg text-text-main">Support technique</option>
                  <option value="content" className="bg-bg text-text-main">Question sur le contenu</option>
                  <option value="partnership" className="bg-bg text-text-main">Partenariat</option>
                  <option value="other" className="bg-bg text-text-main">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-text2 mb-1.5">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal text-bg rounded-xl py-3.5 font-medium hover:bg-teal2 transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
