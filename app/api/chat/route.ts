import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, articleContext } = await req.json();

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json({ text: "Clé API Gemini manquante." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const systemInstruction = `
      Tu es l'assistant IA de MedNuc Atlas, une encyclopédie de médecine nucléaire.
      Tu réponds aux questions des utilisateurs (médecins ou patients) de manière précise, concise et professionnelle.
      Utilise le contexte de l'article suivant pour répondre si pertinent :
      ${articleContext}
      
      Règles :
      - Reste dans le domaine de la médecine nucléaire et de l'imagerie médicale.
      - Si la question est hors sujet, redirige poliment vers le sujet de l'article.
      - Utilise le format Markdown pour structurer ta réponse (gras, listes).
      - Ne donne pas de conseils médicaux personnels.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ text: "Erreur lors de la génération de la réponse." }, { status: 500 });
  }
}
