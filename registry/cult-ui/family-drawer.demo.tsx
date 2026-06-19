"use client"

import {
  FamilyDrawerRoot,
  FamilyDrawerTrigger,
  FamilyDrawerPortal,
  FamilyDrawerOverlay,
  FamilyDrawerContent,
  FamilyDrawerAnimatedWrapper,
  FamilyDrawerAnimatedContent,
  FamilyDrawerClose,
  FamilyDrawerHeader,
  FamilyDrawerButton,
  FamilyDrawerSecondaryButton,
  FamilyDrawerViewContent,
  useFamilyDrawer,
  type ViewsRegistry,
} from "@/registry/cult-ui/family-drawer"

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function DefaultView() {
  const { setView } = useFamilyDrawer()
  return (
    <FamilyDrawerAnimatedWrapper>
      <FamilyDrawerHeader
        icon={<ShareIcon />}
        title="Share this item"
        description="Choose how you'd like to share with others."
      />
      <div className="mt-4 flex flex-col gap-2">
        <FamilyDrawerButton onClick={() => setView("copy-link")}>
          <CopyIcon />
          Copy link
        </FamilyDrawerButton>
        <FamilyDrawerButton onClick={() => setView("send-email")}>
          <MailIcon />
          Send via email
        </FamilyDrawerButton>
      </div>
      <FamilyDrawerSecondaryButton
        className="mt-3 text-muted-foreground"
        onClick={() => {}}
      >
        Cancel
      </FamilyDrawerSecondaryButton>
    </FamilyDrawerAnimatedWrapper>
  )
}

function CopyLinkView() {
  const { setView } = useFamilyDrawer()
  return (
    <FamilyDrawerAnimatedWrapper>
      <FamilyDrawerHeader
        icon={<CopyIcon />}
        title="Link copied!"
        description="The shareable link has been copied to your clipboard."
      />
      <div className="mt-4 p-3 rounded-xl bg-muted text-sm font-mono text-muted-foreground truncate">
        https://myapp.com/share/abc123
      </div>
      <FamilyDrawerSecondaryButton
        className="mt-4 text-muted-foreground"
        onClick={() => setView("default")}
      >
        Back
      </FamilyDrawerSecondaryButton>
    </FamilyDrawerAnimatedWrapper>
  )
}

function SendEmailView() {
  const { setView } = useFamilyDrawer()
  return (
    <FamilyDrawerAnimatedWrapper>
      <FamilyDrawerHeader
        icon={<MailIcon />}
        title="Send via email"
        description="Enter recipient email to share this item directly."
      />
      <input
        type="email"
        placeholder="friend@example.com"
        className="mt-4 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <FamilyDrawerButton className="mt-3" onClick={() => setView("default")}>
        Send
      </FamilyDrawerButton>
      <FamilyDrawerSecondaryButton
        className="mt-2 text-muted-foreground"
        onClick={() => setView("default")}
      >
        Back
      </FamilyDrawerSecondaryButton>
    </FamilyDrawerAnimatedWrapper>
  )
}

const views: ViewsRegistry = {
  default: DefaultView,
  "copy-link": CopyLinkView,
  "send-email": SendEmailView,
}

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[480px]">
      <FamilyDrawerRoot views={views}>
        <FamilyDrawerTrigger>Share</FamilyDrawerTrigger>
        <FamilyDrawerPortal>
          <FamilyDrawerOverlay />
          <FamilyDrawerContent>
            <FamilyDrawerClose />
            <FamilyDrawerAnimatedContent>
              <FamilyDrawerViewContent />
            </FamilyDrawerAnimatedContent>
          </FamilyDrawerContent>
        </FamilyDrawerPortal>
      </FamilyDrawerRoot>
    </div>
  )
}
