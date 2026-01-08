"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  File as FileIcon,
  Folder as FolderClosedIcon,
  FolderOpen as FolderOpenIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface TreeViewElement {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
}

interface TreeContextValue {
  selectedId: string | undefined;
  expandedItems: string[];
  indicator: boolean;
  direction: "rtl" | "ltr";
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const TreeContext = createContext<TreeContextValue | null>(null);

function useTreeContext(): TreeContextValue {
  const ctx = useContext(TreeContext);
  if (!ctx) throw new Error("Must be used inside <Tree>");
  return ctx;
}

// ─── TreeIndicator ────────────────────────────────────────────────────────────
function TreeIndicator() {
  const { direction } = useTreeContext();
  return (
    <div
      dir={direction}
      className="bg-muted absolute left-1.5 h-full w-px rounded-md py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5"
    />
  );
}

// ─── File ─────────────────────────────────────────────────────────────────────
interface FileProps {
  id: string;
  name: string;
  className?: string;
  isSelectable?: boolean;
  isSelect?: boolean;
}

export function File({
  id,
  name,
  className,
  isSelectable = true,
  isSelect,
}: FileProps) {
  const { selectedId, selectItem, direction } = useTreeContext();
  const isSelected = isSelect || selectedId === id;

  function handleClick() {
    if (!isSelectable) return;
    selectItem(id);
  }

  return (
    <button
      type="button"
      disabled={!isSelectable}
      dir={direction}
      onClick={handleClick}
      className={cn(
        "flex w-fit items-center gap-1 rounded-sm pr-1 text-sm duration-200 ease-in-out rtl:pr-0 rtl:pl-1",
        isSelected && isSelectable ? "bg-muted" : "",
        isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-50",
        className
      )}
    >
      <FileIcon size={16} />
      <span className="select-none">{name}</span>
    </button>
  );
}

// ─── Folder ───────────────────────────────────────────────────────────────────
interface FolderProps {
  id: string;
  name: string;
  className?: string;
  isSelectable?: boolean;
  isSelect?: boolean;
  children?: ReactNode;
}

export function Folder({
  id,
  name,
  className,
  isSelectable = true,
  isSelect,
  children,
}: FolderProps) {
  const { expandedItems, handleExpand, indicator, direction } = useTreeContext();
  const isExpanded = expandedItems.includes(id);

  function handleClick() {
    if (!isSelectable) return;
    handleExpand(id);
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div
        dir={direction}
        onClick={handleClick}
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-md text-sm transition-all duration-200",
          isSelect && isSelectable ? "bg-muted" : "",
          !isSelectable ? "cursor-not-allowed opacity-50" : "",
          className
        )}
      >
        {isExpanded ? (
          <FolderOpenIcon size={16} />
        ) : (
          <FolderClosedIcon size={16} />
        )}
        <span className="select-none">{name}</span>
      </div>

      {isExpanded && (
        <div className="relative text-sm">
          {name && indicator && <TreeIndicator aria-hidden="true" />}
          <div
            className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5"
            dir={direction}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tree ─────────────────────────────────────────────────────────────────────
interface TreeProps {
  className?: string;
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpandedItems?: string[];
  direction?: "rtl" | "ltr";
  children?: ReactNode;
}

function expandPathToTarget(
  list: TreeViewElement[],
  targetId: string
): string[] {
  const result: string[] = [];

  function find(current: TreeViewElement, path: string[]): boolean {
    const newPath = [...path, current.id];
    if (current.id === targetId) {
      result.push(...newPath);
      return true;
    }
    if (current.children) {
      for (const child of current.children) {
        if (find(child, newPath)) return true;
      }
    }
    return false;
  }

  for (const el of list) {
    find(el, []);
  }
  return result;
}

export function Tree({
  className,
  initialSelectedId,
  indicator = true,
  elements,
  initialExpandedItems = [],
  direction = "ltr",
  children,
}: TreeProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId
  );
  const [expandedItems, setExpandedItems] = useState<string[]>(
    initialExpandedItems
  );
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && initialSelectedId && elements) {
      const path = expandPathToTarget(elements, initialSelectedId);
      setExpandedItems((prev) => Array.from(new Set([...prev, ...path])));
      initialized.current = true;
    }
  }, [initialSelectedId, elements]);

  function handleExpand(id: string) {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function selectItem(id: string) {
    setSelectedId(id);
  }

  return (
    <TreeContext.Provider
      value={{
        selectedId,
        expandedItems,
        indicator,
        direction,
        handleExpand,
        selectItem,
      }}
    >
      <div className={cn("size-full", className)}>
        <div
          className="relative h-full overflow-auto px-2"
          dir={direction}
        >
          <div className="flex flex-col gap-1">{children}</div>
        </div>
      </div>
    </TreeContext.Provider>
  );
}
