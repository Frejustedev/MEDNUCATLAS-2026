// Lot 1 — Articles phares NucleAtlas (rédigés avec assistance IA, à relire).
// IDs préfixés V2_ pour coexister avec l'ancien contenu (comparaison).
import {
  FDG_UPTAKE,
  PET_COINCIDENCE,
  PSMA_BINDING,
  MPI_PROTOCOL,
  BULLSEYE_17,
  TC_GENERATOR,
  DECAY_SCHEME,
} from './diagrams.mjs';

const AUTHORS = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];

export const articles = [
  // ════════════════════════════════════════════════════════════════════════
  // 1. TEP-TDM au 18F-FDG dans le cancer du poumon
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'V2_TEP_FDG_POUMON',
    cat: 'oncologie',
    catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-FDG dans le cancer du poumon',
    difficulty: 'intermédiaire',
    tags: ['TEP-TDM', '18F-FDG', 'cancer du poumon', 'oncologie', 'bilan d’extension', 'SUVmax'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
    authors: AUTHORS,
    reviewStatus: 'ai_assisted',
    sources: [
      { title: 'EANM/EARL FDG-PET/CT tumour imaging guideline v2.0 (Eur J Nucl Med Mol Imaging, 2015)', url: 'https://doi.org/10.1007/s00259-014-2961-x' },
      { title: 'SNMMI Procedure Standard / EANM Practice Guideline for FDG-PET/CT, v2.0', url: 'https://doi.org/10.2967/jnumed.115.169839' },
      { title: 'HAS — Cancer du poumon : bilan initial (recommandations)', url: 'https://www.has-sante.fr' },
      { title: 'Fleischner Society / IASLC — TNM 8e édition du cancer bronchique', url: 'https://www.iaslc.org' },
    ],
    content: {
      lead: 'La **TEP-TDM au 18F-FDG** (tomographie par émission de positons couplée au scanner) est un examen d’imagerie métabolique de référence dans le cancer du poumon. Elle cartographie en une acquisition « corps entier » les zones de consommation accrue de glucose, caractéristiques de la plupart des tumeurs, et complète le scanner anatomique pour le bilan d’extension, l’évaluation de la réponse au traitement et la recherche de récidive.',
      patient: {
        sections: [
          {
            title: 'Qu’est-ce qu’une TEP au FDG ?',
            text: 'Le **FDG** est un sucre (glucose) légèrement modifié et rendu **faiblement radioactif**. On vous l’injecte dans une veine. Les cellules très actives — dont beaucoup de cellules cancéreuses — consomment plus de sucre que les cellules normales : elles « captent » donc davantage de FDG. Une caméra spéciale détecte ce produit et fabrique des images qui montrent où l’activité est anormalement élevée.',
            figure: {
              svg: FDG_UPTAKE,
              alt: 'Schéma : le FDG entre dans la cellule tumorale via les transporteurs GLUT, est phosphorylé par l’hexokinase puis reste piégé sous forme de FDG-6-phosphate.',
              caption: 'Pourquoi le FDG s’accumule dans les cellules tumorales : une fois transformé, il reste « piégé » dans la cellule.',
            },
          },
          {
            title: 'Comment se préparer',
            list: [
              '**Jeûne strict de 4 à 6 heures** avant l’examen (eau plate autorisée).',
              'Évitez tout effort physique intense la veille et le jour même.',
              'Si vous êtes **diabétique**, signalez-le : votre glycémie sera vérifiée et l’heure de vos médicaments adaptée.',
              'Prévenez l’équipe si vous êtes (ou pourriez être) **enceinte** ou si vous **allaitez**.',
              'Habillez-vous chaudement : le froid peut fausser l’examen (graisse « brune »).',
            ],
            infoBox: {
              type: 'warning',
              title: 'Glycémie',
              text: 'Une glycémie trop élevée le jour de l’examen entre en compétition avec le FDG et dégrade la qualité des images. L’examen peut être reporté si elle dépasse le seuil fixé par le service.',
            },
          },
          {
            title: 'Le jour de l’examen',
            steps: [
              { title: 'Accueil et vérifications', text: 'Pesée, mesure de la glycémie, pose d’une perfusion.' },
              { title: 'Injection du FDG', text: 'Une simple injection veineuse, indolore.' },
              { title: 'Repos au calme (~60 min)', text: 'Vous restez allongé sans bouger ni parler pendant que le produit se répartit.' },
              { title: 'Acquisition des images', text: 'Vous passez dans la caméra (15 à 30 min), sans bruit fort, sans piqûre supplémentaire.' },
            ],
            stats: [
              { value: '~2 h', label: 'Durée totale sur place' },
              { value: '15–30 min', label: 'Temps sous la caméra' },
              { value: 'Indolore', label: 'Hors la piqûre' },
            ],
          },
          {
            title: 'Après l’examen',
            text: 'La radioactivité est **faible et disparaît très vite** (en quelques heures). Vous pouvez rentrer chez vous et reprendre une vie normale. **Buvez abondamment** pour éliminer le produit.',
            infoBox: {
              type: 'tip',
              title: 'Précaution simple',
              text: 'Par prudence, évitez le contact prolongé et rapproché avec les femmes enceintes et les jeunes enfants pendant quelques heures après l’examen.',
            },
          },
        ],
      },
      medecin_non_nuc: {
        sections: [
          {
            title: 'Principales indications',
            list: [
              '**Caractérisation d’un nodule pulmonaire** indéterminé (> 8–10 mm) : aide à estimer le risque de malignité.',
              '**Bilan d’extension initial** d’un cancer bronchique non à petites cellules (CBNPC) : ganglions médiastinaux (N) et métastases à distance (M).',
              '**Évaluation de la réponse** thérapeutique (chimiothérapie, immunothérapie, radiothérapie).',
              '**Recherche de récidive** et bilan en cas de réascension biologique/clinique.',
              'Guidage pour cibler la **biopsie** ou le **champ de radiothérapie**.',
            ],
          },
          {
            title: 'Ce qu’il faut savoir avant de prescrire',
            infoBox: {
              type: 'info',
              title: 'Place dans le parcours',
              text: 'La TEP-FDG ne remplace pas la preuve histologique : un foyer hypermétabolique doit, quand c’est possible, être confirmé par biopsie. Elle réduit en revanche fortement le risque de thoracotomies inutiles en démasquant des métastases occultes.',
            },
            list: [
              'Sensibilité élevée pour les adénopathies médiastinales, mais des **faux positifs** existent (sarcoïdose, tuberculose, anthracose, pneumopathie) — fréquents en contexte africain.',
              'Les lésions **< 8 mm** et certaines tumeurs peu avides (carcinome bronchiolo-alvéolaire/lépidique, tumeurs neuroendocrines bien différenciées) peuvent être **faussement négatives**.',
              'Préciser sur la demande : antécédents, traitement en cours, glycémie/diabète, et la **question clinique exacte**.',
            ],
          },
          {
            title: 'TEP-FDG, scanner ou IRM : que choisir ?',
            text: '- **TDM (scanner)** : référence anatomique, mesure des tailles, suivi RECIST — mais ne distingue pas tissu actif et séquelle.\n- **TEP-TDM FDG** : information **métabolique** + anatomique ; supérieure pour le bilan ganglionnaire et métastatique à distance.\n- **IRM** : indiquée surtout pour le **cerveau** (la TEP-FDG est peu performante en cérébral du fait de la captation physiologique du cortex) et certaines extensions locales.',
          },
        ],
        table: {
          headers: ['Situation', 'Examen le plus contributif'],
          rows: [
            ['Nodule indéterminé > 8 mm', 'TEP-TDM FDG'],
            ['Bilan ganglionnaire médiastinal (N)', 'TEP-TDM FDG (± EBUS pour preuve)'],
            ['Métastases à distance (os, surrénales, foie)', 'TEP-TDM FDG'],
            ['Métastases cérébrales', 'IRM cérébrale'],
            ['Suivi de taille sous traitement', 'TDM (RECIST)'],
          ],
        },
      },
      medecin_nuc: {
        sections: [
          {
            title: 'Radiopharmaceutique et dosimétrie',
            text: 'Le **2-désoxy-2-[18F]fluoro-D-glucose** est un émetteur de positons (18F, T½ = **110 min**, énergie β+ max 0,63 MeV). Analogue du glucose, il est capté par les transporteurs **GLUT-1/3** puis phosphorylé par l’hexokinase en FDG-6-phosphate, non métabolisable et donc **piégé** (métabolic trapping).',
            stats: [
              { value: '~3–4 MBq/kg', label: 'Activité injectée typique' },
              { value: '~110 min', label: 'Période du 18F' },
              { value: '~0,019 mSv/MBq', label: 'Dose efficace (≈ 7 mSv pour 370 MBq)' },
            ],
          },
          {
            title: 'Protocole d’acquisition',
            steps: [
              { title: 'Préparation', text: 'Jeûne 4–6 h, glycémie cible < 7 mmol/L (idéalement, < 11 mmol/L acceptable selon protocole), repos, ambiance chaude.' },
              { title: 'Injection et incorporation', text: 'Délai d’incorporation de 60 min (± 10) au repos, vessie vidée avant acquisition.' },
              { title: 'Acquisition TEP-TDM', text: 'Du vertex/base du crâne à mi-cuisses ; TDM de repérage et correction d’atténuation ; 1,5–3 min/pas de lit (selon machine et IMC).' },
              { title: 'Reconstruction', text: 'OSEM itératif + ToF + correction de résolution (PSF) selon harmonisation EARL pour des SUV comparables.' },
            ],
            figure: {
              svg: PET_COINCIDENCE,
              alt: 'Schéma de la détection en coïncidence : émission d’un positon, annihilation produisant deux photons de 511 keV à 180°, détectés simultanément par la couronne.',
              caption: 'Principe physique de la TEP : détection en coïncidence des deux photons d’annihilation de 511 keV.',
            },
          },
          {
            title: 'Interprétation et quantification',
            text: 'L’analyse combine le **caractère visuel** (foyer focal supérieur au bruit de fond) et la **quantification** par le **SUV** (Standardized Uptake Value), le plus souvent **SUVmax**. Le bruit de fond hépatique sert de référence (échelle de type Deauville pour les lymphomes ; en pneumologie, on décrit l’intensité par rapport au médiastin et au foie). Le SUV dépend de la glycémie, du délai, du poids et des paramètres de reconstruction : **harmoniser** est indispensable pour comparer deux examens.',
            infoBox: {
              type: 'info',
              title: 'Réponse au traitement',
              text: 'Les critères **PERCIST 1.0** (variation du SULpeak) structurent l’évaluation métabolique de la réponse et complètent RECIST 1.1, notamment sous immunothérapie où la pseudo-progression doit être reconnue.',
            },
          },
          {
            title: 'Pièges et artefacts',
            list: [
              '**Hyperglycémie** : compétition FDG/glucose → captation tumorale sous-estimée, bruit de fond musculaire/hépatique élevé.',
              '**Graisse brune** (cou, sus-claviculaire, paravertébral) : captation symétrique pouvant masquer/mimer des adénopathies — prévenir par le réchauffement.',
              '**Inflammation / infection** (tuberculose, sarcoïdose, post-radique, post-chirurgical) : faux positifs ganglionnaires fréquents.',
              '**Atélectasie**, foyer infectieux surajouté : captation non tumorale.',
              '**Lésions < 8 mm** ou tumeurs peu avides (lépidique, carcinoïde) : faux négatifs ; corréler à la TDM.',
              'Hyperinsulinisme (injection récente d’insuline) : redistribution musculaire intense du FDG.',
            ],
          },
        ],
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // 2. TEP-TDM au 68Ga-PSMA dans le cancer de la prostate
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'V2_TEP_PSMA_PROSTATE',
    cat: 'prostate',
    catLabel: 'Cancer de la Prostate',
    title: 'TEP-TDM au 68Ga-PSMA dans le cancer de la prostate',
    difficulty: 'avancé',
    tags: ['TEP-TDM', '68Ga-PSMA', 'cancer de la prostate', 'PSMA-RADS', 'récidive biochimique', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
    authors: AUTHORS,
    reviewStatus: 'ai_assisted',
    sources: [
      { title: 'EANM Procedure Guidelines for PSMA-PET (Eur J Nucl Med Mol Imaging, 2023)', url: 'https://doi.org/10.1007/s00259-022-06089-w' },
      { title: 'Eiber M. et al. — PROMISE / miTNM framework (J Nucl Med, 2018)', url: 'https://doi.org/10.2967/jnumed.117.198119' },
      { title: 'Rowe SP. et al. — PSMA-RADS version 1.0', url: 'https://doi.org/10.2967/jnumed.117.205294' },
      { title: 'AFU / EAU — Recommandations cancer de la prostate', url: 'https://uroweb.org/guidelines' },
    ],
    content: {
      lead: 'La **TEP-TDM au 68Ga-PSMA** cible le **PSMA** (antigène membranaire spécifique de la prostate), une protéine surexprimée par la grande majorité des cancers prostatiques. Beaucoup plus sensible que l’imagerie conventionnelle pour détecter de petites lésions, elle a transformé le **bilan d’extension des formes à haut risque** et surtout la localisation des **récidives biochimiques** à faible taux de PSA. Elle constitue le versant diagnostique du couple **théranostique** avec le 177Lu-PSMA.',
      patient: {
        sections: [
          {
            title: 'À quoi sert cet examen ?',
            text: 'Cet examen recherche les cellules de cancer de la prostate dans tout le corps, y compris de **toutes petites lésions** que les autres examens (scanner, IRM, scintigraphie osseuse) ne voient pas toujours. On utilise un traceur qui se fixe spécifiquement sur une protéine présente à la surface des cellules prostatiques.',
            figure: {
              svg: PSMA_BINDING,
              alt: 'Schéma : un ligand couplé au gallium-68 se fixe sur le récepteur PSMA à la surface d’une cellule de cancer prostatique.',
              caption: 'Le traceur se fixe sur le PSMA, très présent à la surface des cellules cancéreuses prostatiques.',
            },
          },
          {
            title: 'Préparation et déroulement',
            list: [
              'Pas de jeûne nécessaire dans la plupart des centres ; **buvez normalement**.',
              'Une injection veineuse, puis environ **60 minutes de repos**.',
              'Acquisition sous la caméra : **15 à 30 minutes**.',
              'On peut vous demander d’uriner avant les images (le produit s’élimine par les urines).',
            ],
            stats: [
              { value: '~1 h 30', label: 'Durée totale' },
              { value: '60 min', label: 'Repos après injection' },
              { value: 'Faible', label: 'Radioactivité, transitoire' },
            ],
          },
          {
            title: 'Après l’examen',
            text: 'La radioactivité décroît **très rapidement** (le gallium-68 disparaît en quelques heures). Buvez abondamment. Par prudence, limitez quelques heures les contacts rapprochés et prolongés avec les femmes enceintes et les jeunes enfants.',
          },
        ],
      },
      medecin_non_nuc: {
        sections: [
          {
            title: 'Indications validées',
            list: [
              '**Bilan d’extension initial** des cancers à risque intermédiaire défavorable et **haut risque** (avant traitement à visée curative).',
              '**Récidive biochimique** après prostatectomie ou radiothérapie : localisation de la rechute, y compris à **PSA bas**.',
              'Sélection et suivi des patients candidats à la **radioligand-thérapie au 177Lu-PSMA**.',
              'Aide à la décision : modification de la stratégie thérapeutique dans une part importante des cas.',
            ],
          },
          {
            title: 'Rendement selon le PSA',
            text: 'La probabilité de détecter le site de récidive **augmente avec le taux de PSA**. La TEP-PSMA reste néanmoins positive chez une fraction notable de patients à PSA < 0,5 ng/mL, là où l’imagerie conventionnelle est quasi muette — d’où son intérêt pour une reprise thérapeutique précoce et ciblée.',
            infoBox: {
              type: 'info',
              title: 'À préciser sur la demande',
              text: 'Contexte (bilan initial vs récidive), PSA le plus récent et cinétique (temps de doublement), traitements reçus (chirurgie, radiothérapie, hormonothérapie en cours), score ISUP/Gleason.',
            },
          },
          {
            title: 'Comparaison avec les autres examens',
            text: '- **IRM multiparamétrique** : reste la référence **locale** (prostate, loge de prostatectomie).\n- **Scintigraphie osseuse / TEP-FDG** : largement dépassées par la TEP-PSMA pour le bilan osseux et ganglionnaire du cancer prostatique (sauf formes dédifférenciées peu/pas PSMA-avides, où le FDG retrouve une place).\n- **TEP-choline** : alternative plus ancienne, moins sensible à PSA bas.',
          },
        ],
        table: {
          headers: ['PSA (récidive)', 'Taux de détection indicatif*'],
          rows: [
            ['< 0,5 ng/mL', '~ 30–45 %'],
            ['0,5 – 1 ng/mL', '~ 55–75 %'],
            ['1 – 2 ng/mL', '~ 75–90 %'],
            ['> 2 ng/mL', '> 90 %'],
          ],
        },
      },
      medecin_nuc: {
        sections: [
          {
            title: 'Radiopharmaceutiques',
            text: 'Les ligands de petite taille (ex. **68Ga-PSMA-11**, ou les variants marqués au **18F** comme le 18F-DCFPyL / 18F-PSMA-1007) se lient au domaine extracellulaire du PSMA puis sont internalisés. Le **68Ga** (T½ 68 min, obtenu sur générateur 68Ge/68Ga) impose une logistique de proximité ; les traceurs **18F** (T½ 110 min, production cyclotron) autorisent une distribution plus large et offrent une meilleure résolution, au prix d’une élimination urinaire variable.',
            stats: [
              { value: '~1,8–2,2 MBq/kg', label: '68Ga-PSMA-11 (activité indicative)' },
              { value: '60 min', label: 'Délai d’incorporation' },
              { value: '68 min', label: 'Période du 68Ga' },
            ],
          },
          {
            title: 'Interprétation : PROMISE / miTNM et PSMA-RADS',
            text: 'L’expression est cotée par rapport à des organes de référence (**foie, parotides, pool sanguin**). Le cadre **PROMISE (miTNM)** standardise la localisation (T/N/M) et le niveau d’expression PSMA, tandis que **PSMA-RADS 1.0** gradue la probabilité de malignité lésion par lésion (de 1, bénin, à 5, malignité quasi certaine). Cette standardisation est cruciale pour la sélection en vue d’une thérapie au 177Lu-PSMA.',
            infoBox: {
              type: 'info',
              title: 'Couple théranostique',
              text: 'Une captation PSMA intense et homogène sur l’ensemble des lésions prédit l’éligibilité à la radioligand-thérapie au 177Lu-PSMA ; un sous-ensemble de lésions PSMA-négatives mais FDG-positives est un facteur péjoratif (intérêt d’un double traçage dans les cas difficiles).',
            },
          },
          {
            title: 'Captations physiologiques et pièges',
            list: [
              '**Physiologiques** : glandes lacrymales et salivaires, foie, rate, reins et voies urinaires, intestin grêle, ganglions cœliaques.',
              '**Faux positifs** : ganglion cœliaque (piège classique simulant une adénopathie), fractures/remaniements osseux bénins, maladie de Paget, certains schwannomes et angiomes vertébraux PSMA-avides.',
              '**Faux négatifs** : tumeurs peu différenciées / neuroendocrines (faible expression PSMA) — discuter une TEP-FDG complémentaire.',
              'Activité urinaire intense (notamment 68Ga-PSMA-11) pouvant masquer une récidive du lit prostatique : acquisitions tardives ou diurétiques selon protocole.',
            ],
          },
        ],
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // 3. Scintigraphie myocardique de perfusion
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'V2_SCINTI_MYOCARDE',
    cat: 'cardiologie',
    catLabel: 'Cardiologie',
    title: 'Scintigraphie myocardique de perfusion (effort / repos)',
    difficulty: 'intermédiaire',
    tags: ['scintigraphie myocardique', 'perfusion', 'Tc-99m', 'MIBI', 'ischémie', 'gated-SPECT', 'cardiologie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
    authors: AUTHORS,
    reviewStatus: 'ai_assisted',
    sources: [
      { title: 'ASNC Imaging Guidelines for SPECT MPI (J Nucl Cardiol)', url: 'https://www.asnc.org' },
      { title: 'EANM/ESC — Procedural guidelines for myocardial perfusion imaging', url: 'https://doi.org/10.1007/s00259-015-3139-x' },
      { title: 'Cerqueira MD. et al. — Modèle à 17 segments (AHA, Circulation 2002)', url: 'https://doi.org/10.1161/hc0402.102975' },
    ],
    content: {
      lead: 'La **scintigraphie myocardique de perfusion** (SPECT/TEMP) évalue la **vascularisation du muscle cardiaque** au repos et lors d’un stress (effort ou pharmacologique). En comparant les deux états, elle distingue une **ischémie réversible** (territoire viable mais mal perfusé à l’effort) d’une **nécrose fixée** (séquelle d’infarctus), et fournit une mesure de la fonction ventriculaire (FEVG) par synchronisation à l’ECG (gated-SPECT).',
      patient: {
        sections: [
          {
            title: 'En quoi consiste l’examen ?',
            text: 'On évalue l’irrigation de votre cœur dans **deux situations** : à l’effort (ou après un médicament qui simule l’effort) et au repos. Un produit faiblement radioactif, injecté dans une veine, se fixe sur le muscle cardiaque proportionnellement à son irrigation. Une caméra prend ensuite des images du cœur.',
            figure: {
              svg: MPI_PROTOCOL,
              alt: 'Chronologie : injection au pic de l’effort puis acquisition après un délai, et séparément injection au repos puis acquisition.',
              caption: 'Deux séries d’images — à l’effort et au repos — sont comparées.',
            },
          },
          {
            title: 'Préparation',
            list: [
              'Évitez le **café, thé, chocolat et boissons à la caféine pendant 12–24 h** (ils interfèrent avec le test pharmacologique).',
              'Certains médicaments cardiaques peuvent être suspendus : **suivez les consignes du service**.',
              'Venez avec des chaussures adaptées si une épreuve d’effort sur vélo/tapis est prévue.',
              'Signalez asthme/BPCO (le choix du médicament de stress en dépend).',
            ],
            infoBox: {
              type: 'warning',
              title: 'Caféine',
              text: 'La caféine bloque l’action des médicaments de stress (dipyridamole, régadénoson) et peut rendre l’examen ininterprétable. L’éviction est impérative.',
            },
          },
          {
            title: 'Le jour J',
            text: 'L’examen comporte deux temps (effort et repos), parfois le même jour, parfois sur deux jours. Chaque acquisition dure **15 à 20 minutes**, bras au-dessus de la tête. L’épreuve d’effort est surveillée par un médecin (ECG, tension).',
          },
        ],
      },
      medecin_non_nuc: {
        sections: [
          {
            title: 'Indications principales',
            list: [
              'Diagnostic de **maladie coronarienne** chez les patients à probabilité pré-test intermédiaire.',
              'Évaluation du **retentissement fonctionnel** (ischémie) d’une sténose connue.',
              'Recherche de **viabilité** myocardique (territoire akinétique : nécrose vs sidération/hibernation).',
              'Stratification du **risque** avant chirurgie non cardiaque, suivi après revascularisation.',
            ],
          },
          {
            title: 'Contre-indications et précautions',
            text: '- **Effort** : impossible si limitation physique majeure → recourir au stress pharmacologique.\n- **Vasodilatateurs (dipyridamole, régadénoson)** : prudence/contre-indication si asthme ou BPCO sévère, bloc AV de haut degré sans pacemaker, hypotension.\n- **Dobutamine** : alternative si vasodilatateurs contre-indiqués.\n- Grossesse : examen à éviter ; allaitement : interruption transitoire selon le radiopharmaceutique.',
            infoBox: {
              type: 'info',
              title: 'Comparaison',
              text: 'Le **coroscanner** explore l’anatomie coronaire (excellent pour exclure une coronaropathie) ; la **scintigraphie** explore le retentissement fonctionnel (ischémie). Les deux sont complémentaires ; le choix dépend de la question posée et de la probabilité pré-test.',
            },
          },
        ],
      },
      medecin_nuc: {
        sections: [
          {
            title: 'Radiopharmaceutiques et protocoles',
            text: 'Les traceurs au **99mTc (MIBI/sestamibi ou tétrofosmine)** sont les plus utilisés (énergie 140 keV, faible dose, gated-SPECT possible). Le **201Tl** (chlorure de thallium), avec sa redistribution, reste utile pour la viabilité. Protocoles **1 jour** (faible puis forte activité) ou **2 jours** (selon corpulence) ; protocoles **stress-first** pour limiter l’irradiation si le stress est normal.',
            stats: [
              { value: '140 keV', label: 'Photon γ du 99mTc' },
              { value: 'Gated-SPECT', label: 'FEVG + cinétique segmentaire' },
              { value: '17 segments', label: 'Modèle d’analyse (AHA)' },
            ],
          },
          {
            title: 'Analyse : modèle à 17 segments et scores',
            text: 'La perfusion est analysée sur le **modèle à 17 segments** (cible « bull’s-eye »), territoire par territoire (IVA/antérieur, Cx/latéral, CD/inférieur). On cote chaque segment (0 = normal à 4 = absence de captation) pour calculer le **SSS** (Summed Stress Score), le **SRS** (Summed Rest Score) et le **SDS** (Summed Difference Score = ischémie). Le **gated-SPECT** ajoute FEVG, volumes et cinétique segmentaire.',
            figure: {
              svg: BULLSEYE_17,
              alt: 'Cible « bull’s-eye » à 17 segments avec territoires coronaires : antérieur (IVA), latéral (Cx), inférieur (CD), septal et apex.',
              caption: 'Représentation polaire à 17 segments : chaque couronne correspond à un niveau (basal, médian, apical, apex).',
            },
          },
          {
            title: 'Artefacts et pièges',
            list: [
              '**Atténuation diaphragmatique** (paroi inférieure, hommes) et **atténuation mammaire** (paroi antérieure, femmes) : faux défauts fixes — corriger par la TDM d’atténuation, le décubitus ventral ou l’analyse gated (cinétique conservée).',
              '**Mouvement du patient** durant l’acquisition : artefacts en « queue de comète ».',
              '**Maladie tritronculaire équilibrée** : ischémie globale parfois sous-estimée (peu de contraste régional) — surveiller la dilatation ischémique transitoire (TID) et la chute de FEVG post-stress.',
              'Captation extracardiaque (foie, intestin) de voisinage sur la paroi inférieure.',
            ],
          },
        ],
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // 4. Le générateur 99Mo / 99mTc
  // ════════════════════════════════════════════════════════════════════════
  {
    id: 'V2_GENERATEUR_TC99M',
    cat: 'instrumentation',
    catLabel: 'Instrumentation',
    title: 'Le générateur 99Mo/99mTc : cœur de la médecine nucléaire',
    difficulty: 'avancé',
    tags: ['générateur', '99Mo', '99mTc', 'radiopharmacie', 'équilibre séculaire', 'contrôle qualité'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
    authors: AUTHORS,
    reviewStatus: 'ai_assisted',
    sources: [
      { title: 'Pharmacopée Européenne — Générateur radionucléidique (99Mo/99mTc)', url: 'https://www.edqm.eu' },
      { title: 'EANM — Guidelines on current good radiopharmacy practice (cGRPP)', url: 'https://www.eanm.org' },
      { title: 'AIEA — Technetium-99m Radiopharmaceuticals: Production and Quality Control', url: 'https://www.iaea.org' },
    ],
    content: {
      lead: 'Le **99mTc** (technétium-99m) est de loin le radionucléide le plus employé en imagerie scintigraphique : énergie γ idéale (**140 keV**), période courte (**6 heures**), chimie versatile permettant de marquer de nombreuses molécules. Comme sa période est trop brève pour être stocké, il est produit **sur place**, au quotidien, à partir d’un **générateur 99Mo/99mTc** — un dispositif qui exploite la désintégration d’un radionucléide « parent » (99Mo) en son « fils » (99mTc).',
      patient: {
        sections: [
          {
            title: 'D’où vient le produit qu’on m’injecte ?',
            text: 'Le produit radioactif utilisé pour la plupart des scintigraphies (le **technétium-99m**) est fabriqué **directement à l’hôpital**, chaque matin, à partir d’un petit dispositif appelé « générateur ». C’est un peu comme une « vache à lait » que l’on « trait » pour recueillir le produit du jour. La radioactivité est faible et choisie pour disparaître très vite.',
            figure: {
              svg: TC_GENERATOR,
              alt: 'Schéma d’un générateur 99Mo/99mTc : colonne d’alumine retenant le 99Mo, élution par du sérum physiologique, recueil du 99mTc dans un flacon sous vide, le tout dans un blindage de plomb.',
              caption: 'Le générateur : on fait passer du sérum physiologique sur une colonne pour recueillir le technétium-99m du jour.',
            },
          },
          {
            title: 'Est-ce sûr ?',
            text: 'Oui. Les quantités sont infimes, contrôlées par des tests de qualité avant toute utilisation, et la radioactivité s’élimine en quelques heures. La fabrication est encadrée par une réglementation stricte.',
          },
        ],
      },
      medecin_non_nuc: {
        sections: [
          {
            title: 'Pourquoi cela vous concerne',
            text: 'La disponibilité en 99mTc conditionne la réalisation de la majorité des scintigraphies (osseuse, rénale, cardiaque, thyroïdienne, pulmonaire…). Une rupture d’approvisionnement en 99Mo — produit par un petit nombre de réacteurs dans le monde — peut **décaler des examens**. En contexte africain, la logistique (transport, délais, demi-vie courte du 99Mo) est un enjeu organisationnel majeur.',
            infoBox: {
              type: 'info',
              title: 'Conséquence pratique',
              text: 'Les rendez-vous de scintigraphie sont souvent regroupés le matin : c’est lié à la décroissance rapide du 99mTc élué dans la journée.',
            },
          },
        ],
      },
      medecin_nuc: {
        sections: [
          {
            title: 'Principe physique : équilibre séculaire',
            text: 'Le **99Mo** (T½ = **66 h**) se désintègre par β⁻ en **99mTc** (T½ = **6,0 h**), état métastable qui se désexcite en émettant un photon γ de **140 keV** (idéal pour les gamma-caméras) avant de devenir 99Tc (quasi stable). Comme la période du parent est nettement supérieure à celle du fils, on atteint un **équilibre séculaire** : l’activité en 99mTc se reconstitue après chaque élution, avec un **maximum vers ~23 h**. En pratique, on élue typiquement une fois par jour.',
            figure: {
              svg: DECAY_SCHEME,
              alt: 'Schéma de désintégration : 99Mo (T½ 66 h) se désintègre par β⁻ vers 99mTc (T½ 6 h), qui émet un γ de 140 keV vers 99Tc (T½ très long).',
              caption: 'Filiation 99Mo → 99mTc → 99Tc : le photon de 140 keV est exploité pour l’imagerie.',
            },
          },
          {
            title: 'Construction et élution',
            steps: [
              { title: 'Colonne d’alumine', text: 'Le 99Mo (sous forme de molybdate) est fixé sur une colonne d’oxyde d’aluminium, dans un blindage de plomb.' },
              { title: 'Élution', text: 'On fait passer du NaCl 0,9 % stérile : le pertechnétate 99mTcO4⁻, faiblement retenu, est entraîné ; le 99Mo reste fixé.' },
              { title: 'Recueil sous vide', text: 'Un flacon sous vide aspire l’éluat de pertechnétate de sodium, prêt à marquer les trousses froides.' },
              { title: 'Reconstitution', text: 'L’activité reconstitue son maximum en ~24 h ; le premier éluat du matin est le plus riche.' },
            ],
          },
          {
            title: 'Contrôle qualité de l’éluat',
            text: 'Avant tout marquage, l’éluat doit passer des **contrôles obligatoires** :',
            list: [
              '**Pureté radionucléidique** — « breakthrough » du 99Mo : limite stricte (Ph. Eur. : ≤ 0,1 % soit ≤ 0,1 kBq de 99Mo par MBq de 99mTc au moment de l’administration).',
              '**Pureté chimique** — aluminium relargué de la colonne (test colorimétrique, limite réglementaire).',
              '**Pureté radiochimique** — proportion de 99mTcO4⁻ (chromatographie) après marquage des trousses.',
              '**Stérilité et apyrogénicité**, **pH**, aspect limpide et incolore.',
            ],
            infoBox: {
              type: 'warning',
              title: 'Breakthrough du 99Mo',
              text: 'Un excès de 99Mo dans l’éluat (émetteur de haute énergie, 740/780 keV, et période longue) augmente inutilement la dose au patient et dégrade l’image. Le test est impératif, en pratique sur la première élution.',
            },
          },
        ],
      },
    },
  },
];
