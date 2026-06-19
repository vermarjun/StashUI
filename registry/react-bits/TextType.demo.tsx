"use client";
import TextType from "@/registry/react-bits/TextType";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[320px] bg-background p-8">
      <TextType
        text={["Build faster.", "Ship with confidence.", "Design with care.", "Code that lasts."]}
        as="h2"
        className="text-4xl font-bold text-foreground"
        typingSpeed={55}
        deletingSpeed={32}
        pauseDuration={1800}
        loop
        showCursor
        cursorCharacter="|"
        cursorClassName="text-muted-foreground"
      />
    </div>
  );
}
