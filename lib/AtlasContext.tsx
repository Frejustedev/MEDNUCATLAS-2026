'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArticleMode, Category, Article, UserProfile, ENTRIES, getAllowedAudiences } from './data';
import { db, auth } from './firebase';
import { collection, onSnapshot, query, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { handleFirestoreError, OperationType } from './firestore-errors';

export interface DbUser {
  uid: string;
  email: string;
  role: UserProfile;
  profileType?: UserProfile;
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
  userProfile: UserProfile;
  authUser: FirebaseUser | null;
  dbUser: DbUser | null;
  authLoading: boolean;
  isAuthModalOpen: boolean;
  authIntent: string | null;
  isMobileMenuOpen: boolean;
}

interface AtlasContextType extends AtlasState {
  setSearchQuery: (query: string) => void;
  setGlobalMode: (mode: ArticleMode) => void;
  setArticleMode: (mode: ArticleMode) => void;
  setLang: (lang: string) => void;
  setUserProfile: (profile: UserProfile) => void;
  setDbUser: (user: DbUser | null) => void;
  showLanding: () => void;
  showHome: () => void;
  showCategory: (cat: Category) => void;
  openArticle: (id: string) => void;
  showAdmin: () => void;
  showProfile: () => void;
  loginWithGoogle: (profileType?: UserProfile, planIntent?: string) => Promise<void>;
  loginWithEmail: (email: string, password: string, profileType?: UserProfile, planIntent?: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, profileType?: UserProfile, planIntent?: string) => Promise<void>;
  logout: () => Promise<void>;
  openAuthModal: (intent?: string) => void;
  closeAuthModal: () => void;
  trackArticleView: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

export function AtlasProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [globalMode, setGlobalMode] = useState<ArticleMode>('medecin_nuc');
  const [articleMode, setArticleMode] = useState<ArticleMode>('medecin_nuc');
  const [lang, setLang] = useState('fr');
  const [userProfile, setUserProfile] = useState<UserProfile>('medecin_nuc');
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data() as DbUser;
            
            // Migrate legacy roles or force admin
            let needsMigration = false;
            let updatedRole = data.role;
            let updatedProfileType = data.profileType;
            
            if (user.email === 'agbotonfrejuste@gmail.com' && (data.role !== 'admin' || data.profileType !== 'medecin_nuc')) {
              updatedRole = 'admin';
              updatedProfileType = 'medecin_nuc';
              needsMigration = true;
            } else if (['free', 'pro', 'expert', 'institution'].includes(data.role as string)) {
              updatedRole = 'patient';
              updatedProfileType = 'patient';
              needsMigration = true;
            }
            
            if (needsMigration) {
              await setDoc(userDocRef, { 
                role: updatedRole,
                profileType: updatedProfileType,
                lastLogin: new Date().toISOString() 
              }, { merge: true });
              data.role = updatedRole;
              data.profileType = updatedProfileType;
            } else {
              // Update last login
              await setDoc(userDocRef, { lastLogin: new Date().toISOString() }, { merge: true });
            }
            
            setDbUser(data);
            setUserProfile(data.role);
            const newMode = data.role === 'patient' ? 'patient' : (data.role === 'medecin_non_nuc' ? 'medecin_non_nuc' : 'medecin_nuc');
            setGlobalMode(newMode);
            setArticleMode(newMode);
          } else {
            // Document will be created by handleAuthResult during signup
            setDbUser(null);
            setUserProfile('patient');
            setGlobalMode('patient');
            setArticleMode('patient');
          }
        } catch (error) {
          console.error("Error fetching/creating user profile:", error);
        }
      } else {
        setDbUser(null);
        setUserProfile('patient');
        setGlobalMode('patient');
        setArticleMode('patient');
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Articles Effect
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, 'articles'));
        const snapshot = await getDocs(q);
        const fetchedArticles: Article[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: data.id,
            cat: data.cat,
            catLabel: data.catLabel,
            title: data.title,
            tags: data.tags || [],
            difficulty: data.difficulty,
            excerpt: data.excerpt,
            targetAudience: data.targetAudience || ['medecin_nuc', 'medecin_non_nuc', 'patient'],
            content: typeof data.content === 'string' ? JSON.parse(data.content) : data.content
          } as Article;
        });
        
        if (fetchedArticles.length > 0) {
          setAllArticles(fetchedArticles);
        } else {
          setAllArticles(ENTRIES);
        }
      } catch (error) {
        console.error("Erreur de chargement des articles", error);
        setAllArticles(ENTRIES);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const articles = React.useMemo(() => {
    const allowedAudiences = getAllowedAudiences(userProfile);
    return allArticles.filter(a => {
      if (!a.targetAudience || a.targetAudience.length === 0) return true;
      return a.targetAudience.some(audience => allowedAudiences.includes(audience));
    });
  }, [allArticles, userProfile]);

  const handleAuthResult = async (user: any, profileType: UserProfile, planIntent: string) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      let finalRole = profileType;
      let finalProfileType = profileType;
      
      if (user.email === 'agbotonfrejuste@gmail.com') {
        finalRole = 'admin';
        finalProfileType = 'medecin_nuc';
      }

      const newUser: DbUser = {
        uid: user.uid,
        email: user.email || '',
        role: finalRole,
        profileType: finalProfileType,
        displayName: user.displayName || user.email?.split('@')[0] || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      if (planIntent) {
        newUser.intendedPlan = planIntent;
      }
      await setDoc(userDocRef, newUser);
      setDbUser(newUser);
      setUserProfile(newUser.role);
      const newMode = newUser.role === 'patient' ? 'patient' : (newUser.role === 'medecin_non_nuc' ? 'medecin_non_nuc' : 'medecin_nuc');
      setGlobalMode(newMode);
      setArticleMode(newMode);
    } else {
      const data = userDoc.data() as DbUser;
      const updateData: any = { lastLogin: new Date().toISOString() };
      
      // Migrate legacy roles or force admin
      if (user.email === 'agbotonfrejuste@gmail.com' && (data.role !== 'admin' || data.profileType !== 'medecin_nuc')) {
        updateData.role = 'admin';
        updateData.profileType = 'medecin_nuc';
      } else if (['free', 'pro', 'expert', 'institution'].includes(data.role as string)) {
        updateData.role = 'patient';
        updateData.profileType = 'patient';
      }
      
      if (planIntent && planIntent !== 'patient') {
        updateData.intendedPlan = planIntent;
      }
      await setDoc(userDocRef, updateData, { merge: true });
      
      // Update local state if role was migrated
      const finalRole = updateData.role || data.role;
      setUserProfile(finalRole);
      const newMode = finalRole === 'patient' ? 'patient' : (finalRole === 'medecin_non_nuc' ? 'medecin_non_nuc' : 'medecin_nuc');
      setGlobalMode(newMode);
      setArticleMode(newMode);
    }
  };

  const loginWithGoogle = async (profileType: UserProfile = 'patient', planIntent: string = 'patient') => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      await handleAuthResult(result.user, profileType, planIntent);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string, profileType: UserProfile = 'patient', planIntent: string = 'patient') => {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleAuthResult(result.user, profileType, planIntent);
    } catch (error) {
      console.error("Error signing in with Email:", error);
      throw error;
    }
  };

  const signupWithEmail = async (email: string, password: string, profileType: UserProfile = 'patient', planIntent: string = 'patient') => {
    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await handleAuthResult(result.user, profileType, planIntent);
    } catch (error) {
      console.error("Error signing up with Email:", error);
      throw error;
    }
  };

  const openAuthModal = (intent?: string) => {
    setAuthIntent(intent || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setTimeout(() => setAuthIntent(null), 300);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to landing on logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const showLanding = () => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const showHome = () => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/home');
  };

  const showCategory = (cat: Category) => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    if (cat === 'dashboard') {
      router.push('/dashboard');
    } else if (cat === 'annuaire') {
      router.push('/annuaire');
    } else if (cat === 'contact') {
      router.push('/contact');
    } else if (cat === 'about') {
      router.push('/mentions-legales');
    } else {
      router.push(`/categories/${cat}`);
    }
  };

  const openArticle = (id: string) => {
    setArticleMode(globalMode);
    trackArticleView(id);
    setIsMobileMenuOpen(false);
    router.push(`/articles/${id}`);
  };

  const showAdmin = () => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/admin');
  };

  const showProfile = () => {
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    router.push('/profile');
  };

  const handleGlobalMode = (mode: ArticleMode) => {
    setGlobalMode(mode);
    if (pathname.startsWith('/articles/')) {
      setArticleMode(mode);
    }
  };

  const handleUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    const newMode = profile === 'patient' ? 'patient' : (profile === 'medecin_non_nuc' ? 'medecin_non_nuc' : 'medecin_nuc');
    setGlobalMode(newMode);
    if (pathname.startsWith('/articles/')) {
      setArticleMode(newMode);
    }
  };

  const trackArticleView = async (id: string) => {
    if (!authUser || !dbUser) return;
    try {
      const currentRecent = dbUser.recentArticles || [];
      const newRecent = [id, ...currentRecent.filter(aId => aId !== id)].slice(0, 20); // Keep last 20
      
      const userDocRef = doc(db, 'users', authUser.uid);
      await setDoc(userDocRef, { recentArticles: newRecent }, { merge: true });
      setDbUser({ ...dbUser, recentArticles: newRecent });
    } catch (error) {
      console.error("Error tracking article view:", error);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!authUser || !dbUser) return;
    try {
      const currentFavorites = dbUser.favorites || [];
      const isFavorite = currentFavorites.includes(id);
      const newFavorites = isFavorite 
        ? currentFavorites.filter(aId => aId !== id)
        : [...currentFavorites, id];
      
      const userDocRef = doc(db, 'users', authUser.uid);
      await setDoc(userDocRef, { favorites: newFavorites }, { merge: true });
      setDbUser({ ...dbUser, favorites: newFavorites });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <AtlasContext.Provider
      value={{
        searchQuery,
        globalMode,
        articleMode,
        lang,
        articles,
        loading,
        userProfile,
        authUser,
        dbUser,
        authLoading,
        isAuthModalOpen,
        authIntent,
        isMobileMenuOpen,
        setSearchQuery,
        setGlobalMode: handleGlobalMode,
        setArticleMode,
        setLang,
        setUserProfile: handleUserProfile,
        setDbUser,
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
