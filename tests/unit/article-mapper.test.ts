import { describe, it, expect } from 'vitest';
import { articleFromDocData } from '../../lib/article-mapper';

describe('articleFromDocData', () => {
  it('parse un content stocké en JSON string', () => {
    const content = {
      lead: 'L',
      patient: { sections: [{ title: 'T' }] },
      medecin_non_nuc: { sections: [] },
      medecin_nuc: { sections: [] },
    };
    const a = articleFromDocData({ id: 'X1', cat: 'oncologie', title: 'Titre', content: JSON.stringify(content) });
    expect(a.content.lead).toBe('L');
    expect(a.content.patient.sections[0].title).toBe('T');
  });

  it('accepte un content déjà en objet', () => {
    const content = {
      lead: 'Z',
      patient: { sections: [] },
      medecin_non_nuc: { sections: [] },
      medecin_nuc: { sections: [] },
    };
    const a = articleFromDocData({ id: 'X2', cat: 'c', title: 't', content });
    expect(a.content.lead).toBe('Z');
  });

  it('retombe sur un content vide si le JSON est invalide', () => {
    const a = articleFromDocData({ id: 'X3', cat: 'c', title: 't', content: '{invalide' });
    expect(a.content.lead).toBe('');
    expect(a.content.patient.sections).toEqual([]);
  });

  it('applique les valeurs par défaut (reviewStatus, difficulty, targetAudience)', () => {
    const a = articleFromDocData({ id: 'X4', cat: 'c', title: 't', content: '{}' });
    expect(a.reviewStatus).toBe('ai_assisted');
    expect(a.difficulty).toBe('fondamental');
    expect(a.targetAudience).toContain('patient');
  });
});
