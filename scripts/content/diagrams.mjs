// Bibliothèque de schémas vectoriels médicaux originaux pour NucleAtlas.
// Conventions : structure en currentColor (s'adapte au thème), accents en hex
// lisibles sur fond clair ET sombre. Aucune balise <script>/<style> (sanitisé).

const TEAL = '#14b8a6';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const BLUE = '#3b82f6';
const PURPLE = '#8b5cf6';

// ── Mécanisme de captation du 18F-FDG ───────────────────────────────────────
export const FDG_UPTAKE = `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="600" height="300">
  <rect x="150" y="55" width="420" height="205" rx="26" fill="${TEAL}" fill-opacity="0.06" stroke="${TEAL}" stroke-width="2"/>
  <text x="360" y="82" text-anchor="middle" font-size="13" fill="currentColor" opacity="0.75">Cellule tumorale — métabolisme du glucose accéléré</text>

  <circle cx="55" cy="150" r="26" fill="${TEAL}" fill-opacity="0.18" stroke="${TEAL}" stroke-width="2"/>
  <text x="55" y="146" text-anchor="middle" font-size="12" fill="currentColor">¹⁸F</text>
  <text x="55" y="160" text-anchor="middle" font-size="11" fill="currentColor">FDG</text>

  <rect x="138" y="110" width="24" height="80" rx="6" fill="currentColor" opacity="0.12"/>
  <rect x="150" y="120" width="14" height="60" rx="4" fill="${BLUE}" fill-opacity="0.5"/>
  <text x="156" y="208" text-anchor="middle" font-size="11" fill="${BLUE}">GLUT-1/3</text>

  <line x1="85" y1="150" x2="135" y2="150" stroke="currentColor" stroke-width="2"/>
  <polygon points="135,150 126,145 126,155" fill="currentColor"/>

  <line x1="200" y1="150" x2="250" y2="150" stroke="currentColor" stroke-width="2"/>
  <polygon points="250,150 241,145 241,155" fill="currentColor"/>
  <text x="225" y="140" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">entrée</text>

  <rect x="255" y="125" width="120" height="50" rx="10" fill="${AMBER}" fill-opacity="0.12" stroke="${AMBER}" stroke-width="1.5"/>
  <text x="315" y="148" text-anchor="middle" font-size="12" fill="currentColor">Hexokinase</text>
  <text x="315" y="164" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">phosphorylation</text>

  <line x1="375" y1="150" x2="425" y2="150" stroke="currentColor" stroke-width="2"/>
  <polygon points="425,150 416,145 416,155" fill="currentColor"/>

  <rect x="430" y="118" width="120" height="64" rx="10" fill="${RED}" fill-opacity="0.10" stroke="${RED}" stroke-width="1.5"/>
  <text x="490" y="142" text-anchor="middle" font-size="12" fill="currentColor">FDG-6-phosphate</text>
  <text x="490" y="160" text-anchor="middle" font-size="11" fill="${RED}">piégé ✦</text>
  <text x="490" y="174" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.7">non métabolisé</text>

  <text x="360" y="245" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">Le FDG-6-P s'accumule proportionnellement à la consommation de glucose → signal TEP</text>
</svg>`;

