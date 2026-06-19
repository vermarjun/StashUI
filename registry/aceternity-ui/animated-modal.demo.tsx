"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/registry/aceternity-ui/animated-modal";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Modal>
        <ModalTrigger className="rounded-lg border border-border bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity">
          Open Modal
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h2 className="text-xl font-bold text-foreground">
              Spring 3D Modal
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              This modal animates in with a spring-driven 3D flip effect built on
              Framer Motion. Click outside or press Escape to dismiss.
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              The overlay blurs the background and prevents scroll while the
              modal is open.
            </p>
          </ModalContent>
          <ModalFooter>
            <button className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">
              Cancel
            </button>
            <button className="ml-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity">
              Confirm
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
