import { AppShell } from "./app-shell";

const stats = [
	{ label: "Open conversations", value: "128", note: "+12 since 9am" },
	{ label: "First response", value: "4m 12s", note: "-38s vs last week" },
	{ label: "CSAT", value: "94%", note: "412 ratings" },
	{ label: "Resolved today", value: "312", note: "Best day this month" },
];

const queue = [
	{ name: "Priya Raman", subject: "Invoice shows the old VAT number", age: "2m" },
	{ name: "Lucas Moreau", subject: "Webhook retries stopped on Friday", age: "9m" },
	{ name: "Hana Sato", subject: "Can we add a second admin seat?", age: "14m" },
	{ name: "Diego Alvarez", subject: "SSO login loops back to the start", age: "21m" },
];

export default function AppShellDemo() {
	return (
		<AppShell pathname="#/overview">
			<div className="flex flex-col gap-1">
				<h1 className="font-semibold text-xl">Good morning, Maya</h1>
				<p className="text-muted-foreground text-sm">
					Here is what is waiting in your queue today.
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{stats.map((s) => (
					<div className="flex flex-col gap-1 rounded-lg border bg-card p-4" key={s.label}>
						<span className="text-muted-foreground text-xs">{s.label}</span>
						<span className="font-mono font-semibold text-2xl tabular-nums">{s.value}</span>
						<span className="text-muted-foreground text-xs">{s.note}</span>
					</div>
				))}
			</div>
			<div className="rounded-lg border bg-card">
				<div className="border-b px-4 py-3 font-medium text-sm">Needs a reply</div>
				<ul className="divide-y">
					{queue.map((q) => (
						<li className="flex items-center justify-between gap-4 px-4 py-3 text-sm" key={q.name}>
							<div className="min-w-0">
								<p className="font-medium">{q.name}</p>
								<p className="truncate text-muted-foreground text-xs">{q.subject}</p>
							</div>
							<span className="shrink-0 text-muted-foreground text-xs tabular-nums">{q.age}</span>
						</li>
					))}
				</ul>
			</div>
		</AppShell>
	);
}
