'use client';
import { useState } from "react";
import { PhoneInput } from "@/registry/ui-layouts/phone-input";

export default function Demo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-80 border-2 rounded-lg overflow-hidden dark:bg-neutral-950 bg-neutral-50">
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={(val) => setValue(val ?? "")}
          defaultCountry="US"
        />
      </div>
    </div>
  );
}
