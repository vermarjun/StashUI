"use client"

import { useMemo, useState } from "react"
import { Building2, CheckCircle2, Layers, User, UserCircle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import WizardExpandable, { type WizardStep } from "./wizard-expandable"

const PLANS = [
  { id: "starter", label: "Starter", note: "Individuals · $0" },
  { id: "pro", label: "Pro", note: "Small teams · $12/seat" },
  { id: "business", label: "Business", note: "SSO & audit logs · $29/seat" },
]

export default function WizardExpandableDemo() {
  const [name, setName] = useState("Maya Okafor")
  const [email, setEmail] = useState("maya@northwind.studio")
  const [headline, setHeadline] = useState("Product designer")
  const [bio, setBio] = useState(
    "I design onboarding flows and billing pages for B2B tools."
  )
  const [org, setOrg] = useState("Northwind Studio")
  const [plan, setPlan] = useState("pro")
  const [done, setDone] = useState(false)

  const steps = useMemo<WizardStep[]>(
    () => [
      {
        id: "account",
        title: "Account",
        description: "Your name and the email you sign in with.",
        icon: User,
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wz-name">Full name</Label>
              <Input id="wz-name" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wz-email">Work email</Label>
              <Input id="wz-email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
            </div>
          </div>
        ),
      },
      {
        id: "profile",
        title: "Profile",
        description: "How teammates will see you across the workspace.",
        icon: UserCircle,
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wz-headline">Headline</Label>
              <Input id="wz-headline" onChange={(e) => setHeadline(e.target.value)} value={headline} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wz-bio">Bio</Label>
              <Textarea id="wz-bio" onChange={(e) => setBio(e.target.value)} rows={3} value={bio} />
            </div>
          </div>
        ),
      },
      {
        id: "organization",
        title: "Organization",
        description: "The name your team will recognize on invoices and invites.",
        icon: Building2,
        content: (
          <div className="space-y-2">
            <Label htmlFor="wz-org">Company or team name</Label>
            <Input id="wz-org" onChange={(e) => setOrg(e.target.value)} value={org} />
          </div>
        ),
      },
      {
        id: "plan",
        title: "Plan",
        description: "Pick a starting tier. You can change it anytime.",
        icon: Layers,
        content: (
          <div className="grid gap-2">
            {PLANS.map((p) => (
              <button
                className={
                  plan === p.id
                    ? "flex items-center justify-between rounded-lg border border-foreground bg-muted px-4 py-3 text-left text-sm"
                    : "flex items-center justify-between rounded-lg border border-border px-4 py-3 text-left text-sm hover:bg-muted"
                }
                key={p.id}
                onClick={() => setPlan(p.id)}
                type="button"
              >
                <span className="font-medium text-foreground">{p.label}</span>
                <span className="text-muted-foreground text-xs">{p.note}</span>
              </button>
            ))}
          </div>
        ),
      },
      {
        id: "review",
        title: "Review",
        description: "Confirm your answers before finishing.",
        icon: CheckCircle2,
        content: (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              ["Name", name],
              ["Email", email],
              ["Organization", org],
              ["Plan", PLANS.find((p) => p.id === plan)?.label ?? "-"],
            ].map(([k, v]) => (
              <div className="rounded-lg border border-border bg-background/60 p-3" key={k}>
                <div className="text-muted-foreground text-xs">{k}</div>
                <div className="truncate font-medium text-foreground">{v}</div>
              </div>
            ))}
            {done ? (
              <p className="col-span-2 pt-1 text-center text-emerald-400 text-sm">
                Workspace created. Welcome aboard.
              </p>
            ) : null}
          </div>
        ),
      },
    ],
    [bio, done, email, headline, name, org, plan]
  )

  return (
    // Top-aligned with headroom: the wizard opens downward, so the padding keeps
    // the expanded card centred in the stage instead of hugging the top edge.
    <div className="flex min-h-[620px] w-full justify-center px-4 pt-[120px] pb-10">
      <div className="w-full max-w-2xl">
        <WizardExpandable badgeText="SIGN UP" className="max-w-2xl sm:max-w-2xl" onComplete={() => setDone(true)} steps={steps} />
      </div>
    </div>
  )
}