// ── Détection en coïncidence (TEP) ──────────────────────────────────────────
export const PET_COINCIDENCE = `
<svg viewBox="0 0 600 330" xmlns="http://www.w3.org/2000/svg" width="600" height="330">
  <circle cx="300" cy="165" r="135" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35"/>
  <circle cx="300" cy="165" r="108" fill="none" stroke="currentColor" stroke-width="10" opacity="0.10"/>
  <text x="300" y="40" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">Couronne de détecteurs</text>

  <circle cx="300" cy="165" r="6" fill="${TEAL}"/>
  <text x="300" y="150" text-anchor="middle" font-size="11" fill="currentColor">noyau ¹⁸F</text>

  <line x1="300" y1="165" x2="338" y2="150" stroke="${AMBER}" stroke-width="2" stroke-dasharray="3 3"/>
  <circle cx="342" cy="149" r="5" fill="${AMBER}"/>
  <text x="372" y="138" text-anchor="middle" font-size="10" fill="${AMBER}">e⁺ (β⁺)</text>

  <circle cx="342" cy="149" r="11" fill="none" stroke="${RED}" stroke-width="1.5"/>
  <text x="342" y="184" text-anchor="middle" font-size="10" fill="${RED}">annihilation</text>

  <line x1="342" y1="149" x2="438" y2="78" stroke="${RED}" stroke-width="2"/>
  <polygon points="438,78 427,80 433,89" fill="${RED}"/>
  <line x1="342" y1="149" x2="246" y2="220" stroke="${RED}" stroke-width="2"/>
  <polygon points="246,220 257,218 251,209" fill="${RED}"/>
  <text x="470" y="74" text-anchor="middle" font-size="11" fill="currentColor">γ 511 keV</text>
  <text x="210" y="232" text-anchor="middle" font-size="11" fill="currentColor">γ 511 keV</text>

  <rect x="432" y="62" width="26" height="26" rx="4" fill="${TEAL}" fill-opacity="0.25" stroke="${TEAL}" stroke-width="1.5"/>
  <rect x="234" y="208" width="26" height="26" rx="4" fill="${TEAL}" fill-opacity="0.25" stroke="${TEAL}" stroke-width="1.5"/>

  <text x="300" y="300" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Deux photons émis à 180° et détectés simultanément (fenêtre ~ ns) → ligne de réponse</text>
  <text x="300" y="318" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.6">La localisation se fait par recoupement de millions de lignes de réponse</text>
</svg>`;

// ── Liaison ligand-PSMA (théranostique prostate) ────────────────────────────
export const PSMA_BINDING = `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="600" height="300">
  <rect x="60" y="150" width="480" height="110" rx="14" fill="${PURPLE}" fill-opacity="0.06" stroke="${PURPLE}" stroke-width="2"/>
  <text x="300" y="240" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.75">Cellule de cancer prostatique</text>

  <line x1="60" y1="150" x2="540" y2="150" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <line x1="60" y1="156" x2="540" y2="156" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <text x="300" y="178" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.55">membrane plasmique</text>

  <rect x="280" y="120" width="40" height="60" rx="6" fill="${PURPLE}" fill-opacity="0.3" stroke="${PURPLE}" stroke-width="1.5"/>
  <text x="300" y="112" text-anchor="middle" font-size="12" fill="currentColor">PSMA</text>
  <text x="300" y="200" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.6">domaine intracellulaire</text>

  <circle cx="300" cy="92" r="14" fill="${TEAL}" fill-opacity="0.2" stroke="${TEAL}" stroke-width="2"/>
  <text x="300" y="96" text-anchor="middle" font-size="10" fill="currentColor">ligand</text>
  <line x1="300" y1="106" x2="300" y2="120" stroke="${TEAL}" stroke-width="2"/>

  <circle cx="300" cy="58" r="16" fill="${AMBER}" fill-opacity="0.25" stroke="${AMBER}" stroke-width="2"/>
  <text x="300" y="55" text-anchor="middle" font-size="10" fill="currentColor">⁶⁸Ga</text>
  <text x="300" y="68" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.7">¹⁷⁷Lu</text>
  <line x1="300" y1="74" x2="300" y2="80" stroke="${AMBER}" stroke-width="2"/>

  <text x="470" y="58" font-size="11" fill="currentColor" opacity="0.8">⁶⁸Ga → diagnostic (TEP)</text>
  <text x="470" y="92" font-size="11" fill="currentColor" opacity="0.8">¹⁷⁷Lu → thérapie (RLT)</text>
  <text x="300" y="285" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.6">Surexpression de PSMA → cible idéale pour imager ET traiter (« théranostique »)</text>
</svg>`;

