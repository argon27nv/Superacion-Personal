import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, ArrowLeft, Eye, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PUZZLE_100_LEVELS, PuzzleLevel } from '../../data/gameLevels';

interface PuzzleGameProps {
  onBack: () => void;
}

export const PuzzleGame: React.FC<PuzzleGameProps> = ({ onBack }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    const saved = localStorage.getItem('sp_puzzle_level');
    return saved ? Math.min(PUZZLE_100_LEVELS.length - 1, parseInt(saved, 10)) : 0;
  });
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const level = PUZZLE_100_LEVELS[currentLevelIdx] || PUZZLE_100_LEVELS[0];
  const size = level.gridSize; // 2 or 3
  const totalTiles = size * size;

  const [board, setBoard] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Save current level
  useEffect(() => {
    localStorage.setItem('sp_puzzle_level', currentLevelIdx.toString());
  }, [currentLevelIdx]);

  // Shuffle board whenever level changes
  const shuffleBoard = () => {
    const goal = Array.from({ length: totalTiles }, (_, i) => (i === totalTiles - 1 ? 0 : i + 1));
    let current = [...goal];
    let emptyIdx = totalTiles - 1;
    const shuffleSteps = 15 + Math.min(30, currentLevelIdx * 2);

    for (let i = 0; i < shuffleSteps; i++) {
      const neighbors: number[] = [];
      const row = Math.floor(emptyIdx / size);
      const col = emptyIdx % size;
      if (row > 0) neighbors.push(emptyIdx - size);
      if (row < size - 1) neighbors.push(emptyIdx + size);
      if (col > 0) neighbors.push(emptyIdx - 1);
      if (col < size - 1) neighbors.push(emptyIdx + 1);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      current[emptyIdx] = current[randomNeighbor];
      current[randomNeighbor] = 0;
      emptyIdx = randomNeighbor;
    }

    setBoard(current);
    setMoves(0);
    setIsWon(false);
    setTimer(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    shuffleBoard();
  }, [currentLevelIdx]);

  // Timer
  useEffect(() => {
    if (!isPlaying || isWon) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  // Check victory
  const checkWin = (currentBoard: number[]) => {
    for (let i = 0; i < totalTiles - 1; i++) {
      if (currentBoard[i] !== i + 1) return false;
    }
    return currentBoard[totalTiles - 1] === 0;
  };

  const handleTileClick = (index: number) => {
    if (isWon) return;
    const emptyIdx = board.indexOf(0);
    const rowClicked = Math.floor(index / size);
    const colClicked = index % size;
    const rowEmpty = Math.floor(emptyIdx / size);
    const colEmpty = emptyIdx % size;

    const isAdjacent =
      (Math.abs(rowClicked - rowEmpty) === 1 && colClicked === colEmpty) ||
      (Math.abs(colClicked - colEmpty) === 1 && rowClicked === rowEmpty);

    if (isAdjacent) {
      const nextBoard = [...board];
      nextBoard[emptyIdx] = board[index];
      nextBoard[index] = 0;
      setBoard(nextBoard);
      setMoves((m) => m + 1);

      if (checkWin(nextBoard)) {
        setIsWon(true);
        setIsPlaying(false);
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < PUZZLE_100_LEVELS.length - 1) {
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
            <span className="text-xs font-black text-white">Rompecabezas de Fe (1 al 100)</span>
            <button 
              onClick={() => setShowLevelSelector(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto pr-1">
            {PUZZLE_100_LEVELS.map((lvl, idx) => (
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

      {/* Theme Title */}
      <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-yellow-700 border-2 border-amber-400/50 shadow-xl mb-3 text-center">
        <span className="text-2xl block mb-1">{level.icon}</span>
        <h3 className="text-sm font-black text-white leading-tight">
          {level.title}
        </h3>
        <p className="text-[11px] text-amber-200 font-medium mt-0.5">
          {level.verse}
        </p>
      </div>

      {/* Stats bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 mb-3">
        <span>Movimientos: <b className="text-amber-400">{moves}</b></span>
        <span>Tiempo: <b className="text-sky-400">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</b></span>
        <span>Cuadrícula: <b className="text-yellow-400">{size}x{size}</b></span>
      </div>

      {/* Puzzle Board */}
      <div 
        className={`p-3 rounded-2xl bg-slate-950 border-2 border-yellow-400/40 shadow-2xl mb-4 grid gap-2 select-none`}
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          width: size === 2 ? '220px' : '280px',
          height: size === 2 ? '220px' : '280px',
        }}
      >
        {board.map((num, idx) => {
          if (num === 0) {
            return (
              <div 
                key={idx} 
                className="rounded-xl bg-slate-900/40 border border-dashed border-slate-800 flex items-center justify-center text-slate-700 text-xs"
              >
                vacío
              </div>
            );
          }
          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              className="rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-600 text-white font-black text-lg sm:text-xl flex flex-col items-center justify-center shadow-lg border border-amber-300/40 hover:scale-102 active:scale-95 transition-all"
            >
              <span>{num}</span>
              <span className="text-[10px] opacity-75">{level.icon}</span>
            </button>
          );
        })}
      </div>

      {/* Victory / Next Level */}
      {isWon ? (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 border-2 border-emerald-400 text-center mb-3 shadow-xl animate-in zoom-in-95">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-1.5">
            <Trophy className="w-5 h-5 fill-slate-950" />
          </div>
          <h3 className="text-sm font-black text-emerald-300">¡Nivel {level.id} completado con éxito!</h3>
          <p className="text-xs text-slate-300 mt-0.5 mb-2 font-semibold">
            Lo lograste en {moves} movimientos y {timer}s
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
              {currentLevelIdx < PUZZLE_100_LEVELS.length - 1 ? (
                <>Siguiente Nivel ({level.id + 1}/100) <ChevronRight className="w-4 h-4 inline" /></>
              ) : (
                '¡100 Niveles Superados!'
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={shuffleBoard}
          className="flex items-center gap-1.5 py-1.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reiniciar puzzle</span>
        </button>
      )}
    </div>
  );
};
