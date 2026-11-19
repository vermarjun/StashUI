"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/registry/aceternity-ui/animated-modal";

const photos = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop&auto=format&q=80",
];

export default function Demo() {
  return (
    <div className="flex min-h-[480px] items-center justify-center p-8">
      <Modal>
        <ModalTrigger className="group/modal-btn flex justify-center bg-foreground px-6 py-3 text-base font-medium text-background">
          <span className="text-center transition duration-500 group-hover/modal-btn:translate-x-40">
            Book your flight
          </span>
          <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-2xl transition duration-500 group-hover/modal-btn:translate-x-0">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              Your summer escape, booked ✈️
            </h2>
            <div className="flex items-center justify-center">
              {photos.map((src, i) => (
                <div
                  key={src}
                  className="-mr-4 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-1"
                  style={{ transform: `rotate(${[-6, 4, -3, 7][i]}deg)` }}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-lg object-cover md:h-36 md:w-36"
                  />
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 grid max-w-sm grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span>✈️ Flights from 6 cities</span>
              <span>🏨 12 hand-picked stays</span>
              <span>🗓 7 nights, Mar 14 – 21</span>
              <span>🌴 Free airport transfer</span>
            </div>
          </ModalContent>
          <ModalFooter className="gap-3">
            <button className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted">
              Cancel
            </button>
            <button className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
              Book now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