// ── Protocole effort/repos (scintigraphie myocardique) ──────────────────────
export const MPI_PROTOCOL = `
<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" width="600" height="250">
  <text x="20" y="40" font-size="13" fill="${RED}">Épreuve d'effort / stress</text>
  <line x1="20" y1="60" x2="560" y2="60" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <circle cx="120" cy="60" r="7" fill="${RED}"/>
  <text x="120" y="86" text-anchor="middle" font-size="10" fill="currentColor">injection au pic</text>
  <rect x="360" y="48" width="150" height="24" rx="6" fill="${TEAL}" fill-opacity="0.2" stroke="${TEAL}" stroke-width="1.5"/>
  <text x="435" y="64" text-anchor="middle" font-size="11" fill="currentColor">acquisition</text>
  <text x="240" y="52" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.65">délai 15–60 min</text>

  <text x="20" y="150" font-size="13" fill="${BLUE}">Repos</text>
  <line x1="20" y1="170" x2="560" y2="170" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <circle cx="120" cy="170" r="7" fill="${BLUE}"/>
  <text x="120" y="196" text-anchor="middle" font-size="10" fill="currentColor">injection au repos</text>
  <rect x="360" y="158" width="150" height="24" rx="6" fill="${TEAL}" fill-opacity="0.2" stroke="${TEAL}" stroke-width="1.5"/>
  <text x="435" y="174" text-anchor="middle" font-size="11" fill="currentColor">acquisition</text>

  <text x="300" y="232" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">Comparaison effort vs repos : différencie ischémie réversible et nécrose fixée</text>
</svg>`;

// ── Cible « bull's-eye » 17 segments (modèle AHA) ───────────────────────────
export const BULLSEYE_17 = `
<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" width="320" height="320">
  <circle cx="160" cy="160" r="150" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
  <circle cx="160" cy="160" r="100" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
  <circle cx="160" cy="160" r="50" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
  <circle cx="160" cy="160" r="22" fill="${TEAL}" fill-opacity="0.18" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
  <line x1="160" y1="10" x2="160" y2="50" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <line x1="160" y1="270" x2="160" y2="310" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <line x1="290" y1="85" x2="247" y2="110" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <line x1="30" y1="85" x2="73" y2="110" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <line x1="290" y1="235" x2="247" y2="210" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <line x1="30" y1="235" x2="73" y2="210" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <text x="160" y="32" text-anchor="middle" font-size="11" fill="${RED}">Antérieur (IVA)</text>
  <text x="285" y="165" text-anchor="middle" font-size="11" fill="${PURPLE}">Latéral</text>
  <text x="280" y="178" text-anchor="middle" font-size="10" fill="${PURPLE}">(Cx)</text>
  <text x="160" y="298" text-anchor="middle" font-size="11" fill="${BLUE}">Inférieur (CD)</text>
  <text x="42" y="165" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.75">Septal</text>
  <text x="160" y="164" text-anchor="middle" font-size="10" fill="currentColor">apex</text>
  <text x="160" y="316" text-anchor="middle" font-size="9" fill="currentColor" opacity="0">.</text>
</svg>`;

