import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  BookOpen,
  Shirt,
  Download,
  Bell,
  Check,
  ArrowLeft,
  Send,
  Heart,
  Star,
  Layers,
  ChevronRight,
  ShieldCheck,
  PackageCheck,
  Flame,
} from 'lucide-react';
import logoImg from '../assets/images/logo_superacion.jpg';
import poloImg from '../assets/images/logo_polo.jpg';
import duoBanner from '../assets/images/duo_escudo.jpg';

interface ShopSectionProps {
  onBackToHome?: () => void;
  followerName?: string;
}

type ShopCategory = 'todos' | 'digital' | 'articulos';

export const ShopSection: React.FC<ShopSectionProps> = ({
  onBackToHome,
  followerName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('todos');
  const [notifySubscribed, setNotifySubscribed] = useState(() => {
    return localStorage.getItem('sp_shop_notified') === 'true';
  });
  const [userEmail, setUserEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const handleSubscribeNotification = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifySubscribed(true);
    localStorage.setItem('sp_shop_notified', 'true');
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 4000);
  };

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    const existing = JSON.parse(localStorage.getItem('sp_shop_suggestions') || '[]');
    existing.push({
      suggestion: suggestion.trim(),
      follower: followerName || 'Anónimo',
      date: new Date().toISOString(),
    });
    localStorage.setItem('sp_shop_suggestions', JSON.stringify(existing));
    setSuggestionSent(true);
    setTimeout(() => {
      setSuggestion('');
      setSuggestionSent(false);
    }, 4500);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-28 space-y-4">
      {/* Top Header / Navigation Bar */}
      <div className="flex items-center justify-between pb-1">
        {onBackToHome ? (
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-yellow-400 transition-colors py-1 px-2 rounded-lg bg-slate-900/80 border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300">Tienda Oficial</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-[11px] font-black text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Próximamente</span>
        </div>
      </div>

      {/* Main Title Banner: Superacion Personal Shop */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950 border-2 border-yellow-400 shadow-2xl overflow-hidden">
        {/* Glow decorative effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-900 border border-amber-400 p-1 flex-shrink-0 shadow-md">
              <img src={logoImg} alt="Logo Superación Personal" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                Marca Oficial
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Superacion Personal Shop
              </h1>
            </div>
          </div>

          <p className="text-xs text-blue-100 font-medium leading-relaxed">
            {followerName ? `¡Hola ${followerName}! ` : ''}
            Este es el espacio exclusivo donde pondremos a tu disposición los productos digitales y artículos oficiales de nuestra marca <strong>Superación Personal</strong> para edificar tu fe y acompañarte cada día.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-yellow-300/90">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-yellow-400" />
              Productos Digitales
            </span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-yellow-400" />
              Artículos & Moda de Fe
            </span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-yellow-400" />
              Envíos y Descargas
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
        <button
          onClick={() => setSelectedCategory('todos')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            selectedCategory === 'todos'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setSelectedCategory('digital')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            selectedCategory === 'digital'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Digitales</span>
        </button>
        <button
          onClick={() => setSelectedCategory('articulos')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            selectedCategory === 'articulos'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Artículos</span>
        </button>
      </div>

      {/* Empty State Presentation with Structure for Future Products */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-blue-900 to-indigo-700 border-2 border-yellow-400/70 flex items-center justify-center text-yellow-300 shadow-xl">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-base sm:text-lg font-black text-white">
            Catálogo en Preparación
          </h2>
          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            Estamos preparando con mucho cariño los primeros productos digitales y artículos de vestir de nuestra marca <strong>Superación Personal</strong>.
          </p>
        </div>

        {/* Section ready state indicator */}
        <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-blue-950/80 border border-blue-500/30 text-[11px] font-bold text-sky-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sección lista para la publicación de artículos</span>
        </div>
      </div>

      {/* Planned Products Preview (Category slots waiting to be filled) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Líneas que tendremos a la venta</span>
          </h3>
          <span className="text-[10px] text-amber-300 font-bold">Lanzamiento oficial</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Slot 1: Productos Digitales */}
          {(selectedCategory === 'todos' || selectedCategory === 'digital') && (
            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500/30 hover:border-blue-400 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-400/40 flex items-center justify-center text-yellow-300">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-400/30">
                  Descarga Digital
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">
                  Productos Digitales
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Ebooks de fe, devocionales diarios descargables, audiolibros inspiracionales y guías de crecimiento interior.
                </p>
              </div>

              <div className="space-y-1.5 pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Ebooks y Guías espirituales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Audios de oración y motivación</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-sky-400" />
                  <span>Planes devocionales en PDF</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Estado</span>
                <span className="text-yellow-300 font-bold">En maquetación</span>
              </div>
            </div>
          )}

          {/* Slot 2: Artículos y Merchandising */}
          {(selectedCategory === 'todos' || selectedCategory === 'articulos') && (
            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/30 hover:border-amber-400 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Shirt className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Artículos Físicos
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">
                  Artículos & Ropa de la Marca
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  Polos oficiales con el escudo de Superación Personal (como los de Ángel y Argón), tazas de fe, gorras y accesorios.
                </p>
              </div>

              <div className="space-y-1.5 pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Shirt className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Polos oficiales de Superación Personal</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Accesorios y pulseras de fe</span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tazas y termos inspiracionales</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Estado</span>
                <span className="text-amber-300 font-bold">Producción inicial</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Polo Feature Highlight */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border-2 border-yellow-400/60 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-yellow-400 flex-shrink-0 bg-blue-900 p-0.5">
            <img
              src={poloImg}
              alt="Polo Oficial Superación Personal"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase text-yellow-300 tracking-wider">
              Próximo Producto Estrella
            </span>
            <h4 className="text-sm font-black text-white">
              Polo Oficial «Superación Personal»
            </h4>
            <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
              La camiseta azul oficial con el escudo de fe que visten Ángel y Argón en todos los contenidos.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Waitlist / Notification Form */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-400/20 text-yellow-300 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">
              ¿Quieres ser de los primeros en comprar?
            </h4>
            <p className="text-[10px] text-slate-400">
              Te avisaremos en cuanto esté disponible el primer artículo en la tienda.
            </p>
          </div>
        </div>

        {notifySubscribed ? (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              ¡Listo! Te avisaremos con prioridad en cuanto abramos el catálogo de Superación Personal Shop.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubscribeNotification} className="flex gap-2">
            <input
              type="email"
              placeholder="Ingresa tu correo para avisarte..."
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="py-2 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs transition-colors flex items-center gap-1 shadow-md shadow-yellow-400/20 flex-shrink-0"
            >
              <span>Avisarme</span>
            </button>
          </form>
        )}
      </div>

      {/* Suggestion Box: What products would you like to see? */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>¿Qué productos te gustaría encontrar aquí?</span>
          </h4>
        </div>

        <p className="text-[11px] text-slate-400 leading-snug">
          Queremos que esta tienda tenga justo lo que necesitas para tu crecimiento espiritual y personal. ¡Cuéntanos qué artículos te gustaría que tengamos!
        </p>

        {suggestionSent ? (
          <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-400/40 text-blue-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span>¡Muchas gracias por tu sugerencia! La tendremos en cuenta para los primeros lanzamientos.</span>
          </div>
        ) : (
          <form onSubmit={handleSendSuggestion} className="space-y-2">
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Ejemplo: Ebooks de oraciones diarias, poleras con capucha, pulseras de fe, tazas..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 resize-none"
            />
            <button
              type="submit"
              disabled={!suggestion.trim()}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar sugerencia de producto</span>
            </button>
          </form>
        )}
      </div>

      {/* Footer Branding for the Shop */}
      <div className="text-center pt-2 pb-1 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <img src={logoImg} alt="Logo" className="w-5 h-5 object-contain" />
          <span className="text-xs font-black text-amber-300">Superación Personal Shop</span>
        </div>
        <p className="text-[10px] text-slate-500">
          Espacio preparado para la venta oficial de productos digitales y artículos de marca.
        </p>
      </div>
    </div>
  );
};
