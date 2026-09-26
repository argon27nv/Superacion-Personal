export type CharacterId = 'angel' | 'argon';

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  tagline: string;
  description: string;
  avatarBg: string;
  accentColor: string;
}

export type AvatarState = 'closed_closed' | 'open_closed' | 'closed_open' | 'open_open';
// Format: eyes_mouth:
// - closed_closed: eyes closed, mouth closed (serene blink)
// - open_closed: eyes open, mouth closed (attentive listening)
// - open_open: eyes open, mouth open (speaking attentively)
// - closed_open: eyes closed, mouth open (joyful speaking)

export interface ChatMessage {
  id: string;
  sender: 'user' | 'character';
  text: string;
  timestamp: string;
  characterId?: CharacterId;
}

export type ActiveTab = 'inicio' | 'chat' | 'juegos' | 'comentarios' | 'premium' | 'patrocinios' | 'shop';

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  videoUrl?: string;
  tiktokUrl: string;
  description: string;
  views: string;
  likes: string;
  topicTag: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  location: string;
  category: string;
  message: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
}

export interface SponsorInquiry {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sponsorshipType: 'banner_app' | 'mencion_vivo' | 'agradecimiento_video' | 'paquete_completo';
  message: string;
}

export interface PremiumPetition {
  followerName: string;
  type: 'cancion_historia' | 'cancion_milagro' | 'cancion_especial' | 'oracion_vip';
  storyOrRequest: string;
  targetPerson?: string;
}
