"use client";

import { useState } from "react";
import { SortableList, SortableListItem, type Item } from "@/registry/cult-ui/sortable-list";

const INITIAL_ITEMS: Item[] = [
  { id: 1, text: "Design system tokens", checked: false, description: "Define color, spacing, and typography scales" },
  { id: 2, text: "Component architecture", checked: false, description: "Plan the component hierarchy and props" },
  { id: 3, text: "Write unit tests", checked: false, description: "Cover edge cases and accessibility" },
  { id: 4, text: "Review pull request", checked: false, description: "Check code quality and naming" },
  { id: 5, text: "Update documentation", checked: false, description: "Keep the README and JSDoc in sync" },
];

export default function Demo() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);

  const handleComplete = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-2">
      <SortableList
        items={items}
        setItems={setItems}
        onCompleteItem={handleComplete}
        renderItem={(item, order, onComplete, onRemove) => (
          <SortableListItem
            key={item.id}
            item={item}
            order={order}
            onCompleteItem={onComplete}
            onRemoveItem={onRemove}
            handleDrag={() => {}}
          />
        )}
      />
    </div>
  );
}
