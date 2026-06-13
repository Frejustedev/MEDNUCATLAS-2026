// Lot 2 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  THYROID_UPTAKE,
  BONE_SCAN,
  VQ_LUNGS,
  RENOGRAM,
  SSTR_BINDING,
  DATSCAN_STRIATUM,
  DECAY_SCHEME,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_SCINTI_THYROIDE', cat: 'endocrinologie', catLabel: 'Endocrinologie',
    title: 'Scintigraphie thyroïdienne (Tc-99m / I-123)', difficulty: 'intermédiaire',
    tags: ['scintigraphie', 'thyroïde', 'Tc-99m', 'I-123', 'nodule', 'hyperthyroïdie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM practice guideline for thyroid scintigraphy', url: 'https://doi.org/10.1007/s00259-019-04472-8' },
      { title: 'SNMMI Procedure Standard for Thyroid Scintigraphy', url: 'https://www.snmmi.org' },
      { title: 'HAS — Nodule thyroïdien : démarche diagnostique', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'La **scintigraphie thyroïdienne** explore la **fonction** de la glande thyroïde en imageant la captation d’un traceur (pertechnétate de **Tc-99m** ou iode **I-123**). Elle distingue les nodules « chauds » (hyperfonctionnels, presque toujours bénins) des nodules « froids » (à explorer), et caractérise les hyperthyroïdies.',
      patient: {
        sections: [
          { title: 'À quoi sert l’examen ?', text: 'Il évalue **comment fonctionne** votre thyroïde, glande située à la base du cou. Une petite quantité de produit faiblement radioactif, capté par la thyroïde, permet de visualiser les zones plus ou moins actives.',
            figure: { svg: THYROID_UPTAKE, alt: 'Schéma d’une thyroïde avec ses deux lobes et l’isthme, montrant un nodule « chaud » très fixant et un nodule « froid » non fixant.', caption: 'La scintigraphie montre les zones actives (« chaudes ») et inactives (« froides ») de la thyroïde.' } },
          { title: 'Préparation', list: ['Signalez tout examen récent avec **produit de contraste iodé** (scanner) : l’iode bloque la thyroïde pendant plusieurs semaines.', 'Indiquez vos médicaments (hormones thyroïdiennes, amiodarone…).', 'Prévenez en cas de grossesse ou d’allaitement.'] },
          { title: 'Déroulement', text: 'Injection (ou prise d’une gélule pour l’I-123), court délai, puis images du cou de **15–20 minutes**. Examen indolore, radioactivité faible et transitoire.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Hyperthyroïdie** : différencier maladie de Basedow (fixation diffuse), nodule toxique (fixation focale), thyroïdite (fixation effondrée).', 'Caractérisation d’un **nodule** (chaud vs froid) en complément de l’échographie et du dosage TSH.', 'Bilan d’un **goitre** multinodulaire, recherche de tissu ectopique/rétrosternal.'] },
          { title: 'À savoir avant de prescrire', infoBox: { type: 'warning', title: 'Iode et interférences', text: 'Un scanner injecté récent, l’amiodarone ou un excès d’iode rendent l’examen ininterprétable. Vérifier la TSH : la scintigraphie d’un nodule n’est contributive qu’en cas de TSH basse/normale-basse.' },
            text: 'La scintigraphie n’évalue **pas** le risque de cancer d’un nodule froid : c’est la **cytoponction** échoguidée qui tranche.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceurs et dosimétrie', text: 'Le **pertechnétate Tc-99m** (capté mais non organifié, examen rapide ~20 min après injection) est le plus utilisé ; l’**I-123** (capté ET organifié, imagerie à 4–24 h) est préféré pour le tissu ectopique et l’étude fonctionnelle fine.',
            stats: [{ value: '~75–185 MBq', label: 'Tc-99m pertechnétate' }, { value: '~10–20 MBq', label: 'I-123 (gélule)' }, { value: '20 min / 4-24 h', label: 'Délai (Tc / I-123)' }] },
          { title: 'Interprétation', text: 'On apprécie la **taille, la position, l’homogénéité** de la fixation et la concordance avec l’échographie. Un nodule **hyperfixant avec extinction** du reste du parenchyme évoque un adénome toxique. La quantification du **pourcentage de captation** aide au calcul d’activité avant ira-thérapie.' },
          { title: 'Pièges', list: ['Contamination salivaire (Tc-99m) simulant une fixation.', 'Nodule « froid » : 85–90 % bénins, mais c’est là que se concentrent les cancers → cytoponction.', 'Surcharge iodée (faux aspect de thyroïdite).'] },
        ],
      },
    },
  },

  // 2 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_IRATHERAPIE_BASEDOW', cat: 'theranostique_thyroide', catLabel: 'Pathologies Thyroïdiennes',
    title: 'Ira-thérapie (iode-131) de l’hyperthyroïdie', difficulty: 'avancé',
    tags: ['iode-131', 'irathérapie', 'Basedow', 'nodule toxique', 'hyperthyroïdie', 'radioprotection'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM guideline for radioiodine therapy of benign thyroid disease', url: 'https://doi.org/10.1007/s00259-021-05230-5' },
      { title: 'SNMMI/EANM — Therapy of benign thyroid disease', url: 'https://www.snmmi.org' },
      { title: 'ATA Guidelines — Hyperthyroidism', url: 'https://www.thyroid.org' },
    ],
    content: {
      lead: 'L’**ira-thérapie** utilise l’**iode-131** par voie orale pour traiter durablement les hyperthyroïdies (maladie de Basedow, nodule/goitre toxique). Émetteur β⁻, l’I-131 détruit sélectivement le tissu thyroïdien hyperfonctionnel qui le capte.',
      patient: {
        sections: [
          { title: 'Le principe en clair', text: 'Vous avalez une **gélule d’iode radioactif**. Comme la thyroïde capte naturellement l’iode, le produit s’y concentre et **réduit son activité** sur quelques semaines à mois. C’est un traitement éprouvé depuis plus de 70 ans.' },
          { title: 'Consignes de radioprotection', text: 'Pendant quelques jours, vous émettez un faible rayonnement. Des **règles simples** protègent votre entourage :',
            list: ['Garder une **distance** avec les jeunes enfants et les femmes enceintes pendant la durée indiquée.', 'Boire beaucoup, tirer la chasse deux fois, hygiène des mains.', '**Contraception** indispensable (femme : ~6–12 mois ; homme : quelques mois) selon prescription.', 'Pas de grossesse ni d’allaitement (l’allaitement doit être arrêté avant).'],
            infoBox: { type: 'warning', title: 'Grossesse', text: 'L’iode-131 est formellement contre-indiqué pendant la grossesse et l’allaitement. Un test de grossesse est réalisé avant le traitement chez la femme en âge de procréer.' } },
          { title: 'Après', text: 'Une **hypothyroïdie** (thyroïde devenue insuffisante) est fréquente et attendue : elle se corrige simplement par un comprimé d’hormone à vie. Un suivi biologique régulier est mis en place.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications et alternatives', text: 'Indiquée dans le **Basedow** (récidive ou intolérance aux antithyroïdiens), le **nodule toxique** et le **goitre multinodulaire toxique**. Alternatives : antithyroïdiens de synthèse, chirurgie. Le choix dépend du volume, de l’orbitopathie, du désir de grossesse et du contexte.' },
          { title: 'Précautions', list: ['Contre-indications : grossesse, allaitement.', 'Orbitopathie basedowienne active : risque d’aggravation → corticothérapie de couverture à discuter.', 'Arrêt des antithyroïdiens quelques jours avant/après selon protocole.', 'Information et organisation du domicile (entourage, jeunes enfants).'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Physique et radiopharmaceutique', text: 'L’**I-131** est un émetteur **β⁻** (parcours tissulaire millimétrique, effet thérapeutique) et **γ 364 keV** (imagerie/contrôle, contrainte de radioprotection). Période physique **8,0 jours**.',
            figure: { svg: DECAY_SCHEME, alt: 'Schéma de désintégration (illustratif d’un radionucléide parent-fils).', caption: 'Les radionucléides thérapeutiques émettent un rayonnement particulaire (β⁻) à courte portée.' } },
          { title: 'Activités et modalités', text: 'Activités usuelles : **Basedow** ~370–600 MBq (dose fixe) ou calcul dosimétrique ; **nodule toxique** souvent plus élevé. Hospitalisation en chambre protégée selon l’activité et la réglementation locale (seuils de sortie).',
            stats: [{ value: '8 jours', label: 'Période de l’I-131' }, { value: '364 keV', label: 'γ (imagerie)' }, { value: 'β⁻', label: 'Effet thérapeutique' }] },
          { title: 'Suivi et radioprotection', list: ['Surveillance TSH/T4L à 6–8 semaines puis régulièrement ; dépistage de l’hypothyroïdie.', 'Consignes écrites de radioprotection adaptées (distance/durée) remises au patient.', 'Gestion des déchets et effluents selon réglementation.'] },
        ],
      },
    },
  },

  // 3 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_I131_CANCER_THYROIDE', cat: 'theranostique_thyroide', catLabel: 'Pathologies Thyroïdiennes',
    title: 'Iode-131 dans le cancer thyroïdien différencié', difficulty: 'avancé',
    tags: ['iode-131', 'cancer thyroïdien', 'thyroglobuline', 'rhTSH', 'reliquat', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ATA Management Guidelines for Differentiated Thyroid Cancer (2015)', url: 'https://doi.org/10.1089/thy.2015.0020' },
      { title: 'EANM/SNMMI — Radioiodine therapy of differentiated thyroid cancer', url: 'https://doi.org/10.1007/s00259-022-05727-7' },
    ],
    content: {
      lead: 'Après thyroïdectomie pour **cancer thyroïdien différencié** (papillaire/folliculaire), l’administration d’**iode-131** permet l’ablation des reliquats thyroïdiens, le traitement de la maladie résiduelle/métastatique et un **bilan corps entier** sensible. C’est l’archétype de la **théranostique**.',
      patient: {
        sections: [
          { title: 'Pourquoi ce traitement ?', text: 'Après l’ablation chirurgicale de la thyroïde, l’iode radioactif **détruit les cellules thyroïdiennes restantes** (normales ou cancéreuses) qui captent l’iode, et permet de vérifier qu’il ne reste pas de foyer ailleurs.' },
          { title: 'Préparation', list: ['**Régime pauvre en iode** 1 à 2 semaines avant (éviter sel iodé, fruits de mer, produits laitiers en excès).', 'Stimulation de la captation : soit **arrêt des hormones** thyroïdiennes (hypothyroïdie transitoire), soit injections de **TSH recombinante** (rhTSH) sans arrêt.', 'Éviter tout produit de contraste iodé.'] },
          { title: 'Hospitalisation et consignes', text: 'Selon l’activité, une **hospitalisation de quelques jours** en chambre protégée est nécessaire, avec des consignes de radioprotection à la sortie (distance, hygiène, contraception temporaire).' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Place dans la prise en charge', text: 'L’indication d’iode-131 (et l’activité) dépend du **risque de récidive** (classification ATA), de l’histologie, de l’extension et du dosage de **thyroglobuline**. Toutes les formes ne nécessitent pas d’iode (microcarcinomes de bas risque).' },
          { title: 'Suivi', list: ['**Thyroglobuline** (Tg) et anticorps anti-Tg : marqueur clé du suivi.', 'TSH freinée par hormonothérapie selon le risque.', 'Bilan corps entier à l’iode et échographie cervicale selon protocole.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Modalités et activités', text: 'Activités d’**ablation** ~1,1–3,7 GBq (30–100 mCi), plus élevées en cas de maladie métastatique. Préparation par **sevrage** (TSH > 30 mUI/L) ou **rhTSH**. Régime pauvre en iode systématique.',
            stats: [{ value: '1,1–3,7 GBq', label: 'Ablation de reliquat' }, { value: '> 30 mUI/L', label: 'TSH cible (sevrage)' }, { value: 'J+2 à J+7', label: 'Balayage post-thérapeutique' }] },
          { title: 'Imagerie post-thérapeutique', text: 'Le **balayage corps entier** post-dose (± TEMP/TDM) exploite le rayonnement γ 364 keV : il détecte des foyers parfois invisibles sur le balayage diagnostique et guide la suite.' },
          { title: 'Points d’attention', list: ['Effets précoces : sialadénite, nausées, œdème cervical.', 'Risque de **résistance à l’iode** (dédifférenciation) : envisager la TEP-FDG si Tg élevée et balayage négatif.', 'Dosimétrie des métastases / moelle pour les fortes activités.'] },
        ],
      },
    },
  },

  // 4 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_SCINTI_OSSEUSE', cat: 'rhumatologie', catLabel: 'Rhumatologie & Os',
    title: 'Scintigraphie osseuse (99mTc-MDP/HMDP)', difficulty: 'intermédiaire',
    tags: ['scintigraphie osseuse', 'MDP', 'Tc-99m', 'métastases osseuses', 'TEMP-TDM'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM bone scintigraphy procedure guidelines', url: 'https://doi.org/10.1007/s00259-016-3415-4' },
      { title: 'SNMMI Procedure Standard for Bone Scintigraphy', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **scintigraphie osseuse** au **99mTc-MDP/HMDP** image le **remodelage osseux** sur l’ensemble du squelette en une acquisition. Très sensible, peu coûteuse, elle reste un examen de première intention pour la recherche de métastases osseuses, certaines pathologies bénignes et les douleurs inexpliquées.',
      patient: {
        sections: [
          { title: 'Comment ça marche ?', text: 'Un produit faiblement radioactif se fixe sur les zones d’os en **réparation/remaniement**. Une caméra balaye tout le corps et révèle ces zones sous forme de « points » plus intenses.',
            figure: { svg: BONE_SCAN, alt: 'Silhouette de squelette avec plusieurs foyers hyperfixants marqués en rouge.', caption: 'Le traceur se fixe sur l’os en remaniement : les foyers apparaissent plus intenses.' } },
          { title: 'Déroulement', steps: [
            { title: 'Injection', text: 'Une injection veineuse du traceur.' },
            { title: 'Attente (2–3 h)', text: 'Le produit se fixe sur l’os ; buvez beaucoup et urinez avant les images.' },
            { title: 'Images', text: 'Acquisition « corps entier » de 20–30 min, parfois complétée par des images centrées (TEMP/TDM).' },
          ] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Recherche/suivi de **métastases osseuses** (sein, prostate, poumon…).', 'Pathologies bénignes : fractures de fatigue, algodystrophie, descellement/infection de prothèse, maladie de Paget.', 'Douleurs osseuses inexpliquées, bilan d’une élévation des phosphatases alcalines.'] },
          { title: 'Forces et limites', infoBox: { type: 'info', title: 'Sensible mais peu spécifique', text: 'Un foyer hyperfixant traduit un remaniement osseux, quelle qu’en soit la cause (tumeur, fracture, arthrose). La TEMP/TDM et la corrélation radiologique améliorent nettement la spécificité.' },
            text: 'Limite : les lésions purement **lytiques** (ex. myélome) peuvent être peu/pas visibles → préférer d’autres modalités dans ce contexte.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et dosimétrie', text: 'Injection de **~8–10 MBq/kg** de 99mTc-MDP ; imagerie tardive à **2–4 h**. Acquisition corps entier ± TEMP/TDM ciblée. Une imagerie **3 temps** (vasculaire, tissulaire, osseux) est utile pour l’infection/algodystrophie.',
            stats: [{ value: '~500–740 MBq', label: 'Activité adulte' }, { value: '2–4 h', label: 'Délai d’imagerie' }, { value: '3 temps', label: 'Option (infection)' }] },
          { title: 'Lecture systématique et pièges', list: ['Analyse symétrique, comparaison droite/gauche, recherche du « superscan » (métastases diffuses, reins éteints).', 'Foyers costaux alignés = fractures ; fixation articulaire = arthrose.', 'Contamination urinaire, infiltration au point d’injection.', 'TEMP/TDM indispensable pour différencier bénin/malin sur le rachis.'] },
        ],
      },
    },
  },

  // 5 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_DOTATATE_TNE', cat: 'tne', catLabel: 'Tumeurs Neuroendocrines',
    title: 'TEP-TDM au 68Ga-DOTATATE (tumeurs neuroendocrines)', difficulty: 'avancé',
    tags: ['TEP-TDM', '68Ga-DOTATATE', 'TNE', 'SSTR', 'Krenning', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI guideline for SSTR PET (68Ga-DOTA-conjugués)', url: 'https://doi.org/10.1007/s00259-017-3728-y' },
      { title: 'ENETS Consensus Guidelines — Neuroendocrine tumours', url: 'https://www.enets.org' },
    ],
    content: {
      lead: 'La **TEP au 68Ga-DOTATATE** (ou DOTATOC) cible les **récepteurs de la somatostatine (SSTR2)** surexprimés par la majorité des **tumeurs neuroendocrines** bien différenciées. Elle a remplacé la scintigraphie à l’Octreotide et constitue le versant diagnostique du couple théranostique avec le **177Lu-DOTATATE**.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'Le traceur se fixe sur une « serrure » (récepteur) présente à la surface de ces tumeurs particulières, ce qui permet de les **localiser dans tout le corps** avec une grande sensibilité.',
            figure: { svg: SSTR_BINDING, alt: 'Schéma : le DOTATATE marqué au gallium-68 se lie au récepteur SSTR2 d’une cellule neuroendocrine.', caption: 'Le DOTATATE se lie au récepteur de la somatostatine (SSTR2), cible des TNE.' } },
          { title: 'Préparation', text: 'Pas de jeûne nécessaire. Signalez un traitement par **analogues de la somatostatine** (octréotide/lanréotide) : le moment de l’examen est planifié en conséquence. Hydratez-vous bien.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Localisation d’une TNE primitive et **bilan d’extension**.', 'Sélection des patients pour la **thérapie au 177Lu-DOTATATE**.', 'Évaluation de l’expression SSTR avant analogues, et suivi.'] },
          { title: 'À préciser', infoBox: { type: 'info', title: 'Analogues de la somatostatine', text: 'Idéalement, planifier la TEP juste avant l’injection mensuelle d’analogue retard pour éviter un blocage compétitif des récepteurs. Indiquer la date de la dernière injection.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Acquisition', text: 'Injection de **~100–200 MBq** de 68Ga-DOTATATE, délai d’incorporation **45–60 min**, acquisition corps entier. Le 68Ga provient d’un générateur 68Ge/68Ga (logistique de proximité).',
            stats: [{ value: '~100–200 MBq', label: '68Ga-DOTATATE' }, { value: '45–60 min', label: 'Incorporation' }, { value: 'SSTR2', label: 'Cible' }] },
          { title: 'Interprétation — score de Krenning', text: 'L’intensité de fixation est cotée par le **score de Krenning** (0 = pas de fixation à 4 = supérieure au foie/rate), par rapport au foie et à la rate. Un Krenning **élevé et homogène** prédit l’éligibilité au 177Lu-DOTATATE.' },
          { title: 'Captations physiologiques et pièges', list: ['Physiologiques : rate (intense), foie, surrénales, hypophyse, pancréas (processus unciné — piège classique), reins/voies urinaires.', 'Faux négatifs : TNE peu différenciées (G3) → discuter une TEP-FDG (concept de « flip-flop » FDG+/SSTR−, péjoratif).', 'Inflammation SSTR-avide.'] },
        ],
      },
    },
  },

  // 6 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_LUTATHERA', cat: 'tne', catLabel: 'Tumeurs Neuroendocrines',
    title: 'Radiothérapie interne au 177Lu-DOTATATE (Lutathera)', difficulty: 'avancé',
    tags: ['177Lu-DOTATATE', 'Lutathera', 'PRRT', 'RIV', 'TNE', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'NETTER-1 trial (N Engl J Med, 2017)', url: 'https://doi.org/10.1056/NEJMoa1607427' },
      { title: 'EANM procedure guidelines for PRRT with 177Lu-labelled somatostatin analogues', url: 'https://doi.org/10.1007/s00259-022-06028-9' },
    ],
    content: {
      lead: 'La **radiothérapie interne vectorisée (PRRT)** au **177Lu-DOTATATE** délivre un rayonnement β⁻ directement au contact des **tumeurs neuroendocrines** exprimant les récepteurs de la somatostatine. C’est le volet thérapeutique du couple théranostique, validé par l’essai NETTER-1.',
      patient: {
        sections: [
          { title: 'En quoi consiste le traitement ?', text: 'On vous injecte une molécule qui se fixe sur vos tumeurs (les mêmes « serrures » que sur l’examen TEP) et porte un **isotope qui irradie de très près** les cellules tumorales, en épargnant largement les tissus sains. Le traitement se fait en **plusieurs cures** (généralement 4), espacées de ~8 semaines.' },
          { title: 'Déroulement d’une cure', text: 'Une perfusion d’acides aminés **protège vos reins**, puis le médicament est administré. Une courte hospitalisation et des consignes de radioprotection suivent chaque cure.',
            infoBox: { type: 'tip', title: 'Protection rénale', text: 'La perfusion d’acides aminés (lysine/arginine) réduit la dose reçue par les reins, organe sensible de ce traitement.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', text: 'TNE bien différenciées (gastro-entéro-pancréatiques notamment), **progressives** et **SSTR-positives** sur la TEP au 68Ga-DOTATATE. La sélection repose sur l’imagerie théranostique, l’histologie (Ki-67) et la fonction rénale/médullaire.' },
          { title: 'Tolérance', list: ['Effets fréquents : nausées (liées aux acides aminés), fatigue, cytopénies modérées.', 'Surveillance : NFS, fonction rénale, marqueurs (chromogranine A).', 'Effets tardifs rares : toxicité rénale, syndrome myélodysplasique.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Schéma thérapeutique', text: 'Standard : **4 cures de ~7,4 GBq** (200 mCi) de 177Lu-DOTATATE espacées de ~8 semaines, avec néphroprotection par acides aminés. Le 177Lu émet un **β⁻** (thérapie) et un **γ** de 113/208 keV permettant l’imagerie/dosimétrie post-cure.',
            stats: [{ value: '4 × 7,4 GBq', label: 'Schéma standard' }, { value: '~6,6 jours', label: 'Période du 177Lu' }, { value: 'β⁻ + γ', label: 'Théranostique' }] },
          { title: 'Dosimétrie et imagerie post-thérapeutique', text: 'L’imagerie TEMP/TDM post-injection (208 keV) confirme la fixation tumorale et permet une **dosimétrie** (tumeurs, reins, moelle) pour personnaliser le traitement.' },
          { title: 'Sécurité', list: ['Critères d’éligibilité : fonction rénale (DFG), réserve médullaire, SSTR+ (Krenning ≥ foie).', 'Gestion des effluents et déchets, consignes de radioprotection au patient.', 'Surveillance hématologique et rénale prolongée.'] },
        ],
      },
    },
  },

  // 7 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_SCINTI_VQ', cat: 'pneumologie', catLabel: 'Pneumologie',
    title: 'Scintigraphie pulmonaire de ventilation/perfusion (embolie)', difficulty: 'intermédiaire',
    tags: ['scintigraphie pulmonaire', 'ventilation', 'perfusion', 'embolie pulmonaire', 'MAA', 'grossesse'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM guideline on ventilation/perfusion scintigraphy', url: 'https://doi.org/10.1007/s00259-019-04450-0' },
      { title: 'SNMMI Procedure Standard — Lung scintigraphy', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **scintigraphie pulmonaire de ventilation/perfusion (V/Q)** recherche une **embolie pulmonaire** en comparant la répartition de l’air (ventilation) et du sang (perfusion). Une zone **ventilée mais non perfusée** (discordance) signe l’embolie. C’est l’examen de choix quand l’angioscanner est contre-indiqué (grossesse, allergie, insuffisance rénale).',
      patient: {
        sections: [
          { title: 'Le principe', text: 'On évalue séparément l’**air** qui entre dans vos poumons et le **sang** qui les irrigue. Une zone bien aérée mais mal irriguée évoque un caillot (embolie).',
            figure: { svg: VQ_LUNGS, alt: 'Schéma comparant une ventilation homogène et une perfusion avec un défect segmentaire (discordance V/Q).', caption: 'Une zone ventilée mais non perfusée (discordance) oriente vers une embolie pulmonaire.' } },
          { title: 'Déroulement', text: 'Vous **inhalez** un aérosol/gaz faiblement radioactif (ventilation), puis recevez une **injection** (perfusion). Les images sont prises dans la foulée. Examen sans douleur.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications privilégiées', list: ['Suspicion d’**embolie pulmonaire** avec contre-indication à l’angioscanner : **grossesse**, allergie à l’iode, insuffisance rénale.', 'Radiographie thoracique normale (meilleure performance de la V/Q).', 'Évaluation de l’hypertension pulmonaire thrombo-embolique chronique.'] },
          { title: 'Atout en contexte particulier', infoBox: { type: 'info', title: 'Grossesse', text: 'La scintigraphie de perfusion seule (faible dose) est souvent privilégiée chez la femme enceinte, avec une irradiation mammaire moindre que l’angioscanner.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceurs et protocole', text: 'Perfusion : **macroagrégats d’albumine (MAA) marqués au 99mTc** (micro-embolisation transitoire de capillaires). Ventilation : **Technegas**, aérosol ou krypton-81m. Acquisition planaire multi-incidences et/ou **TEMP/TDM** (meilleure performance).',
            stats: [{ value: '~100–200 MBq', label: '99mTc-MAA (perfusion)' }, { value: '~200 000', label: 'Particules MAA (sécurité)' }, { value: 'TEMP/TDM', label: 'Mode recommandé' }] },
          { title: 'Interprétation', text: 'On recherche des **discordances V/Q** (perfusion absente, ventilation conservée) de distribution segmentaire. Critères **PISA-PED / EANM** ; la TEMP/TDM réduit les examens « non concluants ».' },
          { title: 'Précautions', list: ['Réduire le nombre de particules MAA en cas d’HTAP sévère, shunt droite-gauche, grossesse.', 'Mismatch non embolique : compression vasculaire, post-radique, vascularite.', 'Match (V et Q altérées) : BPCO, pneumopathie.'] },
        ],
      },
    },
  },

  // 8 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_DATSCAN', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'DaTscan : scintigraphie des transporteurs de la dopamine', difficulty: 'avancé',
    tags: ['DaTscan', 'I-123 ioflupane', 'Parkinson', 'transporteur dopamine', 'tremblement'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI guideline for dopamine transporter imaging (123I-FP-CIT)', url: 'https://doi.org/10.1007/s00259-020-04817-8' },
      { title: 'HAS — Place de la scintigraphie DAT', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'Le **DaTscan** (123I-ioflupane) image les **transporteurs de la dopamine** dans le striatum. Il aide à distinguer les syndromes parkinsoniens dégénératifs (atteinte présynaptique) des situations où le système dopaminergique est intact (tremblement essentiel, syndrome parkinsonien médicamenteux).',
      patient: {
        sections: [
          { title: 'À quoi sert l’examen ?', text: 'Il évalue le bon fonctionnement d’un circuit du cerveau impliqué dans le **contrôle des mouvements**. Il aide votre médecin à préciser la cause d’un tremblement ou d’une lenteur des mouvements.',
            figure: { svg: DATSCAN_STRIATUM, alt: 'Comparaison d’un striatum normal en forme de virgules symétriques et d’un striatum altéré réduit à un point asymétrique.', caption: 'Aspect normal en « virgules » vs perte asymétrique dans un syndrome parkinsonien.' } },
          { title: 'Préparation', text: 'On protège votre thyroïde par une **solution iodée** (gouttes/comprimé) avant l’injection. Certains médicaments peuvent être suspendus : suivez les consignes. L’examen comporte une injection puis des images du cerveau ~3–4 h après.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Différencier **tremblement essentiel** (DAT normal) et **syndrome parkinsonien dégénératif** (DAT altéré).', 'Préciser un syndrome parkinsonien atypique ou d’origine médicamenteuse.', 'Aide au diagnostic de la démence à corps de Lewy.'] },
          { title: 'Ce que l’examen ne fait pas', infoBox: { type: 'warning', title: 'Limite importante', text: 'Le DaTscan confirme une atteinte présynaptique dopaminergique mais ne distingue pas, à lui seul, les différents syndromes parkinsoniens dégénératifs entre eux (Parkinson vs AMS vs PSP).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceur et protocole', text: 'Le **123I-FP-CIT** (ioflupane) se lie au DAT présynaptique. **Blocage thyroïdien** préalable (iode/perchlorate). Injection ~**110–185 MBq**, imagerie cérébrale (TEMP/TDM) à **3–6 h**.',
            stats: [{ value: '~110–185 MBq', label: '123I-ioflupane' }, { value: '3–6 h', label: 'Délai d’imagerie' }, { value: 'Striatum', label: 'Cible (DAT)' }] },
          { title: 'Analyse', text: 'Lecture visuelle (forme « virgule » vs « point », symétrie) complétée par la **quantification** (ratio de fixation striatum/fond, putamen/caudé). Une atteinte typiquement **asymétrique et à prédominance putaminale** oriente vers une dégénérescence.' },
          { title: 'Pièges', list: ['Médicaments interférant avec le DAT (certains psychostimulants, cocaïne).', 'Blocage thyroïdien indispensable (123I).', 'Aspect normal n’exclut pas une cause non dégénérative des symptômes.'] },
        ],
      },
    },
  },

  // 9 ───────────────────────────────────────────────────────────────────────
  {
    id: 'V2_SCINTI_RENALE_MAG3', cat: 'nephro_urologie', catLabel: 'Néphro-Urologie',
    title: 'Scintigraphie rénale dynamique (99mTc-MAG3)', difficulty: 'intermédiaire',
    tags: ['scintigraphie rénale', 'MAG3', 'rénogramme', 'obstruction', 'Lasilix', 'fonction séparée'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM guideline for dynamic renal scintigraphy', url: 'https://doi.org/10.1007/s00259-018-4087-z' },
      { title: 'SNMMI Procedure Standard — Diuretic renography', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **scintigraphie rénale dynamique** au **99mTc-MAG3** étudie en temps réel la **fonction de chaque rein** et l’écoulement des urines. Avec un test au diurétique (Lasilix), elle différencie une vraie **obstruction** d’une simple dilatation, et mesure la **fonction rénale séparée**.',
      patient: {
        sections: [
          { title: 'Le principe', text: 'Après une injection, une caméra suit **en continu** l’arrivée du produit dans chaque rein puis son évacuation vers la vessie. On obtient une courbe pour chaque rein.',
            figure: { svg: RENOGRAM, alt: 'Rénogramme : courbe normale avec pic puis décroissance (excrétion) et courbe d’obstruction qui monte sans redescendre.', caption: 'Le rénogramme : courbe d’un rein normal (excrétion) vs obstrué (pas de décroissance).' } },
          { title: 'Déroulement', text: 'Vous restez allongé sous la caméra pendant ~**30 minutes** après l’injection. Une **injection de diurétique** et une bonne hydratation peuvent être nécessaires. Pensez à bien vous hydrater avant.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Différencier **obstruction** vs dilatation non obstructive (hydronéphrose, syndrome de la jonction).', 'Mesure de la **fonction rénale séparée** (% par rein) avant chirurgie.', 'Bilan d’une HTA réno-vasculaire (test au captopril), suivi de transplant rénal.'] },
          { title: 'À préciser', text: 'Indiquer la **créatinine**, l’hydratation, la question clinique (obstruction ? fonction séparée ?) et les traitements (IEC/diurétiques) qui peuvent être adaptés selon le protocole.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceur et protocole', text: 'Le **99mTc-MAG3** (sécrétion tubulaire, haute extraction) est le traceur de référence pour l’étude dynamique ; le **DMSA** sert à l’imagerie statique du parenchyme (cicatrices). Acquisition dynamique dès l’injection, **test au furosémide** (F+20 / F−15) selon protocole.',
            stats: [{ value: '~100–200 MBq', label: '99mTc-MAG3' }, { value: '~30 min', label: 'Acquisition dynamique' }, { value: 'Furosémide', label: 'Test d’obstruction' }] },
          { title: 'Interprétation du rénogramme', text: 'Trois phases : **vasculaire**, **captation** (fonction), **excrétion**. Une courbe **ascendante ne redescendant pas malgré le diurétique** signe l’obstruction ; une bonne réponse au furosémide l’exclut. La fonction séparée est exprimée en %.' },
          { title: 'Pièges', list: ['Déshydratation/vessie pleine faussant l’excrétion (vidange vésicale, hydratation).', 'Rein peu fonctionnel : réponse diurétique ininterprétable.', 'Bonne synchronisation du diurétique indispensable.'] },
        ],
      },
    },
  },

  // 10 ──────────────────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_LYMPHOME', cat: 'hematologie', catLabel: 'Hématologie & Lymphomes',
    title: 'TEP-TDM au 18F-FDG dans les lymphomes (score de Deauville)', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'lymphome', 'Deauville', 'Lugano', 'réponse thérapeutique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Lugano classification (Cheson, J Clin Oncol 2014)', url: 'https://doi.org/10.1200/JCO.2013.54.8800' },
      { title: 'Deauville 5-point scale — consensus', url: 'https://doi.org/10.1007/s00259-016-3690-8' },
      { title: 'EANM/EARL FDG-PET/CT — lymphoma', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **TEP-TDM au 18F-FDG** est centrale dans la prise en charge des **lymphomes** avides (Hodgkin, lymphomes B à grandes cellules…) : bilan d’extension initial, **évaluation précoce** sous traitement et bilan de fin de traitement. La réponse métabolique est cotée par le **score de Deauville** dans le cadre de la classification de **Lugano**.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'Le lymphome consomme beaucoup de sucre : la TEP au FDG le **localise dans tout le corps** et, surtout, mesure **si le traitement fonctionne** en comparant les examens.' },
          { title: 'Préparation', text: 'Comme pour toute TEP-FDG : **jeûne de 4–6 h**, glycémie contrôlée, repos avant l’injection, pas d’effort la veille. Signalez un diabète. L’examen dure environ 2 h sur place.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Rôle aux différentes étapes', list: ['**Bilan initial** : stadification (Ann Arbor), repérage des sites pour biopsie.', '**TEP intermédiaire** (interim) : valeur pronostique majeure, base des stratégies adaptées à la réponse.', '**Fin de traitement** : la TEP négative (Deauville 1–3) est un objectif fort de rémission.'] },
          { title: 'Interprétation à connaître', infoBox: { type: 'info', title: 'Score de Deauville', text: 'Échelle visuelle en 5 points comparant la fixation résiduelle au médiastin (point 2) et au foie (point 3). 1–3 = réponse métabolique favorable ; 4–5 = fixation supérieure au foie, à interpréter selon le contexte.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et harmonisation', text: 'TEP-FDG corps entier standardisée (incorporation 60 min, glycémie contrôlée). L’**harmonisation EARL** des SUV est essentielle pour comparer interim/fin de traitement. Éviter la TEP trop proche d’une chimiothérapie/G-CSF (rebond médullaire/splénique).' },
          { title: 'Score de Deauville (échelle en 5 points)', table: undefined,
            text: 'La cotation oppose la lésion résiduelle aux références **médiastin** et **foie**.' },
          { title: 'Pièges', list: ['Rebond thymique, hyperplasie médullaire post-G-CSF, foyers infectieux/inflammatoires (faux positifs).', 'Graisse brune, sarcoïdose associée.', 'Le timing par rapport à la cure conditionne l’interprétation.'] },
        ],
        table: {
          headers: ['Score de Deauville', 'Définition'],
          rows: [
            ['1', 'Pas de fixation résiduelle'],
            ['2', 'Fixation ≤ médiastin'],
            ['3', 'Fixation > médiastin mais ≤ foie'],
            ['4', 'Fixation modérément > foie'],
            ['5', 'Fixation nettement > foie ou nouvelles lésions'],
          ],
        },
      },
    },
  },
];
