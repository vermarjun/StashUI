"use client";

import TearTicket from "./tear-ticket";

export default function TearTicketDemo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center bg-background p-8">
      <TearTicket
        width={480}
        height={240}
        stubSize={130}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
        imageAlt="Mountain range at dawn"
        scrim
        ariaLabel="Tear off the stub to check in"
        stub={
          <div className="flex h-full flex-col items-center justify-center gap-1 px-3 text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Seat</span>
            <span className="font-mono text-3xl font-semibold">14C</span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Gate B7</span>
          </div>
        }
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] opacity-70">Alpine Express · Day pass</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">Zermatt → Gornergrat</h3>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Departs</p>
              <p className="font-medium">08:24</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Date</p>
              <p className="font-medium">Sat, 14 Mar</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Passenger</p>
              <p className="font-medium">Maya Chen</p>
            </div>
          </div>
        </div>
      </TearTicket>
    </div>
  );
}
