'use client';

import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, User, Building2, Filter } from 'lucide-react';

import Image from 'next/image';

// Mock data for the directory
const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Fréjuste Agboton',
    specialty: 'Médecine Nucléaire',
    subSpecialty: 'Théranostique, Oncologie',
    hospital: 'CHU de Paris',
    city: 'Paris',
    region: 'Île-de-France',
    phone: '+33 1 23 45 67 89',
    email: 'f.agboton@chu-paris.fr',
    image: 'https://picsum.photos/seed/doc1/100/100'
  },
  {
    id: 2,
    name: 'Dr. Sarah Martin',
    specialty: 'Médecine Nucléaire',
    subSpecialty: 'Cardiologie Nucléaire',
    hospital: 'Hôpital Cardiologique',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    phone: '+33 4 56 78 90 12',
    email: 's.martin@hopital-cardio.fr',
    image: 'https://picsum.photos/seed/doc2/100/100'
  },
  {
    id: 3,
    name: 'Pr. Jean Dubois',
    specialty: 'Médecine Nucléaire',
    subSpecialty: 'Neurologie, Pédiatrie',
    hospital: 'CHU de Bordeaux',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    phone: '+33 5 67 89 01 23',
    email: 'j.dubois@chu-bordeaux.fr',
    image: 'https://picsum.photos/seed/doc3/100/100'
  },
  {
    id: 4,
    name: 'Dr. Marie Laurent',
    specialty: 'Médecine Nucléaire',
    subSpecialty: 'Endocrinologie, Thyroïde',
    hospital: 'Clinique Saint-Jean',
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    phone: '+33 4 91 23 45 67',
    email: 'm.laurent@clinique-st-jean.fr',
    image: 'https://picsum.photos/seed/doc4/100/100'
  },
  {
    id: 5,
    name: 'Dr. Thomas Bernard',
    specialty: 'Médecine Nucléaire',
    subSpecialty: 'TEP-Scan, Oncologie',
    hospital: 'Centre Anti-Cancer',
    city: 'Lille',
    region: 'Hauts-de-France',
    phone: '+33 3 20 12 34 56',
    email: 't.bernard@centre-cancer-lille.fr',
    image: 'https://picsum.photos/seed/doc5/100/100'
  }
];

const REGIONS = Array.from(new Set(DOCTORS.map(d => d.region))).sort();
const SUB_SPECIALTIES = Array.from(new Set(DOCTORS.flatMap(d => d.subSpecialty.split(', ')))).sort();

export default function AnnuairePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion ? doc.region === selectedRegion : true;
    const matchesSpecialty = selectedSpecialty ? doc.subSpecialty.includes(selectedSpecialty) : true;

    return matchesSearch && matchesRegion && matchesSpecialty;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-text-main mb-2">Annuaire des Médecins Nucléaires</h1>
        <p className="text-text2">Trouvez un spécialiste ou un centre de médecine nucléaire près de chez vous.</p>
      </div>

      {/* Filters */}
      <div className="bg-bg2 border border-border-main rounded-xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text3" />
            <input 
              type="text" 
              placeholder="Nom, ville, hôpital..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-bg3 border border-border-main rounded-lg text-sm outline-none focus:border-teal transition-colors text-text-main"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text3" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-bg3 border border-border-main rounded-lg text-sm outline-none focus:border-teal transition-colors text-text-main appearance-none"
            >
              <option value="">Toutes les régions</option>
              {REGIONS.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text3" />
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-bg3 border border-border-main rounded-lg text-sm outline-none focus:border-teal transition-colors text-text-main appearance-none"
            >
              <option value="">Toutes les sur-spécialités</option>
              {SUB_SPECIALTIES.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-bg2 border border-border-main rounded-xl p-6 flex flex-col sm:flex-row gap-6 hover:border-teal/30 transition-colors shadow-sm">
            <div className="shrink-0 relative w-20 h-20">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                fill
                className="rounded-full object-cover border-2 border-bg3"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-serif text-text-main">{doctor.name}</h3>
                  <p className="text-sm text-teal font-medium">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.subSpecialty.split(', ').map(spec => (
                  <span key={spec} className="px-2 py-1 bg-bg3 text-text2 text-[10px] font-mono rounded-md border border-border-main">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-sm text-text2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-text3 shrink-0" />
                  <span>{doctor.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-text3 shrink-0" />
                  <span>{doctor.city}, {doctor.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-text3 shrink-0" />
                  <a href={`tel:${doctor.phone}`} className="hover:text-teal transition-colors">{doctor.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-text3 shrink-0" />
                  <a href={`mailto:${doctor.email}`} className="hover:text-teal transition-colors">{doctor.email}</a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredDoctors.length === 0 && (
          <div className="col-span-full py-12 text-center text-text3 bg-bg2 border border-border-main rounded-xl">
            <User className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Aucun médecin ne correspond à vos critères de recherche.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('');
                setSelectedSpecialty('');
              }}
              className="mt-4 text-teal hover:underline text-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
