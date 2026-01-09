import { cn } from "@/lib/utils";
import { SiReact, SiNextdotjs } from "@/components/site/icons";

interface FrameworkBadgesProps {
  frameworks: string[];
  className?: string;
}

/**
 * Brand-colored framework logos a component is portable to. React in its cyan,
 * Next.js in the foreground (its monochrome wordmark).
 */
export function FrameworkBadges({ frameworks, className }: FrameworkBadgesProps) {
  const react = frameworks.includes("react");
  const next = frameworks.includes("next");
  if (!react && !next) return null;

  const label = [react && "React", next && "Next.js"].filter(Boolean).join(" & ");

  return (
    <span
      className={cn("flex shrink-0 items-center gap-1.5", className)}
      title={`Works with ${label}`}
    >
      {react && (
        <SiReact className="size-[15px]" style={{ color: "#61DAFB" }} />
      )}
      {next && <SiNextdotjs className="size-[14px] text-foreground" />}
    </span>
  );
}
