import React, { useEffect, useState } from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { Sparkles, ChevronRight } from 'lucide-react';
import logoImg from '../assets/images/logo_superacion.jpg';
import duoEscudoBanner from '../assets/images/duo_escudo.jpg';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 4000ms duration
    const totalDuration = 4000;
    const intervalTime = 40;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    // Fade out at 3600ms
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 3600);

    // Complete at 4000ms
    const completionTimer = setTimeout(() => {
      onComplete();
    }, totalDuration);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(onComplete, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-blue-900 via-slate-950 to-slate-950 text-white transition-opacity duration-500 overflow-hidden ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Sunrise & Cross Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/20 via-blue-950/40 to-slate-950 pointer-events-none" />

      {/* Top Header: Brand Tag with Logo 2 */}
      <div className="relative z-10 w-full flex items-center justify-between max-w-md pt-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-yellow-400 bg-blue-900 shadow-md">
            <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xs font-black tracking-wider uppercase text-yellow-300 block">
              Superación Personal
            </span>
            <span className="text-[10px] text-sky-300 font-semibold">@superacionpersonalperu</span>
          </div>
        </div>

        <button
          onClick={handleSkip}
          className="text-xs text-yellow-300 hover:text-white px-3 py-1.5 rounded-full bg-blue-950/80 border border-yellow-400/50 transition-colors flex items-center gap-1 shadow-md"
        >
          <span>Entrar</span>
          <ChevronRight className="w-3.5 h-3.5 text-yellow-300" />
        </button>
      </div>

      {/* Center Hero Artwork with Duo Image & Avatars */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm my-auto space-y-4">
        {/* Real Duo Banner Card */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-2xl bg-slate-900 w-full">
          <img
            src={duoEscudoBanner}
            alt="Ángel y Argón con el Escudo"
            className="w-full h-44 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-2.5">
            <div className="w-full flex items-center justify-between text-[11px] font-black">
              <span className="bg-blue-600/90 text-white px-2 py-0.5 rounded-md">Ángel</span>
              <span className="bg-amber-600/90 text-white px-2 py-0.5 rounded-md">Argón</span>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-1.5 px-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-yellow-300 font-black px-3.5 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>¡Bienvenidos con fe y alegría!</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Juntos con más fe <br />
            <span className="text-yellow-400 drop-shadow">llegamos más lejos</span>
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-xs mx-auto">
            Un espacio cálido de Dios, Jesús, motivación y crecimiento para transformar tu vida cada día.
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Channel Badge */}
      <div className="relative z-10 w-full max-w-md space-y-3 pb-2">
        <div className="flex items-center justify-between text-[11px] text-yellow-300 font-bold">
          <span>@superacionpersonalperu</span>
          <span>Iniciando bendición...</span>
        </div>

        {/* Smooth 4-second loading progress bar */}
        <div className="w-full h-2 bg-slate-900 border border-blue-500/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-yellow-400 to-amber-300 transition-all ease-linear duration-75 shadow-lg shadow-yellow-400/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center text-[10px] text-slate-400 font-semibold">
          Fe · Dios · Superación · Una mejor versión de ti
        </div>
      </div>
    </div>
  );
};
