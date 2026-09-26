import React, { useState } from 'react';
import { VideoItem } from '../types';
import { 
  X, 
  ExternalLink, 
  Heart, 
  Share2, 
  Sparkles, 
  Eye, 
  Flame, 
  Copy, 
  Check,
  Play
} from 'lucide-react';
import logoImg from '../assets/images/logo_superacion.jpg';
import duoEscudo from '../assets/images/duo_escudo.jpg';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => {
    return video ? parseInt(video.likes?.replace('K', '000').replace('.', '') || '45000', 10) : 45000;
  });

  if (!video) return null;

  const handleOpenTikTok = () => {
    const url = video.tiktokUrl || 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    const url = video.tiktokUrl || 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS';
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = () => {
    const url = video.tiktokUrl || 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS';
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Mira este video viral de Superación Personal: "${video.title}"`,
        url,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const toggleLike = () => {
    setHasLiked(!hasLiked);
    setLikeCount((prev) => (hasLiked ? prev - 1 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-yellow-400/60 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between p-3 bg-slate-950/90 border-b border-white/10 z-20">
          <div className="flex items-center gap-2">
            <img 
              src={logoImg} 
              alt="Logo Superación Personal" 
              className="w-8 h-8 rounded-lg object-contain border border-yellow-400 p-0.5 bg-slate-900" 
            />
            <div>
              <span className="text-xs font-black text-yellow-300 block leading-tight">
                Superación Personal
              </span>
              <span className="text-[10px] text-sky-400 font-bold flex items-center gap-1">
                <span>@superacionpersonalperu</span>
                <span className="text-pink-400">• TikTok Oficial</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Visual Card / Cover */}
        <div className="relative aspect-[9/11] w-full bg-slate-950 overflow-hidden group">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-yellow-400/40 text-[10px] font-black text-yellow-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-400 fill-red-400" />
              <span>Video Viral • {video.category}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
              {video.duration}
            </span>
          </div>

          {/* Center Play Button with TikTok Branding */}
          <div 
            onClick={handleOpenTikTok}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-sky-400 text-white flex items-center justify-center shadow-2xl shadow-rose-500/40 group-hover:scale-110 active:scale-95 transition-transform">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
            <span className="mt-2.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-black text-white border border-white/20 shadow-lg group-hover:text-yellow-300 transition-colors">
              Toca para ver en TikTok
            </span>
          </div>

          {/* Bottom stats inside cover */}
          <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between text-[11px] font-black text-white drop-shadow">
            <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{video.views} reproducciones</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md backdrop-blur-xs transition ${
                hasLiked ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : ''}`} />
              <span>{hasLiked ? ((likeCount + 1) / 1000).toFixed(1) + 'K' : video.likes}</span>
            </button>
          </div>
        </div>

        {/* Content details and direct link buttons */}
        <div className="p-4 space-y-3 bg-slate-900 overflow-y-auto">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white leading-snug">
              {video.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {video.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-md border border-yellow-400/20">
                {video.topicTag}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Ángel & Argón
              </span>
            </div>
          </div>

          {/* Primary Action: Direct Link to TikTok */}
          <div className="pt-1 space-y-2">
            <button
              onClick={handleOpenTikTok}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-98 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir y ver en TikTok Oficial</span>
            </button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">¡Enlace copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copiar enlace</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
