"use client"

import DecryptedText from "@/registry/react-bits/DecryptedText"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 min-h-[200px]">
      <DecryptedText
        text="Hover over me to decrypt!"
        animateOn="hover"
        speed={50}
        maxIterations={10}
        sequential
        className="text-2xl font-bold text-green-500"
        encryptedClassName="text-2xl font-bold text-gray-400"
      />
      <DecryptedText
        text="Decrypted on view trigger"
        animateOn="view"
        speed={40}
        maxIterations={12}
        sequential
        revealDirection="center"
        className="text-xl font-mono text-blue-500"
        encryptedClassName="text-xl font-mono text-gray-300"
      />
      <DecryptedText
        text="Click me to reveal the message"
        animateOn="click"
        clickMode="toggle"
        speed={60}
        maxIterations={8}
        className="text-lg font-semibold text-purple-500 cursor-pointer"
        encryptedClassName="text-lg font-semibold text-gray-400 cursor-pointer"
      />
    </div>
  )
}
