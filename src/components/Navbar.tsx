import React from 'react';
import { ActiveTab } from '../types';
import { Home, MessageCircle, Gamepad2, ShoppingBag, Crown, MessageSquareHeart } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isVip: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isVip,
}) => {
  const tabs = [
    {
      id: 'inicio' as ActiveTab,
      label: 'Inicio',
      icon: Home,
    },
    {
      id: 'chat' as ActiveTab,
      label: 'Chat',
      icon: MessageCircle,
    },
    {
      id: 'juegos' as ActiveTab,
      label: 'Juegos',
      icon: Gamepad2,
    },
    {
      id: 'shop' as ActiveTab,
      label: 'Shop',
      icon: ShoppingBag,
    },
    {
      id: 'comentarios' as ActiveTab,
      label: 'Muro',
      icon: MessageSquareHeart,
    },
    {
      id: 'premium' as ActiveTab,
      label: 'Premium',
      icon: Crown,
      isSpecial: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t-2 border-yellow-400/40 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-yellow-400 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`relative p-1.5 sm:p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-yellow-300 shadow-lg shadow-blue-500/30 ring-1 ring-yellow-400'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {tab.isSpecial && isVip && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-slate-950 shadow" />
                )}
              </div>
              <span className="text-[9.5px] tracking-tight leading-none text-center font-bold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
