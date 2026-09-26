import React, { useState, useEffect } from 'react';
import { PuzzleGame } from './games/PuzzleGame';
import { TetrisGame } from './games/TetrisGame';
import { ColoringGame } from './games/ColoringGame';
import { MemoryGame } from './games/MemoryGame';
import { WordSearchGame } from './games/WordSearchGame';
import { WordGuessGame } from './games/WordGuessGame';
import { CharacterAvatar } from './CharacterAvatar';
import { Gamepad2, Trophy, Flame, ChevronRight, Sparkles, Star, Layers } from 'lucide-react';

type ActiveGame = 'puzzle' | 'tetris' | 'coloring' | 'memory' | 'wordsearch' | 'wordguess' | null;

export const GamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);
  const [levels, setLevels] = useState({
    puzzle: 1,
    tetris: 1,
    coloring: 1,
    memory: 1,
    wordsearch: 1,
    wordguess: 1,
  });

  useEffect(() => {
    setLevels({
      puzzle: parseInt(localStorage.getItem('sp_puzzle_level') || '0', 10) + 1,
      tetris: parseInt(localStorage.getItem('sp_tetris_level') || '0', 10) + 1,
      coloring: parseInt(localStorage.getItem('sp_coloring_level') || '0', 10) + 1,
      memory: parseInt(localStorage.getItem('sp_memory_level') || '0', 10) + 1,
      wordsearch: parseInt(localStorage.getItem('sp_wordsearch_level') || '0', 10) + 1,
      wordguess: parseInt(localStorage.getItem('sp_wordguess_level') || '0', 10) + 1,
    });
  }, [activeGame]);

  if (activeGame === 'puzzle') return <PuzzleGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'tetris') return <TetrisGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'coloring') return <ColoringGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'memory') return <MemoryGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'wordsearch') return <WordSearchGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'wordguess') return <WordGuessGame onBack={() => setActiveGame(null)} />;

  const gameCards = [
    {
      id: 'wordguess' as const,
      title: 'Adivina la Palabra',
      subtitle: 'Encuentra a JESÚS y promesas de Dios',
      currentLevel: levels.wordguess,
      icon: '📖',
      drawing: '✝️',
      gradient: 'from-amber-500 via-orange-600 to-yellow-500',
      border: 'border-yellow-400',
      bgGlow: 'bg-amber-500/10',
      badgeText: 'Nivel ' + levels.wordguess + ' / 100',
    },
    {
      id: 'wordsearch' as const,
      title: 'Sopa de Letras',
      subtitle: 'Pupiletras de amor, fe y virtudes',
      currentLevel: levels.wordsearch,
      icon: '🔍',
      drawing: '📜',
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      border: 'border-purple-400',
      bgGlow: 'bg-purple-500/10',
      badgeText: 'Nivel ' + levels.wordsearch + ' / 100',
    },
    {
      id: 'puzzle' as const,
      title: 'Rompecabezas de Fe',
      subtitle: 'Historias bíblicas de David y Noé',
      currentLevel: levels.puzzle,
      icon: '⛵',
      drawing: '🌈',
      gradient: 'from-blue-600 via-sky-600 to-cyan-500',
      border: 'border-sky-400',
      bgGlow: 'bg-sky-500/10',
      badgeText: 'Nivel ' + levels.puzzle + ' / 100',
    },
    {
      id: 'tetris' as const,
      title: 'Torre de Bendición',
      subtitle: 'Tetris de fe, paz y templanza',
      currentLevel: levels.tetris,
      icon: '🧱',
      drawing: '⭐',
      gradient: 'from-emerald-600 via-teal-600 to-green-500',
      border: 'border-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      badgeText: 'Nivel ' + levels.tetris + ' / 100',
    },
    {
      id: 'memory' as const,
      title: 'Juego de Memoria',
      subtitle: 'Frutos del Espíritu y virtudes',
      currentLevel: levels.memory,
      icon: '🍇',
      drawing: '🕊️',
      gradient: 'from-rose-600 via-pink-600 to-red-500',
      border: 'border-rose-400',
      bgGlow: 'bg-rose-500/10',
      badgeText: 'Nivel ' + levels.memory + ' / 100',
    },
    {
      id: 'coloring' as const,
      title: 'Dibuja y Colorea',
      subtitle: 'Lienzo sagrado y paleta de fe',
      currentLevel: levels.coloring,
      icon: '🎨',
      drawing: '✨',
      gradient: 'from-yellow-500 via-amber-500 to-orange-500',
      border: 'border-amber-300',
      bgGlow: 'bg-yellow-500/10',
      badgeText: 'Nivel ' + levels.coloring + ' / 100',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 space-y-4">
      {/* Top Banner with Ángel */}
      <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border-2 border-yellow-400 shadow-2xl overflow-hidden flex items-center justify-between">
        <div className="space-y-1.5 z-10 max-w-[62%]">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 px-3 py-0.5 rounded-full bg-blue-950/70 border border-yellow-400/40">
            <Gamepad2 className="w-3.5 h-3.5 text-yellow-300" />
            <span>Ganemos con fe • 100 Niveles</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
            Juegos bíblicos y de superación
          </h2>
          <p className="text-[11px] text-blue-100 font-medium leading-snug">
            Cada juego cuenta con 100 niveles progresivos basados en Dios, Jesús y valores familiares.
          </p>
        </div>

        {/* Ángel */}
        <div className="relative z-10 flex flex-col items-center">
          <CharacterAvatar characterId="angel" size="md" showHalo />
          <span className="text-[9px] font-black text-yellow-300 mt-1 text-center leading-tight bg-blue-950/80 px-2 py-0.5 rounded-md border border-yellow-400/40">
            Ángel
          </span>
        </div>
      </div>

      {/* 100 Levels Trophy Bar */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border-2 border-yellow-400/50 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
            <Trophy className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <span className="text-xs font-black text-white block">
              100 Niveles en cada juego
            </span>
            <span className="text-[10px] text-yellow-300 font-semibold">
              ¡Avanza, desbloquea versículos y supera tu récord!
            </span>
          </div>
        </div>
      </div>

      {/* 2-COLUMN ATTRACTIVE GRID WITH EMOTES & DRAWINGS */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {gameCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveGame(card.id)}
            className={`relative rounded-3xl p-3.5 bg-slate-900 border-2 ${card.border} hover:border-yellow-300 shadow-xl cursor-pointer transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col justify-between group overflow-hidden`}
          >
            {/* Ambient Corner Glow */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.bgGlow} rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform`} />

            {/* Top Emotes and Drawing Icon */}
            <div className="flex items-start justify-between relative z-10 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <span className="text-lg opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-transform">
                {card.drawing}
              </span>
            </div>

            {/* Title and Subtitle */}
            <div className="relative z-10 space-y-1 mb-3">
              <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-yellow-300 transition-colors leading-tight">
                {card.title}
              </h3>
              <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                {card.subtitle}
              </p>
            </div>

            {/* 100 Levels Pill Badge */}
            <div className="relative z-10 pt-1">
              <div className="w-full py-1.5 px-2 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between text-[10px] font-black group-hover:bg-yellow-400 group-hover:text-slate-950 transition-all">
                <span className="text-yellow-300 group-hover:text-slate-950">
                  {card.badgeText}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
