import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

// Read firebase config
const configPath = './firebase-applet-config.json';
if (!fs.existsSync(configPath)) {
  console.error('Firebase config not found');
  process.exit(1);
}

const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const articleData = {
  id: 'MN004',
  cat: 'oncologie',
  catLabel: 'Oncologie',
  title: 'TEP-TDM au ¹⁸F-FDG dans le cancer du poumon',
  tags: ['PET-CT', '¹⁸F-FDG', 'Oncologie', 'Poumon', 'Staging'],
  difficulty: 'avancé',
  excerpt: "La TEP-TDM au ¹⁸F-FDG est l'examen de référence pour le bilan d'extension, l'évaluation thérapeutique et la planification de radiothérapie des cancers broncho-pulmonaires.",
  authors: ['Dr. Fréjuste Agboton'],
  sources: [
    { title: "EANM procedure guidelines for tumour imaging: version 3.0", url: "https://link.springer.com/article/10.1007/s00259-024-06684-x" },
    { title: "Joint EANM/SNMMI/ESTRO practice recommendations for the use of 2-[18F]FDG PET/CT external beam radiation treatment planning in lung cancer", url: "https://link.springer.com/article/10.1007/s00259-022-05720-y" },
    { title: "SNMMI Appropriate Use Criteria for Initial Staging of Non-Small Cell Lung Cancer (2025)", url: "#" }
  ],
  content: JSON.stringify({
    lead: "La TEP-TDM au ¹⁸F-FDG est l'examen d'imagerie moléculaire de référence dans la prise en charge du cancer du poumon, combinant la précision anatomique du scanner à la cartographie métabolique tumorale pour un bilan d'extension et un suivi optimisés.",
    patient: {
      sections: [
        {
          title: "Introduction : Pourquoi cet examen pour moi ?",
          text: "Nous savons que le diagnostic de cancer du poumon est une épreuve difficile et source d'anxiété. Votre médecin vous a prescrit une TEP-TDM (ou Pet-scan) au FDG. Derrière ce nom complexe se cache un examen indolore et extrêmement utile. Pour faire simple : c'est une caméra très sensible couplée à un scanner, qui permet de voir exactement où les cellules de votre corps « mangent » du sucre. Comme les cellules cancéreuses sont très gourmandes en énergie, elles vont absorber ce sucre (le FDG) et devenir visibles sur nos écrans comme de petites ampoules allumées."
        },
        {
          title: "À quoi sert cet examen dans mon cancer du poumon ?",
          text: "Cet examen est une véritable boussole pour votre équipe médicale. Il a plusieurs rôles majeurs :",
          list: [
            "Faire un bilan complet : Il permet de vérifier en un seul examen l'ensemble de votre corps (des yeux jusqu'aux cuisses) pour s'assurer que la maladie est localisée au poumon ou si elle a touché des ganglions ou d'autres organes (métastases).",
            "Choisir le meilleur traitement : En connaissant l'étendue exacte de la maladie, vos médecins pourront décider si une chirurgie est possible, ou s'il vaut mieux privilégier une radiothérapie, une chimiothérapie ou une immunothérapie.",
            "Guider les rayons : Si vous devez avoir de la radiothérapie, la TEP aide le radiothérapeute à cibler précisément la tumeur tout en épargnant vos poumons sains.",
            "Vérifier l'efficacité des traitements : Après quelques mois, un nouveau Pet-scan permettra de voir si le traitement a bien fonctionné (les « ampoules » s'éteignent)."
          ],
          infoBox: {
            type: "tip",
            title: "Un bénéfice concret",
            text: "La TEP-TDM permet souvent d'éviter des opérations chirurgicales inutiles en détectant des éléments invisibles sur un scanner classique."
          }
        },
        {
          title: "Comment me préparer ? (Conseils pratiques)",
          text: "Pour que l'examen soit réussi, le sucre que nous allons vous injecter ne doit pas être en concurrence avec le sucre de votre alimentation. C'est pourquoi la préparation est stricte :",
          list: [
            "Être à jeun strict : Ne rien manger, ne rien boire (sauf de l'eau pure), ne pas mâcher de chewing-gum ni sucer de bonbon pendant les 6 heures précédant l'examen.",
            "Boire de l'eau : Il est très important de boire beaucoup d'eau plate avant et après l'examen pour bien vous hydrater et éliminer le produit.",
            "Pas de sport : Évitez toute activité physique intense (sport, jardinage, bricolage lourd) la veille et le jour de l'examen, pour que vos muscles soient au repos et n'absorbent pas le sucre."
          ],
          infoBox: {
            type: "warning",
            title: "Cas particulier : Si vous êtes diabétique",
            text: "Le diabète modifie le taux de sucre dans le sang. Lors de la prise de rendez-vous, signalez-le impérativement. Nous vous donnerons des consignes spécifiques pour vos médicaments (insuline, metformine) et l'heure de votre repas, afin que votre glycémie soit parfaite le jour J."
          }
        },
        {
          title: "Déroulement de l'examen : pas à pas",
          text: "L'examen se déroule en plusieurs étapes, dans une ambiance calme et bienveillante :",
          list: [
            "L'accueil : Un manipulateur vous installe dans un box individuel confortable et vérifie votre taux de sucre au bout du doigt.",
            "L'injection : On vous pose une petite perfusion dans le bras pour injecter le produit (le FDG). C'est totalement indolore et vous ne ressentirez aucun effet bizarre (pas de chaleur, pas de nausée).",
            "Le repos : Vous devrez rester allongé, au calme, sans lire ni parler ni regarder votre téléphone pendant environ 60 minutes. C'est le temps nécessaire pour que le produit se diffuse dans votre corps.",
            "Les images : Vous passerez ensuite sous la caméra (qui ressemble à un gros anneau, comme un scanner). L'appareil est très ouvert, vous ne serez pas enfermé. L'enregistrement dure environ 20 à 30 minutes. La machine fait un léger ronronnement, mais ce n'est pas bruyant comme une IRM."
          ]
        },
        {
          title: "Est-ce dangereux ? La radiation expliquée",
          text: "Le mot « nucléaire » peut faire peur, mais la dose de rayonnements que vous allez recevoir est très faible. Elle correspond à peu près à ce que l'on reçoit naturellement en vivant sur Terre pendant 2 à 3 ans, ou lors de quelques vols long-courriers en avion. Le produit s'élimine très vite (en quelques heures) par les urines.",
          infoBox: {
            type: "info",
            title: "Précautions après l'examen",
            text: "Par principe de précaution, nous vous demanderons d'éviter les contacts étroits et prolongés avec les femmes enceintes et les jeunes enfants (moins de 10 ans) pendant le reste de la journée."
          }
        },
        {
          title: "Que vont-ils voir sur les images ?",
          text: "Le médecin nucléaire va analyser une fusion de deux images : le scanner (qui montre l'anatomie de vos poumons) et la TEP (qui montre l'activité). Sur l'écran, les zones très actives (comme la tumeur) apparaîtront sous forme de taches lumineuses (souvent colorées en rouge ou jaune sur nos écrans). Cela permet de faire la différence entre une simple cicatrice (qui ne s'allume pas) et une tumeur active."
        },
        {
          title: "Après l'examen : résultats et suivi",
          text: "Vous pourrez repartir immédiatement après l'examen, conduire votre voiture et manger normalement. Le médecin nucléaire a besoin de temps pour analyser minutieusement les centaines d'images obtenues. Le compte-rendu détaillé sera envoyé directement au médecin (pneumologue ou oncologue) qui vous a prescrit l'examen. C'est lui qui vous expliquera les résultats lors de votre prochaine consultation, car il a une vision globale de votre dossier."
        },
        {
          title: "Conclusion",
          text: "La TEP-TDM est un allié précieux. C'est une technologie de pointe mise à votre service pour vous garantir le traitement le plus juste et le plus personnalisé possible. Toute notre équipe est là pour vous accompagner lors de cette étape."
        }
      ]
    },
    medecin_non_nuc: {
      sections: [
        {
          title: "Introduction et bases physiopathologiques",
          text: "La TEP-TDM au ¹⁸F-FDG repose sur l'hypermétabolisme glucidique des cellules tumorales (effet Warburg). Le FDG, un analogue du glucose, pénètre dans la cellule via les transporteurs GLUT (surexprimés dans le cancer du poumon) et est phosphorylé par l'hexokinase. Ne pouvant poursuivre la glycolyse, il reste piégé dans la cellule. La fusion avec la TDM low-dose ou diagnostique permet une localisation anatomique précise des foyers d'hypermétabolisme, offrant une sensibilité et une spécificité très supérieures à la TDM seule pour le staging ganglionnaire et métastatique."
        },
        {
          title: "Indications cliniques dans le cancer du poumon (CPNPC et CPC)",
          text: "La TEP-TDM est incontournable dans la prise en charge des cancers broncho-pulmonaires :",
          list: [
            "Staging initial (Bilan d'extension) : Indication de grade A. Selon les AUC SNMMI 2025, elle obtient un score de 9 (hautement approprié) pour les maladies potentiellement curables (stades I à III) afin d'éliminer une atteinte ganglionnaire médiastinale (N2/N3) ou des métastases à distance (M1) occultes. Pour les maladies d'emblée métastatiques (score 6), elle reste utile pour identifier le site de biopsie le plus accessible.",
            "Caractérisation du nodule pulmonaire solitaire (NPS) : Utile pour les nodules solides > 8 mm à risque intermédiaire de malignité.",
            "Planification de radiothérapie : Recommandée (EANM/SNMMI/ESTRO 2022) pour la délimitation précise du volume tumoral macroscopique (GTV), en différenciant la tumeur active de l'atélectasie ou de la pneumopathie obstructive.",
            "Évaluation de la réponse thérapeutique : En fin de traitement (chimiothérapie, radiothérapie, immunothérapie) pour évaluer la réponse métabolique complète, partielle ou la progression.",
            "Détection de récidive : Devant une symptomatologie clinique, une élévation des marqueurs ou une anomalie morphologique équivoque au scanner."
          ]
        },
        {
          title: "Quand prescrire et à quel moment ?",
          text: "Le timing de la prescription est crucial pour éviter les faux positifs liés à l'inflammation :",
          list: [
            "Post-Chimiothérapie : Attendre au moins 2 à 3 semaines après la dernière cure.",
            "Post-Radiothérapie : L'inflammation radique est intense. Il faut attendre au moins 12 semaines (idéalement 3 à 4 mois) après la fin de la RT pour évaluer la réponse.",
            "Post-Chirurgie : Attendre environ 6 semaines pour éviter la fixation cicatricielle.",
            "Post-Biopsie : Idéalement, la TEP doit être réalisée AVANT la biopsie. Si la biopsie a eu lieu, attendre au moins 1 à 2 semaines."
          ],
          infoBox: {
            type: "warning",
            title: "Contre-indications et Précautions",
            text: "Grossesse (sauf urgence absolue avec adaptation dosimétrique). L'hyperglycémie non contrôlée (> 2 g/L ou 11 mmol/L) est une contre-indication relative majeure car elle induit une compétition compétitive avec le FDG, diminuant la sensibilité de l'examen."
          }
        },
        {
          title: "Interprétation du compte-rendu : ce que le médecin nucléaire vous dit",
          text: "Le compte-rendu TEP utilise des paramètres semi-quantitatifs qu'il faut savoir interpréter :",
          list: [
            "SUVmax (Standardized Uptake Value) : Reflète l'intensité maximale de fixation. Un SUVmax élevé est souvent corrélé à l'agressivité tumorale (Ki-67 élevé) et a une valeur pronostique péjorative.",
            "MTV (Metabolic Tumor Volume) et TLG (Total Lesion Glycolysis) : Nouveaux biomarqueurs reflétant la charge tumorale globale, de plus en plus utilisés dans les essais cliniques.",
            "Critères PERCIST : Système standardisé d'évaluation de la réponse thérapeutique. Une diminution de 30% du SULpeak (SUV corrigé sur la masse maigre) signe une réponse métabolique partielle.",
            "iPERCIST / imPERCIST : Critères adaptés à l'immunothérapie pour gérer le phénomène de pseudo-progression (flare-up immunitaire)."
          ]
        },
        {
          title: "Impact sur la prise en charge multidisciplinaire",
          text: "La TEP-TDM modifie le stade de la maladie dans environ 30% des cas (le plus souvent par un up-staging). Elle évite des thoracotomies inutiles chez 20% des patients en révélant des métastases occultes (surrénales, os, foie). Elle permet également de guider les biopsies vers les sites les plus hypermétaboliques (évitant la nécrose) et d'identifier les patients candidats aux traitements ablatifs locaux (oligométastases)."
        },
        {
          title: "Limites, pièges et faux positifs/négatifs spécifiques au poumon",
          text: "Le FDG n'est pas un traceur spécifique du cancer, mais du métabolisme glucidique.",
          list: [
            "Faux Positifs (Inflammation/Infection) : Tuberculose, sarcoïdose, pneumopathie infectieuse, abcès, pneumopathie radique, ganglions réactionnels (anthracose).",
            "Faux Négatifs (Faible avidité ou petite taille) : Adénocarcinomes lépidiques (anciennement carcinomes bronchiolo-alvéolaires), tumeurs carcinoïdes typiques (bien différenciées), lésions < 8 mm (effet de volume partiel)."
          ],
          infoBox: {
            type: "info",
            title: "Le Cerveau",
            text: "Le cerveau consomme physiologiquement énormément de glucose. La TEP au FDG est donc peu performante pour la recherche de métastases cérébrales. Une IRM cérébrale injectée reste indispensable dans le bilan d'extension systématique du cancer du poumon."
          }
        },
        {
          title: "Conclusion et prise en charge intégrée",
          text: "La TEP-TDM au ¹⁸F-FDG est le pivot de la décision en Réunion de Concertation Pluridisciplinaire (RCP) d'oncologie thoracique. Une prescription au bon timing et une transmission précise des données cliniques (diabète, traitements récents, histologie) au médecin nucléaire sont les garants d'une interprétation optimale."
        }
      ]
    },
    medecin_nuc: {
      sections: [
        {
          title: "1. Introduction et Épidémiologie",
          text: "Le cancer du poumon reste la première cause de mortalité par cancer dans le monde. La TEP-TDM au ¹⁸F-FDG a révolutionné sa prise en charge, avec un niveau de preuve IA (EANM) pour le staging initial des CPNPC (Cancers Pulmonaires Non à Petites Cellules). Elle permet une stadification TNM métabolique d'une précision inégalée, modifiant la stratégie thérapeutique dans près d'un tiers des cas, principalement par la détection d'atteintes ganglionnaires médiastinales (N2/N3) inattendues ou de métastases à distance (M1b/c) occultes."
        },
        {
          title: "2. Principes Biophysiques et Radiopharmacie",
          text: "Le rationnel repose sur l'effet Warburg : la reprogrammation métabolique des cellules cancéreuses vers la glycolyse aérobie.",
          list: [
            "Mécanisme d'uptake : Le ¹⁸F-FDG (2-désoxy-2-[¹⁸F]fluoro-D-glucose) pénètre la membrane cellulaire via les transporteurs GLUT (principalement GLUT-1 et GLUT-3, surexprimés par l'hypoxie via HIF-1α).",
            "Piégeage intracellulaire : Il est phosphorylé par l'hexokinase II (HK-II) en FDG-6-phosphate. L'absence de groupement hydroxyle en C2 empêche la poursuite de la glycolyse (isomérisation impossible). La faible activité de la glucose-6-phosphatase dans les cellules tumorales entraîne une accumulation (trapping) continue du traceur.",
            "Isotope : Le Fluor-18 est un émetteur β+ pur (97%), d'énergie maximale 0.634 MeV (parcours moyen dans l'eau ~0.6 mm, garantissant une excellente résolution spatiale intrinsèque), de demi-vie physique T½ = 109.8 minutes.",
            "Dosimétrie : L'organe critique est la vessie. La dose efficace est d'environ 0.019 mSv/MBq. Pour une activité standard de 3 MBq/kg, la dose liée au radiopharmaceutique est d'environ 4 à 5 mSv, à laquelle s'ajoute la dose de la TDM (2 à 5 mSv pour un low-dose, jusqu'à 10-15 mSv pour un scanner diagnostique injecté)."
          ]
        },
        {
          title: "3. Indications et Recommandations Internationales (EBM)",
          text: "La pratique doit s'aligner sur les guidelines récentes :",
          list: [
            "Staging Initial : Les AUC SNMMI 2025 confirment un score de 9 pour l'évaluation initiale des CPNPC de stades I-III. La TEP a une VPP élevée pour les N2/N3, mais toute fixation médiastinale isolée modifiant la résécabilité DOIT être confirmée histologiquement (EBUS/EUS ou médiastinoscopie) en raison des faux positifs inflammatoires.",
            "Planification de Radiothérapie (RT) : Les recommandations conjointes EANM/SNMMI/ESTRO (2022) valident l'utilisation de la TEP pour délimiter le GTV (Gross Tumor Volume). Elle permet de distinguer la tumeur de l'atélectasie d'accompagnement. L'acquisition doit idéalement se faire en position de traitement (table plate, contentions) avec synchronisation respiratoire (TEP 4D) pour évaluer le mouvement tumoral (ITV - Internal Target Volume).",
            "Évaluation de la réponse : Utilisation recommandée des critères PERCIST 1.0. Pour l'immunothérapie (inhibiteurs de checkpoints immunitaires type anti-PD1/PD-L1), l'utilisation des critères iPERCIST ou imPERCIST est cruciale pour ne pas classer à tort en progression un phénomène de pseudo-progression (infiltrat lymphocytaire tumoral induisant un hypermétabolisme transitoire)."
          ]
        },
        {
          title: "4. Protocoles d'Acquisition et Harmonisation (EANM v3.0)",
          text: "Le respect des standards EARL 2 est impératif pour la reproductibilité multicentrique et l'utilisation des SUV en recherche clinique.",
          list: [
            "Préparation : Jeûne de 4 à 6h. Glycémie capillaire < 11 mmol/L (idéalement < 8.3 mmol/L). Hydratation per os (500 mL).",
            "Activité administrée : Selon les abaques EANM, généralement fonction du poids (ex: 3 MBq/kg) ou du BMI, adaptée à la sensibilité du système (caméras numériques SiPM permettant une réduction drastique de la dose).",
            "Délai d'uptake : 60 minutes (tolérance 55-75 min). Un délai strict est vital pour la reproductibilité du SUV. Des acquisitions tardives (à 2h) peuvent aider à différencier tumeur (le SUV augmente) et inflammation (le SUV stagne ou diminue), bien que ce concept de double phase soit débattu.",
            "Champ de vue (FOV) : Du vertex (ou base du crâne) jusqu'à la mi-cuisse. Un balayage corps entier (incluant les membres inférieurs) est recommandé en cas de suspicion de métastases osseuses distales ou cutanées.",
            "Acquisition TDM : TDM low-dose pour la correction d'atténuation et le repérage. L'utilisation d'un TDM diagnostique injecté (temps portal) au cours de la même session est de plus en plus standardisée pour un « one-stop shop »."
          ]
        },
        {
          title: "5. Sémiologie, Interprétation et Critères d'Analyse",
          text: "L'analyse visuelle reste la pierre angulaire, complétée par la semi-quantification.",
          list: [
            "Paramètres quantitatifs : Le SUVmax est sensible au bruit. Le SUVpeak (moyenne d'une ROI sphérique de 1 cm³ centrée sur la zone la plus chaude) est recommandé par PERCIST car plus robuste. Le SUL (SUV normalisé sur la Lean Body Mass) réduit la variabilité liée à l'adiposité.",
            "Paramètres volumétriques : Le MTV (Metabolic Tumor Volume) et le TLG (Total Lesion Glycolysis = MTV × SUVmean) sont d'excellents facteurs pronostiques indépendants, reflétant la charge tumorale globale.",
            "Critères PERCIST : Une réponse métabolique partielle (PMR) nécessite une baisse de ≥ 30% et d'au moins 0.8 unité du SULpeak de la lésion cible. La progression (PMD) est une augmentation de ≥ 30% ou l'apparition d'une nouvelle lésion."
          ]
        },
        {
          title: "6. Pièges, Artefacts et Faux Positifs/Négatifs",
          text: "La connaissance des limites de la technique est la marque de l'expert :",
          list: [
            "Faux Positifs : Granulomatoses (sarcoïdose, tuberculose, histoplasmose), pneumopathies infectieuses/organisées, pneumopathie radique (peut persister > 6 mois), hyperplasie thymique rebond post-chimiothérapie, fixation de la graisse brune (Brown Adipose Tissue - BAT, à prévenir par réchauffement ou bêta-bloquants).",
            "Faux Négatifs : Adénocarcinomes de type lépidique (faible densité cellulaire, métabolisme lent), tumeurs carcinoïdes typiques, lésions millimétriques (effet de volume partiel, sous-estimant le SUV).",
            "Artefacts techniques : Artefact de mouvement respiratoire (flou cinétique, mismatch TEP/TDM au niveau des bases pulmonaires créant un faux aspect de lésion hépatique ou diaphragmatique), artefact métallique (pacemaker, prothèse) sur-corrigeant l'atténuation."
          ]
        },
        {
          title: "7. Structure du Compte-Rendu Type",
          text: "Un compte-rendu de qualité doit être structuré, clair et répondre à la question clinique :",
          list: [
            "Indication et Contexte : Histologie, date des traitements, glycémie à jeun.",
            "Technique : Activité injectée, délai, type de machine (analogique/numérique, TOF), type de TDM.",
            "Résultats (T) : Description de la lésion primitive (localisation, taille TDM, SUVmax/peak).",
            "Résultats (N) : Statut ganglionnaire hilaire et médiastinal (préciser les stations ganglionnaires selon la classification IASLC).",
            "Résultats (M) : Statut métastatique (surrénales, os, foie, autres).",
            "Conclusion : Stadification TNM métabolique (mTNM). Réponse claire à la question posée. Recommandation éventuelle (ex: confrontation histologique d'un ganglion N2 isolé)."
          ]
        },
        {
          title: "8. Points clés FMC (Take-home messages)",
          infoBox: {
            type: "tip",
            title: "À retenir pour la pratique",
            text: "1. Toute fixation médiastinale (N2/N3) isolée modifiant la résécabilité chirurgicale exige une preuve histologique (EBUS) en raison des faux positifs inflammatoires.\n2. Le cerveau doit toujours être exploré par IRM, la TEP-FDG y étant aveugle pour les petites métastases.\n3. En évaluation de réponse à l'immunothérapie, méfiez-vous de la pseudo-progression (iPERCIST) : ne pas conclure hâtivement à un échec thérapeutique devant une majoration modérée de la fixation lors du premier bilan."
          }
        }
      ],
      table: {
        headers: ["Paramètre", "Spécification (Guidelines EANM v3.0)"],
        rows: [
          ["Radiopharmaceutique", "2-[¹⁸F]FDG"],
          ["Préparation", "Jeûne > 4-6h, Glycémie < 11 mmol/L"],
          ["Activité recommandée", "Abaques EANM (ex: 3 MBq/kg pour systèmes standards, < 2 MBq/kg pour SiPM)"],
          ["Délai d'uptake", "60 minutes (± 5 min de tolérance idéale)"],
          ["Acquisition TDM", "Low-dose (10-30 mAs) ou Diagnostique (avec injection d'iode)"],
          ["Reconstruction", "OSEM avec TOF (Time-Of-Flight) et PSF (Point Spread Function) si disponibles"],
          ["Critères de réponse", "PERCIST 1.0 (SULpeak) ou EORTC (SUVmax)"]
        ]
      }
    }
  })
};

async function migrate() {
  try {
    console.log('Updating MN004 in Firestore...');
    const docRef = doc(db, 'articles', 'MN004');
    await setDoc(docRef, {
      ...articleData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('MN004 updated successfully in Firestore.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating MN004:', error);
    process.exit(1);
  }
}

migrate();
