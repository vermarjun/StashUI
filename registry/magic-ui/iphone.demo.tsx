import { Iphone } from "@/registry/magic-ui/iphone";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <div style={{ width: 220 }}>
        <Iphone
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
        />
      </div>
    </div>
  );
}
