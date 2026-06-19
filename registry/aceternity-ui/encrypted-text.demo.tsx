"use client";
import { EncryptedText } from "@/registry/aceternity-ui/encrypted-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto py-16">
      <p className="text-3xl font-bold tracking-tight text-foreground">
        <EncryptedText
          text="Decrypting the future"
          className="font-mono"
          encryptedClassName="text-muted-foreground"
          revealedClassName="text-foreground"
        />
      </p>
    </div>
  );
}
