'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, MapPin, Building, User, Phone, Mail, Globe,
  CheckCircle, Plus, X, Stethoscope, Loader2,
} from 'lucide-react';
import {
  DirectoryEntry,
  EntryType,
  AFRICAN_COUNTRIES,
  EQUIPMENT_LIST,
  INITIAL_DIRECTORY,
} from '@/lib/directory';
import { apiFetch, ApiError } from '@/lib/api-client';
import { directoryEntrySchema } from '@/lib/schemas';

const EMPTY_FORM: Partial<DirectoryEntry> = {
  type: 'center',
  country: AFRICAN_COUNTRIES[0],
  equipment: [],
};

export default function AnnuairePage() {
  const [entries, setEntries] = useState<DirectoryEntry[]>(INITIAL_DIRECTORY);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | EntryType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<DirectoryEntry>>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch<{ entries: (DirectoryEntry & { id: string })[] }>(
          '/api/directory',
          { method: 'GET' },
          { authenticated: false }
        );
        if (cancelled) return;
        if (res.entries && res.entries.length > 0) {
          // Fusion avec le seed initial — préfère l'API si IDs partagés.
          const merged = new Map<string, DirectoryEntry>();
          INITIAL_DIRECTORY.forEach((e) => merged.set(e.id, e));
          res.entries.forEach((e) => merged.set(e.id, { ...e, verified: true }));
          setEntries(Array.from(merged.values()));
        }
      } catch {
        // Pas grave : on garde le seed initial.
      } finally {
        if (!cancelled) setIsLoadingEntries(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.description && entry.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCountry = selectedCountry === 'all' || entry.country === selectedCountry;
      const matchesType = selectedType === 'all' || entry.type === selectedType;
      return matchesSearch && matchesCountry && matchesType;
    });
  }, [entries, searchTerm, selectedCountry, selectedType]);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    const parsed = directoryEntrySchema.safeParse(formData);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setSubmitError(`${first.path.join('.')} — ${first.message}`);
      return;
    }

    setIsSubmitting(true);
    try {
      await apiFetch('/api/directory', {
        method: 'POST',
        body: JSON.stringify(parsed.data),
      }, { authenticated: false });
      setSubmitSuccess(true);
      setFormData(EMPTY_FORM);
      // Fermeture différée pour laisser voir le message
      setTimeout(() => {
        setIsAddModalOpen(false);
        setSubmitSuccess(false);
      }, 2500);
    } catch (error) {
      setSubmitError(error instanceof ApiError ? error.message : "Erreur d'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEquipment = (eq: string) => {
    const current = formData.equipment || [];
    if (current.includes(eq)) {
      setFormData({ ...formData, equipment: current.filter((e) => e !== eq) });
    } else {
      setFormData({ ...formData, equipment: [...current, eq] });
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-20">
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
            Trouvez les centres d&apos;imagerie et les spécialistes en médecine nucléaire à travers l&apos;Afrique.
          </motion.p>
        </div>

        <div className="bg-bg2 rounded-2xl shadow-sm border border-border-main p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute inset-y-0 left-0 my-auto ml-3 h-5 w-5 text-text3" aria-hidden="true" />
              <label htmlFor="dir-search" className="sr-only">Rechercher</label>
              <input
                id="dir-search"
                type="text"
                placeholder="Rechercher un centre, un médecin, une ville…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border-main rounded-xl leading-5 bg-bg-main text-text-main placeholder-text3 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal sm:text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <MapPin className="absolute inset-y-0 left-0 my-auto ml-3 h-4 w-4 text-text3" aria-hidden="true" />
                <label htmlFor="dir-country" className="sr-only">Pays</label>
                <select
                  id="dir-country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-border-main rounded-xl bg-bg-main text-text-main focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal sm:text-sm appearance-none"
                >
                  <option value="all">Tous les pays</option>
                  {AFRICAN_COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="flex bg-bg3 p-1 rounded-xl" role="tablist" aria-label="Filtre type">
                <button
                  role="tab"
                  aria-selected={selectedType === 'all'}
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${selectedType === 'all' ? 'bg-bg2 text-text-main shadow-sm' : 'text-text2 hover:text-text-main'}`}
                >
                  Tous
                </button>
                <button
                  role="tab"
                  aria-selected={selectedType === 'center'}
                  onClick={() => setSelectedType('center')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${selectedType === 'center' ? 'bg-bg2 text-text-main shadow-sm' : 'text-text2 hover:text-text-main'}`}
                >
                  <Building className="w-4 h-4" aria-hidden="true" /> Centres
                </button>
                <button
                  role="tab"
                  aria-selected={selectedType === 'doctor'}
                  onClick={() => setSelectedType('doctor')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${selectedType === 'doctor' ? 'bg-bg2 text-text-main shadow-sm' : 'text-text2 hover:text-text-main'}`}
                >
                  <Stethoscope className="w-4 h-4" aria-hidden="true" /> Médecins
                </button>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-teal text-white rounded-xl hover:bg-teal-dark transition-colors font-medium text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>

        {isLoadingEntries ? (
          <div className="text-center py-20 bg-bg2 rounded-2xl border border-border-main">
            <Loader2 className="w-8 h-8 text-text3 mx-auto mb-4 animate-spin" aria-hidden="true" />
            <p className="text-text2">Chargement de l&apos;annuaire…</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-20 bg-bg2 rounded-2xl border border-border-main">
            <Search className="w-12 h-12 text-text3 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-text-main">Aucun résultat trouvé</h3>
            <p className="text-text2 mt-1">Essaie de modifier tes critères.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredEntries.map((entry, index) => (
                <motion.article
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
                      <div
                        className={`p-3 rounded-xl ${entry.type === 'center' ? 'bg-teal/10 text-teal' : 'bg-gold/10 text-gold'}`}
                        aria-hidden="true"
                      >
                        {entry.type === 'center' ? <Building className="w-6 h-6" /> : <User className="w-6 h-6" />}
                      </div>
                      {entry.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal">
                          <CheckCircle className="w-3 h-3" aria-hidden="true" /> Vérifié
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-text-main mb-2 line-clamp-2">{entry.name}</h3>

                    <div className="flex items-center text-text2 mb-4 text-sm">
                      <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">{entry.city}, {entry.country}</span>
                    </div>

                    {entry.description && (
                      <p className="text-text2 text-sm mb-4 line-clamp-3">{entry.description}</p>
                    )}

                    {entry.equipment && entry.equipment.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {entry.equipment.slice(0, 3).map((eq) => (
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
                        <Phone className="w-4 h-4 mr-2 text-text3" aria-hidden="true" />
                        <a href={`tel:${entry.phone.replace(/\s/g, '')}`} className="hover:text-teal">
                          {entry.phone}
                        </a>
                      </div>
                    )}
                    {entry.email && (
                      <div className="flex items-center text-text2">
                        <Mail className="w-4 h-4 mr-2 text-text3" aria-hidden="true" />
                        <a href={`mailto:${entry.email}`} className="hover:text-teal truncate">{entry.email}</a>
                      </div>
                    )}
                    {entry.website && (
                      <div className="flex items-center text-text2">
                        <Globe className="w-4 h-4 mr-2 text-text3" aria-hidden="true" />
                        <a href={entry.website} target="_blank" rel="noopener noreferrer" className="hover:text-teal truncate">
                          {entry.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {isAddModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dir-add-title"
            >
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
                  <h2 id="dir-add-title" className="text-xl font-bold text-text-main">Ajouter à l&apos;annuaire</h2>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    aria-label="Fermer"
                    className="p-2 text-text3 hover:text-text-main hover:bg-bg3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {submitSuccess ? (
                  <div className="p-12 text-center">
                    <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-text-main mb-2">Demande envoyée</h3>
                    <p className="text-text2">
                      Votre demande sera relue par notre équipe avant publication.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAddEntry} className="p-6 space-y-6" noValidate>
                    <fieldset>
                      <legend className="block text-sm font-medium text-text-main mb-2">Type d&apos;inscription</legend>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: 'center' })}
                          aria-pressed={formData.type === 'center'}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${formData.type === 'center' ? 'border-teal bg-teal/10 text-teal' : 'border-border-main hover:border-text3 text-text2'}`}
                        >
                          <Building className="w-6 h-6" aria-hidden="true" />
                          <span className="font-medium">Centre médical</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: 'doctor' })}
                          aria-pressed={formData.type === 'doctor'}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${formData.type === 'doctor' ? 'border-teal bg-teal/10 text-teal' : 'border-border-main hover:border-text3 text-text2'}`}
                        >
                          <User className="w-6 h-6" aria-hidden="true" />
                          <span className="font-medium">Médecin / Spécialiste</span>
                        </button>
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="entry-name" className="block text-sm font-medium text-text-main mb-1">
                          Nom {formData.type === 'center' ? 'du centre' : 'du médecin'} *
                        </label>
                        <input
                          id="entry-name"
                          required
                          minLength={2}
                          maxLength={300}
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder={formData.type === 'center' ? 'Ex: CHU Ibn Sina' : 'Ex: Dr. Diallo'}
                        />
                      </div>

                      <div>
                        <label htmlFor="entry-country" className="block text-sm font-medium text-text-main mb-1">Pays *</label>
                        <select
                          id="entry-country"
                          required
                          value={formData.country || ''}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        >
                          {AFRICAN_COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="entry-city" className="block text-sm font-medium text-text-main mb-1">Ville *</label>
                        <input
                          id="entry-city"
                          required
                          minLength={2}
                          maxLength={150}
                          type="text"
                          value={formData.city || ''}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="entry-address" className="block text-sm font-medium text-text-main mb-1">Adresse complète</label>
                        <input
                          id="entry-address"
                          maxLength={500}
                          type="text"
                          value={formData.address || ''}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="entry-phone" className="block text-sm font-medium text-text-main mb-1">Téléphone</label>
                        <input
                          id="entry-phone"
                          type="tel"
                          maxLength={50}
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="entry-email" className="block text-sm font-medium text-text-main mb-1">Email</label>
                        <input
                          id="entry-email"
                          type="email"
                          maxLength={200}
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="entry-website" className="block text-sm font-medium text-text-main mb-1">Site web</label>
                        <input
                          id="entry-website"
                          type="url"
                          maxLength={1000}
                          value={formData.website || ''}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                          placeholder="https://"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="entry-desc" className="block text-sm font-medium text-text-main mb-1">Description / Présentation</label>
                        <textarea
                          id="entry-desc"
                          rows={3}
                          maxLength={2000}
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-2 border border-border-main bg-bg-main text-text-main rounded-xl focus:ring-2 focus:ring-teal focus:border-teal outline-none"
                        />
                      </div>

                      <fieldset className="md:col-span-2">
                        <legend className="block text-sm font-medium text-text-main mb-3">Équipements &amp; spécialités</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {EQUIPMENT_LIST.map((eq) => (
                            <label
                              key={eq}
                              className="flex items-center space-x-3 p-3 border border-border-main rounded-xl hover:bg-bg3 cursor-pointer transition-colors"
                            >
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
                      </fieldset>
                    </div>

                    {submitError && (
                      <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                        {submitError}
                      </div>
                    )}

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
                        disabled={isSubmitting}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-xl hover:bg-teal-dark transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-2"
                      >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                        Soumettre la demande
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
