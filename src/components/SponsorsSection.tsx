import React, { useState } from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { SPONSOR_BENEFITS, CURRENT_SPONSORS } from '../data/mockData';
import { Smartphone, Radio, Users, HeartHandshake, Check, Send, Sparkles, Building2, Phone, Mail, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SponsorsSectionProps {
  onBackToHome?: () => void;
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ onBackToHome }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sponsorshipType, setSponsorshipType] = useState('banner_app');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch('/api/sponsor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactName,
          email,
          phone,
          sponsorshipType,
          message,
        }),
      });

      setIsSubmitted(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      setTimeout(() => {
        setIsSubmitted(false);
        setShowInquiryModal(false);
        setCompanyName('');
        setContactName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }, 3500);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-sky-400" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-amber-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-400" />;
      default:
        return <HeartHandshake className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 space-y-4">
      {/* Hero Card */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border-2 border-yellow-400 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 max-w-[62%]">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 px-3 py-0.5 rounded-full bg-blue-950/70 border border-yellow-400/40">
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              <span>Alianzas de Valor</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-xs">
              ¿Quieres patrocinar Superación Personal?
            </h2>
            <p className="text-xs text-blue-100 font-medium leading-snug">
              Tu negocio también puede ser parte de esta misión de fe y esperanza.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <CharacterAvatar characterId="argon" size="lg" showHalo />
            <div className="mt-1 px-2 py-0.5 rounded-md bg-yellow-400 text-slate-950 text-[9px] font-black text-center shadow-xs">
              Argón
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-4 pt-3 border-t border-white/20 relative z-10">
          <button
            onClick={() => setShowInquiryModal(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-yellow-400/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <HeartHandshake className="w-5 h-5 text-slate-950" />
            <span>Quiero ser patrocinador</span>
          </button>
        </div>
      </div>

      {/* 3 Core Benefits for Sponsors */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Qué obtiene tu empresa o negocio:
        </h3>

        {SPONSOR_BENEFITS.map((benefit, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5 shadow-md hover:border-sky-500/30 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0">
              {getIcon(benefit.icon)}
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {benefit.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Current Active Sponsor Banners Showcase */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Marcas que creen y apoyan:
          </h3>
          <span className="text-[10px] text-amber-400 font-semibold">
            Banners de muestra
          </span>
        </div>

        <div className="space-y-2">
          {CURRENT_SPONSORS.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`p-3.5 rounded-2xl bg-gradient-to-r ${sponsor.color} border ${sponsor.border} flex items-center justify-between shadow-md`}
            >
              <div className="space-y-0.5 max-w-[75%]">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 block">
                  {sponsor.badge}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {sponsor.name}
                </h4>
                <p className="text-[10px] text-slate-300">
                  {sponsor.tagline}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center text-xs font-black text-amber-400 flex-shrink-0">
                P
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl p-5 overflow-hidden">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-sky-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Solicitud de Patrocinio</h4>
                <p className="text-[10px] text-slate-400">Superación Personal Oficial</p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="text-xs font-bold text-white">¡Propuesta recibida!</h5>
                <p className="text-[11px] text-emerald-200">
                  Gracias por tu interés en patrocinar el canal. Te contactaremos a tu WhatsApp/correo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Empresa o Negocio
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej. Mi Tienda / Emprendimiento SAC"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Nombre de Contacto
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contacto@tuempresa.com"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+51 999..."
                      required
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Tipo de Publicidad Deseada
                  </label>
                  <select
                    value={sponsorshipType}
                    onChange={(e) => setSponsorshipType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                  >
                    <option value="banner_app">Banner publicitario en la aplicación</option>
                    <option value="mencion_vivo">Mención en vivo en directos de TikTok</option>
                    <option value="agradecimiento_video">Publicidad y agradecimiento en videos oficiales</option>
                    <option value="paquete_completo">Paquete completo (Banner + Directos + Videos)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Mensaje o detalles de tu propuesta:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    placeholder="Cuéntanos brevemente sobre tu producto o servicio..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Enviando...' : 'Enviar Solicitud de Patrocinio'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
