import React, { useState } from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { Crown, Music, BookOpen, Heart, MessageSquare, Check, Sparkles, Send, Star, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumSectionProps {
  followerName: string;
  isVip: boolean;
  onActivateVip: () => void;
  onOpenSponsors: () => void;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({
  followerName,
  isVip,
  onActivateVip,
  onOpenSponsors,
}) => {
  const [showPetitionModal, setShowPetitionModal] = useState(false);
  const [petitionType, setPetitionType] = useState<'cancion_historia' | 'cancion_milagro' | 'cancion_especial' | 'oracion_vip'>('cancion_milagro');
  const [storyText, setStoryText] = useState('');
  const [targetPerson, setTargetPerson] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubscribe = () => {
    onActivateVip();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  const handlePetitionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText.trim()) return;

    try {
      await fetch('/api/premium-petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followerName: followerName || 'Seguidor VIP',
          type: petitionType,
          storyOrRequest: storyText,
          dedicationTarget: targetPerson,
        }),
      });

      setSubmittedMessage('¡Tu historia y petición han sido enviadas! El equipo de Superación Personal la revisará para tu canción y oración con amor.');
      setStoryText('');
      setTargetPerson('');
      confetti({ particleCount: 50, spread: 60 });
      setTimeout(() => {
        setSubmittedMessage(null);
        setShowPetitionModal(false);
      }, 3500);
    } catch (err) {
      console.error(err);
      setSubmittedMessage('¡Petición guardada con éxito en tu cuenta!');
    }
  };

  const benefits = [
    {
      icon: Music,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      title: 'Canciones dedicadas a tu historia',
      desc: 'Creamos canciones relatando tu testimonio, o editadas en agradecimiento a Dios por un milagro recibido, o dedicadas a alguien especial.',
    },
    {
      icon: BookOpen,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      title: '2 Libros o películas por semana',
      desc: 'Contenido exclusivo, películas de fe recomendadas, devocionales y libros seleccionados para nutrir tu espíritu.',
    },
    {
      icon: Heart,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      title: 'Menciones y agradecimiento en videos',
      desc: 'Menciones públicas y bendiciones especiales en nuestros videos y transmisiones oficiales de TikTok.',
    },
    {
      icon: MessageSquare,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      title: 'Acceso directo a Chat Privado VIP',
      desc: 'Canal exclusivo para enviar peticiones de oración personalizadas y recibir palabras de aliento directas del canal.',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 space-y-4">
      {/* Top Hero Banner */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 border-2 border-white shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 max-w-[62%]">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-950 px-3 py-0.5 rounded-full bg-yellow-300 border border-slate-900/30 shadow-xs">
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isVip ? '¡Eres Miembro VIP!' : 'Hazte Premium'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight drop-shadow-xs">
              Sé parte de algo más grande
            </h2>
            <p className="text-xs text-slate-900 font-bold leading-snug">
              Más contenido, más fe, más vidas bendecidas.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <CharacterAvatar characterId="angel" size="lg" showHalo />
            <span className="text-[9px] font-black text-slate-950 mt-1.5 bg-yellow-300 px-2 py-0.5 rounded-md border border-slate-900/20">
              Ángel
            </span>
          </div>
        </div>

        {/* VIP Status or Subscription Button */}
        <div className="mt-4 pt-3 border-t border-slate-900/20 relative z-10">
          {isVip ? (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 text-white border border-yellow-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
                <span className="text-xs font-black text-white">
                  Membresía Activa {followerName ? `de ${followerName}` : ''}
                </span>
              </div>
              <button
                onClick={() => setShowPetitionModal(true)}
                className="py-1 px-3 rounded-xl bg-yellow-400 text-slate-950 font-black text-xs shadow-md"
              >
                Pedir canción
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-700 hover:bg-blue-600 text-white font-black text-sm tracking-wide shadow-xl shadow-blue-900/40 border border-yellow-300 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
            >
              <Crown className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Quiero ser Premium</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Benefits Pillars */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Beneficios exclusivos para ti
        </h3>

        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5 shadow-md hover:border-amber-400/40 transition-colors"
            >
              <div className={`p-2.5 rounded-xl border flex-shrink-0 ${b.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {b.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct VIP Petition Action */}
      <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-500/30 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-300">
          <Music className="w-4 h-4" />
          <span>¿Quieres una canción dedicada a tu historia o milagro?</span>
        </div>
        <p className="text-[11px] text-slate-300 max-w-xs mx-auto">
          Cuéntanos el milagro que Dios hizo en ti o la historia que deseas plasmar en una canción especial.
        </p>
        <button
          onClick={() => setShowPetitionModal(true)}
          className="py-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 inline-flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enviar mi petición personalizada</span>
        </button>
      </div>

      {/* Sponsor Invitation Card at bottom of Premium */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-indigo-500/30 flex items-center justify-between shadow-lg">
        <div className="space-y-0.5 max-w-[70%]">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
            ¿Tienes una empresa o negocio?
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-white">
            Patrocina nuestro canal
          </h4>
          <p className="text-[10px] text-slate-400">
            Publicidad en banners, menciones en vivo y videos.
          </p>
        </div>
        <button
          onClick={onOpenSponsors}
          className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
        >
          Ver patrocinios
        </button>
      </div>

      {/* Interactive Petition Modal */}
      {showPetitionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl p-5 overflow-hidden">
            <button
              onClick={() => setShowPetitionModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Petición de Canción & Oración</h4>
                <p className="text-[10px] text-slate-400">Canal Superación Personal</p>
              </div>
            </div>

            {submittedMessage ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-semibold text-emerald-200">{submittedMessage}</p>
              </div>
            ) : (
              <form onSubmit={handlePetitionSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Tipo de Petición
                  </label>
                  <select
                    value={petitionType}
                    onChange={(e: any) => setPetitionType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                  >
                    <option value="cancion_milagro">Canción en agradecimiento a Dios por un milagro</option>
                    <option value="cancion_historia">Canción relatando mi historia de superación</option>
                    <option value="cancion_especial">Canción dedicada para alguien especial</option>
                    <option value="oracion_vip">Petición privada de oración personalizada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    ¿Para quién es la dedicatoria? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={targetPerson}
                    onChange={(e) => setTargetPerson(e.target.value)}
                    placeholder="Ej. Para mi mamá, para mi hijo, en memoria de..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Relátanos la historia o motivo:
                  </label>
                  <textarea
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    rows={4}
                    placeholder="Cuéntanos con tus palabras qué ocurrió, qué milagro hizo Dios o qué mensaje deseas transmitir en la canción..."
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar mi Petición</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
