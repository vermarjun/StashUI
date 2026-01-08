"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface TetrisProps {
  className?: string;
  squareColor: string;
  base?: number;
}

function generateColorShades(hex: string): Record<number, string> {
  // Parse hex color and generate a simple set of shades
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const shade = (factor: number) => {
    const nr = Math.min(255, Math.round(r * factor));
    const ng = Math.min(255, Math.round(g * factor));
    const nb = Math.min(255, Math.round(b * factor));
    return `rgb(${nr},${ng},${nb})`;
  };

  return {
    100: shade(1.8),
    400: shade(1.2),
    500: shade(1.0),
    600: shade(0.85),
    700: shade(0.7),
    900: shade(0.3),
  };
}

export function Tetris({ className, squareColor, base = 10 }: TetrisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<(boolean | null)[][]>([]);
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0, cellSize: 0, width: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const theme = generateColorShades(squareColor.startsWith("#") ? squareColor : "#6366f1");

  const createGrid = useCallback((rows: number, cols: number) => {
    const newGrid: (boolean | null)[][] = [];
    for (let i = 0; i < rows; i++) {
      newGrid.push(new Array(cols).fill(null));
    }
    return newGrid;
  }, []);

  const calcGrid = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const cellSize = width / base;
    const rows = Math.floor(height / cellSize);
    const cols = Math.floor(width / cellSize);
    setDimensions({ rows, cols, cellSize, width });
    setGrid(createGrid(rows, cols));
  }, [base, createGrid]);

  useEffect(() => {
    timeoutRef.current = setTimeout(calcGrid, 50);

    const observer = new ResizeObserver(calcGrid);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [calcGrid]);

  useEffect(() => {
    if (dimensions.rows === 0 || dimensions.cols === 0) return;

    intervalRef.current = setInterval(() => {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        const rows = next.length;
        const cols = next[0]?.length ?? 0;

        // Check if last row is full and clear it
        const isFilled = next[rows - 1]?.every((cell) => cell !== null);
        if (isFilled) {
          for (let col = 0; col < cols; col++) {
            next[rows - 1][col] = null;
          }
          return next;
        }

        // Move cells down
        for (let row = rows - 1; row >= 0; row--) {
          for (let col = 0; col < cols; col++) {
            const cell = next[row][col];
            const nextRow = next[row + 1];
            if (cell !== null && nextRow && nextRow[col] === null) {
              next[row + 1][col] = cell;
              next[row][col] = null;
            }
          }
        }

        // Create a new cell at a random column in the first row
        const x = Math.floor(Math.random() * cols);
        next[0][x] = true;

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dimensions]);

  const removeCell = (rowIndex: number, colIndex: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[rowIndex][colIndex] = null;
      return next;
    });
  };

  const { rows, cols, cellSize } = dimensions;

  return (
    <div
      style={{
        ["--cell-size" as string]: `${cellSize}px`,
        ["--grid-rows" as string]: rows - 1,
      }}
      className={cn("relative w-full", className)}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 grid justify-center -space-y-px"
        style={{ gridTemplateRows: `repeat(${rows - 1}, ${cellSize}px)` }}
      >
        {grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid flex-1 grid-flow-col -space-x-px"
            style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize}px)` }}
          >
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  ["--border-light" as string]: theme[100],
                  ["--border-dark" as string]: theme[900],
                  ["--square-light" as string]: theme[500],
                  ["--square-hover-light" as string]: theme[400],
                  ["--square-dark" as string]: theme[700],
                  ["--square-hover-dark" as string]: theme[600],
                  borderColor: theme[100],
                } as React.CSSProperties}
                className="relative border"
              >
                <div
                  onClick={() => cell && removeCell(rowIndex, cellIndex)}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000 will-change-[opacity]",
                    cell ? "cursor-pointer opacity-60" : "opacity-0"
                  )}
                  style={{ backgroundColor: theme[500] }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
