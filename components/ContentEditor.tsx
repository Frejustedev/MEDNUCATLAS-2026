import React, { useState } from 'react';
import { ContentMode, Section } from '@/lib/data';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

interface ContentEditorProps {
  content: {
    lead: string;
    medecin_nuc: ContentMode;
    medecin_non_nuc: ContentMode;
    patient: ContentMode;
  };
  onChange: (content: any) => void;
}

export function ContentEditor({ content, onChange }: ContentEditorProps) {
  const [activeTab, setActiveTab] = useState<'medecin_nuc' | 'medecin_non_nuc' | 'patient'>('medecin_nuc');

  const handleLeadChange = (val: string) => {
    onChange({ ...content, lead: val });
  };

  const handleModeChange = (mode: 'medecin_nuc' | 'medecin_non_nuc' | 'patient', newModeData: ContentMode) => {
    onChange({ ...content, [mode]: newModeData });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Introduction générale (Lead)</label>
        <textarea
          value={content.lead || ''}
          onChange={e => handleLeadChange(e.target.value)}
          rows={3}
          className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal resize-y text-text-main"
          placeholder="Introduction commune aux deux modes (supporte Markdown)..."
        />
      </div>

      <div className="border border-border-main rounded-xl overflow-hidden bg-bg2">
        <div className="flex border-b border-border-main">
          <button
            onClick={() => setActiveTab('medecin_nuc')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'medecin_nuc' ? 'bg-teal/10 text-teal border-b-2 border-teal' : 'text-text3 hover:bg-bg3 hover:text-text-main'}`}
          >
            Médecin Nucléaire
          </button>
          <button
            onClick={() => setActiveTab('medecin_non_nuc')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'medecin_non_nuc' ? 'bg-teal2/10 text-teal2 border-b-2 border-teal2' : 'text-text3 hover:bg-bg3 hover:text-text-main'}`}
          >
            Médecin (Non MN)
          </button>
          <button
            onClick={() => setActiveTab('patient')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'patient' ? 'bg-gold/10 text-gold border-b-2 border-gold' : 'text-text3 hover:bg-bg3 hover:text-text-main'}`}
          >
            Mode Patient
          </button>
        </div>
        <div className="p-4">
          <ModeEditor
            mode={activeTab}
            data={content[activeTab]}
            onChange={(newData) => handleModeChange(activeTab, newData)}
          />
        </div>
      </div>
    </div>
  );
}

function ModeEditor({ mode, data, onChange }: { mode: 'medecin_nuc' | 'medecin_non_nuc' | 'patient', data: ContentMode, onChange: (data: ContentMode) => void }) {
  const sections = data?.sections || [];

  const addSection = () => {
    onChange({ ...data, sections: [...sections, { title: 'Nouvelle section', text: '' }] });
  };

  const updateSection = (index: number, newSection: Section) => {
    const newSections = [...sections];
    newSections[index] = newSection;
    onChange({ ...data, sections: newSections });
  };

  const removeSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    onChange({ ...data, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + (direction === 'up' ? -1 : 1)];
    newSections[index + (direction === 'up' ? -1 : 1)] = temp;
    onChange({ ...data, sections: newSections });
  };

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <SectionEditor
          key={idx}
          section={section}
          index={idx}
          isFirst={idx === 0}
          isLast={idx === sections.length - 1}
          onChange={(s: Section) => updateSection(idx, s)}
          onRemove={() => removeSection(idx)}
          onMove={(dir: 'up' | 'down') => moveSection(idx, dir)}
        />
      ))}
      <button
        onClick={addSection}
        className="w-full py-3 border-2 border-dashed border-border-main rounded-lg text-text3 hover:text-teal hover:border-teal/50 hover:bg-teal/5 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Plus className="w-4 h-4" /> Ajouter une section
      </button>

      {/* Table Editor */}
      <div className="pt-6 border-t border-border-main">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif text-text-main">Tableau de données</h3>
          <button
            onClick={() => {
              if (data.table) {
                const { table, ...rest } = data;
                onChange(rest);
              } else {
                onChange({ ...data, table: { headers: ['Colonne 1', 'Colonne 2'], rows: [['Valeur 1', 'Valeur 2']] } });
              }
            }}
            className="text-sm text-teal hover:underline"
          >
            {data.table ? 'Supprimer le tableau' : '+ Ajouter un tableau'}
          </button>
        </div>

        {data.table && (
          <div className="bg-bg3 p-4 rounded-lg border border-border-main overflow-x-auto">
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => {
                  const newTable = { ...data.table! };
                  newTable.headers.push(`Colonne ${newTable.headers.length + 1}`);
                  newTable.rows = newTable.rows.map((r: string[]) => [...r, '']);
                  onChange({ ...data, table: newTable });
                }}
                className="px-3 py-1.5 bg-bg border border-border-main rounded text-xs text-text-main hover:border-teal transition-colors"
              >
                + Ajouter une colonne
              </button>
              <button
                onClick={() => {
                  const newTable = { ...data.table! };
                  newTable.rows.push(new Array(newTable.headers.length).fill(''));
                  onChange({ ...data, table: newTable });
                }}
                className="px-3 py-1.5 bg-bg border border-border-main rounded text-xs text-text-main hover:border-teal transition-colors"
              >
                + Ajouter une ligne
              </button>
            </div>

            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  {data.table.headers.map((h: string, i: number) => (
                    <th key={i} className="p-2 border border-border-main bg-bg2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={h}
                          onChange={e => {
                            const newTable = { ...data.table! };
                            newTable.headers[i] = e.target.value;
                            onChange({ ...data, table: newTable });
                          }}
                          className="w-full bg-transparent border-none outline-none focus:ring-1 focus:ring-teal rounded px-1"
                        />
                        {data.table!.headers.length > 1 && (
                          <button
                            onClick={() => {
                              const newTable = { ...data.table! };
                              newTable.headers.splice(i, 1);
                              newTable.rows = newTable.rows.map((r: string[]) => {
                                const newRow = [...r];
                                newRow.splice(i, 1);
                                return newRow;
                              });
                              onChange({ ...data, table: newTable });
                            }}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="w-10 border border-border-main bg-bg2"></th>
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, colIndex: number) => (
                      <td key={colIndex} className="p-2 border border-border-main bg-bg">
                        <input
                          type="text"
                          value={cell}
                          onChange={e => {
                            const newTable = { ...data.table! };
                            newTable.rows[rowIndex][colIndex] = e.target.value;
                            onChange({ ...data, table: newTable });
                          }}
                          className="w-full bg-transparent border-none outline-none focus:ring-1 focus:ring-teal rounded px-1"
                        />
                      </td>
                    ))}
                    <td className="p-2 border border-border-main bg-bg text-center">
                      {data.table!.rows.length > 1 && (
                        <button
                          onClick={() => {
                            const newTable = { ...data.table! };
                            newTable.rows.splice(rowIndex, 1);
                            onChange({ ...data, table: newTable });
                          }}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionEditor({ section, index, isFirst, isLast, onChange, onRemove, onMove }: any) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border border-border-main rounded-lg bg-bg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-bg3 border-b border-border-main">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <button onClick={() => onMove('up')} disabled={isFirst} className="text-text3 hover:text-teal disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
            <button onClick={() => onMove('down')} disabled={isLast} className="text-text3 hover:text-teal disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
          </div>
          <span className="font-medium text-sm text-text-main">Section {index + 1}: {section.title || 'Sans titre'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 text-text3 hover:text-text-main rounded bg-bg">
            {expanded ? 'Masquer' : 'Afficher'}
          </button>
          <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded bg-bg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Titre de la section</label>
            <input
              type="text"
              value={section.title || ''}
              onChange={e => onChange({ ...section, title: e.target.value })}
              className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal text-text-main"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Texte (Markdown)</label>
            <textarea
              value={section.text || ''}
              onChange={e => onChange({ ...section, text: e.target.value })}
              rows={4}
              className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal resize-y text-text-main font-mono"
            />
          </div>

          {/* InfoBox toggle */}
          <div className="pt-2 border-t border-border-main">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-text3 uppercase tracking-wider">Boîte d&apos;information (InfoBox)</label>
              <button
                onClick={() => {
                  if (section.infoBox) {
                    const { infoBox, ...rest } = section;
                    onChange(rest);
                  } else {
                    onChange({ ...section, infoBox: { type: 'info', title: '', text: '' } });
                  }
                }}
                className="text-xs text-teal hover:underline"
              >
                {section.infoBox ? 'Supprimer' : '+ Ajouter'}
              </button>
            </div>
            {section.infoBox && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-bg3 p-3 rounded-md">
                <div>
                  <select
                    value={section.infoBox.type}
                    onChange={e => onChange({ ...section, infoBox: { ...section.infoBox, type: e.target.value } })}
                    className="w-full bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main mb-2"
                  >
                    <option value="info">Info (Bleu)</option>
                    <option value="warning">Attention (Orange)</option>
                    <option value="tip">Astuce (Vert)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Titre"
                    value={section.infoBox.title}
                    onChange={e => onChange({ ...section, infoBox: { ...section.infoBox, title: e.target.value } })}
                    className="w-full bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                  />
                </div>
                <textarea
                  placeholder="Texte (Markdown)"
                  value={section.infoBox.text}
                  onChange={e => onChange({ ...section, infoBox: { ...section.infoBox, text: e.target.value } })}
                  rows={3}
                  className="w-full bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal resize-y text-text-main font-mono"
                />
              </div>
            )}
          </div>

          {/* Stats toggle */}
          <div className="pt-2 border-t border-border-main">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-text3 uppercase tracking-wider">Statistiques (Stats)</label>
              <button
                onClick={() => {
                  if (section.stats) {
                    const { stats, ...rest } = section;
                    onChange(rest);
                  } else {
                    onChange({ ...section, stats: [{ value: '', label: '' }] });
                  }
                }}
                className="text-xs text-teal hover:underline"
              >
                {section.stats ? 'Supprimer' : '+ Ajouter'}
              </button>
            </div>
            {section.stats && (
              <div className="space-y-2 bg-bg3 p-3 rounded-md">
                {section.stats.map((stat: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Valeur (ex: 95%)"
                      value={stat.value}
                      onChange={e => {
                        const newStats = [...section.stats];
                        newStats[i].value = e.target.value;
                        onChange({ ...section, stats: newStats });
                      }}
                      className="w-1/3 bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                    />
                    <input
                      type="text"
                      placeholder="Label (ex: Taux de réussite)"
                      value={stat.label}
                      onChange={e => {
                        const newStats = [...section.stats];
                        newStats[i].label = e.target.value;
                        onChange({ ...section, stats: newStats });
                      }}
                      className="flex-1 bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                    />
                    <button
                      onClick={() => {
                        const newStats = [...section.stats];
                        newStats.splice(i, 1);
                        onChange({ ...section, stats: newStats });
                      }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onChange({ ...section, stats: [...section.stats, { value: '', label: '' }] })}
                  className="text-xs text-teal hover:underline mt-2 inline-block"
                >
                  + Ajouter une stat
                </button>
              </div>
            )}
          </div>

          {/* Steps toggle */}
          <div className="pt-2 border-t border-border-main">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-text3 uppercase tracking-wider">Étapes (Steps)</label>
              <button
                onClick={() => {
                  if (section.steps) {
                    const { steps, ...rest } = section;
                    onChange(rest);
                  } else {
                    onChange({ ...section, steps: [{ title: '', text: '' }] });
                  }
                }}
                className="text-xs text-teal hover:underline"
              >
                {section.steps ? 'Supprimer' : '+ Ajouter'}
              </button>
            </div>
            {section.steps && (
              <div className="space-y-3 bg-bg3 p-3 rounded-md">
                {section.steps.map((step: any, i: number) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Titre de l'étape"
                        value={step.title}
                        onChange={e => {
                          const newSteps = [...section.steps];
                          newSteps[i].title = e.target.value;
                          onChange({ ...section, steps: newSteps });
                        }}
                        className="w-full bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                      />
                      <textarea
                        placeholder="Description (Markdown)"
                        value={step.text}
                        onChange={e => {
                          const newSteps = [...section.steps];
                          newSteps[i].text = e.target.value;
                          onChange({ ...section, steps: newSteps });
                        }}
                        rows={2}
                        className="w-full bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal resize-y text-text-main font-mono"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newSteps = [...section.steps];
                        newSteps.splice(i, 1);
                        onChange({ ...section, steps: newSteps });
                      }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onChange({ ...section, steps: [...section.steps, { title: '', text: '' }] })}
                  className="text-xs text-teal hover:underline mt-2 inline-block"
                >
                  + Ajouter une étape
                </button>
              </div>
            )}
          </div>

          {/* List toggle */}
          <div className="pt-2 border-t border-border-main">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-text3 uppercase tracking-wider">Liste à puces (List)</label>
              <button
                onClick={() => {
                  if (section.list) {
                    const { list, ...rest } = section;
                    onChange(rest);
                  } else {
                    onChange({ ...section, list: [''] });
                  }
                }}
                className="text-xs text-teal hover:underline"
              >
                {section.list ? 'Supprimer' : '+ Ajouter'}
              </button>
            </div>
            {section.list && (
              <div className="space-y-2 bg-bg3 p-3 rounded-md">
                {section.list.map((item: string, i: number) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Élément de liste (Markdown)"
                      value={item}
                      onChange={e => {
                        const newList = [...section.list];
                        newList[i] = e.target.value;
                        onChange({ ...section, list: newList });
                      }}
                      className="flex-1 bg-bg border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main font-mono"
                    />
                    <button
                      onClick={() => {
                        const newList = [...section.list];
                        newList.splice(i, 1);
                        onChange({ ...section, list: newList });
                      }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onChange({ ...section, list: [...section.list, ''] })}
                  className="text-xs text-teal hover:underline mt-2 inline-block"
                >
                  + Ajouter un élément
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