// ── Générateur 99Mo / 99mTc ─────────────────────────────────────────────────
export const TC_GENERATOR = `
<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" width="560" height="320">
  <rect x="210" y="70" width="120" height="190" rx="10" fill="currentColor" opacity="0.06" stroke="currentColor" stroke-width="2"/>
  <text x="270" y="58" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">Blindage plomb</text>

  <rect x="245" y="95" width="50" height="140" rx="8" fill="${AMBER}" fill-opacity="0.12" stroke="${AMBER}" stroke-width="1.5"/>
  <text x="270" y="120" text-anchor="middle" font-size="10" fill="currentColor">colonne</text>
  <text x="270" y="134" text-anchor="middle" font-size="10" fill="currentColor">alumine</text>
  <circle cx="262" cy="160" r="4" fill="${RED}"/>
  <circle cx="278" cy="172" r="4" fill="${RED}"/>
  <circle cx="266" cy="188" r="4" fill="${RED}"/>
  <text x="270" y="218" text-anchor="middle" font-size="10" fill="${RED}">⁹⁹Mo adsorbé</text>

  <rect x="40" y="60" width="90" height="55" rx="8" fill="${BLUE}" fill-opacity="0.12" stroke="${BLUE}" stroke-width="1.5"/>
  <text x="85" y="84" text-anchor="middle" font-size="11" fill="currentColor">éluant</text>
  <text x="85" y="100" text-anchor="middle" font-size="10" fill="currentColor">NaCl 0,9 %</text>
  <line x1="130" y1="95" x2="245" y2="120" stroke="${BLUE}" stroke-width="2"/>
  <polygon points="245,120 235,118 238,128" fill="${BLUE}"/>

  <line x1="270" y1="235" x2="270" y2="270" stroke="${TEAL}" stroke-width="2"/>
  <polygon points="270,270 265,261 275,261" fill="${TEAL}"/>
  <rect x="235" y="270" width="70" height="42" rx="6" fill="${TEAL}" fill-opacity="0.15" stroke="${TEAL}" stroke-width="1.5"/>
  <text x="270" y="288" text-anchor="middle" font-size="10" fill="currentColor">flacon sous vide</text>
  <text x="270" y="303" text-anchor="middle" font-size="10" fill="${TEAL}">⁹⁹ᵐTc élué</text>

  <text x="430" y="120" text-anchor="middle" font-size="12" fill="currentColor">⁹⁹Mo</text>
  <text x="430" y="138" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">T½ 66 h</text>
  <line x1="430" y1="146" x2="430" y2="176" stroke="currentColor" stroke-width="2"/>
  <polygon points="430,176 425,167 435,167" fill="currentColor"/>
  <text x="475" y="165" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.7">β⁻</text>
  <text x="430" y="192" text-anchor="middle" font-size="12" fill="${TEAL}">⁹⁹ᵐTc</text>
  <text x="430" y="210" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">T½ 6 h</text>
  <text x="430" y="250" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.75">éluable toutes</text>
  <text x="430" y="264" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.75">les ~24 h</text>
</svg>`;

// ── Schéma de désintégration 99Mo → 99mTc → 99Tc ────────────────────────────
export const DECAY_SCHEME = `
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" width="560" height="260">
  <line x1="60" y1="50" x2="200" y2="50" stroke="currentColor" stroke-width="3"/>
  <text x="130" y="40" text-anchor="middle" font-size="13" fill="currentColor">⁹⁹Mo</text>
  <text x="130" y="68" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">T½ = 66 h</text>

  <line x1="200" y1="50" x2="320" y2="130" stroke="${AMBER}" stroke-width="2"/>
  <polygon points="320,130 309,127 312,137" fill="${AMBER}"/>
  <text x="250" y="98" font-size="11" fill="${AMBER}">β⁻ (≈ 87 %)</text>

  <line x1="300" y1="130" x2="440" y2="130" stroke="${TEAL}" stroke-width="3"/>
  <text x="370" y="120" text-anchor="middle" font-size="13" fill="${TEAL}">⁹⁹ᵐTc</text>
  <text x="370" y="148" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">T½ = 6,0 h (métastable)</text>

  <line x1="370" y1="130" x2="370" y2="205" stroke="${RED}" stroke-width="2" stroke-dasharray="4 3"/>
  <polygon points="370,205 365,196 375,196" fill="${RED}"/>
  <text x="392" y="172" font-size="11" fill="${RED}">γ 140 keV</text>
  <text x="392" y="187" font-size="9" fill="currentColor" opacity="0.7">(imagerie)</text>

  <line x1="300" y1="205" x2="440" y2="205" stroke="currentColor" stroke-width="3"/>
  <text x="370" y="225" text-anchor="middle" font-size="13" fill="currentColor">⁹⁹Tc</text>
  <text x="370" y="243" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">T½ ≈ 2,1 × 10⁵ ans</text>

  <text x="120" y="150" font-size="10" fill="currentColor" opacity="0.6">émetteur</text>
  <text x="120" y="164" font-size="10" fill="currentColor" opacity="0.6">parent</text>
</svg>`;

