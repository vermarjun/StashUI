"use client";

import { useState } from "react";
import { InlineEditCard, type EventData } from "./inline-edit";

export default function InlineEditDemo() {
  const [data, setData] = useState<EventData>({
    event: "Design Systems Meetup",
    date: "Thursday, 12 March",
    start: "6:30 PM",
    end: "9:00 PM",
    location: "Lisbon, PT",
    url: "stashui.dev/meetup",
    desc: "An evening of short talks on tokens, theming and component APIs, followed by drinks on the terrace.",
  });
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6">
      <InlineEditCard
        title="Event details"
        data={data}
        onDataChange={setData}
      />
    </div>
  );
}
