import { WebAnalyticsDashboard } from "./web-analytics-dashboard";

export default function WebAnalyticsDashboardDemo() {
	return (
		<div className="min-h-full w-full bg-background p-6 md:p-8">
			<div className="mx-auto flex max-w-6xl flex-col gap-6">
				<div className="flex flex-wrap items-end justify-between gap-2">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold text-2xl tracking-tight">Web analytics</h1>
						<p className="text-muted-foreground text-sm">
							northwind.dev · last 12 months
						</p>
					</div>
					<span className="rounded-md border px-2.5 py-1 text-muted-foreground text-xs">
						Jan 1 – Dec 31, 2026
					</span>
				</div>
				<WebAnalyticsDashboard />
			</div>
		</div>
	);
}
