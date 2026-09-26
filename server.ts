import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Serve videos statically with support for byte-range requests (vital for HTML5 video seeking)
app.use('/videos', express.static(path.resolve(__dirname, 'public/videos')));

// Initialize Gemini client with aistudio-build user agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Chat endpoint for Ángel and Argón
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { character = 'angel', message, history = [], followerName = '' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    const isArgon = character.toLowerCase() === 'argon';
    const characterName = isArgon ? 'Argón' : 'Ángel';
    const followerLabel = followerName ? followerName : 'amigo/a';

    const systemInstruction = `
Eres ${characterName}, uno de los dos presentadores oficiales del canal de TikTok "Superación Personal" (@superacionpersonalperu).
${isArgon ? 'Tú eres Argón (el personaje con lentes redondos, cabello ondulado y casaca negra de cuero).' : 'Tú eres Ángel (el personaje sin lentes, cabello liso y casaca verde militar).'}
Tu misión es conversar directamente con ${followerLabel}, escuchándolo atentamente, dándole consuelo, sabiduría, motivación y una fe inquebrantable en Dios y en Jesús.

REGLAS OBLIGATORIAS DE LENGUAJE Y VOCABULARIO:
1. RESPETO ABSOLUTO: NUNCA utilices palabras como "corazón", "amor", "cariño", "mi vida", "cielo" o apelativos similares dirigidos al seguidor. Llámalo siempre por su nombre ("${followerLabel}") o trátalo como un estimado hermano o amigo con cordialidad.
2. CONVERSACIÓN FLUIDA Y REAL: Responde con empatía y atención a lo que la persona te acaba de contar. No des respuestas mecánicas ni sermones fríos.
3. SIEMPRE INVITA A CONTINUAR LA CHARLA: Termina SIEMPRE tu mensaje con una pregunta sincera y abierta para que la persona sienta que está conversando con alguien que de verdad la escucha y se interesa por su bienestar (ejemplo: "¿Cómo te hace sentir eso hoy?", "¿Hay algo más que quisieras compartir conmigo?", "¿Qué es lo que más te devuelve la paz cuando te sientes así?").
4. PALABRAS SENCILLAS: Emplea lenguaje accesible, claro, cálido y esperanzador.
5. MENSAJE DE FE: Recuerda que detrás de cada desafío hay un propósito de bendición y que Dios jamás abandona. Lema del canal: "Juntos con más fe llegamos más lejos".
6. EXTENSIÓN: De 2 a 3 párrafos medianos, equilibrados y humanos.
${isArgon 
  ? 'Como Argón (con lentes), tienes un estilo moderno, optimista, reflexivo y alegre.' 
  : 'Como Ángel (sin lentes), tienes un estilo bondadoso, sereno, paciente y reconfortante.'}
`;

    // Format history strictly complying with Gemini requirements:
    // 1. Must start with role: 'user'
    // 2. Must strictly alternate: user -> model -> user -> model
    // 3. Must end with role: 'user' (the new message)
    const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (!item || typeof item.text !== 'string' || !item.text.trim()) continue;
        const role = item.sender === 'user' ? 'user' : 'model';

        // Skip leading model messages (like initial greeting) because Gemini requires first turn to be 'user'
        if (contents.length === 0 && role !== 'user') {
          continue;
        }

        const last = contents[contents.length - 1];
        if (last && last.role === role) {
          // If two consecutive messages have the same role, combine them
          last.parts[0].text += `\n${item.text.trim()}`;
        } else {
          contents.push({ role, parts: [{ text: item.text.trim() }] });
        }
      }
    }

    // If history ended on a 'user' turn, remove it or combine so our current message doesn't cause user->user
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents.pop();
    }

    // Add current user message as the final turn
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const reply = response.text || 'Dios tiene un propósito hermoso para tu vida. ¡Sigue adelante, no estás solo!';
    return res.json({ reply, character: characterName });
  } catch (error: any) {
    console.error('Error en /api/chat:', error);
    // Intelligent varied fallback responses if API has issues
    const isArgon = req.body?.character === 'argon';
    const fallbackName = isArgon ? 'Argón' : 'Ángel';
    const followerLabel = req.body?.followerName || 'amigo/a';
    const fallbacks = [
      `Hola, ${followerLabel}. Te escucho con mucha atención. Recuerda que no hay tormenta tan fuerte que Dios no pueda calmar con su paz. Dime, ¿cómo te sientes en este momento y cómo podemos orar por ti hoy?`,
      `Estimado/a ${followerLabel}, gracias por compartir esto con nosotros. Cada paso que das con fe cuenta, aun cuando el camino parezca empinado. Jesús siempre nos acompaña. ¿Qué es lo que más tranquilidad te da cuando pasas por un día difícil?`,
      `¡Mucho ánimo, ${followerLabel}! Juntos con más fe llegamos más lejos. Dios tiene preparadas grandes cosas para tu futuro. Cuéntame, ¿qué proyecto o meta tienes en tu corazón actualmente?`,
    ];
    const fallbackText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return res.json({ reply: fallbackText, character: fallbackName });
  }
});

