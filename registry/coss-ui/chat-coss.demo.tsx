"use client"

import * as React from "react"
import { SendHorizontalIcon } from "lucide-react"

import {
  ChatConversation,
  ChatDatePill,
  ChatDeliveryIndicator,
  ChatMessage,
  ChatMessageActionToolbar,
  ChatReactionChip,
  ChatReactionPicker,
  ChatReplyReference,
  ChatTypingIndicator,
  ChatUnreadDivider,
  useChatScroll,
  type ChatDeliveryIndicatorProps,
} from "./chat-coss"

type Person = { name: string; avatar: string }
type Reaction = { emoji: string; label: string; by: string[] }
type Msg = {
  id: string
  from: Person | "me"
  text: string
  time: string
  reply?: { author: string; preview: string }
  reactions?: Reaction[]
  status?: ChatDeliveryIndicatorProps["status"]
  fresh?: boolean
}

const PRIYA: Person = { name: "Priya Raman", avatar: "https://i.pravatar.cc/150?img=45" }
const DANIEL: Person = { name: "Daniel Okafor", avatar: "https://i.pravatar.cc/150?img=12" }
const SOFIA: Person = { name: "Sofia Marchetti", avatar: "https://i.pravatar.cc/150?img=32" }

const EMOJIS = [
  { emoji: "👍", label: "Thumbs up" },
  { emoji: "❤️", label: "Heart" },
  { emoji: "🎉", label: "Party" },
  { emoji: "😂", label: "Laughing" },
  { emoji: "👀", label: "Eyes" },
]

const INITIAL: Msg[] = [
  { id: "1", from: PRIYA, text: "Morning! Release notes for 4.2 are in the doc, can someone give them a final read?", time: "09:02" },
  { id: "2", from: DANIEL, text: "On it. The offline mode section reads great.", time: "09:05" },
  {
    id: "3",
    from: DANIEL,
    text: "One nit: we say 30 days of history, it is 30 documents.",
    time: "09:05",
    reactions: [{ emoji: "👀", label: "Eyes", by: ["Priya Raman"] }],
  },
  {
    id: "4",
    from: "me",
    text: "Good catch, fixed it. Shipping the post at 11:00 unless anyone objects.",
    time: "09:11",
    status: "read",
    reactions: [
      { emoji: "👍", label: "Thumbs up", by: ["Priya Raman", "Daniel Okafor"] },
      { emoji: "🎉", label: "Party", by: ["Sofia Marchetti"] },
    ],
  },
  {
    id: "5",
    from: SOFIA,
    text: "No objections from design. Hero image is uploaded in the launch folder.",
    time: "09:14",
    reply: { author: "You", preview: "Shipping the post at 11:00 unless anyone objects." },
  },
]

function Avatar({ person }: { person: Person }) {
  return (
    <img
      src={person.avatar}
      alt=""
      className="size-8 rounded-full object-cover"
    />
  )
}

