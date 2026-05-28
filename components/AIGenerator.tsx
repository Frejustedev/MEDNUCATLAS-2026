'use client';

import React, { useState } from 'react';
import { Article, Category } from '@/lib/data';
import { Sparkles, Loader2, X } from 'lucide-react';
import { apiFetch, ApiError } from '@/lib/api-client';

interface AIGeneratorProps {
  onGenerate: (article: Partial<Article>) => void;
  onClose: () => void;
}

type GeneratedArticle = {
  title: string;
  excerpt: string;
  tags: string[];
  difficulty: string;
  content: Article['content'];
};

type GenerateResponse = {
  generated: GeneratedArticle;
  rate: { remaining: number; resetAt: number };
};

const EDITORIAL_PLAN: { cat: Category; catLabel: string; title: string }[] = [
  { cat: 'endocrinologie', catLabel: 'Endocrinologie', title: 'Scintigraphie thyroïdienne (Tc-99m / I-123)' },
  { cat: 'endocrinologie', catLabel: 'Endocrinologie', title: 'Scintigraphie parathyroïdienne (MIBI double phase / Soustraction)' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'TEP-TDM au 18F-FDG : Bilan standard et indications' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'TEP-TDM à la 18F-Choline (Prostate / Parathyroïde)' },
  { cat: 'prostate', catLabel: 'Cancer de la Prostate', title: 'TEP-TDM au 18F/68Ga-PSMA (Cancer de la prostate)' },
  { cat: 'tne', catLabel: 'Tumeurs Neuroendocrines', title: 'TEP-TDM au 68Ga-DOTATOC/DOTATATE (Tumeurs neuroendocrines)' },
  { cat: 'rhumatologie', catLabel: 'Rhumatologie & Os', title: "Scintigraphie osseuse planaire et TEMP/TDM (Bilan d'extension)" },
  { cat: 'cardiologie', catLabel: 'Cardiologie', title: 'Scintigraphie myocardique de perfusion (Effort / Repos)' },
  { cat: 'cardiologie', catLabel: 'Cardiologie', title: 'Ventriculographie isotopique (Mesure de la FEVG)' },
  { cat: 'cardiologie', catLabel: 'Cardiologie', title: "Scintigraphie de l'amylose cardiaque (DPD / HMDP)" },
  { cat: 'neurologie', catLabel: 'Neurologie', title: 'Scintigraphie de perfusion cérébrale (HMPAO / ECD)' },
  { cat: 'neurologie', catLabel: 'Neurologie', title: 'Scintigraphie des transporteurs de la dopamine (DaTscan)' },
  { cat: 'neurologie', catLabel: 'Neurologie', title: 'TEP cérébrale au 18F-FDG (Démences / Épilepsie)' },
  { cat: 'nephro_urologie', catLabel: 'Néphro-Urologie', title: 'Scintigraphie rénale dynamique (MAG3 / DTPA) et test au Captopril/LasiliX' },
  { cat: 'nephro_urologie', catLabel: 'Néphro-Urologie', title: 'Scintigraphie rénale statique (DMSA)' },
  { cat: 'pneumologie', catLabel: 'Pneumologie', title: "Scintigraphie pulmonaire de ventilation/perfusion (Recherche d'EP)" },
  { cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie', title: 'Scintigraphie de vidange gastrique (Solide / Liquide)' },
  { cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie', title: 'Recherche de saignement digestif (Hématies marquées)' },
  { cat: 'senologie_gynecologie', catLabel: 'Sénologie & Gynécologie', title: 'Détection du ganglion sentinelle (Cancer du sein / Gynéco)' },
  { cat: 'dermatologie_melanome', catLabel: 'Dermatologie & Mélanome', title: 'Détection du ganglion sentinelle (Mélanome)' },
  { cat: 'infection_inflammation', catLabel: 'Infection & Inflammation', title: 'Scintigraphie aux leucocytes marqués' },
  { cat: 'infection_inflammation', catLabel: 'Infection & Inflammation', title: 'TEP-TDM au 18F-FDG (Infection de matériel, Fièvre inexpliquée)' },
  { cat: 'pediatrie', catLabel: 'Pédiatrie', title: 'Spécificités pédiatriques en médecine nucléaire (Sédation, contention)' },
  { cat: 'theranostique_thyroide', catLabel: 'Pathologies Thyroïdiennes', title: 'Ira-thérapie (Iode-131) pour hyperthyroïdie (Basedow, nodules toxiques)' },
  { cat: 'tne', catLabel: 'Tumeurs Neuroendocrines', title: 'Traitement par 177Lu-DOTATATE (Lutathera)' },
  { cat: 'prostate', catLabel: 'Cancer de la Prostate', title: 'Traitement par 177Lu-PSMA (Pluvicto)' },
  { cat: 'instrumentation', catLabel: 'Instrumentation', title: 'Le générateur Molybdène-99 / Technétium-99m' },
  { cat: 'instrumentation', catLabel: 'Instrumentation', title: 'Fonctionnement de la Gamma-caméra (Cristaux NaI, Anger, CZT)' },
  { cat: 'instrumentation', catLabel: 'Instrumentation', title: 'Fonctionnement du TEP-TDM et TEP-IRM (Cristaux LSO, BGO, SiPM)' },
  { cat: 'radioprotection', catLabel: 'Radioprotection', title: 'Règles de radioprotection du personnel (Zonage, Dosimétrie)' },
  { cat: 'scores', catLabel: 'Scores & Classifications', title: 'Score de Deauville (Lymphome)' },
  { cat: 'scores', catLabel: 'Scores & Classifications', title: 'Critères PERCIST (Réponse tumorale en TEP)' },
];

function safeArticleId(seed: string) {
  // ID lisible et déterministe sur le sujet, avec suffixe aléatoire court
  const slug = seed
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32);
  const rand = (typeof crypto !== 'undefined' ? crypto.randomUUID().slice(0, 6) : Math.random().toString(36).slice(2, 8)).toUpperCase();
  return `MN_${slug || 'article'}_${rand}`;
}

export function AIGenerator({ onGenerate, onClose }: AIGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  const generateArticle = async () => {
    const topicToGenerate = customTopic || selectedTopic;
    if (!topicToGenerate) return;

    setIsGenerating(true);
    setErrorText('');
    setProgressText('Demande envoyée au serveur IA…');

    try {
      const planItem = EDITORIAL_PLAN.find((item) => item.title === topicToGenerate);

      const data = await apiFetch<GenerateResponse>('/api/ai/generate', {
        method: 'POST',
        body: JSON.stringify({
          topic: topicToGenerate,
          categoryHint: planItem?.cat,
        }),
      });

      const generated = data.generated;
      const difficulty = (['fondamental', 'intermédiaire', 'avancé'] as const).find(
        (d) => d === generated.difficulty
      ) ?? 'fondamental';

      const newArticle: Partial<Article> = {
        id: safeArticleId(topicToGenerate),
        cat: planItem?.cat ?? 'generalites',
        catLabel: planItem?.catLabel ?? 'Généralités',
        title: generated.title,
        excerpt: generated.excerpt,
        tags: Array.isArray(generated.tags) ? generated.tags.slice(0, 20) : [],
        difficulty,
        content: generated.content,
        targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
        authors: ['IA Générative', 'Édition NucleAtlas'],
        sources: [],
      };

      onGenerate(newArticle);
      onClose();
    } catch (error) {
      const msg = error instanceof ApiError ? error.message : 'Une erreur est survenue lors de la génération.';
      setErrorText(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-gen-title"
    >
      <div className="bg-bg border border-border-main rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg2">
          <div className="flex items-center gap-2 text-teal">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            <h3 id="ai-gen-title" className="font-serif text-lg text-text-main font-medium">
              Générateur d&apos;Articles IA
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            aria-label="Fermer le générateur"
            className="p-1 text-text3 hover:text-text-main hover:bg-bg3 rounded transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-sm text-text2 mb-6 leading-relaxed">
            Sélectionne un sujet dans le plan éditorial ou tape un sujet personnalisé. L&apos;IA
            rédigera un article complet, scientifique et structuré pour les 3 profils (Patient,
            Médecin prescripteur, Médecin Nucléaire). La génération est journalisée et limitée à 10
            articles par heure.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="editorial-plan" className="block text-sm font-medium text-text-main mb-2">
                1. Choisir dans le plan éditorial
              </label>
              <select
                id="editorial-plan"
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setCustomTopic('');
                }}
                disabled={isGenerating}
                className="w-full bg-bg3 border border-border-main rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 text-text-main"
              >
                <option value="" className="bg-bg text-text-main">
                  -- Sélectionner un article --
                </option>
                {EDITORIAL_PLAN.map((item, idx) => (
                  <option key={idx} value={item.title} className="bg-bg text-text-main">
                    [{item.catLabel}] {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center py-2" aria-hidden="true">
              <div className="flex-grow border-t border-border-main"></div>
              <span className="flex-shrink-0 mx-4 text-text3 text-xs uppercase tracking-wider">OU</span>
              <div className="flex-grow border-t border-border-main"></div>
            </div>

            <div>
              <label htmlFor="custom-topic" className="block text-sm font-medium text-text-main mb-2">
                2. Sujet personnalisé
              </label>
              <input
                id="custom-topic"
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  setSelectedTopic('');
                }}
                disabled={isGenerating}
                placeholder="Ex: TEP-TDM au 18F-FDG dans le lymphome de Hodgkin…"
                className="w-full bg-bg3 border border-border-main rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 text-text-main"
              />
            </div>
          </div>

          {errorText && (
            <div role="alert" className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
              {errorText}
            </div>
          )}

          {isGenerating && (
            <div
              className="mt-8 p-6 bg-teal/5 border border-teal/20 rounded-lg flex flex-col items-center justify-center text-center space-y-4"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="w-8 h-8 text-teal animate-spin" aria-hidden="true" />
              <div className="space-y-1">
                <p className="text-teal font-medium text-sm">Génération en cours…</p>
                <p className="text-text3 text-xs">{progressText}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border-main bg-bg2 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 text-sm text-text2 hover:text-text-main transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal rounded-md"
          >
            Annuler
          </button>
          <button
            onClick={generateArticle}
            disabled={isGenerating || (!selectedTopic && !customTopic)}
            className="px-6 py-2 bg-teal text-bg rounded-md text-sm font-medium hover:bg-teal2 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Génération…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Générer l&apos;article complet
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
