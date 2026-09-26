import React from 'react';
import { User, Sparkles, ExternalLink, Heart } from 'lucide-react';
import logoImg from '../assets/images/logo_superacion.jpg';

interface HeaderProps {
  followerName: string;
  onOpenNameModal: () => void;
  isVip: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  followerName,
  onOpenNameModal,
  isVip,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/90 backdrop-blur-md border-b border-blue-500/20 safe-area-top shadow-lg">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo & Brand with Image 2 (Blue T-shirt with Superación Personal shield and Like/Subscribe buttons) */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 bg-blue-900 shadow-md flex-shrink-0 flex items-center justify-center p-0.5">
            <img
              src={logoImg}
              alt="Logo Superación Personal"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1 leading-none">
              <span className="text-amber-300">Superación</span>
              <span className="text-sky-400">Personal</span>
              {isVip && (
                <span className="text-[9px] font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 px-1 py-0.2 rounded leading-tight shadow-xs">
                  VIP
                </span>
              )}
            </h1>
            <span className="text-[10px] text-amber-300 font-semibold tracking-wide">
              @superacionpersonalperu
            </span>
          </div>
        </div>

        {/* User name / Dinos tu nombre & TikTok quick access */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNameModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 hover:border-amber-400 text-slate-100 text-xs transition-all shadow-xs"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold max-w-[85px] truncate">
              {followerName || 'Dinos tu nombre'}
            </span>
          </button>

          <a
            href="https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS"
            target="_blank"
            rel="noopener noreferrer"
            title="Ir a TikTok de Superación Personal"
            className="p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-md shadow-rose-600/30"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
