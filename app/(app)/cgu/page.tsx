'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FileText, UserCheck, AlertTriangle, Copyright, Ban, RefreshCw } from 'lucide-react';

export default function CGUPage() {
  const sections = [
    {
      id: 'objet',
      icon: <FileText className="w-6 h-6 text-teal" aria-hidden="true" />,
      title: "1. Objet",
      content: (
        <p className="text-text2 leading-relaxed">
          Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et l&apos;usage de la
          plateforme NucleAtlas, encyclopédie de médecine nucléaire. En utilisant le service, vous
          acceptez ces conditions sans réserve.
        </p>
      ),
    },
    {
      id: 'acces',
      icon: <UserCheck className="w-6 h-6 text-blue-500" aria-hidden="true" />,
      title: "2. Accès et comptes",
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>L&apos;accès est gratuit pendant la phase beta. Certaines fonctionnalités nécessitent un compte.</p>
          <p>
            Les profils « Médecin » et « Médecin Nucléaire » donnent accès à des contenus techniques.
            L&apos;attribution de ces rôles peut faire l&apos;objet d&apos;une vérification. Vous êtes responsable de
            l&apos;exactitude des informations fournies et de la confidentialité de vos identifiants.
          </p>
        </div>
      ),
    },
    {
      id: 'medical',
      icon: <AlertTriangle className="w-6 h-6 text-gold" aria-hidden="true" />,
      title: "3. Avertissement médical",
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p className="font-semibold text-text-main">
            Le contenu de NucleAtlas est fourni à titre informatif et éducatif uniquement.
          </p>
          <p>
            Il ne constitue pas un avis médical et <strong>ne remplace en aucun cas</strong> une consultation,
            un diagnostic ou un traitement par un professionnel de santé qualifié. Une partie du contenu est
            rédigée avec l&apos;assistance d&apos;une intelligence artificielle et son statut de relecture est indiqué
            sur chaque article. L&apos;éditeur décline toute responsabilité quant à l&apos;usage qui en est fait.
          </p>
        </div>
      ),
    },
    {
      id: 'propriete',
      icon: <Copyright className="w-6 h-6 text-purple-500" aria-hidden="true" />,
      title: "4. Propriété intellectuelle",
      content: (
        <p className="text-text2 leading-relaxed">
          Les contenus sont protégés et mis à disposition sous licence <strong>CC BY-NC-ND 4.0</strong>
          {' '}(attribution, pas d&apos;usage commercial, pas de modification). Voir les{' '}
          <a href="/mentions-legales" className="text-teal hover:underline">mentions légales</a>.
        </p>
      ),
    },
    {
      id: 'usage',
      icon: <Ban className="w-6 h-6 text-red-500" aria-hidden="true" />,
      title: "5. Usages interdits",
      content: (
        <ul className="list-disc pl-5 space-y-1.5 text-text2 leading-relaxed">
          <li>Extraire massivement le contenu (scraping automatisé).</li>
          <li>Soumettre de fausses informations à l&apos;annuaire ou usurper une identité professionnelle.</li>
          <li>Tenter de contourner les mesures de sécurité ou d&apos;accès.</li>
          <li>Utiliser le contenu à des fins commerciales sans autorisation.</li>
        </ul>
      ),
    },
    {
      id: 'evolution',
      icon: <RefreshCw className="w-6 h-6 text-teal" aria-hidden="true" />,
      title: "6. Évolution et résiliation",
      content: (
        <p className="text-text2 leading-relaxed">
          NucleAtlas étant en beta, les fonctionnalités et ces CGU peuvent évoluer. Vous pouvez supprimer
          votre compte à tout moment en nous écrivant à{' '}
          <a href="mailto:contact@nucleatlas.org" className="text-teal hover:underline">contact@nucleatlas.org</a>.
        </p>
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
            <FileText className="w-8 h-8 text-text-main" aria-hidden="true" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-text-main sm:text-5xl font-serif mb-6">
            Conditions d&apos;utilisation
          </h1>
          <p className="text-lg text-text2 max-w-2xl mx-auto">
            Les règles d&apos;accès et d&apos;usage de la plateforme NucleAtlas.
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
