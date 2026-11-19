import { CreditCard, LogOut, Settings, User } from "lucide-react";

import { FamilyButton } from "@/registry/cult-ui/family-button";

const actions = [
  { label: "Profile", icon: User },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: Settings },
  { label: "Sign out", icon: LogOut },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-10">
      <FamilyButton>
        <div className="flex w-[200px] flex-col gap-0.5 px-3 pt-4">
          <div className="mb-2 flex items-center gap-2.5 px-1">
            <img
              src="https://i.pravatar.cc/80?img=47"
              alt="Maya Chen"
              className="h-8 w-8 rounded-full ring-1 ring-white/20"
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-white">Maya Chen</p>
              <p className="text-[11px] text-neutral-400">Pro plan</p>
            </div>
          </div>
          {actions.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1 text-[13px] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </div>
      </FamilyButton>
    </div>
  );
}
