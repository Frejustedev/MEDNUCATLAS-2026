// Lot 11 (final) — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  GASTRIC_EMPTYING,
  BONE_SCAN,
  PET_COINCIDENCE,
  ALARA_TDS,
  VQ_LUNGS,
  THYROID_UPTAKE,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — Transit œsophagien ────────────────────────────────────────────────────
  {
    id: 'V2_TRANSIT_OESOPHAGIEN', cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie',
    title: 'Scintigraphie du transit œsophagien et reflux', difficulty: 'intermédiaire',
    tags: ['transit œsophagien', 'reflux', 'achalasie', 'dysphagie', '99mTc'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — Esophageal transit & GER scintigraphy', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **scintigraphie du transit œsophagien** mesure la vitesse de progression d’un bolus marqué au 99mTc dans l’œsophage, et peut évaluer le **reflux gastro-œsophagien**. Elle quantifie objectivement les troubles moteurs (achalasie, dysphagie) avec une faible irradiation.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À voir comment les aliments **descendent** dans l’œsophage (le « tuyau » entre la bouche et l’estomac) et à rechercher d’éventuelles remontées (reflux).' },
          { title: 'Déroulement', text: 'Vous avalez une petite gorgée d’eau ou un aliment contenant un traceur, pendant que la caméra enregistre. Indolore et rapide.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Troubles moteurs œsophagiens (achalasie, spasmes), dysphagie inexpliquée.', 'Quantification du **reflux gastro-œsophagien** (alternative non invasive).', 'Suivi post-thérapeutique.'] },
          { title: 'Place', infoBox: { type: 'info', title: 'Complément', text: 'Examen fonctionnel quantitatif, complémentaire de la manométrie/pH-métrie et de l’endoscopie ; utile chez l’enfant (faible dose).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Bolus marqué (liquide/semi-solide au 99mTc), acquisition **dynamique** rapide ; calcul du temps de transit et du pourcentage de rétention. Pour le reflux : acquisition prolongée ± manœuvres.',
            figure: { svg: GASTRIC_EMPTYING, alt: 'Courbe activité-temps (suivi dynamique).', caption: 'On suit la progression du bolus dans le temps (transit/rétention).' },
            stats: [{ value: '99mTc', label: 'Bolus marqué' }, { value: 'Dynamique', label: 'Acquisition rapide' }, { value: '% rétention', label: 'Paramètre' }] },
          { title: 'Pièges', list: ['Coopération à la déglutition, position standardisée.', 'Contamination buccale/salivaire.', 'Interprétation avec le contexte (manométrie).'] },
        ],
      },
    },
  },

  // 2 — Volume sanguin / masse érythrocytaire ─────────────────────────────────
  {
    id: 'V2_VOLUME_SANGUIN', cat: 'hematologie', catLabel: 'Hématologie & Lymphomes',
    title: 'Mesure du volume sanguin (masse érythrocytaire)', difficulty: 'avancé',
    tags: ['volume sanguin', 'masse érythrocytaire', 'polyglobulie', '51Cr', 'dilution', 'hématologie'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ICSH — Recommended methods for measurement of red-cell and plasma volume', url: 'https://www.icsh.org' },
    ],
    content: {
      lead: 'La **mesure isotopique du volume sanguin** (masse érythrocytaire et volume plasmatique) repose sur le principe de **dilution** d’un marqueur. C’est l’examen de référence pour différencier une **vraie polyglobulie** (masse érythrocytaire augmentée) d’une fausse polyglobulie (hémoconcentration).',
      medecin_non_nuc: {
        sections: [
          { title: 'Indication clé', text: 'Devant une élévation de l’hématocrite/hémoglobine, distinguer une **polyglobulie vraie** (à explorer : Vaquez, causes secondaires) d’une **polyglobulie relative** (déshydratation, syndrome de Gaisböck).' },
          { title: 'Principe', infoBox: { type: 'info', title: 'Dilution', text: 'On injecte une quantité connue de marqueur ; sa dilution dans le compartiment mesuré donne le volume (Volume = quantité injectée / concentration mesurée).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Méthode', text: 'Masse érythrocytaire : marquage des hématies autologues (historiquement **51Cr**, ou 99mTc selon protocole) et dilution. Volume plasmatique : albumine marquée (**125I-albumine**). Résultats rapportés à la surface corporelle, comparés aux valeurs théoriques.',
            figure: { svg: PET_COINCIDENCE, alt: 'Illustration de mesure (schéma générique).', caption: 'Le volume se déduit de la dilution d’une activité connue dans le sang.' },
            stats: [{ value: 'Dilution', label: 'Principe' }, { value: '51Cr / 99mTc', label: 'Hématies' }, { value: '125I-albumine', label: 'Plasma' }] },
          { title: 'Points clés', list: ['Rigueur du prélèvement/réinjection (volumes exacts).', 'Correction selon hématocrite et surface corporelle.', 'Standardisation ICSH.'] },
        ],
      },
    },
  },

  // 3 — TEP-FDG carcinome de primitif inconnu ────────────────────────────────
  {
    id: 'V2_TEP_FDG_CUP', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-FDG dans le cancer de primitif inconnu (CUP)', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'primitif inconnu', 'CUP', 'métastase', 'adénopathie'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET in cancer of unknown primary', url: 'https://www.eanm.org' },
      { title: 'ESMO — Cancers of unknown primary site', url: 'https://www.esmo.org' },
    ],
    content: {
      lead: 'Devant une **métastase révélatrice** (adénopathie, lésion hépatique/osseuse) sans tumeur primitive identifiée, la **TEP-FDG** explore tout le corps en une fois pour localiser le **primitif** et cartographier l’extension — particulièrement utile pour les adénopathies cervicales.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Recherche du **primitif** devant une métastase histologiquement prouvée sans origine évidente.', 'Adénopathie cervicale métastatique (oriente la pan-endoscopie/biopsies).', 'Bilan d’extension global.'] },
          { title: 'Apport', infoBox: { type: 'info', title: 'Rendement', text: 'La TEP-FDG identifie le primitif dans une proportion notable des CUP et guide les biopsies ciblées, modifiant souvent la prise en charge.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier (vertex→cuisses, parfois pieds selon contexte). Lecture systématique des sites primitifs probables ; corrélation TDM/IRM et endoscopie.',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP.', caption: 'La TEP balaye tout le corps pour démasquer le primitif et les autres sites.' },
            stats: [{ value: 'Corps entier', label: 'Balayage global' }, { value: 'Cervical', label: 'Indication forte' }, { value: 'Biopsie ciblée', label: 'Guidage' }] },
          { title: 'Pièges', list: ['Captations physiologiques/inflammatoires (faux primitifs).', 'Primitifs peu avides (mucineux, lobulaire, certains digestifs).', 'Confronter à l’histologie et l’immunohistochimie.'] },
        ],
      },
    },
  },

  // 4 — Scintigraphie corticosurrénalienne ───────────────────────────────────
  {
    id: 'V2_SCINTI_SURRENALE', cat: 'endocrinologie', catLabel: 'Endocrinologie',
    title: 'Scintigraphie corticosurrénalienne (iodocholestérol)', difficulty: 'avancé',
    tags: ['surrénale', 'iodocholestérol', 'NP-59', 'Conn', 'Cushing', 'incidentalome'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Adrenal cortex scintigraphy', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **scintigraphie corticosurrénalienne** (dérivés iodés du cholestérol, type NP-59) explore la **fonction** du cortex surrénalien. Examen de niche, elle peut aider à latéraliser une hypersécrétion (adénome de Conn, certains Cushing) ou à caractériser un **incidentalome** quand les autres explorations sont équivoques.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Latéralisation d’un **hyperaldostéronisme** (Conn) quand le cathétérisme veineux n’est pas concluant/réalisable.', 'Caractérisation fonctionnelle d’un **incidentalome** surrénalien.', 'Certains syndromes de Cushing ACTH-indépendants.'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Examen de niche', text: 'Peu disponible, imagerie longue (acquisitions sur plusieurs jours), souvent supplantée par le scanner/IRM et le cathétérisme des veines surrénaliennes. Indications ciblées.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Blocage thyroïdien (traceur iodé), parfois freinage par dexaméthasone selon l’indication. Imagerie à **J3–J7** (captation lente du cholestérol marqué). Analyse de la latéralité de fixation.',
            figure: { svg: THYROID_UPTAKE, alt: 'Schéma de captation glandulaire (analogie).', caption: 'Le traceur s’accumule dans le tissu cortico-surrénalien fonctionnel (imagerie tardive).' },
            stats: [{ value: 'NP-59 (iodé)', label: 'Traceur' }, { value: 'J3–J7', label: 'Imagerie tardive' }, { value: 'Blocage thyroïde', label: 'Obligatoire' }] },
          { title: 'Pièges', list: ['Blocage thyroïdien indispensable.', 'Protocole de freinage selon l’hypersécrétion explorée.', 'Disponibilité limitée du radiopharmaceutique.'] },
        ],
      },
    },
  },

  // 5 — Radioprotection de l'entourage ───────────────────────────────────────
  {
    id: 'V2_RADIOPROTECTION_ENTOURAGE', cat: 'radioprotection', catLabel: 'Radioprotection',
    title: 'Protéger son entourage après un examen ou un traitement', difficulty: 'fondamental',
    tags: ['radioprotection', 'entourage', 'consignes', 'iode-131', 'enfants', 'patient'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'CIPR — Release of patients after therapy', url: 'https://www.icrp.org' },
      { title: 'ASN/SFMN — Consignes patients', url: 'https://www.asn.fr' },
    ],
    content: {
      lead: 'Après un examen diagnostique, vous émettez un rayonnement **faible et transitoire** ; quelques précautions simples suffisent pour quelques heures. Après un **traitement** (iode-131, etc.), des consignes **plus précises et écrites** vous sont remises pour protéger votre entourage.',
      patient: {
        sections: [
          { title: 'Après un examen (diagnostic)', list: [
            '**Buvez abondamment** et urinez souvent (élimination du produit).',
            'Quelques heures de **distance** raisonnable avec les femmes enceintes et les jeunes enfants.',
            'Hygiène des mains, tirer la chasse 2 fois.',
            'Reprise normale des activités (sauf consigne contraire).',
          ] },
          { title: 'Après un traitement (iode-131…)', text: 'Les consignes sont **renforcées et personnalisées** (durée de distance, contacts limités, parfois isolement initial, contraception temporaire). Suivez précisément la fiche remise par le service.',
            figure: { svg: ALARA_TDS, alt: 'Temps, distance, écran : leviers de réduction de dose.', caption: 'Le bon sens « temps / distance » protège efficacement l’entourage.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Messages aux patients', text: 'Rassurer pour le diagnostique (dose faible) ; pour la thérapie, insister sur le respect des consignes écrites (distance/durée vis-à-vis des enfants, femmes enceintes, partage du lit, transports), variables selon le radionucléide et l’activité.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Cadre', list: [
            'Seuils de **libération** du patient selon l’activité résiduelle (réglementation).',
            'Fiches de consignes personnalisées (durée chiffrée par type de contact).',
            'Cas particuliers : aidants, transports en commun, retour au travail, voyage (détecteurs douaniers).',
          ] },
        ],
      },
    },
  },

  // 6 — Shunt droite-gauche / quantification MAA ─────────────────────────────
  {
    id: 'V2_SHUNT_DROITE_GAUCHE', cat: 'pneumologie', catLabel: 'Pneumologie',
    title: 'Quantification du shunt droite-gauche (MAA marqués)', difficulty: 'avancé',
    tags: ['shunt droite-gauche', 'MAA', '99mTc', 'syndrome hépatopulmonaire', 'SIRT', 'fraction de shunt'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — Lung shunt fraction (MAA)', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'L’injection de **macroagrégats d’albumine marqués au 99mTc (MAA)** permet de **quantifier un shunt droite-gauche** : normalement bloqués dans les capillaires pulmonaires, les MAA qui passent dans la circulation systémique (cerveau, reins) signent un shunt. Application clé : bilan **avant SIRT** hépatique et syndrome hépatopulmonaire.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Bilan **pré-SIRT** : un shunt hépato-pulmonaire élevé contre-indique/limite la dose (risque de pneumopathie radique).', 'Syndrome **hépatopulmonaire**, shunts cardiaques/pulmonaires droite-gauche.'] },
          { title: 'Principe', infoBox: { type: 'info', title: 'Capture pulmonaire', text: 'Les MAA (~10–40 µm) se bloquent dans les capillaires pulmonaires ; ceux qui apparaissent ailleurs (corps entier) traduisent un shunt — on en calcule la fraction.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Méthode', text: 'Injection de **99mTc-MAA**, imagerie corps entier ; **fraction de shunt = activité systémique / activité totale**. Pour la SIRT, l’injection se fait dans l’artère hépatique pour estimer le passage pulmonaire (LSF).',
            figure: { svg: VQ_LUNGS, alt: 'Distribution pulmonaire des MAA (perfusion).', caption: 'Les MAA se logent dans les capillaires pulmonaires ; le passage systémique mesure le shunt.' },
            stats: [{ value: '99mTc-MAA', label: 'Traceur' }, { value: 'LSF', label: 'Fraction de shunt pulmonaire' }, { value: 'Pré-SIRT', label: 'Indication clé' }] },
          { title: 'Sécurité', list: ['Réduire le nombre de particules en cas d’HTAP/shunt connu.', 'Un LSF élevé module la dose de 90Y (risque pulmonaire).', 'Imagerie corps entier soigneuse (cerveau, reins).'] },
        ],
      },
    },
  },
];
