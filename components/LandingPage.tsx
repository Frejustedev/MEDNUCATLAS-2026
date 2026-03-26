'use client';

import React from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Heart, Target, Bone, Shield, FlaskConical, Stethoscope, BookOpen, Search, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

export function LandingPage() {
  const { showHome, authUser, openAuthModal } = useAtlas();

  return (
    <div className="h-screen bg-bg text-text-main font-sans overflow-x-hidden overflow-y-auto">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-bg/85 backdrop-blur-xl border-b border-border-main">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 text-teal shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,201,177,0.3)]" fill="none" stroke="currentColor" strokeWidth="3">
              <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(30 50 50)" />
              <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(90 50 50)" />
              <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(150 50 50)" />
              <circle cx="86" cy="71" r="5" fill="currentColor" stroke="none" transform="rotate(30 50 50)" />
              <circle cx="50" cy="8" r="5" fill="currentColor" stroke="none" transform="rotate(90 50 50)" />
              <circle cx="14" cy="71" r="5" fill="currentColor" stroke="none" transform="rotate(150 50 50)" />
              <circle cx="50" cy="50" r="16" fill="currentColor" stroke="none" />
              <text x="50" y="55" fontSize="16" fontWeight="bold" fill="#0B0F19" stroke="none" textAnchor="middle" fontFamily="serif">Nc</text>
            </svg>
          </div>
          <div className="font-serif text-2xl font-semibold tracking-wide text-text-main ml-1">
            Nucle<span className="text-[#C8A96E]">Atlas</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#atlas" className="text-text2 text-sm tracking-wide hover:text-teal transition-colors">Encyclopédie</a>
          <a href="#audience" className="text-text2 text-sm tracking-wide hover:text-teal transition-colors">Pour qui ?</a>
          <a href="#tech" className="text-text2 text-sm tracking-wide hover:text-teal transition-colors">Technologie</a>
          <a href="#pricing" className="text-text2 text-sm tracking-wide hover:text-teal transition-colors">Prix</a>
          <div className="flex items-center gap-4 border-l border-border-main pl-8">
            <ThemeToggle />
            {authUser ? (
              <button 
                onClick={showHome}
                className="bg-teal text-bg px-5 py-2 rounded-md font-medium hover:bg-teal2 transition-colors"
              >
                Accéder à l&apos;Atlas
              </button>
            ) : (
              <button 
                onClick={() => openAuthModal()}
                className="bg-teal text-bg px-5 py-2 rounded-md font-medium hover:bg-teal2 transition-colors"
              >
                Se connecter
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,rgba(0,201,177,0.07)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(200,169,110,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(var(--color-teal)_1px,transparent_1px),linear-gradient(90deg,var(--color-teal)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-3 bg-teal/5 border border-border-main px-4 py-2 rounded-full text-xs tracking-wide text-text2 mb-8">
              <span className="flex items-center gap-1.5 text-teal font-medium">
                <Shield className="w-3.5 h-3.5" />
                Paiement sécurisé
              </span>
              <span className="w-1 h-1 rounded-full bg-border-main" />
              <span className="flex items-center gap-2.5 opacity-80">
                <span className="font-bold text-[10px] italic text-blue-400">VISA</span>
                <div className="flex -space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 mix-blend-screen" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 mix-blend-screen" />
                </div>
                <span className="font-mono text-[10px] font-semibold text-orange-400">ORANGE</span>
                <span className="font-mono text-[10px] font-semibold text-yellow-400">MTN</span>
                <span className="font-mono text-[10px] font-semibold text-blue-300">WAVE</span>
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-[88px] font-light leading-[1.05] tracking-tight mb-6">
              La référence mondiale<br />
              de la <em className="not-italic italic text-teal">Médecine</em> <em className="not-italic italic text-gold">Nucléaire</em>
            </h1>
            
            <p className="text-[17px] text-text2 leading-[1.7] max-w-xl mb-12">
              Encyclopédie trilingue de médecine nucléaire et d&apos;imagerie moléculaire — conçue par des cliniciens, pour des cliniciens et leurs patients.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={authUser ? showHome : () => openAuthModal()}
                className="bg-teal text-bg px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide hover:bg-teal2 hover:-translate-y-px transition-all shadow-[0_0_30px_rgba(0,201,177,0.3)] hover:shadow-[0_0_40px_rgba(0,201,177,0.4)]"
              >
                {authUser ? "Explorer l&apos;Atlas →" : "Commencer gratuitement →"}
              </button>
              <button 
                onClick={showHome}
                className="text-text2 px-8 py-3.5 rounded-lg text-sm border border-border-main hover:border-teal hover:text-teal transition-all"
              >
                Voir un aperçu
              </button>
            </div>
            
            <div className="flex gap-2 mt-12">
              <span className="px-3 py-1 rounded font-mono text-[11px] tracking-wide border border-teal/30 text-teal">FR Français</span>
              <span className="px-3 py-1 rounded font-mono text-[11px] tracking-wide border border-gold/30 text-gold">EN English</span>
              <span className="px-3 py-1 rounded font-mono text-[11px] tracking-wide border border-text2/30 text-text2">AR عربي</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="hidden lg:grid absolute right-12 top-1/2 -translate-y-1/2 w-[420px] gap-3 z-10"
        >
          <div className="bg-bg3 border border-border-main rounded-xl p-5 md:p-6 hover:border-teal/30 hover:-translate-x-1 transition-all">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-teal mb-2">Entrée récente</div>
            <div className="font-serif text-xl text-text-main mb-1">Scintigraphie thyroïdienne</div>
            <div className="text-xs text-text3 leading-[1.5]">Exploration fonctionnelle de la thyroïde par administration d&apos;iode radioactif (¹²³I ou ¹³¹I)...</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/10 text-teal2 border border-teal/15">Thyroïde</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/10 text-teal2 border border-teal/15">Iode-131</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/15">Protocole</span>
            </div>
          </div>
          <div className="bg-bg3 border border-border-main rounded-xl p-5 md:p-6 hover:border-teal/30 hover:-translate-x-1 transition-all">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-teal mb-2">Radiopharmaceutique</div>
            <div className="font-serif text-xl text-text-main mb-1">Technétium-99m</div>
            <div className="text-xs text-text3 leading-[1.5]">Radionucléide le plus utilisé en médecine nucléaire diagnostique. T½ = 6h...</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/10 text-teal2 border border-teal/15">Tc-99m</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/15">Dosimétrie</span>
            </div>
          </div>
          <div className="bg-bg3 border border-border-main rounded-xl p-5 md:p-6 hover:border-teal/30 hover:-translate-x-1 transition-all">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-teal mb-2">Guide patient</div>
            <div className="font-serif text-xl text-text-main mb-1">TEP-scanner</div>
            <div className="text-xs text-text3 leading-[1.5]">Explication accessible de la tomographie par émission de positons pour les patients...</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/10 text-teal2 border border-teal/15">PET-CT</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/10 text-teal2 border border-teal/15">FDG</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/15">Patient</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-y border-border-main p-6 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-main"
      >
        <div className="bg-bg2 p-8 md:p-10 text-center">
          <div className="font-serif text-4xl md:text-[52px] font-light text-teal leading-none mb-2">500<span className="text-[28px]">+</span></div>
          <div className="text-xs text-text3 tracking-wide">Entrées encyclopédiques</div>
        </div>
        <div className="bg-bg2 p-8 md:p-10 text-center">
          <div className="font-serif text-4xl md:text-[52px] font-light text-teal leading-none mb-2">3</div>
          <div className="text-xs text-text3 tracking-wide">Langues (FR / EN / AR)</div>
        </div>
        <div className="bg-bg2 p-8 md:p-10 text-center">
          <div className="font-serif text-4xl md:text-[52px] font-light text-teal leading-none mb-2">2</div>
          <div className="text-xs text-text3 tracking-wide">Audiences (Pro & Patient)</div>
        </div>
        <div className="bg-bg2 p-8 md:p-10 text-center">
          <div className="font-serif text-4xl md:text-[52px] font-light text-teal leading-none mb-2">100<span className="text-[28px]">%</span></div>
          <div className="text-xs text-text3 tracking-wide">Validé par des cliniciens</div>
        </div>
      </motion.div>

      {/* AUDIENCE */}
      <section id="audience" className="px-6 md:px-12 py-24 md:py-[100px]">
        <div className="font-mono text-[11px] tracking-[3px] uppercase text-teal mb-4">Pour qui ?</div>
        <h2 className="font-serif text-4xl md:text-[52px] font-light leading-[1.15] mb-4">
          Une encyclopédie,<br /><em className="not-italic italic text-gold">deux univers</em>
        </h2>
        <p className="text-[15px] text-text2 leading-[1.7] max-w-xl">
          Chaque contenu est adapté à son lecteur. Le professionnel accède au détail clinique. Le patient comprend sans jargon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-16 bg-border-main rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12 bg-bg2 relative overflow-hidden group hover:bg-bg3 transition-colors">
            <div className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full bg-teal opacity-5" />
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-teal mb-5">⚕ Professionnels</div>
            <h3 className="font-serif text-3xl mb-4 leading-[1.2]">Pour les médecins<br />et résidents</h3>
            <p className="text-sm text-text2 leading-[1.7] mb-7">Un outil de référence clinique complet, accessible en consultation, en garde ou en formation.</p>
            <ul className="flex flex-col gap-2.5">
              {['Protocoles de scintigraphie détaillés', 'Posologies et radiopharmaceutiques', 'Interprétation d\'images annotées', 'Références bibliographiques récentes', 'Cas cliniques commentés'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] text-text2">
                  <span className="font-mono text-xs text-teal shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-12 bg-bg2 relative overflow-hidden group hover:bg-bg3 transition-colors">
            <div className="absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full bg-gold opacity-5" />
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-gold mb-5">♡ Patients</div>
            <h3 className="font-serif text-3xl mb-4 leading-[1.2]">Pour les patients<br />et leurs proches</h3>
            <p className="text-sm text-text2 leading-[1.7] mb-7">Des explications claires, rassurantes et validées médicalement — sans jargon inaccessible.</p>
            <ul className="flex flex-col gap-2.5">
              {['Préparation aux examens scintigraphiques', 'Questions fréquentes sur la radioactivité', 'Guide post-traitement à l\'iode radioactif', 'Suivi thyroïdien expliqué', 'Disponible en arabe dialectal'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] text-text2">
                  <span className="font-mono text-xs text-gold shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ATLAS PREVIEW */}
      <section id="atlas" className="bg-bg2 px-6 md:px-12 py-24 md:py-[100px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-[11px] tracking-[3px] uppercase text-teal mb-4">Encyclopédie</div>
            <h2 className="font-serif text-4xl md:text-[52px] font-light leading-[1.15]">
              Quelques <em className="not-italic italic text-gold">entrées</em>
            </h2>
          </div>
          <button onClick={showHome} className="text-text2 px-8 py-3.5 rounded-lg text-sm border border-border-main hover:border-teal hover:text-teal transition-all whitespace-nowrap">
            Voir tout l&apos;atlas →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-main rounded-xl overflow-hidden">
          {[
            { num: 'MN·001', cat: 'Imagerie thyroïdienne', title: 'Scintigraphie thyroïdienne à l\'iode', excerpt: 'Méthode de référence pour l\'exploration fonctionnelle du tissu thyroïdien et des métastases de carcinomes différenciés...', tags: [{ l: '¹³¹I', c: 'teal' }, { l: '¹²³I', c: 'teal' }, { l: 'Protocole', c: 'gold' }] },
            { num: 'MN·002', cat: 'Radiopharmaceutiques', title: 'Technétium-99m : propriétés et usages', excerpt: 'Radionucléide idéal pour l\'imagerie diagnostique. Émetteur γ pur (140 keV), T½ = 6h, obtenu par générateur Mo-99/Tc-99m...', tags: [{ l: 'Tc-99m', c: 'teal' }, { l: 'Physique', c: 'gold' }] },
            { num: 'MN·003', cat: 'Cardio-nucléaire', title: 'Scintigraphie myocardique de perfusion', excerpt: 'Évaluation de la perfusion coronarienne au repos et à l\'effort. Sensibilité 87–89%, spécificité 73–85%...', tags: [{ l: 'SPECT', c: 'teal' }, { l: 'Stress test', c: 'teal' }] },
            { num: 'MN·004', cat: 'Oncologie nucléaire', title: 'TEP-TDM au FDG — principes', excerpt: 'La tomographie par émission de positons au fluorodésoxyglucose (¹⁸F-FDG) exploite l\'hypermétabolisme tumoral...', tags: [{ l: 'PET-CT', c: 'teal' }, { l: '¹⁸F-FDG', c: 'teal' }, { l: 'Oncologie', c: 'gold' }] },
            { num: 'MN·005', cat: 'Traitement', title: 'Radiothérapie interne vectorisée', excerpt: 'Utilisation de molécules radiomarquées à visée thérapeutique. PRRT, radiothérapie à l\'iode, théranostique...', tags: [{ l: 'PRRT', c: 'teal' }, { l: 'Lu-177', c: 'teal' }, { l: 'Théranostique', c: 'gold' }] },
            { num: 'MN·006', cat: 'Protection radiologique', title: 'Radioprotection en pratique clinique', excerpt: 'Principes ALARA, dosimétrie du personnel, gestion des déchets radioactifs, consignes post-thérapeutiques patients...', tags: [{ l: 'ALARA', c: 'teal' }, { l: 'Sécurité', c: 'gold' }] },
          ].map((entry, i) => (
            <div key={i} onClick={showHome} className="bg-bg3 p-8 hover:bg-bg4 transition-colors cursor-pointer group">
              <div className="font-mono text-[10px] text-text3 mb-4 tracking-wide">{entry.num}</div>
              <div className="font-serif text-[22px] mb-2 leading-[1.2] group-hover:text-teal transition-colors">{entry.title}</div>
              <div className="text-[11px] text-teal font-mono tracking-wide mb-3">{entry.cat}</div>
              <div className="text-xs text-text3 leading-[1.6]">{entry.excerpt}</div>
              <div className="mt-5 pt-4 border-t border-border-main flex gap-1.5 flex-wrap">
                {entry.tags.map((t, j) => (
                  <span key={j} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${t.c === 'gold' ? 'bg-gold/10 text-gold border-gold/15' : 'bg-teal/10 text-teal2 border-teal/15'}`}>
                    {t.l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="px-6 md:px-12 py-24 md:py-[100px]">
        <div className="font-mono text-[11px] tracking-[3px] uppercase text-teal mb-4">Technologie</div>
        <h2 className="font-serif text-4xl md:text-[52px] font-light leading-[1.15] mb-4">
          Construit pour <em className="not-italic italic text-gold">durer</em>
        </h2>
        <p className="text-[15px] text-text2 leading-[1.7] max-w-xl">
          Une architecture moderne pensée pour les contraintes réelles du terrain médical africain et maghrébin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {[
            { icon: Search, title: 'Recherche avancée', desc: 'Recherche sémantique et suggestions intelligentes pour trouver l\'entrée exacte en secondes.' },
            { icon: Zap, title: 'Mobile first', desc: 'Interface optimisée pour les smartphones Android. Consulter en garde, sans ordinateur.' },
            { icon: Activity, title: 'Mode hors-ligne', desc: 'Les entrées consultées sont disponibles sans connexion. Essentiel dans les contextes à faible débit.' },
            { icon: BookOpen, title: 'Trilingue natif', desc: 'FR / EN / AR construit dès l\'architecture. Pas une traduction automatique — une rédaction native.' }
          ].map((t, i) => (
            <div key={i} className="bg-bg2 border border-border-main rounded-[10px] p-7 hover:border-teal/30 hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-4 text-teal">
                <t.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] mb-2 text-text-main">{t.title}</h3>
              <p className="text-xs text-text3 leading-[1.6]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 md:px-12 py-24 md:py-[100px] bg-bg border-t border-border-main">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-border-main px-3 py-1.5 rounded-full text-[10px] tracking-[2px] uppercase text-teal mb-6 font-mono">
            Promotion de lancement
          </div>
          <h2 className="font-serif text-4xl md:text-[52px] font-light leading-[1.15] mb-6">
            Votre plan,<br /><em className="not-italic italic text-teal">100% Gratuit</em>
          </h2>
          <p className="text-[15px] text-text2 leading-[1.7] max-w-xl mx-auto">
            Cinq profils pensés pour chaque acteur de la médecine nucléaire — du grand public au spécialiste expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {/* Patient */}
          <div className="bg-bg2 border border-border-main rounded-2xl p-6 hover:bg-bg3 transition-colors flex flex-col">
            <div className="text-3xl mb-4">👤</div>
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-text3 mb-2">Patient</div>
            <div className="font-serif text-4xl font-light mb-1">0<span className="text-lg">€</span><span className="text-sm font-sans text-text3">/mois</span></div>
            <p className="text-xs text-text2 mb-6 min-h-[40px]">Découverte de l&apos;encyclopédie sans engagement.</p>
            <button onClick={authUser ? showHome : () => openAuthModal('patient')} className="w-full py-2.5 rounded-lg text-xs font-medium border border-border-main text-text2 hover:text-teal hover:border-teal transition-colors mb-6">Commencer</button>
            <div className="font-mono text-[9px] tracking-wider uppercase text-text3 mb-4">Inclus</div>
            <ul className="flex flex-col gap-3 flex-1">
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-text3">✓</span> Accès aux articles vulgarisés</li>
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-text3">✓</span> Mode lecture Patient</li>
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-text3">✓</span> FR / EN / AR</li>
            </ul>
          </div>

          {/* Médecin (Non MN) */}
          <div className="bg-bg2 border border-border-main rounded-2xl p-6 hover:bg-bg3 transition-colors flex flex-col">
            <div className="text-3xl mb-4">🩺</div>
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-teal mb-2">Médecin (Non MN)</div>
            <div className="font-serif text-4xl font-light mb-1 flex items-baseline gap-3">
              <span className="line-through text-text3 text-2xl">9€</span>
              <span className="text-teal">Gratuit</span>
            </div>
            <p className="text-xs text-text2 mb-6 min-h-[40px]">Référence clinique pour la pratique quotidienne.</p>
            <button onClick={authUser ? showHome : () => openAuthModal('medecin_non_nuc')} className="w-full py-2.5 rounded-lg text-xs font-medium bg-teal text-bg hover:bg-teal2 transition-colors mb-6 shadow-[0_0_15px_rgba(0,201,177,0.2)]">Activer Pro</button>
            <div className="font-mono text-[9px] tracking-wider uppercase text-text3 mb-4">Tout Patient, plus</div>
            <ul className="flex flex-col gap-3 flex-1">
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-teal">✓</span> Indications des examens</li>
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-teal">✓</span> Mode lecture Médecin</li>
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-teal">✓</span> Cas cliniques illustrés</li>
            </ul>
          </div>

          {/* Médecin Nucléaire */}
          <div className="bg-bg3 border-2 border-purple-500/50 rounded-2xl p-6 hover:border-purple-500 transition-colors flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(167,139,250,0.15)]">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-teal to-purple-500 animate-shimmer bg-[length:200%_100%]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-b-lg shadow-lg whitespace-nowrap">
              Expertise Complète
            </div>
            <div className="text-3xl mb-4 mt-2">⚛️</div>
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-purple-400 mb-2">Médecin Nucléaire</div>
            <div className="font-serif text-4xl font-light mb-1 flex items-baseline gap-3">
              <span className="line-through text-text3 text-2xl">25€</span>
              <span className="text-purple-400">Gratuit</span>
            </div>
            <p className="text-xs text-text2 mb-6 min-h-[40px]">L&apos;arsenal complet du spécialiste en médecine nucléaire.</p>
            <button onClick={authUser ? showHome : () => openAuthModal('medecin_nuc')} className="w-full py-2.5 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition-opacity mb-6 shadow-[0_0_20px_rgba(167,139,250,0.3)]">Accès Expert</button>
            <div className="font-mono text-[9px] tracking-wider uppercase text-text3 mb-4">Tout Médecin, plus</div>
            <ul className="flex flex-col gap-3 flex-1">
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-purple-400">✓</span> Protocoles d&apos;acquisition</li>
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-purple-400">✓</span> Radiopharmacie & Dosimétrie</li>
              <li className="flex items-start gap-2 text-xs text-text2"><span className="text-purple-400">✓</span> Mode lecture Expert</li>
            </ul>
          </div>
        </div>

        {/* Extra Plans (Institution) */}
        <div className="max-w-[1000px] mx-auto mt-6 grid grid-cols-1 gap-4">
          <div className="bg-bg2 border border-border-main rounded-xl p-5 flex items-center justify-between hover:border-gold/30 transition-colors">
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-gold mb-1">Hôpitaux & Cliniques</div>
              <div className="text-sm text-text2">Licence multi-utilisateurs <span className="line-through text-text3 text-xs ml-1">99€/mois</span> <span className="text-gold font-medium ml-1">Gratuit</span></div>
            </div>
            <button onClick={authUser ? showHome : () => openAuthModal('institution')} className="px-4 py-2 rounded-lg text-xs font-medium bg-gold/10 text-gold hover:bg-gold/20 transition-colors border border-gold/20">Contacter</button>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" className="px-6 md:px-12 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(0,201,177,0.06)_0%,transparent_70%)]" />
        <h2 className="font-serif text-4xl md:text-[72px] font-light leading-[1.1] mb-6 relative">
          Prêt à transformer<br /><em className="not-italic italic text-teal">votre pratique ?</em>
        </h2>
        <p className="text-text2 text-base mb-12 relative max-w-lg mx-auto">
          Rejoignez la communauté NucleAtlas aujourd&apos;hui.<br />Profitez de notre offre de lancement : <strong className="text-teal font-medium">tous les plans sont 100% gratuits</strong>.
        </p>
        <div className="flex flex-wrap gap-4 justify-center relative">
          {authUser ? (
            <button onClick={showHome} className="bg-teal text-bg px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide hover:bg-teal2 hover:-translate-y-px transition-all shadow-[0_0_30px_rgba(0,201,177,0.3)] hover:shadow-[0_0_40px_rgba(0,201,177,0.4)]">
              Aller au tableau de bord →
            </button>
          ) : (
            <>
              <button onClick={() => openAuthModal('patient')} className="bg-teal text-bg px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide hover:bg-teal2 hover:-translate-y-px transition-all shadow-[0_0_30px_rgba(0,201,177,0.3)] hover:shadow-[0_0_40px_rgba(0,201,177,0.4)]">
                Créer un compte gratuit →
              </button>
              <button onClick={() => openAuthModal('medecin_nuc')} className="text-text2 px-8 py-3.5 rounded-lg text-sm border border-border-main hover:border-teal hover:text-teal transition-all">
                Accéder à MN Expert (Gratuit)
              </button>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border-main px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-bg2">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
            <div className="relative flex items-center justify-center w-6 h-6 text-teal shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
                <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(30 50 50)" />
                <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(90 50 50)" />
                <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(150 50 50)" />
                <circle cx="86" cy="71" r="5" fill="currentColor" stroke="none" transform="rotate(30 50 50)" />
                <circle cx="50" cy="8" r="5" fill="currentColor" stroke="none" transform="rotate(90 50 50)" />
                <circle cx="14" cy="71" r="5" fill="currentColor" stroke="none" transform="rotate(150 50 50)" />
                <circle cx="50" cy="50" r="16" fill="currentColor" stroke="none" />
                <text x="50" y="55" fontSize="16" fontWeight="bold" fill="#0B0F19" stroke="none" textAnchor="middle" fontFamily="serif">Nc</text>
              </svg>
            </div>
            <div className="font-serif text-base font-semibold tracking-wide text-text-main ml-1">
              Nucle<span className="text-[#C8A96E]">Atlas</span>
            </div>
          </div>
          <p className="text-xs text-text3">© 2026 NucleAtlas. Tous droits réservés.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="text-xs text-text3 hover:text-teal transition-colors">Mentions légales</Link>
          <Link href="/contact" className="text-xs text-text3 hover:text-teal transition-colors">Contact</Link>
          <Link href="/contribuer" className="text-xs text-text3 hover:text-teal transition-colors">Contribuer</Link>
        </div>
      </footer>
    </div>
  );
}
