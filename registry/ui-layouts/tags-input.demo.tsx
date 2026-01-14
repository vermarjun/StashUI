'use client';
import { useState } from 'react';
import { TagsInput } from '@/registry/ui-layouts/tags-input';

export default function Demo() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Tailwind']);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
      <TagsInput tags={tags} setTags={setTags} editTag={true} />
      <p className="mt-3 text-xs text-gray-500">
        Press Enter or comma to add a tag. Click a tag to edit it.
      </p>
    </div>
  );
}
