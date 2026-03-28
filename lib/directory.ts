export type EntryType = 'center' | 'doctor';

export interface DirectoryEntry {
  id: string;
  type: EntryType;
  name: string;
  country: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  equipment?: string[];
  verified: boolean;
  imageUrl?: string;
}

export const AFRICAN_COUNTRIES = [
  "Afrique du Sud", "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi",
  "Cameroun", "Cap-Vert", "République Centrafricaine", "Tchad", "Comores", "Congo",
  "République Démocratique du Congo", "Djibouti", "Égypte", "Guinée Équatoriale",
  "Érythrée", "Eswatini", "Éthiopie", "Gabon", "Gambie", "Ghana", "Guinée", "Guinée-Bissau",
  "Côte d'Ivoire", "Kenya", "Lesotho", "Libéria", "Libye", "Madagascar", "Malawi", "Mali",
  "Mauritanie", "Maurice", "Maroc", "Mozambique", "Namibie", "Niger", "Nigeria", "Rwanda",
  "Sao Tomé-et-Principe", "Sénégal", "Seychelles", "Sierra Leone", "Somalie", "Soudan",
  "Soudan du Sud", "Tanzanie", "Togo", "Tunisie", "Ouganda", "Zambie", "Zimbabwe"
].sort();

export const EQUIPMENT_LIST = [
  "TEP-TDM (PET-CT)",
  "TEP-IRM (PET-MRI)",
  "TEMP-TDM (SPECT-CT)",
  "Gamma Caméra",
  "Cyclotron",
  "Chambre de thérapie (Irathérapie)",
  "Laboratoire de Radiopharmacie",
  "Ostéodensitométrie (DEXA)"
];

export const INITIAL_DIRECTORY: DirectoryEntry[] = [
  {
    id: "c_hoggy_sn",
    type: "center",
    name: "Service de Médecine Nucléaire - Hôpital Général Idrissa Pouye (HOGGY)",
    country: "Sénégal",
    city: "Dakar",
    address: "Grand Yoff, Dakar",
    phone: "+221 33 869 40 00",
    description: "Pionnier de la médecine nucléaire en Afrique de l'Ouest francophone. Propose des services de scintigraphie et de thérapie à l'iode 131.",
    equipment: ["Gamma Caméra", "TEMP-TDM (SPECT-CT)", "Chambre de thérapie (Irathérapie)", "Laboratoire de Radiopharmacie"],
    verified: true
  },
  {
    id: "c_ibnsina_ma",
    type: "center",
    name: "Service de Médecine Nucléaire - CHU Ibn Sina",
    country: "Maroc",
    city: "Rabat",
    address: "Quartier Souissi, Rabat",
    website: "http://www.chisrabat.ma",
    description: "Centre de référence au Maroc offrant une large gamme d'examens diagnostiques (TEP, TEMP) et de traitements radiométaboliques.",
    equipment: ["TEP-TDM (PET-CT)", "TEMP-TDM (SPECT-CT)", "Gamma Caméra", "Chambre de thérapie (Irathérapie)"],
    verified: true
  },
  {
    id: "c_cnrao_ci",
    type: "center",
    name: "Centre National d'Oncologie Médicale et de Radiothérapie Alassane Ouattara (CNRAO)",
    country: "Côte d'Ivoire",
    city: "Abidjan",
    address: "Cocody CHU, Abidjan",
    phone: "+225 27 22 51 15 00",
    website: "https://cnrao.ci",
    description: "Établissement public de santé de pointe dans la lutte contre le cancer, équipé d'un service de médecine nucléaire moderne.",
    equipment: ["TEP-TDM (PET-CT)", "Gamma Caméra"],
    verified: true
  },
  {
    id: "c_stevebiko_za",
    type: "center",
    name: "Department of Nuclear Medicine - Steve Biko Academic Hospital",
    country: "Afrique du Sud",
    city: "Pretoria",
    address: "Voortrekker Rd & Malan St, Prinshof 349-Jr",
    description: "L'un des centres les plus avancés d'Afrique, reconnu mondialement pour la théranostique (notamment le traitement par Ac-225 PSMA pour le cancer de la prostate).",
    equipment: ["TEP-TDM (PET-CT)", "TEP-IRM (PET-MRI)", "TEMP-TDM (SPECT-CT)", "Cyclotron", "Chambre de thérapie (Irathérapie)"],
    verified: true
  },
  {
    id: "c_salahazaiez_tn",
    type: "center",
    name: "Service de Médecine Nucléaire - Institut Salah Azaiez",
    country: "Tunisie",
    city: "Tunis",
    address: "Boulevard du 9 Avril 1938, Bab Saadoun",
    description: "Centre national de référence en oncologie en Tunisie, disposant d'une expertise reconnue en imagerie fonctionnelle et radiothérapie interne vectorisée.",
    equipment: ["TEP-TDM (PET-CT)", "Gamma Caméra", "Chambre de thérapie (Irathérapie)"],
    verified: true
  },
  {
    id: "c_cpmc_dz",
    type: "center",
    name: "Centre Pierre et Marie Curie (CPMC)",
    country: "Algérie",
    city: "Alger",
    address: "Place du 1er Mai, Alger",
    description: "Pôle d'excellence en oncologie et médecine nucléaire en Algérie, offrant des diagnostics TEP et des traitements isotopiques.",
    equipment: ["TEP-TDM (PET-CT)", "Gamma Caméra", "Chambre de thérapie (Irathérapie)"],
    verified: true
  },
  {
    id: "c_agakhan_ke",
    type: "center",
    name: "Aga Khan University Hospital - PET/CT Centre",
    country: "Kenya",
    city: "Nairobi",
    address: "3rd Parklands Avenue, Nairobi",
    website: "https://hospitals.aku.edu/nairobi",
    description: "Premier centre en Afrique de l'Est et Centrale à introduire la technologie TEP-TDM et un cyclotron sur site.",
    equipment: ["TEP-TDM (PET-CT)", "Cyclotron", "Laboratoire de Radiopharmacie"],
    verified: true
  },
  {
    id: "d_sathekge_za",
    type: "doctor",
    name: "Prof. Mike Sathekge",
    country: "Afrique du Sud",
    city: "Pretoria",
    description: "Chef du département de médecine nucléaire au Steve Biko Academic Hospital. Expert mondial en théranostique, particulièrement dans le cancer de la prostate et la tuberculose.",
    equipment: ["TEP-TDM (PET-CT)", "TEP-IRM (PET-MRI)"],
    verified: true
  },
  {
    id: "d_boye_sn",
    type: "doctor",
    name: "Prof. Ousseynou Boye",
    country: "Sénégal",
    city: "Dakar",
    description: "Professeur Titulaire de Biophysique et de Médecine Nucléaire à l'Université Cheikh Anta Diop de Dakar. Figure de proue du développement de la discipline en Afrique francophone.",
    equipment: ["TEMP-TDM (SPECT-CT)"],
    verified: true
  },
  {
    id: "d_benrais_tn",
    type: "doctor",
    name: "Prof. Noura Ben Raïs",
    country: "Tunisie",
    city: "Tunis",
    description: "Spécialiste en médecine nucléaire, experte en oncologie nucléaire et pathologie thyroïdienne à l'Institut Salah Azaiez.",
    equipment: ["TEP-TDM (PET-CT)", "Chambre de thérapie (Irathérapie)"],
    verified: true
  }
];
