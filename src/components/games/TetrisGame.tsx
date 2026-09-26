import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw, ArrowDown, ArrowLeft as LeftIcon, ArrowRight as RightIcon, Trophy, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TETRIS_100_LEVELS } from '../../data/gameLevels';

interface TetrisGameProps {
  onBack: () => void;
}

const COLS = 10;
const ROWS = 16;

type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

interface Tetromino {
  shape: number[][];
  color: string;
  name: string;
}

const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#38bdf8', // Paz - Sky
    name: 'Paz',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#3b82f6', // Fe - Blue
    name: 'Fe',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#f97316', // Esperanza - Orange
    name: 'Esperanza',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#eab308', // Corona - Gold
    name: 'Amor',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#10b981', // Gozo - Green
    name: 'Gozo',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#a855f7', // Fortaleza - Purple
    name: 'Fortaleza',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#ef4444', // Gracia - Red
    name: 'Gracia',
  },
};

const getRandomTetromino = (): { type: TetrominoType; piece: Tetromino } => {
  const types: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const type = types[Math.floor(Math.random() * types.length)];
  return { type, piece: TETROMINOES[type] };
};

export const TetrisGame: React.FC<TetrisGameProps> = ({ onBack }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    const saved = localStorage.getItem('sp_tetris_level');
    return saved ? Math.min(TETRIS_100_LEVELS.length - 1, parseInt(saved, 10)) : 0;
  });
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const levelConfig = TETRIS_100_LEVELS[currentLevelIdx] || TETRIS_100_LEVELS[0];

  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelCleared, setIsLevelCleared] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState<string | null>(null);

  const requestRef = useRef<number | null>(null);
  const lastDropTimeRef = useRef<number>(0);

  // Save progress
  useEffect(() => {
    localStorage.setItem('sp_tetris_level', currentLevelIdx.toString());
  }, [currentLevelIdx]);

  const spawnPiece = useCallback(() => {
    const { piece } = getRandomTetromino();
    setCurrentPiece(piece);
    setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });

    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] && grid[r]?.[Math.floor(COLS / 2) - 1 + c]) {
          setIsGameOver(true);
          return;
        }
      }
    }
  }, [grid]);

  const restartGame = () => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
    setScore(0);
    setLines(0);
    setIsGameOver(false);
    setIsLevelCleared(false);
    setIsPaused(false);
    setBlessingMessage(null);
    const { piece } = getRandomTetromino();
    setCurrentPiece(piece);
    setPosition({ x: 3, y: 0 });
  };

  useEffect(() => {
    restartGame();
  }, [currentLevelIdx]);

  const checkCollision = useCallback(
    (piece: Tetromino, pos: { x: number; y: number }, currentGrid: string[][]) => {
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
          if (piece.shape[r][c]) {
            const newX = pos.x + c;
            const newY = pos.y + r;
            if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
            if (newY >= 0 && currentGrid[newY][newX]) return true;
          }
        }
      }
      return false;
    },
    []
  );

  const lockPiece = useCallback(() => {
    if (!currentPiece) return;
    const newGrid = grid.map((row) => [...row]);

    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const targetY = position.y + r;
          const targetX = position.x + c;
          if (targetY >= 0 && targetY < ROWS && targetX >= 0 && targetX < COLS) {
            newGrid[targetY][targetX] = currentPiece.color;
          }
        }
      }
    }

    let cleared = 0;
    const remainingRows = newGrid.filter((row) => {
      const isFull = row.every((cell) => cell !== '');
      if (isFull) cleared++;
      return !isFull;
    });

    while (remainingRows.length < ROWS) {
      remainingRows.unshift(Array(COLS).fill(''));
    }

    if (cleared > 0) {
      const addedScore = cleared * 100 * cleared;
      setScore((s) => s + addedScore);
      setLines((l) => {
        const nextLines = l + cleared;
        if (nextLines >= levelConfig.targetLines && !isLevelCleared) {
          setIsLevelCleared(true);
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        }
        return nextLines;
      });

      const messages = [
        '¡Dios bendice tu esfuerzo!',
        '¡Fe inquebrantable!',
        '¡Torre de Bendición firme!',
        '¡El amor nunca falla!',
      ];
      setBlessingMessage(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setBlessingMessage(null), 2000);
    }

    setGrid(remainingRows);
    spawnPiece();
  }, [currentPiece, position, grid, spawnPiece, levelConfig, isLevelCleared]);

  const moveLeft = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused || isLevelCleared) return;
    if (!checkCollision(currentPiece, { x: position.x - 1, y: position.y }, grid)) {
      setPosition((p) => ({ ...p, x: p.x - 1 }));
    }
  }, [currentPiece, isGameOver, isPaused, isLevelCleared, checkCollision, position, grid]);

  const moveRight = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused || isLevelCleared) return;
    if (!checkCollision(currentPiece, { x: position.x + 1, y: position.y }, grid)) {
      setPosition((p) => ({ ...p, x: p.x + 1 }));
    }
  }, [currentPiece, isGameOver, isPaused, isLevelCleared, checkCollision, position, grid]);

  const moveDown = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused || isLevelCleared) return;
    if (!checkCollision(currentPiece, { x: position.x, y: position.y + 1 }, grid)) {
      setPosition((p) => ({ ...p, y: p.y + 1 }));
    } else {
      lockPiece();
    }
  }, [currentPiece, isGameOver, isPaused, isLevelCleared, checkCollision, position, grid, lockPiece]);

  const rotate = useCallback(() => {
    if (!currentPiece || isGameOver || isPaused || isLevelCleared) return;
    const oldShape = currentPiece.shape;
    const newShape = oldShape[0].map((_, i) => oldShape.map((row) => row[i]).reverse());
    const rotatedPiece: Tetromino = { ...currentPiece, shape: newShape };

    if (!checkCollision(rotatedPiece, position, grid)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, isGameOver, isPaused, isLevelCleared, checkCollision, position, grid]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'ArrowDown') moveDown();
      if (e.key === 'ArrowUp') rotate();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, moveDown, rotate]);

  // Main game tick loop
  useEffect(() => {
    if (!currentPiece && !isGameOver && !isLevelCleared) {
      spawnPiece();
    }

    const dropInterval = levelConfig.speedMs;
    const gameLoop = (time: number) => {
      if (!lastDropTimeRef.current) lastDropTimeRef.current = time;
      if (time - lastDropTimeRef.current > dropInterval && !isPaused && !isGameOver && !isLevelCleared) {
        moveDown();
        lastDropTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [currentPiece, isGameOver, isPaused, isLevelCleared, levelConfig, moveDown, spawnPiece]);

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
          Nivel {levelConfig.id} / 100
        </button>
      </div>

      {/* Level Selector Drawer */}
      {showLevelSelector && (
        <div className="w-full bg-slate-900 border-2 border-yellow-400 rounded-2xl p-3 mb-4 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-white">Torre de Bendiciones (Nivel 1 al 100)</span>
            <button 
              onClick={() => setShowLevelSelector(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto pr-1">
            {TETRIS_100_LEVELS.map((lvl, idx) => (
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

      {/* Stats bar */}
      <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-3 text-xs">
        <div className="text-slate-300">
          <span>Puntos: </span>
          <b className="text-amber-400">{score}</b>
        </div>
        <div className="text-slate-300">
          <span>Meta: </span>
          <b className="text-emerald-400">{lines}/{levelConfig.targetLines} líneas</b>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300 hover:text-white"
        >
          {isPaused ? 'Reanudar' : 'Pausar'}
        </button>
      </div>

      {/* Blessing alert */}
      {blessingMessage && (
        <div className="w-full py-1 px-3 mb-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-center text-xs font-bold text-amber-300 animate-in fade-in flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{blessingMessage}</span>
        </div>
      )}

      {/* Tetris Board */}
      <div className="relative w-full max-w-[280px] aspect-[10/16] p-2 rounded-2xl bg-slate-950 border-2 border-slate-800 shadow-2xl flex flex-col justify-between">
        <div className="grid grid-cols-10 grid-rows-16 gap-0.5 w-full h-full bg-slate-900/50 rounded-xl p-1 border border-slate-800/80">
          {grid.map((row, r) =>
            row.map((cellColor, c) => {
              let isCurrentPiece = false;
              let pieceColor = '';
              if (currentPiece) {
                const py = r - position.y;
                const px = c - position.x;
                if (
                  py >= 0 &&
                  py < currentPiece.shape.length &&
                  px >= 0 &&
                  px < currentPiece.shape[py].length &&
                  currentPiece.shape[py][px]
                ) {
                  isCurrentPiece = true;
                  pieceColor = currentPiece.color;
                }
              }

              const fill = isCurrentPiece ? pieceColor : cellColor;

              return (
                <div
                  key={`${r}-${c}`}
                  className="rounded-[2px] transition-all"
                  style={{
                    backgroundColor: fill || 'rgba(15, 23, 42, 0.4)',
                    boxShadow: fill ? `0 0 6px ${fill}66 inset` : 'none',
                    border: fill ? `1px solid ${fill}` : '1px solid rgba(255,255,255,0.03)',
                  }}
                />
              );
            })
          )}
        </div>

        {/* Level Complete Screen */}
        {isLevelCleared && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 z-20">
            <Trophy className="w-12 h-12 text-yellow-400 mb-2 animate-bounce" />
            <h3 className="text-base font-black text-emerald-300">¡Nivel {levelConfig.id} Superado!</h3>
            <p className="text-xs text-slate-300 mt-1 mb-4">
              Completaste las {levelConfig.targetLines} líneas de bendición con {score} puntos.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (currentLevelIdx < TETRIS_100_LEVELS.length - 1) {
                    setCurrentLevelIdx((i) => i + 1);
                  }
                }}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md"
              >
                Siguiente Nivel ({levelConfig.id + 1}/100) <ChevronRight className="w-4 h-4 inline" />
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 z-20">
            <Trophy className="w-10 h-10 text-amber-400 mb-2" />
            <h3 className="text-lg font-bold text-white">¡Gran Esfuerzo de Fe!</h3>
            <p className="text-xs text-slate-300 mt-1 mb-3">
              Construiste una torre de {score} puntos y {lines} bendiciones.
            </p>
            <button
              onClick={restartGame}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md"
            >
              Reintentar Nivel {levelConfig.id}
            </button>
          </div>
        )}
      </div>

      {/* On-screen Controls */}
      <div className="w-full max-w-[280px] grid grid-cols-3 gap-2 mt-4 select-none">
        <button
          onClick={moveLeft}
          className="p-3 rounded-2xl bg-slate-800 text-white font-black flex items-center justify-center active:bg-slate-700 active:scale-95 shadow"
        >
          <LeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={rotate}
          className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center active:bg-amber-400 active:scale-95 shadow"
        >
          Girar
        </button>
        <button
          onClick={moveRight}
          className="p-3 rounded-2xl bg-slate-800 text-white font-black flex items-center justify-center active:bg-slate-700 active:scale-95 shadow"
        >
          <RightIcon className="w-6 h-6" />
        </button>
        <div />
        <button
          onClick={moveDown}
          className="p-3 rounded-2xl bg-slate-800 text-white font-black flex items-center justify-center active:bg-slate-700 active:scale-95 shadow col-start-2"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
