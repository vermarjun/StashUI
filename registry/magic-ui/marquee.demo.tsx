import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magic-ui/marquee";

const reviews = [
  {
    name: "Maya Patel",
    username: "@mayabuilds",
    body: "Swapped our whole landing page to these components in an afternoon. It finally looks like a real product.",
    img: "https://i.pravatar.cc/80?img=47",
  },
  {
    name: "Lucas Moreau",
    username: "@lucasdesigns",
    body: "The motion is tasteful, not gimmicky. Exactly what I wanted for our onboarding flow.",
    img: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Aiko Tanaka",
    username: "@aiko_dev",
    body: "Copy, paste, ship. The code is clean enough that I actually kept it in our design system.",
    img: "https://i.pravatar.cc/80?img=45",
  },
  {
    name: "Daniel Reyes",
    username: "@dreyes",
    body: "Our conversion page went from bland to memorable. Customers keep asking what we used.",
    img: "https://i.pravatar.cc/80?img=33",
  },
  {
    name: "Sofia Lindqvist",
    username: "@sofial",
    body: "Dark mode just works. Tokens everywhere, no hardcoded colors to hunt down.",
    img: "https://i.pravatar.cc/80?img=32",
  },
  {
    name: "Omar Haddad",
    username: "@omarh",
    body: "I've tried a dozen UI kits. This is the first one my designer didn't immediately rework.",
    img: "https://i.pravatar.cc/80?img=59",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-border bg-card/60 hover:bg-muted/60 transition-colors",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-foreground">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-foreground/80">{body}</blockquote>
    </figure>
  );
}

export default function Demo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}
