import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Article, Category, UserProfile } from '@/lib/data';
import { Sparkles, Loader2, X, CheckCircle2 } from 'lucide-react';

interface AIGeneratorProps {
  onGenerate: (article: Partial<Article>) => void;
  onClose: () => void;
}

const EDITORIAL_PLAN = [
  { cat: 'endocrinologie', catLabel: 'Endocrinologie', title: 'Scintigraphie thyroïdienne (Tc-99m / I-123)' },
  { cat: 'endocrinologie', catLabel: 'Endocrinologie', title: 'Scintigraphie parathyroïdienne (MIBI double phase / Soustraction)' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'TEP-TDM au 18F-FDG : Bilan standard et indications' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'TEP-TDM à la 18F-Choline (Prostate / Parathyroïde)' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'TEP-TDM au 18F/68Ga-PSMA (Cancer de la prostate)' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'TEP-TDM au 68Ga-DOTATOC/DOTATATE (Tumeurs neuroendocrines)' },
  { cat: 'oncologie', catLabel: 'Oncologie', title: 'Scintigraphie osseuse planaire et TEMP/TDM (Bilan d\'extension)' },
  { cat: 'cardiologie', catLabel: 'Cardiologie', title: 'Scintigraphie myocardique de perfusion (Effort / Repos)' },
  { cat: 'cardiologie', catLabel: 'Cardiologie', title: 'Ventriculographie isotopique (Mesure de la FEVG)' },
  { cat: 'cardiologie', catLabel: 'Cardiologie', title: 'Scintigraphie de l\'amylose cardiaque (DPD / HMDP)' },
  { cat: 'neurologie', catLabel: 'Neurologie', title: 'Scintigraphie de perfusion cérébrale (HMPAO / ECD)' },
  { cat: 'neurologie', catLabel: 'Neurologie', title: 'Scintigraphie des transporteurs de la dopamine (DaTscan)' },
  { cat: 'neurologie', catLabel: 'Neurologie', title: 'TEP cérébrale au 18F-FDG (Démences / Épilepsie)' },
  { cat: 'nephro_urologie', catLabel: 'Néphro-Urologie', title: 'Scintigraphie rénale dynamique (MAG3 / DTPA) et test au Captopril/LasiliX' },
  { cat: 'nephro_urologie', catLabel: 'Néphro-Urologie', title: 'Scintigraphie rénale statique (DMSA)' },
  { cat: 'pneumologie', catLabel: 'Pneumologie', title: 'Scintigraphie pulmonaire de ventilation/perfusion (Recherche d\'EP)' },
  { cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie', title: 'Scintigraphie de vidange gastrique (Solide / Liquide)' },
  { cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie', title: 'Recherche de saignement digestif (Hématies marquées)' },
  { cat: 'senologie_gynecologie', catLabel: 'Sénologie / Gynécologie', title: 'Détection du ganglion sentinelle (Cancer du sein / Gynéco / Mélanome)' },
  { cat: 'infection_inflammation', catLabel: 'Infection / Inflammation', title: 'Scintigraphie aux leucocytes marqués' },
  { cat: 'infection_inflammation', catLabel: 'Infection / Inflammation', title: 'TEP-TDM au 18F-FDG (Infection de matériel, Fièvre inexpliquée)' },
  { cat: 'pediatrie', catLabel: 'Pédiatrie', title: 'Spécificités pédiatriques en médecine nucléaire (Sédation, contention)' },
  { cat: 'theranostique', catLabel: 'Théranostique & RIV', title: 'Ira-thérapie (Iode-131) pour hyperthyroïdie (Basedow, nodules toxiques)' },
  { cat: 'theranostique', catLabel: 'Théranostique & RIV', title: 'Traitement par 177Lu-DOTATATE (Lutathera)' },
  { cat: 'theranostique', catLabel: 'Théranostique & RIV', title: 'Traitement par 177Lu-PSMA (Pluvicto)' },
  { cat: 'plateau_technique', catLabel: 'Plateau Technique', title: 'Le générateur Molybdène-99 / Technétium-99m' },
  { cat: 'plateau_technique', catLabel: 'Plateau Technique', title: 'Fonctionnement de la Gamma-caméra (Cristaux NaI, Anger, CZT)' },
  { cat: 'plateau_technique', catLabel: 'Plateau Technique', title: 'Fonctionnement du TEP-TDM et TEP-IRM (Cristaux LSO, BGO, SiPM)' },
  { cat: 'plateau_technique', catLabel: 'Plateau Technique', title: 'Règles de radioprotection du personnel (Zonage, Dosimétrie)' },
  { cat: 'outils_decisionnels', catLabel: 'Outils Décisionnels', title: 'Score de Deauville (Lymphome)' },
  { cat: 'outils_decisionnels', catLabel: 'Outils Décisionnels', title: 'Critères PERCIST (Réponse tumorale en TEP)' }
];

export function AIGenerator({ onGenerate, onClose }: AIGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');

  const generateArticle = async () => {
    const topicToGenerate = customTopic || selectedTopic;
    if (!topicToGenerate) return;

    setIsGenerating(true);
    setProgressText('Initialisation de Gemini 3.1 Pro...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const prompt = `
        Tu es un expert mondial en Médecine Nucléaire.
        Rédige un article encyclopédique complet, extrêmement détaillé, scientifique et professionnel sur le sujet suivant : "${topicToGenerate}".
        Inspire-toi de la qualité et de la structure de l'article "TEP FDG dans le cancer des poumons".
        
        L'article DOIT comporter 3 versions distinctes :
        1. "patient" : Mots simples, explication du déroulement, préparation, durée, rassurance.
        2. "medecin_non_nuc" : Indications, contre-indications, ce qu'il faut écrire sur l'ordonnance, délai des résultats, pertinence par rapport à l'IRM/Scanner.
        3. "medecin_nuc" : Radiopharmaceutique (activité, dosimétrie), protocole d'acquisition, critères d'interprétation, pièges et artefacts.
        
        Chaque version doit avoir au moins 3 à 5 sections détaillées.
        Utilise des infoBox (type: 'info', 'warning', ou 'tip') pour mettre en valeur les points clés.
        Ajoute des listes et des tableaux si pertinent.
        
        Renvoie UNIQUEMENT un objet JSON valide correspondant au schéma demandé.
      `;

      setProgressText('Génération du contenu médical en cours (cela peut prendre jusqu\'à 30 secondes)...');

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Titre complet de l'article" },
              excerpt: { type: Type.STRING, description: "Un résumé court de 2 phrases" },
              tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 mots-clés pertinents" },
              difficulty: { type: Type.STRING, description: "fondamental, intermédiaire, ou avancé" },
              content: {
                type: Type.OBJECT,
                properties: {
                  lead: { type: Type.STRING, description: "Introduction générale commune aux 3 profils" },
                  patient: {
                    type: Type.OBJECT,
                    properties: {
                      sections: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            text: { type: Type.STRING },
                            infoBox: {
                              type: Type.OBJECT,
                              properties: {
                                type: { type: Type.STRING, description: "info, warning, ou tip" },
                                title: { type: Type.STRING },
                                text: { type: Type.STRING }
                              }
                            },
                            list: {
                              type: Type.OBJECT,
                              properties: {
                                title: { type: Type.STRING },
                                items: { type: Type.ARRAY, items: { type: Type.STRING } }
                              }
                            }
                          },
                          required: ["title", "text"]
                        }
                      }
                    }
                  },
                  medecin_non_nuc: {
                    type: Type.OBJECT,
                    properties: {
                      sections: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            text: { type: Type.STRING },
                            infoBox: {
                              type: Type.OBJECT,
                              properties: {
                                type: { type: Type.STRING },
                                title: { type: Type.STRING },
                                text: { type: Type.STRING }
                              }
                            },
                            list: {
                              type: Type.OBJECT,
                              properties: {
                                title: { type: Type.STRING },
                                items: { type: Type.ARRAY, items: { type: Type.STRING } }
                              }
                            }
                          },
                          required: ["title", "text"]
                        }
                      }
                    }
                  },
                  medecin_nuc: {
                    type: Type.OBJECT,
                    properties: {
                      sections: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            text: { type: Type.STRING },
                            infoBox: {
                              type: Type.OBJECT,
                              properties: {
                                type: { type: Type.STRING },
                                title: { type: Type.STRING },
                                text: { type: Type.STRING }
                              }
                            },
                            list: {
                              type: Type.OBJECT,
                              properties: {
                                title: { type: Type.STRING },
                                items: { type: Type.ARRAY, items: { type: Type.STRING } }
                              }
                            }
                          },
                          required: ["title", "text"]
                        }
                      }
                    }
                  }
                }
              }
            },
            required: ["title", "excerpt", "tags", "difficulty", "content"]
          }
        }
      });

      setProgressText('Finalisation et formatage...');
      
      const jsonStr = response.text?.trim() || '{}';
      const generatedData = JSON.parse(jsonStr);
      
      // Find the category from the editorial plan if it matches
      const planItem = EDITORIAL_PLAN.find(item => item.title === topicToGenerate);
      
      const newArticle: Partial<Article> = {
        id: `MN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        cat: (planItem?.cat as Category) || 'generalites',
        catLabel: planItem?.catLabel || 'Généralités',
        title: generatedData.title,
        excerpt: generatedData.excerpt,
        tags: generatedData.tags,
        difficulty: generatedData.difficulty as any,
        content: generatedData.content,
        targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
        authors: ['IA Générative (Gemini 3.1 Pro)', 'Dr. Agboton'],
        sources: []
      };

      onGenerate(newArticle);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la génération IA:", error);
      alert("Une erreur est survenue lors de la génération. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-bg border border-border-main rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg2">
          <div className="flex items-center gap-2 text-teal">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif text-lg text-text-main font-medium">Générateur d&apos;Articles IA</h3>
          </div>
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="p-1 text-text3 hover:text-text-main hover:bg-bg3 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-sm text-text2 mb-6 leading-relaxed">
            Sélectionnez un article de votre plan éditorial ou entrez un sujet personnalisé. 
            L&apos;IA (Gemini 3.1 Pro) rédigera automatiquement un article complet, scientifique et structuré pour les 3 profils (Patient, Médecin prescripteur, Médecin Nucléaire).
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                1. Choisir dans le plan éditorial
              </label>
              <select 
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setCustomTopic('');
                }}
                disabled={isGenerating}
                className="w-full bg-bg3 border border-border-main rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal text-text-main"
              >
                <option value="" className="bg-bg text-text-main">-- Sélectionner un article --</option>
                {EDITORIAL_PLAN.map((item, idx) => (
                  <option key={idx} value={item.title} className="bg-bg text-text-main">
                    [{item.catLabel}] {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border-main"></div>
              <span className="flex-shrink-0 mx-4 text-text3 text-xs uppercase tracking-wider">OU</span>
              <div className="flex-grow border-t border-border-main"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-2">
                2. Sujet personnalisé
              </label>
              <input 
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  setSelectedTopic('');
                }}
                disabled={isGenerating}
                placeholder="Ex: TEP-TDM au 18F-FDG dans le lymphome de Hodgkin..."
                className="w-full bg-bg3 border border-border-main rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal text-text-main"
              />
            </div>
          </div>

          {isGenerating && (
            <div className="mt-8 p-6 bg-teal/5 border border-teal/20 rounded-lg flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-8 h-8 text-teal animate-spin" />
              <div className="space-y-1">
                <p className="text-teal font-medium text-sm">Génération en cours...</p>
                <p className="text-text3 text-xs">{progressText}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border-main bg-bg2 flex justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 text-sm text-text2 hover:text-text-main transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button 
            onClick={generateArticle}
            disabled={isGenerating || (!selectedTopic && !customTopic)}
            className="px-6 py-2 bg-teal text-bg rounded-md text-sm font-medium hover:bg-teal2 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Générer l&apos;article complet
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
