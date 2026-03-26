'use client';

import React, { useState, useEffect } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDoc, collection, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';
import { Article, Category, MENU_STRUCTURE } from '@/lib/data';
import { Save, Trash2, Plus, Users, FileText, LayoutDashboard, Search, AlertCircle } from 'lucide-react';
import { ContentEditor } from './ContentEditor';

export function AdminPanel() {
  const { articles, showHome } = useAtlas();
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'users'>('overview');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({});
  const [contentData, setContentData] = useState<any>({
    lead: "",
    medecin_nuc: { sections: [] },
    medecin_non_nuc: { sections: [] },
    patient: { sections: [] }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchArticle, setSearchArticle] = useState('');
  
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{text: string, onConfirm: () => void} | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

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

  useEffect(() => {
    if (isAdmin && activeTab === 'users') {
      fetchUsers();
    }
  }, [isAdmin, activeTab]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList: any[] = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  if (isAdmin === null) {
    return <div className="flex-1 flex items-center justify-center bg-bg"><div className="animate-pulse text-text2">Vérification des droits...</div></div>;
  }

  if (isAdmin === false) {
    return null;
  }

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData(article);
    setContentData(article.content || {
      lead: "",
      medecin_nuc: { sections: [] },
      medecin_non_nuc: { sections: [] },
      patient: { sections: [] }
    });
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
    setContentData({
      lead: "",
      medecin_nuc: { sections: [] },
      medecin_non_nuc: { sections: [] },
      patient: { sections: [] }
    });
  };

  const handleSave = async () => {
    if (!formData.id || !formData.title) {
      showMessage('error', 'L\'ID et le Titre sont requis.');
      return;
    }

    setIsSaving(true);
    try {
      const articleData = {
        ...formData,
        content: JSON.stringify(contentData),
        updatedAt: serverTimestamp(),
      };
      
      if (editingId === 'new') {
        (articleData as any).createdAt = serverTimestamp();
        (articleData as any).authorId = dbUser?.uid || '';
      }

      await setDoc(doc(db, 'articles', formData.id), articleData);
      showMessage('success', 'Article sauvegardé avec succès !');
      if (editingId === 'new') {
        setEditingId(formData.id);
      }
    } catch (error) {
      showMessage('error', 'Échec de la sauvegarde. Vérifiez la console.');
      handleFirestoreError(error, OperationType.WRITE, `articles/${formData.id}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      text: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'articles', id));
          if (editingId === id) setEditingId(null);
          showMessage('success', 'Article supprimé.');
        } catch (error) {
          showMessage('error', 'Échec de la suppression.');
          handleFirestoreError(error, OperationType.DELETE, `articles/${id}`);
        }
      }
    });
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchArticle.toLowerCase()) || 
    a.id.toLowerCase().includes(searchArticle.toLowerCase())
  );

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-bg animate-in fade-in duration-300 relative">
      {/* Toast Message */}
      {message && (
        <div className={`absolute top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 ${
          message.type === 'success' ? 'bg-teal text-white' : 'bg-red-500 text-white'
        }`}>
          {message.text}
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-bg2 border border-border-main rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-serif text-text-main mb-4">Confirmation</h3>
            <p className="text-text2 text-sm mb-6">{confirmDialog.text}</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 text-sm font-medium text-text2 hover:text-text-main transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog(null);
                }}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Admin */}
      <div className="w-[240px] border-r border-border-main flex flex-col bg-bg2 shrink-0">
        <div className="p-6 border-b border-border-main">
          <h2 className="font-serif text-xl text-text-main">Administration</h2>
          <p className="text-xs text-text3 mt-1">Gérez le contenu et les accès</p>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          <button 
            onClick={() => { setActiveTab('overview'); setEditingId(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-teal/10 text-teal' : 'text-text2 hover:bg-bg3'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Vue d&apos;ensemble
          </button>
          <button 
            onClick={() => { setActiveTab('articles'); setEditingId(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'articles' ? 'bg-teal/10 text-teal' : 'text-text2 hover:bg-bg3'}`}
          >
            <FileText className="w-4 h-4" /> Articles
          </button>
          <button 
            onClick={() => { setActiveTab('users'); setEditingId(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-teal/10 text-teal' : 'text-text2 hover:bg-bg3'}`}
          >
            <Users className="w-4 h-4" /> Utilisateurs
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-8">
            <h1 className="text-3xl font-serif text-text-main mb-8">Tableau de bord</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-bg2 border border-border-main rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal/10 text-teal rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-text3 font-medium">Total Articles</div>
                    <div className="text-3xl font-serif text-text-main">{articles.length}</div>
                  </div>
                </div>
              </div>
              <div className="bg-bg2 border border-border-main rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-text3 font-medium">Utilisateurs Inscrits</div>
                    <div className="text-3xl font-serif text-text-main">{users.length > 0 ? users.length : '...'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-bg2 border border-border-main rounded-xl p-6 mb-8">
              <h3 className="text-lg font-serif text-text-main mb-4">Outils d&apos;administration</h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setConfirmDialog({
                      text: "Voulez-vous vraiment migrer les données initiales vers Firestore ? Cela écrasera les articles existants avec le même ID.",
                      onConfirm: async () => {
                        setIsSaving(true);
                        try {
                          const { ENTRIES } = await import('@/lib/data');
                          let count = 0;
                          for (const entry of ENTRIES) {
                            const articleData = {
                              ...entry,
                              content: JSON.stringify(entry.content),
                              updatedAt: serverTimestamp(),
                              createdAt: serverTimestamp()
                            };
                            await setDoc(doc(db, 'articles', entry.id), articleData);
                            count++;
                          }
                          showMessage('success', `Migration terminée avec succès ! ${count} articles ont été importés.`);
                        } catch (error) {
                          console.error("Erreur lors de la migration:", error);
                          showMessage('error', "Une erreur est survenue lors de la migration. Consultez la console.");
                        } finally {
                          setIsSaving(false);
                        }
                      }
                    });
                  }}
                  disabled={isSaving}
                  className="px-4 py-2 bg-teal/20 text-teal rounded-lg font-medium hover:bg-teal/30 transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Migration...' : 'Migrer les données initiales vers Firestore'}
                </button>
              </div>
            </div>
            
            <div className="bg-bg2 border border-border-main rounded-xl p-6">
              <h3 className="text-lg font-serif text-text-main mb-4">Derniers articles ajoutés</h3>
              <div className="space-y-3">
                {articles.slice().reverse().slice(0, 5).map(a => (
                  <div key={a.id} className="flex items-center justify-between p-3 bg-bg rounded-lg border border-border-main">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-mono text-teal bg-teal/10 px-2 py-1 rounded">{a.id}</div>
                      <div className="text-sm font-medium text-text-main">{a.title}</div>
                    </div>
                    <div className="text-xs text-text3">{a.catLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="flex-1 overflow-y-auto p-8">
            <h1 className="text-3xl font-serif text-text-main mb-8">Gestion des utilisateurs</h1>
            <div className="bg-bg2 border border-border-main rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-bg3 text-text3 font-medium">
                  <tr>
                    <th className="px-6 py-4">Utilisateur</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Rôle</th>
                    <th className="px-6 py-4">Type de Profil</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-main">
                  {loadingUsers ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-text3">Chargement...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-text3">Aucun utilisateur trouvé.</td></tr>
                  ) : (
                    users.map(u => (
                      <tr key={u.id} className="hover:bg-bg3/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-text-main">{u.displayName || 'Sans nom'}</td>
                        <td className="px-6 py-4 text-text2">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-teal/10 text-teal'}`}>
                            {u.role || 'patient'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text2">{u.profileType || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <select 
                            value={u.role || 'patient'}
                            onChange={async (e) => {
                              const newRole = e.target.value;
                              try {
                                await updateDoc(doc(db, 'users', u.id), { role: newRole, profileType: newRole });
                                setUsers(users.map(user => user.id === u.id ? { ...user, role: newRole, profileType: newRole } : user));
                                showMessage('success', 'Rôle mis à jour.');
                              } catch (error) {
                                showMessage('error', 'Erreur lors de la mise à jour du rôle.');
                                handleFirestoreError(error, OperationType.UPDATE, `users/${u.id}`);
                              }
                            }}
                            className="bg-bg3 border border-border-main rounded px-2 py-1 text-xs outline-none focus:border-teal text-text-main"
                          >
                            <option value="patient">Patient</option>
                            <option value="medecin_non_nuc">Médecin (Non MN)</option>
                            <option value="medecin_nuc">Médecin Nucléaire</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Articles List */}
            <div className="w-[320px] border-r border-border-main flex flex-col bg-bg shrink-0">
              <div className="p-4 border-b border-border-main flex flex-col gap-3 bg-bg2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-text-main">Liste des articles</h3>
                  <button onClick={handleCreateNew} className="p-1.5 bg-teal text-bg rounded hover:bg-teal2 transition-colors" title="Nouvel Article">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text3" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={searchArticle}
                    onChange={e => setSearchArticle(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-bg3 border border-border-main rounded-md text-sm outline-none focus:border-teal transition-colors"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredArticles.map(a => (
                  <div 
                    key={a.id} 
                    className={`p-3 rounded-md cursor-pointer border transition-colors ${editingId === a.id ? 'border-teal bg-teal/5' : 'border-border-main bg-bg hover:border-teal/30'}`} 
                    onClick={() => handleEdit(a)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-mono text-[10px] text-teal">{a.id}</div>
                      <div className="text-[10px] text-text3 bg-bg3 px-1.5 py-0.5 rounded">{a.difficulty}</div>
                    </div>
                    <div className="text-[13px] font-medium line-clamp-2 text-text-main leading-snug">{a.title}</div>
                  </div>
                ))}
                {filteredArticles.length === 0 && (
                  <div className="text-center text-text3 text-xs mt-4">Aucun article trouvé.</div>
                )}
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-bg">
              {!editingId ? (
                <div className="h-full flex flex-col items-center justify-center text-text3">
                  <FileText className="w-16 h-16 mb-4 opacity-20" />
                  <div className="font-serif text-xl text-text2 mb-2">Éditeur d&apos;articles</div>
                  <p className="text-sm">Sélectionnez un article dans la liste ou créez-en un nouveau.</p>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-main sticky top-0 bg-bg z-10">
                    <h2 className="text-2xl font-serif text-text-main">
                      {editingId === 'new' ? 'Créer un article' : 'Modifier l\'article'}
                    </h2>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-border-main rounded-md text-sm hover:bg-bg3 transition-colors text-text2">
                        Annuler
                      </button>
                      <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-teal text-bg rounded-md text-sm flex items-center gap-2 hover:bg-teal2 transition-colors disabled:opacity-50 font-medium shadow-lg shadow-teal/20">
                        <Save className="w-4 h-4" /> {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-bg2 p-5 rounded-xl border border-border-main space-y-5">
                      <h3 className="text-sm font-medium text-text-main border-b border-border-main pb-2">Métadonnées</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">ID de l&apos;article</label>
                          <input 
                            type="text" 
                            value={formData.id || ''} 
                            onChange={e => setFormData({...formData, id: e.target.value})} 
                            disabled={editingId !== 'new'} 
                            placeholder="ex: MN005"
                            className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal disabled:opacity-50 transition-colors text-text-main" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Catégorie</label>
                          <select 
                            value={formData.cat || 'endocrinologie'} 
                            onChange={e => {
                              const selectedCat = e.target.value as Category;
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
                          <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Libellé Catégorie (Auto)</label>
                          <input 
                            type="text" 
                            value={formData.catLabel || ''} 
                            disabled
                            className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none opacity-70 text-text-main" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Difficulté</label>
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
                        <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Titre</label>
                        <input 
                          type="text" 
                          value={formData.title || ''} 
                          onChange={e => setFormData({...formData, title: e.target.value})} 
                          placeholder="Titre de l'article"
                          className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main font-medium" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Tags (séparés par des virgules)</label>
                        <input 
                          type="text" 
                          value={formData.tags?.join(', ') || ''} 
                          onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} 
                          placeholder="ex: scintigraphie, iode-131, hyperthyroïdie"
                          className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Auteurs (séparés par des virgules)</label>
                        <input 
                          type="text" 
                          value={formData.authors?.join(', ') || ''} 
                          onChange={e => setFormData({...formData, authors: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} 
                          placeholder="ex: Dr. Dupont, Pr. Martin"
                          className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Public Cible</label>
                        <div className="flex flex-wrap gap-3">
                          {['patient', 'medecin_non_nuc', 'medecin_nuc'].map(audience => (
                            <label key={audience} className="flex items-center gap-2 text-sm text-text-main cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={formData.targetAudience?.includes(audience as any) || (!formData.targetAudience || formData.targetAudience.length === 0)}
                                onChange={e => {
                                  const current = formData.targetAudience || ['patient', 'medecin_non_nuc', 'medecin_nuc'];
                                  let next;
                                  if (e.target.checked) {
                                    next = [...current, audience as any];
                                  } else {
                                    next = current.filter(a => a !== audience);
                                  }
                                  setFormData({...formData, targetAudience: next});
                                }}
                                className="accent-teal w-4 h-4"
                              />
                              {audience === 'patient' ? 'Patient' : audience === 'medecin_non_nuc' ? 'Médecin (Non MN)' : 'Médecin Nucléaire'}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Extrait (Résumé)</label>
                        <textarea 
                          value={formData.excerpt || ''} 
                          onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                          rows={3} 
                          placeholder="Courte description pour la carte de l'article..."
                          className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal resize-y transition-colors text-text-main" 
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-mono text-text3 uppercase tracking-wider">Sources & Références</label>
                          <button 
                            onClick={() => setFormData({...formData, sources: [...(formData.sources || []), { title: '', url: '' }]})}
                            className="text-xs text-teal hover:underline"
                          >
                            + Ajouter une source
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(formData.sources || []).map((source, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Titre de la source"
                                value={source.title}
                                onChange={e => {
                                  const newSources = [...(formData.sources || [])];
                                  newSources[idx].title = e.target.value;
                                  setFormData({...formData, sources: newSources});
                                }}
                                className="flex-1 bg-bg3 border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                              />
                              <input 
                                type="text" 
                                placeholder="URL (optionnel)"
                                value={source.url || ''}
                                onChange={e => {
                                  const newSources = [...(formData.sources || [])];
                                  newSources[idx].url = e.target.value;
                                  setFormData({...formData, sources: newSources});
                                }}
                                className="flex-1 bg-bg3 border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                              />
                              <button 
                                onClick={() => {
                                  const newSources = [...(formData.sources || [])];
                                  newSources.splice(idx, 1);
                                  setFormData({...formData, sources: newSources});
                                }}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg2 p-5 rounded-xl border border-border-main space-y-4">
                      <div className="flex justify-between items-center border-b border-border-main pb-2">
                        <h3 className="text-sm font-medium text-text-main">Contenu de l&apos;article</h3>
                      </div>
                      <ContentEditor 
                        content={contentData} 
                        onChange={setContentData} 
                      />
                    </div>

                    {editingId !== 'new' && (
                      <div className="pt-6 flex justify-end">
                        <button 
                          onClick={() => handleDelete(formData.id!)} 
                          className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-sm flex items-center gap-2 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Supprimer l&apos;article
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

