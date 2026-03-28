'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PenTool, BookOpen, Users, ShieldCheck, ArrowRight, FileText, MapPin, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ContribuerPage() {
  const steps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "1. Demander un accès",
      description: "Contactez-nous pour obtenir vos identifiants d'accès à l'interface d'administration sécurisée de Nucleatlas."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "2. Rédiger & Soumettre",
      description: "Utilisez notre éditeur intégré pour rédiger votre article, cas clinique ou mettre à jour les informations de l'annuaire."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "3. Relecture Scientifique",
      description: "Votre soumission est examinée par notre comité scientifique pour garantir la rigueur et l'exactitude médicale."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "4. Publication",
      description: "Une fois validée, votre contribution est publiée et accessible à l'ensemble de la communauté médicale africaine."
    }
  ];

  const types = [
    {
      icon: <FileText className="w-8 h-8 text-teal" />,
      title: "Articles Scientifiques",
      description: "Revues de littérature, protocoles d'imagerie, nouveautés en radiopharmacie ou théranostique."
    },
    {
      icon: <Activity className="w-8 h-8 text-gold" />,
      title: "Cas Cliniques",
      description: "Partagez des cas intéressants, atypiques ou pédagogiques rencontrés dans votre pratique quotidienne."
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Mises à jour de l'Annuaire",
      description: "Aidez-nous à maintenir à jour la liste des centres, des équipements et des spécialistes en Afrique."
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto pb-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-text-main sm:text-5xl font-serif mb-6"
          >
            Contribuer à Nucleatlas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text2 max-w-3xl mx-auto leading-relaxed"
          >
            Nucleatlas est une plateforme collaborative. Votre expertise est précieuse pour construire la plus grande base de connaissances en médecine nucléaire d'Afrique.
          </motion.p>
        </div>

        {/* Types of Contributions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-text-main mb-8 text-center">Ce que vous pouvez partager</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {types.map((type, index) => (
              <div key={index} className="bg-bg2 p-8 rounded-3xl border border-border-main shadow-sm hover:shadow-md transition-shadow text-center group">
                <div className="w-16 h-16 mx-auto bg-bg-main rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">{type.title}</h3>
                <p className="text-text2 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Process */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg2 rounded-3xl border border-border-main p-8 md:p-12 shadow-sm mb-16"
        >
          <h2 className="text-3xl font-bold text-text-main mb-12 text-center">Comment ça marche ?</h2>
          
          <div className="relative">
            {/* Ligne de connexion (visible uniquement sur desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border-main" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-bg-main border-4 border-bg2 rounded-full flex items-center justify-center text-teal shadow-sm mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-3">{step.title}</h3>
                  <p className="text-sm text-text2 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-teal text-white rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden"
        >
          {/* Motif de fond décoratif */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Prêt à partager votre expertise ?</h2>
            <p className="text-teal-50 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté de spécialistes et contribuez à l'évolution de la médecine nucléaire sur le continent.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-teal px-8 py-4 rounded-xl font-bold hover:bg-bg-main transition-colors shadow-sm"
            >
              Demander un accès contributeur
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
