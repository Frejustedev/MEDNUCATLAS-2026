'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Scale, Server, ShieldAlert, Copyright, Building, Mail } from 'lucide-react';

export default function MentionsLegalesPage() {
  const sections = [
    {
      id: 'editeur',
      icon: <Building className="w-6 h-6 text-teal" />,
      title: "1. Éditeur du site",
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>Le site <strong>Nucleatlas</strong> (ci-après "le Site") est édité et géré par :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Propriétaire et Directeur de la publication :</strong> Dr. Fréjuste Agboton</li>
            <li><strong>Société éditrice :</strong> NucleaTech Solutions (en cours d'immatriculation)</li>
            <li><strong>Objet social :</strong> Création de solutions numériques et digitales pour la santé</li>
            <li><strong>Contact :</strong> <a href="mailto:contact@nucleatlas.org" className="text-teal hover:underline">contact@nucleatlas.org</a></li>
          </ul>
        </div>
      )
    },
    {
      id: 'hebergement',
      icon: <Server className="w-6 h-6 text-blue-500" />,
      title: "2. Hébergement",
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>Le Site est hébergé par :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Hébergeur :</strong> Google Cloud Platform (GCP) / Firebase</li>
            <li><strong>Société :</strong> Google Ireland Limited</li>
            <li><strong>Adresse :</strong> Gordon House, Barrow Street, Dublin 4, Irlande</li>
          </ul>
          <p>Les données sont stockées sur des serveurs sécurisés, conformément aux normes internationales de sécurité et de protection des données.</p>
        </div>
      )
    },
    {
      id: 'avertissement',
      icon: <ShieldAlert className="w-6 h-6 text-gold" />,
      title: "3. Avertissement Médical (Disclaimer)",
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p className="font-semibold text-text-main">Le contenu de ce site a un but purement informatif, éducatif et collaboratif, destiné principalement aux professionnels de santé.</p>
          <p>Les informations, articles, cas cliniques et données de l'annuaire publiés sur Nucleatlas <strong>ne remplacent en aucun cas une consultation médicale, un diagnostic ou l'avis d'un médecin spécialiste</strong>.</p>
          <p>Une partie des contenus est rédigée avec l'assistance d'une intelligence artificielle ; le statut de relecture médicale (assisté par IA, ou relu et validé par un médecin) est indiqué de manière transparente sur chaque article. L'éditeur (Dr. Fréjuste Agboton / NucleaTech Solutions) décline toute responsabilité quant aux conséquences directes ou indirectes pouvant résulter de l'utilisation ou de l'interprétation des informations fournies sur ce site.</p>
          <p>Les patients visitant ce site sont invités à toujours consulter leur médecin traitant ou un spécialiste pour toute question relative à leur santé ou à un traitement.</p>
        </div>
      )
    },
    {
      id: 'propriete',
      icon: <Copyright className="w-6 h-6 text-purple-500" />,
      title: "4. Propriété Intellectuelle et Droits d'Auteur",
      content: (
        <div className="space-y-3 text-text2 leading-relaxed">
          <p>L'ensemble des contenus (textes, articles, illustrations, architecture du site) publiés sur Nucleatlas est protégé par le droit de la propriété intellectuelle.</p>
          <p>Sauf mention contraire, les articles et contenus pédagogiques sont mis à disposition selon les termes de la licence <strong>Creative Commons Attribution - Pas d'Utilisation Commerciale - Pas de Modification 4.0 International (CC BY-NC-ND 4.0)</strong>.</p>
          <div className="bg-bg-main p-4 rounded-xl border border-border-main mt-4">
            <h4 className="font-semibold text-text-main mb-2">Cela signifie que vous êtes autorisé à :</h4>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Partager :</strong> copier, distribuer et communiquer le matériel par tous moyens et sous tous formats.</li>
            </ul>
            <h4 className="font-semibold text-text-main mb-2">Selon les conditions suivantes :</h4>
            <ul className="list-disc pl-5">
              <li><strong>Attribution :</strong> Vous devez créditer l'auteur (ex: Dr. Fréjuste Agboton / Nucleatlas), intégrer un lien vers la licence et indiquer si des modifications ont été effectuées.</li>
              <li><strong>Pas d'Utilisation Commerciale :</strong> Vous n'êtes pas autorisé à faire un usage commercial de ce contenu.</li>
              <li><strong>Pas de modifications :</strong> Si vous remixez, transformez ou créez à partir du matériel fourni, vous n'êtes pas autorisé à distribuer le matériel modifié sans accord préalable.</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pb-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-bg2 border border-border-main rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
          >
            <Scale className="w-8 h-8 text-text-main" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-text-main sm:text-5xl font-serif mb-6"
          >
            Mentions Légales
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text2 max-w-2xl mx-auto"
          >
            Informations juridiques, conditions d'utilisation et politique de responsabilité de la plateforme Nucleatlas.
          </motion.p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-bg2 rounded-3xl border border-border-main p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border-main">
                <div className="p-3 bg-bg-main rounded-xl border border-border-main">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-text-main">{section.title}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-sm text-text3"
        >
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </motion.div>

      </div>
    </div>
  );
}