export default function ChatCossDemo() {
  const [messages, setMessages] = React.useState<Msg[]>(INITIAL)
  const [draft, setDraft] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const scroll = useChatScroll({ itemCount: messages.length + (typing ? 1 : 0) })
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  React.useEffect(() => {
    const t = timers.current
    return () => t.forEach(clearTimeout)
  }, [])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const toggleReaction = (id: string, emoji: string) => {
    setMessages((list) =>
      list.map((m) => {
        if (m.id !== id) return m
        const reactions = [...(m.reactions ?? [])]
        const i = reactions.findIndex((r) => r.emoji === emoji)
        if (i === -1) {
          const label = EMOJIS.find((e) => e.emoji === emoji)?.label ?? emoji
          reactions.push({ emoji, label, by: ["You"] })
        } else {
          const r = reactions[i]
          const by = r.by.includes("You") ? r.by.filter((n) => n !== "You") : [...r.by, "You"]
          if (by.length) reactions[i] = { ...r, by }
          else reactions.splice(i, 1)
        }
        return { ...m, reactions }
      }),
    )
  }

  const setStatus = (id: string, status: Msg["status"]) =>
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, status } : m)))

  const send = (event: React.FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    const id = String(Date.now())
    setMessages((list) => [...list, { id, from: "me", text, time: "09:16", status: "sending", fresh: true }])
    setDraft("")
    scroll.scrollToLatest()
    later(500, () => setStatus(id, "sent"))
    later(1100, () => setStatus(id, "delivered"))
    later(1500, () => setTyping(true))
    later(2300, () => setStatus(id, "read"))
    later(3400, () => {
      setTyping(false)
      setMessages((list) => [
        ...list,
        { id: id + "-r", from: PRIYA, text: "Perfect, thank you! 🚀", time: "09:17", fresh: true },
      ])
    })
  }

  return (
    <div className="flex h-[600px] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xl">
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <div className="flex -space-x-2">
          {[PRIYA, DANIEL, SOFIA].map((p) => (
            <img key={p.name} src={p.avatar} alt="" className="size-7 rounded-full object-cover ring-2 ring-popover" />
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Launch crew</span>
          <span className="text-xs text-muted-foreground">4 members · 3 online</span>
        </div>
      </header>

      <ChatConversation scroll={scroll} label="Launch crew messages" jumpLabel="Jump to latest">
        <ChatDatePill>Today</ChatDatePill>
        {messages.map((m, i) => {
          const own = m.from === "me"
          const prev = messages[i - 1]
          const grouped = !!prev && prev.from === m.from
          const person = own ? null : (m.from as Person)
          return (
            <React.Fragment key={m.id}>
              {m.id === "5" && <ChatUnreadDivider>New</ChatUnreadDivider>}
              <ChatMessage
                side={own ? "outgoing" : "incoming"}
                grouped={grouped}
                author={person?.name}
                avatar={person ? <Avatar person={person} /> : undefined}
                animateEntrance={m.fresh}
                actions={
                  <ChatMessageActionToolbar
                    side={own ? "outgoing" : "incoming"}
                    toolbarLabel="Message actions"
                    reactionPicker={() => (
                      <ChatReactionPicker
                        inToolbar
                        options={EMOJIS}
                        selectedEmojis={(m.reactions ?? []).filter((r) => r.by.includes("You")).map((r) => r.emoji)}
                        triggerLabel="Add reaction"
                        triggerTooltip="React"
                        popupLabel="Reactions"
                        onSelect={(emoji) => toggleReaction(m.id, emoji)}
                      />
                    )}
                  />
                }
                reactions={
                  m.reactions?.length
                    ? m.reactions.map((r) => (
                        <ChatReactionChip
                          key={r.emoji}
                          emoji={r.emoji}
                          count={r.by.length}
                          selected={r.by.includes("You")}
                          label={`${r.label}: ${r.by.join(", ")}`}
                          onClick={() => toggleReaction(m.id, r.emoji)}
                        />
                      ))
                    : undefined
                }
                footer={
                  own && m.status ? (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {m.time}
                      <ChatDeliveryIndicator status={m.status} label={m.status} />
                    </span>
                  ) : undefined
                }
              >
                {m.reply ? (
                  <div className="flex flex-col gap-1.5">
                    <ChatReplyReference author={m.reply.author} preview={m.reply.preview} />
                    <p>{m.text}</p>
                  </div>
                ) : (
                  m.text
                )}
              </ChatMessage>
            </React.Fragment>
          )
        })}
        <ChatTypingIndicator label="Priya is typing" visible={typing} />
      </ChatConversation>

      <form onSubmit={send} className="flex items-center gap-2 border-t p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message Launch crew"
          aria-label="Message"
          className="h-10 flex-1 rounded-full border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          aria-label="Send"
          className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
          disabled={!draft.trim()}
        >
          <SendHorizontalIcon className="size-4" />
        </button>
      </form>
    </div>
  )
}
