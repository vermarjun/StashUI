import { ContactSection } from "./contact-section";

export default function ContactSectionDemo() {
	// zoom keeps the whole card (header, contact rows and form) inside an
	// 8:5 stage without scrolling.
	return (
		<div className="flex w-full justify-center bg-background px-4 py-4 text-foreground">
			<div className="w-full max-w-lg" style={{ zoom: 0.86 }}>
				<ContactSection />
			</div>
		</div>
	);
}
