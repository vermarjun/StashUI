import { MaskContainer } from "@/registry/aceternity-ui/svg-mask-effect";

export default function Demo() {
  return (
    <MaskContainer
      revealText={
        <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-foreground">
          Move your cursor to reveal the hidden text beneath.
        </p>
      }
      className="h-[28rem] rounded-xl"
    >
      <span className="text-white dark:text-black">
        The spotlight follows your cursor.{" "}
        <span className="text-violet-400">Hover here</span> to expand the mask
        and reveal what lies beneath the surface.
      </span>
    </MaskContainer>
  );
}
