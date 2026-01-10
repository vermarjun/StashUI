'use client';

import { Home, Star, Bell, Settings, Bookmark, Music } from 'lucide-react';
import { PinList } from '@/registry/animate-ui/components-community-pin-list';

export default function Demo() {
  const items = [
    { id: 1, name: 'Home', info: 'Go to homepage', icon: Home, pinned: true },
    { id: 2, name: 'Starred', info: 'Your starred items', icon: Star, pinned: true },
    { id: 3, name: 'Notifications', info: '3 new alerts', icon: Bell, pinned: false },
    { id: 4, name: 'Settings', info: 'App preferences', icon: Settings, pinned: false },
    { id: 5, name: 'Bookmarks', info: 'Saved for later', icon: Bookmark, pinned: false },
    { id: 6, name: 'Music', info: 'Your playlists', icon: Music, pinned: false },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-6">
      <PinList items={items} />
    </div>
  );
}
