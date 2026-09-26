import React, { useState, useEffect } from 'react';
import { CommunityComment } from '../types';
import { 
  MessageSquare, 
  Send, 
  Heart, 
  Sparkles, 
  MapPin, 
  Check, 
  Filter, 
  Smile, 
  User,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import duoEscudo from '../assets/images/duo_escudo.jpg';

interface CommentsSectionProps {
  followerName: string;
  onOpenNameModal: () => void;
}

const INITIAL_COMMENTS: CommunityComment[] = [
  {
    id: 'c1',
    authorName: 'María Elena Salazar',
    location: 'Trujillo, Perú',
    category: 'Agradecimiento',
    message: '¡Un saludo muy especial a Ángel y Argón! Escuchar sus mensajes cada mañana camino a mi trabajo me llena de paz y alegría. ¡Que Dios bendiga grandemente su canal en TikTok!',
    timestamp: 'Hace 2 horas',
    likes: 42,
  },
  {
    id: 'c2',
    authorName: 'Jorge Luis Morales',
    location: 'Arequipa, Perú',
    category: 'Testimonio',
    message: 'Estaba pasando por momentos de mucha incertidumbre con mi salud, y sus palabras me recordaron que para Dios no hay imposibles. Hoy celebro que mi tratamiento va excelente. ¡Juntos con más fe llegamos más lejos!',
    timestamp: 'Hace 5 horas',
    likes: 78,
  },
  {
    id: 'c3',
    authorName: 'Rosaura y familia',
    location: 'Lima, Perú',
    category: 'Saludo de Fe',
    message: '¡Saludos desde San Juan de Lurigancho! A mis nietos les encantan los juegos bíblicos de la app y a nosotros los devocionales. Sigan adelante, son de gran bendición.',
    timestamp: 'Hace 8 horas',
    likes: 35,
  },
  {
    id: 'c4',
    authorName: 'Carlos Andrés Meza',
    location: 'Bogotá, Colombia',
    category: 'Agradecimiento',
    message: 'Los sigo en TikTok desde hace meses. Qué bendición que ahora tengan esta aplicación oficial. Sus reflexiones tocan el alma de familias enteras.',
    timestamp: 'Hace 1 día',
    likes: 56,
  },
  {
    id: 'c5',
    authorName: 'Gloria Quispe',
    location: 'Cusco, Perú',
    category: 'Petición de Oración',
    message: 'Pido una oración de fortaleza para mi familia y nuestro pequeño emprendimiento. Confiamos en la promesa de Dios de que Él nunca nos soltará.',
    timestamp: 'Hace 1 día',
    likes: 91,
  },
  {
    id: 'c6',
    authorName: 'Víctor Manuel P.',
    location: 'Piura, Perú',
    category: 'Saludo de Fe',
    message: '¡Saludos a todo el equipo de Superación Personal! Gran trabajo con los personajes Ángel y Argón. Dios bendiga cada video que suben.',
    timestamp: 'Hace 2 días',
    likes: 64,
  },
];

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  followerName,
  onOpenNameModal,
}) => {
  const [comments, setComments] = useState<CommunityComment[]>(() => {
    const saved = localStorage.getItem('sp_community_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COMMENTS;
      }
    }
    return INITIAL_COMMENTS;
  });

  const [authorNameInput, setAuthorNameInput] = useState(followerName || '');
  const [locationInput, setLocationInput] = useState('Lima, Perú');
  const [categoryInput, setCategoryInput] = useState('Saludo de Fe');
  const [messageInput, setMessageInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (followerName && !authorNameInput) {
      setAuthorNameInput(followerName);
    }
  }, [followerName]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem('sp_community_comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || isSubmitting) return;

    const author = authorNameInput.trim() || followerName || 'Seguidor de Fe';
    const location = locationInput.trim() || 'Perú';
    const message = messageInput.trim();

    setIsSubmitting(true);

    const newComment: CommunityComment = {
      id: `c_${Date.now()}`,
      authorName: author,
      location,
      category: categoryInput,
      message,
      timestamp: 'Hace un momento',
      likes: 1,
      hasLiked: true,
    };

    // Update state immediately
    setComments((prev) => [newComment, ...prev]);
    setMessageInput('');
    setIsSubmitting(false);
    setShowSuccess(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => setShowSuccess(false), 3500);

    // Sync with backend API if available
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: author,
          location,
          category: categoryInput,
          message,
        }),
      });
    } catch (err) {
      // Backend sync optional
    }
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const hasLiked = c.hasLiked;
          return {
            ...c,
            likes: hasLiked ? c.likes - 1 : c.likes + 1,
            hasLiked: !hasLiked,
          };
        }
        return c;
      })
    );
  };

  const filteredComments = comments.filter((c) => {
    if (selectedFilter === 'Todos') return true;
    return c.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const categories = ['Todos', 'Saludo de Fe', 'Testimonio', 'Agradecimiento', 'Petición de Oración'];

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 space-y-4">
      {/* Top Banner */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-2xl bg-slate-900">
        <img
          src={duoEscudo}
          alt="Ángel y Argón - Superación Personal"
          className="w-full h-36 object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-yellow-400/40 w-fit mb-1">
            <HeartHandshake className="w-3.5 h-3.5 text-yellow-300" />
            <span>Muro de la Comunidad de Fe</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white leading-tight">
            Déjanos tu mensaje o saludo
          </h2>
          <p className="text-[11px] text-blue-100 font-medium">
            Comparte tu saludo para Ángel, Argón y toda la familia de Superación Personal.
          </p>
        </div>
      </div>

      {/* Form: Déjanos un Comentario */}
      <div className="p-4 rounded-3xl bg-slate-900 border-2 border-blue-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center font-black">
              <MessageSquare className="w-4 h-4 fill-slate-950" />
            </div>
            <h3 className="text-xs sm:text-sm font-black text-white">
              Escribe tu mensaje o saludo
            </h3>
          </div>
          {!followerName && (
            <button
              onClick={onOpenNameModal}
              className="text-[10px] text-yellow-300 hover:underline font-bold"
            >
              ¿Dinos tu nombre?
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Name Input */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">
                Tu Nombre
              </label>
              <input
                type="text"
                value={authorNameInput}
                onChange={(e) => setAuthorNameInput(e.target.value)}
                placeholder="Ej. Carlos / María"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-yellow-400 text-xs text-white outline-none"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">
                Ciudad o País
              </label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Ej. Lima, Perú"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-yellow-400 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">
              Tipo de Mensaje
            </label>
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-yellow-400 text-xs text-white outline-none"
            >
              <option value="Saludo de Fe">🤝 Saludo con Fe y Ánimo</option>
              <option value="Testimonio">🌟 Testimonio de Bendición</option>
              <option value="Agradecimiento">🙏 Agradecimiento a Dios y al Canal</option>
              <option value="Petición de Oración">🕊️ Petición de Oración</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">
              Tu Mensaje, Saludo o Testimonio
            </label>
            <textarea
              rows={3}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              maxLength={300}
              placeholder="Escribe aquí tus palabras de aliento, saludo o agradecimiento..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-yellow-400 text-xs text-white outline-none resize-none"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-0.5">
              <span>Mensaje visible para toda la comunidad</span>
              <span>{messageInput.length}/300</span>
            </div>
          </div>

          {/* Success Notification */}
          {showSuccess && (
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>¡Tu saludo fue publicado con éxito en el muro!</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!messageInput.trim() || isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-98 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Publicar en la zona de comentarios</span>
          </button>
        </form>
      </div>

      {/* Filter Chips */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-300 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Comentarios y saludos ({filteredComments.length})</span>
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">
            Actualizado en vivo
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`flex-shrink-0 text-[11px] px-3 py-1 rounded-full font-bold transition-all ${
                selectedFilter === cat
                  ? 'bg-yellow-400 text-slate-950 shadow-md font-black'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Comments List Feed */}
      <div className="space-y-3">
        {filteredComments.map((item) => {
          const initials = item.authorName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || 'SP';

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-900 border-2 border-slate-800/90 hover:border-yellow-400/40 shadow-lg space-y-2 transition-all"
            >
              {/* Header info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow">
                    {initials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                      {item.authorName}
                    </h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                    </span>
                  </div>
                </div>

                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/30">
                  {item.category}
                </span>
              </div>

              {/* Message text */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{item.message}"
              </p>

              {/* Footer actions: Like / Amén */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                    item.hasLiked
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${item.hasLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  <span className="text-[11px] font-bold">Amén • {item.likes}</span>
                </button>

                <span className="text-[10px] text-slate-500 font-semibold">
                  Canal Superación Personal
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
