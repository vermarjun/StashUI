'use client';

import { MorphingText } from '@/registry/animate-ui/primitives-texts-morphing';

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full p-10">
      <MorphingText
        text={['Animate', 'Delight', 'Inspire', 'Create']}
        inView
        loop
        holdDelay={2000}
        className="text-5xl font-bold tracking-tight text-foreground"
      />
      <MorphingText
        text={['beautiful interfaces', 'smooth transitions', 'great products']}
        inView
        loop
        holdDelay={2200}
        delay={400}
        className="text-2xl text-muted-foreground font-medium"
      />
    </div>
  );
}
