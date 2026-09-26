import { Character, VideoItem } from '../types';

export const CHARACTERS: Record<string, Character> = {
  angel: {
    id: 'angel',
    name: 'Ángel',
    role: 'Compañero de Fe',
    tagline: 'Juntos con más fe llegamos más lejos',
    description: 'Sereno, bondadoso y reconfortante. Siempre tiene una palabra de paz y esperanza para tu vida.',
    avatarBg: 'from-blue-600 to-indigo-900',
    accentColor: '#3b82f6',
  },
  argon: {
    id: 'argon',
    name: 'Argón',
    role: 'Motivador de Valentía',
    tagline: 'Dios tiene un plan extraordinario para ti',
    description: 'Entusiasta, reflexivo y perseverante. Te anima a levantarte con ánimo y perseverar en la fe.',
    avatarBg: 'from-amber-600 to-orange-900',
    accentColor: '#f59e0b',
  },
};

export const DAILY_VERSES = [
  {
    verse: 'Todo lo puedo en Cristo que me fortalece.',
    ref: 'Filipenses 4:13',
  },
  {
    verse: 'El Señor es mi pastor; nada me faltará.',
    ref: 'Salmos 23:1',
  },
  {
    verse: 'La paz os dejo, mi paz os doy; no se turbe vuestro corazón ni tenga miedo.',
    ref: 'Juan 14:27',
  },
  {
    verse: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.',
    ref: 'Isaías 41:10',
  },
  {
    verse: 'Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas.',
    ref: 'Jeremías 33:3',
  },
  {
    verse: 'Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.',
    ref: 'Isaías 40:31',
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'La fuerza de creer cuando todo parece difícil',
    duration: '03:45',
    category: 'Fe y Esperanza',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80',
    videoUrl: '/videos/video_1.mp4',
    tiktokUrl: 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS',
    description: 'Un mensaje directo y poderoso para recordar que detrás de cada momento duro, Dios está forjando una bendición grande para ti y tu familia.',
    views: '342K',
    likes: '48.2K',
    topicTag: '#FeQueMueveMontañas',
  },
  {
    id: 'v2',
    title: 'Dios restaura lo que las dificultades quebraron',
    duration: '02:50',
    category: 'Restauración',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=80',
    videoUrl: '/videos/video_2.mp4',
    tiktokUrl: 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS',
    description: 'Aprende a entregar tus cargas en oración y descubre cómo la paz de Dios sana las heridas y llena tu hogar de alegría.',
    views: '289K',
    likes: '39.7K',
    topicTag: '#PazInterior',
  },
  {
    id: 'v3',
    title: 'Cómo vencer el desánimo y levantarte hoy mismo',
    duration: '04:12',
    category: 'Superación Diaria',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80',
    videoUrl: '/videos/video_3.mp4',
    tiktokUrl: 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS',
    description: 'Palabras inspiradoras de Ángel y Argón para empezar el día con gratitud, disciplina y la certeza de que no caminas solo.',
    views: '415K',
    likes: '56.1K',
    topicTag: '#SuperaciónPersonal',
  },
  {
    id: 'v4',
    title: 'El milagro que Dios tiene preparado a tu favor',
    duration: '03:15',
    category: 'Milagros y Promesas',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80',
    videoUrl: '/videos/video_4.mp4',
    tiktokUrl: 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS',
    description: 'No te rindas hoy. Muchas veces la respuesta y el milagro están más cerca de lo que imaginas. ¡Mantén tu fe firme!',
    views: '520K',
    likes: '72.4K',
    topicTag: '#ConfianzaEnDios',
  },
  {
    id: 'v5',
    title: 'Oración de bendición para tu hogar y trabajo',
    duration: '03:30',
    category: 'Oración Guiada',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&auto=format&fit=crop&q=80',
    videoUrl: '/videos/video_5.mp4',
    tiktokUrl: 'https://www.tiktok.com/@superacionpersonalperu?_r=1&_t=ZS-9A3ZS7PKNwS',
    description: 'Una oración profunda para declarar prosperidad, salud y armonía en tu familia en el nombre de Dios.',
    views: '610K',
    likes: '89.3K',
    topicTag: '#OraciónDiaria',
  },
];

export const SPONSOR_BENEFITS = [
  {
    icon: 'Smartphone',
    title: 'Banner oficial en la aplicación',
    desc: 'Tu marca visible ante miles de personas y familias que entran a orar, reflexionar y superarse a diario.',
  },
  {
    icon: 'Radio',
    title: 'Mención en vivo en directos',
    desc: 'Menciones cálidas y agradecimientos en nuestras transmisiones en vivo en TikTok (@superacionpersonalperu).',
  },
  {
    icon: 'Users',
    title: 'Agradecimiento en videos del canal',
    desc: 'Presencia con logo y mención especial en nuestros videos de superación personal que alcanzan miles de reproducciones.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Asociación de marca con valores',
    desc: 'Vincula a tu empresa o negocio con un mensaje limpio de esperanza, fe, ética, familia y superación integral.',
  },
];

export const CURRENT_SPONSORS = [
  {
    id: 'sp1',
    name: 'Panadería & Pastelería Bendición',
    tagline: 'El pan de cada día horneado con amor y fe en el hogar',
    badge: 'Patrocinador Oro',
    color: 'from-amber-500/20 to-amber-700/20',
    border: 'border-amber-500/40',
  },
  {
    id: 'sp2',
    name: 'Librería Cristiana La Buena Semilla',
    tagline: 'Biblias, devocionales y libros que nutren el alma familiar',
    badge: 'Patrocinador Destacado',
    color: 'from-blue-500/20 to-blue-700/20',
    border: 'border-blue-500/40',
  },
  {
    id: 'sp3',
    name: 'Calzados Caminando en Fe',
    tagline: 'Comodidad y durabilidad para cada paso en tu propósito',
    badge: 'Patrocinador Aliado',
    color: 'from-emerald-500/20 to-emerald-700/20',
    border: 'border-emerald-500/40',
  },
];
