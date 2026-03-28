'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Building, User, Phone, Mail, Globe, 
  CheckCircle, Plus, X, Filter, Stethoscope, Activity
} from 'lucide-react';
import { 
  DirectoryEntry, 
  EntryType, 
  AFRICAN_COUNTRIES, 
  EQUIPMENT_LIST, 
  INITIAL_DIRECTORY 
} from '@/lib/directory';

export default function AnnuairePage() {
  const [entries, setEntries] = useState<DirectoryEntry[]>(INITIAL_DIRECTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | EntryType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form State
  const [formData, setFormData] = useState<Partial<DirectoryEntry>>({
    type: 'center',
    country: AFRICAN_COUNTRIES[0],
    equipment: []
  });

  // Filter Logic
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.description && entry.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCountry = selectedCountry === 'all' || entry.country === selectedCountry;
      const matchesType = selectedType === 'all' || entry.type === selectedType;

      return matchesSearch && matchesCountry && matchesType;
    });
  }, [entries, searchTerm, selectedCountry, selectedType]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: DirectoryEntry = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      verified: false, // New entries are unverified by default
    } as DirectoryEntry;

    setEntries([newEntry, ...entries]);
    setIsAddModalOpen(false);
    setFormData({ type: 'center', country: AFRICAN_COUNTRIES[0], equipment: [] });
    alert("Votre demande d'ajout a été soumise avec succès et est en attente de validation.");
  };

  const toggleEquipment = (eq: string) => {
    const current = formData.equipment || [];
    if (current.includes(eq)) {
      setFormData({ ...formData, equipment: current.filter(e => e !== eq) });
    } else {
      setFormData({ ...formData, equipment: [...current, eq] });
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-text-main sm:text-5xl"
          >
            Annuaire de la Médecine Nucléaire
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-text2 max-w-3xl mx-auto"
          >
            Trouvez les centres d'imagerie et les spécialistes en médecine nucléaire à travers l'Afrique.
          </motion.p>
        </div>

        {/* Filters and Actions Bar */}
        <div className="bg-bg2 rounded-2xl shadow-sm border border-border-main p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text3" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un centre, un médecin, une ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border-main rounded-xl leading-5 bg-bg-main text-text-main placeholder-text3 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal sm:text-sm transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-text3" />
                </div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-border-main rounded-xl bg-bg-main text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal sm:text-sm appearance-none"
                >
                  <option value="all">Tous les pays</option>
                  {AFRICAN_COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="flex bg-bg3 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${selectedType === 'all' ? 'bg-bg2 text-text-main shadow-sm' : 'text-text2 hover:text-text-main'}`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setSelectedType('center')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${selectedType === 'center' ? 'bg-bg2 text-text-main shadow-sm' : 'text-text2 hover:text-text-main'}`}
                >
                  <Building className="w-4 h-4" /> Centres
                </button>
                <button
                  onClick={() => setSelectedType('doctor')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${selectedType === 'doctor' ? 'bg-bg2 text-text-main shadow-sm' : 'text-text2 hover:text-text-main'}`}
                >
                  <User className="w-4 h-4" /> Médecins
                </button>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-teal text-white rounded-xl hover:bg-teal-dark transition-colors font-medium text-sm shadow-sm"
              >
                <Plus className="w-4 h-4" />
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-20 bg-bg2 rounded-2xl border border-border-main">
            <Search className="w-12 h-12 text-text3 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-main">Aucun résultat trouvé</h3>
            <p className="text-text2 mt-1">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="bg-bg2 rounded-2xl border border-border-main overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${entry.type === 'center' ? 'bg-teal/10 text-teal' : 'bg-gold/10 text-gold'}`}>
                        {entry.type === 'center' ? <Building className="w-6 h-6" /> : <User className="w-6 h-6" />}
                      </div>
                      {entry.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal">
                          <CheckCircle className="w-3 h-3" /> Vérifié
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2">{entry.name}</h3>
                    
                    <div className="flex items-center text-text2 mb-4 text-sm">
                      <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      <span className="truncate">{entry.city}, {entry.country}</span>
                    </div>

                    {entry.description && (
                      <p className="text-text2 text-sm mb-4 line-clamp-3">
                        {entry.description}
                      </p>
                    )}

                    {entry.equipment && entry.equipment.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {entry.equipment.slice(0, 3).map(eq => (
                            <span key={eq} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-bg3 text-text2">
                              {eq}
                            </span>
                          ))}
                          {entry.equipment.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-bg3 text-text2">
                              +{entry.equipment.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-bg3 px-6 py-4 border-t border-border-main flex flex-col gap-2 text-sm">
                    {entry.phone && (
                      <div className="flex items-center text-text2">
                        <Phone className="w-4 h-4 mr-2 text-text3" />
                        {entry.phone}
                      </div>
                    )}
                    {entry.email && (
                      <div className="flex items-center text-text2">
                        <Mail className="w-4 h-4 mr-2 text-text3" />
                        <a href={`mailto:${entry.email}`} className="hover:text-teal truncate">{entry.email}</a>
                      </div>
                    )}
                    {entry.website && (
                      <div className="flex items-center text-text2">
                        <Globe className="w-4 h-4 mr-2 text-text3" />
                        <a href={entry.website} target="_blank" rel="noopener noreferrer" className="hover:text-teal truncate">
                          {entry.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Add Entry Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-bg2 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-bg2 border-b border-border-main px-6 py-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-text-main">Ajouter à l'annuaire</h2>
                  <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-2 text-text3 hover:text-text-main hover:bg-bg3 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddEntry} className="p-6 space-y-6">
                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-2">Type d'inscription</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'center' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${formData.type === 'center' ? 'border-teal bg-teal/10 text-teal' : 'border-border-main hover:border-text3 text-text2'}`}
                      >
                        <Building className="w-6 h-6" />
                        <span className="font-medium">Centre Médical</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'doctor' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${formData.type === 'doctor' ? 'border-teal bg-teal/10 text-teal' : 'border-border-main hover:border-text3 text-text2'}`}
                      >
                        <User className="w-6 h-6" />
                        <span className="font-medium">Médecin / Spécialiste</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-main mb-1">
                        Nom {formData.type === 'center' ? 'du centre' : 'du médecin'} *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name || ''}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder={formData.type === 'center' ? 'Ex: CHU Ibn Sina' : 'Ex: Dr. Diallo'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-main mb-1">Pays *</label>
                      <select
                        required
                        value={formData.country || ''}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      >
                        {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-main mb-1">Ville *</label>
                      <input
                        required
                        type="text"
                        value={formData.city || ''}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-main mb-1">Adresse complète</label>
                      <input
                        type="text"
                        value={formData.address || ''}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-main mb-1">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-main mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-main mb-1">Site Web</label>
                      <input
                        type="url"
                        value={formData.website || ''}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        placeholder="https://"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-main mb-1">Description / Présentation</label>
                      <textarea
                        rows={3}
                        value={formData.description || ''}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-main mb-3">Équipements & Spécialités</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {EQUIPMENT_LIST.map(eq => (
                          <label key={eq} className="flex items-center space-x-3 p-3 border border-border-main rounded-xl hover:bg-bg3 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={(formData.equipment || []).includes(eq)}
                              onChange={() => toggleEquipment(eq)}
                              className="w-4 h-4 text-teal rounded border-border-main focus:ring-teal bg-bg-main"
                            />
                            <span className="text-sm text-text-main">{eq}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border-main flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-5 py-2.5 text-sm font-medium text-text-main bg-bg2 border border-border-main rounded-xl hover:bg-bg3 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-xl hover:bg-teal-dark transition-colors shadow-sm"
                    >
                      Soumettre la demande
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
