'use client';

import { PlayfulTodolist } from './playful-todolist';

export default function PlayfulTodolistDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <PlayfulTodolist />
      </div>
    </div>
  );
}
