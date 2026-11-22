"use client";

import { useId } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delta, DeltaIcon, DeltaValue } from "./web-analytics-dashboard-delta";
import {
	ShareBarList,
	ShareBarListContent,
	ShareBarListFill,
	ShareBarListItem,
	ShareBarListLabel,
	ShareBarListValue,
} from "./web-analytics-dashboard-share-bar-list";

/* ---- formatters ---- */
const DASHBOARD_LOCALE = "en-US";

function formatCompactNumber(value: number) {
	return new Intl.NumberFormat(DASHBOARD_LOCALE, {
		maximumFractionDigits: 2,
		notation: "compact",
	}).format(value);
}

/** Whole numbers with grouping (visits, sessions, counts). */
function formatInteger(value: number) {
	return new Intl.NumberFormat(DASHBOARD_LOCALE, {
		maximumFractionDigits: 0,
	}).format(value);
}

/* ---- status indicator ---- */
const statusIndicatorVariants = cva(
	[
		"relative flex size-2 shrink-0 items-center justify-center rounded-full",
		"*:rounded-full *:bg-current",
		"[&_[data-slot=indicator-dot]]:size-[75%]",
		"[&_[data-slot=indicator-ping]]:absolute [&_[data-slot=indicator-ping]]:size-full",
	],
	{
		variants: {
			color: {
				emerald: "text-emerald-500",
				rose: "text-rose-500",
				amber: "text-amber-500",
				sky: "text-sky-500",
			},
			pulse: {
				true: "[&_[data-slot=indicator-ping]]:animate-ping",
				false: "[&_[data-slot=indicator-ping]]:hidden",
			},
		},
		defaultVariants: {
			color: "emerald",
			pulse: true,
		},
	}
);

type StatusIndicatorProps = ComponentProps<"span"> &
	VariantProps<typeof statusIndicatorVariants>;

function StatusIndicator({
	className,
	color,
	pulse,
	...props
}: StatusIndicatorProps) {
	return (
		<span
			className={cn(statusIndicatorVariants({ color, pulse }), className)}
			{...props}
		>
			<span aria-hidden data-slot="indicator-ping" />
			<span aria-hidden data-slot="indicator-dot" />
		</span>
	);
}

/* ---- visitors-chart ---- */
const chartData = [
	{ month: "January", visitors: 555 },
	{ month: "February", visitors: 904 },
	{ month: "March", visitors: 727 },
	{ month: "April", visitors: 801 },
	{ month: "May", visitors: 942 },
	{ month: "June", visitors: 1048 },
	{ month: "July", visitors: 702 },
	{ month: "August", visitors: 1103 },
	{ month: "September", visitors: 879 },
	{ month: "October", visitors: 1046 },
	{ month: "November", visitors: 1407 },
	{ month: "December", visitors: 548 },
];

const totalVisitors = chartData.reduce((sum, row) => sum + row.visitors, 0);

