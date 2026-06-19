"use client";

import { useState } from "react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/origin-ui/timeline";

const steps = [
  {
    step: 1,
    title: "Order placed",
    date: "Jun 10, 2024",
    content: "Your order #ORD-8821 has been received and is being processed.",
  },
  {
    step: 2,
    title: "Payment confirmed",
    date: "Jun 10, 2024",
    content: "Payment of $129.00 was successfully charged to your card.",
  },
  {
    step: 3,
    title: "Shipped",
    date: "Jun 12, 2024",
    content: "Your package is on its way — tracking ID: 1Z999AA10123456784.",
  },
  {
    step: 4,
    title: "Out for delivery",
    date: "Jun 14, 2024",
    content: "The carrier is en route. Estimated arrival: today by 8 pm.",
  },
  {
    step: 5,
    title: "Delivered",
    date: "Jun 14, 2024",
    content: "Package delivered. Thank you for your order!",
  },
];

export default function Demo() {
  const [active, setActive] = useState(3);

  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full max-w-sm mx-auto">
      <div className="w-full">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          Order status
        </p>
        <h2 className="text-base font-semibold text-foreground mb-6">
          Track your shipment
        </h2>
        <Timeline value={active} onValueChange={setActive}>
          {steps.map(({ step, title, date, content }) => (
            <TimelineItem key={step} step={step}>
              <TimelineIndicator />
              <TimelineSeparator />
              <TimelineHeader>
                <TimelineDate>{date}</TimelineDate>
                <TimelineTitle
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => setActive(step)}
                >
                  {title}
                </TimelineTitle>
              </TimelineHeader>
              <TimelineContent>{content}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
