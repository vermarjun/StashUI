import { Safari } from "@/registry/magic-ui/safari";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <Safari
        className="w-full max-w-3xl"
        url="https://example.com"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      />
    </div>
  );
}
