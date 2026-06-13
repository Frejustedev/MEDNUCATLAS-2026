// Lot 3 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  SENTINEL_NODE,
  SIRT_LIVER,
  GASTRIC_EMPTYING,
  PSMA_BINDING,
  PET_COINCIDENCE,
  BONE_SCAN,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_VIDANGE_GASTRIQUE', cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie',
    title: 'Scintigraphie de vidange gastrique', difficulty: 'intermédiaire',
    tags: ['vidange gastrique', 'gastroparésie', '99mTc', 'repas marqué', 'motricité'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI/EANM consensus — Gastric emptying scintigraphy', url: 'https://doi.org/10.2967/jnumed.107.048116' },
      { title: 'EANM guideline — Gastrointestinal motility', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **scintigraphie de vidange gastrique** mesure objectivement la vitesse à laquelle l’estomac se vide d’un **repas test marqué au 99mTc**. C’est l’examen de référence pour diagnostiquer une **gastroparésie** (vidange trop lente) ou une vidange accélérée.',
      patient: {
        sections: [
          { title: 'En quoi ça consiste ?', text: 'Vous mangez un **repas test** (souvent des œufs) contenant une infime quantité de produit faiblement radioactif. Une caméra mesure ensuite, à intervalles réguliers, la quantité d’aliment encore présente dans l’estomac.',
            figure: { svg: GASTRIC_EMPTYING, alt: 'Courbe de rétention gastrique : vidange normale décroissante vs gastroparésie avec retard.', caption: 'On mesure le temps de demi-vidange : une courbe qui descend trop lentement signe une gastroparésie.' } },
          { title: 'Préparation', list: ['**Jeûne** la veille au soir.', 'Arrêt des médicaments modifiant la motricité (prokinétiques, opioïdes) selon consignes.', 'Équilibre glycémique chez le diabétique (l’hyperglycémie ralentit la vidange).'] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Suspicion de **gastroparésie** (diabète, post-chirurgie, idiopathique) : nausées, satiété précoce, vomissements.', 'Symptômes dyspeptiques inexpliqués, syndrome de vidange rapide (dumping).'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Facteurs confondants', text: 'Hyperglycémie, opioïdes et prokinétiques faussent la mesure. Standardiser le repas et la durée (acquisition jusqu’à 4 h) est essentiel à l’interprétation.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole standardisé', text: 'Repas solide marqué au **99mTc** (ex. blanc d’œuf), acquisitions à **0, 1, 2 et 4 h**. Le paramètre clé est la **rétention à 2 h et 4 h** (gastroparésie si rétention > seuils de référence).',
            stats: [{ value: '4 h', label: 'Durée d’acquisition' }, { value: 'Rétention 2 h/4 h', label: 'Paramètres clés' }, { value: 'Repas solide', label: 'Standardisé' }] },
          { title: 'Pièges', list: ['Acquisition écourtée (< 4 h) : sous-diagnostic.', 'Glycémie non contrôlée.', 'Positionnement (correction d’atténuation géométrique antéro-postérieure).'] },
        ],
      },
    },
  },

  // 2 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_SAIGNEMENT_DIGESTIF', cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie',
    title: 'Recherche de saignement digestif et diverticule de Meckel', difficulty: 'intermédiaire',
    tags: ['hémorragie digestive', 'hématies marquées', 'Meckel', 'pertechnétate', '99mTc'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI Procedure Standard — GI bleeding scintigraphy', url: 'https://www.snmmi.org' },
      { title: 'EANM — Meckel’s diverticulum imaging', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Deux examens distincts : la **scintigraphie aux hématies marquées** localise une **hémorragie digestive** active à bas débit, tandis que la **scintigraphie au pertechnétate** recherche un **diverticule de Meckel** (muqueuse gastrique ectopique), surtout chez l’enfant et l’adulte jeune.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'Pour **localiser l’origine d’un saignement** dans le tube digestif quand les autres examens n’y parviennent pas, ou pour rechercher une petite malformation (diverticule de Meckel) responsable de saignements.' },
          { title: 'Déroulement', text: 'Selon l’indication : prélèvement et réinjection de vos propres globules rouges marqués, ou simple injection. Les images peuvent être prises **sur plusieurs heures** pour saisir le saignement au bon moment.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Hémorragie digestive obscure/à bas débit** (hématies marquées) : détecte des débits ~0,1–0,4 mL/min, plus sensible que l’angioscanner pour les saignements lents et intermittents.', '**Diverticule de Meckel** (pertechnétate) : saignement indolore de l’enfant/jeune adulte.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Saignement intermittent', text: 'L’atout des hématies marquées est l’imagerie prolongée/répétée : on peut détecter un saignement qui survient plusieurs heures après l’injection.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Techniques', text: '**Hématies marquées au 99mTc** (marquage in vitro/in vivo) : acquisition dynamique puis images tardives pour localiser le point de fuite et son territoire. **Meckel** : pertechnétate 99mTc capté par la muqueuse gastrique ectopique ; prétraitement par anti-H2 pour augmenter la sensibilité.',
            stats: [{ value: '~0,1 mL/min', label: 'Seuil de détection' }, { value: 'Images tardives', label: 'Atout hématies marquées' }, { value: 'Anti-H2', label: 'Sensibilisation (Meckel)' }] },
          { title: 'Pièges', list: ['Transit rapide du sang intraluminal : localiser le **site initial**, pas l’aval.', 'Activité urinaire/vésicale, fixation physiologique.', 'Meckel : faux négatifs si peu de muqueuse gastrique ectopique.'] },
        ],
      },
    },
  },

  // 3 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_LEUCOCYTES_MARQUES', cat: 'infection_inflammation', catLabel: 'Infection & Inflammation',
    title: 'Scintigraphie aux leucocytes marqués', difficulty: 'avancé',
    tags: ['leucocytes marqués', 'infection', 'prothèse', '99mTc-HMPAO', 'In-111', 'ostéomyélite'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI guidelines for radiolabelled leukocyte imaging', url: 'https://doi.org/10.1007/s00259-018-4052-x' },
      { title: 'EANM — Bone & joint infection imaging', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **scintigraphie aux leucocytes marqués** image l’accumulation des **globules blancs** du patient, marqués puis réinjectés, sur les **foyers infectieux**. Elle est particulièrement utile pour l’infection ostéo-articulaire, des prothèses et des parties molles, là où d’autres examens manquent de spécificité.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'On prélève un peu de votre sang, on **marque vos globules blancs** (cellules de défense) avec un traceur, puis on vous les réinjecte. Ils se rassemblent là où il y a une **infection**, ce que la caméra visualise.' },
          { title: 'Déroulement', text: 'L’examen s’étale sur plusieurs heures (prélèvement, marquage en laboratoire, réinjection, puis images à différents temps). Il peut nécessiter une **deuxième venue** le lendemain.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Suspicion d’**infection de prothèse** ostéo-articulaire (différencier descellement septique vs aseptique).', '**Ostéomyélite**, pied diabétique (infection osseuse vs ostéo-arthropathie).', 'Foyer infectieux profond inexpliqué, infection de paroi.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Couplage à la moelle', text: 'Pour le squelette, on couple souvent l’examen à une scintigraphie médullaire (colloïdes) : une fixation leucocytaire SANS fixation médullaire correspondante signe l’infection.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Marquage et acquisition', text: 'Leucocytes autologues marqués au **99mTc-HMPAO** (images à 30–60 min, 3–4 h, ± 24 h) ou à l’**111In-oxine** (24 h). Imagerie planaire + **TEMP/TDM**. Pour l’os, **scintigraphie médullaire complémentaire** (99mTc-colloïdes).',
            stats: [{ value: '99mTc-HMPAO', label: 'Marquage usuel' }, { value: '0,5 / 4 / 24 h', label: 'Temps d’acquisition' }, { value: 'TEMP/TDM', label: 'Localisation' }] },
          { title: 'Interprétation et pièges', list: ['Fixation **croissante dans le temps** = infection (vs décroissante).', 'Couplage médullaire indispensable au niveau osseux (faux positifs de la moelle hématopoïétique).', 'Manipulation cellulaire stérile rigoureuse ; rendement de marquage.'] },
        ],
      },
    },
  },

  // 4 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_INFECTION', cat: 'infection_inflammation', catLabel: 'Infection & Inflammation',
    title: 'TEP-TDM au 18F-FDG dans l’infection et l’inflammation', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'fièvre inexpliquée', 'endocardite', 'sarcoïdose', 'vascularite'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI guideline — FDG-PET/CT in infection and inflammation', url: 'https://doi.org/10.1007/s00259-013-2386-y' },
      { title: 'ESC Guidelines — Endocarditis (rôle de la TEP-FDG)', url: 'https://www.escardio.org' },
    ],
    content: {
      lead: 'La **TEP-TDM au 18F-FDG** détecte l’**hypermétabolisme** des foyers infectieux et inflammatoires (les leucocytes activés consomment du glucose). Elle est devenue un outil clé pour la **fièvre prolongée inexpliquée**, l’endocardite sur matériel, les vascularites des gros vaisseaux et le bilan d’activité de la sarcoïdose.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'Quand on cherche l’**origine d’une fièvre** ou d’une inflammation persistante sans cause évidente, la TEP au FDG explore tout le corps en une fois et oriente vers le **foyer** responsable.',
            figure: { svg: PET_COINCIDENCE, alt: 'Schéma de la détection en coïncidence en TEP.', caption: 'Comme en oncologie, la TEP détecte les zones de forte consommation de glucose — ici, l’inflammation.' } },
          { title: 'Préparation', text: 'Identique à une TEP-FDG : **jeûne 4–6 h**, glycémie contrôlée. Une préparation diététique spécifique (riche en graisses/pauvre en glucides) peut être demandée pour les recherches **cardiaques** (endocardite, sarcoïdose).' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Fièvre prolongée inexpliquée** et syndrome inflammatoire d’origine indéterminée.', '**Endocardite** sur prothèse valvulaire/dispositif, infection de prothèse vasculaire.', '**Vascularites des gros vaisseaux** (Horton, Takayasu), bilan d’activité de la **sarcoïdose**.'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Préparation cardiaque', text: 'Pour évaluer le cœur (endocardite, sarcoïdose), une préparation diététique (suppression du glucose myocardique) est indispensable, sinon la captation physiologique du myocarde masque les lésions.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier standard ; **préparation diététique** spécifique pour le cœur. Acquisitions tardives possibles pour augmenter le contraste lésionnel. TEMP/TDM non applicable (c’est de la TEP).',
            stats: [{ value: '~3–4 MBq/kg', label: 'FDG' }, { value: '60 min', label: 'Incorporation' }, { value: 'Régime gras', label: 'Préparation cardiaque' }] },
          { title: 'Pièges', list: ['Captation physiologique (myocarde, intestin, moelle après G-CSF, graisse brune).', 'Inflammation non infectieuse, cicatrice/post-op récent (< 6 semaines).', 'Faible spécificité isolée : interpréter avec le contexte clinico-biologique.'] },
        ],
      },
    },
  },

  // 5 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_GANGLION_SENTINELLE_SEIN', cat: 'senologie_gynecologie', catLabel: 'Sénologie & Gynécologie',
    title: 'Détection du ganglion sentinelle (cancer du sein)', difficulty: 'intermédiaire',
    tags: ['ganglion sentinelle', 'cancer du sein', 'lymphoscintigraphie', '99mTc-nanocolloïdes', 'sonde'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI practice guideline for sentinel node localization', url: 'https://doi.org/10.1007/s00259-013-2544-2' },
      { title: 'INCa / HAS — Ganglion sentinelle dans le cancer du sein', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'La **détection du ganglion sentinelle** identifie le **premier relais lymphatique** drainant une tumeur (sein, mélanome, gynécologie). Son analyse évite, s’il est indemne, un curage axillaire complet et ses séquelles. Le repérage combine un **radiotraceur** (lymphoscintigraphie + sonde per-opératoire) et souvent un colorant.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'On injecte près de la tumeur un produit faiblement radioactif qui suit le **même chemin lymphatique** que d’éventuelles cellules tumorales. Le premier ganglion atteint (« sentinelle ») est repéré, puis retiré et analysé pendant l’opération.',
            figure: { svg: SENTINEL_NODE, alt: 'Schéma : injection péri-tumorale, drainage lymphatique vers le ganglion sentinelle (1er relais), puis relais suivants.', caption: 'Le ganglion sentinelle est le premier relais drainant la tumeur : on le repère puis on l’analyse.' } },
          { title: 'Déroulement', text: 'Une **injection** (peu douloureuse) puis des images du trajet lymphatique. Le repérage final se fait au **bloc opératoire** avec une sonde détectrice.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Intérêt clinique', text: 'Chez les patientes éligibles (tumeur sans envahissement ganglionnaire clinique), la technique du ganglion sentinelle **réduit la morbidité** (lymphœdème, douleurs) par rapport au curage axillaire systématique, à valeur diagnostique équivalente.' },
          { title: 'Organisation', infoBox: { type: 'info', title: 'Logistique', text: 'L’injection du radiotraceur précède l’intervention (la veille ou le jour même selon protocole). Une bonne coordination médecine nucléaire–chirurgie est essentielle.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceur et protocole', text: '**99mTc-nanocolloïdes** (taille optimisée pour la rétention ganglionnaire), injection péri-tumorale/péri-aréolaire. **Lymphoscintigraphie** planaire ± TEMP/TDM pour cartographier le(s) ganglion(s) et repérer un drainage atypique (mammaire interne).',
            stats: [{ value: '99mTc-nanocolloïdes', label: 'Radiotraceur' }, { value: 'Sonde per-op', label: 'Repérage chirurgical' }, { value: '± colorant', label: 'Technique combinée' }] },
          { title: 'Points clés', list: ['Marquer le(s) point(s) cutané(s) en regard du/des ganglions.', 'Repérer les drainages extra-axillaires (mammaire interne).', 'Coordination du délai injection–chirurgie.'] },
        ],
      },
    },
  },

  // 6 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_177LU_PSMA_PLUVICTO', cat: 'prostate', catLabel: 'Cancer de la Prostate',
    title: 'Radioligand-thérapie au 177Lu-PSMA (Pluvicto)', difficulty: 'avancé',
    tags: ['177Lu-PSMA', 'Pluvicto', 'RLT', 'cancer de la prostate', 'mCRPC', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'VISION trial (N Engl J Med, 2021)', url: 'https://doi.org/10.1056/NEJMoa2107322' },
      { title: 'EANM procedure guidelines for 177Lu-PSMA radioligand therapy', url: 'https://doi.org/10.1007/s00259-023-06255-8' },
    ],
    content: {
      lead: 'La **radioligand-thérapie au 177Lu-PSMA** délivre un rayonnement β⁻ au contact des cellules de **cancer de la prostate** exprimant le PSMA. Validée par l’essai VISION dans le cancer **résistant à la castration métastatique (mCRPC)**, elle complète le couple théranostique avec la TEP-PSMA.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'La même cible que sur votre TEP-PSMA est utilisée, mais le traceur porte cette fois un **isotope qui irradie** les cellules tumorales de très près. Le traitement se fait en **plusieurs cures** espacées de quelques semaines.',
            figure: { svg: PSMA_BINDING, alt: 'Schéma : ligand PSMA marqué (177Lu pour la thérapie) fixé sur une cellule de cancer prostatique.', caption: 'Le 177Lu-PSMA cible le PSMA : diagnostic (68Ga) et thérapie (177Lu) partagent la même cible.' } },
          { title: 'Déroulement et précautions', list: ['Administration par perfusion, courte surveillance, consignes de **radioprotection** à domicile pour quelques jours.', 'Bien s’hydrater ; effets possibles : **sécheresse buccale**, fatigue, nausées, baisse des cellules sanguines.', 'Suivi biologique (PSA, NFS, fonction rénale) entre les cures.'] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications et place', text: 'mCRPC **PSMA-positif** (sur TEP-PSMA), après échec d’une hormonothérapie de nouvelle génération et d’une chimiothérapie par taxanes (selon AMM/essai VISION). La sélection théranostique par imagerie est indispensable.' },
          { title: 'Tolérance', list: ['Xérostomie (atteinte des glandes salivaires PSMA-avides), cytopénies, fatigue.', 'Surveillance hématologique, rénale et du PSA.', 'Contre-indications/precautions : insuffisance médullaire ou rénale sévère.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Schéma et radiopharmaceutique', text: '**177Lu-PSMA-617** (Pluvicto) : généralement **6 cures de ~7,4 GBq** espacées de ~6 semaines. Le 177Lu émet un β⁻ thérapeutique et un γ (113/208 keV) permettant imagerie et **dosimétrie** post-cure.',
            stats: [{ value: '6 × 7,4 GBq', label: 'Schéma (VISION)' }, { value: '~6,6 j', label: 'Période 177Lu' }, { value: 'TEP-PSMA+', label: 'Critère de sélection' }] },
          { title: 'Sélection et sécurité', list: ['Éligibilité : expression PSMA suffisante (TEP), absence de lésions discordantes FDG+/PSMA− dominantes.', 'Protection/sélection : fonction rénale, réserve médullaire.', 'Imagerie post-thérapeutique (208 keV) + dosimétrie ; gestion des effluents.'] },
        ],
      },
    },
  },

  // 7 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_SIRT_Y90', cat: 'sirt', catLabel: 'Radioembolisation (SIRT)',
    title: 'Radioembolisation hépatique au 90Y (SIRT)', difficulty: 'avancé',
    tags: ['SIRT', '90Y', 'microsphères', 'CHC', 'métastases hépatiques', 'MAA', 'shunt pulmonaire'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM procedure guideline for 90Y radioembolization', url: 'https://doi.org/10.1007/s00259-021-05245-y' },
      { title: 'SNMMI — Hepatic radioembolization', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **radioembolisation (SIRT)** injecte des **microsphères chargées en 90Y** dans l’artère hépatique : elles se logent préférentiellement dans les tumeurs du foie (richement vascularisées par l’artère) et les **irradient de l’intérieur** tout en épargnant le foie sain. Indiquée dans le carcinome hépatocellulaire et certaines métastases hépatiques.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'De minuscules billes radioactives sont amenées par un **cathéter** jusqu’aux vaisseaux qui nourrissent la tumeur du foie. Elles s’y bloquent et délivrent leur rayonnement **localement**, sur quelques jours.',
            figure: { svg: SIRT_LIVER, alt: 'Schéma : cathéter dans l’artère hépatique délivrant des microsphères de 90Y qui se logent dans la tumeur du foie.', caption: 'Les microsphères de 90Y se logent dans la tumeur via l’artère hépatique et l’irradient de l’intérieur.' } },
          { title: 'En pratique', text: 'Le traitement se fait en **deux temps** : un examen préparatoire (bilan vasculaire + simulation), puis le traitement proprement dit. Une courte hospitalisation et un suivi par imagerie suivent.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Carcinome hépatocellulaire** non résécable (selon stade et fonction hépatique).', '**Métastases hépatiques** (colorectales, TNE…) chimioréfractaires, à prédominance hépatique.'] },
          { title: 'Évaluation préalable', infoBox: { type: 'warning', title: 'Étape de simulation (MAA)', text: 'Une artériographie avec injection de MAA-99mTc évalue le shunt hépato-pulmonaire et la distribution : un shunt élevé contre-indique ou limite la dose pour éviter une pneumopathie radique.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Déroulement en deux temps', steps: [
            { title: 'Work-up (MAA)', text: 'Artériographie + 99mTc-MAA : calcul du shunt pulmonaire (LSF), repérage de dérivations digestives à emboliser, dosimétrie prévisionnelle.' },
            { title: 'Traitement 90Y', text: 'Injection des microsphères (verre ou résine) dans le territoire ciblé ; activité calculée par dosimétrie.' },
            { title: 'Contrôle post-traitement', text: 'Imagerie TEP du 90Y (paire de photons issue du bremsstrahlung/positons rares) ou TEMP bremsstrahlung pour vérifier la distribution.' },
          ] },
          { title: 'Sécurité', list: ['Shunt pulmonaire élevé (LSF) → risque de pneumopathie radique : réduction de dose ou contre-indication.', 'Dérivations gastro-duodénales : embolisation préventive (risque d’ulcère radique).', 'Dosimétrie personnalisée (modèle de partition).'] },
        ],
      },
    },
  },

  // 8 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_PEDIATRIE_MN', cat: 'pediatrie', catLabel: 'Pédiatrie',
    title: 'Spécificités de la médecine nucléaire en pédiatrie', difficulty: 'intermédiaire',
    tags: ['pédiatrie', 'dose pédiatrique', 'EANM dosage card', 'radioprotection', 'sédation'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM Dosage Card (paediatric activities)', url: 'https://www.eanm.org/publications/dosage-card/' },
      { title: 'SNMMI/Image Gently — Paediatric nuclear medicine', url: 'https://www.imagegently.org' },
    ],
    content: {
      lead: 'La médecine nucléaire pédiatrique adapte chaque étape à l’enfant : **activités réduites** et calculées selon le poids (EANM Dosage Card), **radioprotection** renforcée (organisme plus radiosensible), et prise en charge **psychologique** (préparation, présence parentale, sédation rare et encadrée).',
      patient: {
        sections: [
          { title: 'Pour les parents', text: 'Les examens sont **adaptés à l’enfant** : la dose de produit est calculée selon son poids et réduite au minimum. La préparation (explications, doudou, présence d’un parent) limite l’angoisse et le besoin d’immobilisation.' },
          { title: 'Sécurité', infoBox: { type: 'tip', title: 'Dose optimisée', text: 'Le principe ALARA est poussé au maximum chez l’enfant : activité minimale nécessaire pour une image de qualité diagnostique, hydratation et mictions fréquentes pour éliminer le traceur.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications fréquentes', list: ['Néphro-urologie : **DMSA** (cicatrices, pyélonéphrite), **MAG3** (obstruction, reflux).', 'Os : ostéomyélite, douleurs, tumeurs.', 'Oncologie : **MIBG** (neuroblastome), TEP-FDG (lymphomes).'] },
          { title: 'À savoir', text: 'Bien préciser le poids et l’indication : l’activité injectée est **calculée** (pas une dose adulte fixe). La coopération de l’enfant et la logistique (jeûne, sédation éventuelle) se préparent en amont.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Calcul d’activité et protection', text: 'Activités selon l’**EANM Dosage Card** (activité de base × facteur lié au poids, avec activités minimales). Optimisation des protocoles (temps d’acquisition vs activité), contention douce, sédation uniquement si indispensable et encadrée.',
            stats: [{ value: 'EANM Card', label: 'Calcul par poids' }, { value: 'ALARA++', label: 'Radioprotection' }, { value: 'Activité min.', label: 'Seuils de qualité' }] },
          { title: 'Points pratiques', list: ['Immobilisation/distraction plutôt que sédation quand possible.', 'Hydratation et mictions pour réduire la dose vésicale/gonadique.', 'Information adaptée à l’âge ; présence parentale (radioprotection des accompagnants).'] },
        ],
      },
    },
  },

  // 9 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_PREPARATION_PATIENT', cat: 'preparation', catLabel: 'Préparation Patient',
    title: 'Bien préparer son examen de médecine nucléaire', difficulty: 'fondamental',
    tags: ['préparation', 'jeûne', 'grossesse', 'allaitement', 'radioprotection', 'patient'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Patient information & preparation', url: 'https://www.eanm.org' },
      { title: 'SFMN — Information des patients', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'Une bonne **préparation** conditionne la qualité d’un examen de médecine nucléaire et votre confort. Ce guide rassemble les consignes générales — à compléter par les instructions précises du service qui réalise votre examen.',
      patient: {
        sections: [
          { title: 'Avant l’examen', list: ['Respectez les consignes de **jeûne** éventuel (souvent 4–6 h pour une TEP-FDG ; aucune pour beaucoup de scintigraphies).', 'Apportez vos **ordonnances, comptes-rendus et imageries** antérieures.', 'Signalez vos **médicaments** (certains sont à suspendre).', 'Buvez normalement sauf consigne contraire.'] },
          { title: 'Signalez impérativement', infoBox: { type: 'warning', title: 'Grossesse et allaitement', text: 'Prévenez toujours l’équipe si vous êtes (ou pourriez être) enceinte ou si vous allaitez : la conduite est adaptée (report, ajustement, interruption temporaire de l’allaitement).' } },
          { title: 'Après l’examen', text: 'La radioactivité utilisée est **faible et transitoire**. Buvez abondamment pour l’éliminer. Quelques heures de **distance** avec les jeunes enfants et les femmes enceintes peuvent être recommandées après certains examens. Vous reprenez ensuite une vie normale.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Informations à transmettre', list: ['Indication claire et antériorité d’imagerie.', 'Diabète/glycémie (TEP-FDG), fonction rénale, allergies.', 'Grossesse/allaitement, poids (calcul d’activité, pédiatrie).', 'Traitements interférents (iode, caféine, analogues de somatostatine, etc.).'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Check-list d’accueil', list: ['Vérification identité, indication, contre-indications (grossesse).', 'Contrôle glycémie (FDG), arrêt des interférents selon l’examen.', 'Information/consentement, consignes de radioprotection écrites en sortie.', 'Hydratation, miction avant acquisition pelvienne.'] },
        ],
      },
    },
  },

  // 10 ──────────────────────────────────────────────────────────────────────
  {
    id: 'V2_CONTROLE_QUALITE_RADIOPHARMA', cat: 'radiopharmacie', catLabel: 'Radiopharmacie',
    title: 'Marquage et contrôle qualité des radiopharmaceutiques', difficulty: 'avancé',
    tags: ['radiopharmacie', 'trousses froides', 'pureté radiochimique', 'chromatographie', 'BPP', 'CQ'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Pharmacopée Européenne — Préparations radiopharmaceutiques', url: 'https://www.edqm.eu' },
      { title: 'EANM — Guidelines on current Good Radiopharmacy Practice (cGRPP)', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Un **radiopharmaceutique** associe un vecteur (molécule ciblant un organe/processus) et un radionucléide. Sa **préparation** (marquage de « trousses froides ») et son **contrôle qualité** garantissent que le bon traceur, pur et stérile, est administré — condition d’un examen fiable et sûr.',
      patient: {
        sections: [
          { title: 'D’où vient le produit injecté ?', text: 'Le produit est **préparé sur place** par une équipe spécialisée (radiopharmacie), puis **contrôlé** avant de vous être administré : on vérifie qu’il est correct, pur et stérile. C’est un gage de sécurité.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Pourquoi c’est important', text: 'La fiabilité de l’examen dépend d’un marquage correct : une **pureté radiochimique** insuffisante (traceur mal lié) crée des fixations parasites et altère l’interprétation. La radiopharmacie applique des contrôles standardisés avant chaque lot.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Marquage des trousses froides', text: 'La plupart des traceurs au **99mTc** sont obtenus en reconstituant une **trousse froide** (kit lyophilisé contenant le vecteur + agent réducteur, ex. ion stanneux) avec l’éluat de pertechnétate. Respect des volumes, activités, temps et températures.',
            figure: { svg: BONE_SCAN, alt: 'Illustration : le MDP marqué au 99mTc se fixe sur l’os — exemple de trousse froide marquée.', caption: 'Exemple : le MDP (scintigraphie osseuse) est une trousse froide marquée au 99mTc.' } },
          { title: 'Contrôles qualité', list: ['**Pureté radiochimique** par chromatographie (CCM) : % de traceur correctement marqué vs pertechnétate libre/hydrolysé-réduit.', '**Pureté radionucléidique** (breakthrough 99Mo) et **chimique** (aluminium) de l’éluat.', 'pH, aspect, **stérilité** et apyrogénicité ; traçabilité du lot.'] },
          { title: 'Bonnes pratiques', infoBox: { type: 'info', title: 'cGRPP', text: 'Les bonnes pratiques de radiopharmacie (cGRPP, Pharmacopée) encadrent la préparation : zones à atmosphère contrôlée, radioprotection du manipulateur, double contrôle et documentation.' } },
        ],
      },
    },
  },
];
