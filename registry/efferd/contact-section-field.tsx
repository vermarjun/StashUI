import type * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Minimal shadcn/ui Field primitives, inlined so the block installs self-contained.
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("group/field-group flex w-full flex-col gap-6", className)}
			data-slot="field-group"
			{...props}
		/>
	);
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("group/field flex w-full flex-col gap-2.5", className)}
			data-slot="field"
			role="group"
			{...props}
		/>
	);
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
	return (
		<Label
			className={cn("w-fit leading-snug", className)}
			data-slot="field-label"
			{...props}
		/>
	);
}

export { Field, FieldGroup, FieldLabel };
