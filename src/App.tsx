/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, VideoItem } from './types';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { ChatSection } from './components/ChatSection';
import { GamesSection } from './components/GamesSection';
import { CommentsSection } from './components/CommentsSection';
import { PremiumSection } from './components/PremiumSection';
import { SponsorsSection } from './components/SponsorsSection';
import { ShopSection } from './components/ShopSection';
import { NameModal } from './components/NameModal';
import { VideoModal } from './components/VideoModal';

export default function App() {
  // Splash Screen runs for 4 seconds on initial launch
  const [showSplash, setShowSplash] = useState(true);

  // Follower's Name for "Buenos días, ..." and chat personalization
  const [followerName, setFollowerName] = useState(() => {
    return localStorage.getItem('sp_follower_name') || '';
  });

  // Name Modal Visibility
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');

  // Selected Video for preview modal
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // VIP status for Premium section
  const [isVip, setIsVip] = useState(() => {
    return localStorage.getItem('sp_is_vip') === 'true';
  });

  // Save follower name in localStorage
  const handleSaveName = (name: string) => {
    setFollowerName(name);
    localStorage.setItem('sp_follower_name', name);
  };

  // Toggle VIP
  const handleActivateVip = () => {
    setIsVip(true);
    localStorage.setItem('sp_is_vip', 'true');
  };

  // If splash screen is active, show it for 4s then fade out
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-yellow-400 selection:text-slate-950">
      {/* Background ambient lighting with lively primary colors */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-lg h-[450px] bg-gradient-to-b from-blue-600/25 via-blue-900/15 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-24 -left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <Header
        followerName={followerName}
        onOpenNameModal={() => setIsNameModalOpen(true)}
        isVip={isVip}
      />

      {/* Main Tab Content */}
      <main className="flex-1 relative z-10 w-full">
        {activeTab === 'inicio' && (
          <HomeSection
            followerName={followerName}
            onOpenNameModal={() => setIsNameModalOpen(true)}
            onNavigateTab={setActiveTab}
            onSelectVideo={setSelectedVideo}
            isVip={isVip}
          />
        )}

        {activeTab === 'chat' && (
          <ChatSection
            followerName={followerName}
            onOpenNameModal={() => setIsNameModalOpen(true)}
          />
        )}

        {activeTab === 'juegos' && <GamesSection />}

        {activeTab === 'shop' && (
          <ShopSection
            followerName={followerName}
            onBackToHome={() => setActiveTab('inicio')}
          />
        )}

        {activeTab === 'comentarios' && (
          <CommentsSection
            followerName={followerName}
            onOpenNameModal={() => setIsNameModalOpen(true)}
          />
        )}

        {activeTab === 'premium' && (
          <PremiumSection
            followerName={followerName}
            isVip={isVip}
            onActivateVip={handleActivateVip}
            onOpenSponsors={() => setActiveTab('patrocinios')}
          />
        )}

        {activeTab === 'patrocinios' && (
          <SponsorsSection onBackToHome={() => setActiveTab('inicio')} />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isVip={isVip}
      />

      {/* "Dinos tu nombre" Modal */}
      <NameModal
        isOpen={isNameModalOpen}
        currentName={followerName}
        onSave={handleSaveName}
        onClose={() => setIsNameModalOpen(false)}
      />

      {/* Video Details Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
