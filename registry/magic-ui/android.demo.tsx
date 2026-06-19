import { Android } from "@/registry/magic-ui/android";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <div style={{ width: 220 }}>
        <Android
          width={220}
          height={448}
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80"
        />
      </div>
    </div>
  );
}
