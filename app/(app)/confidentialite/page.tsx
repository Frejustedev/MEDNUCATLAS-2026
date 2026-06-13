'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Database, Cookie, UserCheck, Share2, Clock, Mail } from 'lucide-react';

export default function ConfidentialitePage() {
  const sections = [
    {
      id: 'responsable',
      icon: <ShieldCheck className="w-6 h-6 text-teal" aria-hidden="true" />,
      title: '1. Responsable du traitement',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>
            Le responsable du traitement des données personnelles collectées sur NucleAtlas est
            <strong> Dr. Fréjuste Agboton</strong> (NucleaTech Solutions, en cours d&apos;immatriculation).
          </p>
          <p>Contact : <a href="mailto:contact@nucleatlas.org" className="text-teal hover:underline">contact@nucleatlas.org</a></p>
        </div>
      ),
    },
    {
      id: 'donnees',
      icon: <Database className="w-6 h-6 text-blue-500" aria-hidden="true" />,
      title: '2. Données collectées',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>Nous collectons uniquement les données nécessaires au fonctionnement du service :</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Compte</strong> : adresse email, nom d&apos;affichage, photo de profil (si connexion Google), rôle et type de profil.</li>
            <li><strong>Usage</strong> : articles consultés récemment et favoris (pour votre tableau de bord).</li>
            <li><strong>Formulaire de contact</strong> : nom, email, sujet, message, ainsi que l&apos;adresse IP et le navigateur (pour la sécurité anti-spam).</li>
            <li><strong>Annuaire</strong> : informations que vous soumettez volontairement (centre, ville, coordonnées professionnelles).</li>
          </ul>
          <p>Nous ne collectons <strong>aucune donnée de santé</strong> vous concernant. NucleAtlas n&apos;est pas un dossier médical.</p>
        </div>
      ),
    },
    {
      id: 'finalites',
      icon: <UserCheck className="w-6 h-6 text-gold" aria-hidden="true" />,
      title: '3. Finalités et base légale',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Authentification et gestion du compte</strong> — base légale : exécution du service demandé.</li>
            <li><strong>Personnalisation</strong> (favoris, historique, niveau de lecture) — base légale : intérêt légitime.</li>
            <li><strong>Réponse aux messages</strong> — base légale : votre consentement.</li>
            <li><strong>Sécurité et prévention des abus</strong> — base légale : intérêt légitime.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'cookies',
      icon: <Cookie className="w-6 h-6 text-purple-500" aria-hidden="true" />,
      title: '4. Cookies et stockage local',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>NucleAtlas utilise un minimum de traceurs, tous strictement nécessaires :</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Authentification</strong> (Firebase) : maintien de votre session connectée.</li>
            <li><strong>Préférence de thème</strong> (clair/sombre) et <strong>consentement</strong> : stockés localement dans votre navigateur.</li>
          </ul>
          <p>Aucun cookie publicitaire ni traceur tiers de profilage n&apos;est utilisé à ce jour.</p>
        </div>
      ),
    },
    {
      id: 'sous-traitants',
      icon: <Share2 className="w-6 h-6 text-teal" aria-hidden="true" />,
      title: '5. Hébergement et sous-traitants',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Google Firebase</strong> (Authentification, base de données) — Google Ireland Ltd, Dublin.</li>
            <li><strong>Vercel Inc.</strong> — hébergement de l&apos;application.</li>
            <li><strong>Google Gemini</strong> — assistant IA. Seul le contenu de l&apos;article consulté est transmis ; aucune donnée de compte n&apos;est envoyée à l&apos;IA.</li>
          </ul>
          <p>Ces prestataires offrent des garanties conformes au RGPD pour les transferts internationaux.</p>
        </div>
      ),
    },
    {
      id: 'conservation',
      icon: <Clock className="w-6 h-6 text-blue-500" aria-hidden="true" />,
      title: '6. Durée de conservation',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Données de compte</strong> : conservées tant que le compte est actif, supprimées sur demande.</li>
            <li><strong>Messages de contact</strong> : 24 mois maximum.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'droits',
      icon: <Mail className="w-6 h-6 text-gold" aria-hidden="true" />,
      title: '7. Vos droits',
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>Conformément au RGPD, vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de
            limitation, de portabilité et d&apos;opposition sur vos données.</p>
          <p>
            Pour exercer ces droits, écrivez à{' '}
            <a href="mailto:contact@nucleatlas.org" className="text-teal hover:underline">contact@nucleatlas.org</a>.
            Vous pouvez également introduire une réclamation auprès de l&apos;autorité de protection des données
            compétente de votre pays.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-bg2 border border-border-main rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
          >
            <ShieldCheck className="w-8 h-8 text-teal" aria-hidden="true" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-text-main sm:text-5xl font-serif mb-6">
            Politique de confidentialité
          </h1>
          <p className="text-lg text-text2 max-w-2xl mx-auto">
            Comment NucleAtlas collecte, utilise et protège vos données personnelles.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * (index + 1) }}
              className="bg-bg2 rounded-3xl border border-border-main p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border-main">
                <div className="p-3 bg-bg-main rounded-xl border border-border-main">{section.icon}</div>
                <h2 className="text-2xl font-bold text-text-main">{section.title}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">{section.content}</div>
            </motion.section>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-text3">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
}
