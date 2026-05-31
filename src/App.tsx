/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { EnhancedChannel, PlaybackQuality } from './types.ts';
import { enhancedChannels } from './data.ts';
import { Header } from './components/Header.tsx';
import { VideoPlayer } from './components/VideoPlayer.tsx';
import { CategoryBar } from './components/CategoryBar.tsx';
import { ChannelContainer } from './components/ChannelContainer.tsx';
import { FullscreenChannelPanel } from './components/FullscreenChannelPanel.tsx';
import { playBeep, initAudio } from './utils/beep.ts';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Active streaming states
  const [activeChannel, setActiveChannel] = useState<EnhancedChannel | null>(() => {
    // Prefer "bangla" category for the default start channel, otherwise default to first
    return enhancedChannels.find(ch => ch.category === 'bangla') || enhancedChannels[0] || null;
  });
  const [playbackQuality, setPlaybackQuality] = useState<PlaybackQuality>('auto');
  
  // Layout panels
  const [isFullscreenPanelOpen, setIsFullscreenPanelOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastIsError, setToastIsError] = useState<boolean>(false);

  // Simulated viewer counts
  const [viewerCounts, setViewerCounts] = useState<{ [url: string]: number }>(() => {
    const initial: { [url: string]: number } = {};
    for (const ch of enhancedChannels) {
      initial[ch.url] = Math.floor(Math.random() * 5000) + 5;
    }
    return initial;
  });

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  // Toast notifier
  const triggerToast = useCallback((msg: string, isErr: boolean = false) => {
    setToastMessage(msg);
    setToastIsError(isErr);
    const id = setTimeout(() => {
      setToastMessage('');
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  // Set up live viewer statistics simulation updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCounts(prev => {
        const next = { ...prev };
        for (const url in next) {
          const old = next[url] || 100;
          const delta = Math.floor(Math.random() * 101) - 50;
          let newVal = old + delta;
          if (newVal < 1) newVal = 1;
          if (newVal > 12000) newVal = 12000;
          next[url] = newVal;
        }
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Filter channels based on active query
  const filteredChannels = useMemo(() => {
    let result = enhancedChannels;
    if (activeCategory !== 'all') {
      result = result.filter(ch => ch.category === activeCategory);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(ch => 
        ch.name.toLowerCase().includes(term) || 
        ch.short.toLowerCase().includes(term)
      );
    }
    return result;
  }, [activeCategory, searchTerm]);

  // Handle stream initialization on manual/keyboard picks
  const handleSelectChannel = useCallback((url: string, name: string, el?: HTMLElement) => {
    setSearchTerm('');

    const ch = enhancedChannels.find(item => item.url === url) || null;
    if (!ch) {
      triggerToast("❌ Invalid stream source", true);
      return;
    }

    if (activeChannel?.url === url) {
      return; // Already playing
    }

    setActiveChannel(ch);

    // If initial load bypassed autoplay restrictions, make sure to unmute
    if (videoElementRef.current) {
      if (videoElementRef.current.muted) {
        videoElementRef.current.muted = false;
      }
    }

    // Removed toast alert for channel loading as per user request


    // Apply active classes
    document.querySelectorAll('.channel-logo-card').forEach(c => c.classList.remove('active-channel'));
    document.querySelectorAll('.strip-item').forEach(c => c.classList.remove('active-channel'));
    document.querySelectorAll('.fs-channel-item').forEach(c => c.classList.remove('active-channel'));
    if (el) {
      el.classList.add('active-channel');
    }
  }, [activeChannel, triggerToast]);

  const playNextPrevChannel = useCallback((direction: 'next' | 'prev') => {
    if (!activeChannel) return;
    
    // Choose list: filteredChannels (under active category/search), fallback to enhancedChannels
    let list = filteredChannels;
    let idx = list.findIndex(ch => ch.url === activeChannel.url);
    
    if (idx === -1) {
      list = enhancedChannels;
      idx = list.findIndex(ch => ch.url === activeChannel.url);
    }
    
    if (idx === -1 || list.length <= 1) return;
    
    let targetIdx = idx;
    if (direction === 'next') {
      targetIdx = (idx + 1) % list.length;
    } else {
      targetIdx = (idx - 1 + list.length) % list.length;
    }
    
    const targetChannel = list[targetIdx];
    if (targetChannel) {
      handleSelectChannel(targetChannel.url, targetChannel.name);
      playBeep('select');
    }
  }, [activeChannel, filteredChannels, handleSelectChannel]);

  const activeViewerCount = useMemo(() => {
    if (!activeChannel) return 0;
    return viewerCounts[activeChannel.url] || 120;
  }, [activeChannel, viewerCounts]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Close overlay panels on backdrop clicks
  const handleCloseFullscreenPanel = useCallback(() => {
    setIsFullscreenPanelOpen(false);
  }, []);

  const handleOpenFullscreenPanel = useCallback(() => {
    setIsFullscreenPanelOpen(true);
  }, []);

  // Focus mappings used for TV/Remote keyboard arrow-navigation control
  const getFocusableElements = useCallback(() => {
    const cats = Array.from(document.querySelectorAll('.category-btn')) as HTMLElement[];
    const cards = Array.from(document.querySelectorAll('.channel-logo-card')) as HTMLElement[];
    const strips = Array.from(document.querySelectorAll('.strip-item')) as HTMLElement[];
    const fsItems = Array.from(document.querySelectorAll('.fs-channel-item')) as HTMLElement[];
    const closeBtn = document.getElementById('closePanelBtn');
    const toggleBtn = document.getElementById('fsToggleBtn');
    const searchInput = document.getElementById('searchInput');
    const qualityBtn = document.getElementById('qualityBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');

    let elems: HTMLElement[] = [];
    if (searchInput) elems.push(searchInput);
    if (playPauseBtn) elems.push(playPauseBtn);
    if (qualityBtn) elems.push(qualityBtn);
    elems = [...elems, ...cats];

    if (isFullscreenPanelOpen) {
      elems = [...fsItems];
      if (closeBtn) elems.push(closeBtn);
    } else {
      const isStripActive = searchTerm.trim().length > 0 && filteredChannels.length > 0;
      if (isStripActive) {
        elems = [...elems, ...strips, ...cards];
      } else {
        elems = [...elems, ...cards];
      }
      if (toggleBtn) elems.push(toggleBtn);
    }
    return elems.filter(el => el && el.offsetParent !== null);
  }, [isFullscreenPanelOpen, searchTerm, filteredChannels]);

  // Handle arrow-key selection transfer
  const moveFocus = useCallback((dir: 'left' | 'right' | 'up' | 'down') => {
    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const active = document.activeElement as HTMLElement;
    if (!active || !focusable.includes(active)) {
      const activeCard = document.querySelector('.channel-logo-card.active-channel') as HTMLElement;
      if (activeCard && focusable.includes(activeCard)) {
        activeCard.focus();
        activeCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        focusable[0]?.focus();
      }
      return;
    }

    // Advanced 2D Spatial Navigation
    const activeRect = active.getBoundingClientRect();
    const activeCenter = {
      x: activeRect.left + activeRect.width / 2,
      y: activeRect.top + activeRect.height / 2,
    };

    // Helper to determine the type/row group of an element to prevent horizontal level jumping
    const getElType = (el: HTMLElement) => {
      if (el.classList.contains('fs-cat-btn')) return 'fs-cat';
      if (el.classList.contains('fs-channel-card')) return 'fs-card';
      if (el.classList.contains('channel-logo-card')) return 'card';
      if (el.classList.contains('category-btn')) return 'category';
      if (el.classList.contains('strip-item')) return 'strip';
      if (el.classList.contains('fs-channel-item')) return 'fs-item';
      if (el.id === 'qualityBtn' || el.id === 'fsToggleBtn' || el.id === 'playPauseBtn') return 'playerControls';
      if (el.id === 'searchInput') return 'topBar';
      return 'other';
    };

    const activeType = getElType(active);

    // If moving left/right horizontally, strictly scan elements of the exact same visual type
    let candidates = focusable;
    if (dir === 'left' || dir === 'right') {
      candidates = focusable.filter(el => getElType(el) === activeType);
    }

    let bestElem: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const el of candidates) {
      if (el === active) continue;

      const rect = el.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      let dPrimary = 0;
      let dSecondary = 0;
      let isValidCandidate = false;

      // Check alignment based on target direction with small pixel threshold
      if (dir === 'up') {
        isValidCandidate = center.y < activeCenter.y - 2;
        dPrimary = activeCenter.y - center.y;
        dSecondary = Math.abs(activeCenter.x - center.x);
      } else if (dir === 'down') {
        isValidCandidate = center.y > activeCenter.y + 2;
        dPrimary = center.y - activeCenter.y;
        dSecondary = Math.abs(activeCenter.x - center.x);
      } else if (dir === 'left') {
        isValidCandidate = center.x < activeCenter.x - 2;
        dPrimary = activeCenter.x - center.x;
        dSecondary = Math.abs(activeCenter.y - center.y);
      } else if (dir === 'right') {
        isValidCandidate = center.x > activeCenter.x + 2;
        dPrimary = center.x - activeCenter.x;
        dSecondary = Math.abs(activeCenter.y - center.y);
      }

      if (isValidCandidate) {
        // Distance weighing: penalize secondary axis misalignment to keep straight directional paths
        const distance = dPrimary * dPrimary * 3.5 + dSecondary * dSecondary;
        if (distance < minDistance) {
          minDistance = distance;
          bestElem = el;
        }
      }
    }

    if (bestElem) {
      bestElem.focus();
      bestElem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      playBeep('move');
    } else {
      // Direct left-right fallback wrapping when reaching horizontal boundaries
      // Only wrap within elements of the SAME visual type to prevent accidental section crossing!
      const idx = candidates.indexOf(active);
      if (idx !== -1 && (dir === 'left' || dir === 'right')) {
        let nextIdx = idx;
        if (dir === 'right') {
          nextIdx = (idx + 1) % candidates.length;
        } else if (dir === 'left') {
          nextIdx = (idx - 1 + candidates.length) % candidates.length;
        }
        
        const fallbackEl = candidates[nextIdx];
        if (fallbackEl) {
          fallbackEl.focus();
          fallbackEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          playBeep('move');
        }
      }
    }
  }, [getFocusableElements]);

  // Hook globally captured arrow keys
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      const isCurrentlyFullscreen = !!(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).mozFullScreenElement || 
        (document as any).msFullscreenElement ||
        document.getElementById('videoContainer')?.classList.contains('fixed')
      );

      // If we are in fullscreen and overlay list is closed, left/right triggers previous/next channel
      if (isCurrentlyFullscreen && !isFullscreenPanelOpen) {
        if (key === 'ArrowRight') {
          e.preventDefault();
          playNextPrevChannel('next');
          return;
        }
        if (key === 'ArrowLeft') {
          e.preventDefault();
          playNextPrevChannel('prev');
          return;
        }
      }

      // Down arrow triggers quick channel overlay tray if matching player view
      if (document.fullscreenElement && key === 'ArrowDown' && !isFullscreenPanelOpen) {
        e.preventDefault();
        setIsFullscreenPanelOpen(true);
        playBeep('select');
        return;
      }

      // Close tray on Escape
      if (key === 'Escape' && isFullscreenPanelOpen) {
        e.preventDefault();
        setIsFullscreenPanelOpen(false);
        playBeep('select');
        return;
      }

      if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
        e.preventDefault();
        const mapping: { [key: string]: 'left' | 'right' | 'up' | 'down' } = {
          'ArrowLeft': 'left',
          'ArrowRight': 'right',
          'ArrowUp': 'up',
          'ArrowDown': 'down'
        };
        moveFocus(mapping[key]);
      } else if (key === 'Enter' || key === ' ') {
        const active = document.activeElement as HTMLElement;
        // Let normal browser triggers do input spacebar/inputs, others play beep sound
        if (active && active.id !== 'searchInput') {
          e.preventDefault();
          playBeep('select');
          if (active.click) active.click();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isFullscreenPanelOpen, moveFocus, playNextPrevChannel]);

  // Audio system startup and video unmute on first user interaction
  useEffect(() => {
    const handleInitializeAudioSystem = () => {
      initAudio();
      if (videoElementRef.current) {
        videoElementRef.current.muted = false;
        videoElementRef.current.play().catch(() => {});
      }
    };

    document.body.addEventListener('click', handleInitializeAudioSystem, { once: true, passive: true });
    document.body.addEventListener('keydown', handleInitializeAudioSystem, { once: true, passive: true });
    document.body.addEventListener('pointerdown', handleInitializeAudioSystem, { once: true, passive: true });
    return () => {
      document.body.removeEventListener('click', handleInitializeAudioSystem);
      document.body.removeEventListener('keydown', handleInitializeAudioSystem);
      document.body.removeEventListener('pointerdown', handleInitializeAudioSystem);
    };
  }, []);

  // Focus the active channel card immediately on startup/mount so remote/keyboard navigation is active instantly
  useEffect(() => {
    const focusInitialElement = () => {
      try {
        window.focus();
      } catch (e) {}
      const activeCard = document.querySelector('.channel-logo-card.active-channel') as HTMLElement;
      if (activeCard) {
        if (document.activeElement === document.body || !document.activeElement) {
          activeCard.focus();
          activeCard.scrollIntoView({ block: 'nearest', behavior: 'instant' } as any);
        }
      } else {
        const firstCard = document.querySelector('.channel-logo-card') as HTMLElement;
        if (firstCard && (document.activeElement === document.body || !document.activeElement)) {
          firstCard.focus();
        }
      }
    };

    const timer1 = setTimeout(focusInitialElement, 150);
    const timer2 = setTimeout(focusInitialElement, 500);
    const timer3 = setTimeout(focusInitialElement, 1200);

    // Event listeners to capture physical user presence and activate navigation focus immediately
    const handleUserPresence = () => {
      if (document.activeElement === document.body || !document.activeElement) {
        focusInitialElement();
      }
    };

    window.addEventListener('focus', handleUserPresence);
    window.addEventListener('pointermove', handleUserPresence, { once: true, passive: true });
    window.addEventListener('pointerdown', handleUserPresence, { once: true, passive: true });
    window.addEventListener('keydown', handleUserPresence, { once: true, passive: true });
    window.addEventListener('click', handleUserPresence, { once: true, passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('focus', handleUserPresence);
      window.removeEventListener('pointermove', handleUserPresence);
      window.removeEventListener('pointerdown', handleUserPresence);
      window.removeEventListener('keydown', handleUserPresence);
      window.removeEventListener('click', handleUserPresence);
    };
  }, []);

  return (
    <div className="h-screen text-[#f1f5f9] select-none flex flex-col relative overflow-hidden bg-slate-950">
      
      {/* Top Fixed Area */}
      <div className="flex-none bg-linear-to-b from-[#0b1120] to-[#0f172a] shadow-md z-10">
        {/* Header section comprising Search, indicators, suggestions horizontal strip */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredChannels={filteredChannels}
          activeChannelUrl={activeChannel?.url || null}
          onSelectChannel={handleSelectChannel}
          inputRef={searchInputRef}
        />

        {/* Video Streaming Player Component */}
        <VideoPlayer
          url={activeChannel?.url || null}
          channelName={activeChannel?.name || "Live Channel"}
          playbackQuality={playbackQuality}
          setPlaybackQuality={setPlaybackQuality}
          viewerCount={activeViewerCount}
          onVideoRef={(el) => {
            videoElementRef.current = el;
          }}
          filteredChannels={filteredChannels}
          activeChannelUrl={activeChannel?.url || null}
          onSelectChannel={handleSelectChannel}
          isFullscreenPanelOpen={isFullscreenPanelOpen}
          setIsFullscreenPanelOpen={setIsFullscreenPanelOpen}
        />

        {/* Category selector filtering options */}
        <CategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onClearSearch={clearSearch}
        />
      </div>

      {/* Main Container of items - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-yellow-400 bg-slate-950">
        <ChannelContainer
          activeCategory={activeCategory}
          filteredChannels={filteredChannels}
          allChannels={enhancedChannels}
          searchTerm={searchTerm}
          activeChannelUrl={activeChannel?.url || null}
          onSelectChannel={handleSelectChannel}
        />
      </div>



      {/* Responsive Toast Notification overlays */}
      {toastMessage && (
        <div 
          className={`fixed bottom-18 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-semibold z-50 shadow-xl select-none transition-all pointer-events-none ${
            toastIsError 
              ? 'bg-slate-950/90 text-amber-500 border-l-4 border-amber-500' 
              : 'bg-slate-950/95 text-yellow-400 border-l-4 border-yellow-400'
          }`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