// ── Captation thyroïdienne (scintigraphie) ──────────────────────────────────
export const THYROID_UPTAKE = `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="600" height="300">
  <rect x="285" y="40" width="30" height="220" rx="8" fill="currentColor" opacity="0.07"/>
  <text x="300" y="278" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.6">trachée</text>
  <path d="M285 120 C 240 95, 200 110, 195 160 C 190 210, 235 225, 270 200 C 285 188, 285 150, 285 120 Z" fill="${TEAL}" fill-opacity="0.18" stroke="${TEAL}" stroke-width="2"/>
  <path d="M315 120 C 360 95, 400 110, 405 160 C 410 210, 365 225, 330 200 C 315 188, 315 150, 315 120 Z" fill="${TEAL}" fill-opacity="0.18" stroke="${TEAL}" stroke-width="2"/>
  <rect x="288" y="150" width="24" height="26" rx="4" fill="${TEAL}" fill-opacity="0.18" stroke="${TEAL}" stroke-width="1.5"/>
  <text x="230" y="165" text-anchor="middle" font-size="11" fill="currentColor">lobe gauche</text>
  <text x="370" y="165" text-anchor="middle" font-size="11" fill="currentColor">lobe droit</text>
  <text x="300" y="120" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.7">isthme</text>
  <circle cx="225" cy="150" r="15" fill="${AMBER}" fill-opacity="0.55" stroke="${AMBER}" stroke-width="1.5"/>
  <text x="225" y="120" text-anchor="middle" font-size="10" fill="${AMBER}">nodule « chaud »</text>
  <circle cx="375" cy="175" r="13" fill="none" stroke="${BLUE}" stroke-width="2" stroke-dasharray="3 2"/>
  <text x="375" y="215" text-anchor="middle" font-size="10" fill="${BLUE}">nodule « froid »</text>
  <text x="300" y="40" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.75">Fixation de l'iode/Tc-99m par le tissu thyroïdien fonctionnel</text>
</svg>`;

// ── Scintigraphie osseuse — fixation du MDP ─────────────────────────────────
export const BONE_SCAN = `
<svg viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg" width="320" height="360">
  <circle cx="160" cy="40" r="22" fill="currentColor" opacity="0.10" stroke="currentColor" stroke-width="1.5"/>
  <rect x="150" y="62" width="20" height="22" rx="4" fill="currentColor" opacity="0.10"/>
  <path d="M120 90 L200 90 L210 150 L110 150 Z" fill="currentColor" opacity="0.10" stroke="currentColor" stroke-width="1"/>
  <rect x="152" y="90" width="16" height="120" rx="4" fill="currentColor" opacity="0.12"/>
  <rect x="120" y="210" width="80" height="40" rx="10" fill="currentColor" opacity="0.10" stroke="currentColor" stroke-width="1"/>
  <rect x="128" y="250" width="16" height="95" rx="5" fill="currentColor" opacity="0.10"/>
  <rect x="176" y="250" width="16" height="95" rx="5" fill="currentColor" opacity="0.10"/>
  <rect x="92" y="96" width="14" height="95" rx="5" fill="currentColor" opacity="0.10" transform="rotate(12 99 143)"/>
  <rect x="214" y="96" width="14" height="95" rx="5" fill="currentColor" opacity="0.10" transform="rotate(-12 221 143)"/>
  <circle cx="160" cy="150" r="11" fill="${RED}" fill-opacity="0.6" stroke="${RED}" stroke-width="1.5"/>
  <circle cx="184" cy="120" r="9" fill="${RED}" fill-opacity="0.6" stroke="${RED}" stroke-width="1.5"/>
  <circle cx="135" cy="300" r="9" fill="${RED}" fill-opacity="0.6" stroke="${RED}" stroke-width="1.5"/>
  <text x="250" y="150" font-size="11" fill="${RED}">foyers</text>
  <text x="250" y="166" font-size="11" fill="${RED}">hyperfixants</text>
  <text x="160" y="358" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">Le MDP-⁹⁹ᵐTc se fixe sur l'os en remaniement (ostéoblastique)</text>
</svg>`;

