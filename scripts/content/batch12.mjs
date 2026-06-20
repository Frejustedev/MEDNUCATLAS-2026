// Lot 12 — Densification des catégories légères (assistance IA, à relire). IDs V2_.
// Cibles : néphro-urologie, ORL/salivaires, pédiatrie, rhumatologie,
// calculateurs, préparation, pneumologie, radiopharmacie.
import {
  RENOGRAM,
  PET_COINCIDENCE,
  SENTINEL_NODE,
  BONE_SCAN,
  DECAY_SCHEME,
  MPI_PROTOCOL,
  TC_GENERATOR,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — Scintigraphie rénale au captopril ─────────────────────────────────────
  {
    id: 'V2_RENO_CAPTOPRIL', cat: 'nephro_urologie', catLabel: 'Néphrologie & Urologie',
    title: 'Scintigraphie rénale au captopril (HTA réno-vasculaire)', difficulty: 'avancé',
    tags: ['captopril', 'HTA réno-vasculaire', 'sténose artère rénale', 'MAG3', 'rénogramme', 'IEC'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Guidelines for captopril renography', url: 'https://www.eanm.org' },
      { title: 'SNMMI — Procedure standard for diuretic & captopril renography', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **scintigraphie rénale au captopril** recherche une **hypertension réno-vasculaire** liée à une sténose de l’artère rénale. En bloquant l’angiotensine II par un IEC (captopril), on démasque la dépendance du rein sténosé à ce mécanisme : le rénogramme du côté atteint se dégrade après captopril, signant une sténose **fonctionnellement significative**.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À savoir si un **rétrécissement d’une artère du rein** est responsable de votre **tension élevée**. C’est utile car toutes les sténoses ne provoquent pas d’HTA : cet examen mesure le retentissement **réel** sur le fonctionnement du rein.' },
          { title: 'Comment ça se passe ?', list: [
            'Vous prenez un comprimé (**captopril**) puis on injecte un petit traceur.',
            'La caméra suit l’arrivée et l’élimination du traceur par chaque rein.',
            'Souvent, un 2ᵉ examen « sans captopril » sert de comparaison.',
            'On surveille votre tension pendant l’examen (elle peut baisser).',
          ] },
          { title: 'Précautions', infoBox: { type: 'warning', title: 'Vos médicaments', text: 'Certains traitements de la tension (IEC/ARA2) sont parfois arrêtés quelques jours avant, sur consigne du médecin. Buvez bien et signalez si vous êtes enceinte.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: [
            'Suspicion d’**HTA réno-vasculaire** : HTA résistante, HTA d’aggravation rapide, OAP flash, asymétrie de taille rénale.',
            'Évaluation du **caractère fonctionnel** d’une sténose connue (artériographie/angioscanner) avant revascularisation.',
            'Insuffisance rénale aggravée sous IEC/ARA2.',
          ] },
          { title: 'Interprétation', text: 'Un test **positif** = aggravation du rénogramme côté sténosé **après captopril** (allongement du temps de transit, baisse de la fonction relative). Il prédit mieux la réponse tensionnelle à la revascularisation que la seule imagerie morphologique.' },
          { title: 'Limites', infoBox: { type: 'info', title: 'Bon à savoir', text: 'Sensibilité réduite en cas d’**insuffisance rénale** ou de sténose bilatérale ; l’angioscanner/angio-IRM reste l’imagerie morphologique de 1ʳᵉ intention.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Hydratation. **Captopril 25–50 mg PO** (ou énalaprilate IV) ~60 min avant le traceur ; surveillance TA. Traceur : **99mTc-MAG3** (sécrétion tubulaire, préféré si fonction altérée) ou 99mTc-DTPA (filtration). Étude couplée **post-captopril** vs **basale** (un autre jour).',
            figure: { svg: RENOGRAM, alt: 'Courbes rénographiques activité-temps des deux reins.', caption: 'Côté sténosé : courbe qui se dégrade (rétention, pic retardé) après captopril.' },
            stats: [{ value: '99mTc-MAG3', label: 'Traceur de choix' }, { value: '~60 min', label: 'Délai captopril' }, { value: 'Δ rénogramme', label: 'Critère' }] },
          { title: 'Critères de positivité', list: [
            'Allongement du **temps au pic (Tmax)** > 11 min ou Δ > 2–4 min après captopril.',
            'Chute de la **fonction relative** du rein concerné.',
            'Rétention parenchymateuse accrue (grade de Saarinen/critères de consensus).',
          ] },
          { title: 'Pièges & sécurité', list: [
            'Arrêt préalable des IEC/ARA2 au long cours (faux négatifs) selon protocole.',
            'Risque d’**hypotension** : voie veineuse, surveillance, réhydratation.',
            'Déshydratation et insuffisance rénale sévère dégradent l’examen.',
          ] },
        ],
      },
    },
  },

  // 2 — Scintigraphie du greffon rénal ────────────────────────────────────────
  {
    id: 'V2_TRANSPLANT_RENAL', cat: 'nephro_urologie', catLabel: 'Néphrologie & Urologie',
    title: 'Scintigraphie du greffon rénal (suivi de transplantation)', difficulty: 'avancé',
    tags: ['transplantation rénale', 'greffon', 'MAG3', 'nécrose tubulaire aiguë', 'rejet', 'fistule urinaire'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — Renal transplant scintigraphy', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **scintigraphie du greffon rénal** évalue la **perfusion** et la **fonction** d’un rein transplanté, et recherche des **complications** précoces (nécrose tubulaire aiguë, rejet, obstruction, fistule urinaire, thrombose). Non invasive et sans néphrotoxicité, elle est précieuse en cas de dégradation de la fonction du greffon.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À vérifier que votre **rein greffé** est bien **vascularisé** et qu’il **filtre et élimine** correctement, et à comprendre une éventuelle baisse de son fonctionnement.' },
          { title: 'Avantages', text: 'L’examen **n’utilise pas de produit de contraste iodé** et n’abîme pas le rein : il peut être répété sans danger pour surveiller l’évolution.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: [
            'Dégradation de la fonction du greffon (élévation de la créatinine, oligurie).',
            'Suspicion de **complication chirurgicale** : fistule/urinome, obstruction, collection.',
            'Évaluation de la **perfusion** (thrombose artérielle/veineuse), suivi de la reprise fonctionnelle.',
          ] },
          { title: 'Orientation diagnostique', infoBox: { type: 'info', title: 'Profils typiques', text: 'NTA : perfusion conservée mais excrétion retardée (post-greffe immédiat). Rejet : perfusion ET fonction altérées. Obstruction/fuite : anomalies de l’élimination/extravasation du traceur.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: '**99mTc-MAG3** (référence). Phase **angiographique** (perfusion du greffon en fosse iliaque) puis phase **fonctionnelle** dynamique (extraction, transit, excrétion). Quantification : index de perfusion, temps de transit, courbes.',
            figure: { svg: RENOGRAM, alt: 'Rénogramme du greffon : perfusion puis excrétion.', caption: 'On analyse séparément la vascularisation et la capacité d’élimination du greffon.' },
            stats: [{ value: '99mTc-MAG3', label: 'Traceur' }, { value: 'Perfusion + fonction', label: '2 temps' }, { value: 'Sans iode', label: 'Répétable' }] },
          { title: 'Sémiologie', table: {
            headers: ['Complication', 'Perfusion', 'Excrétion / signe'],
            rows: [
              ['Nécrose tubulaire aiguë', 'Conservée', 'Excrétion retardée, rétention parenchymateuse'],
              ['Rejet aigu', 'Diminuée', 'Fonction globale altérée'],
              ['Obstruction urétérale', 'Conservée', 'Dilatation, rétention en aval'],
              ['Fistule / urinome', 'Conservée', 'Extravasation extra-urinaire du traceur'],
              ['Thrombose vasculaire', 'Absente', 'Greffon « muet » (urgence)'],
            ],
          } },
          { title: 'Pièges', list: ['Confronter à l’écho-Doppler et à la biopsie (rejet).', 'Vessie pleine masquant une fuite (vidange/clichés tardifs).', 'Contexte chronologique post-greffe indispensable.'] },
        ],
      },
    },
  },

  // 3 — TEP-FDG cavum & larynx ────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_CAVUM', cat: 'orl_salivaires', catLabel: 'ORL & Glandes salivaires',
    title: 'TEP-FDG des cancers du cavum et du larynx', difficulty: 'avancé',
    tags: ['cavum', 'nasopharynx', 'larynx', 'TEP-FDG', 'ORL', 'récidive', 'carcinome épidermoïde'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET/CT in head and neck cancer', url: 'https://www.eanm.org' },
      { title: 'HAS — Cancers des voies aérodigestives supérieures', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'Dans les cancers du **nasopharynx (cavum)** et du **larynx**, la **TEP-FDG** précise le bilan d’extension ganglionnaire et métastatique, recherche un **second cancer** synchrone, guide la radiothérapie et détecte les **récidives** — notamment lorsque l’anatomie est remaniée par la chirurgie ou l’irradiation.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: [
            'Bilan d’extension initial des stades localement avancés (N+, recherche M).',
            'Recherche du **primitif** devant une adénopathie cervicale métastatique.',
            'Évaluation de la **réponse** après radiochimiothérapie (à ≥ 12 semaines).',
            'Suspicion de **récidive** en zone irradiée/opérée.',
          ] },
          { title: 'Pourquoi la TEP ?', infoBox: { type: 'info', title: 'Valeur ajoutée', text: 'Excellente valeur prédictive négative à distance de la radiothérapie : une TEP négative à 3 mois autorise souvent une surveillance plutôt qu’un curage systématique.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole & lecture', text: 'TEP-FDG corps entier, bras le long du corps, **acquisition dédiée tête-cou** bras relevés possible. Lecture attentive des captations physiologiques (muscles, graisse brune, tissu lymphoïde de Waldeyer, cordes vocales en phonation).',
            figure: { svg: PET_COINCIDENCE, alt: 'Principe de détection en coïncidence (TEP).', caption: 'La TEP cartographie l’activité métabolique du primitif, des aires ganglionnaires et des sites à distance.' },
            stats: [{ value: '≥ 12 sem.', label: 'Délai post-RT' }, { value: 'VPN élevée', label: 'Après traitement' }, { value: 'Waldeyer', label: 'Piège physiologique' }] },
          { title: 'Pièges spécifiques', list: [
            'Inflammation post-radique précoce → faux positifs (respecter le délai).',
            'Captation musculaire (déglutition/phonation), graisse brune cervicale.',
            'Cavum : asymétrie physiologique du tissu lymphoïde à ne pas surinterpréter.',
            'Confronter à la nasofibroscopie et à l’IRM (extension locale, base du crâne).',
          ] },
        ],
      },
    },
  },

  // 4 — Ganglion sentinelle ORL ───────────────────────────────────────────────
  {
    id: 'V2_SENTINELLE_ORL', cat: 'orl_salivaires', catLabel: 'ORL & Glandes salivaires',
    title: 'Ganglion sentinelle des cancers de la cavité buccale', difficulty: 'avancé',
    tags: ['ganglion sentinelle', 'cavité buccale', 'ORL', 'SPECT/CT', '99mTc-nanocolloïde', 'lymphoscintigraphie'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Sentinel node in head and neck cancer', url: 'https://www.eanm.org' },
      { title: 'SNMMI — Lymphoscintigraphy procedure standard', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La technique du **ganglion sentinelle** dans les cancers **précoces de la cavité buccale** (cT1–T2 N0) permet de cibler le **premier relais ganglionnaire** du drainage lymphatique. Elle évite un curage cervical systématique chez les patients réellement N0, tout en détectant les micro-métastases occultes.',
      medecin_non_nuc: {
        sections: [
          { title: 'Principe & intérêt', text: 'Le **premier ganglion** drainant la tumeur est repéré par lymphoscintigraphie ; s’il est indemne, le reste du cou l’est très probablement. Cela réduit la morbidité d’un évidement cervical inutile.' },
          { title: 'Indications', list: ['Carcinome épidermoïde **cT1–T2 cN0** de la cavité buccale.', 'Drainage parfois bilatéral/aberrant (langue, plancher) → cartographie utile.'] },
          { title: 'Limites', infoBox: { type: 'warning', title: 'Cavité buccale', text: 'Proximité du site d’injection et des ganglions de niveau I (« shine-through ») : la SPECT/CT et le repérage peropératoire sont essentiels. Réservé à des équipes entraînées.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Injection **péri-tumorale** de **99mTc-nanocolloïdes** (± guidage). Lymphoscintigraphie dynamique + statiques précoces/tardives, puis **SPECT/CT** pour la localisation anatomique. Détection peropératoire à la sonde gamma (± colorant/ICG).',
            figure: { svg: SENTINEL_NODE, alt: 'Drainage du traceur vers le premier relais ganglionnaire.', caption: 'Le traceur migre du site tumoral vers le(s) ganglion(s) sentinelle(s) à reséquer.' },
            stats: [{ value: '99mTc-nanocoll.', label: 'Traceur' }, { value: 'SPECT/CT', label: 'Localisation' }, { value: 'Sonde γ', label: 'Peropératoire' }] },
          { title: 'Points techniques', list: [
            'Acquisitions précoces pour distinguer 1er relais et ganglions de 2ᵉ échelon.',
            'Gérer le **shine-through** du site d’injection (niveau I).',
            'Analyse histologique fine (coupes sériées, IHC) du sentinelle.',
          ] },
        ],
      },
    },
  },

  // 5 — Scintigraphie osseuse pédiatrique ─────────────────────────────────────
  {
    id: 'V2_SCINTI_OSSEUSE_PEDIATRIE', cat: 'pediatrie', catLabel: 'Pédiatrie',
    title: 'Scintigraphie osseuse en pédiatrie (boiterie, Perthes, ostéomyélite)', difficulty: 'intermédiaire',
    tags: ['pédiatrie', 'scintigraphie osseuse', 'Perthes', 'ostéomyélite', 'boiterie', 'HDP', 'cartilage de croissance'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Paediatric bone scintigraphy guidelines', url: 'https://www.eanm.org' },
      { title: 'EANM — Paediatric dosage card', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Chez l’enfant, la **scintigraphie osseuse** explore une **boiterie inexpliquée**, une suspicion d’**ostéomyélite**, une **ostéochondrite (maladie de Legg-Calvé-Perthes)** ou des douleurs osseuses. Sa force : un **balayage corps entier** sensible en une acquisition, avec des activités adaptées au poids.',
      patient: {
        sections: [
          { title: 'Pour les parents', text: 'L’examen aide à trouver **d’où vient la douleur ou la boiterie** de votre enfant, même quand les radiographies sont normales. Le produit injecté est en très petite quantité et **adapté au poids**.' },
          { title: 'Conseils', list: ['Faire **boire** l’enfant et **uriner** souvent après l’examen.', 'Apporter un doudou ; la coopération facilite des images nettes.', 'Indolore en dehors de la petite piqûre.'] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications fréquentes', list: [
            'Boiterie fébrile ou non, douleur localisée sans cause radiographique.',
            'Suspicion d’**ostéomyélite** aiguë (sensibilité précoce élevée).',
            'Maladie de **Perthes** (hypofixation initiale puis revascularisation).',
            'Recherche de lésions multiples (histiocytose, métastases de neuroblastome).',
          ] },
          { title: 'Spécificités pédiatriques', infoBox: { type: 'info', title: 'Cartilages de croissance', text: 'Les **physes** fixent intensément de façon physiologique : l’interprétation compare les deux côtés et tient compte de l’âge. Toujours une lecture symétrique.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: '**99mTc-HDP/MDP**, activité selon la **dosage card EANM** (fonction du poids, minimum garanti). Mode **3 phases** si infection. Acquisitions de haute résolution (pinhole sur hanches pour Perthes), immobilisation/distraction adaptées.',
            figure: { svg: BONE_SCAN, alt: 'Distribution squelettique du traceur osseux.', caption: 'Chez l’enfant, les cartilages de croissance fixent intensément : lecture comparative obligatoire.' },
            stats: [{ value: 'Dosage card', label: 'Activité/poids' }, { value: '3 phases', label: 'Si infection' }, { value: 'Pinhole', label: 'Hanches (Perthes)' }] },
          { title: 'Pièges', list: [
            'Ne pas confondre physe et lésion (symétrie, âge osseux).',
            'Perthes précoce : **hypofixation** de la tête fémorale (≠ hyperfixation habituelle).',
            'Optimiser la dose (ALARA) et l’hydratation pour la vessie.',
          ] },
        ],
      },
    },
  },

  // 6 — Scintigraphie 3 phases / SDRC ─────────────────────────────────────────
  {
    id: 'V2_SDRC_3PHASES', cat: 'rhumatologie', catLabel: 'Rhumatologie',
    title: 'Scintigraphie osseuse 3 phases dans l’algodystrophie (SDRC)', difficulty: 'intermédiaire',
    tags: ['SDRC', 'algodystrophie', '3 phases', 'CRPS', 'scintigraphie osseuse', 'Sudeck'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Bone scintigraphy in CRPS', url: 'https://www.eanm.org' },
      { title: 'Critères de Budapest — CRPS', url: 'https://www.iasp-pain.org' },
    ],
    content: {
      lead: 'La **scintigraphie osseuse 3 phases** aide au diagnostic du **syndrome douloureux régional complexe (SDRC / algodystrophie)**, surtout à la phase précoce : on recherche une **hyperhémie** et une **hyperfixation osseuse périarticulaire** typique (atteinte des extrémités, distribution juxta-articulaire en « bandes »).',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À objectiver une **algodystrophie** : une réaction douloureuse et inflammatoire d’un membre (souvent après un traumatisme, une fracture ou une chirurgie), avec douleur, gonflement et raideur.' },
          { title: 'Déroulement', text: 'Trois séries d’images : juste après l’injection (**circulation**), quelques minutes après (**tissus**), puis 2–4 h plus tard (**os**). Vous restez simplement allongé.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Place diagnostique', text: 'Le diagnostic du SDRC est **clinique** (critères de Budapest) ; la scintigraphie 3 phases est un **examen d’appoint** utile en cas de doute, surtout à la phase chaude initiale.' },
          { title: 'Aspect typique', infoBox: { type: 'info', title: 'Signe évocateur', text: 'Hyperfixation **périarticulaire diffuse** sur le temps tardif d’un membre, avec hyperhémie aux temps précoces. La sensibilité décroît avec l’ancienneté (phase froide).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole 3 phases', steps: [
            { title: 'Phase 1 — vasculaire', text: 'Acquisition dynamique dès l’injection de 99mTc-HDP/MDP : perfusion artérielle du segment.' },
            { title: 'Phase 2 — tissulaire', text: 'Image précoce (≈ 5 min) : « blood pool », hyperhémie des parties molles.' },
            { title: 'Phase 3 — osseuse', text: 'Images tardives (2–4 h) : fixation osseuse, distribution périarticulaire.' },
          ] },
          { title: 'Lecture & pièges', list: [
            'SDRC du membre supérieur souvent plus typique que l’inférieur.',
            'Comparer côté sain ; attention aux remaniements post-traumatiques/chirurgicaux récents.',
            'Phase froide (tardive dans l’évolution) : scintigraphie volontiers normale → ne l’élimine pas.',
          ],
            figure: { svg: BONE_SCAN, alt: 'Fixation osseuse régionale en scintigraphie.', caption: 'SDRC : hyperfixation périarticulaire en « bandes » sur les images tardives.' } },
        ],
      },
    },
  },

  // 7 — Calcul d'activité I-131 thérapie ──────────────────────────────────────
  {
    id: 'V2_CALCUL_I131_THERAPIE', cat: 'calculateurs', catLabel: 'Calculateurs & Outils',
    title: 'Calcul de l’activité en thérapie par iode-131', difficulty: 'avancé',
    tags: ['iode-131', 'calcul d’activité', 'dosimétrie', 'thyroïde', 'MBq', 'mCi', 'décroissance'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Dosimetry & I-131 therapy guidelines', url: 'https://www.eanm.org' },
      { title: 'SFMN — Guide thérapie à l’iode-131', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'Choisir l’**activité d’iode-131** à administrer (hyperthyroïdie ou cancer thyroïdien différencié) repose sur des **approches forfaitaires** ou **dosimétriques**. Cet outil de référence rappelle les conversions (MBq/mCi), la **décroissance** (T½ ≈ 8,02 j) et les ordres de grandeur usuels.',
      medecin_non_nuc: {
        sections: [
          { title: 'Repères de conversion', table: {
            headers: ['Grandeur', 'Valeur'],
            rows: [
              ['1 mCi', '37 MBq'],
              ['1 GBq', '27,03 mCi'],
              ['Période de l’iode-131 (T½)', '≈ 8,02 jours'],
              ['Émissions', 'β⁻ (thérapeutique) + γ 364 keV (imagerie/RP)'],
            ],
          } },
          { title: 'À retenir', infoBox: { type: 'warning', title: 'Conversion critique', text: 'Erreur classique : confondre **mCi** et **MBq** (facteur 37). Toujours vérifier l’unité de prescription et de calibration avant administration.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Décroissance radioactive', text: 'Activité résiduelle : **A(t) = A₀ · e^(−0,693·t / T½)** avec T½ = 8,02 j. Exemple : à 8 jours, il reste ≈ 50 % de l’activité ; à 16 jours ≈ 25 %. Indispensable pour planifier mesure de calibration et radioprotection.',
            figure: { svg: DECAY_SCHEME, alt: 'Schéma de décroissance radioactive exponentielle.', caption: 'La décroissance de l’iode-131 suit une exponentielle de période ≈ 8 jours.' },
            stats: [{ value: '8,02 j', label: 'Période I-131' }, { value: '364 keV', label: 'γ principal' }, { value: '37 MBq', label: '= 1 mCi' }] },
          { title: 'Approches de prescription', table: {
            headers: ['Situation', 'Approche', 'Ordre de grandeur*'],
            rows: [
              ['Hyperthyroïdie (Basedow/GMN)', 'Forfaitaire ou dose absorbée cible (Marinelli)', '370–740 MBq (10–20 mCi)'],
              ['Ablation des reliquats (bas risque)', 'Forfaitaire', '1,1 GBq (30 mCi)'],
              ['Cancer thyroïdien (haut risque)', 'Forfaitaire ou dosimétrie', '3,7 GBq (100 mCi) ou +'],
            ],
          } },
          { title: 'Formule de Marinelli (repère)', text: 'Activité = (dose cible × masse de la cible) / (captation × période efficace × constante). Les valeurs exactes dépendent du protocole local et de la dosimétrie individuelle.',
            infoBox: { type: 'warning', title: '*Avertissement', text: 'Les fourchettes ci-dessus sont **indicatives et pédagogiques**. La prescription réelle suit le protocole du centre, l’AMM et la dosimétrie patient — jamais ce tableau seul.' } },
        ],
      },
    },
  },

  // 8 — Préparation scintigraphie myocardique ─────────────────────────────────
  {
    id: 'V2_PREP_CARDIAQUE', cat: 'preparation', catLabel: 'Préparation aux examens',
    title: 'Bien se préparer à la scintigraphie myocardique', difficulty: 'fondamental',
    tags: ['préparation', 'scintigraphie myocardique', 'caféine', 'dipyridamole', 'effort', 'bêtabloquants'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ASNC — Imaging guidelines (myocardial perfusion)', url: 'https://www.asnc.org' },
      { title: 'EANM/ESC — Myocardial perfusion imaging', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La qualité d’une **scintigraphie myocardique de perfusion** dépend beaucoup de la **préparation** : éviter la **caféine** (qui bloque le test pharmacologique au dipyridamole/régadénoson), gérer certains médicaments, et être à jeun léger. De bonnes consignes évitent un examen ininterprétable… et à refaire.',
      patient: {
        sections: [
          { title: 'Les règles essentielles', list: [
            '**Pas de café, thé, chocolat, sodas/colas, boissons énergisantes ni décaféiné** pendant **12–24 h** avant (ils gênent le test).',
            'Jeûne **léger** (3–4 h) le plus souvent ; eau autorisée.',
            'Apportez la **liste de vos médicaments** et vos examens cardiaques antérieurs.',
            'Tenue et **chaussures de sport** si une épreuve d’effort est prévue.',
          ] },
          { title: 'Médicaments', infoBox: { type: 'warning', title: 'Ne rien arrêter sans avis', text: 'Certains traitements (bêtabloquants, dérivés nitrés, théophylline) peuvent être ajustés **uniquement sur consigne** du médecin. Ne les arrêtez jamais de vous-même.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Consignes à transmettre', list: [
            'Sevrage en **méthylxanthines** (caféine, théophylline) 12–24 h avant un stress au dipyridamole/régadénoson.',
            'Selon protocole : gestion des **bêtabloquants/inhibiteurs calciques** (peuvent masquer une ischémie en test d’effort) — décision au cas par cas.',
            'Préciser diabète/insuline (timing repas-traceur), asthme/BPCO (contre-indication relative au dipyridamole).',
          ] },
          { title: 'Pourquoi la caféine ?', infoBox: { type: 'info', title: 'Mécanisme', text: 'Le dipyridamole et le régadénoson agissent via l’**adénosine** ; la caféine est un antagoniste des récepteurs à l’adénosine et **annule** l’effet vasodilatateur → faux négatifs.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Check-list pré-examen', steps: [
            { title: 'Interrogatoire', text: 'Caféine récente, théophylline, asthme/BPCO, dipyridamole oral, grossesse/allaitement, poids.' },
            { title: 'Choix du stress', text: 'Effort si possible (valeur pronostique) ; sinon pharmacologique (dipyridamole, régadénoson, dobutamine si bronchospasme).' },
            { title: 'Antidote prêt', text: 'Aminophylline disponible pour lever les effets du dipyridamole/régadénoson.' },
          ] },
          { title: 'Protocole d’imagerie', text: 'Acquisition **stress/repos** (99mTc-sestamibi/tétrofosmine ; SPECT synchronisée ECG). Optimiser la séparation foie/cœur (délai, repas gras léger entre injection et acquisition selon protocole).',
            figure: { svg: MPI_PROTOCOL, alt: 'Déroulé d’un protocole de perfusion myocardique stress/repos.', caption: 'Une préparation correcte (sans caféine) conditionne la validité du stress pharmacologique.' },
            stats: [{ value: '12–24 h', label: 'Sevrage caféine' }, { value: 'Stress/repos', label: 'Deux acquisitions' }, { value: 'Aminophylline', label: 'Antidote' }] },
        ],
      },
    },
  },

  // 9 — Nodule pulmonaire solitaire en TEP ────────────────────────────────────
  {
    id: 'V2_NODULE_PULMONAIRE_TEP', cat: 'pneumologie', catLabel: 'Pneumologie',
    title: 'Nodule pulmonaire solitaire : apport de la TEP-FDG', difficulty: 'intermédiaire',
    tags: ['nodule pulmonaire solitaire', 'TEP-FDG', 'SUV', 'Fleischner', 'faux positifs', 'cancer du poumon'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Fleischner Society — Pulmonary nodules management', url: 'https://pubs.rsna.org' },
      { title: 'EANM/SNMMI — FDG-PET/CT in solitary pulmonary nodule', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Devant un **nodule pulmonaire solitaire** indéterminé (souvent ≥ 8 mm), la **TEP-FDG** estime la probabilité de malignité par l’**avidité métabolique** : un nodule peu/pas fixant est rassurant (forte valeur prédictive négative), un nodule hyperfixant impose une preuve histologique.',
      medecin_non_nuc: {
        sections: [
          { title: 'Quand demander une TEP ?', list: [
            'Nodule **solide ≥ 8 mm** de probabilité intermédiaire de malignité.',
            'Caractérisation avant biopsie/chirurgie et bilan d’extension si suspicion.',
            'Moins utile pour les nodules **< 8 mm** ou en **verre dépoli** (faux négatifs).',
          ] },
          { title: 'Interprétation simple', infoBox: { type: 'info', title: 'Avidité = risque', text: 'Plus le nodule fixe le FDG, plus le risque de cancer est élevé. Une TEP négative sur un nodule solide oriente vers une surveillance scanographique (logique Fleischner).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Performances & seuils', text: 'Bonne sensibilité pour les nodules solides ≥ 8–10 mm ; un **SUVmax** élevé augmente la probabilité de malignité, mais aucun seuil n’est parfait. La décision intègre taille, morphologie TDM, contexte et probabilité pré-test.',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection TEP en coïncidence.', caption: 'La TEP mesure l’activité métabolique du nodule pour estimer son risque de malignité.' },
            stats: [{ value: '≥ 8 mm', label: 'Nodule solide' }, { value: 'SUVmax', label: 'Aide à la décision' }, { value: 'VPN élevée', label: 'Si non fixant' }] },
          { title: 'Faux positifs / faux négatifs', table: {
            headers: ['Faux positifs (fixent)', 'Faux négatifs (peu/pas fixants)'],
            rows: [
              ['Granulomatoses (tuberculose, sarcoïdose)', 'Adénocarcinome lépidique / verre dépoli'],
              ['Infections, abcès, pneumopathie organisée', 'Tumeur carcinoïde'],
              ['Nodules inflammatoires/rhumatoïdes', 'Lésions < 8 mm (résolution)'],
            ],
          } },
          { title: 'Conduite', list: ['Corréler à la TDM (densité, spiculation) et à la probabilité clinique.', 'Histologie si fixation significative ou doute persistant.', 'Surveillance Fleischner si TEP négative sur nodule solide.'] },
        ],
      },
    },
  },

  // 10 — Panorama des radiopharmaceutiques ────────────────────────────────────
  {
    id: 'V2_PANORAMA_RADIOPHARMA', cat: 'radiopharmacie', catLabel: 'Radiopharmacie',
    title: 'Panorama des principaux radiopharmaceutiques', difficulty: 'fondamental',
    tags: ['radiopharmaceutiques', '99mTc', '18F', 'traceurs', 'générateur', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Radiopharmacy guidelines', url: 'https://www.eanm.org' },
      { title: 'Pharmacopée Européenne — Préparations radiopharmaceutiques', url: 'https://www.edqm.eu' },
    ],
    content: {
      lead: 'Un **radiopharmaceutique** associe un **vecteur** (qui cible un organe/une fonction) à un **radionucléide** (qui émet le rayonnement détecté ou thérapeutique). Ce panorama résume les principaux traceurs de la médecine nucléaire : du **99mTc** issu du générateur au **18F** du cyclotron, jusqu’aux couples **théranostiques**.',
      patient: {
        sections: [
          { title: 'C’est quoi un traceur ?', text: 'Une **molécule** qui va se fixer sur l’organe à étudier (os, cœur, thyroïde, tumeur…), accrochée à une **toute petite dose** de produit radioactif que la caméra détecte. La quantité de molécule est infime : pas d’effet pharmacologique.' },
          { title: 'D’où viennent-ils ?', text: 'Certains sont fabriqués sur place chaque jour à partir d’un **générateur** (technétium-99m), d’autres livrés par un **cyclotron** (fluor-18), car ils ne « durent » que quelques heures.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Les grandes familles', table: {
            headers: ['Traceur', 'Cible / usage'],
            rows: [
              ['99mTc-HDP/MDP', 'Os (scintigraphie osseuse)'],
              ['99mTc-MIBI / tétrofosmine', 'Perfusion myocardique, parathyroïde'],
              ['99mTc-MAG3 / DTPA / DMSA', 'Rein (fonction / morphologie corticale)'],
              ['99mTc-MAA', 'Perfusion pulmonaire, pré-SIRT'],
              ['18F-FDG', 'Métabolisme (oncologie, infection, neuro)'],
              ['18F/68Ga-PSMA', 'Cancer de prostate'],
              ['68Ga-DOTATOC/DOTATATE', 'Tumeurs neuroendocrines (SSTR)'],
              ['123/131I, 123I-MIBG', 'Thyroïde ; tissu chromaffine/neuroblastome'],
            ],
          } },
          { title: 'Diagnostic vs thérapie', infoBox: { type: 'info', title: 'Théranostique', text: 'Un même vecteur peut servir à voir (émetteur γ/β⁺) puis à traiter (émetteur β⁻/α) : ex. 68Ga-DOTATATE (image) ↔ 177Lu-DOTATATE (traitement), ou PSMA en TEP ↔ 177Lu-PSMA.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Production & logistique', text: 'Le **générateur 99Mo/99mTc** fournit quotidiennement le 99mTc (T½ 6 h, γ 140 keV) au laboratoire chaud ; les émetteurs de positons courts (18F T½ 110 min, 68Ga via générateur 68Ge/68Ga) imposent une organisation just-in-time et des contrôles qualité stricts.',
            figure: { svg: TC_GENERATOR, alt: 'Principe du générateur 99Mo/99mTc (élution).', caption: 'Le générateur 99Mo→99mTc alimente chaque jour la radiopharmacie en technétium.' },
            stats: [{ value: '6 h', label: 'T½ 99mTc' }, { value: '110 min', label: 'T½ 18F' }, { value: '140 keV', label: 'γ du 99mTc' }] },
          { title: 'Assurance qualité', list: [
            'Contrôle de **pureté radiochimique** (chromatographie), pureté radionucléidique (99Mo « breakthrough »).',
            'Stérilité/apyrogénicité, étiquetage, traçabilité par lot.',
            'Calibration de l’activité avant administration ; bonnes pratiques de radiopharmacie.',
          ] },
        ],
      },
    },
  },
];
