"use client";

import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotIcon,
  ListPlusIcon,
  PlusIcon,
} from "lucide-react";
import * as React from "react";

import type {
  QueryField,
  QueryGroup,
} from "./query-builder-lib";

import {
  QueryBuilder,
  QueryBuilderAddGroup,
  QueryBuilderAddRule,
  QueryBuilderConnector,
  QueryBuilderField,
  QueryBuilderGroup,
  QueryBuilderGroupContent,
  QueryBuilderGroupFooter,
  QueryBuilderGroupHeader,
  QueryBuilderGroupTitle,
  QueryBuilderNegate,
  QueryBuilderOperator,
  QueryBuilderRemove,
  QueryBuilderRule,
  QueryBuilderRuleList,
  QueryBuilderValue,
} from "./query-builder";

const fields: QueryField[] = [
  { value: "title", label: "Title", type: "text" },
  {
    value: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Todo", value: "todo", icon: CircleDashedIcon },
      { label: "In progress", value: "in-progress", icon: CircleDotIcon },
      { label: "Done", value: "done", icon: CircleCheckIcon },
    ],
  },
  { value: "estimate", label: "Estimate", type: "number" },
  { value: "dueDate", label: "Due date", type: "date" },
  { value: "archived", label: "Archived", type: "boolean" },
];

const defaultQuery: QueryGroup = {
  id: "root",
  combinator: "and",
  rules: [
    { id: "status", field: "status", operator: "eq", value: "todo" },
    { id: "estimate", field: "estimate", operator: "gte", value: "5" },
    { id: "title", field: "title", operator: "iLike", value: "checkout" },
  ],
};

export default function QueryBuilderDemo() {
  const [query, setQuery] = React.useState(defaultQuery);

  return (
    <QueryBuilder
      fields={fields}
      value={query}
      onValueChange={setQuery}
      className="w-full max-w-lg"
    >
      <QueryBuilderGroup>
        <QueryBuilderConnector />
        <QueryBuilderGroupContent>
          <QueryBuilderGroupHeader className="data-[depth=0]:hidden">
            <QueryBuilderGroupTitle />
            <QueryBuilderNegate />
            <QueryBuilderAddRule size="icon-sm" aria-label="Add rule">
              <PlusIcon />
            </QueryBuilderAddRule>
            <QueryBuilderAddGroup size="icon-sm" aria-label="Add group">
              <ListPlusIcon />
            </QueryBuilderAddGroup>
            <QueryBuilderRemove />
          </QueryBuilderGroupHeader>
          <QueryBuilderRuleList>
            <QueryBuilderRule>
              <QueryBuilderConnector />
              <div className="flex items-center [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none">
                <QueryBuilderField />
                <QueryBuilderOperator />
                <QueryBuilderValue />
                <QueryBuilderRemove variant="outline" />
              </div>
            </QueryBuilderRule>
          </QueryBuilderRuleList>
          <QueryBuilderGroupFooter className="not-data-[depth=0]:hidden">
            <QueryBuilderAddRule />
            <QueryBuilderAddGroup />
          </QueryBuilderGroupFooter>
        </QueryBuilderGroupContent>
      </QueryBuilderGroup>
    </QueryBuilder>
  );
}
