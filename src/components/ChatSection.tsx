import React, { useState, useRef, useEffect } from 'react';
import { CharacterId, ChatMessage, AvatarState } from '../types';
import { CHARACTERS } from '../data/mockData';
import { CharacterAvatar } from './CharacterAvatar';
import { Send, Sparkles, MessageCircle, Heart, Info, RefreshCw, Volume2 } from 'lucide-react';

interface ChatSectionProps {
  followerName: string;
  onOpenNameModal: () => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({
  followerName,
  onOpenNameModal,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>('angel');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'character',
      characterId: 'angel',
      text: followerName
        ? `¡Hola, ${followerName}! Qué alegría y bendición saludarte hoy. Dime, ¿cómo te encuentras en este momento? Cuéntame qué tienes en tu mente o en tu corazón; aquí estoy para escucharte con atención y caminar contigo en la fe.`
        : '¡Hola, bienvenido/a a nuestro espacio de fe! Qué alegría tenerte aquí. Cuéntame, ¿cómo ha estado tu día y de qué te gustaría que platiquemos hoy?',
      timestamp: 'Ahora',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarTalking, setIsAvatarTalking] = useState(false);
  const [currentBubbleText, setCurrentBubbleText] = useState<string>(
    followerName
      ? `¡Hola, ${followerName}! Estoy listo para escucharte con respeto y fe. Cuéntame qué hay en tu corazón.`
      : '¡Hola! Estoy listo para escucharte con respeto y fe. Dime, ¿cómo te sientes hoy?'
  );
  const [showFigureGuide, setShowFigureGuide] = useState(false);
  const [previewState, setPreviewState] = useState<AvatarState | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChar = CHARACTERS[selectedCharacter];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAvatarTalking, isLoading]);

  // Quick faith conversational starters
  const quickPrompts = [
    'Hoy me siento un poco desanimado/a con mis planes...',
    'Tengo dudas sobre cómo mantener la calma y la paciencia',
    '¿Qué consejo me das para empezar el día con más fe?',
    'Quiero agradecer a Dios por un milagro en mi familia',
    'A veces siento mucha ansiedad por el futuro...',
    '¿Cómo podemos orar juntos por mi trabajo?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);
    setIsAvatarTalking(true);
    setCurrentBubbleText(`Escuchándote con atención y reflexionando en una respuesta con fe...`);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: selectedCharacter,
          message: messageText,
          history: updatedMessages,
          followerName: followerName || '',
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'Dios tiene un propósito grande para ti. Sigue adelante con fe.';

      // Add character message
      const charMessage: ChatMessage = {
        id: `char-${Date.now()}`,
        sender: 'character',
        characterId: selectedCharacter,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, charMessage]);

      // Set the dynamic speech bubble to a vivid excerpt of the reply
      const firstSentence = replyText.split(/[.?!]\s/)[0] || replyText.slice(0, 110);
      setCurrentBubbleText(`${firstSentence}...`);

      // Avatar talking animation stays active during reading time
      const talkingDuration = Math.min(Math.max(replyText.length * 20, 2500), 5000);
      setTimeout(() => {
        setIsAvatarTalking(false);
      }, talkingDuration);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const fallbackMsg: ChatMessage = {
        id: `char-error-${Date.now()}`,
        sender: 'character',
        characterId: selectedCharacter,
        text: `Estimado/a ${followerName || 'amigo/a'}, te escucho con todo respeto. Recuerda que Dios no nos da espíritu de temor, sino de poder, de amor y de dominio propio. Respira hondo. ¿Hay algo más que quieras compartir conmigo para apoyarte en oración?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setCurrentBubbleText('Dios está en control. Cuéntame, ¿cómo te sientes ahora?');
      setTimeout(() => {
        setIsAvatarTalking(false);
      }, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCharacterChange = (charId: CharacterId) => {
    setSelectedCharacter(charId);
    setPreviewState(null);
    const greeting = charId === 'argon'
      ? (followerName
          ? `¡Hola, ${followerName}! Soy Argón. Qué honor saludarte. Dime en qué podemos ayudarte hoy, ¡vamos a perseverar con fe y optimismo!`
          : '¡Hola! Soy Argón. Qué honor tenerte aquí. Cuéntame, ¿qué consulta tienes hoy? ¡Juntos en la fe nada es imposible!')
      : (followerName
          ? `¡Hola, ${followerName}! Soy Ángel. La paz de Dios esté contigo. Aquí estoy para escucharte con respeto y brindarte aliento.`
          : '¡Hola! Soy Ángel. La paz de Dios esté contigo. Estoy aquí para acompañarte y responder a tus dudas con fe.');

    setMessages((prev) => [
      ...prev,
      {
        id: `switch-${Date.now()}`,
        sender: 'character',
        characterId: charId,
        text: greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setCurrentBubbleText(charId === 'argon' ? 'Argón: ¡Juntos con más fe llegamos más lejos!' : 'Ángel: La paz de Dios llene tu corazón.');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] pb-24">
      {/* Top Section: Character Selector */}
      <div className="px-4 pt-3 pb-2 text-center">
        <h2 className="text-xs font-black uppercase tracking-wider text-yellow-300 mb-2">
          Elige con quién conversar en vivo
        </h2>

        {/* Character Switch Buttons */}
        <div className="flex items-center justify-center gap-6">
          {/* Ángel */}
          <button
            onClick={() => handleCharacterChange('angel')}
            className={`flex flex-col items-center gap-1.5 transition-transform ${
              selectedCharacter === 'angel' ? 'scale-105' : 'opacity-60 hover:opacity-90'
            }`}
          >
            <div className={`relative p-0.5 rounded-full transition-all ${
              selectedCharacter === 'angel'
                ? 'ring-4 ring-sky-400/90 shadow-lg shadow-sky-500/40'
                : 'border border-slate-700'
            }`}>
              <CharacterAvatar characterId="angel" size="sm" isTalking={selectedCharacter === 'angel' && isAvatarTalking} />
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-xs font-black ${selectedCharacter === 'angel' ? 'text-sky-300' : 'text-slate-400'}`}>
                Ángel
              </span>
              <span className="text-[9px] text-sky-400/80 font-bold">Compañero</span>
            </div>
          </button>

          {/* Argón */}
          <button
            onClick={() => handleCharacterChange('argon')}
            className={`flex flex-col items-center gap-1.5 transition-transform ${
              selectedCharacter === 'argon' ? 'scale-105' : 'opacity-60 hover:opacity-90'
            }`}
          >
            <div className={`relative p-0.5 rounded-full transition-all ${
              selectedCharacter === 'argon'
                ? 'ring-4 ring-amber-400/90 shadow-lg shadow-amber-500/40'
                : 'border border-slate-700'
            }`}>
              <CharacterAvatar characterId="argon" size="sm" isTalking={selectedCharacter === 'argon' && isAvatarTalking} />
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-xs font-black ${selectedCharacter === 'argon' ? 'text-amber-300' : 'text-slate-400'}`}>
                Argón
              </span>
              <span className="text-[9px] text-amber-400/80 font-bold">Motivador</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Avatar Showcase (Center Screen) */}
      <div className="relative px-4 py-2 flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          {/* Avatar with live talking animation */}
          <CharacterAvatar
            characterId={selectedCharacter}
            state={previewState || undefined}
            size="xl"
            showHalo
            isTalking={isAvatarTalking}
          />

          {/* Active character name and status */}
          <div className="mt-2 text-center flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black text-yellow-300">
              {activeChar.name} está conectado
            </span>
          </div>

          {/* 4 Figures Explorer Toggle */}
          <button
            onClick={() => setShowFigureGuide(!showFigureGuide)}
            className="mt-1 text-[11px] text-amber-400/90 hover:text-amber-300 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 transition-colors"
          >
            <Info className="w-3 h-3" />
            <span>Ver las 4 figuras del avatar (boca y ojos)</span>
          </button>
        </div>

        {/* 4 Figures Interactive Inspector Panel */}
        {showFigureGuide && (
          <div className="w-full max-w-md mt-3 p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>4 Estados sincronizados del personaje:</span>
              </div>
              {previewState && (
                <button
                  onClick={() => setPreviewState(null)}
                  className="text-[10px] text-sky-400 hover:underline flex items-center gap-0.5"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Volver a auto-hablar</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              Toca cualquiera de las 4 figuras para ver cómo abre/cierra boca y ojos según habla:
            </p>

            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
              {/* 1. Boca cerrada, ojos abiertos */}
              <button
                onClick={() => setPreviewState('open_closed')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  previewState === 'open_closed'
                    ? 'border-sky-400 bg-sky-950/60 shadow-md text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CharacterAvatar characterId={selectedCharacter} state="open_closed" size="xs" />
                <span className="font-semibold text-slate-200">1. Boca cerrada, ojos abiertos</span>
                <span className="text-[9px] text-slate-500">Escuchando con atención</span>
              </button>

              {/* 2. Boca abierta, ojos abiertos */}
              <button
                onClick={() => setPreviewState('open_open')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  previewState === 'open_open'
                    ? 'border-sky-400 bg-sky-950/60 shadow-md text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CharacterAvatar characterId={selectedCharacter} state="open_open" size="xs" />
                <span className="font-semibold text-slate-200">2. Boca abierta, ojos abiertos</span>
                <span className="text-[9px] text-slate-500">Hablando con claridad</span>
              </button>

              {/* 3. Boca abierta, ojos cerrados */}
              <button
                onClick={() => setPreviewState('closed_open')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  previewState === 'closed_open'
                    ? 'border-sky-400 bg-sky-950/60 shadow-md text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CharacterAvatar characterId={selectedCharacter} state="closed_open" size="xs" />
                <span className="font-semibold text-slate-200">3. Boca abierta, ojos cerrados</span>
                <span className="text-[9px] text-slate-500">Expresión emotiva o de gozo</span>
              </button>

              {/* 4. Boca cerrada, ojos cerrados */}
              <button
                onClick={() => setPreviewState('closed_closed')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  previewState === 'closed_closed'
                    ? 'border-sky-400 bg-sky-950/60 shadow-md text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CharacterAvatar characterId={selectedCharacter} state="closed_closed" size="xs" />
                <span className="font-semibold text-slate-200">4. Boca cerrada, ojos cerrados</span>
                <span className="text-[9px] text-slate-500">Parpadeo sereno o paz</span>
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Live Speech Bubble (Updated with the avatar's latest spoken thought!) */}
        <div className="w-full max-w-md mt-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-900/90 to-indigo-950/90 border-2 border-yellow-400/80 text-center shadow-lg transition-all animate-in fade-in">
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase text-amber-300 tracking-wider mb-0.5">
            <Sparkles className="w-3 h-3" />
            <span>{activeChar.name} te dice en vivo:</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white italic leading-tight">
            "{currentBubbleText}"
          </p>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 px-4 py-2 max-w-md mx-auto w-full space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const char = msg.characterId ? CHARACTERS[msg.characterId] : activeChar;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="flex-shrink-0 mb-1">
                  <CharacterAvatar
                    characterId={msg.characterId || selectedCharacter}
                    size="xs"
                    isTalking={isAvatarTalking && msg.id === messages[messages.length - 1]?.id}
                  />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] font-black ${
                      char.id === 'argon' ? 'text-amber-400' : 'text-sky-400'
                    }`}>
                      {char.name}
                    </span>
                    <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                  </div>
                )}

                <p className="whitespace-pre-wrap">{msg.text}</p>

                {isUser && (
                  <div className="text-right mt-1">
                    <span className="text-[9px] text-blue-200">{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-end gap-2">
            <CharacterAvatar characterId={selectedCharacter} size="xs" isTalking />
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-xs px-4 py-2 text-xs text-slate-300 flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-200" />
              <span className="text-[11px] ml-1">{activeChar.name} está respondiéndote con sabiduría...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-1.5 max-w-md mx-auto w-full">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-yellow-400 hover:bg-slate-800 text-slate-300 transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field Bar */}
      <div className="px-4 pt-1 max-w-md mx-auto w-full">
        <div className="relative flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/95 border-2 border-slate-800 focus-within:border-yellow-400 shadow-xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              followerName
                ? `${followerName}, escribe tu mensaje aquí...`
                : 'Escribe tu mensaje o consulta aquí...'
            }
            disabled={isLoading}
            className="flex-1 px-3 py-2 bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm outline-none disabled:opacity-50"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black shadow-md shadow-yellow-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4 fill-slate-950" />
          </button>
        </div>

        {/* Footer info: Text-based with empathy */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 px-1">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-500/70" />
            <span>Conversación fluida, respetuosa y con fe</span>
          </span>
          {!followerName && (
            <button
              onClick={onOpenNameModal}
              className="text-amber-400 hover:underline font-semibold"
            >
              ¿Aún no nos dices tu nombre?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
