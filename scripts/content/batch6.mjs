// Lot 6 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  DECAY_TYPES,
  ALARA_TDS,
  DECAY_SCHEME,
  PSMA_BINDING,
  PET_COINCIDENCE,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — Qu'est-ce que la médecine nucléaire ? (SEO patient) ──────────────────
  {
    id: 'V2_QUEST_CE_QUE_MN', cat: 'generalites', catLabel: 'Généralités',
    title: 'Qu’est-ce que la médecine nucléaire ?', difficulty: 'fondamental',
    tags: ['médecine nucléaire', 'scintigraphie', 'TEP', 'introduction', 'patient'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SFMN — La médecine nucléaire expliquée', url: 'https://www.sfmn.org' },
      { title: 'EANM — What is nuclear medicine?', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **médecine nucléaire** utilise de très petites quantités de produits **faiblement radioactifs** (les radiopharmaceutiques) pour **explorer le fonctionnement** des organes (imagerie) et parfois pour **traiter** certaines maladies. Contrairement au scanner ou à l’IRM qui montrent surtout l’anatomie, elle montre comment les organes **travaillent**.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'On vous administre (souvent par injection) un produit qui se dirige vers un organe précis et émet un rayonnement très faible. Une **caméra spéciale** détecte ce rayonnement et fabrique des images **fonctionnelles** : elles révèlent une activité anormale avant même que la forme de l’organe ne change.',
            figure: { svg: DECAY_TYPES, alt: 'Schéma des types de rayonnements émis par un noyau radioactif (alpha, bêta, gamma).', caption: 'Les produits émettent un rayonnement (souvent gamma) détecté par la caméra.' } },
          { title: 'Imagerie ou traitement', list: ['**Diagnostic** : scintigraphie (os, cœur, thyroïde, reins…), TEP (cancers).', '**Thérapie** : iode pour la thyroïde, traitements ciblés de certains cancers (théranostique).'] },
          { title: 'Est-ce courant ?', text: 'Oui : des millions d’examens sont réalisés chaque année dans le monde. Les doses sont faibles, l’encadrement strict, et le bénéfice diagnostique souvent décisif.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Spécificité', text: 'Imagerie **fonctionnelle/métabolique** : la médecine nucléaire détecte des anomalies de fonctionnement (perfusion, métabolisme, expression de récepteurs) souvent **précoces** par rapport aux modifications morphologiques.' },
          { title: 'Complémentarité', text: 'Les machines **hybrides** (TEP-TDM, TEMP-TDM, TEP-IRM) fusionnent fonction et anatomie en un seul examen, optimisant la localisation et l’interprétation.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Champ disciplinaire', text: 'La spécialité couvre la **radiopharmacie**, l’**instrumentation**, la **dosimétrie/radioprotection**, le diagnostic (planaire, TEMP, TEP) et la **thérapie par radionucléides** (RIV/théranostique), avec un cadre réglementaire dédié.' },
        ],
      },
    },
  },

  // 2 — La radioactivité expliquée simplement ───────────────────────────────
  {
    id: 'V2_RADIOACTIVITE_EXPLIQUEE', cat: 'generalites', catLabel: 'Généralités',
    title: 'La radioactivité expliquée simplement', difficulty: 'fondamental',
    tags: ['radioactivité', 'rayonnement', 'demi-vie', 'patient', 'sievert', 'vulgarisation'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IRSN — La radioactivité', url: 'https://www.irsn.fr' },
      { title: 'CIPR — Notions de base de radioprotection', url: 'https://www.icrp.org' },
    ],
    content: {
      lead: 'La **radioactivité** est un phénomène **naturel** : certains atomes instables libèrent de l’énergie sous forme de **rayonnement**. Nous y sommes exposés en permanence (sol, aliments, rayons cosmiques). En médecine nucléaire, on utilise des quantités **infimes et contrôlées**.',
      patient: {
        sections: [
          { title: 'C’est quoi, au juste ?', text: 'Un atome « instable » cherche à devenir stable en émettant un petit rayonnement. Ce rayonnement peut être détecté par des appareils — c’est ce qu’on exploite pour fabriquer des images.',
            figure: { svg: DECAY_TYPES, alt: 'Émissions alpha, bêta et gamma d’un noyau instable.', caption: 'Trois types de rayonnements : seuls certains (gamma) servent à l’imagerie.' } },
          { title: 'La « demi-vie »', text: 'C’est le temps au bout duquel la radioactivité d’un produit **diminue de moitié**. Les produits utilisés en imagerie ont une demi-vie **courte** (quelques heures), donc ils disparaissent vite de votre corps.' },
          { title: 'Et le risque ?', infoBox: { type: 'tip', title: 'À relativiser', text: 'La dose d’un examen courant est comparable à quelques mois d’exposition naturelle. Le médecin ne prescrit l’examen que si son bénéfice dépasse largement ce faible risque.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Unités utiles', list: ['**Becquerel (Bq)** : activité (nombre de désintégrations/seconde).', '**Gray (Gy)** : dose absorbée (énergie déposée).', '**Sievert (Sv)** : dose efficace (impact biologique, pour la radioprotection).'] },
          { title: 'Ordres de grandeur', text: 'Exposition naturelle ≈ 2–3 mSv/an. Un examen diagnostique typique délivre quelques mSv — à mettre en regard du bénéfice clinique.' },
        ],
      },
    },
  },

  // 3 — La médecine nucléaire est-elle dangereuse ? (SEO) ────────────────────
  {
    id: 'V2_MN_DANGEREUX', cat: 'generalites', catLabel: 'Généralités',
    title: 'La médecine nucléaire est-elle dangereuse ?', difficulty: 'fondamental',
    tags: ['sécurité', 'dose', 'risque', 'grossesse', 'patient', 'radioprotection'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IRSN — Doses et risques en imagerie médicale', url: 'https://www.irsn.fr' },
      { title: 'SFMN — Information patients', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'C’est une question fréquente et légitime. La médecine nucléaire est **très sûre** : les quantités de produit sont infimes, la radioactivité **faible et transitoire**, et chaque examen n’est réalisé que si son **bénéfice** l’emporte clairement sur le très faible risque.',
      patient: {
        sections: [
          { title: 'Les points rassurants', list: ['Doses **faibles**, comparables à quelques mois de radioactivité naturelle.', 'Produit éliminé **rapidement** (urines, décroissance).', 'Injections quasi indolores, **réactions allergiques exceptionnelles**.', 'Pratique **encadrée** par une réglementation stricte et des professionnels formés.'] },
          { title: 'Précautions simples', text: 'Buvez beaucoup après l’examen. Par prudence, gardez quelques heures une certaine **distance** avec les femmes enceintes et les jeunes enfants. Pour les **traitements** (iode, etc.), des consignes spécifiques vous sont remises.',
            infoBox: { type: 'warning', title: 'Grossesse / allaitement', text: 'Signalez toujours une grossesse possible ou un allaitement : la conduite est adaptée (report, ajustement, interruption temporaire de l’allaitement).' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Justification et optimisation', text: 'Les principes de **justification** (le bénéfice attendu dépasse le risque) et d’**optimisation** (ALARA : dose la plus faible possible) encadrent chaque prescription. Les niveaux de référence diagnostiques (NRD) guident les pratiques.' },
        ],
      },
    },
  },

  // 4 — Les désintégrations radioactives ─────────────────────────────────────
  {
    id: 'V2_DESINTEGRATIONS', cat: 'bases_physiques', catLabel: 'Bases Physiques',
    title: 'Les désintégrations radioactives (α, β, γ) et la décroissance', difficulty: 'avancé',
    tags: ['désintégration', 'alpha', 'bêta', 'gamma', 'demi-vie', 'décroissance', 'physique'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IAEA — Nuclear Medicine Physics (radioactive decay)', url: 'https://www.iaea.org' },
      { title: 'EANM — Physics primer', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Les noyaux instables se transforment par **désintégration** en émettant des particules (**α, β**) et/ou des photons (**γ**). Le choix d’un radionucléide pour le diagnostic ou la thérapie dépend du **type d’émission** et de la **période** (demi-vie).',
      medecin_non_nuc: {
        sections: [
          { title: 'Pourquoi c’est utile à connaître', text: 'Le **type de rayonnement** détermine l’usage : les **γ** (et les **β⁺**, via la TEP) servent à l’**imagerie** (ils traversent les tissus) ; les **β⁻** et **α**, à courte portée, servent à la **thérapie** (ils déposent leur énergie localement).' },
          { title: 'La demi-vie', text: 'Une demi-vie **courte** (heures) limite l’exposition et convient au diagnostic ; une demi-vie adaptée est requise pour la thérapie et la logistique (transport).' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Modes de désintégration',
            list: ['**α** : noyau d’hélium, très ionisant, portée < 0,1 mm (thérapie ciblée, ex. 223Ra, 225Ac).', '**β⁻** : électron, portée mm (thérapie : I-131, 177Lu, 90Y).', '**β⁺** : positon → annihilation → 2 γ de 511 keV (TEP).', '**γ / transition isomérique** : photon (imagerie : 99mTc 140 keV).', '**Capture électronique** : émission de γ/RX caractéristiques (ex. 123I, 201Tl).'],
            figure: { svg: DECAY_TYPES, alt: 'Émissions α, β⁻/β⁺ et γ d’un noyau instable.', caption: 'Le type d’émission conditionne l’usage : imagerie (γ, β⁺) ou thérapie (β⁻, α).' } },
          { title: 'Loi de décroissance', text: 'A(t) = A₀·e^(−λt), avec **T½ = ln2/λ**. La **période effective** combine périodes physique et biologique : 1/T½eff = 1/T½phys + 1/T½biol — déterminante pour la dosimétrie.',
            stats: [{ value: 'T½ = ln2/λ', label: 'Demi-vie physique' }, { value: '511 keV', label: 'Photons d’annihilation (TEP)' }, { value: '140 keV', label: 'γ du 99mTc' }] },
        ],
      },
    },
  },

  // 5 — Interaction rayonnement-matière ──────────────────────────────────────
  {
    id: 'V2_INTERACTION_RAYONNEMENT', cat: 'bases_physiques', catLabel: 'Bases Physiques',
    title: 'Interaction des rayonnements avec la matière', difficulty: 'avancé',
    tags: ['effet photoélectrique', 'Compton', 'atténuation', 'ionisation', 'physique', 'détection'],
    targetAudience: ['medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IAEA — Interaction of radiation with matter', url: 'https://www.iaea.org' },
      { title: 'EANM — Physics & instrumentation', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Comprendre comment les **photons γ** interagissent avec la matière (corps du patient, détecteur) est essentiel : ces interactions expliquent l’**atténuation**, le **diffusé**, et le principe même de la **détection**.',
      medecin_nuc: {
        sections: [
          { title: 'Principales interactions', list: ['**Effet photoélectrique** : le photon est totalement absorbé par un électron (dominant à basse énergie, ↑ avec Z) — base de la détection et du contraste TDM.', '**Diffusion Compton** : le photon cède une partie de son énergie et change de direction (dominante aux énergies de la médecine nucléaire) — source de **diffusé** dégradant l’image.', '**Création de paires** : seulement à haute énergie (> 1,02 MeV), peu pertinente ici.'] },
          { title: 'Conséquences pratiques', text: 'L’**atténuation** (perte de photons traversant les tissus) impose une **correction** (TDM en hybride). Le **diffusé** est réduit par le **fenêtrage en énergie** et des corrections dédiées. La détection repose surtout sur l’effet photoélectrique dans le cristal.',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection des photons en TEP (illustration des photons traversant les tissus jusqu’aux détecteurs).', caption: 'Les photons doivent traverser les tissus (atténuation) avant d’être détectés.' } },
          { title: 'Repères', infoBox: { type: 'info', title: 'Énergie et atténuation', text: 'Plus l’énergie du photon est élevée, moins il est atténué (mais plus il est difficile à arrêter par les collimateurs/écrans). Le 140 keV du 99mTc est un bon compromis détection/radioprotection.' } },
        ],
      },
    },
  },

  // 6 — Radiobiologie ────────────────────────────────────────────────────────
  {
    id: 'V2_RADIOBIOLOGIE_PRINCIPES', cat: 'radiobiologie', catLabel: 'Radiobiologie',
    title: 'Radiobiologie : effets déterministes et stochastiques', difficulty: 'avancé',
    tags: ['radiobiologie', 'déterministe', 'stochastique', 'dose-effet', 'ADN', 'radioprotection'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'CIPR 103 — Recommandations 2007', url: 'https://www.icrp.org' },
      { title: 'UNSCEAR — Effets des rayonnements ionisants', url: 'https://www.unscear.org' },
    ],
    content: {
      lead: 'La **radiobiologie** étudie les effets des rayonnements sur le vivant. On distingue deux grandes catégories : les effets **déterministes** (à seuil, gravité croissante avec la dose) et **stochastiques** (probabilistes, sans seuil — cancers, effets héréditaires). Cette distinction fonde la radioprotection.',
      medecin_non_nuc: {
        sections: [
          { title: 'Les deux types d’effets', list: ['**Déterministes** : apparaissent au-delà d’un **seuil** (ex. érythème, cataracte) ; gravité ↑ avec la dose. Rares aux doses diagnostiques.', '**Stochastiques** : **probabilité** ↑ avec la dose, **sans seuil** (modèle linéaire sans seuil) ; principal souci aux faibles doses (risque de cancer radio-induit, très faible mais non nul).'] },
          { title: 'Implication', infoBox: { type: 'info', title: 'Aux doses diagnostiques', text: 'Les examens diagnostiques exposent à de faibles doses : pas d’effet déterministe attendu ; le risque stochastique est très faible et justifie l’optimisation (ALARA), surtout chez l’enfant et la femme enceinte.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Mécanismes', text: 'L’énergie déposée crée des **ionisations** lésant l’**ADN** (cassures simples/double brin) directement ou via les **radicaux libres** (radiolyse de l’eau). La réparation cellulaire, l’oxygénation et le débit de dose modulent l’effet.' },
          { title: 'Application en thérapie', text: 'La **radiothérapie interne vectorisée** exploite ces effets pour détruire sélectivement les cellules tumorales ; la **dosimétrie** vise à maximiser la dose tumorale en limitant celle des organes à risque (reins, moelle).' },
        ],
      },
    },
  },

  // 7 — Radioprotection du personnel ─────────────────────────────────────────
  {
    id: 'V2_RADIOPROTECTION_PERSONNEL', cat: 'radioprotection', catLabel: 'Radioprotection',
    title: 'Radioprotection du personnel : ALARA en pratique', difficulty: 'intermédiaire',
    tags: ['ALARA', 'radioprotection', 'dosimétrie', 'temps distance écran', 'zonage', 'personnel'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'CIPR — Optimisation et ALARA', url: 'https://www.icrp.org' },
      { title: 'ASN / Directive Euratom 2013/59', url: 'https://www.asn.fr' },
    ],
    content: {
      lead: 'La radioprotection des soignants repose sur le principe **ALARA** (As Low As Reasonably Achievable) et trois leviers concrets : **temps, distance, écran**. S’y ajoutent le **zonage**, la **dosimétrie** individuelle et des procédures rigoureuses.',
      medecin_non_nuc: {
        sections: [
          { title: 'Les trois leviers', text: 'Réduire le **temps** passé près de la source, **augmenter la distance** (la dose chute comme 1/d²), et interposer un **écran** (plomb) diminuent fortement l’exposition.',
            figure: { svg: ALARA_TDS, alt: 'Trois panneaux illustrant temps, distance (1/d²) et écran de plomb.', caption: 'ALARA : moins de temps, plus de distance, un écran adapté.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Organisation', list: ['**Zonage** réglementaire (zones surveillées/contrôlées), signalisation.', '**Dosimétrie** passive et opérationnelle (corps entier, extrémités/bagues pour la manipulation).', 'EPI (tabliers/écrans), protège-seringues, manipulation derrière paravent plombé.', 'Personne Compétente en Radioprotection (PCR) ; formation périodique.'] },
          { title: 'Spécificités MN', infoBox: { type: 'warning', title: 'Doses aux extrémités', text: 'La préparation et l’injection exposent surtout les mains : protège-seringues, gestes optimisés et dosimétrie d’extrémité (bague) sont essentiels.' } },
        ],
      },
    },
  },

  // 8 — Gestion des déchets radioactifs ──────────────────────────────────────
  {
    id: 'V2_DECHETS_RADIOACTIFS', cat: 'radioprotection', catLabel: 'Radioprotection',
    title: 'Gestion des déchets et effluents radioactifs', difficulty: 'intermédiaire',
    tags: ['déchets radioactifs', 'décroissance', 'effluents', 'réglementation', 'gestion', 'sécurité'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ASN — Gestion des déchets de médecine nucléaire', url: 'https://www.asn.fr' },
      { title: 'AIEA — Management of radioactive waste from nuclear medicine', url: 'https://www.iaea.org' },
    ],
    content: {
      lead: 'Les radionucléides utilisés en médecine nucléaire ayant des **périodes courtes**, la principale stratégie de gestion des déchets est la **décroissance sur place** (« decay-in-storage ») avant élimination dans les filières classiques, sous contrôle strict.',
      medecin_non_nuc: {
        sections: [
          { title: 'Principe général', text: 'On **entrepose** les déchets contaminés (seringues, compresses, etc.) le temps que leur radioactivité décroisse (souvent quelques jours à semaines selon le radionucléide), puis on les élimine comme des déchets de soins ordinaires après contrôle.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Modalités', list: ['**Décroissance sur place** : entreposage trié par période, contrôle à la sonde avant élimination (souvent ~10 périodes).', '**Effluents** : cuves de décroissance pour les urines des patients traités (I-131, 177Lu) ; rejets contrôlés selon autorisations.', 'Traçabilité, registres, zones dédiées et signalisation.'] },
          { title: 'Cadre', infoBox: { type: 'info', title: 'Réglementation', text: 'La gestion suit les autorisations ASN (France) et les recommandations AIEA : tri, entreposage, mesure, et seuils de libération définis par radionucléide.' } },
        ],
      },
    },
  },

  // 9 — 223Ra (Xofigo) ───────────────────────────────────────────────────────
  {
    id: 'V2_223RA_XOFIGO', cat: 'prostate', catLabel: 'Cancer de la Prostate',
    title: 'Dichlorure de radium-223 (Xofigo) : métastases osseuses', difficulty: 'avancé',
    tags: ['radium-223', 'Xofigo', 'alpha', 'métastases osseuses', 'prostate', 'mCRPC'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ALSYMPCA trial (N Engl J Med, 2013)', url: 'https://doi.org/10.1056/NEJMoa1213755' },
      { title: 'EANM procedure guideline for 223Ra therapy', url: 'https://doi.org/10.1007/s00259-018-3990-7' },
    ],
    content: {
      lead: 'Le **dichlorure de radium-223** (Xofigo) est un émetteur **alpha** qui mime le calcium et se fixe sur les zones osseuses en remaniement, irradiant à **très courte portée** les **métastases osseuses** du cancer de la prostate résistant à la castration (mCRPC). Il prolonge la survie et soulage les douleurs.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'Le radium se comporte un peu comme du calcium : il va naturellement vers l’**os**, en particulier là où des métastases provoquent un remaniement. Il y délivre un rayonnement **très localisé** qui épargne largement les tissus voisins.' },
          { title: 'Déroulement', text: 'Une **injection** simple, répétée (généralement 6 fois, une par mois). Bonne tolérance habituelle ; effets possibles : nausées, diarrhée, baisse transitoire des cellules sanguines.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indication', text: 'mCRPC avec **métastases osseuses symptomatiques**, sans métastases viscérales. Améliore la survie globale (ALSYMPCA) et retarde les complications osseuses.' },
          { title: 'Précautions', list: ['Surveillance hématologique (neutropénie, thrombopénie).', 'Association à certains traitements (abiratérone + prednisone) à évaluer selon recommandations.', 'Mesures simples d’hygiène (élimination fécale du produit).'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Radiopharmaceutique', text: 'Le **223Ra** émet des particules **α** (forte énergie, portée < 100 µm → effet très localisé, peu de toxicité médullaire comparé aux β). Schéma : **6 injections** à 4 semaines d’intervalle.',
            figure: { svg: DECAY_SCHEME, alt: 'Schéma de désintégration (illustratif d’un émetteur thérapeutique).', caption: 'Les émetteurs alpha déposent une forte énergie sur une distance très courte (quelques cellules).' },
            stats: [{ value: '6 inj.', label: 'Schéma (mensuel)' }, { value: '~11,4 j', label: 'Période 223Ra' }, { value: '< 100 µm', label: 'Portée des α' }] },
          { title: 'Sécurité', list: ['Émetteur α : radioprotection adaptée (élimination digestive).', 'Surveillance NFS avant chaque cure.', 'Sélection : métastases osseuses, pas de maladie viscérale prédominante.'] },
        ],
      },
    },
  },

  // 10 — PERCIST & RECIST ────────────────────────────────────────────────────
  {
    id: 'V2_PERCIST_RECIST', cat: 'scores', catLabel: 'Scores & Classifications',
    title: 'Évaluation de la réponse : PERCIST et RECIST 1.1', difficulty: 'avancé',
    tags: ['PERCIST', 'RECIST', 'réponse tumorale', 'SULpeak', 'oncologie', 'TEP'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Wahl RL. et al. — PERCIST 1.0 (J Nucl Med, 2009)', url: 'https://doi.org/10.2967/jnumed.108.057307' },
      { title: 'Eisenhauer EA. et al. — RECIST 1.1 (Eur J Cancer, 2009)', url: 'https://doi.org/10.1016/j.ejca.2008.10.026' },
    ],
    content: {
      lead: 'Évaluer la **réponse au traitement** repose sur des critères standardisés : **RECIST 1.1** (réponse **morphologique**, mesure des tailles au scanner) et **PERCIST 1.0** (réponse **métabolique** en TEP-FDG, via le SULpeak). Les deux sont complémentaires et largement utilisés en oncologie et en recherche.',
      medecin_non_nuc: {
        sections: [
          { title: 'L’essentiel', text: '**RECIST** mesure si les lésions **rétrécissent ou grossissent** (taille). **PERCIST** mesure si elles deviennent **plus ou moins actives** métaboliquement (TEP). Une lésion peut « éteindre » métaboliquement avant de rétrécir — d’où l’intérêt de la TEP, notamment sous immunothérapie.' },
          { title: 'Catégories', text: 'Réponse **complète**, **partielle**, **maladie stable**, **progression** — définies par des seuils de variation (taille pour RECIST, SULpeak pour PERCIST).' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'PERCIST 1.0 — points clés', list: ['Mesure du **SULpeak** (normalisé à la masse maigre) de la lésion la plus active.', 'Référence de **mesurabilité** : lésion > 1,5 × SUL du foie + 2 écarts-types.', 'Réponse métabolique partielle : baisse ≥ 30 % du SULpeak ; progression : hausse ≥ 30 % ou nouvelles lésions.', '**Harmonisation** indispensable (EARL) entre examens.'] },
          { title: 'Comparaison', table: undefined, text: 'Choisir le référentiel selon le contexte (essai, type tumoral, traitement).' },
        ],
        table: {
          headers: ['Critère', 'RECIST 1.1', 'PERCIST 1.0'],
          rows: [
            ['Type', 'Morphologique (taille)', 'Métabolique (TEP-FDG)'],
            ['Mesure', 'Diamètres (cibles)', 'SULpeak'],
            ['Réponse partielle', '↓ ≥ 30 % somme diamètres', '↓ ≥ 30 % SULpeak'],
            ['Progression', '↑ ≥ 20 % ou nouvelle lésion', '↑ ≥ 30 % ou nouvelle lésion'],
          ],
        },
      },
    },
  },
];
