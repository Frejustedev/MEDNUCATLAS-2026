'use client';

import React, { useState } from 'react';
import { ArticleContent, ContentMode, Section } from '@/lib/data';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

interface ArticleEditorProps {
  content: ArticleContent;
  onChange: (content: ArticleContent) => void;
}

export function ArticleEditor({ content, onChange }: ArticleEditorProps) {
  const [activeTab, setActiveTab] = useState<'medecin_nuc' | 'medecin_non_nuc' | 'patient'>('medecin_nuc');

  const handleModeChange = (mode: 'medecin_nuc' | 'medecin_non_nuc' | 'patient', newModeData: ContentMode) => {
    onChange({
      ...content,
      [mode]: newModeData
    });
  };

  const currentModeData = content[activeTab] || { sections: [] };

  const updateLead = (lead: string) => {
    onChange({ ...content, lead });
  };

  const addSection = () => {
    handleModeChange(activeTab, {
      ...currentModeData,
      sections: [...currentModeData.sections, { title: 'Nouvelle section', text: '' }]
    });
  };

  const updateSection = (index: number, section: Section) => {
    const newSections = [...currentModeData.sections];
    newSections[index] = section;
    handleModeChange(activeTab, { ...currentModeData, sections: newSections });
  };

  const removeSection = (index: number) => {
    const newSections = currentModeData.sections.filter((_, i) => i !== index);
    handleModeChange(activeTab, { ...currentModeData, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentModeData.sections.length - 1) return;
    
    const newSections = [...currentModeData.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    
    handleModeChange(activeTab, { ...currentModeData, sections: newSections });
  };

  return (
    <div className="border border-border-main rounded-lg overflow-hidden bg-bg2">
      <div className="flex border-b border-border-main bg-bg3 flex-wrap">
        <button
          onClick={() => setActiveTab('medecin_nuc')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'medecin_nuc' ? 'bg-teal/10 text-teal border-b-2 border-teal' : 'text-text3 hover:text-text-main'}`}
        >
          Médecin Nucléaire
        </button>
        <button
          onClick={() => setActiveTab('medecin_non_nuc')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'medecin_non_nuc' ? 'bg-teal2/10 text-teal2 border-b-2 border-teal2' : 'text-text3 hover:text-text-main'}`}
        >
          Médecin (Non MN)
        </button>
        <button
          onClick={() => setActiveTab('patient')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'patient' ? 'bg-gold/10 text-gold border-b-2 border-gold' : 'text-text3 hover:text-text-main'}`}
        >
          Version Patient
        </button>
      </div>

      <div className="p-5 space-y-6">
        <div>
          <label className="block text-xs font-mono text-text3 mb-2 uppercase tracking-wider">
            Introduction (Lead) - Supporte Markdown
          </label>
          <textarea
            value={content.lead || ''}
            onChange={(e) => updateLead(e.target.value)}
            rows={4}
            className="w-full bg-bg3 border border-border-main rounded-md p-3 text-sm outline-none focus:border-teal resize-y transition-colors text-text-main font-mono"
            placeholder="Introduction de l'article (commune aux deux versions)..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-xs font-mono text-text3 uppercase tracking-wider">
              Sections
            </label>
            <button
              onClick={addSection}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-bg3 border border-border-main rounded text-xs font-medium text-text-main hover:border-teal transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Ajouter une section
            </button>
          </div>

          <div className="space-y-4">
            {currentModeData.sections.map((section, index) => (
              <div key={index} className="border border-border-main rounded-md bg-bg p-4 relative group">
                <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 text-text3 hover:text-teal disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveSection(index, 'down')} disabled={index === currentModeData.sections.length - 1} className="p-1 text-text3 hover:text-teal disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeSection(index)} className="p-1 text-text3 hover:text-red-400 ml-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 pr-16">
                  <div>
                    <label className="block text-xs text-text3 mb-1">Titre de la section</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, { ...section, title: e.target.value })}
                      className="w-full bg-bg3 border border-border-main rounded p-2 text-sm outline-none focus:border-teal text-text-main font-serif"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-text3 mb-1">Contenu (Texte / Markdown)</label>
                    <textarea
                      value={section.text || ''}
                      onChange={(e) => updateSection(index, { ...section, text: e.target.value })}
                      rows={5}
                      className="w-full bg-bg3 border border-border-main rounded p-2 text-sm outline-none focus:border-teal text-text-main font-mono resize-y"
                    />
                  </div>

                  {/* Optional: Add InfoBox toggle */}
                  <div className="pt-2 border-t border-border-main/50">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-text3">Boîte d&apos;information (Optionnelle)</label>
                      {!section.infoBox && (
                        <button 
                          onClick={() => updateSection(index, { ...section, infoBox: { type: 'info', title: 'Info', text: '' } })}
                          className="text-xs text-teal hover:underline"
                        >
                          + Ajouter
                        </button>
                      )}
                    </div>
                    
                    {section.infoBox && (
                      <div className="mt-3 p-3 bg-bg3 border border-border-main rounded space-y-3">
                        <div className="flex justify-between items-center">
                          <select
                            value={section.infoBox.type}
                            onChange={(e) => updateSection(index, { ...section, infoBox: { ...section.infoBox!, type: e.target.value as any } })}
                            className="bg-bg border border-border-main rounded p-1 text-xs text-text-main outline-none"
                          >
                            <option value="info">Info</option>
                            <option value="warning">Attention</option>
                            <option value="tip">Astuce</option>
                          </select>
                          <button 
                            onClick={() => {
                              const newSection = { ...section };
                              delete newSection.infoBox;
                              updateSection(index, newSection);
                            }}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Supprimer
                          </button>
                        </div>
                        <input
                          type="text"
                          value={section.infoBox.title}
                          onChange={(e) => updateSection(index, { ...section, infoBox: { ...section.infoBox!, title: e.target.value } })}
                          placeholder="Titre de la boîte"
                          className="w-full bg-bg border border-border-main rounded p-2 text-sm outline-none focus:border-teal text-text-main"
                        />
                        <textarea
                          value={section.infoBox.text}
                          onChange={(e) => updateSection(index, { ...section, infoBox: { ...section.infoBox!, text: e.target.value } })}
                          placeholder="Contenu de la boîte..."
                          rows={2}
                          className="w-full bg-bg border border-border-main rounded p-2 text-sm outline-none focus:border-teal text-text-main resize-y"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {currentModeData.sections.length === 0 && (
              <div className="text-center p-6 border border-dashed border-border-main rounded-md text-text3 text-sm">
                Aucune section pour le moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
