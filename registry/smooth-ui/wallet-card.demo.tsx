"use client";

import WalletCard, { type WalletAccount, type WalletMember } from "./wallet-card";

const ACCOUNTS: WalletAccount[] = [
  {
    balance: 12480.52,
    currency: "USD",
    expiry: "08/29",
    gradient: "bg-[linear-gradient(145deg,oklch(0.55_0.2_290),oklch(0.3_0.12_280))]",
    holder: "Maya Chen",
    id: "everyday",
    label: "Everyday",
    last4: "4821",
    network: "visa",
  },
  {
    balance: 3920.0,
    currency: "USD",
    expiry: "02/28",
    gradient: "bg-[linear-gradient(145deg,oklch(0.7_0.16_55),oklch(0.45_0.17_30))]",
    holder: "Maya Chen",
    id: "travel",
    label: "Travel",
    last4: "1093",
    network: "mastercard",
  },
  {
    balance: 48210.75,
    currency: "USD",
    expiry: "11/30",
    gradient: "bg-[linear-gradient(145deg,oklch(0.62_0.12_170),oklch(0.32_0.07_200))]",
    holder: "Chen Studio LLC",
    id: "business",
    label: "Business",
    last4: "7710",
    network: "amex",
  },
];

const MEMBERS: WalletMember[] = [
  { avatar: "https://i.pravatar.cc/80?img=47", id: "maya", name: "Maya Chen" },
  { avatar: "https://i.pravatar.cc/80?img=12", id: "leo", name: "Leo Park" },
  { avatar: "https://i.pravatar.cc/80?img=32", id: "ana", name: "Ana Ruiz" },
  { avatar: "https://i.pravatar.cc/80?img=8", id: "sam", name: "Sam Patel" },
  { avatar: "https://i.pravatar.cc/80?img=23", id: "ivy", name: "Ivy Brooks" },
  { id: "ola", name: "Ola Nordmann" },
];

export default function WalletCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <WalletCard accounts={ACCOUNTS} className="w-full max-w-sm" members={MEMBERS} />
    </div>
  );
}
