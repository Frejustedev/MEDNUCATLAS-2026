import { describe, it, expect } from 'vitest';
import { articleSchema } from '../../lib/schemas';

const validArticle = {
  id: 'TEST_1',
  cat: 'oncologie',
  title: 'Article de test',
  content: {
    lead: 'x',
    patient: { sections: [] },
    medecin_non_nuc: { sections: [] },
    medecin_nuc: { sections: [] },
  },
};

describe('articleSchema', () => {
  it('valide un article correct', () => {
    expect(articleSchema.safeParse(validArticle).success).toBe(true);
  });

  it('rejette un id avec caractères interdits', () => {
    expect(articleSchema.safeParse({ ...validArticle, id: 'bad id!' }).success).toBe(false);
  });

  it('rejette un titre trop court', () => {
    expect(articleSchema.safeParse({ ...validArticle, title: 'ab' }).success).toBe(false);
  });

  it('rejette un reviewStatus invalide', () => {
    expect(articleSchema.safeParse({ ...validArticle, reviewStatus: 'published' }).success).toBe(false);
  });
});
