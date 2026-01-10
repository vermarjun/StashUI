'use client';

import { Home, Search, Settings, Bell, User } from 'lucide-react';
import { RadialNav } from '@/registry/animate-ui/components-community-radial-nav';

export default function Demo() {
  const items = [
    { id: 1, icon: Home, label: 'Home', angle: 0 },
    { id: 2, icon: Search, label: 'Search', angle: 72 },
    { id: 3, icon: Bell, label: 'Notifications', angle: 144 },
    { id: 4, icon: User, label: 'Profile', angle: 216 },
    { id: 5, icon: Settings, label: 'Settings', angle: 288 },
  ];

  return (
    <div className="flex items-center justify-center w-full h-64">
      <RadialNav size={200} items={items} defaultActiveId={1} />
    </div>
  );
}
