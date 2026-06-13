// Lot 9 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  PET_COINCIDENCE,
  FDG_UPTAKE,
  SENTINEL_NODE,
  VQ_LUNGS,
  ALARA_TDS,
  BONE_SCAN,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — Gallium-67 ───────────────────────────────────────────────────────────
  {
    id: 'V2_GALLIUM67', cat: 'infection_inflammation', catLabel: 'Infection & Inflammation',
    title: 'Scintigraphie au Gallium-67 (infection, inflammation)', difficulty: 'avancé',
    tags: ['gallium-67', 'infection', 'inflammation', 'fièvre', 'sarcoïdose', 'spondylodiscite'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI Procedure Standard — Gallium scintigraphy', url: 'https://www.snmmi.org' },
      { title: 'EANM — Infection/inflammation imaging', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Le **citrate de Gallium-67** se fixe sur les foyers **infectieux et inflammatoires** (et certaines tumeurs). Bien que largement supplanté par la TEP-FDG et les leucocytes marqués, il conserve des indications, notamment la **spondylodiscite**, certaines fièvres prolongées et le bilan d’activité de la sarcoïdose.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À rechercher un foyer d’**infection ou d’inflammation** dans le corps, souvent quand la cause d’une fièvre prolongée n’est pas trouvée.' },
          { title: 'Déroulement', text: 'Une injection, puis des images **différées** (à 24, 48, parfois 72 h) car le produit met du temps à se concentrer sur les lésions. Examen indolore mais étalé sur plusieurs jours.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Spondylodiscite** (infection du rachis), où il garde une bonne place.', 'Fièvre prolongée inexpliquée (alternative/complément à la TEP-FDG).', 'Bilan d’activité de la **sarcoïdose** (signes lacrymo-salivaires « panda », hilo-médiastinal « lambda »).'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Délais longs', text: 'Le Ga-67 impose des images à 48–72 h (période 78 h) ; la TEP-FDG, plus rapide et plus résolue, l’a largement remplacé sauf indications ciblées.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceur et protocole', text: 'Le **67Ga** (période ~78 h, plusieurs pics γ) se lie à la transferrine/lactoferrine. Imagerie planaire + TEMP/TDM à **48–72 h**. Activité modérée, dosimétrie non négligeable.',
            figure: { svg: BONE_SCAN, alt: 'Fixation d’un traceur sur des foyers (illustration).', caption: 'Le Ga-67 se concentre sur les foyers infectieux/inflammatoires, imagés tardivement.' },
            stats: [{ value: '67Ga citrate', label: 'Traceur' }, { value: '~78 h', label: 'Période' }, { value: '48–72 h', label: 'Imagerie' }] },
          { title: 'Pièges', list: ['Captation physiologique (foie, os, intestin, larmes/salive).', 'Délais longs et dose plus élevée que le 99mTc.', 'Spécificité limitée : corréler au contexte.'] },
        ],
      },
    },
  },

  // 2 — TEP-FDG mélanome ─────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_MELANOME', cat: 'dermatologie_melanome', catLabel: 'Dermatologie & Mélanome',
    title: 'TEP-TDM au 18F-FDG dans le mélanome', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'mélanome', 'bilan d’extension', 'métastases', 'immunothérapie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET/CT in melanoma', url: 'https://www.eanm.org' },
      { title: 'INCa — Mélanome cutané, bilan', url: 'https://www.e-cancer.fr' },
    ],
    content: {
      lead: 'Le mélanome est une tumeur très **FDG-avide** : la **TEP-FDG** est performante pour le **bilan d’extension** des mélanomes avancés (stades III-IV), l’évaluation de la réponse à l’immunothérapie/thérapie ciblée et la recherche de récidive.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'À partir d’un certain stade, il recherche des localisations du mélanome dans tout le corps et **surveille l’efficacité** des traitements.',
            figure: { svg: FDG_UPTAKE, alt: 'Captation du FDG par les cellules tumorales.', caption: 'Le mélanome consomme beaucoup de glucose : la TEP le détecte bien.' } },
          { title: 'Préparation', text: 'TEP-FDG standard (jeûne, glycémie). Signalez diabète, grossesse, allaitement.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Bilan d’extension des mélanomes **stades III-IV** (ganglions, métastases à distance).', 'Évaluation de la **réponse** (immunothérapie, BRAF/MEK) et suivi.', 'Recherche de récidive (clinique/marqueurs).'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Cerveau & immunothérapie', text: 'Compléter par une IRM cérébrale (la TEP-FDG est peu performante au cerveau). Sous immunothérapie, attention à la pseudo-progression et aux foyers inflammatoires (sarcoïdose-like).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et pièges', text: 'TEP-FDG corps entier (souvent vertex→pieds car le mélanome donne des métastases distales). Harmonisation SUV (EARL), critères PERCIST/immuno-adaptés.',
            stats: [{ value: 'Vertex→pieds', label: 'Champ étendu' }, { value: 'EARL', label: 'Harmonisation' }, { value: 'IRM cérébrale', label: 'Complément' }] },
          { title: 'Limites', list: ['Petites métastases / micro-ganglions : faux négatifs.', 'Foyers inflammatoires sous immunothérapie (faux positifs).', 'Cerveau peu performant (FDG cortical élevé).'] },
        ],
      },
    },
  },

  // 3 — TEP-FDG sarcomes ─────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_SARCOME', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-FDG dans les sarcomes', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'sarcome', 'grade', 'biopsie', 'réponse'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET in sarcoma', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Dans les **sarcomes des tissus mous et osseux**, la **TEP-FDG** aide à estimer le **grade** (les sarcomes de haut grade sont plus avides), à **cibler la biopsie** sur la zone la plus active, au bilan d’extension et à l’évaluation de la réponse néoadjuvante.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Estimation du **grade** (SUV corrélé à l’agressivité).', 'Guidage de **biopsie** (zone la plus métabolique, évite les zones nécrotiques).', 'Bilan d’extension et évaluation de la **réponse** au traitement néoadjuvant.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Hétérogénéité', text: 'Les sarcomes sont hétérogènes : la TEP repère la composante la plus agressive, utile pour ne pas sous-grader sur une biopsie mal placée.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier, SUVmax/SULpeak harmonisés. Corrélation IRM (extension locale). Réponse par PERCIST.',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP.', caption: 'La TEP localise et quantifie l’activité métabolique du sarcome.' },
            stats: [{ value: 'SUVmax', label: 'Proxy du grade' }, { value: 'Biopsie ciblée', label: 'Zone la + active' }, { value: 'IRM', label: 'Extension locale' }] },
          { title: 'Pièges', list: ['Tumeurs de bas grade peu avides (faux négatifs relatifs).', 'Inflammation post-biopsie/chirurgie.', 'Hétérogénéité intratumorale.'] },
        ],
      },
    },
  },

  // 4 — TEP-FDG myélome ──────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_MYELOME', cat: 'hematologie', catLabel: 'Hématologie & Lymphomes',
    title: 'TEP-TDM au 18F-FDG dans le myélome multiple', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'myélome', 'lésions osseuses', 'maladie résiduelle', 'hématologie'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IMWG / IMPeTUs — FDG-PET in multiple myeloma', url: 'https://doi.org/10.1007/s00259-019-04434-0' },
    ],
    content: {
      lead: 'La **TEP-FDG** est recommandée dans le **myélome multiple** pour la cartographie des **lésions focales** osseuses et extramédullaires, l’évaluation de la **réponse** et la **maladie résiduelle**, en complément de l’IRM (plus sensible pour l’atteinte diffuse).',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Bilan initial : lésions focales, maladie extramédullaire.', 'Évaluation de la **réponse** au traitement et de la maladie résiduelle (valeur pronostique).', 'Complément de l’IMRI/IRM corps entier.'] },
          { title: 'Complémentarité', infoBox: { type: 'info', title: 'TEP vs IRM', text: 'L’IRM est plus sensible pour l’infiltration diffuse ; la TEP-FDG excelle pour les lésions focales actives et le suivi (une TEP négative après traitement a une bonne valeur pronostique).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et lecture', text: 'TEP-FDG corps entier ; critères **IMPeTUs** (standardisation : moelle, lésions focales, extramédullaire, paramédullaire). Attention au timing post-chimiothérapie/G-CSF.',
            figure: { svg: BONE_SCAN, alt: 'Foyers osseux (illustration).', caption: 'La TEP cartographie les lésions focales osseuses du myélome.' },
            stats: [{ value: 'IMPeTUs', label: 'Critères standardisés' }, { value: 'Lésions focales', label: 'Point fort TEP' }, { value: 'Pronostic', label: 'TEP post-traitement' }] },
          { title: 'Pièges', list: ['Rebond médullaire post-G-CSF (faux positif diffus).', 'Fractures/remaniements bénins.', 'Lésions lytiques peu avides possibles.'] },
        ],
      },
    },
  },

  // 5 — TEP-FDG œsogastrique ────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_OESOGASTRIQUE', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-FDG des cancers de l’œsophage et de l’estomac', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'œsophage', 'estomac', 'bilan d’extension', 'réponse'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET in oesophago-gastric cancer', url: 'https://www.eanm.org' },
      { title: 'TNCD — Cancers de l’œsophage et de l’estomac', url: 'https://www.snfge.org' },
    ],
    content: {
      lead: 'Dans le **cancer de l’œsophage** (et de la jonction), la **TEP-FDG** affine le bilan d’extension (métastases occultes), évalue la **réponse au traitement néoadjuvant** et la récidive. Dans le cancer **gastrique**, son rôle est plus limité (formes peu avides, mucineuses).',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Œsophage** : détection de métastases à distance modifiant la stratégie curative ; évaluation de la réponse néoadjuvante.', '**Estomac** : indications plus restreintes (nombreuses tumeurs peu avides).'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Faux négatifs', text: 'Les adénocarcinomes mucineux/à cellules en bague (notamment gastriques) et les petites lésions peuvent être faiblement avides — interpréter avec prudence.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier ; attention à la captation physiologique digestive et à l’inflammation post-radio/chirurgie. Réponse métabolique (PERCIST) prédictive dans l’œsophage.',
            figure: { svg: FDG_UPTAKE, alt: 'Captation du FDG par les cellules tumorales.', caption: 'La TEP repère les foyers avides et leur évolution sous traitement.' },
            stats: [{ value: 'Œsophage', label: 'Indication forte' }, { value: 'PERCIST', label: 'Réponse néoadjuvante' }, { value: 'Mucineux', label: 'Faux négatifs' }] },
          { title: 'Pièges', list: ['Captation physiologique gastrique/œsophagienne, œsophagite.', 'Inflammation post-thérapeutique (respecter les délais).', 'Tumeurs peu avides.'] },
        ],
      },
    },
  },

  // 6 — Ganglion sentinelle gynéco ───────────────────────────────────────────
  {
    id: 'V2_GANGLION_SENTINELLE_GYNECO', cat: 'senologie_gynecologie', catLabel: 'Sénologie & Gynécologie',
    title: 'Ganglion sentinelle en gynécologie (col, vulve, endomètre)', difficulty: 'avancé',
    tags: ['ganglion sentinelle', 'col utérin', 'vulve', 'endomètre', 'lymphoscintigraphie', '99mTc'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — Sentinel node in gynaecological cancers', url: 'https://www.eanm.org' },
      { title: 'ESGO — Guidelines gynaecological cancers', url: 'https://www.esgo.org' },
    ],
    content: {
      lead: 'La technique du **ganglion sentinelle** s’applique aux cancers **du col, de la vulve et de l’endomètre** : elle réduit la morbidité des curages ganglionnaires (lymphœdème) tout en évaluant l’extension. Le repérage combine **radiotraceur** (lymphoscintigraphie + sonde) et souvent un colorant (ou l’ICG en fluorescence).',
      patient: {
        sections: [
          { title: 'Le principe', text: 'On injecte près de la tumeur un produit qui suit le **drainage lymphatique** jusqu’au premier ganglion, qui sera prélevé et analysé pendant l’opération.',
            figure: { svg: SENTINEL_NODE, alt: 'Drainage lymphatique d’une tumeur vers le ganglion sentinelle.', caption: 'Repérage du premier relais lymphatique drainant la tumeur.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Intérêt', text: 'Éviter les curages pelviens/inguinaux étendus (lymphœdème, morbidité) chez des patientes sélectionnées, tout en évaluant le statut ganglionnaire — déterminant pour la stratégie.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: '**99mTc-nanocolloïdes** en injection péri-tumorale/cervicale, lymphoscintigraphie planaire + **TEMP/TDM** (cartographie des bassins, drainages para-aortiques atypiques). Repérage per-opératoire à la sonde ± ICG.',
            stats: [{ value: '99mTc-nanocolloïdes', label: 'Traceur' }, { value: 'TEMP/TDM', label: 'Bassins multiples' }, { value: 'ICG', label: 'Option fluorescence' }] },
          { title: 'Points clés', list: ['Repérer les drainages para-aortiques (col/endomètre).', 'Délai injection–chirurgie ; double traçage augmente le taux de détection.'] },
        ],
      },
    },
  },

  // 7 — Quantification perfusion pulmonaire ──────────────────────────────────
  {
    id: 'V2_QUANTIF_PERFUSION_PULM', cat: 'pneumologie', catLabel: 'Pneumologie',
    title: 'Quantification de la perfusion pulmonaire pré-opératoire', difficulty: 'avancé',
    tags: ['perfusion pulmonaire', 'quantification', 'VEMS prédictif', 'chirurgie', 'MAA', '99mTc'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Lung perfusion scintigraphy quantification', url: 'https://www.eanm.org' },
      { title: 'ERS/ESTS — Évaluation fonctionnelle pré-opératoire', url: 'https://www.ersnet.org' },
    ],
    content: {
      lead: 'Avant une **chirurgie de résection pulmonaire** (cancer du poumon), la **scintigraphie de perfusion quantifiée** estime la contribution de chaque région à la fonction respiratoire, permettant de calculer le **VEMS post-opératoire prédictif** et d’évaluer l’opérabilité.',
      medecin_non_nuc: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À prédire la **fonction respiratoire restante** après l’ablation d’une partie du poumon, pour s’assurer que le patient tolérera l’intervention.',
            figure: { svg: VQ_LUNGS, alt: 'Répartition de la perfusion pulmonaire entre les deux poumons.', caption: 'La perfusion est quantifiée région par région pour estimer la fonction restante.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Méthode', text: 'Scintigraphie de perfusion (**99mTc-MAA**) avec quantification par régions d’intérêt (ou TEMP/TDM). VEMS post-op prédictif = VEMS préop × (% de perfusion du parenchyme conservé).',
            stats: [{ value: '99mTc-MAA', label: 'Perfusion' }, { value: '% par région', label: 'Quantification' }, { value: 'VEMS ppo', label: 'Calcul prédictif' }] },
          { title: 'Points clés', list: ['Découpage régional standardisé (lobes/poumons).', 'Corréler aux EFR et au type de résection prévu.', 'TEMP/TDM améliore la quantification régionale.'] },
        ],
      },
    },
  },

  // 8 — Dosimétrie en théranostique ──────────────────────────────────────────
  {
    id: 'V2_DOSIMETRIE_THERANOSTIQUE', cat: 'calculateurs', catLabel: 'Calculateurs',
    title: 'Principes de dosimétrie en théranostique (177Lu, 131I)', difficulty: 'avancé',
    tags: ['dosimétrie', 'théranostique', '177Lu', '131I', 'MIRD', 'organes à risque'],
    targetAudience: ['medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Dosimetry guidelines (MIRD formalism)', url: 'https://www.eanm.org' },
      { title: 'MIRD Committee — Pamphlets', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **dosimétrie** personnalise les traitements par radionucléides en estimant la **dose absorbée** (en Gy) par les tumeurs et les **organes à risque** (reins, moelle, glandes salivaires). Elle vise à maximiser l’efficacité tout en respectant les limites de toxicité.',
      medecin_nuc: {
        sections: [
          { title: 'Formalisme', text: 'Approche **MIRD** : dose absorbée = activité cumulée (intégrale de l’activité dans le temps) × facteurs S (géométrie/énergie). Nécessite des **images quantitatives répétées** (TEMP/TDM ou TEP) pour tracer la cinétique.',
            stats: [{ value: 'Gy', label: 'Dose absorbée' }, { value: 'Activité cumulée', label: 'Intégrale temporelle' }, { value: 'Facteurs S', label: 'Géométrie/énergie' }] },
          { title: 'Organes à risque', list: ['**177Lu-PSMA/DOTATATE** : reins et moelle osseuse.', '**131I** : moelle (sang), poumons (métastases diffuses).', 'Glandes salivaires (PSMA).'] },
          { title: 'En pratique', infoBox: { type: 'info', title: 'Vers la personnalisation', text: 'La dosimétrie permet d’adapter l’activité par cure (plutôt qu’un schéma fixe) pour délivrer une dose tumorale efficace sans dépasser les seuils rénaux/médullaires. Elle se généralise progressivement.' } },
        ],
      },
    },
  },

  // 9 — Contamination interne & décorporation ────────────────────────────────
  {
    id: 'V2_CONTAMINATION_INTERNE', cat: 'radioprotection', catLabel: 'Radioprotection',
    title: 'Contamination interne et décorporation', difficulty: 'avancé',
    tags: ['contamination interne', 'décorporation', 'radioprotection', 'incident', 'anthropogammamétrie'],
    targetAudience: ['medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'CIPR — Internal contamination & dose assessment', url: 'https://www.icrp.org' },
      { title: 'IRSN — Décorporation', url: 'https://www.irsn.fr' },
    ],
    content: {
      lead: 'La **contamination interne** (incorporation de radionucléides par inhalation, ingestion ou plaie) est un risque rare en médecine nucléaire. Sa gestion repose sur la **prévention**, l’**évaluation de la dose** (mesures, modèles biocinétiques) et, si nécessaire, la **décorporation**.',
      medecin_nuc: {
        sections: [
          { title: 'Évaluation', list: ['**Anthropogammamétrie** (mesure du rayonnement émis par le corps).', 'Analyses **radiotoxicologiques** (urines, selles) et modèles biocinétiques (CIPR) pour estimer la dose engagée.', 'Reconstitution de l’événement (voie, radionucléide, activité).'] },
          { title: 'Prévention et décorporation', text: 'Prévention : manipulation derrière écran, gants, hottes, contrôle de contamination. Selon le radionucléide, des agents de **décorporation** existent (ex. **iode stable** pour bloquer la thyroïde en cas d’iode radioactif ; chélateurs pour certains métaux).',
            figure: { svg: ALARA_TDS, alt: 'Principes temps-distance-écran de radioprotection.', caption: 'La prévention (temps, distance, écran, confinement) reste la meilleure protection.' } },
          { title: 'Cadre', infoBox: { type: 'warning', title: 'Procédure d’incident', text: 'Tout incident de contamination doit être tracé, déclaré selon la réglementation, et géré avec la PCR/le service de médecine du travail.' } },
        ],
      },
    },
  },

  // 10 — Histoire de la médecine nucléaire ───────────────────────────────────
  {
    id: 'V2_HISTOIRE_MN', cat: 'generalites', catLabel: 'Généralités',
    title: 'Histoire et évolution de la médecine nucléaire', difficulty: 'fondamental',
    tags: ['histoire', 'médecine nucléaire', 'iode-131', 'technétium', 'TEP', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI — History of nuclear medicine', url: 'https://www.snmmi.org' },
      { title: 'SFMN — Histoire de la spécialité', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'De la découverte de la radioactivité aux thérapies ciblées d’aujourd’hui, la **médecine nucléaire** a plus d’un siècle d’histoire. Quelques jalons aident à comprendre comment elle est devenue une discipline diagnostique et thérapeutique majeure.',
      patient: {
        sections: [
          { title: 'Les grandes étapes', steps: [
            { title: 'Années 1900–1930', text: 'Découverte de la radioactivité (Becquerel, les Curie) et premières applications médicales.' },
            { title: 'Années 1940–1950', text: 'L’**iode-131** traite les maladies de la thyroïde : naissance de la médecine nucléaire clinique.' },
            { title: 'Années 1960–1970', text: 'Le **technétium-99m** et la **gamma-caméra** (Anger) généralisent la scintigraphie.' },
            { title: 'Années 1990–2000', text: 'Essor de la **TEP au FDG** en oncologie, puis des machines **hybrides** (TEP-TDM).' },
            { title: 'Aujourd’hui', text: 'La **théranostique** (diagnostiquer et traiter avec la même cible : PSMA, DOTATATE) ouvre une médecine de précision.' },
          ] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Une dynamique continue', text: 'L’arrivée de nouveaux traceurs (PSMA, DOTATATE), de la dosimétrie personnalisée et des émetteurs alpha illustre une discipline en forte innovation, au carrefour de l’imagerie et de la thérapie de précision.' },
        ],
      },
    },
  },
];
