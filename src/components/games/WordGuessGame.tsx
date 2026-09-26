import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Search, Check, Sparkles, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORD_GUESS_100_LEVELS, WordGuessLevel } from '../../data/gameLevels';

interface WordGuessGameProps {
  onBack: () => void;
}

export const WordGuessGame: React.FC<WordGuessGameProps> = ({ onBack }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    const saved = localStorage.getItem('sp_wordguess_level');
    return saved ? Math.min(WORD_GUESS_100_LEVELS.length - 1, parseInt(saved, 10)) : 0;
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const level = WORD_GUESS_100_LEVELS[currentLevelIdx] || WORD_GUESS_100_LEVELS[0];
  const targetWord = level.word;

  // Save current level
  useEffect(() => {
    localStorage.setItem('sp_wordguess_level', currentLevelIdx.toString());
  }, [currentLevelIdx]);

  // Check if complete
  const isWordComplete = targetWord
    .split('')
    .every((char) => guessedLetters.includes(char) || char === ' ');

  const handleLetterClick = (letter: string) => {
    if (isWordComplete || guessedLetters.includes(letter)) return;
    const nextGuessed = [...guessedLetters, letter];
    setGuessedLetters(nextGuessed);

    const completed = targetWord
      .split('')
      .every((char) => nextGuessed.includes(char) || char === ' ');

    if (completed) {
      setScore((s) => s + 100);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < WORD_GUESS_100_LEVELS.length - 1) {
      setCurrentLevelIdx((i) => i + 1);
      setGuessedLetters([]);
      setShowHint(false);
    } else {
      confetti({ particleCount: 100, spread: 90 });
    }
  };

  const handlePrevLevel = () => {
    if (currentLevelIdx > 0) {
      setCurrentLevelIdx((i) => i - 1);
      setGuessedLetters([]);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    setGuessedLetters([]);
    setShowHint(false);
  };

  // Keyboard pool including accented letters
  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'Á', 'É', 'Í', 'Ó', 'Ú'
  ];

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

        <div className="text-right flex items-center gap-2">
          <button
            onClick={() => setShowLevelSelector(!showLevelSelector)}
            className="text-xs font-black text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/40 hover:bg-amber-500/30"
          >
            Nivel {level.id} / 100
          </button>
        </div>
      </div>

      {/* Level Selector Drawer */}
      {showLevelSelector && (
        <div className="w-full bg-slate-900 border-2 border-yellow-400 rounded-2xl p-3 mb-4 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-white">Selecciona tu Nivel (1 al 100)</span>
            <button 
              onClick={() => setShowLevelSelector(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto pr-1">
            {WORD_GUESS_100_LEVELS.map((lvl, idx) => (
              <button
                key={lvl.id}
                onClick={() => {
                  setCurrentLevelIdx(idx);
                  setGuessedLetters([]);
                  setShowHint(false);
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

      {/* Clue Card */}
      <div className="w-full p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500/30 shadow-xl mb-4 text-center">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto mb-2 shadow-inner">
          <Search className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
            Nivel {level.id} de 100
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] text-sky-400 font-bold">Pista Bíblica</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 font-medium px-2">
          "{level.clue}"
        </p>

        {showHint && (
          <div className="mt-2 text-xs text-amber-300 font-bold bg-amber-950/70 py-1 px-3 rounded-lg inline-block border border-amber-500/30 animate-in fade-in">
            📖 Cita bíblica: {level.verse}
          </div>
        )}
      </div>

      {/* Word Slots */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 max-w-full">
        {targetWord.split('').map((char, index) => {
          if (char === ' ') return <div key={index} className="w-3" />;
          const isGuessed = guessedLetters.includes(char);
          return (
            <div
              key={index}
              className={`w-9 h-11 sm:w-10 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-black border-2 transition-all ${
                isGuessed
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-yellow-300 shadow-md scale-105'
                  : 'bg-slate-900 text-transparent border-slate-700'
              }`}
            >
              {isGuessed ? char : '_'}
            </div>
          );
        })}
      </div>

      {/* Victory Celebration / Next Level */}
      {isWordComplete ? (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-400 text-center mb-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-lg">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <h3 className="text-base font-black text-emerald-300">¡Nivel {level.id} completado con fe!</h3>
          <p className="text-xs text-slate-300 mt-0.5 mb-1 font-semibold">{level.verse}</p>
          <p className="text-xs text-amber-300 font-bold">Palabra: {level.word}</p>

          <div className="flex items-center justify-center gap-2 mt-3">
            {currentLevelIdx > 0 && (
              <button
                onClick={handlePrevLevel}
                className="py-2 px-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
              >
                <ChevronLeft className="w-4 h-4 inline" /> Anterior
              </button>
            )}
            <button
              onClick={handleNextLevel}
              className="py-2 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 active:scale-95 transition"
            >
              {currentLevelIdx < WORD_GUESS_100_LEVELS.length - 1 ? (
                <>Siguiente Nivel ({level.id + 1}/100) <ChevronRight className="w-4 h-4 inline" /></>
              ) : (
                '¡Completaste los 100 niveles!'
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Action helper buttons */
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-1 py-1.5 px-3 rounded-xl bg-sky-950/80 text-sky-300 border border-sky-500/40 text-xs font-bold hover:bg-sky-900/80"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ver Cita Bíblica</span>
          </button>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 py-1.5 px-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 text-xs font-bold hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar nivel</span>
          </button>
        </div>
      )}

      {/* Alphabet Keyboard */}
      <div className="w-full flex flex-wrap justify-center gap-1.5">
        {alphabet.map((letter) => {
          const isUsed = guessedLetters.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isUsed || isWordComplete}
              className={`w-8 h-9 sm:w-9 sm:h-10 rounded-lg text-xs font-black transition-all ${
                isUsed
                  ? 'bg-slate-900/60 text-slate-600 border border-slate-800'
                  : 'bg-slate-800 text-white border border-slate-700 hover:border-yellow-400 hover:bg-slate-700 active:scale-95 shadow-xs'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};
