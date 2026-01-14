'use client';
import { useState } from 'react';
import { MultiSelect } from '@/registry/ui-layouts/multi-selector';

const frameworkOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt', value: 'nuxt', disable: true },
];

export default function Demo() {
  const [selected, setSelected] = useState<string[]>(['react']);

  return (
    <div className="w-full max-w-sm mx-auto p-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Frameworks
      </label>
      <MultiSelect
        options={frameworkOptions}
        onValueChange={setSelected}
        defaultValue={selected}
        placeholder="Choose frameworks..."
        maxCount={3}
      />
      {selected.length > 0 && (
        <p className="mt-3 text-xs text-gray-500">
          Selected: {selected.join(', ')}
        </p>
      )}
    </div>
  );
}
