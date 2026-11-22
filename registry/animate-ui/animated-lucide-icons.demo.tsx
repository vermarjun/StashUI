'use client';

import { AnimateIcon } from './animated-lucide-icons';
import { Activity } from './animated-lucide-icons-activity';
import { ArrowRight } from './animated-lucide-icons-arrow-right';
import { Bell } from './animated-lucide-icons-bell';
import { Check } from './animated-lucide-icons-check';
import { Copy } from './animated-lucide-icons-copy';
import { Download } from './animated-lucide-icons-download';
import { Heart } from './animated-lucide-icons-heart';
import { House } from './animated-lucide-icons-house';
import { Loader } from './animated-lucide-icons-loader';
import { Menu } from './animated-lucide-icons-menu';
import { MessageCircle } from './animated-lucide-icons-message-circle';
import { Search } from './animated-lucide-icons-search';
import { Send } from './animated-lucide-icons-send';
import { Settings } from './animated-lucide-icons-settings';
import { Sparkles } from './animated-lucide-icons-sparkles';
import { Star } from './animated-lucide-icons-star';
import { Trash2 } from './animated-lucide-icons-trash-2';
import { User } from './animated-lucide-icons-user';
import { X } from './animated-lucide-icons-x';
import { Zap } from './animated-lucide-icons-zap';

const ICONS = [
  { name: 'activity', Icon: Activity },
  { name: 'arrow-right', Icon: ArrowRight },
  { name: 'bell', Icon: Bell },
  { name: 'check', Icon: Check },
  { name: 'copy', Icon: Copy },
  { name: 'download', Icon: Download },
  { name: 'heart', Icon: Heart },
  { name: 'house', Icon: House },
  { name: 'loader', Icon: Loader },
  { name: 'menu', Icon: Menu },
  { name: 'message-circle', Icon: MessageCircle },
  { name: 'search', Icon: Search },
  { name: 'send', Icon: Send },
  { name: 'settings', Icon: Settings },
  { name: 'sparkles', Icon: Sparkles },
  { name: 'star', Icon: Star },
  { name: 'trash-2', Icon: Trash2 },
  { name: 'user', Icon: User },
  { name: 'x', Icon: X },
  { name: 'zap', Icon: Zap },
];

export default function AnimatedLucideIconsDemo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-6">
      <div className="grid grid-cols-5 gap-3">
        {ICONS.map(({ name, Icon }) => (
          <AnimateIcon key={name} animateOnHover asChild>
            <button
              type="button"
              data-icon={name}
              className="flex h-24 w-28 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <Icon size={28} />
              <span className="text-[11px] text-muted-foreground">{name}</span>
            </button>
          </AnimateIcon>
        ))}
      </div>
    </div>
  );
}
