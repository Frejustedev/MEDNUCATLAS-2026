import { GoogleGenAI, Type } from '@google/genai';
import { HttpError, requireEditor } from '@/lib/firebase-admin';
import { rateLimit } from '@/lib/rate-limit';
import { aiGenerateRequestSchema } from '@/lib/schemas';
import { json, parseBody, withErrorHandling } from '@/lib/http';

export const runtime = 'nodejs';
export const maxDuration = 60;

const sectionSchemaProperties = {
  title: { type: Type.STRING },
  text: { type: Type.STRING },
  infoBox: {
    type: Type.OBJECT,
    properties: {
      type: { type: Type.STRING, description: "info, warning ou tip" },
      title: { type: Type.STRING },
      text: { type: Type.STRING },
    },
  },
  list: { type: Type.ARRAY, items: { type: Type.STRING } },
} as const;

function modeSchema() {
  return {
    type: Type.OBJECT,
    properties: {
      sections: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: sectionSchemaProperties,
          required: ['title', 'text'],
        },
      },
    },
  } as const;
}

export const POST = withErrorHandling(async (req: Request) => {
  const ctx = await requireEditor(req);

  const rl = await rateLimit({
    key: `ai:generate:${ctx.uid}`,
    limit: 10,
    windowSec: 3600,
  });
  if (!rl.allowed) {
    throw new HttpError(
      429,
      `Limite IA atteinte. Réessaie après ${new Date(rl.resetAt).toLocaleTimeString('fr-FR')}.`
    );
  }

  const { topic, categoryHint } = await parseBody(req, aiGenerateRequestSchema);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new HttpError(500, 'GEMINI_API_KEY non configurée côté serveur');
  const model = process.env.GEMINI_MODEL_GENERATE || 'gemini-2.5-pro';

  const ai = new GoogleGenAI({ apiKey });

  const prompt = [
    'Tu es un expert mondial en Médecine Nucléaire et radiopharmacie.',
    `Rédige un article encyclopédique complet, scientifique et structuré sur : "${topic.replace(/"/g, '\\"')}".`,
    categoryHint ? `Catégorie suggérée : ${categoryHint}.` : '',
    '',
    "L'article DOIT contenir 3 versions distinctes (mêmes informations, vocabulaire adapté) :",
    "1. patient : mots simples, déroulement, préparation, durée, rassurance, pas de jargon.",
    "2. medecin_non_nuc : indications, contre-indications, libellé d'ordonnance, délai, comparaison IRM/Scanner.",
    "3. medecin_nuc : radiopharmaceutique (activité, dosimétrie), protocole d'acquisition, critères d'interprétation, pièges et artefacts.",
    '',
    'Contraintes :',
    '- Chaque version : 4 à 6 sections.',
    "- Utiliser des infoBox (type info | warning | tip) pour les points clés.",
    '- Ajouter listes et tableaux quand pertinent.',
    '- Sources réelles uniquement (EANM, SNMMI, HAS, INCa).',
    '- Pas de conseils médicaux personnels au patient.',
    '- Réponds UNIQUEMENT au format JSON correspondant au schéma.',
  ]
    .filter(Boolean)
    .join('\n');

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.4,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          excerpt: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          difficulty: { type: Type.STRING, description: 'fondamental, intermédiaire ou avancé' },
          content: {
            type: Type.OBJECT,
            properties: {
              lead: { type: Type.STRING },
              patient: modeSchema(),
              medecin_non_nuc: modeSchema(),
              medecin_nuc: modeSchema(),
            },
            required: ['lead', 'patient', 'medecin_non_nuc', 'medecin_nuc'],
          },
        },
        required: ['title', 'excerpt', 'tags', 'difficulty', 'content'],
      },
    },
  });

  const text = response.text?.trim();
  if (!text) throw new HttpError(502, "Réponse IA vide");

  let generated: unknown;
  try {
    generated = JSON.parse(text);
  } catch {
    throw new HttpError(502, 'Réponse IA non-JSON');
  }

  return json({
    generated,
    rate: { remaining: rl.remaining, resetAt: rl.resetAt },
  });
});
