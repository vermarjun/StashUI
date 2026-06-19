import { BackgroundLines } from "@/registry/aceternity-ui/background-lines";

export default function Demo() {
  return (
    <BackgroundLines className="h-[600px]">
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
          Background Lines
        </p>
      </div>
    </BackgroundLines>
  );
}
