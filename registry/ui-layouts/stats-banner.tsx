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


export const StatsBanner = () => {
  return (
    <section className="py-20 px-6 bg-background overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-semibold text-foreground mb-4 text-balance"
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Join businesses worldwide who've transformed their advertising with
            our platform
          </motion.p>
        </div>

        <div className="space-y-6">
          {/* Hero Stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full rounded-3xl p-16 text-center text-white shadow-2xl shadow-blue-500/20 overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1762503203754-62c5a0c969d9?q=80&w=1492&auto=format&fit=crop"
              alt="gradient"
              className="w-full h-full object-cover absolute left-0 top-0"
            />
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

            <div className="relative z-10">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                className="text-7xl md:text-8xl font-semibold block mb-3 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent"
              >
                <CountUp to={500} suffix="K+" delay={0.3} />
              </motion.span>
              <p className="text-xl md:text-2xl font-medium text-blue-50">
                Campaigns Successfully Managed
              </p>
            </div>
          </motion.div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatBox to={300} label="Ads Optimized Daily" delay={0.3} />
            <StatBox to={140} label="Campaigns Built" delay={0.4} />
            <StatBox to={100} label="Happy Customers" delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  )
}

const StatBox = ({
  to,
  label,
  delay,
}: {
  to: number
  label: string
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-card rounded-2xl p-8 text-center border border-border shadow-lg shadow-black/5 hover:shadow-xl hover:border-blue-400/40 transition-all duration-300 group"
  >
    <span className="text-4xl md:text-5xl font-semibold text-card-foreground block mb-3 transition-colors">
      <CountUp to={to} suffix="K+" delay={delay} />
    </span>
    <p className="text-muted-foreground text-base font-medium">{label}</p>
  </motion.div>
)
