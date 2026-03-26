import React from 'react';
import { PenTool, FileText, CheckCircle, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function ContribuerPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-text-main mb-4">Contribuer à NucleAtlas</h1>
        <p className="text-lg text-text2 max-w-2xl mx-auto">
          Rejoignez notre communauté d&apos;experts et participez à l&apos;enrichissement de la première encyclopédie collaborative de médecine nucléaire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-bg2 border border-border-main rounded-2xl p-8 shadow-sm">
          <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-6">
            <PenTool className="w-6 h-6 text-teal" />
          </div>
          <h2 className="text-2xl font-serif text-text-main mb-4">Pourquoi contribuer ?</h2>
          <ul className="space-y-4 text-text2">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>Partagez votre expertise avec la communauté médicale.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>Aidez à standardiser les connaissances en médecine nucléaire.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>Gagnez en visibilité en tant qu&apos;auteur reconnu sur la plateforme.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>Participez à l&apos;amélioration de la prise en charge des patients.</span>
            </li>
          </ul>
        </div>

        <div className="bg-bg2 border border-border-main rounded-2xl p-8 shadow-sm">
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-2xl font-serif text-text-main mb-4">Comment procéder ?</h2>
          <ol className="space-y-4 text-text2 list-decimal list-inside">
            <li className="pl-2">
              <span className="font-medium text-text-main">Créez un compte</span> Médecin Nucléaire.
            </li>
            <li className="pl-2">
              <span className="font-medium text-text-main">Contactez-nous</span> pour obtenir les droits de contributeur.
            </li>
            <li className="pl-2">
              <span className="font-medium text-text-main">Rédigez</span> votre article via notre éditeur dédié.
            </li>
            <li className="pl-2">
              <span className="font-medium text-text-main">Soumettez</span> votre article pour relecture par le comité scientifique.
            </li>
            <li className="pl-2">
              <span className="font-medium text-text-main">Publication</span> après validation.
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <HeartHandshake className="w-12 h-12 text-teal mx-auto mb-6" />
        <h2 className="text-2xl font-serif text-text-main mb-4">Prêt à nous rejoindre ?</h2>
        <p className="text-text2 mb-8">
          Nous sommes toujours à la recherche de nouveaux talents pour enrichir notre base de connaissances.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact"
            className="px-8 py-3 bg-teal text-bg rounded-xl font-medium hover:bg-teal2 transition-colors w-full sm:w-auto"
          >
            Nous contacter
          </Link>
          <Link 
            href="/mentions-legales"
            className="px-8 py-3 bg-bg3 text-text-main border border-border-main rounded-xl font-medium hover:bg-bg-light transition-colors w-full sm:w-auto"
          >
            Lire la charte
          </Link>
        </div>
      </div>
    </div>
  );
}
