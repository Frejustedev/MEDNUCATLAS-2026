import React from 'react';
import { ArticleView } from '@/components/ArticleView';
import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: `${data.title} | NucleAtlas`,
        description: data.excerpt || `Découvrez l'article ${data.title} sur NucleAtlas, l'encyclopédie de médecine nucléaire.`,
        openGraph: {
          title: data.title,
          description: data.excerpt,
          type: 'article',
        }
      };
    }
  } catch (error) {
    console.error("Error fetching article metadata:", error);
  }
  
  return {
    title: 'Article | NucleAtlas',
    description: 'Article sur NucleAtlas, l\'encyclopédie collaborative de médecine nucléaire.'
  };
}

export default function ArticlePage() {
  return <ArticleView />;
}
