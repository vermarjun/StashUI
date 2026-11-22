"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

import ScrollAndSwapText from "./scroll-and-swap"

// Generate an array of imaginary names
const names = [
  "Alexandra Rodriguez",
  "Benjamin Chen",
  "Catherine Williams",
  "David Martinez",
  "Elena Petrov",
  "Francesco Rossi",
  "Gabriela Santos",
  "Henrik Larsson",
  "Isabella Thompson",
  "James Anderson",
  "Katarina Novak",
  "Leonardo Silva",
  "Maria Gonzalez",
  "Nikolai Volkov",
  "Olivia Johnson",
  "Pablo Hernandez",
  "Qiana Washington",
  "Ricardo Lopez",
  "Sophia Kim",
  "Thomas Mueller",
  "Ursula Schmidt",
  "Viktor Petersen",
  "Wen Li",
  "Xavier Dubois",
  "Yasmin Hassan",
  "Zachary Brown",
  "Amelia Davis",
  "Bruno Costa",
  "Clara Johansson",
  "Diego Morales",
  "Evelyn Taylor",
  "Felix Wagner",
  "Grace Wilson",
  "Hugo Andersen",
  "Iris Nakamura",
  "Julian Beck",
  "Kira Popovic",
  "Lucas Garcia",
  "Maya Patel",
  "Nathan Clark",
  "Ophelia Martin",
  "Pietro Romano",
  "Quinn O'Brien",
  "Rosa Fernandez",
  "Sebastian Lee",
  "Tara Mitchell",
  "Ulrich Weber",
  "Valentina Rosso",
  "William Jones",
  "Xiomara Reyes",
  "Yuki Tanaka",
  "Zara Ahmed",
  "Andre Leclerc",
  "Beatrice Hall",
  "Carlos Mendoza",
  "Delphine Moreau",
  "Emilio Bianchi",
  "Fiona Murphy",
  "Giovanni Conti",
  "Helena Svensson",
  "Ivan Dimitrov",
  "Jasmine Green",
  "Kai Nielsen",
  "Luna Torres",
  "Marco Esposito",
  "Nadia Kozlov",
  "Oscar Lindberg",
  "Penelope White",
  "Quincy Adams",
  "Rafael Vargas",
  "Stella Jackson",
  "Theo Van Der Berg",
  "Uma Sharma",
  "Vincenzo Ferrari",
  "Willow Parker",
  "Ximena Castillo",
  "Yolanda King",
  "Zander Cooper",
  "Aria Blackwood",
  "Bastien Dubois",
  "Camille Laurent",
  "Dante Ricci",
  "Estelle Moreau",
  "Fabio Santos",
  "Gemma Wright",
  "Hector Vega",
  "Ingrid Hansen",
  "Javier Ruiz",
  "Kaia Storm",
  "Liam O'Connor",
  "Mila Petrov",
  "Noah Fischer",
  "Octavia Bell",
  "Phoenix Rivera",
  "Quentin Gray",
  "Ruby Anderson",
  "Sage Thompson",
  "Tobias Klein",
  "Unity Cross",
  "Vera Kozlova",
  "Wade Turner",
  "Xara Moon",
  "York Sterling",
  "Zoe Martinez",
  "Atlas Kane",
  "Brielle Fox",
  "Caspian Reed",
  "Dara Singh",
  "Eden Blake",
  "Falcon Knight",
  "Gaia Stone",
  "Harbor Wells",
  "Indigo Vale",
  "Juno Pierce",
  "Knox Rivers",
]

export default function ScrollAndSwapDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      autoRaf: true,
      wrapper: containerRef.current,
      duration: 3,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div
      className="relative h-[600px] w-full overflow-auto overscroll-contain bg-background text-foreground [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [scrollbar-width:none]"
      ref={containerRef}
    >
      <div className="relative flex min-h-[1500px] items-start justify-center pt-56 pb-64 uppercase">
        <div className="flex flex-col items-center justify-center text-6xl leading-none">
          {names.slice(0, 28).map((name, index) => (
            <ScrollAndSwapText
              key={index}
              offset={[`0 0.42`, `0 0.62`]}
              className="font-bold tracking-tight"
              containerRef={containerRef}
            >
              {name}
            </ScrollAndSwapText>
          ))}
        </div>
      </div>
    </div>
  )
}
