/**
 * Sanitiseur SVG isomorphe sans dépendance (s'exécute serveur ET client).
 *
 * Défense en PROFONDEUR : les figures proviennent normalement de sources
 * contrôlées (seed + pipeline de génération), mais un éditeur (rôle medecin_nuc,
 * accordé sur demande) peut aussi enregistrer une figure. Le SVG étant inséré via
 * dangerouslySetInnerHTML dans des pages publiques, on neutralise ici les
 * vecteurs XSS avant insertion.
 *
 * ⚠️ Un nettoyage par expressions régulières ne peut pas être garanti bulletproof
 * face à un HTML/SVG malformé. La correction DÉFINITIVE est une bibliothèque de
 * parsing éprouvée (isomorphic-dompurify avec USE_PROFILES {svg,svgFilters}) ;
 * cette fonction ferme les contournements connus en attendant cette migration.
 */
export function sanitizeSvg(svg: string): string {
  if (typeof svg !== 'string') return '';
  let out = svg;

  // 1) Blocs script / foreignObject complets (insensible à la casse, multi-ligne).
  out = out.replace(/<script[\s\S]*?<\/script\s*>/gi, '');
  out = out.replace(/<foreignObject[\s\S]*?<\/foreignObject\s*>/gi, '');

  // 2) Balises jamais légitimes dans une figure statique, y compris mal fermées
  //    ou isolées (une balise ouvrante orpheline suffit à injecter). On NE retire
  //    PAS <use>/<a> (références internes légitimes) : leurs URLs dangereuses sont
  //    neutralisées à l'étape 4.
  out = out.replace(
    /<\/?(?:script|foreignObject|iframe|embed|object|handler|set)\b[^>]*>/gi,
    ''
  );

  // 3) Gestionnaires d'événements inline (onload=, onclick=…), quelle que soit la
  //    frontière avant l'attribut — ESPACE ou « / » (contournement <svg/onload=…>).
  //    On conserve la frontière capturée pour ne pas coller les attributs voisins.
  out = out.replace(
    /([\s/])on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|`[^`]*`|[^\s>]*)/gi,
    '$1'
  );

  // 4) URLs à schéma dangereux dans href/xlink:href/src. On normalise la valeur
  //    (retrait des entités HTML, espaces et caractères de contrôle qui masquent
  //    le schéma, ex. « java\nscript: » ou « &#106;avascript: ») avant de tester.
  out = out.replace(
    /\b(?:xlink:href|href|src)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
    (match, value: string) => {
      const raw = value.replace(/^['"]|['"]$/g, '');
      // On DÉCODE les entités numériques (le navigateur le fera), puis on retire
      // espaces/contrôles, avant de tester le schéma. Décoder plutôt que
      // supprimer : « &#106;avascript: » vaut « javascript: » pour le navigateur.
      const decodeEnt = (c: number) =>
        c > 0 && c <= 0x10ffff ? String.fromCodePoint(c) : '';
      const norm = raw
        .replace(/&#x([0-9a-f]+);?/gi, (_m, h: string) => decodeEnt(parseInt(h, 16)))
        .replace(/&#([0-9]+);?/g, (_m, d: string) => decodeEnt(parseInt(d, 10)))
        .replace(/[\s\x00-\x1f]+/g, '')
        .toLowerCase();
      return /^(?:javascript|vbscript|data):/.test(norm) ? '' : match;
    }
  );

  // 5) style="..." contenant expression(...) ou url(javascript:/vbscript:/data:).
  out = out.replace(/style\s*=\s*("[^"]*"|'[^']*')/gi, (match) =>
    /expression\s*\(|url\s*\(\s*['"]?\s*(?:javascript|vbscript|data):/i.test(match)
      ? ''
      : match
  );

  return out;
}
