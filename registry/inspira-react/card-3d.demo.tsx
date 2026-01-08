"use client";

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/registry/inspira-react/card-3d";

export default function Card3DDemo() {
  return (
    <div className="flex items-center justify-center p-16">
      <CardContainer>
        <CardBody className="relative h-80 w-72 rounded-xl border border-border bg-card p-6 shadow-lg">
          {/* Title floats forward */}
          <CardItem translateZ={50} className="text-xl font-bold text-card-foreground">
            3D Tilt Card
          </CardItem>

          {/* Description at mid depth */}
          <CardItem translateZ={30} className="mt-2 text-sm text-muted-foreground">
            Hover over this card to see the 3-D tilt effect. Each layer lives
            at a different depth on the Z axis.
          </CardItem>

          {/* Decorative badge floats highest */}
          <CardItem
            translateZ={80}
            className="mt-6 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Explore →
          </CardItem>

          {/* Background image element stays shallow */}
          <CardItem
            translateZ={10}
            className="absolute bottom-6 right-6 size-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-30 blur-xl"
          />
        </CardBody>
      </CardContainer>
    </div>
  );
}