const chartConfig = {
	visitors: {
		label: "Visitors",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function VisitorsChart() {
	const gradientId = `visitors-area-${useId().replace(/:/g, "")}`;

	return (
		<Card className="md:col-span-2 lg:col-span-3 dark:bg-transparent">
			<CardHeader className="flex flex-row items-start justify-between">
				<div className="flex flex-col gap-1.5">
					<CardTitle className="font-mono text-2xl tabular-nums">
						{formatInteger(totalVisitors)}
					</CardTitle>
					<CardDescription className="text-pretty">
						Total visitors in the last 12 months.
					</CardDescription>
				</div>
				<Delta value={7.2} variant="badge">
					<DeltaIcon variant="trend" />
					<DeltaValue suffix="%" />
					<span>vs prior 12 months</span>
				</Delta>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="aspect-auto h-60 w-full"
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<defs>
							<linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
								<stop
									offset="0%"
									stopColor="var(--color-visitors)"
									stopOpacity={0.35}
								/>
								<stop
									offset="100%"
									stopColor="var(--color-visitors)"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							axisLine={false}
							dataKey="month"
							tickFormatter={(value) => String(value).slice(0, 3)}
							tickLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="dashed" />}
							cursor={{
								stroke: "var(--color-visitors)",
								strokeDasharray: "3 3",
								strokeLinecap: "round",
							}}
							wrapperStyle={{ outline: "none" }}
						/>
						<Area
							dataKey="visitors"
							dot={{
								fill: "var(--color-visitors)",
								r: 2.5,
								strokeWidth: 2,
							}}
							fill={`url(#${gradientId})`}
							isAnimationActive={false}
							name={chartConfig.visitors.label}
							stroke="var(--color-visitors)"
							strokeWidth={2}
							type="linear"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

/* ---- online-now ---- */
const devices = [
	{ label: "Mobile", share: 65 },
	{ label: "Desktop", share: 33 },
	{ label: "Tablet", share: 2 },
] as const;

export function OnlineNow() {
	return (
		<Card className="gap-0 pb-0 md:col-span-2 lg:col-span-1 dark:bg-transparent">
			<CardHeader className="flex flex-row items-start justify-between gap-3 border-b">
				<div className="flex min-w-0 flex-col gap-0">
					<CardTitle className="font-mono text-2xl tabular-nums">94</CardTitle>
					<CardDescription>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className={cn(
										"cursor-help px-1 py-px font-normal text-muted-foreground",
										"hover:underline-0"
									)}
									type="button"
									variant="link"
								>
									<StatusIndicator />
									<span>visitors online</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								In the last 5 minutes.
							</TooltipContent>
						</Tooltip>
					</CardDescription>
				</div>
				<Delta value={14.8} variant="badge">
					<DeltaIcon variant="trend" />
					<DeltaValue suffix="%" />
				</Delta>
			</CardHeader>
			<CardContent
				className={cn("relative flex h-full items-center px-0 py-2")}
			>
				<ShareBarList>
					{devices.map((d) => (
						<ShareBarListItem key={d.label} value={d.share}>
							<ShareBarListContent>
								<ShareBarListLabel>{d.label}</ShareBarListLabel>
								<ShareBarListValue>{d.share}%</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill data-online-bar />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}

/* ---- top-pages ---- */
const topPagesRows = [
	{ path: "/", visits: 18_420, delta: 4.1 },
	{ path: "/pricing", visits: 6280, delta: 12.4 },
	{ path: "/blog/product-updates", visits: 4110, delta: -2.0 },
	{ path: "/docs/getting-started", visits: 3920, delta: 6.8 },
	{ path: "/changelog", visits: 2150, delta: 0.4 },
] as const;

export function TopPages() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Top pages</CardTitle>
				<CardDescription className="text-pretty">
					First page in session, ranked by visits.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Top landing pages by visits with year-over-year change.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Path
							</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Visits
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Change
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topPagesRows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.path}>
								<TableCell className="max-w-[200px] truncate pl-6 font-medium">
									<span className="w-max rounded border border-border bg-muted/50 px-1 py-px text-xs">
										{row.path}
									</span>
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{formatInteger(row.visits)}
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs">
									<span className="tabular-nums">
										{row.delta > 0 ? "+" : ""}
										{row.delta}%
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>

			<div className="mask-t-from-30% absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-center bg-background">
				<Button asChild className="relative" variant="ghost">
					<a href="#">
						View All
						<ArrowRightIcon aria-hidden="true" />
					</a>
				</Button>
			</div>
		</Card>
	);
}

/* ---- top-countries ---- */

const topCountriesRows = [
	{ code: "US", visits: 6120, delta: 5.2 },
	{ code: "DE", visits: 2840, delta: 8.1 },
	{ code: "GB", visits: 1960, delta: -1.4 },
	{ code: "FR", visits: 1420, delta: 3.6 },
	{ code: "CA", visits: 1180, delta: 0.9 },
	{ code: "NL", visits: 890, delta: 12.2 },
] as const;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function flagEmoji(countryCode: string) {
	return countryCode
		.toUpperCase()
		.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export function TopCountries() {
	return (
		<Card className="relative md:col-span-2 dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Top countries</CardTitle>
				<CardDescription className="text-pretty">
					Top countries in the last 12 months.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Top countries by visits with year-over-year change.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Country
							</TableHead>
							<TableHead className="text-end tabular-nums" scope="col">
								Visits
							</TableHead>
							<TableHead className="pr-6 text-end" scope="col">
								Change
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topCountriesRows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.code}>
								<TableCell className="max-w-[220px] truncate pl-6 font-medium">
									<span className="inline-flex max-w-full items-center gap-2">
										<span aria-label={`Flag of ${row.code}`} className="text-sm leading-none" role="img">
											{flagEmoji(row.code)}
										</span>
										<span className="min-w-0 truncate text-xs">
											{regionNames.of(row.code) ?? row.code}
										</span>
									</span>
								</TableCell>
								<TableCell className="text-end text-muted-foreground text-xs tabular-nums">
									{formatInteger(row.visits)}
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs">
									<span className="tabular-nums">
										{row.delta > 0 ? "+" : ""}
										{row.delta}%
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>

			<div className="mask-t-from-30% absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-center bg-background">
				<Button asChild className="relative" variant="ghost">
					<a href="#">
						View All
						<ArrowRightIcon aria-hidden="true" />
					</a>
				</Button>
			</div>
		</Card>
	);
}

/* ---- traffic-sources-chart ---- */
const trafficSourcesData = [
	{ source: "Organic search", sessions: 4120 },
	{ source: "Direct", sessions: 2890 },
	{ source: "Referral", sessions: 1640 },
	{ source: "Paid social", sessions: 980 },
	{ source: "Email", sessions: 620 },
] as const;

const maxSessions = Math.max(...trafficSourcesData.map((d) => d.sessions));

function barWidthPercent(sessions: number) {
	if (maxSessions <= 0) {
		return 0;
	}
	return (sessions / maxSessions) * 75;
}

export function TrafficSourcesChart() {
	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Sessions by source</CardTitle>
				<CardDescription className="text-pretty">
					Attributed sessions in the last 12 months.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Sessions by traffic source">
					{trafficSourcesData.map((row) => (
						<ShareBarListItem
							key={row.source}
							value={barWidthPercent(row.sessions)}
						>
							<ShareBarListContent>
								<ShareBarListLabel>{row.source}</ShareBarListLabel>
								<ShareBarListValue>
									{formatCompactNumber(row.sessions)}
								</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}

/* ---- audience-mix ---- */
const segments = [
	{ label: "Returning visitors", share: 54 },
	{ label: "New visitors", share: 41 },
	{ label: "Logged-in users", share: 5 },
] as const;

export function AudienceMix() {
	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Audience mix</CardTitle>
				<CardDescription className="text-pretty">
					Session split by familiarity in the last 12 months.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Audience segments by share of sessions">
					{segments.map((row) => (
						<ShareBarListItem key={row.label} value={row.share}>
							<ShareBarListContent>
								<ShareBarListLabel>{row.label}</ShareBarListLabel>
								<ShareBarListValue>{row.share}%</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}

/* ---- browser-share ---- */
const browsers = [
	{ label: "Chrome", share: 58 },
	{ label: "Safari", share: 22 },
	{ label: "Edge", share: 9 },
	{ label: "Firefox", share: 7 },
	{ label: "Other", share: 4 },
] as const;

export function BrowserShare() {
	return (
		<Card className="dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Browsers</CardTitle>
				<CardDescription className="text-pretty">
					Share of sessions by primary browser family.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 py-1">
				<ShareBarList aria-label="Sessions by browser">
					{browsers.map((row) => (
						<ShareBarListItem key={row.label} value={row.share}>
							<ShareBarListContent>
								<ShareBarListLabel>{row.label}</ShareBarListLabel>
								<ShareBarListValue>{row.share}%</ShareBarListValue>
							</ShareBarListContent>
							<ShareBarListFill />
						</ShareBarListItem>
					))}
				</ShareBarList>
			</CardContent>
		</Card>
	);
}

/* ---- top-referrers ---- */
const topReferrersRows = [
	{ host: "news.ycombinator.com", sessions: 1420 },
	{ host: "t.co", sessions: 980 },
	{ host: "github.com", sessions: 760 },
	{ host: "producthunt.com", sessions: 540 },
	{ host: "reddit.com", sessions: 410 },
] as const;

export function TopReferrers() {
	return (
		<Card className="relative dark:bg-transparent">
			<CardHeader>
				<CardTitle className="text-balance">Top referrers</CardTitle>
				<CardDescription className="text-pretty">
					External sites sending the most attributed sessions.
				</CardDescription>
			</CardHeader>
			<CardContent className="mask-b-from-50% mask-b-to-100% p-0 pb-2">
				<Table className="border-t">
					<TableCaption className="sr-only">
						Top referrer domains by attributed sessions.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6" scope="col">
								Host
							</TableHead>
							<TableHead className="pr-6 text-end tabular-nums" scope="col">
								Sessions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topReferrersRows.map((row) => (
							<TableRow className="hover:bg-transparent" key={row.host}>
								<TableCell className="max-w-[220px] truncate pl-6 font-medium">
									<span className="text-xs">{row.host}</span>
								</TableCell>
								<TableCell className="pr-6 text-end text-muted-foreground text-xs tabular-nums">
									{formatInteger(row.sessions)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>

			<div className="mask-t-from-30% absolute inset-x-0 bottom-0 flex h-1/5 items-center justify-center bg-background">
				<Button asChild className="relative" variant="ghost">
					<a href="#">
						View All
						<ArrowRightIcon aria-hidden="true" />
					</a>
				</Button>
			</div>
		</Card>
	);
}

/* ---- web-vitals ---- */
const vitals = [
	{
		label: "LCP",
		name: "Largest Contentful Paint",
		value: "1.9s",
		delta: 120,
		deltaLabel: "faster vs prior month",
		suffix: "ms",
	},
	{
		label: "INP",
		name: "Interaction to Next Paint",
		value: "142ms",
		delta: 18,
		deltaLabel: "faster vs prior month",
		suffix: "ms",
	},
	{
		label: "CLS",
		name: "Cumulative Layout Shift",
		value: "0.04",
		delta: 0.07,
		deltaLabel: "lower vs prior month",
		suffix: "",
	},
] as const;

export function WebVitals() {
	return (
		<Card className="md:col-span-2 lg:col-span-4 dark:bg-transparent">
			<CardHeader className="border-b">
				<CardTitle className="text-balance">Core Web Vitals</CardTitle>
				<CardDescription className="text-pretty">
					Field experience on real sessions, measured at the origin.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="grid gap-6 sm:grid-cols-3">
					{vitals.map((v) => (
						<li className="flex flex-col gap-1" key={v.label}>
							<p className="text-pretty font-medium text-sm">{v.label}</p>
							<p className="text-pretty text-muted-foreground text-xs">
								{v.name}
							</p>
							<p className="text-balance font-semibold text-2xl tabular-nums">
								{v.value}
							</p>
							<div className="flex items-center gap-1.5 text-pretty text-muted-foreground text-xs">
								<Delta value={v.delta} variant="default">
									<DeltaIcon />
									<DeltaValue suffix={v.suffix} />
								</Delta>
								<span>{v.deltaLabel}</span>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}

/* ---- dashboard ---- */
export function WebAnalyticsDashboard({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
				className
			)}
		>
			<VisitorsChart />
			<OnlineNow />
			<TopPages />
			<TopCountries />
			<TrafficSourcesChart />
			<AudienceMix />
			<BrowserShare />
			<TopReferrers />
			<WebVitals />
		</div>
	);
}

export default WebAnalyticsDashboard;
