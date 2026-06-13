'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDoc, collection, getDocs, serverTimestamp, updateDoc, query, limit, orderBy, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Article, ArticleContent, Category, MENU_STRUCTURE } from '@/lib/data';
import { articleImportSchema, articleSchema } from '@/lib/schemas';
import { Save, Trash2, Plus, Users, FileText, LayoutDashboard, Search, X, FileJson, Sparkles, ShieldAlert, MailOpen, UserCheck, Check, XCircle } from 'lucide-react';
import { ContentEditor } from './ContentEditor';
import { AIGenerator } from './AIGenerator';
import { apiFetch, ApiError } from '@/lib/api-client';

interface AdminUser {
  id: string;
  uid?: string;
  email?: string;
  role?: string;
  profileType?: string;
  displayName?: string;
  createdAt?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt?: string;
}

interface RoleRequest {
  id: string;
  uid: string;
  email: string;
  requestedRole: 'medecin_non_nuc' | 'medecin_nuc';
  justification: string;
  status: string;
  createdAt?: string;
}

const EMPTY_CONTENT: ArticleContent = {
  lead: '',
  medecin_nuc: { sections: [] },
  medecin_non_nuc: { sections: [] },
  patient: { sections: [] },
};

const USERS_PAGE_SIZE = 25;

