'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ArticleMode, Category, Article, UserProfile, ENTRIES, getAllowedAudiences } from './data';
import { db, auth } from './firebase';
import { collection, onSnapshot, query, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { handleFirestoreError, OperationType } from './firestore-errors';

export interface DbUser {
  uid: string;
  email: string;
  role: 'free' | 'pro' | 'expert' | 'institution' | 'admin';
  profileType?: 'patient' | 'medecin_non_nuc' | 'medecin_nuc';
  intendedPlan?: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: string;
  lastLogin?: string;
}

interface AtlasState {
  view: 'landing' | 'home' | 'grid' | 'article' | 'admin';
  currentCategory: Category;
  currentArticle: string | null;
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
}

interface AtlasContextType extends AtlasState {
  setView: (view: 'landing' | 'home' | 'grid' | 'article') => void;
  setCurrentCategory: (cat: Category) => void;
  setCurrentArticle: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setGlobalMode: (mode: ArticleMode) => void;
  setArticleMode: (mode: ArticleMode) => void;
  setLang: (lang: string) => void;
  setUserProfile: (profile: UserProfile) => void;
  showLanding: () => void;
  showHome: () => void;
  showCategory: (cat: Category) => void;
  openArticle: (id: string) => void;
  showAdmin: () => void;
  loginWithGoogle: (profileType?: 'patient' | 'medecin_non_nuc' | 'medecin_nuc', planIntent?: string) => Promise<void>;
  logout: () => Promise<void>;
  openAuthModal: (intent?: string) => void;
  closeAuthModal: () => void;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<'landing' | 'home' | 'grid' | 'article' | 'admin'>('landing');
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [currentArticle, setCurrentArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalMode, setGlobalMode] = useState<ArticleMode>('pro');
  const [articleMode, setArticleMode] = useState<ArticleMode>('pro');
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
            setDbUser(data);
            // Update last login
            await setDoc(userDocRef, { lastLogin: new Date().toISOString() }, { merge: true });
          } else {
            // Create new user profile if it somehow bypassed loginWithGoogle
            const newUser: DbUser = {
              uid: user.uid,
              email: user.email || '',
              role: 'free', // Default role
              profileType: 'medecin_nuc',
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };
            await setDoc(userDocRef, newUser);
            setDbUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching/creating user profile:", error);
        }
      } else {
        setDbUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Articles Effect
  useEffect(() => {
    const q = query(collection(db, 'articles'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      
      // Merge with ENTRIES to ensure local changes are visible
      const mergedArticles = [...ENTRIES];
      fetchedArticles.forEach(fetched => {
        const index = mergedArticles.findIndex(e => e.id === fetched.id);
        if (index === -1) {
          mergedArticles.push(fetched);
        } else {
          mergedArticles[index] = ENTRIES.find(e => e.id === fetched.id) || fetched;
        }
      });
      
      setAllArticles(mergedArticles);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'articles');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const articles = React.useMemo(() => {
    const allowedAudiences = getAllowedAudiences(userProfile);
    return allArticles.filter(a => {
      if (!a.targetAudience || a.targetAudience.length === 0) return true;
      return a.targetAudience.some(audience => allowedAudiences.includes(audience));
    });
  }, [allArticles, userProfile]);

  const loginWithGoogle = async (profileType: 'patient' | 'medecin_non_nuc' | 'medecin_nuc' = 'patient', planIntent: string = 'free') => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        const newUser: DbUser = {
          uid: user.uid,
          email: user.email || '',
          role: 'free',
          profileType: profileType,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        if (planIntent) {
          newUser.intendedPlan = planIntent;
        }
        await setDoc(userDocRef, newUser);
        setDbUser(newUser);
      } else {
        const updateData: any = { lastLogin: new Date().toISOString() };
        if (planIntent && planIntent !== 'free') {
          updateData.intendedPlan = planIntent;
        }
        await setDoc(userDocRef, updateData, { merge: true });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
      setView('landing'); // Redirect to landing on logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const showLanding = () => {
    setView('landing');
    setCurrentCategory('all');
    setSearchQuery('');
  };

  const showHome = () => {
    setView('home');
    setCurrentCategory('all');
    setSearchQuery('');
  };

  const showCategory = (cat: Category) => {
    setView('grid');
    setCurrentCategory(cat);
    setSearchQuery('');
  };

  const openArticle = (id: string) => {
    setView('article');
    setCurrentArticle(id);
    setArticleMode(globalMode);
  };

  const showAdmin = () => {
    setView('admin');
    setSearchQuery('');
  };

  const handleGlobalMode = (mode: ArticleMode) => {
    setGlobalMode(mode);
    if (view === 'article') {
      setArticleMode(mode);
    }
  };

  const handleUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    const newMode = profile === 'patient' ? 'patient' : 'pro';
    setGlobalMode(newMode);
    if (view === 'article') {
      setArticleMode(newMode);
    }
  };

  return (
    <AtlasContext.Provider
      value={{
        view,
        currentCategory,
        currentArticle,
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
        setView,
        setCurrentCategory,
        setCurrentArticle,
        setSearchQuery,
        setGlobalMode: handleGlobalMode,
        setArticleMode,
        setLang,
        setUserProfile: handleUserProfile,
        showLanding,
        showHome,
        showCategory,
        openArticle,
        showAdmin,
        loginWithGoogle,
        logout,
        openAuthModal,
        closeAuthModal,
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
