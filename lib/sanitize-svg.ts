/**
 * Sanitiseur SVG isomorphe sans dépendance (s'exécute serveur ET client).
 * Les figures proviennent de sources contrôlées (seed + admin authentifié) ;
 * on retire par prudence script, foreignObject, handlers inline et URLs
 * javascript: avant toute insertion via dangerouslySetInnerHTML.
 */
export function sanitizeSvg(svg: string): string {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|xlink:href)\s*=\s*("\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, '');
}