export function AdminPanel() {
  const { articles, showHome, dbUser, setDbUser, setUserProfile, setGlobalMode, setArticleMode } = useAtlas();
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'users' | 'messages' | 'requests'>('overview');
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [roleRequests, setRoleRequests] = useState<RoleRequest[]>([]);
  const [loadingRoleRequests, setLoadingRoleRequests] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({});
  const [contentData, setContentData] = useState<ArticleContent>(EMPTY_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isImportJsonOpen, setIsImportJsonOpen] = useState(false);
  const [importText, setImportText] = useState('');

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLastDoc, setUsersLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [usersHasMore, setUsersHasMore] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchArticle, setSearchArticle] = useState('');
  const [editingUserRole, setEditingUserRole] = useState<AdminUser | null>(null);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ text: string; onConfirm: () => void } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  // Vérification admin : on s'appuie sur le rôle Firestore récupéré dans dbUser.
  // C'est la même source de vérité que les rules ; aucun email codé en dur.
  useEffect(() => {
    if (!auth.currentUser) {
      setIsAdmin(false);
      showHome();
      return;
    }
    if (!dbUser) {
      // En attente du chargement du profil
      return;
    }
    if (dbUser.role === 'admin') {
      setIsAdmin(true);
      return;
    }
    setIsAdmin(false);
    showHome();
  }, [dbUser, showHome]);

  const fetchUsers = useCallback(async (reset = false) => {
    setLoadingUsers(true);
    try {
      let q = query(collection(db, 'users'), orderBy('email'), limit(USERS_PAGE_SIZE));
      if (!reset && usersLastDoc) {
        q = query(collection(db, 'users'), orderBy('email'), startAfter(usersLastDoc), limit(USERS_PAGE_SIZE));
      }
      const snap = await getDocs(q);
      const newUsers: AdminUser[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AdminUser, 'id'>) }));
      setUsers((prev) => (reset ? newUsers : [...prev, ...newUsers]));
      setUsersLastDoc(snap.docs.at(-1) ?? null);
      setUsersHasMore(snap.docs.length === USERS_PAGE_SIZE);
    } catch (error) {
      showMessage('error', 'Impossible de charger les utilisateurs.');
      console.error('[admin] fetchUsers', error);
    } finally {
      setLoadingUsers(false);
    }
  }, [usersLastDoc]);

  useEffect(() => {
    if (isAdmin && activeTab === 'users' && users.length === 0) {
      void fetchUsers(true);
    }
  }, [isAdmin, activeTab, users.length, fetchUsers]);

  const fetchContactMessages = useCallback(async () => {
    setLoadingMessages(true);
    try {
      const snap = await getDocs(
        query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'), limit(50))
      );
      const list: ContactMessage[] = snap.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        const created = data.createdAt as { toDate?: () => Date } | undefined;
        return {
          id: d.id,
          name: (data.name as string) ?? '',
          email: (data.email as string) ?? '',
          subject: (data.subject as string) ?? '',
          message: (data.message as string) ?? '',
          status: (data.status as string) ?? 'new',
          createdAt: created?.toDate ? created.toDate().toLocaleString('fr-FR') : undefined,
        };
      });
      setContactMessages(list);
    } catch (error) {
      showMessage('error', 'Impossible de charger les messages.');
      console.error('[admin] fetchContactMessages', error);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const fetchRoleRequests = useCallback(async () => {
    setLoadingRoleRequests(true);
    try {
      const res = await apiFetch<{ requests: RoleRequest[] }>('/api/role-request', { method: 'GET' });
      setRoleRequests(res.requests);
    } catch (error) {
      showMessage('error', error instanceof ApiError ? error.message : 'Erreur de chargement.');
    } finally {
      setLoadingRoleRequests(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    if (activeTab === 'messages' && contactMessages.length === 0) void fetchContactMessages();
    if (activeTab === 'requests' && roleRequests.length === 0) void fetchRoleRequests();
  }, [isAdmin, activeTab, contactMessages.length, roleRequests.length, fetchContactMessages, fetchRoleRequests]);

  const handleRoleRequestAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      await apiFetch('/api/role-request', {
        method: 'PATCH',
        body: JSON.stringify({ id, action }),
      });
      setRoleRequests((prev) => prev.filter((r) => r.id !== id));
      showMessage('success', action === 'approve' ? 'Demande approuvée.' : 'Demande rejetée.');
    } catch (error) {
      showMessage('error', error instanceof ApiError ? error.message : 'Erreur.');
    }
  };

  const markMessageRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contact_messages', id), { status: 'read' });
      setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'read' } : m)));
    } catch (error) {
      showMessage('error', 'Impossible de marquer comme lu.');
      console.error('[admin] markMessageRead', error);
    }
  };

  if (isAdmin === null) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg">
        <div className="animate-pulse text-text2" role="status">Vérification des droits…</div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-serif text-text-main mb-2">Accès refusé</h2>
          <p className="text-text2">Cette page est réservée aux administrateurs.</p>
        </div>
      </div>
    );
  }

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData(article);
    setContentData(article.content ?? EMPTY_CONTENT);
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
      targetAudience: ['medecin_nuc', 'medecin_non_nuc', 'patient'],
    });
    setContentData(EMPTY_CONTENT);
  };

  const handleSave = async () => {
    if (!formData.id || !formData.title) {
      showMessage('error', "L'ID et le titre sont requis.");
      return;
    }

    const parsed = articleSchema.safeParse({
      ...formData,
      content: contentData,
    });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      showMessage('error', `Validation : ${firstIssue.path.join('.')} — ${firstIssue.message}`);
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...parsed.data,
        // Firestore interdit les tableaux imbriqués (tables : rows = string[][]).
        // On sérialise le contenu en JSON ; la lecture (AtlasContext) parse les deux formats.
        content: JSON.stringify(parsed.data.content),
        updatedAt: serverTimestamp(),
        ...(editingId === 'new'
          ? { createdAt: serverTimestamp(), authorId: auth.currentUser?.uid ?? '' }
          : {}),
      };

      await setDoc(doc(db, 'articles', parsed.data.id), payload);

      if (editingId !== 'new' && editingId !== parsed.data.id && editingId !== null) {
        await deleteDoc(doc(db, 'articles', editingId));
      }

      showMessage('success', 'Article sauvegardé.');
      if (editingId === 'new' || editingId !== parsed.data.id) {
        setEditingId(parsed.data.id);
      }
    } catch (error) {
      showMessage('error', 'Échec de la sauvegarde.');
      console.error('[admin] handleSave', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      text: `Supprimer définitivement l'article "${id}" ?`,
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'articles', id));
          if (editingId === id) setEditingId(null);
          showMessage('success', 'Article supprimé.');
        } catch (error) {
          showMessage('error', 'Échec de la suppression.');
          console.error('[admin] handleDelete', error);
        }
      },
    });
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importText);
      const validated = articleImportSchema.safeParse(parsed);
      if (!validated.success) {
        const firstIssue = validated.error.issues[0];
        showMessage('error', `JSON invalide : ${firstIssue.path.join('.')} — ${firstIssue.message}`);
        return;
      }
      setActiveTab('articles');
      setEditingId('new');
      setFormData({
        id: validated.data.id ?? '',
        title: validated.data.title,
        cat: (validated.data.cat as Category) ?? 'endocrinologie',
        catLabel: validated.data.catLabel ?? 'Endocrinologie',
        excerpt: validated.data.excerpt ?? '',
        tags: validated.data.tags ?? [],
        difficulty: validated.data.difficulty ?? 'fondamental',
        targetAudience: validated.data.targetAudience ?? ['medecin_nuc', 'medecin_non_nuc', 'patient'],
        authors: validated.data.authors,
        sources: validated.data.sources,
      });
      setContentData((validated.data.content as ArticleContent) ?? EMPTY_CONTENT);
      setIsImportJsonOpen(false);
      setImportText('');
      showMessage('success', "JSON importé. Choisis la catégorie puis sauvegarde.");
    } catch (e) {
      showMessage('error', 'Format JSON invalide.');
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchArticle.toLowerCase()) ||
      a.id.toLowerCase().includes(searchArticle.toLowerCase())
  );

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(articles, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `nucleatlas_articles_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showMessage('success', 'Export JSON téléchargé.');
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden bg-bg animate-in fade-in duration-300 relative">
      {/* Toast */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`absolute top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 ${
            message.type === 'success' ? 'bg-teal text-white' : 'bg-red-500 text-white'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Confirm dialog */}
      {confirmDialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-bg2 border border-border-main rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <h3 id="confirm-dialog-title" className="text-lg font-serif text-text-main mb-4">Confirmation</h3>
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

      {isAIGeneratorOpen && (
        <AIGenerator
          onClose={() => setIsAIGeneratorOpen(false)}
          onGenerate={(newArticle) => {
            setActiveTab('articles');
            setEditingId('new');
            setFormData(newArticle);
            setContentData((newArticle.content as ArticleContent | undefined) ?? EMPTY_CONTENT);
          }}
        />
      )}

      {isImportJsonOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-json-title"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        >
          <div className="bg-bg border border-border-main rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg2">
              <h3 id="import-json-title" className="font-serif text-lg text-text-main font-medium">
                Importer un article (JSON)
              </h3>
              <button
                onClick={() => setIsImportJsonOpen(false)}
                aria-label="Fermer la fenêtre d'import"
                className="p-1 text-text3 hover:text-text-main"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-text2 mb-4">
                Colle ici le JSON généré par une IA externe (ChatGPT, Claude…). Le contenu sera validé
                strictement avant import.
              </p>
              <label htmlFor="json-import-textarea" className="sr-only">
                Code JSON
              </label>
              <textarea
                id="json-import-textarea"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full h-64 bg-bg3 border border-border-main rounded-lg p-3 text-sm font-mono text-text-main outline-none focus:border-teal resize-y"
                placeholder='{"title": "...", "content": {...}}'
              />
            </div>
            <div className="p-4 border-t border-border-main bg-bg2 flex justify-end gap-3">
              <button onClick={() => setIsImportJsonOpen(false)} className="px-4 py-2 text-sm text-text2">
                Annuler
              </button>
              <button
                onClick={handleImportJson}
                className="px-6 py-2 bg-teal text-bg rounded-md text-sm font-medium hover:bg-teal2"
              >
                Importer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar admin */}
      <div className="w-[240px] border-r border-border-main flex flex-col bg-bg2 shrink-0">
        <div className="p-6 border-b border-border-main">
          <h2 className="font-serif text-xl text-text-main">Administration</h2>
          <p className="text-xs text-text3 mt-1">Gestion contenu &amp; accès</p>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3" aria-label="Sections administration">
          <AdminNavButton
            active={activeTab === 'overview'}
            onClick={() => { setActiveTab('overview'); setEditingId(null); }}
            icon={<LayoutDashboard className="w-4 h-4" aria-hidden="true" />}
            label="Vue d'ensemble"
          />
          <AdminNavButton
            active={activeTab === 'articles'}
            onClick={() => { setActiveTab('articles'); setEditingId(null); }}
            icon={<FileText className="w-4 h-4" aria-hidden="true" />}
            label="Articles"
          />
          <AdminNavButton
            active={activeTab === 'users'}
            onClick={() => { setActiveTab('users'); setEditingId(null); }}
            icon={<Users className="w-4 h-4" aria-hidden="true" />}
            label="Utilisateurs"
          />
          <AdminNavButton
            active={activeTab === 'requests'}
            onClick={() => { setActiveTab('requests'); setEditingId(null); }}
            icon={<UserCheck className="w-4 h-4" aria-hidden="true" />}
            label="Demandes de rôle"
          />
          <AdminNavButton
            active={activeTab === 'messages'}
            onClick={() => { setActiveTab('messages'); setEditingId(null); }}
            icon={<MailOpen className="w-4 h-4" aria-hidden="true" />}
            label="Messages"
          />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-8">
            <h1 className="text-3xl font-serif text-text-main mb-8">Tableau de bord</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard label="Total articles" value={articles.length} icon={<FileText className="w-6 h-6" aria-hidden="true" />} color="teal" />
              <StatCard label="Utilisateurs chargés" value={users.length || '—'} icon={<Users className="w-6 h-6" aria-hidden="true" />} color="blue" />
            </div>

            <div className="bg-bg2 border border-border-main rounded-xl p-6 mb-8">
              <h3 className="text-lg font-serif text-text-main mb-4">Outils d&apos;administration</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsAIGeneratorOpen(true)}
                  className="px-4 py-2 bg-teal text-bg rounded-lg font-medium hover:bg-teal2 transition-colors text-sm flex items-center gap-2 shadow-lg shadow-teal/20 focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Générateur d&apos;Articles IA
                </button>
                <button
                  onClick={exportJson}
                  className="px-4 py-2 bg-blue-500/20 text-blue-500 rounded-lg font-medium hover:bg-blue-500/30 transition-colors text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FileJson className="w-4 h-4" aria-hidden="true" />
                  Exporter les articles (JSON)
                </button>
              </div>
            </div>

            <div className="bg-bg2 border border-border-main rounded-xl p-6">
              <h3 className="text-lg font-serif text-text-main mb-4">Derniers articles ajoutés</h3>
              <div className="space-y-3">
                {articles.slice().reverse().slice(0, 5).map((a) => (
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
            <div className="bg-bg2 border border-border-main rounded-xl overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-bg3 text-text3 font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4">Utilisateur</th>
                    <th scope="col" className="px-6 py-4">Email</th>
                    <th scope="col" className="px-6 py-4">Rôle</th>
                    <th scope="col" className="px-6 py-4">Type de profil</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-main">
                  {loadingUsers && users.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-text3">Chargement…</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-text3">Aucun utilisateur.</td></tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-bg3/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-text-main">{u.displayName || 'Sans nom'}</td>
                        <td className="px-6 py-4 text-text2">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-teal/10 text-teal'}`}>
                            {u.role || 'patient'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text2">{u.profileType || '—'}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setEditingUserRole(u)}
                            className="px-3 py-1.5 bg-teal/10 text-teal rounded hover:bg-teal/20 transition-colors text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal"
                          >
                            Modifier le rôle
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {usersHasMore && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => void fetchUsers(false)}
                  disabled={loadingUsers}
                  className="px-4 py-2 bg-bg3 border border-border-main rounded-md text-sm text-text2 hover:text-text-main disabled:opacity-50"
                >
                  {loadingUsers ? 'Chargement…' : 'Charger plus'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-serif text-text-main">Demandes de rôle en attente</h1>
              <button
                onClick={() => void fetchRoleRequests()}
                disabled={loadingRoleRequests}
                className="px-3 py-1.5 bg-bg3 border border-border-main rounded-md text-sm text-text2 hover:text-text-main disabled:opacity-50"
              >
                {loadingRoleRequests ? 'Chargement…' : 'Rafraîchir'}
              </button>
            </div>
            {roleRequests.length === 0 ? (
              <div className="text-center py-16 bg-bg2 border border-border-main rounded-xl">
                <UserCheck className="w-10 h-10 text-text3 mx-auto mb-3" aria-hidden="true" />
                <p className="text-text2">Aucune demande en attente.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {roleRequests.map((r) => (
                  <div key={r.id} className="bg-bg2 border border-border-main rounded-xl p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="font-medium text-text-main">{r.email}</div>
                        <div className="text-xs text-text3">
                          Demande : <span className="font-mono text-teal">{r.requestedRole}</span>
                          {r.createdAt && <> · {r.createdAt}</>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => void handleRoleRequestAction(r.id, 'approve')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal/10 text-teal rounded-md text-sm font-medium hover:bg-teal/20 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                        >
                          <Check className="w-4 h-4" aria-hidden="true" /> Approuver
                        </button>
                        <button
                          onClick={() => void handleRoleRequestAction(r.id, 'reject')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <XCircle className="w-4 h-4" aria-hidden="true" /> Refuser
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-text2 whitespace-pre-wrap leading-relaxed">{r.justification}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-serif text-text-main">Messages reçus</h1>
              <button
                onClick={() => void fetchContactMessages()}
                disabled={loadingMessages}
                className="px-3 py-1.5 bg-bg3 border border-border-main rounded-md text-sm text-text2 hover:text-text-main disabled:opacity-50"
              >
                {loadingMessages ? 'Chargement…' : 'Rafraîchir'}
              </button>
            </div>
            {contactMessages.length === 0 ? (
              <div className="text-center py-16 bg-bg2 border border-border-main rounded-xl">
                <MailOpen className="w-10 h-10 text-text3 mx-auto mb-3" aria-hidden="true" />
                <p className="text-text2">Aucun message.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`bg-bg2 border rounded-xl p-5 ${m.status === 'new' ? 'border-teal/40' : 'border-border-main'}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="font-medium text-text-main">
                          {m.name}{' '}
                          <a href={`mailto:${m.email}`} className="text-xs text-teal hover:underline ml-1">
                            &lt;{m.email}&gt;
                          </a>
                        </div>
                        <div className="text-xs text-text3 mt-0.5">
                          Sujet : <span className="text-text2">{m.subject}</span>
                          {m.createdAt && <> · {m.createdAt}</>}
                        </div>
                      </div>
                      {m.status === 'new' ? (
                        <button
                          onClick={() => void markMessageRead(m.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal/10 text-teal rounded-md text-xs font-medium hover:bg-teal/20 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                        >
                          Marquer lu
                        </button>
                      ) : (
                        <span className="text-xs text-text3 px-2 py-1 bg-bg3 rounded">lu</span>
                      )}
                    </div>
                    <p className="text-sm text-text2 whitespace-pre-wrap leading-relaxed mt-3 bg-bg p-3 rounded border border-border-main">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="flex-1 flex overflow-hidden">
            <div className="w-[320px] border-r border-border-main flex flex-col bg-bg shrink-0">
              <div className="p-4 border-b border-border-main flex flex-col gap-3 bg-bg2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-text-main">Liste des articles</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsImportJsonOpen(true)}
                      aria-label="Importer un JSON"
                      className="p-1.5 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Importer JSON"
                    >
                      <FileJson className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => setIsAIGeneratorOpen(true)}
                      aria-label="Générer avec l'IA"
                      className="p-1.5 bg-teal/20 text-teal rounded hover:bg-teal/30 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                      title="Générer avec l'IA"
                    >
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={handleCreateNew}
                      aria-label="Nouvel article"
                      className="p-1.5 bg-teal text-bg rounded hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                      title="Nouvel article"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text3" aria-hidden="true" />
                  <label htmlFor="admin-article-search" className="sr-only">Rechercher un article</label>
                  <input
                    id="admin-article-search"
                    type="text"
                    placeholder="Rechercher…"
                    value={searchArticle}
                    onChange={(e) => setSearchArticle(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-bg3 border border-border-main rounded-md text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 transition-colors"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredArticles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleEdit(a)}
                    aria-current={editingId === a.id ? 'true' : undefined}
                    className={`w-full text-left p-3 rounded-md cursor-pointer border transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
                      editingId === a.id
                        ? 'border-teal bg-teal/5'
                        : 'border-border-main bg-bg hover:border-teal/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-mono text-[10px] text-teal">{a.id}</div>
                      <div className="text-[10px] text-text3 bg-bg3 px-1.5 py-0.5 rounded">{a.difficulty}</div>
                    </div>
                    <div className="text-[13px] font-medium line-clamp-2 text-text-main leading-snug">{a.title}</div>
                  </button>
                ))}
                {filteredArticles.length === 0 && (
                  <div className="text-center text-text3 text-xs mt-4">Aucun article.</div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-bg">
              {!editingId ? (
                <div className="h-full flex flex-col items-center justify-center text-text3">
                  <FileText className="w-16 h-16 mb-4 opacity-20" aria-hidden="true" />
                  <div className="font-serif text-xl text-text2 mb-2">Éditeur d&apos;articles</div>
                  <p className="text-sm">Sélectionne un article ou crée-en un nouveau.</p>
                </div>
              ) : (
                <ArticleEditorForm
                  editingId={editingId}
                  formData={formData}
                  setFormData={setFormData}
                  contentData={contentData}
                  setContentData={setContentData}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  onDelete={handleDelete}
                  isSaving={isSaving}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modifier le rôle */}
      {editingUserRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <div className="bg-bg border border-border-main rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg2">
              <h3 className="font-serif text-lg text-text-main">Modifier le rôle</h3>
              <button onClick={() => setEditingUserRole(null)} aria-label="Fermer" className="p-1 text-text3 hover:text-text-main hover:bg-bg3 rounded transition-colors">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <div className="text-sm text-text3 mb-1">Utilisateur</div>
                <div className="font-medium text-text-main">{editingUserRole.displayName || 'Sans nom'}</div>
                <div className="text-sm text-text2">{editingUserRole.email}</div>
              </div>
              <div>
                <label htmlFor="user-role-select" className="block text-sm font-medium text-text-main mb-2">
                  Nouveau rôle
                </label>
                <select
                  id="user-role-select"
                  value={editingUserRole.role || 'patient'}
                  onChange={(e) => setEditingUserRole({ ...editingUserRole, role: e.target.value })}
                  className="w-full bg-bg3 border border-border-main rounded-lg px-3 py-2 text-sm outline-none focus:border-teal text-text-main"
                >
                  <option value="patient">Patient</option>
                  <option value="medecin_non_nuc">Médecin (non MN)</option>
                  <option value="medecin_nuc">Médecin Nucléaire</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-border-main bg-bg2 flex justify-end gap-3">
              <button onClick={() => setEditingUserRole(null)} className="px-4 py-2 text-sm font-medium text-text2 hover:text-text-main transition-colors">
                Annuler
              </button>
              <button
                onClick={async () => {
                  try {
                    const newRole = editingUserRole.role || 'patient';
                    await updateDoc(doc(db, 'users', editingUserRole.id), { role: newRole });
                    setUsers(users.map((u) => (u.id === editingUserRole.id ? { ...u, role: newRole } : u)));

                    if (dbUser && editingUserRole.id === dbUser.uid) {
                      const cast = newRole as typeof dbUser.role;
                      setDbUser({ ...dbUser, role: cast });
                      setUserProfile(cast);
                      const newMode = cast === 'admin' || cast === 'medecin_nuc' ? 'medecin_nuc' : cast === 'medecin_non_nuc' ? 'medecin_non_nuc' : 'patient';
                      setGlobalMode(newMode);
                      setArticleMode(newMode);
                    }

                    showMessage('success', 'Rôle mis à jour.');
                    setEditingUserRole(null);
                  } catch (error) {
                    showMessage('error', 'Erreur lors de la mise à jour.');
                    console.error('[admin] update role', error);
                  }
                }}
                className="px-4 py-2 bg-teal text-white rounded-lg text-sm font-medium hover:bg-teal/90 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminNavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
        active ? 'bg-teal/10 text-teal' : 'text-text2 hover:bg-bg3'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number | string; icon: React.ReactNode; color: 'teal' | 'blue' }) {
  const palette = color === 'teal' ? 'bg-teal/10 text-teal' : 'bg-blue-500/10 text-blue-500';
  return (
    <div className="bg-bg2 border border-border-main rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${palette}`}>{icon}</div>
        <div>
          <div className="text-sm text-text3 font-medium">{label}</div>
          <div className="text-3xl font-serif text-text-main">{value}</div>
        </div>
      </div>
    </div>
  );
}

function ArticleEditorForm({
  editingId,
  formData,
  setFormData,
  contentData,
  setContentData,
  onSave,
  onCancel,
  onDelete,
  isSaving,
}: {
  editingId: string;
  formData: Partial<Article>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Article>>>;
  contentData: ArticleContent;
  setContentData: React.Dispatch<React.SetStateAction<ArticleContent>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  isSaving: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-main sticky top-0 bg-bg z-10">
        <h2 className="text-2xl font-serif text-text-main">{editingId === 'new' ? "Créer un article" : "Modifier l'article"}</h2>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 border border-border-main rounded-md text-sm hover:bg-bg3 transition-colors text-text2">
            Annuler
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 bg-teal text-bg rounded-md text-sm flex items-center gap-2 hover:bg-teal2 transition-colors disabled:opacity-50 font-medium shadow-lg shadow-teal/20 focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <Save className="w-4 h-4" aria-hidden="true" /> {isSaving ? 'Sauvegarde…' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-bg2 p-5 rounded-xl border border-border-main space-y-5">
          <h3 className="text-sm font-medium text-text-main border-b border-border-main pb-2">Métadonnées</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="article-id" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
                ID de l&apos;article
              </label>
              <input
                id="article-id"
                type="text"
                value={formData.id || ''}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="ex: MN005"
                className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
              />
              {editingId !== 'new' && (
                <p className="text-[10px] text-text3 mt-1">Attention : modifier l&apos;ID change l&apos;URL.</p>
              )}
            </div>
            <div>
              <label htmlFor="article-cat" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
                Catégorie
              </label>
              <select
                id="article-cat"
                value={formData.cat || 'endocrinologie'}
                onChange={(e) => {
                  const selectedCat = e.target.value as Category;
                  let label = selectedCat as string;
                  MENU_STRUCTURE.forEach((section) => {
                    const item = section.items.find((i) => i.id === selectedCat);
                    if (item) label = item.label;
                  });
                  setFormData({ ...formData, cat: selectedCat, catLabel: label });
                }}
                className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
              >
                {MENU_STRUCTURE.map((section) => (
                  <optgroup key={section.title} label={section.title}>
                    {section.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="article-cat-label" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
                Libellé catégorie (auto)
              </label>
              <input
                id="article-cat-label"
                type="text"
                value={formData.catLabel || ''}
                disabled
                className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none opacity-70 text-text-main"
              />
            </div>
            <div>
              <label htmlFor="article-diff" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
                Difficulté
              </label>
              <select
                id="article-diff"
                value={formData.difficulty || 'fondamental'}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Article['difficulty'] })}
                className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
              >
                <option value="fondamental">Fondamental</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="avancé">Avancé</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-lg bg-bg3/50 border border-border-main">
            <div>
              <label htmlFor="article-review" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
                Statut de relecture médicale
              </label>
              <select
                id="article-review"
                value={formData.reviewStatus || 'ai_assisted'}
                onChange={(e) => {
                  const v = e.target.value as 'draft' | 'ai_assisted' | 'reviewed';
                  setFormData({
                    ...formData,
                    reviewStatus: v,
                    reviewedAt: v === 'reviewed' ? (formData.reviewedAt || new Date().toISOString()) : formData.reviewedAt,
                  });
                }}
                className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
              >
                <option value="ai_assisted">Assisté IA — en relecture</option>
                <option value="reviewed">Relu &amp; validé par un médecin</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>
            <div>
              <label htmlFor="article-reviewer" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
                Relu par (nom du médecin)
              </label>
              <input
                id="article-reviewer"
                type="text"
                value={formData.reviewedBy || ''}
                onChange={(e) => setFormData({ ...formData, reviewedBy: e.target.value })}
                placeholder="ex: Dr F. Agboton"
                disabled={formData.reviewStatus !== 'reviewed'}
                className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="article-title" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
              Titre
            </label>
            <input
              id="article-title"
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Titre de l'article"
              className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main font-medium"
            />
          </div>

          <div>
            <label htmlFor="article-tags" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
              Tags (séparés par des virgules)
            </label>
            <input
              id="article-tags"
              type="text"
              value={formData.tags?.join(', ') || ''}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })
              }
              placeholder="ex: scintigraphie, iode-131, hyperthyroïdie"
              className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
            />
          </div>

          <div>
            <label htmlFor="article-authors" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
              Auteurs (séparés par des virgules)
            </label>
            <input
              id="article-authors"
              type="text"
              value={formData.authors?.join(', ') || ''}
              onChange={(e) =>
                setFormData({ ...formData, authors: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })
              }
              placeholder="ex: Dr. Dupont, Pr. Martin"
              className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal transition-colors text-text-main"
            />
          </div>

          <div>
            <fieldset>
              <legend className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">Public cible</legend>
              <div className="flex flex-wrap gap-3">
                {(['patient', 'medecin_non_nuc', 'medecin_nuc'] as const).map((audience) => {
                  const audiences = formData.targetAudience ?? ['patient', 'medecin_non_nuc', 'medecin_nuc'];
                  return (
                    <label key={audience} className="flex items-center gap-2 text-sm text-text-main cursor-pointer">
                      <input
                        type="checkbox"
                        checked={audiences.includes(audience)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? Array.from(new Set([...audiences, audience]))
                            : audiences.filter((a) => a !== audience);
                          setFormData({ ...formData, targetAudience: next });
                        }}
                        className="accent-teal w-4 h-4"
                      />
                      {audience === 'patient' ? 'Patient' : audience === 'medecin_non_nuc' ? 'Médecin (non MN)' : 'Médecin Nucléaire'}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div>
            <label htmlFor="article-excerpt" className="block text-xs font-mono text-text3 mb-1.5 uppercase tracking-wider">
              Extrait (résumé)
            </label>
            <textarea
              id="article-excerpt"
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              placeholder="Courte description pour la carte de l'article…"
              className="w-full bg-bg3 border border-border-main rounded-md p-2.5 text-sm outline-none focus:border-teal resize-y transition-colors text-text-main"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-mono text-text3 uppercase tracking-wider">Sources &amp; références</label>
              <button
                onClick={() =>
                  setFormData({ ...formData, sources: [...(formData.sources ?? []), { title: '', url: '' }] })
                }
                className="text-xs text-teal hover:underline focus:outline-none focus:ring-2 focus:ring-teal rounded"
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
                    onChange={(e) => {
                      const newSources = [...(formData.sources ?? [])];
                      newSources[idx] = { ...newSources[idx], title: e.target.value };
                      setFormData({ ...formData, sources: newSources });
                    }}
                    aria-label={`Titre source ${idx + 1}`}
                    className="flex-1 bg-bg3 border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                  />
                  <input
                    type="url"
                    placeholder="URL (optionnel)"
                    value={source.url || ''}
                    onChange={(e) => {
                      const newSources = [...(formData.sources ?? [])];
                      newSources[idx] = { ...newSources[idx], url: e.target.value };
                      setFormData({ ...formData, sources: newSources });
                    }}
                    aria-label={`URL source ${idx + 1}`}
                    className="flex-1 bg-bg3 border border-border-main rounded-md p-2 text-sm outline-none focus:border-teal text-text-main"
                  />
                  <button
                    onClick={() => {
                      const newSources = [...(formData.sources ?? [])];
                      newSources.splice(idx, 1);
                      setFormData({ ...formData, sources: newSources });
                    }}
                    aria-label={`Supprimer source ${idx + 1}`}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
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
          <ContentEditor content={contentData} onChange={(c) => setContentData(c as ArticleContent)} />
        </div>

        {editingId !== 'new' && formData.id && (
          <div className="pt-6 flex justify-end">
            <button
              onClick={() => onDelete(formData.id!)}
              className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-sm flex items-center gap-2 hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" /> Supprimer l&apos;article
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
