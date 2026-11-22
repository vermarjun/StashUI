"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import {
    type AnimationPlaybackControls,
    type HTMLMotionProps,
    MotionValue,
    type Target,
    animate,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type MouseWaveTextProps = {
    children: ReactNode;
    className?: string;
    shadowClassName?: string;
    textClassName?: string;
    wrapperTweenVars?: Target;
} & Omit<HTMLMotionProps<"div">, "children" | "initial">;

const TOTAL_DURATION = 1.5;
const STAGGER_AMOUNT = 1;
const ANIM_DURATION = 0.25;

const Slice = ({
    index,
    total,
    progress,
    textContent,
    height,
}: {
    index: number;
    total: number;
    progress: MotionValue<number>;
    textContent: string;
    height: number;
}) => {
    const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const sineInOut = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;

    const y = useTransform(progress, (p: number) => {
        const t = p * TOTAL_DURATION;
        const start = total > 1 ? (index / (total - 1)) * STAGGER_AMOUNT : 0;
        const localT = t - start;

        if (localT < 0 || localT > ANIM_DURATION * 2) return -height;

        let yAnim = 0;
        if (localT <= ANIM_DURATION) {
            const normalized = localT / ANIM_DURATION;
            yAnim = -30 * easeInOutCubic(normalized);
        } else {
            const normalized = (localT - ANIM_DURATION) / ANIM_DURATION;
            yAnim = -30 * (1 - sineInOut(normalized));
        }

        return -height + yAnim;
    });

    return (
        <motion.div
            style={{
                position: "absolute",
                width: 4,
                height: height,
                x: index * 2,
                y,
                textIndent: -index * 2,
                overflow: "hidden",
            }}>
            {textContent}
        </motion.div>
    );
};

export const MouseWaveText = ({
    children,
    textClassName,
    className,
    shadowClassName,
    wrapperTweenVars,
    ...props
}: MouseWaveTextProps) => {
    const shadowRef = useRef<HTMLParagraphElement | null>(null);

    const [sliceData, setSliceData] = useState<{
        numSlices: number;
        height: number;
        text: string;
    } | null>(null);

    const progress = useMotionValue(0.9);
    const wrapperX = useTransform(progress, [0, 1], [15, -15]);
    const wrapperY = useTransform(progress, [0, 1], [-15, 15]);

    const textControls = useAnimation();
    const shadowControls = useAnimation();

    useEffect(() => {
        if (!shadowRef.current) return;
        const bb = shadowRef.current.getBoundingClientRect();
        setSliceData({
            numSlices: Math.floor(bb.width * 0.55) + 1,
            height: bb.height,
            text: shadowRef.current.textContent || "",
        });
    }, [children]);

    useEffect(() => {
        if (!sliceData) return;

        let anim: AnimationPlaybackControls;
        let isCancelled = false;

        const sequence = async () => {
            anim = animate(progress, 0.1, { duration: 1.5, ease: "easeInOut" });
            await anim;
            if (!isCancelled) {
                anim = animate(progress, 0.4, {
                    duration: 4,
                    type: "spring",
                    bounce: 0.5,
                });
            }
        };

        sequence();

        const onMove = (e: MouseEvent) => {
            isCancelled = true;
            if (anim) anim.stop();
            const xp = e.clientX / window.innerWidth;
            anim = animate(progress, xp, { duration: 0.5, ease: "easeOut" });
        };

        const onMouseDown = () => {
            textControls.start({ y: -25, transition: { duration: 0.2 } });
            shadowControls.start({
                filter: "blur(2px)",
                opacity: 0.85,
                scale: 0.96,
                transformOrigin: "45px 99px",
                transition: { duration: 0.2 },
            });
        };

        const onMouseUp = () => {
            textControls.start({ y: 0, transition: { type: "spring", bounce: 0.5 } });
            shadowControls.start({
                filter: "blur(0px)",
                opacity: 1,
                scale: 1,
                transition: { type: "spring", bounce: 0.5 },
            });
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            isCancelled = true;
            if (anim) anim.stop();
            textControls.stop();
            shadowControls.stop();
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [sliceData, progress, textControls, shadowControls]);

    return (
        <motion.div
            {...props}
            className={cn("whitespace-nowrap", className)}
            style={{ x: wrapperX, y: wrapperY, ...props.style }}
            initial={wrapperTweenVars}>
            <motion.p ref={shadowRef} className={shadowClassName} animate={shadowControls}>
                {children}
            </motion.p>
            <motion.div
                aria-disabled="true"
                className={textClassName}
                animate={textControls}
                style={{ position: "relative" }}>
                {sliceData &&
                    Array.from({ length: sliceData.numSlices }).map((_, i) => (
                        <Slice
                            key={i}
                            index={i}
                            total={sliceData.numSlices}
                            progress={progress}
                            textContent={sliceData.text}
                            height={sliceData.height}
                        />
                    ))}
            </motion.div>
        </motion.div>
    );
};
