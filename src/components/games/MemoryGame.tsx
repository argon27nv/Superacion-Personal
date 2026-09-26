import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_100_LEVELS } from '../../data/gameLevels';

interface MemoryGameProps {
  onBack: () => void;
}

interface CardItem {
  id: number;
  pairId: number;
  title: string;
  emoji: string;
  color: string;
  verse: string;
}

const ALL_CARDS: Omit<CardItem, 'id'>[] = [
  { pairId: 1, title: 'Amor', emoji: '❤️', color: 'from-rose-500 to-red-600', verse: '1 Corintios 13:13' },
  { pairId: 2, title: 'Gozo', emoji: '✨', color: 'from-amber-400 to-yellow-500', verse: 'Nehemías 8:10' },
  { pairId: 3, title: 'Paz', emoji: '🕊️', color: 'from-sky-400 to-blue-500', verse: 'Filipenses 4:7' },
  { pairId: 4, title: 'Paciencia', emoji: '⏳', color: 'from-emerald-400 to-teal-600', verse: 'Romanos 12:12' },
  { pairId: 5, title: 'Fe', emoji: '🛡️', color: 'from-indigo-400 to-purple-600', verse: 'Hebreos 11:1' },
  { pairId: 6, title: 'Bondad', emoji: '🍎', color: 'from-orange-400 to-red-500', verse: 'Salmos 23:6' },
  { pairId: 7, title: 'Mansedumbre', emoji: '🌿', color: 'from-lime-400 to-green-600', verse: 'Mateo 5:5' },
  { pairId: 8, title: 'Templanza', emoji: '⚓', color: 'from-cyan-400 to-blue-600', verse: '2 Pedro 1:6' },
  { pairId: 9, title: 'Esperanza', emoji: '🌟', color: 'from-amber-500 to-yellow-600', verse: 'Salmos 42:11' },
  { pairId: 10, title: 'Perdón', emoji: '💧', color: 'from-blue-500 to-cyan-600', verse: 'Efesios 4:32' },
];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    const saved = localStorage.getItem('sp_memory_level');
    return saved ? Math.min(MEMORY_100_LEVELS.length - 1, parseInt(saved, 10)) : 0;
  });
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const level = MEMORY_100_LEVELS[currentLevelIdx] || MEMORY_100_LEVELS[0];
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Save progress
  useEffect(() => {
    localStorage.setItem('sp_memory_level', currentLevelIdx.toString());
  }, [currentLevelIdx]);

  // Start new game for current level
  const startNewGame = () => {
    const subset = ALL_CARDS.slice(0, level.pairsCount);
    const deck: CardItem[] = [];
    subset.forEach((card, index) => {
      deck.push({ ...card, id: index * 2 });
      deck.push({ ...card, id: index * 2 + 1 });
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setIsWon(false);
  };

  useEffect(() => {
    startNewGame();
  }, [currentLevelIdx]);

  // Timer
  useEffect(() => {
    if (isWon || cards.length === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWon, cards]);

  const handleCardClick = (id: number) => {
    if (isWon || flipped.length === 2 || flipped.includes(id) || matched.includes(id)) {
      return;
    }

    const nextFlipped = [...flipped, id];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstCard = cards.find((c) => c.id === nextFlipped[0]);
      const secondCard = cards.find((c) => c.id === nextFlipped[1]);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Matched!
        const nextMatched = [...matched, firstCard.id, secondCard.id];
        setMatched(nextMatched);
        setFlipped([]);

        if (nextMatched.length === cards.length) {
          setIsWon(true);
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        }
      } else {
        // Not matched - flip back after delay
        setTimeout(() => {
          setFlipped([]);
        }, 900);
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < MEMORY_100_LEVELS.length - 1) {
      setCurrentLevelIdx((i) => i + 1);
    }
  };

  const handlePrevLevel = () => {
    if (currentLevelIdx > 0) {
      setCurrentLevelIdx((i) => i - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center pb-24">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <button
          onClick={() => setShowLevelSelector(!showLevelSelector)}
          className="text-xs font-black text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/40 hover:bg-amber-500/30"
        >
          Nivel {level.id} / 100
        </button>
      </div>

      {/* Level Selector Drawer */}
      {showLevelSelector && (
        <div className="w-full bg-slate-900 border-2 border-yellow-400 rounded-2xl p-3 mb-4 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-white">Juegos de Memoria (Nivel 1 al 100)</span>
            <button 
              onClick={() => setShowLevelSelector(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto pr-1">
            {MEMORY_100_LEVELS.map((lvl, idx) => (
              <button
                key={lvl.id}
                onClick={() => {
                  setCurrentLevelIdx(idx);
                  setShowLevelSelector(false);
                }}
                className={`text-[10px] font-bold p-1 rounded transition ${
                  idx === currentLevelIdx
                    ? 'bg-yellow-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lvl.id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-rose-900 via-pink-900 to-purple-900 border border-rose-500/30 shadow-xl mb-3 text-center">
        <h3 className="text-sm font-black text-white">{level.title}</h3>
        <p className="text-[11px] text-rose-200 mt-0.5">
          Encuentra las {level.pairsCount} parejas de virtudes bíblicas
        </p>
      </div>

      {/* Stats bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 mb-3">
        <span>Intentos: <b className="text-amber-400">{moves}</b></span>
        <span>Parejas: <b className="text-emerald-400">{matched.length / 2} / {level.pairsCount}</b></span>
        <span>Tiempo: <b className="text-sky-400">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</b></span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-2 w-full mb-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          const isCardMatched = matched.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isCardMatched}
              className={`aspect-square rounded-2xl p-1.5 flex flex-col items-center justify-center transition-all duration-300 transform perspective-1000 ${
                isFlipped
                  ? `bg-gradient-to-tr ${card.color} text-white shadow-lg border-2 border-white/40 scale-102`
                  : 'bg-slate-900 border-2 border-slate-700 hover:border-yellow-400/60 text-slate-500'
              }`}
            >
              {isFlipped ? (
                <>
                  <span className="text-xl sm:text-2xl drop-shadow">{card.emoji}</span>
                  <span className="text-[10px] font-black mt-1 leading-tight text-white drop-shadow">
                    {card.title}
                  </span>
                </>
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-amber-400">
                  ✝️
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Victory */}
      {isWon ? (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 border-2 border-emerald-400 text-center mb-3 shadow-xl animate-in zoom-in-95">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-1.5">
            <Trophy className="w-5 h-5 fill-slate-950" />
          </div>
          <h3 className="text-sm font-black text-emerald-300">¡Nivel {level.id} completado con éxito!</h3>
          <p className="text-xs text-slate-300 mt-0.5 mb-2 font-semibold">
            ¡Excelente memoria! Lo lograste en {moves} intentos.
          </p>
          <div className="flex justify-center gap-2">
            {currentLevelIdx > 0 && (
              <button
                onClick={handlePrevLevel}
                className="py-1.5 px-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                <ChevronLeft className="w-4 h-4 inline" /> Anterior
              </button>
            )}
            <button
              onClick={handleNextLevel}
              className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md"
            >
              {currentLevelIdx < MEMORY_100_LEVELS.length - 1 ? (
                <>Siguiente Nivel ({level.id + 1}/100) <ChevronRight className="w-4 h-4 inline" /></>
              ) : (
                '¡Completaste los 100 niveles!'
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={startNewGame}
          className="flex items-center gap-1.5 py-1.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar nivel</span>
        </button>
      )}
    </div>
  );
};