// ── Scintigraphie pulmonaire ventilation/perfusion ──────────────────────────
export const VQ_LUNGS = `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="600" height="300">
  <text x="160" y="35" text-anchor="middle" font-size="13" fill="currentColor">Ventilation (V)</text>
  <path d="M120 60 C 90 60, 80 130, 95 200 C 105 240, 140 235, 150 200 L150 70 C150 62 140 60 120 60 Z" fill="${TEAL}" fill-opacity="0.2" stroke="${TEAL}" stroke-width="2"/>
  <path d="M200 60 C 230 60, 240 130, 225 200 C 215 240, 180 235, 170 200 L170 70 C170 62 180 60 200 60 Z" fill="${TEAL}" fill-opacity="0.2" stroke="${TEAL}" stroke-width="2"/>
  <text x="160" y="265" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">répartition homogène</text>

  <text x="440" y="35" text-anchor="middle" font-size="13" fill="currentColor">Perfusion (Q)</text>
  <path d="M400 60 C 370 60, 360 130, 375 200 C 385 240, 420 235, 430 200 L430 70 C430 62 420 60 400 60 Z" fill="${BLUE}" fill-opacity="0.2" stroke="${BLUE}" stroke-width="2"/>
  <path d="M480 60 C 510 60, 520 130, 505 200 C 495 240, 460 235, 450 200 L450 70 C450 62 460 60 480 60 Z" fill="${BLUE}" fill-opacity="0.2" stroke="${BLUE}" stroke-width="2"/>
  <path d="M455 95 C 470 95, 478 120, 470 145 C 462 165, 448 160, 448 135 Z" fill="var(--bg, #ffffff)" stroke="${RED}" stroke-width="2" stroke-dasharray="3 2"/>
  <circle cx="462" cy="125" r="2.5" fill="${RED}"/>
  <text x="540" y="125" text-anchor="middle" font-size="11" fill="${RED}">défect</text>
  <text x="440" y="265" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">amputation segmentaire</text>

  <text x="300" y="292" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Discordance V/Q (ventilation normale, perfusion absente) → embolie pulmonaire</text>
</svg>`;

// ── Rénogramme (courbe activité-temps, MAG3) ────────────────────────────────
export const RENOGRAM = `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="600" height="300">
  <line x1="70" y1="250" x2="560" y2="250" stroke="currentColor" stroke-width="1.5"/>
  <line x1="70" y1="40" x2="70" y2="250" stroke="currentColor" stroke-width="1.5"/>
  <text x="315" y="285" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">temps (min)</text>
  <text x="30" y="150" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7" transform="rotate(-90 30 150)">activité</text>
  <path d="M70 250 C 110 130, 150 70, 175 70 C 230 70, 320 160, 540 235" fill="none" stroke="${TEAL}" stroke-width="2.5"/>
  <text x="430" y="120" font-size="11" fill="${TEAL}">rein normal</text>
  <path d="M70 250 C 120 150, 170 90, 230 80 C 330 65, 460 70, 540 85" fill="none" stroke="${RED}" stroke-width="2.5" stroke-dasharray="5 3"/>
  <text x="430" y="60" font-size="11" fill="${RED}">obstruction (pas d'excrétion)</text>
  <text x="150" y="48" font-size="10" fill="currentColor" opacity="0.7">pic (~3-5 min)</text>
  <line x1="175" y1="70" x2="175" y2="250" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.5"/>
  <text x="120" y="240" font-size="9" fill="currentColor" opacity="0.6">captation</text>
  <text x="300" y="240" font-size="9" fill="currentColor" opacity="0.6">excrétion</text>
</svg>`;

