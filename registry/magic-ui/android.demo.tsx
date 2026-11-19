import { Android } from "@/registry/magic-ui/android";

export default function Demo() {
  return (
    <div className="flex min-h-[620px] w-full items-center justify-center p-8">
      <Android
        width={270}
        height={590}
        className="drop-shadow-2xl"
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&h=1600&fit=crop&auto=format&q=80"
      />
    </div>
  );
}
