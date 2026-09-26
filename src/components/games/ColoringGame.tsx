import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Download, Eraser, Paintbrush, Sparkles, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLORING_100_LEVELS } from '../../data/gameLevels';

interface ColoringGameProps {
  onBack: () => void;
}

const TEMPLATES = [
  { id: 'david', name: 'David y Goliat', icon: '⚔️' },
  { id: 'paloma', name: 'Paloma de Paz', icon: '🕊️' },
  { id: 'cruz', name: 'Cruz y Amanecer', icon: '✝️' },
  { id: 'corazon', name: 'Amor de Jesús', icon: '❤️' },
  { id: 'libre', name: 'Lienzo Libre', icon: '🎨' },
];

const COLORS = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#84cc16', // Lime
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#78350f', // Brown
  '#ffffff', // White
  '#0f172a', // Dark slate
];

export const ColoringGame: React.FC<ColoringGameProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    const saved = localStorage.getItem('sp_coloring_level');
    return saved ? Math.min(COLORING_100_LEVELS.length - 1, parseInt(saved, 10)) : 0;
  });
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const level = COLORING_100_LEVELS[currentLevelIdx] || COLORING_100_LEVELS[0];

  const [selectedTemplate, setSelectedTemplate] = useState(level.templateId);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Save level
  useEffect(() => {
    localStorage.setItem('sp_coloring_level', currentLevelIdx.toString());
    setSelectedTemplate(level.templateId);
  }, [currentLevelIdx, level]);

  // Draw template outlines
  const drawTemplate = (templateId: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (templateId === 'david') {
      ctx.beginPath();
      ctx.arc(80, 180, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(80, 204);
      ctx.lineTo(80, 260);
      ctx.moveTo(80, 220);
      ctx.lineTo(55, 235);
      ctx.moveTo(80, 220);
      ctx.lineTo(105, 205);
      ctx.moveTo(80, 260);
      ctx.lineTo(65, 300);
      ctx.moveTo(80, 260);
      ctx.lineTo(95, 300);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(230, 140, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(230, 176);
      ctx.lineTo(230, 260);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(230, 220, 32, 0, Math.PI * 2);
      ctx.stroke();
    } else if (templateId === 'paloma') {
      ctx.beginPath();
      ctx.ellipse(150, 160, 45, 28, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(190, 140, 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(206, 140);
      ctx.lineTo(220, 143);
      ctx.lineTo(206, 147);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(135, 145);
      ctx.quadraticCurveTo(110, 80, 80, 110);
      ctx.quadraticCurveTo(115, 130, 130, 155);
      ctx.stroke();
    } else if (templateId === 'cruz') {
      ctx.beginPath();
      ctx.arc(150, 220, 80, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(138, 70, 24, 180);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(100, 110, 100, 24);
      ctx.stroke();
    } else if (templateId === 'corazon') {
      ctx.beginPath();
      ctx.moveTo(150, 110);
      ctx.bezierCurveTo(150, 90, 120, 70, 90, 95);
      ctx.bezierCurveTo(50, 130, 90, 190, 150, 240);
      ctx.bezierCurveTo(210, 190, 250, 130, 210, 95);
      ctx.bezierCurveTo(180, 70, 150, 90, 150, 110);
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawTemplate(selectedTemplate);
  }, [selectedTemplate]);

  // Drawing event handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const handleCompleteLevel = () => {
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    if (currentLevelIdx < COLORING_100_LEVELS.length - 1) {
      setCurrentLevelIdx((i) => i + 1);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dibujo-fe-nivel-${level.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
    confetti({ particleCount: 50, spread: 60 });
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
            <span className="text-xs font-black text-white">Colorear con Fe (Nivel 1 al 100)</span>
            <button 
              onClick={() => setShowLevelSelector(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto pr-1">
            {COLORING_100_LEVELS.map((lvl, idx) => (
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

      {/* Level Mission */}
      <div className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-900 border border-emerald-400/30 shadow-lg mb-3 text-center">
        <h3 className="text-xs sm:text-sm font-black text-white">{level.title}</h3>
        <p className="text-[11px] text-emerald-200 mt-0.5 font-medium">
          Misión: {level.challenge}
        </p>
      </div>

      {/* Canvas Board */}
      <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl border-4 border-slate-800 touch-none">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>

      {/* Color Palette */}
      <div className="w-full max-w-[320px] p-2.5 rounded-2xl bg-slate-900 border border-slate-800 mt-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Paintbrush className="w-3.5 h-3.5 text-amber-400" />
            <span>Colores:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`p-1.5 rounded-lg text-xs ${
                !isEraser ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Pincel"
            >
              <Paintbrush className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsEraser(true)}
              className={`p-1.5 rounded-lg text-xs ${
                isEraser ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Borrador"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Color Dots */}
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((col) => (
            <button
              key={col}
              onClick={() => {
                setSelectedColor(col);
                setIsEraser(false);
              }}
              className={`h-7 rounded-lg transition-transform ${
                selectedColor === col && !isEraser
                  ? 'ring-2 ring-white scale-110 shadow-md'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: col }}
              aria-label={`Color ${col}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <button
            onClick={() => drawTemplate(selectedTemplate)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpiar</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Descargar</span>
          </button>

          <button
            onClick={handleCompleteLevel}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow-md shadow-amber-400/20 active:scale-95"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Nivel Listo ({level.id + 1}/100)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
