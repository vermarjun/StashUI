"use client";

import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
  MentionLabel,
} from "./mention";
import { Textarea } from "@/components/ui/textarea";

const users = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia@northwind.dev",
  },
  {
    id: "2",
    name: "Isabella Nguyen",
    email: "isabella@northwind.dev",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@northwind.dev",
  },
  {
    id: "4",
    name: "Jackson Lee",
    email: "jackson@northwind.dev",
  },
  {
    id: "5",
    name: "William Kim",
    email: "will@northwind.dev",
  },
];

export default function MentionDemo() {
  return (
    <Mention className="w-full max-w-[400px]">
      <MentionLabel>Leave a comment</MentionLabel>
      <MentionInput placeholder="Type @ to mention someone..." asChild>
        <Textarea />
      </MentionInput>
      <MentionContent>
        {users.map((user) => (
          <MentionItem key={user.id} value={user.name}>
            <span className="text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </MentionItem>
        ))}
      </MentionContent>
    </Mention>
  );
}
