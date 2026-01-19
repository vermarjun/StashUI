import "../globals.css";
import { fontVars } from "@/lib/fonts";

// Bare root layout for isolated iframe previews — no header, no sidebar.
// Each component renders here inside its own document, so its styles, portals,
// fixed-position elements, and global listeners can't escape to the main app.
export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVars} antialiased`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
