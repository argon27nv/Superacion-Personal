import React, { useState } from 'react';
import { X, User, Check, Heart, Sparkles } from 'lucide-react';

interface NameModalProps {
  isOpen: boolean;
  currentName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}

export const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  currentName,
  onSave,
  onClose,
}) => {
  const [nameInput, setNameInput] = useState(currentName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      onSave(trimmed);
      onClose();
    }
  };

  const handleClear = () => {
    setNameInput('');
    onSave('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/20 shadow-2xl p-6 overflow-hidden">
        {/* Decorative corner light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              <span>¡Dinos tu nombre!</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400">
              Queremos saludarte y orar por ti con cariño
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ¿Cómo te gusta que te llamemos?
            </label>
            <div className="relative">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ejemplo: Carlos, María, David..."
                maxLength={25}
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
              />
              {nameInput && (
                <button
                  type="button"
                  onClick={() => setNameInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  Borrar
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-400 inline" />
              <span>
                Ángel y Argón te saludarán de forma personalizada en la aplicación.
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {currentName && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Restablecer
              </button>
            )}
            <button
              type="submit"
              disabled={!nameInput.trim()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Guardar mi nombre</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
