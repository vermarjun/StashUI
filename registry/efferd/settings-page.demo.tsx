import { SettingsPage } from "./settings-page";

export default function SettingsPageDemo() {
	return (
		<div className="min-h-full w-full bg-background p-6 md:p-10">
			<div className="mx-auto flex max-w-6xl flex-col gap-6">
				<div className="flex flex-col gap-1">
					<h1 className="font-semibold text-2xl tracking-tight">Account settings</h1>
					<p className="text-muted-foreground text-sm">
						Manage your profile, notifications and security.
					</p>
				</div>
				<SettingsPage />
			</div>
		</div>
	);
}