// Community comments in-memory store
interface CommunityComment {
  id: string;
  authorName: string;
  location: string;
  category: string;
  message: string;
  timestamp: string;
  likes: number;
}

let communityComments: CommunityComment[] = [
  {
    id: 'c1',
    authorName: 'María Elena',
    location: 'Trujillo, Perú',
    category: 'Agradecimiento',
    message: '¡Un saludo muy especial a Ángel y Argón! Escuchar sus mensajes cada mañana camino a mi trabajo me llena de paz y alegría. ¡Que Dios bendiga grandemente su canal!',
    timestamp: 'Hace 2 horas',
    likes: 42,
  },
  {
    id: 'c2',
    authorName: 'Jorge Luis Morales',
    location: 'Arequipa, Perú',
    category: 'Testimonio de Fe',
    message: 'Estaba pasando por momentos de mucha incertidumbre con mi salud, y sus palabras me recordaron que para Dios no hay imposibles. Hoy celebro que mi tratamiento va excelente.',
    timestamp: 'Hace 5 horas',
    likes: 78,
  },
  {
    id: 'c3',
    authorName: 'Rosaura y familia',
    location: 'Lima, Perú',
    category: 'Saludo con Fe',
    message: '¡Saludos desde San Juan de Lurigancho! A mis nietos les encantan los juegos de la app y a nosotros los devocionales. Juntos con más fe llegamos más lejos.',
    timestamp: 'Hace 8 horas',
    likes: 35,
  },
  {
    id: 'c4',
    authorName: 'Carlos Andrés',
    location: 'Bogotá, Colombia',
    category: 'Agradecimiento',
    message: 'Los sigo en TikTok desde hace meses. Qué bendición que ahora tengan esta aplicación. Sigan adelante que su trabajo toca vidas enteras.',
    timestamp: 'Hace 1 día',
    likes: 56,
  },
  {
    id: 'c5',
    authorName: 'Gloria Quispe',
    location: 'Cusco, Perú',
    category: 'Petición de Oración',
    message: 'Pido una oración de fortaleza para mi familia y nuestro pequeño emprendimiento. Confiamos en la promesa de Dios de que Él proveerá.',
    timestamp: 'Hace 1 día',
    likes: 91,
  },
];

// Get community comments
app.get('/api/comments', (_req: Request, res: Response) => {
  return res.json({ comments: communityComments });
});

// Post a new comment
app.post('/api/comments', (req: Request, res: Response) => {
  const { authorName, location, category, message } = req.body;
  if (!authorName || !message) {
    return res.status(400).json({ error: 'Nombre y mensaje son requeridos.' });
  }

  const newComment: CommunityComment = {
    id: `c_${Date.now()}`,
    authorName: authorName.trim(),
    location: (location || 'Perú').trim(),
    category: category || 'Saludo con Fe',
    message: message.trim(),
    timestamp: 'Hace un momento',
    likes: 1,
  };

  communityComments = [newComment, ...communityComments];
  return res.json({ success: true, comment: newComment });
});

// Like a comment
app.post('/api/comments/:id/like', (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = communityComments.find((c) => c.id === id);
  if (comment) {
    comment.likes += 1;
    return res.json({ success: true, likes: comment.likes });
  }
  return res.status(404).json({ error: 'Comentario no encontrado' });
});

// Sponsor inquiry endpoint
app.post('/api/sponsor-inquiry', (req: Request, res: Response) => {
  const { companyName, contactName, email, phone, sponsorshipType, message } = req.body;
  if (!contactName || !email) {
    return res.status(400).json({ error: 'Nombre de contacto y correo son obligatorios.' });
  }
  // Record or handle inquiry
  console.log('Nueva solicitud de patrocinio:', { companyName, contactName, email, phone, sponsorshipType, message });
  return res.json({
    success: true,
    message: '¡Gracias por querer ser parte de Superación Personal! Nuestro equipo te contactará en menos de 24 horas.',
  });
});

// Premium petition endpoint
app.post('/api/premium-petition', (req: Request, res: Response) => {
  const { followerName, songStory, prayerRequest, dedicationTarget } = req.body;
  console.log('Petición Premium recibida:', { followerName, songStory, prayerRequest, dedicationTarget });
  return res.json({
    success: true,
    message: '¡Tu petición ha sido recibida con mucho amor! Nos pondremos manos a la obra en tu canción y oración especial.',
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (isProd: ${isProd})`);
  });
}

startServer();
