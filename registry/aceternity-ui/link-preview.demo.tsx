"use client";
import { LinkPreview } from "@/registry/aceternity-ui/link-preview";

export default function Demo() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 p-12 text-center">
      <p className="text-sm text-muted-foreground">Hover over the links to see a preview</p>
      <p className="text-lg font-medium text-foreground">
        Built with{" "}
        <LinkPreview
          url="https://nextjs.org"
          isStatic
          imageSrc="https://assets.vercel.com/image/upload/v1662130559/nextjs/og.png"
          width={200}
          height={125}
          className="font-bold text-foreground underline underline-offset-4"
        >
          Next.js
        </LinkPreview>{" "}
        and deployed on{" "}
        <LinkPreview
          url="https://vercel.com"
          isStatic
          imageSrc="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
          width={200}
          height={125}
          className="font-bold text-foreground underline underline-offset-4"
        >
          Vercel
        </LinkPreview>
        .
      </p>
    </div>
  );
}
