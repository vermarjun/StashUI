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

export const BoldStats = () => {
  return (
    <section className="bg-background text-foreground min-h-screen flex flex-col justify-center">
      <div className="flex w-full flex-col gap-20 py-10 max-w-6xl mx-auto px-5">
        <div className="md:flex justify-between items-center border-b border-border pb-5">
          <div className="flex flex-col md:flex-row items-baseline just gap-4">
            <span className="md:text-8xl text-8xl lg:text-9xl font-medium tracking-tighter bg-linear-to-br from-foreground to-foreground/40 bg-clip-text text-transparent">
              <CountUp to={10} suffix="B+" duration={1.8} />
            </span>
            <div className="max-w-xs">
              <h3 className="text-xl font-semibold tracking-tight">
                API Calls Monthly
              </h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Serving the world's most demanding applications with zero
                latency.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="supportive img"
            className="sm:w-96 w-full h-52 rounded-2xl object-cover"
          />
        </div>

        <motion.div
          className="flex justify-between items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="md:text-5xl text-4xl font-medium tracking-tighter text-foreground mb-2">
              <CountUp to={0.1} decimals={1} suffix="ms" delay={0.2} />
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              P99 Latency
            </p>
          </div>
          <div>
            <p className="md:text-5xl text-4xl font-medium tracking-tighter text-foreground mb-2">
              <CountUp to={142} delay={0.3} />
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Global Regions
            </p>
          </div>
          <div>
            <p className="md:text-5xl text-4xl font-medium tracking-tighter text-foreground mb-2">
              24/7
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Human Support
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
