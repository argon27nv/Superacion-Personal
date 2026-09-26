import React, { useState, useEffect } from 'react';
import { ActiveTab, VideoItem } from '../types';
import { VIDEOS, DAILY_VERSES } from '../data/mockData';
import { CharacterAvatar } from './CharacterAvatar';
import { MessageCircle, Gamepad2, Crown, HeartHandshake, Play, Sparkles, User, ExternalLink, ChevronRight, Sun, Sunset, Moon, Heart, Flame, ShoppingBag } from 'lucide-react';
import duoEscudoBanner from '../assets/images/duo_escudo.jpg';
import logoImg from '../assets/images/logo_superacion.jpg';

interface HomeSectionProps {
  followerName: string;
  onOpenNameModal: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectVideo: (video: VideoItem) => void;
  isVip: boolean;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  followerName,
  onOpenNameModal,
  onNavigateTab,
  onSelectVideo,
  isVip,
}) => {
  const [greetingText, setGreetingText] = useState('¡Buenos días');
  const [timeIcon, setTimeIcon] = useState<'sun' | 'sunset' | 'moon'>('sun');
  const [verseIndex, setVerseIndex] = useState(0);

  // Compute greeting according to user local time
  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreetingText('¡Buenos días');
        setTimeIcon('sun');
      } else if (currentHour >= 12 && currentHour < 19) {
        setGreetingText('¡Buenas tardes');
        setTimeIcon('sunset');
      } else {
        setGreetingText('¡Buenas noches');
        setTimeIcon('moon');
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const displayGreeting = followerName
    ? `${greetingText}, ${followerName}!`
    : `${greetingText}, ...!`;

  const currentVerse = DAILY_VERSES[verseIndex];

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 space-y-4">
      {/* 1. Personalized Header (Buenos días, ...) with Vivid Primary Colors */}
      <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border-2 border-yellow-400 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1 max-w-[64%]">
            <div className="flex items-center gap-1.5 text-xs text-yellow-300 font-extrabold bg-blue-950/60 px-2.5 py-0.5 rounded-full w-fit border border-yellow-400/40 shadow-xs">
              {timeIcon === 'sun' && <Sun className="w-3.5 h-3.5 text-yellow-300" />}
              {timeIcon === 'sunset' && <Sunset className="w-3.5 h-3.5 text-amber-300" />}
              {timeIcon === 'moon' && <Moon className="w-3.5 h-3.5 text-sky-200" />}
              <span>{timeIcon === 'sun' ? 'Bendecida mañana' : timeIcon === 'sunset' ? 'Bendecida tarde' : 'Bendecida noche'}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
              {displayGreeting}
            </h1>

            <p className="text-[11px] text-blue-100 font-medium leading-snug">
              {followerName
                ? 'Hoy es un día para avanzar con fe y alegría en tu vida 🌟'
                : 'Aún no sabemos tu nombre / Hoy es un buen día para superarte 🌟'}
            </p>

            {/* "Dinos tu nombre" Button */}
            <div className="pt-2">
              <button
                onClick={onOpenNameModal}
                className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-black shadow-md shadow-yellow-400/20 transform active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5 text-slate-950" />
                <span>{followerName ? `${followerName} (Cambiar)` : 'Dinos tu nombre'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </div>

          {/* Hero Character Ángel */}
          <div className="flex flex-col items-center flex-shrink-0">
            <CharacterAvatar characterId="angel" size="lg" showHalo />
            <span className="text-[9px] font-black text-yellow-300 mt-1.5 text-center leading-tight bg-blue-950/80 px-2 py-0.5 rounded-md border border-yellow-400/40">
              Ángel
            </span>
          </div>
        </div>
      </div>

      {/* 2. Official Presentation Banner: Ángel y Argón con el Escudo */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-900">
        <img
          src={duoEscudoBanner}
          alt="Ángel y Argón con el Escudo de Superación Personal"
          className="w-full h-44 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Presentadores Oficiales
              </span>
              <h3 className="text-sm font-black text-white">
                Ángel & Argón te acompañan
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('chat')}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-md"
            >
              Hablar ahora
            </button>
          </div>
        </div>
      </div>

      {/* 3. REELS / CARRUSEL DE VIDEOS MÁS VISTOS (Ver directamente en la app) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-red-600 text-white font-black text-xs">
              <Flame className="w-3.5 h-3.5 fill-white" />
            </span>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Videos más vistos del canal
            </h2>
          </div>
          <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
            ▶ Ver en la app
          </span>
        </div>

        {/* Reels Horizontal Carousel */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-0.5">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="flex-shrink-0 w-44 rounded-2xl overflow-hidden border-2 border-blue-500/40 hover:border-yellow-400 bg-slate-900 shadow-xl cursor-pointer group transition-all transform hover:scale-[1.02]"
            >
              {/* Aspect Ratio 9:14 reel card */}
              <div className="relative aspect-[9/13] w-full overflow-hidden bg-black">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[9px] font-bold text-white border border-white/10">
                  {video.duration}
                </div>

                {/* Category Pill */}
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-blue-600/90 text-[9px] font-bold text-white">
                  {video.category}
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center shadow-lg shadow-yellow-400/40 transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Bottom details inside reel card */}
                <div className="absolute bottom-2 inset-x-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-yellow-300 flex items-center gap-1">
                    <span>{video.views} vistas</span>
                    <span>•</span>
                    <Heart className="w-2.5 h-2.5 fill-red-400 text-red-400 inline" />
                    <span>{video.likes}</span>
                  </span>
                  <h4 className="text-xs font-bold text-white leading-tight line-clamp-2 drop-shadow">
                    {video.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Four Core Navigation Cards with Vivid Primary Colors */}
      <div className="space-y-1.5 pt-1">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-300 px-1">
          Secciones de Crecimiento
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* 1. Habla con nosotros */}
          <button
            onClick={() => onNavigateTab('chat')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-950 border-2 border-blue-400 text-left hover:border-yellow-400 shadow-xl active:scale-95 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-yellow-300 mb-2 group-hover:scale-110 transition-transform shadow-md">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white mb-0.5">
                Habla con nosotros
              </h3>
              <p className="text-[10px] text-blue-100 leading-tight">
                Ángel y Argón con respuestas inteligentes de fe.
              </p>
            </div>
            <div className="mt-3 flex items-center text-[10px] font-black text-yellow-300 group-hover:translate-x-1 transition-transform">
              <span>Conversar</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </button>

          {/* 2. Ganemos con fe */}
          <button
            onClick={() => onNavigateTab('juegos')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-emerald-600 via-teal-700 to-slate-950 border-2 border-emerald-400 text-left hover:border-yellow-400 shadow-xl active:scale-95 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-yellow-300 mb-2 group-hover:scale-110 transition-transform shadow-md">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white mb-0.5">
                Ganemos con fe
              </h3>
              <p className="text-[10px] text-emerald-100 leading-tight">
                6 juegos bíblicos de Dios, Jesús y perseverancia.
              </p>
            </div>
            <div className="mt-3 flex items-center text-[10px] font-black text-yellow-300 group-hover:translate-x-1 transition-transform">
              <span>Jugar</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </button>

          {/* 3. Hazte Premium */}
          <button
            onClick={() => onNavigateTab('premium')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-amber-600 via-orange-700 to-slate-950 border-2 border-yellow-400 text-left hover:border-white shadow-xl active:scale-95 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-yellow-200 mb-2 group-hover:scale-110 transition-transform shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white mb-0.5 flex items-center gap-1">
                <span>Hazte Premium</span>
                {isVip && <span className="text-[9px] bg-yellow-400 text-slate-950 px-1 rounded-sm font-black">VIP</span>}
              </h3>
              <p className="text-[10px] text-amber-100 leading-tight">
                Canciones para tu milagro, películas y libros.
              </p>
            </div>
            <div className="mt-3 flex items-center text-[10px] font-black text-yellow-300 group-hover:translate-x-1 transition-transform">
              <span>Ver membresía</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </button>

          {/* 4. Patrocinadores */}
          <button
            onClick={() => onNavigateTab('patrocinios')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-indigo-700 via-purple-800 to-slate-950 border-2 border-indigo-400 text-left hover:border-yellow-400 shadow-xl active:scale-95 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-yellow-300 mb-2 group-hover:scale-110 transition-transform shadow-md">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white mb-0.5">
                Patrocinadores
              </h3>
              <p className="text-[10px] text-indigo-100 leading-tight">
                Publicidad en banners, videos y transmisiones.
              </p>
            </div>
            <div className="mt-3 flex items-center text-[10px] font-black text-yellow-300 group-hover:translate-x-1 transition-transform">
              <span>Alianzas</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </button>
        </div>

        {/* 5. Superacion Personal Shop Banner */}
        <button
          onClick={() => onNavigateTab('shop')}
          className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-2 border-yellow-400 text-left hover:scale-[1.01] active:scale-98 shadow-xl transition-all flex items-center justify-between group mt-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-yellow-300">
                  Superacion Personal Shop
                </span>
                <span className="text-[9px] bg-yellow-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black">
                  PRÓXIMAMENTE
                </span>
              </div>
              <p className="text-[11px] text-blue-100 font-medium">
                Espacio para productos digitales y artículos oficiales de la marca.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-yellow-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </button>

        {/* 6. Muro de Saludos y Comentarios - Direct Banner */}
        <button
          onClick={() => onNavigateTab('comentarios')}
          className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border-2 border-yellow-400 text-left hover:scale-[1.01] active:scale-98 shadow-xl transition-all flex items-center justify-between group mt-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              💬
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-yellow-300">
                  Muro de Saludos y Comentarios
                </span>
                <span className="text-[9px] bg-yellow-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black">
                  NUEVO
                </span>
              </div>
              <p className="text-[11px] text-blue-100 font-medium">
                Déjanos tu mensaje, saludo o testimonio y lee a la comunidad.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-yellow-300 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5. Daily Faith Seed (Verse) with Radiant Blue Border */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-2 border-blue-500/40 shadow-xl">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-yellow-400">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Versículo del Día</span>
          </div>
          <button
            onClick={() => setVerseIndex((i) => (i + 1) % DAILY_VERSES.length)}
            className="text-[10px] text-sky-300 font-bold hover:underline"
          >
            Siguiente versículo ›
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-100 font-medium italic leading-relaxed">
          "{currentVerse.verse}"
        </p>
        <span className="text-[11px] text-amber-300 font-black block mt-1.5">
          — {currentVerse.ref}
        </span>
      </div>

      {/* 6. Footer Brand Creed */}
      <div className="text-center pt-2 pb-1 space-y-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src={logoImg} alt="Logo" className="w-6 h-6 object-contain" />
          <span className="text-xs font-black text-amber-300">Superación Personal</span>
        </div>
        <p className="text-[11px] font-bold text-slate-300">
          Fe · Dios · Superación · Una mejor versión de ti
        </p>
        <p className="text-[10px] text-slate-500">
          © Superación Personal Perú — Juntos con más fe llegamos más lejos
        </p>
      </div>
    </div>
  );
};
