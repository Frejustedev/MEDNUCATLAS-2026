import { describe, it, expect } from 'vitest';
import { getAllowedAudiences } from '../../lib/data';

// Le filtre d'audience était impliqué dans le bug « 0 article » : on verrouille
// son comportement pour chaque profil.
describe('getAllowedAudiences', () => {
  it('admin voit les trois audiences', () => {
    expect(getAllowedAudiences('admin')).toEqual(['patient', 'medecin_non_nuc', 'medecin_nuc']);
  });

  it('medecin_nuc voit les trois audiences', () => {
    expect(getAllowedAudiences('medecin_nuc')).toEqual(['patient', 'medecin_non_nuc', 'medecin_nuc']);
  });

  it('medecin_non_nuc voit patient + medecin_non_nuc', () => {
    expect(getAllowedAudiences('medecin_non_nuc')).toEqual(['patient', 'medecin_non_nuc']);
  });

  it('patient ne voit que patient', () => {
    expect(getAllowedAudiences('patient')).toEqual(['patient']);
  });

  it('profil inconnu retombe sur patient (jamais une liste vide)', () => {
    const res = getAllowedAudiences('inconnu');
    expect(res.length).toBeGreaterThan(0);
    expect(res).toContain('patient');
  });
});
