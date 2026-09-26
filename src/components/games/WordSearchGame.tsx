import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Check, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORD_SEARCH_100_THEMES } from '../../data/gameLevels';

interface WordSearchGameProps {
  onBack: () => void;
}

const GRID_SIZE = 8;
const FILLER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Simple deterministic pseudo-random generator based on seed
function getSeedRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({ onBack }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    const saved = localStorage.getItem('sp_wordsearch_level');
    return saved ? Math.min(WORD_SEARCH_100_THEMES.length - 1, parseInt(saved, 10)) : 0;
  });
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const level = WORD_SEARCH_100_THEMES[currentLevelIdx] || WORD_SEARCH_100_THEMES[0];
  const words = level.words;

  // Save current level
  useEffect(() => {
    localStorage.setItem('sp_wordsearch_level', currentLevelIdx.toString());
  }, [currentLevelIdx]);

  // Generate deterministic grid for the current level
  const grid = useMemo(() => {
    const matrix: string[][] = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill('')
    );
    const rng = getSeedRandom(level.id * 103 + 7);

    // Place each word horizontally, vertically, or diagonally
    words.forEach((word) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const dir = Math.floor(rng() * 2); // 0 = horizontal, 1 = vertical
        if (dir === 0) {
          const row = Math.floor(rng() * GRID_SIZE);
          const col = Math.floor(rng() * (GRID_SIZE - word.length + 1));
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (matrix[row][col + i] !== '' && matrix[row][col + i] !== word[i]) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              matrix[row][col + i] = word[i];
            }
            placed = true;
          }
        } else {
          const row = Math.floor(rng() * (GRID_SIZE - word.length + 1));
          const col = Math.floor(rng() * GRID_SIZE);
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (matrix[row + i][col] !== '' && matrix[row + i][col] !== word[i]) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              matrix[row + i][col] = word[i];
            }
            placed = true;
          }
        }
      }
    });

    // Fill remaining with random letters
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!matrix[r][c]) {
          matrix[r][c] = FILLER_LETTERS[Math.floor(rng() * FILLER_LETTERS.length)];
        }
      }
    }

    return matrix;
  }, [level]);

  // Reset when level changes
  useEffect(() => {
    setSelectedCells([]);
    setFoundWords([]);
    setIsWon(false);
  }, [currentLevelIdx]);

  const getCellKey = (r: number, c: number) => `${r}-${c}`;

  const handleCellClick = (r: number, c: number) => {
    if (isWon) return;
    const key = getCellKey(r, c);

    let nextSelected: string[];
    if (selectedCells.includes(key)) {
      nextSelected = selectedCells.filter((k) => k !== key);
    } else {
      nextSelected = [...selectedCells, key];
    }
    setSelectedCells(nextSelected);

    // Form word
    const formedWord = nextSelected
      .map((k) => {
        const [row, col] = k.split('-').map(Number);
        return grid[row][col];
      })
      .join('');

    const matched = words.find(
      (w) =>
        !foundWords.includes(w) &&
        (w === formedWord || w === formedWord.split('').reverse().join(''))
    );

    if (matched) {
      const nextFound = [...foundWords, matched];
      setFoundWords(nextFound);
      setSelectedCells([]);

      if (nextFound.length === words.length) {
        setIsWon(true);
        confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < WORD_SEARCH_100_THEMES.length - 1) {
      setCurrentLevelIdx((i) => i + 1);
    }
  };

  const handlePrevLevel = () => {
    if (currentLevelIdx > 0) {
      setCurrentLevelIdx((i) => i - 1);
    }
  };

  const handleReset = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setIsWon(false);
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
            <span className="text-xs font-black text-white">Sopa de Letras (Nivel 1 al 100)</span>
            <button 
              onClick={() => setShowLevelSelector(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto pr-1">
            {WORD_SEARCH_100_THEMES.map((lvl, idx) => (
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

      {/* Theme and Target Words */}
      <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border border-blue-400/30 shadow-lg mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-amber-300 uppercase tracking-wide">
            {level.theme}
          </span>
          <span className="text-[10px] font-bold text-sky-200">
            {foundWords.length}/{words.length} halladas
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {words.map((w) => {
            const isFound = foundWords.includes(w);
            return (
              <span
                key={w}
                className={`text-xs font-black px-2.5 py-1 rounded-lg border transition-all ${
                  isFound
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 line-through opacity-80'
                    : 'bg-slate-900/80 text-white border-white/20 shadow-xs'
                }`}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>

      {/* Grid Container */}
      <div className="p-2 sm:p-3 rounded-2xl bg-slate-950 border-2 border-blue-500/30 shadow-2xl mb-4 select-none">
        <div className="grid grid-cols-8 gap-1 sm:gap-1.5">
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = getCellKey(r, c);
              const isSelected = selectedCells.includes(key);

              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl text-sm sm:text-base font-black flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 scale-105 shadow-md shadow-amber-400/40'
                      : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Victory Notification */}
      {isWon ? (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 border-2 border-emerald-400 text-center mb-4 shadow-xl animate-in zoom-in-95">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-1.5">
            <Trophy className="w-5 h-5 fill-slate-950" />
          </div>
          <h3 className="text-sm font-black text-emerald-300">¡Nivel {level.id} superado con fe!</h3>
          <p className="text-xs text-slate-300 mt-0.5 mb-2">¡Encontraste todas las palabras bíblicas!</p>
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
              {currentLevelIdx < WORD_SEARCH_100_THEMES.length - 1 ? (
                <>Siguiente Nivel ({level.id + 1}/100) <ChevronRight className="w-4 h-4 inline" /></>
              ) : (
                '¡100 Niveles Completados!'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 py-1.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar selección</span>
          </button>
        </div>
      )}
    </div>
  );
};
