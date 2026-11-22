"use client"

import JsonViewer from "./json-viewer"

const order = {
  id: "ord_9f3K2xLp",
  status: "fulfilled",
  createdAt: "2026-11-20T14:32:08Z",
  updatedAt: "2026-11-21T09:05:41Z",
  total: 248.5,
  currency: "USD",
  paid: true,
  coupon: null,
  customer: {
    id: "cus_7Hq1",
    name: "Maya Okafor",
    email: "maya.okafor@example.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    tier: "gold",
  },
  items: [
    { sku: "KB-75-BLK", name: "Low-profile keyboard", qty: 1, price: 129 },
    { sku: "MS-PRO-WHT", name: "Wireless mouse", qty: 1, price: 69.5 },
    { sku: "PD-XL-GRY", name: "Desk pad XL", qty: 2, price: 25 },
  ],
  shipping: {
    carrier: "DHL Express",
    tracking: "JD014600006281234567",
    address: { line1: "221 Mission St", city: "San Francisco", country: "US" },
  },
  tags: ["priority", "gift-wrap", "repeat-customer"],
}

export default function JsonViewerDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-start justify-center bg-background p-8">
      <JsonViewer
        data={order}
        title="GET /v1/orders/ord_9f3K2xLp"
        defaultExpanded={2}
        showColorIndent
        className="max-h-[540px] max-w-2xl"
      />
    </div>
  )
}
