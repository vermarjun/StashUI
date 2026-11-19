'use client'
import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'motion/react'

function CountUp({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.6,
  delay = 0,
}: {
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, prefix, decimals, duration, delay])
  return <span ref={ref}>{prefix + (0).toFixed(decimals) + suffix}</span>
}

export const StatsBento = () => {
  return (
    <section className="min-h-screen bg-background flex flex-col justify-center px-5">
      <div className="grid w-full grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 max-w-5xl mx-auto">
        {/* Primary Stat */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-3 md:row-span-2 bg-zinc-950 rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative border border-border min-h-[320px]"
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[repeating-linear-gradient(45deg,#383838_0px_1px,transparent_1px_10px)] mask-[radial-gradient(ellipse_80%_50%_at_100%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
          {/* <div className="absolute top-0 right-0 p-8 opacity-20">
            <div className="size-40 border-8 border-white rounded-full translate-x-10 -translate-y-10" />
          </div> */}
          <div>
            <span className="inline-block px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-6">
              Market Share
            </span>
            <h3 className="text-6xl tracking-tighter text-white"><CountUp to={64} suffix="%" delay={0.2} /></h3>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs">
            Dominating the cloud-native infrastructure market for venture-backed
            startups.
          </p>
        </motion.div>

        {/* Secondary Stat A */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-3 bg-card rounded-3xl p-8 border border-border flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Growth
            </p>
            <p className="text-3xl text-card-foreground"><CountUp to={240} prefix="+" suffix="%" delay={0.3} /></p>
          </div>
          <div className="flex gap-1 items-end h-8">
            {[10, 20, 40, 30, 60, 50, 80, 70, 90, 100, 110].map((h, i) => (
              <motion.div
                key={i}
                className="w-1.5 origin-bottom bg-foreground rounded-full"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Tertiary Stat B */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-1 bg-card rounded-3xl p-6 border border-border flex flex-col justify-center text-center"
        >
          <p className="text-2xl text-card-foreground"><CountUp to={12} delay={0.4} /></p>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Awards
          </p>
        </motion.div>

        {/* Tertiary Stat C */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.36, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="md:col-span-2 bg-muted rounded-3xl p-6 flex items-center gap-4"
        >
          <div className="size-10 text-2xl rounded-full bg-background text-amber-400 flex items-center justify-center shrink-0 shadow-sm font-semibold">
            ★
          </div>
          <div>
            <p className="text-sm text-foreground leading-none">4.9 / 5.0</p>
            <p className="text-xs font-semibold text-muted-foreground mt-1">
              G2 Peer Reviews
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
