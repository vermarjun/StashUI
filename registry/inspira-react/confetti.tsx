"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from "react";
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { create } from "canvas-confetti";
import confetti from "canvas-confetti";

// ------------ Context ------------
interface ConfettiApi {
  fire: (options?: ConfettiOptions) => void;
}

const ConfettiContext = createContext<ConfettiApi | null>(null);

export function useConfetti() {
  return useContext(ConfettiContext);
}

// ------------ Confetti (container) ------------
export interface ConfettiRef {
  fire: (options?: ConfettiOptions) => void;
}

interface ConfettiProps {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(function Confetti(
  { options, globalOptions, manualstart = false, className, children },
  ref,
) {
  const instanceRef = useRef<ConfettiInstance | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fire = useCallback(
    (opts: ConfettiOptions = {}) => {
      instanceRef.current?.({ ...options, ...opts });
    },
    [options],
  );

  useImperativeHandle(ref, () => ({ fire }), [fire]);

  useEffect(() => {
    if (!canvasRef.current) return;
    instanceRef.current = create(canvasRef.current, {
      ...globalOptions,
      resize: true,
    });
    if (!manualstart) {
      fire();
    }
    return () => {
      instanceRef.current?.reset();
      instanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfettiContext.Provider value={{ fire }}>
      <div>
        <canvas ref={canvasRef} className={className} />
        {children}
      </div>
    </ConfettiContext.Provider>
  );
});

// ------------ ConfettiButton ------------
interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options?: ConfettiOptions & { canvas?: HTMLCanvasElement };
  children?: ReactNode;
}

export function ConfettiButton({
  options,
  children,
  onClick,
  ...rest
}: ConfettiButtonProps) {
  const ctx = useConfetti();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    confetti({
      ...options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });

    ctx?.fire(options);
    onClick?.(event);
  }

  return (
    <button onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}
