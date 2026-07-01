'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArticleMode, Category, Article, UserProfile, getAllowedAudiences } from './data';
import { articleFromDocData } from './article-mapper';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';

export interface DbUser {
  uid: string;
  email: string;
  role: UserProfile;
  profileType?: ArticleMode;
  intendedPlan?: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: string;
  lastLogin?: string;
  recentArticles?: string[];
  favorites?: string[];
}

interface AtlasState {
  searchQuery: string;
  globalMode: ArticleMode;
  articleMode: ArticleMode;
  lang: string;
  articles: Article[];
  loading: boolean;
  articlesError: string | null;
  userProfile: UserProfile;
  authUser: FirebaseUser | null;
  dbUser: DbUser | null;
  authLoading: boolean;
  isAuthModalOpen: boolean;
  authIntent: string | null;
  isMobileMenuOpen: boolean;
  isDesktopMenuCollapsed: boolean;
}

interface AtlasContextType extends AtlasState {
  setSearchQuery: (query: string) => void;
  setGlobalMode: (mode: ArticleMode) => void;
  setArticleMode: (mode: ArticleMode) => void;
  setLang: (lang: string) => void;
  setUserProfile: (profile: UserProfile) => void;
  setDbUser: (user: DbUser | null) => void;
  reloadArticles: () => void;
  showLanding: () => void;
  showHome: () => void;
  showCategory: (cat: Category) => void;
  openArticle: (id: string) => void;
  showAdmin: () => void;
  showProfile: () => void;
  loginWithGoogle: (profileType?: ArticleMode, planIntent?: string) => Promise<void>;
  loginWithEmail: (email: string, password: string, profileType?: ArticleMode, planIntent?: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, profileType?: ArticleMode, planIntent?: string) => Promise<void>;
  logout: () => Promise<void>;
  openAuthModal: (intent?: string) => void;
  closeAuthModal: () => void;
  trackArticleView: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsDesktopMenuCollapsed: (isCollapsed: boolean) => void;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

// Rôles legacy à migrer (n'élève PAS le privilège — toujours rétrograde vers patient).
const LEGACY_ROLES = ['free', 'pro', 'expert', 'institution'];

function deriveMode(role: UserProfile): ArticleMode {
  if (role === 'admin' || role === 'medecin_nuc') return 'medecin_nuc';
  if (role === 'medecin_non_nuc') return 'medecin_non_nuc';
  return 'patient';
}

export function AtlasProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');
  const [globalMode, setGlobalMode] = useState<ArticleMode>('medecin_nuc');
  const [articleMode, setArticleMode] = useState<ArticleMode>('medecin_nuc');
  const [lang, setLang] = useState('fr');
  const [userProfile, setUserProfile] = useState<UserProfile>('patient');
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuCollapsed, setIsDesktopMenuCollapsed] = useState(false);

  // Auth effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (!user) {
        setDbUser(null);
        setUserProfile('patient');
        setGlobalMode('patient');
        setArticleMode('patient');
        setAuthLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          setDbUser(null);
          setUserProfile('patient');
          setGlobalMode('patient');
          setArticleMode('patient');
          return;
        }

        const data = userDoc.data() as DbUser;
        const updates: Partial<DbUser> = { lastLogin: new Date().toISOString() };

        // Migration silencieuse des rôles legacy — rétrograde vers patient (jamais élève).
        if (LEGACY_ROLES.includes(data.role as string)) {
          updates.role = 'patient';
          updates.profileType = 'patient';
        }

        if (Object.keys(updates).length > 0) {
          try {
            await setDoc(userDocRef, updates, { merge: true });
            Object.assign(data, updates);
          } catch (err) {
            console.warn('[atlas] Impossible de mettre à jour le profil utilisateur', err);
          }
        }

        setDbUser(data);
        setUserProfile(data.role);
        const newMode = deriveMode(data.role);
        setGlobalMode(newMode);
        setArticleMode(newMode);
      } catch (error) {
        console.error('[atlas] Erreur lors du chargement du profil utilisateur', error);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Articles — chargement initial de la LISTE via l'API interne mise en cache
  // (/api/articles), et NON plus par une lecture directe de toute la collection
  // Firestore depuis le client. Cela découple le nombre de lectures Firestore du
  // trafic (le point d'API ne lit Firestore qu'une fois par heure), ce qui évite
  // d'épuiser le quota gratuit de lectures/jour. L'article lui-même reste rendu
  // côté serveur (ISR) ; ce cache client sert les listes (catégories, recherche,
  // favoris, cartes).
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setArticlesError(null);
    try {
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { articles?: Record<string, unknown>[] };
      const fetchedArticles: Article[] = (json.articles ?? []).map((d) =>
        articleFromDocData(d)
      );
      setAllArticles(fetchedArticles);
    } catch (error) {
      console.error('[atlas] Chargement des articles impossible', error);
      setArticlesError(
        'Vérifiez votre connexion internet puis réessayez. Si le problème persiste, le service est momentanément indisponible.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  const articles = useMemo(() => {
    const allowedAudiences = getAllowedAudiences(userProfile);
    return allArticles.filter((a) => {
      if (!a.targetAudience || a.targetAudience.length === 0) return true;
      return a.targetAudience.some((audience) => allowedAudiences.includes(audience));
    });
  }, [allArticles, userProfile]);

  const ensureUserDoc = useCallback(
    async (firebaseUser: FirebaseUser, profileType: ArticleMode, planIntent: string) => {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(userDocRef);

      if (!snap.exists()) {
        const base: DbUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          // Aucun privilège élevé en self-create : on saute à patient ; pour devenir
          // medecin_*, l'utilisateur passe par une demande role_requests.
          role: profileType === 'medecin_nuc' ? 'medecin_non_nuc' : profileType,
          profileType,
          displayName: firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? '',
          photoURL: firebaseUser.photoURL ?? '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        if (planIntent && planIntent !== 'patient') base.intendedPlan = planIntent;
        await setDoc(userDocRef, base);
        setDbUser(base);
        setUserProfile(base.role);
        const newMode = deriveMode(base.role);
        setGlobalMode(newMode);
        setArticleMode(newMode);
        return;
      }

      const data = snap.data() as DbUser;
      const updates: Partial<DbUser> = { lastLogin: new Date().toISOString() };
      if (LEGACY_ROLES.includes(data.role as string)) {
        updates.role = 'patient';
        updates.profileType = 'patient';
      }
      if (planIntent && planIntent !== 'patient') {
        updates.intendedPlan = planIntent;
      }
      await setDoc(userDocRef, updates, { merge: true });
      const merged: DbUser = { ...data, ...updates };
      setDbUser(merged);
      setUserProfile(merged.role);
      const newMode = deriveMode(merged.role);
      setGlobalMode(newMode);
      setArticleMode(newMode);
    },
    []
  );

  const loginWithGoogle = useCallback(
    async (profileType: ArticleMode = 'patient', planIntent: string = 'patient') => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      await ensureUserDoc(result.user, profileType, planIntent);
    },
    [ensureUserDoc]
  );

  const loginWithEmail = useCallback(
    async (email: string, password: string, profileType: ArticleMode = 'patient', planIntent: string = 'patient') => {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const result = await signInWithEmailAndPassword(auth, email, password);
      await ensureUserDoc(result.user, profileType, planIntent);
    },
    [ensureUserDoc]
  );

  const signupWithEmail = useCallback(
    async (email: string, password: string, profileType: ArticleMode = 'patient', planIntent: string = 'patient') => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await ensureUserDoc(result.user, profileType, planIntent);
    },
    [ensureUserDoc]
  );

  const openAuthModal = useCallback((intent?: string) => {
    setAuthIntent(intent ?? null);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setTimeout(() => setAuthIntent(null), 300);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    router.push('/');
  }, [router]);

  const showLanding = useCallback(() => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/');
  }, [router]);

  const showHome = useCallback(() => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/home');
  }, [router]);

  const showCategory = useCallback(
    (cat: Category) => {
      setSearchQuery('');
      setIsMobileMenuOpen(false);
      switch (cat) {
        case 'dashboard':
          router.push('/dashboard');
          break;
        case 'annuaire':
          router.push('/annuaire');
          break;
        case 'contact':
          router.push('/contact');
          break;
        case 'about':
          router.push('/mentions-legales');
          break;
        default:
          router.push(`/categories/${cat}`);
      }
    },
    [router]
  );

  const trackArticleView = useCallback(
    async (id: string) => {
      if (!authUser || !dbUser) return;
      try {
        const currentRecent = dbUser.recentArticles ?? [];
        const newRecent = [id, ...currentRecent.filter((aId) => aId !== id)].slice(0, 20);
        const userDocRef = doc(db, 'users', authUser.uid);
        await updateDoc(userDocRef, { recentArticles: newRecent });
        setDbUser({ ...dbUser, recentArticles: newRecent });
      } catch (err) {
        console.warn('[atlas] trackArticleView a échoué', err);
      }
    },
    [authUser, dbUser]
  );

  const openArticle = useCallback(
    (id: string) => {
      setArticleMode(globalMode);
      void trackArticleView(id);
      setIsMobileMenuOpen(false);
      router.push(`/articles/${id}`);
    },
    [globalMode, router, trackArticleView]
  );

  const showAdmin = useCallback(() => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/admin');
  }, [router]);

  const showProfile = useCallback(() => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/profile');
  }, [router]);

  const handleGlobalMode = useCallback(
    (mode: ArticleMode) => {
      setGlobalMode(mode);
      if (pathname?.startsWith('/articles/')) setArticleMode(mode);
    },
    [pathname]
  );

  const handleUserProfile = useCallback(
    (profile: UserProfile) => {
      setUserProfile(profile);
      const newMode = deriveMode(profile);
      setGlobalMode(newMode);
      if (pathname?.startsWith('/articles/')) setArticleMode(newMode);
    },
    [pathname]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!authUser || !dbUser) return;
      try {
        const currentFavorites = dbUser.favorites ?? [];
        const isFavorite = currentFavorites.includes(id);
        const newFavorites = isFavorite
          ? currentFavorites.filter((aId) => aId !== id)
          : [...currentFavorites, id];
        const userDocRef = doc(db, 'users', authUser.uid);
        await updateDoc(userDocRef, { favorites: newFavorites });
        setDbUser({ ...dbUser, favorites: newFavorites });
      } catch (err) {
        console.warn('[atlas] toggleFavorite a échoué', err);
      }
    },
    [authUser, dbUser]
  );

  return (
    <AtlasContext.Provider
      value={{
        searchQuery,
        globalMode,
        articleMode,
        lang,
        articles,
        loading,
        articlesError,
        userProfile,
        authUser,
        dbUser,
        authLoading,
        isAuthModalOpen,
        authIntent,
        isMobileMenuOpen,
        isDesktopMenuCollapsed,
        setSearchQuery,
        setGlobalMode: handleGlobalMode,
        setArticleMode,
        setLang,
        setUserProfile: handleUserProfile,
        setDbUser,
        reloadArticles: loadArticles,
        showLanding,
        showHome,
        showCategory,
        openArticle,
        showAdmin,
        showProfile,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
        openAuthModal,
        closeAuthModal,
        trackArticleView,
        toggleFavorite,
        setIsMobileMenuOpen,
        setIsDesktopMenuCollapsed,
      }}
    >
      {children}
    </AtlasContext.Provider>
  );
}

export function useAtlas() {
  const context = useContext(AtlasContext);
  if (context === undefined) {
    throw new Error('useAtlas must be used within an AtlasProvider');
  }
  return context;
}
