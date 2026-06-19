import { BackgroundBeamsWithCollision } from "@/registry/aceternity-ui/background-beams-with-collision";

export default function Demo() {
  return (
    <BackgroundBeamsWithCollision className="h-[600px]">
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
          Beams with Collision
        </p>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
