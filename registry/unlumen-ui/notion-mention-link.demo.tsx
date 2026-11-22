"use client";

import { NotionMentionLink } from "./notion-mention-link";

export default function NotionMentionLinkDemo() {
  return (
    <div className="flex min-h-[520px] w-full items-start justify-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-4 text-left text-[15px] leading-7 text-foreground/85">
        <h3 className="text-2xl font-semibold text-foreground">
          Trip planning notes
        </h3>
        <p>
          We land on the 14th and pick up the car at the airport. Before
          booking anything, read{" "}
          <NotionMentionLink
            data-mention="alps"
            url="https://alpine-guide.travel/routes/dolomites"
            endpoint=""
            previewWidth={360}
            previewHeight={160}
            metadata={{
              url: "https://alpine-guide.travel/routes/dolomites",
              title: "Five days in the Dolomites",
              description:
                "A hut-to-hut route through Alta Badia with daily distances, refuges that take bookings and the passes worth the detour.",
              siteName: "Alpine Guide",
              domain: "alpine-guide.travel",
              image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
            }}
          />{" "}
          for the hut list, then confirm dates with Maya.
        </p>
        <p className="text-muted-foreground">
          Hover the mention to preview the page without leaving the doc.
        </p>
      </div>
    </div>
  );
}
