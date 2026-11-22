"use client";

import { Coffee, Music2, ShoppingBag, Plane } from "lucide-react";
import {
  TransactionList,
  type Transaction,
} from "@/registry/watermelon-ui/transaction-list";

const transactions: Transaction[] = [
  {
    id: "t1",
    icon: <Coffee className="size-4 text-amber-300" />,
    name: "Blue Bottle Coffee",
    category: "Food & Drink",
    amount: "-$6.40",
    date: "Nov 21, 2026",
    time: "8:42 AM",
    transactionId: "TXN-48213",
    paymentMethod: "Debit Card",
    cardNumber: "4821",
    cardType: "Visa",
  },
  {
    id: "t2",
    icon: <Music2 className="size-4 text-emerald-300" />,
    name: "Music Premium",
    category: "Subscription",
    amount: "-$10.99",
    date: "Nov 20, 2026",
    time: "12:00 AM",
    transactionId: "TXN-47790",
    paymentMethod: "Credit Card",
    cardNumber: "1094",
    cardType: "Mastercard",
  },
  {
    id: "t3",
    icon: <ShoppingBag className="size-4 text-sky-300" />,
    name: "Everlane",
    category: "Shopping",
    amount: "-$88.00",
    date: "Nov 18, 2026",
    time: "4:15 PM",
    transactionId: "TXN-46102",
    paymentMethod: "Credit Card",
    cardNumber: "1094",
    cardType: "Mastercard",
  },
  {
    id: "t4",
    icon: <Plane className="size-4 text-violet-300" />,
    name: "Lisbon Flight",
    category: "Travel",
    amount: "-$412.30",
    date: "Nov 16, 2026",
    time: "9:27 PM",
    transactionId: "TXN-45518",
    paymentMethod: "Debit Card",
    cardNumber: "4821",
    cardType: "Visa",
  },
];

export default function TransactionListDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <TransactionList transactions={transactions} />
    </div>
  );
}
