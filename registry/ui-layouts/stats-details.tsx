import React from 'react'
import { TrendingUp, Users, Database } from 'lucide-react'

const stats = [
  {
    label: 'Revenue Growth',
    value: '+142%',
    description: 'Year-over-year increase in recurring revenue streams.',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: 'Customer Retention',
    value: '94%',
    description: 'Average retention rate across our enterprise tier.',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Data Processed',
    value: '14PB',
    description: 'Petabytes of raw telemetry processed daily across nodes.',
    icon: <Database className="w-5 h-5" />,
  },
]

export const DetailedStats = () => {
  return (
    <section className="bg-background min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group p-8 rounded-2xl relative overflow-hidden bg-card border border-border hover:border-orange-500/40 transition-colors duration-300"
            >
              <article className="relative z-10">
                <div className="size-8 rounded-lg bg-background group-hover:bg-orange-600 border border-border group-hover:border-orange-500 flex items-center justify-center text-lg font-bold text-foreground mb-6 group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest group-hover:text-zinc-100 text-muted-foreground mb-2 transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-4xl font-semibold tracking-tight group-hover:text-white text-card-foreground mb-4 transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-sm group-hover:text-zinc-100 text-muted-foreground text-pretty transition-colors duration-300 leading-relaxed">
                  {stat.description}
                </p>
              </article>
              <img
                src="https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="supportive img"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
