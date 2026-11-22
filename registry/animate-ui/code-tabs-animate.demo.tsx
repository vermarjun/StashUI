'use client';

import { CodeTabs } from './code-tabs-animate';

const CODES = {
  pnpm: `pnpm create vite@latest my-app --template react-ts
cd my-app
pnpm add motion lucide-react
pnpm dlx shadcn@latest add https://stashui.dev/r/code-tabs-animate.json
pnpm dev`,
  npm: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install motion lucide-react
npx shadcn@latest add https://stashui.dev/r/code-tabs-animate.json
npm run dev`,
  yarn: `yarn create vite my-app --template react-ts
cd my-app
yarn add motion lucide-react
yarn dlx shadcn@latest add https://stashui.dev/r/code-tabs-animate.json
yarn dev`,
  bun: `bun create vite my-app --template react-ts
cd my-app
bun add motion lucide-react
bunx --bun shadcn@latest add https://stashui.dev/r/code-tabs-animate.json
bun dev`,
};

export default function CodeTabsAnimateDemo() {
  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-6">
      <CodeTabs lang="bash" codes={CODES} className="max-w-[640px]" />
    </div>
  );
}
