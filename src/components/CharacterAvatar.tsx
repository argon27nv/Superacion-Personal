import React, { useEffect, useState } from 'react';
import { CharacterId, AvatarState } from '../types';

// Real high-resolution character image portraits
import angelImg from '../assets/images/angel_avatar.jpg';
import argonImg from '../assets/images/argon_avatar.jpg';

interface CharacterAvatarProps {
  characterId: CharacterId;
  state?: AvatarState;
  isTalking?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showHalo?: boolean;
  usePhoto?: boolean; // When true or default on large, renders real image with dynamic talking indicators
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterId,
  state: explicitState,
  isTalking = false,
  size = 'md',
  className = '',
  showHalo = false,
  usePhoto = true,
}) => {
  const [internalState, setInternalState] = useState<AvatarState>('open_closed');
  const [talkPulse, setTalkPulse] = useState(false);

  useEffect(() => {
    if (explicitState) {
      setInternalState(explicitState);
      return;
    }

    if (!isTalking) {
      setInternalState('open_closed');
      setTalkPulse(false);
      const blinkTimer = setInterval(() => {
        setInternalState('closed_closed');
        setTimeout(() => {
          setInternalState('open_closed');
        }, 200);
      }, 4200);

      return () => clearInterval(blinkTimer);
    }

    // Dynamic talking cadence
    let step = 0;
    const talkInterval = setInterval(() => {
      step++;
      setTalkPulse((p) => !p);
      if (step % 9 === 0) {
        setInternalState('closed_open'); // Joyful closed eyes speaking
      } else if (step % 2 === 0) {
        setInternalState('open_open'); // Open mouth speaking
      } else {
        setInternalState('open_closed'); // Brief pause mouth
      }
    }, 170);

    return () => clearInterval(talkInterval);
  }, [isTalking, explicitState]);

  const activeState = explicitState || internalState;
  const isEyesOpen = activeState.startsWith('open');
  const isMouthOpen = activeState.endsWith('open');

  const sizeMap = {
    xs: 'w-10 h-10',
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-40 h-40 sm:w-48 sm:h-48',
    hero: 'w-56 h-56 sm:w-64 sm:h-64',
  };

  const isArgon = characterId === 'argon';
  const photoSrc = isArgon ? argonImg : angelImg;
  const charLabel = isArgon ? 'Argón' : 'Ángel';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Radiant Glow / Halo */}
      {showHalo && (
        <div
          className={`absolute -inset-2.5 rounded-full blur-xl opacity-75 animate-pulse ${
            isArgon ? 'bg-amber-400/40' : 'bg-blue-500/40'
          }`}
        />
      )}

      {/* Outer Golden/Vibrant Border */}
      <div
        className={`w-full h-full rounded-full p-1.5 shadow-2xl transition-all duration-300 ${
          isArgon
            ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-amber-500/30'
            : 'bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600 shadow-blue-500/30'
        } ${isTalking ? 'scale-[1.03] ring-4 ring-yellow-300/80' : ''}`}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900 flex items-center justify-center border-2 border-slate-950">
          {/* Real Photo Character Portrait */}
          {usePhoto ? (
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-950">
              <img
                src={photoSrc}
                alt={charLabel}
                className={`w-full h-full object-cover object-center transition-transform duration-200 ${
                  isTalking && talkPulse ? 'scale-108' : 'scale-100'
                }`}
              />

              {/* Dynamic Animated Speaking Overlay (Mouth & Blink sync indicator) */}
              {isTalking && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-2 pointer-events-none">
                  <div className="flex items-center justify-center gap-1 bg-black/60 backdrop-blur-xs py-0.5 px-2 rounded-full mx-auto border border-yellow-400/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-black text-amber-300 tracking-wider uppercase">
                      Hablando...
                    </span>
                  </div>
                </div>
              )}

              {/* 4 Figures expression status indicator watermark */}
              {explicitState && (
                <div className="absolute top-1.5 right-1.5 bg-black/75 px-1.5 py-0.5 rounded-md text-[8px] font-bold text-amber-300 border border-amber-400/30">
                  {explicitState === 'open_closed' && 'Boca - / Ojos •'}
                  {explicitState === 'open_open' && 'Boca O / Ojos •'}
                  {explicitState === 'closed_open' && 'Boca O / Ojos ^'}
                  {explicitState === 'closed_closed' && 'Boca - / Ojos -'}
                </div>
              )}
            </div>
          ) : (
            /* Vector stylized fallback */
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={photoSrc} alt={charLabel} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Live speech bubble dot */}
          {isTalking && (
            <div className="absolute bottom-1 right-1 z-20 flex items-center justify-center">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900 shadow"></span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