// ── Liaison récepteur de la somatostatine (DOTATATE / TNE) ───────────────────
export const SSTR_BINDING = `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="600" height="300">
  <rect x="60" y="150" width="480" height="110" rx="14" fill="${BLUE}" fill-opacity="0.06" stroke="${BLUE}" stroke-width="2"/>
  <text x="300" y="240" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.75">Cellule tumorale neuroendocrine</text>
  <line x1="60" y1="150" x2="540" y2="150" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <line x1="60" y1="156" x2="540" y2="156" stroke="currentColor" stroke-width="2" opacity="0.4"/>
  <text x="300" y="178" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.55">membrane plasmique</text>
  <rect x="280" y="120" width="40" height="60" rx="6" fill="${BLUE}" fill-opacity="0.3" stroke="${BLUE}" stroke-width="1.5"/>
  <text x="300" y="112" text-anchor="middle" font-size="12" fill="currentColor">SSTR2</text>
  <circle cx="300" cy="92" r="14" fill="${TEAL}" fill-opacity="0.2" stroke="${TEAL}" stroke-width="2"/>
  <text x="300" y="96" text-anchor="middle" font-size="9" fill="currentColor">DOTATATE</text>
  <line x1="300" y1="106" x2="300" y2="120" stroke="${TEAL}" stroke-width="2"/>
  <circle cx="300" cy="58" r="16" fill="${AMBER}" fill-opacity="0.25" stroke="${AMBER}" stroke-width="2"/>
  <text x="300" y="55" text-anchor="middle" font-size="10" fill="currentColor">⁶⁸Ga</text>
  <text x="300" y="68" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.7">¹⁷⁷Lu</text>
  <line x1="300" y1="74" x2="300" y2="80" stroke="${AMBER}" stroke-width="2"/>
  <text x="470" y="58" font-size="11" fill="currentColor" opacity="0.8">⁶⁸Ga → TEP (diagnostic)</text>
  <text x="470" y="92" font-size="11" fill="currentColor" opacity="0.8">¹⁷⁷Lu → Lutathera</text>
  <text x="300" y="285" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.6">Surexpression des récepteurs SSTR2 → cible théranostique des TNE</text>
</svg>`;

// ── DaTscan — striatum normal vs altéré ─────────────────────────────────────
export const DATSCAN_STRIATUM = `
<svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" width="600" height="280">
  <text x="160" y="35" text-anchor="middle" font-size="13" fill="currentColor">Normal</text>
  <ellipse cx="120" cy="140" rx="14" ry="40" transform="rotate(20 120 140)" fill="${TEAL}" fill-opacity="0.55" stroke="${TEAL}" stroke-width="1.5"/>
  <ellipse cx="200" cy="140" rx="14" ry="40" transform="rotate(-20 200 140)" fill="${TEAL}" fill-opacity="0.55" stroke="${TEAL}" stroke-width="1.5"/>
  <text x="160" y="225" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">aspect en « virgules » symétriques</text>

  <text x="440" y="35" text-anchor="middle" font-size="13" fill="currentColor">Syndrome parkinsonien</text>
  <ellipse cx="400" cy="125" rx="12" ry="20" transform="rotate(20 400 125)" fill="${AMBER}" fill-opacity="0.45" stroke="${AMBER}" stroke-width="1.5"/>
  <circle cx="492" cy="120" r="9" fill="${RED}" fill-opacity="0.4" stroke="${RED}" stroke-width="1.5"/>
  <text x="440" y="225" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">putamen amputé → « point » asymétrique</text>
  <text x="300" y="262" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.8">Perte des terminaisons dopaminergiques (transporteur DAT)</text>
</svg>`;
