'use client';

import React, { useState, useEffect } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';
import { Article, Category, MENU_STRUCTURE } from '@/lib/data';
import { Save, Trash2, Plus } from 'lucide-react';

export function AdminPanel() {
  const { articles, showHome } = useAtlas();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({});
  const [contentJson, setContentJson] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.email === 'agbotonfrejuste@gmail.com' && currentUser.emailVerified) {
          setIsAdmin(true);
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              showHome();
            }
          } catch (error) {
            console.error("Error checking admin status", error);
            setIsAdmin(false);
            showHome();
          }
        }
      } else {
        setIsAdmin(false);
        showHome();
      }
    });
    return () => unsubscribe();
  }, [showHome]);

  if (isAdmin === null) {
    return <div className="flex-1 flex items-center justify-center bg-bg"><div className="animate-pulse text-text2">Vérification des droits...</div></div>;
  }

  if (isAdmin === false) {
    return null;
  }

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData(article);
    setContentJson(JSON.stringify(article.content, null, 2));
  };

  const handleCreateNew = () => {
    setEditingId('new');
    setFormData({
      id: '',
      title: '',
      cat: 'endocrinologie',
      catLabel: 'Endocrinologie',
      excerpt: '',
      tags: [],
      difficulty: 'fondamental',
    });
    setContentJson(JSON.stringify({
      pro: { lead: "", sections: [] },
      patient: { lead: "", sections: [] }
    }, null, 2));
  };

  const handleSave = async () => {
    if (!formData.id || !formData.title) {
      alert('ID and Title are required');
      return;
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(contentJson);
    } catch (e) {
      alert('Invalid JSON in content field');
      return;
    }

    setIsSaving(true);
    try {
      const articleData = {
        ...formData,
        content: JSON.stringify(parsedContent),
        updatedAt: serverTimestamp(),
      };
      
      if (editingId === 'new') {
        (articleData as any).createdAt = serverTimestamp();
      }

      await setDoc(doc(db, 'articles', formData.id), articleData);
      alert('Article saved successfully!');
      if (editingId === 'new') {
        setEditingId(formData.id);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `articles/${formData.id}`);
      alert('Failed to save article. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await deleteDoc(doc(db, 'articles', id));
      if (editingId === id) setEditingId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `articles/${id}`);
      alert('Failed to delete article.');
    }
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-bg animate-in fade-in duration-300">
      {/* List Sidebar */}
      <div className="w-[300px] border-r border-border-main flex flex-col bg-bg2 shrink-0">
        <div className="p-4 border-b border-border-main flex justify-between items-center bg-bg3">
          <h2 className="font-serif text-lg">Admin Panel</h2>
          <button onClick={handleCreateNew} className="p-1.5 bg-teal text-bg rounded hover:bg-teal2 transition-colors" title="Create New Article">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {articles.map(a => (
            <div 
              key={a.id} 
              className={`p-3 rounded-md cursor-pointer border transition-colors ${editingId === a.id ? 'border-teal bg-teal/5' : 'border-border-main bg-bg hover:border-teal/30'}`} 
              onClick={() => handleEdit(a)}
            >
              <div className="font-mono text-[10px] text-teal mb-1">{a.id}</div>
              <div className="text-[13px] font-medium truncate text-text-main">{a.title}</div>
            </div>
          ))}
          {articles.length === 0 && (
            <div className="text-center text-text3 text-xs mt-4">No articles found.</div>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {!editingId ? (
          <div className="h-full flex flex-col items-center justify-center text-text3">
            <div className="text-4xl mb-4 opacity-40">⚙️</div>
            <div className="font-serif text-xl text-text2 mb-2">Admin Dashboard</div>
            <p className="text-sm">Select an article from the list to edit, or create a new one.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-main">
              <h2 className="text-2xl font-serif text-text-main">
                {editingId === 'new' ? 'Create New Article' : 'Edit Article'}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-border-main rounded-md text-sm hover:bg-bg3 transition-colors text-text2">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-teal text-bg rounded-md text-sm flex items-center gap-2 hover:bg-teal2 transition-colors disabled:opacity-50 font-medium">
                  <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Article ID</label>
                  <input 
                    type="text" 
                    value={formData.id || ''} 
                    onChange={e => setFormData({...formData, id: e.target.value})} 
                    disabled={editingId !== 'new'} 
                    placeholder="e.g., MN005"
                    className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal disabled:opacity-50 transition-colors text-text-main" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Category</label>
                  <select 
                    value={formData.cat || 'endocrinologie'} 
                    onChange={e => {
                      const selectedCat = e.target.value as Category;
                      // Find the label for the selected category
                      let label = selectedCat as string;
                      MENU_STRUCTURE.forEach(section => {
                        const item = section.items.find(i => i.id === selectedCat);
                        if (item) label = item.label;
                      });
                      setFormData({...formData, cat: selectedCat, catLabel: label});
                    }} 
                    className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
                  >
                    {MENU_STRUCTURE.map(section => (
                      <optgroup key={section.title} label={section.title}>
                        {section.items.map(item => (
                          <option key={item.id} value={item.id}>{item.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Category Label (Auto-filled)</label>
                  <input 
                    type="text" 
                    value={formData.catLabel || ''} 
                    disabled
                    className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none opacity-70 text-text-main" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Difficulty</label>
                  <select 
                    value={formData.difficulty || 'fondamental'} 
                    onChange={e => setFormData({...formData, difficulty: e.target.value as any})} 
                    className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
                  >
                    <option value="fondamental">Fondamental</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  value={formData.title || ''} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  placeholder="Article Title"
                  className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main" 
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags?.join(', ') || ''} 
                  onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} 
                  placeholder="e.g., scintigraphie, iode-131, hyperthyroïdie"
                  className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main" 
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Excerpt</label>
                <textarea 
                  value={formData.excerpt || ''} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                  rows={3} 
                  placeholder="Short description for the article card..."
                  className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal resize-y transition-colors text-text-main" 
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider flex justify-between">
                  <span>Content (JSON format)</span>
                  <span className="text-teal lowercase normal-case tracking-normal">Must be valid JSON</span>
                </label>
                <textarea 
                  value={contentJson} 
                  onChange={e => setContentJson(e.target.value)} 
                  rows={20} 
                  className="w-full bg-[#1e1e1e] text-[#d4d4d4] border border-border-main rounded-md p-4 text-[13px] font-mono outline-none focus:border-teal resize-y" 
                  spellCheck={false}
                />
              </div>

              {editingId !== 'new' && (
                <div className="pt-6 border-t border-border-main mt-8 flex justify-end">
                  <button 
                    onClick={() => handleDelete(formData.id!)} 
                    className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-sm flex items-center gap-2 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Article
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
