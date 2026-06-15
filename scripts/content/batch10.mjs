// Lot 10 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  PET_COINCIDENCE,
  FDG_UPTAKE,
  PSMA_BINDING,
  DECAY_TYPES,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — TEP amyloïde ─────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_AMYLOIDE', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'TEP amyloïde dans la maladie d’Alzheimer', difficulty: 'avancé',
    tags: ['TEP amyloïde', 'Alzheimer', 'florbétapir', 'flutémétamol', 'plaques', 'biomarqueur'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/EAN — Amyloid PET procedure guidelines', url: 'https://doi.org/10.1007/s00259-015-3145-z' },
      { title: 'HAS — Place de la TEP amyloïde', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'La **TEP amyloïde** (traceurs 18F : florbétapir, flutémétamol, florbétaben) visualise les **plaques amyloïdes** cérébrales, l’une des lésions caractéristiques de la **maladie d’Alzheimer**. Un examen **négatif** rend le diagnostic d’Alzheimer très improbable ; un examen positif doit s’interpréter avec la clinique.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À détecter dans le cerveau des dépôts (« plaques ») associés à la maladie d’Alzheimer, pour aider à préciser la cause de troubles de la mémoire.' },
          { title: 'Déroulement', text: 'Une injection, un temps d’attente, puis des images de la tête. Examen indolore. Il est réservé à des situations diagnostiques précises, décidées par le spécialiste.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Troubles cognitifs **atypiques ou précoces** où le diagnostic reste incertain après bilan.', 'Valeur surtout par sa **forte valeur prédictive négative** (exclure l’amyloïdose).', 'Sélection/suivi pour les traitements anti-amyloïdes (selon disponibilité).'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Positif ≠ Alzheimer clinique', text: 'Des plaques amyloïdes existent chez des sujets âgés asymptomatiques. Un examen positif confirme la pathologie amyloïde, pas à lui seul la démence d’Alzheimer : interprétation clinico-biologique indispensable.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et lecture', text: 'Traceur 18F dédié, délai d’incorporation propre au traceur, acquisition cérébrale. Lecture **binaire** (positif/négatif) selon la rétention corticale vs substance blanche ; quantification possible (Centiloïdes).',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP.', caption: 'Traceurs amyloïdes au 18F : détection TEP standard, lecture corticale binaire.' },
            stats: [{ value: '18F dédié', label: 'Florbétapir/ben, flutémétamol' }, { value: 'Positif/négatif', label: 'Lecture visuelle' }, { value: 'Centiloïdes', label: 'Quantification' }] },
          { title: 'Pièges', list: ['Distinguer rétention corticale (pathologique) de la fixation physiologique de substance blanche.', 'Atrophie marquée (effet de volume partiel).', 'Lecture standardisée requise (formation au traceur).'] },
        ],
      },
    },
  },

  // 2 — TEP tau ───────────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_TAU', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'TEP tau : imagerie de la protéine tau', difficulty: 'avancé',
    tags: ['TEP tau', 'Alzheimer', 'tauopathie', 'flortaucipir', 'Braak', 'neurodégénérescence'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — Tau PET imaging', url: 'https://www.eanm.org' },
      { title: 'Flortaucipir — données d’homologation', url: 'https://www.fda.gov' },
    ],
    content: {
      lead: 'La **TEP tau** (ex. 18F-flortaucipir) image les dépôts de **protéine tau**, mieux corrélés que l’amyloïde à la **sévérité clinique** et à la topographie des troubles. Elle complète la TEP amyloïde dans le cadre diagnostique et la recherche sur les tauopathies.',
      medecin_non_nuc: {
        sections: [
          { title: 'Intérêt', text: 'La distribution du tau suit les **stades de Braak** et corrèle au déclin cognitif : la TEP tau apporte une information **pronostique et topographique** que l’amyloïde seul ne donne pas.' },
          { title: 'Place actuelle', infoBox: { type: 'info', title: 'Surtout recherche', text: 'Encore largement utilisée en recherche/essais (anti-tau, anti-amyloïde) ; les indications cliniques de routine restent limitées et dépendent de la disponibilité/remboursement.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et lecture', text: 'Traceur 18F dédié, acquisition cérébrale après incorporation. Analyse de la distribution corticale (patterns type Braak) et quantification (SUVr régional).',
            figure: { svg: FDG_UPTAKE, alt: 'Captation cellulaire d’un traceur (analogie).', caption: 'Les traceurs tau se lient aux agrégats de protéine tau intraneuronaux.' },
            stats: [{ value: '18F-flortaucipir', label: 'Traceur' }, { value: 'Stades de Braak', label: 'Topographie' }, { value: 'SUVr', label: 'Quantification' }] },
          { title: 'Pièges', list: ['Fixations off-target (noyaux gris, choroïde, MAO-B) selon le traceur.', 'Standardisation des régions de référence.', 'Interprétation conjointe amyloïde/clinique.'] },
        ],
      },
    },
  },

  // 3 — TEP-FDG pancréas ──────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_PANCREAS', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-FDG dans le cancer du pancréas', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'pancréas', 'adénocarcinome', 'métastases', 'récidive'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET in pancreatic cancer', url: 'https://www.eanm.org' },
      { title: 'TNCD — Adénocarcinome pancréatique', url: 'https://www.snfge.org' },
    ],
    content: {
      lead: 'Dans l’**adénocarcinome du pancréas**, la **TEP-FDG** complète la TDM/IRM : détection de **métastases occultes** modifiant la résécabilité, caractérisation de lésions équivoques, évaluation de la réponse et recherche de récidive. Elle ne remplace pas l’imagerie morphologique pour le bilan local.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Recherche de **métastases à distance** avant chirurgie lourde (éviter une laparotomie inutile).', 'Caractérisation de lésions indéterminées, masses pancréatiques douteuses.', 'Évaluation de la réponse / récidive.'] },
          { title: 'Limites', infoBox: { type: 'warning', title: 'Glycémie & inflammation', text: 'Le contrôle glycémique est crucial (diabète fréquent dans ce contexte). La pancréatite inflammatoire peut être FDG-avide (faux positif) ; les tumeurs mucineuses/bien différenciées peuvent être peu avides.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier, glycémie contrôlée. Corrélation TDM/IRM (bilan local). Réponse par SUV harmonisé (EARL).',
            figure: { svg: FDG_UPTAKE, alt: 'Captation du FDG par les cellules tumorales.', caption: 'La TEP repère les foyers avides ; attention aux faux positifs inflammatoires.' },
            stats: [{ value: '~3–4 MBq/kg', label: 'FDG' }, { value: 'Glycémie', label: 'Contrôle strict' }, { value: 'Métastases', label: 'Apport principal' }] },
          { title: 'Pièges', list: ['Pancréatite (faux positif), inflammation post-biliaire/stent.', 'Tumeurs peu avides (mucineuses).', 'Activité digestive/urinaire de voisinage.'] },
        ],
      },
    },
  },

  // 4 — TEP-FDG col & ovaire ─────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_COL_OVAIRE', cat: 'senologie_gynecologie', catLabel: 'Sénologie & Gynécologie',
    title: 'TEP-TDM au 18F-FDG des cancers du col et de l’ovaire', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'cancer du col', 'cancer de l’ovaire', 'récidive', 'CA-125'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET in gynaecological cancers', url: 'https://www.eanm.org' },
      { title: 'ESGO/INCa — Cancers gynécologiques', url: 'https://www.esgo.org' },
    ],
    content: {
      lead: 'La **TEP-FDG** intervient dans les cancers **du col utérin** (bilan ganglionnaire para-aortique, planification de radiothérapie, récidive) et **de l’ovaire** (récidive, notamment devant une élévation du CA-125 avec imagerie conventionnelle non concluante).',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Col** : bilan d’extension ganglionnaire (pelvien/para-aortique), planification de radiothérapie, suspicion de récidive.', '**Ovaire** : récidive (↑ CA-125 avec imagerie équivoque), bilan pré-chirurgie de cytoréduction.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Physiologie pelvienne', text: 'Activité urinaire intense au pelvis et captation digestive : protocoles d’hydratation/diurétiques et corrélation TDM nécessaires pour ne pas masquer/mimer une lésion.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier, hydratation, vidange vésicale ± diurétique pour le pelvis. Corrélation IRM pelvienne (extension locale).',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP.', caption: 'La TEP cartographie l’atteinte ganglionnaire et à distance.' },
            stats: [{ value: 'Para-aortique', label: 'Cible clé (col)' }, { value: 'CA-125', label: 'Contexte (ovaire)' }, { value: 'IRM', label: 'Extension locale' }] },
          { title: 'Pièges', list: ['Activité urétéro-vésicale (faux positifs/masquage).', 'Inflammation post-radique/post-op.', 'Petites carcinoses : sensibilité limitée.'] },
        ],
      },
    },
  },

  // 5 — PSMA-RADS ─────────────────────────────────────────────────────────────
  {
    id: 'V2_PSMA_RADS', cat: 'scores', catLabel: 'Scores & Classifications',
    title: 'Classification PSMA-RADS (lecture de la TEP-PSMA)', difficulty: 'avancé',
    tags: ['PSMA-RADS', 'TEP-PSMA', 'prostate', 'standardisation', 'interprétation', 'scores'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Rowe SP. et al. — PSMA-RADS 1.0', url: 'https://doi.org/10.2967/jnumed.117.205294' },
      { title: 'EANM — Standardised reporting of PSMA-PET', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La classification **PSMA-RADS** standardise l’interprétation de la TEP-PSMA en cotant, **lésion par lésion**, la probabilité de malignité (de 1, bénin, à 5, quasi certainement tumoral). Elle homogénéise les comptes-rendus et facilite la décision (notamment l’éligibilité à la radioligand-thérapie).',
      medecin_non_nuc: {
        sections: [
          { title: 'Pourquoi c’est utile', text: 'Un langage commun entre médecins nucléaires, urologues et oncologues : un « PSMA-RADS 4-5 » signale une lésion très probablement tumorale, un « 1-2 » plutôt bénin/équivoque — ce qui oriente la conduite.' },
          { title: 'Logique', table: undefined, text: 'La cote combine l’intensité de fixation et le substrat anatomique (TDM/IRM) de chaque lésion.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Échelle (synthèse)', table: undefined,
            text: 'Cotation par lésion (et catégorie globale), à mettre en regard du contexte clinico-biologique (PSA).',
            figure: { svg: PSMA_BINDING, alt: 'Liaison du ligand PSMA sur une cellule tumorale prostatique.', caption: 'PSMA-RADS gradue la probabilité de malignité des foyers PSMA-avides.' } },
          { title: 'Pièges', list: ['Faux positifs connus (ganglion cœliaque, côtes, Paget) à coter prudemment.', 'Captations physiologiques intenses (salivaires, reins).', 'Cohérence avec PROMISE/miTNM pour le staging.'] },
        ],
        table: {
          headers: ['PSMA-RADS', 'Signification'],
          rows: [
            ['1', 'Bénin (caractéristique)'],
            ['2', 'Probablement bénin / équivoque bas'],
            ['3', 'Indéterminé (3A/3B/3C/3D selon contexte)'],
            ['4', 'Probablement malin (sans confirmation morpho)'],
            ['5', 'Quasi certainement malin'],
          ],
        },
      },
    },
  },

  // 6 — Classification de Lugano ──────────────────────────────────────────────
  {
    id: 'V2_LUGANO', cat: 'scores', catLabel: 'Scores & Classifications',
    title: 'Classification de Lugano (lymphomes)', difficulty: 'avancé',
    tags: ['Lugano', 'lymphome', 'stadification', 'Deauville', 'TEP-FDG', 'réponse'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Cheson BD. et al. — Lugano classification (J Clin Oncol 2014)', url: 'https://doi.org/10.1200/JCO.2013.54.8800' },
    ],
    content: {
      lead: 'La **classification de Lugano** est le cadre de référence pour la **stadification** et l’**évaluation de la réponse** des lymphomes avides. Elle intègre la **TEP-FDG** (stadification métabolique et réponse via le score de Deauville) pour les lymphomes FDG-avides, la TDM pour les non avides.',
      medecin_non_nuc: {
        sections: [
          { title: 'Ce qu’elle apporte', text: 'Un système commun pour décrire le **stade** (I à IV) et la **réponse** (complète, partielle, stable, progression), guidant le pronostic et les stratégies adaptées à la réponse (notamment via la TEP intermédiaire).' },
          { title: 'Stades (rappel)', table: undefined, text: 'Du stade localisé (I) à l’atteinte disséminée extra-ganglionnaire (IV).' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'TEP dans Lugano', text: 'Pour les lymphomes **FDG-avides**, la TEP remplace la TDM pour la stadification métabolique et l’évaluation de réponse ; la réponse est cotée par le **score de Deauville** (échelle en 5 points vs médiastin/foie). Harmonisation indispensable.',
            figure: { svg: FDG_UPTAKE, alt: 'Captation du FDG par les cellules tumorales.', caption: 'Lugano s’appuie sur la TEP-FDG (Deauville) pour les lymphomes avides.' } },
          { title: 'Points clés', table: undefined, text: 'Timing par rapport aux cures et au G-CSF crucial ; rebond thymique/médullaire à connaître.' },
        ],
        table: {
          headers: ['Stade Lugano', 'Définition (simplifiée)'],
          rows: [
            ['I', '1 aire ganglionnaire (ou 1 site extra-ganglionnaire isolé)'],
            ['II', '≥ 2 aires du même côté du diaphragme'],
            ['III', 'Aires des 2 côtés du diaphragme'],
            ['IV', 'Atteinte extra-ganglionnaire diffuse (moelle, foie…)'],
          ],
        },
      },
    },
  },

  // 7 — TEP-FDG cancer thyroïdien dédifférencié ──────────────────────────────
  {
    id: 'V2_TEP_FDG_THYROIDE_DEDIFF', cat: 'theranostique_thyroide', catLabel: 'Pathologies Thyroïdiennes',
    title: 'TEP-FDG dans le cancer thyroïdien réfractaire à l’iode', difficulty: 'avancé',
    tags: ['TEP-FDG', 'cancer thyroïdien', 'réfractaire', 'thyroglobuline', 'flip-flop', 'dédifférenciation'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ATA — Differentiated thyroid cancer (FDG-PET role)', url: 'https://doi.org/10.1089/thy.2015.0020' },
      { title: 'EANM — Thyroid cancer FDG-PET', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Quand un cancer thyroïdien différencié **perd sa capacité à fixer l’iode** (dédifférenciation) mais que la **thyroglobuline** reste élevée avec un balayage iode négatif, la **TEP-FDG** prend le relais : les lésions dédifférenciées deviennent FDG-avides (« phénomène de flip-flop »).',
      medecin_non_nuc: {
        sections: [
          { title: 'Indication clé', text: 'Patient traité, **thyroglobuline élevée** mais **balayage à l’iode négatif** : la TEP-FDG localise la maladie réfractaire et a une valeur **pronostique** (les lésions FDG+ sont plus agressives).' },
          { title: 'Concept', infoBox: { type: 'info', title: 'Flip-flop iode/FDG', text: 'Les lésions bien différenciées fixent l’iode (pas le FDG) ; en se dédifférenciant, elles perdent l’iode et deviennent FDG-avides. Les deux examens sont donc complémentaires.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier ; la stimulation par TSH (sevrage ou rhTSH) peut augmenter la sensibilité. Corrélation à la thyroglobuline et au balayage iode.',
            figure: { svg: FDG_UPTAKE, alt: 'Captation du FDG par les cellules tumorales dédifférenciées.', caption: 'Les lésions réfractaires à l’iode deviennent avides en FDG (flip-flop).' },
            stats: [{ value: 'Tg élevée', label: 'Contexte' }, { value: 'Iode négatif', label: 'Balayage' }, { value: 'FDG positif', label: 'Maladie réfractaire' }] },
          { title: 'Pièges', list: ['Inflammation/post-op (faux positifs).', 'Lésions encore différenciées (FDG-négatives).', 'Pronostic lié au volume FDG-avide.'] },
        ],
      },
    },
  },

  // 8 — Lexique de la médecine nucléaire ──────────────────────────────────────
  {
    id: 'V2_LEXIQUE_MN', cat: 'generalites', catLabel: 'Généralités',
    title: 'Lexique de la médecine nucléaire', difficulty: 'fondamental',
    tags: ['lexique', 'glossaire', 'définitions', 'patient', 'vocabulaire', 'TEP'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SFMN — Glossaire', url: 'https://www.sfmn.org' },
      { title: 'EANM — Glossary of terms', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Les comptes-rendus et explications de médecine nucléaire emploient un vocabulaire spécifique. Ce **lexique** définit simplement les termes les plus fréquents pour mieux comprendre votre examen.',
      patient: {
        sections: [
          { title: 'Les mots à connaître', list: [
            '**Radiopharmaceutique / traceur** : produit faiblement radioactif injecté pour fabriquer les images.',
            '**Scintigraphie** : image obtenue avec une gamma-caméra (os, cœur, thyroïde, reins…).',
            '**TEP (PET)** : tomographie par émission de positons, souvent au « FDG » (un sucre).',
            '**TEMP (SPECT)** : imagerie en 3D par gamma-caméra tournante.',
            '**Fixation / captation** : quantité de produit qui se concentre dans une zone.',
            '**Demi-vie** : temps au bout duquel la radioactivité diminue de moitié.',
            '**Hyperfixation** : zone qui capte anormalement beaucoup le produit.',
            '**Théranostique** : utiliser la même cible pour diagnostiquer ET traiter.',
          ] },
          { title: 'Unités', list: [
            '**Becquerel (Bq)** : quantité de radioactivité.',
            '**Sievert (Sv) / milliSievert (mSv)** : « dose » reçue, pour la sécurité.',
          ] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Termes techniques utiles', list: [
            '**SUV** : indice semi-quantitatif d’avidité en TEP (voir l’article dédié).',
            '**MBq/kg** : activité injectée rapportée au poids.',
            '**Gated / synchronisé ECG** : acquisition calée sur le cycle cardiaque (FEVG).',
            '**Hybride (TEP-TDM, TEMP-TDM)** : fusion fonction + anatomie.',
          ] },
        ],
      },
    },
  },

  // 9 — Préparation détaillée à une TEP-FDG ───────────────────────────────────
  {
    id: 'V2_PREPARATION_TEP_DETAIL', cat: 'preparation', catLabel: 'Préparation Patient',
    title: 'Bien préparer sa TEP-FDG (et cas du diabétique)', difficulty: 'intermédiaire',
    tags: ['préparation', 'TEP-FDG', 'jeûne', 'glycémie', 'diabète', 'patient'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/EARL — FDG-PET tumour imaging v2.0 (préparation)', url: 'https://doi.org/10.1007/s00259-014-2961-x' },
      { title: 'SFMN — Préparation TEP', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'La qualité d’une **TEP-FDG** dépend beaucoup de la préparation : un **jeûne** correct et une **glycémie contrôlée** garantissent que le traceur se concentre dans les lésions et non dans les muscles ou le bruit de fond. Le **diabète** demande des précautions particulières.',
      patient: {
        sections: [
          { title: 'Les règles', list: [
            '**Jeûne 4 à 6 h** (eau plate autorisée et conseillée).',
            'Pas d’effort physique intense la veille et le jour même.',
            'Pas de sucre, jus, bonbons, chewing-gum sucré avant l’examen.',
            'Venez **au chaud** (le froid active la graisse « brune » qui capte le FDG).',
            'Signalez diabète, grossesse, allaitement.',
          ] },
          { title: 'Le jour J', text: 'Glycémie vérifiée à l’arrivée, injection, puis **repos calme ~60 min** (sans parler ni marcher), enfin les images. Comptez ~2 h sur place.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Patient diabétique', infoBox: { type: 'warning', title: 'Glycémie & insuline', text: 'Viser une glycémie modérée (souvent < 11 mmol/L) sans injection d’insuline rapide juste avant (l’insuline détourne le FDG vers les muscles → examen ininterprétable). Programmer plutôt en milieu de matinée et adapter le traitement selon protocole du service.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Points techniques', list: [
            'Délai d’incorporation standardisé (60 ± 10 min), vessie vidée avant acquisition.',
            'Réchauffement (réduit la graisse brune) ; ambiance calme (réduit la captation musculaire/laryngée).',
            'Glycémie documentée (impacte le SUV) ; reporter si trop élevée selon protocole.',
            'Harmonisation EARL pour le suivi.',
          ] },
        ],
      },
    },
  },

  // 10 — 225Ac-PSMA (thérapie alpha) ──────────────────────────────────────────
  {
    id: 'V2_225AC_PSMA', cat: 'prostate', catLabel: 'Cancer de la Prostate',
    title: 'Thérapie alpha au 225Ac-PSMA (prostate avancée)', difficulty: 'avancé',
    tags: ['225Ac-PSMA', 'thérapie alpha', 'prostate', 'mCRPC', 'théranostique', 'xérostomie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Kratochwil C. et al. — 225Ac-PSMA-617 (J Nucl Med)', url: 'https://doi.org/10.2967/jnumed.116.178673' },
      { title: 'EANM — Targeted alpha therapy considerations', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Le **225Ac-PSMA** est une **thérapie alpha ciblée** : l’actinium-225 émet des particules **alpha** très énergétiques à portée infime, délivrées au contact des cellules de cancer prostatique via le ligand PSMA. Option en cas d’échappement au 177Lu-PSMA, encore largement en évaluation.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'Comme le 177Lu-PSMA, le traitement cible le PSMA des cellules tumorales — mais avec un rayonnement **alpha**, encore plus localisé et puissant sur de très courtes distances.',
            figure: { svg: PSMA_BINDING, alt: 'Liaison d’un ligand PSMA marqué sur une cellule tumorale prostatique.', caption: 'Le 225Ac-PSMA délivre un rayonnement alpha au contact des cellules PSMA+.' } },
          { title: 'À savoir', text: 'Effet secondaire marquant : la **sécheresse buccale** (les glandes salivaires expriment aussi le PSMA). Le traitement se fait en cures espacées, avec suivi rapproché.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Positionnement', text: 'Surtout proposé dans des centres experts pour le mCRPC **PSMA-positif** en échec du 177Lu-PSMA, ou en association à l’étude. Données prometteuses mais cadre encore largement évaluatif.' },
          { title: 'Tolérance', list: ['**Xérostomie** parfois sévère (atteinte salivaire).', 'Cytopénies, fatigue ; surveillance biologique.', 'Sélection théranostique stricte (TEP-PSMA).'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Spécificités', text: 'L’**actinium-225** (période ~10 jours) génère une **cascade alpha** (plusieurs descendants émetteurs alpha) : efficacité élevée mais dosimétrie complexe (relocalisation des descendants). Radioprotection adaptée aux émetteurs alpha.',
            figure: { svg: DECAY_TYPES, alt: 'Émission alpha d’un noyau (particule lourde à très courte portée).', caption: 'Les particules alpha déposent une énergie intense sur quelques cellules.' },
            stats: [{ value: '225Ac', label: 'Émetteur alpha (~10 j)' }, { value: 'Cascade α', label: 'Plusieurs descendants' }, { value: 'mCRPC PSMA+', label: 'Indication (experte)' }] },
          { title: 'Points d’attention', list: ['Dosimétrie complexe (descendants de la cascade).', 'Toxicité salivaire ; sélection des patients.', 'Cadre de recherche/centres experts.'] },
        ],
      },
    },
  },
];
