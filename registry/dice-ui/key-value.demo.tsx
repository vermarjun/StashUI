"use client";

import {
  KeyValue,
  KeyValueAdd,
  KeyValueItem,
  KeyValueKeyInput,
  KeyValueList,
  KeyValueRemove,
  KeyValueValueInput,
} from "./key-value";

const defaultEnv = [
  { id: "db", key: "DATABASE_URL", value: "postgres://app:5432/orders" },
  { id: "region", key: "AWS_REGION", value: "eu-west-1" },
  { id: "sentry", key: "SENTRY_DSN", value: "https://4f2a@o812.ingest.io/77" },
];

export default function KeyValueDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold">Environment variables</h3>
        <p className="text-sm text-muted-foreground">
          Paste a .env file or add variables one by one.
        </p>
      </div>
      <KeyValue defaultValue={defaultEnv}>
        <KeyValueList>
          <KeyValueItem>
            <KeyValueKeyInput placeholder="KEY" className="font-mono" />
            <KeyValueValueInput placeholder="value" className="font-mono" />
            <KeyValueRemove />
          </KeyValueItem>
        </KeyValueList>
        <KeyValueAdd />
      </KeyValue>
    </div>
  );
}
