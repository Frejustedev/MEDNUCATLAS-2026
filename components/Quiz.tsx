'use client';

import React, { useState, useCallback } from 'react';
import { Sparkles, CheckCircle2, XCircle, Trophy, RotateCcw, Loader2, Medal } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import type { QuizQuestion } from '@/lib/data';

type ScoreRow = { pseudo: string; score: number; total: number; timeMs: number; articleTitle?: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function byScore(a: ScoreRow, b: ScoreRow) {
  return b.score - a.score || a.timeMs - b.timeMs;
}

/**
 * Quiz interactif (gabarit §23) : tirage aléatoire, correction justifiée
 * immédiate, score + chrono, et deux classements (cet article / global) via
 * la collection Firestore `quiz_scores`. Anti-triche basique (côté règles).
 */
export function Quiz({ articleId, articleTitle, questions }: { articleId: string; articleTitle?: string; questions?: QuizQuestion[] }) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [order, setOrder] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTs, setStartTs] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [pseudo, setPseudo] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [tab, setTab] = useState<'article' | 'global'>('article');
  const [boardArticle, setBoardArticle] = useState<ScoreRow[] | null>(null);
  const [boardGlobal, setBoardGlobal] = useState<ScoreRow[] | null>(null);

  const loadBoards = useCallback(async () => {
    try {
      const aSnap = await getDocs(query(collection(db, 'quiz_scores'), where('articleId', '==', articleId), limit(100)));
      setBoardArticle(aSnap.docs.map((d) => d.data() as ScoreRow).sort(byScore).slice(0, 10));
    } catch { setBoardArticle([]); }
    try {
      const gSnap = await getDocs(query(collection(db, 'quiz_scores'), orderBy('score', 'desc'), limit(50)));
      setBoardGlobal(gSnap.docs.map((d) => d.data() as ScoreRow).sort(byScore).slice(0, 10));
    } catch { setBoardGlobal([]); }
  }, [articleId]);

  if (!questions || questions.length === 0) return null;

  const start = () => {
    setOrder(shuffle(questions));
    setIdx(0); setSelected(null); setScore(0); setSubmitState('idle'); setPseudo('');
    setStartTs(Date.now()); setPhase('playing');
  };

  const current = order[idx];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 < order.length) { setIdx(idx + 1); setSelected(null); }
    else { setElapsedMs(Date.now() - startTs); setPhase('done'); loadBoards(); }
  };

  const submit = async () => {
    const name = pseudo.trim().slice(0, 30);
    if (!name) return;
    setSubmitState('saving');
    try {
      await addDoc(collection(db, 'quiz_scores'), {
        articleId, articleTitle: articleTitle ?? '', pseudo: name,
        score, total: order.length, timeMs: elapsedMs, createdAt: serverTimestamp(),
      });
      setSubmitState('saved');
      loadBoards();
    } catch { setSubmitState('error'); }
  };

  const Header = (
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="w-4 h-4 text-gold" aria-hidden="true" />
      <h3 className="font-serif text-[22px] font-normal text-text-main m-0">Quiz — testez vos connaissances</h3>
    </div>
  );

  return (
    <section aria-label="Quiz interactif" className="mt-10 p-5 md:p-6 rounded-xl border border-gold/20 bg-bg2">
      {Header}

      {phase === 'intro' && (
        <div>
          <p className="text-[13px] text-text2 mb-4">{questions.length} question(s) à tirage aléatoire, correction immédiate et classement. Bonne chance !</p>
          <button type="button" onClick={start} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-teal text-bg hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal">
            <Sparkles className="w-4 h-4" aria-hidden="true" /> Démarrer le quiz
          </button>
        </div>
      )}

      {phase === 'playing' && current && (
        <div>
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-text3">
            <span>Question {idx + 1} / {order.length}</span>
            <span>Score : {score}</span>
          </div>
          <div className="h-1 rounded bg-bg3 mb-5 overflow-hidden" aria-hidden="true">
            <div className="h-full bg-teal transition-all" style={{ width: `${((idx) / order.length) * 100}%` }} />
          </div>

          <p className="text-[15px] text-text-main font-medium mb-4">{current.question}</p>
          <div className="flex flex-col gap-2.5" role="group" aria-label="Réponses">
            {current.options.map((opt, i) => {
              const isAnswer = i === current.answer;
              const isPicked = i === selected;
              let cls = 'border-border-main bg-bg hover:bg-bg3';
              if (selected !== null) {
                if (isAnswer) cls = 'border-teal/50 bg-teal/10 text-teal';
                else if (isPicked) cls = 'border-red-500/50 bg-red-500/10 text-red-400';
                else cls = 'border-border-main bg-bg opacity-60';
              }
              return (
                <button key={i} type="button" onClick={() => choose(i)} disabled={selected !== null}
                  className={`text-left text-[13px] px-4 py-2.5 rounded-lg border transition-colors flex items-center gap-2.5 ${cls} focus:outline-none focus:ring-2 focus:ring-teal`}>
                  {selected !== null && isAnswer && <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  {selected !== null && isPicked && !isAnswer && <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-4">
              {current.explanation && (
                <div className="text-[12px] text-text2 leading-relaxed p-3 rounded-lg bg-bg border border-border-main mb-3">
                  <span className="font-medium text-text-main">Explication : </span>{current.explanation}
                </div>
              )}
              <button type="button" onClick={next} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-teal text-bg hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal">
                {idx + 1 < order.length ? 'Question suivante' : 'Voir le résultat'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-gold" aria-hidden="true" />
            <div>
              <div className="text-2xl font-light text-text-main">{score} / {order.length}</div>
              <div className="text-[11px] text-text3 font-mono">en {(elapsedMs / 1000).toFixed(0)} s</div>
            </div>
          </div>

          {submitState !== 'saved' ? (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} maxLength={30} placeholder="Votre pseudo"
                aria-label="Pseudo pour le classement"
                className="px-3 py-2 rounded-lg bg-bg border border-border-main text-[13px] text-text-main focus:outline-none focus:ring-2 focus:ring-teal" />
              <button type="button" onClick={submit} disabled={!pseudo.trim() || submitState === 'saving'}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gold text-bg hover:opacity-90 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gold">
                {submitState === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Medal className="w-4 h-4" aria-hidden="true" />}
                Enregistrer mon score
              </button>
              {submitState === 'error' && <span className="text-[12px] text-red-400">Échec de l’enregistrement.</span>}
              <button type="button" onClick={start} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] text-text3 hover:text-teal transition">
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Recommencer
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-6 text-[13px] text-teal">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Score enregistré.
              <button type="button" onClick={start} className="ml-2 inline-flex items-center gap-1.5 text-text3 hover:text-teal transition">
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Recommencer
              </button>
            </div>
          )}

          <div className="border-t border-border-main pt-4">
            <div className="flex gap-2 mb-3">
              <button type="button" onClick={() => setTab('article')} className={`px-3 py-1.5 rounded-lg text-[12px] font-mono transition ${tab === 'article' ? 'bg-teal text-bg' : 'bg-bg3 text-text3 hover:text-text-main'}`}>Cet article</button>
              <button type="button" onClick={() => setTab('global')} className={`px-3 py-1.5 rounded-lg text-[12px] font-mono transition ${tab === 'global' ? 'bg-teal text-bg' : 'bg-bg3 text-text3 hover:text-text-main'}`}>Classement global</button>
            </div>
            <Leaderboard rows={tab === 'article' ? boardArticle : boardGlobal} showArticle={tab === 'global'} />
            <p className="text-[10px] text-text3 mt-2 italic">Classement indicatif (anti-triche basique).</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Leaderboard({ rows, showArticle }: { rows: ScoreRow[] | null; showArticle: boolean }) {
  if (rows === null) return <div className="flex items-center gap-2 text-[12px] text-text3 py-3"><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Chargement…</div>;
  if (rows.length === 0) return <p className="text-[12px] text-text3 py-3">Aucun score pour le moment — soyez le premier !</p>;
  return (
    <ol className="flex flex-col gap-1">
      {rows.map((r, i) => (
        <li key={i} className="flex items-center gap-3 text-[12px] px-3 py-1.5 rounded-lg bg-bg border border-border-main">
          <span className={`font-mono w-5 text-center ${i === 0 ? 'text-gold' : i < 3 ? 'text-teal' : 'text-text3'}`}>{i + 1}</span>
          <span className="text-text-main truncate flex-1">{r.pseudo}</span>
          {showArticle && r.articleTitle ? <span className="text-text3 truncate hidden sm:block max-w-[40%]">{r.articleTitle}</span> : null}
          <span className="font-mono text-teal">{r.score}/{r.total}</span>
          <span className="font-mono text-text3">{(r.timeMs / 1000).toFixed(0)}s</span>
        </li>
      ))}
    </ol>
  );
}
