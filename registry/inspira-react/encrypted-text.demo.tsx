import { EncryptedText } from "@/registry/inspira-react/encrypted-text";

export default function EncryptedTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12">
      <h2 className="text-4xl font-bold">
        <EncryptedText
          text="Hello, World!"
          revealDelayMs={60}
          flipDelayMs={40}
          encryptedClassName="text-emerald-400"
          revealedClassName="text-foreground"
        />
      </h2>
      <p className="text-xl text-muted-foreground">
        <EncryptedText
          text="Scroll down to see the effect"
          revealDelayMs={40}
          flipDelayMs={30}
        />
      </p>
    </div>
  );
}
