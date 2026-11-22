"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
	ActivityIcon,
	BarChart3Icon,
	BellIcon,
	ChevronRightIcon,
	CommandIcon,
	CreditCardIcon,
	GraduationCapIcon,
	HelpCircleIcon,
	LayoutGridIcon,
	LifeBuoyIcon,
	ListChecksIcon,
	LogOutIcon,
	MessageSquareTextIcon,
	PlugIcon,
	PlusIcon,
	SearchIcon,
	SendIcon,
	Settings2Icon,
	SettingsIcon,
	UserIcon,
	UsersIcon,
	XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "./app-shell-kbd";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
} from "./app-shell-sidebar";

/* ----------------------------------------------------------------------------
 * Navigation data
 * --------------------------------------------------------------------------*/

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label?: string;
	items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
	{
		items: [{ title: "Overview", path: "#/overview", icon: <LayoutGridIcon /> }],
	},
	{
		label: "Today",
		items: [
			{ title: "Queue", path: "#/queue", icon: <ListChecksIcon /> },
			{
				title: "Team insights",
				path: "#/team-insights",
				icon: <BarChart3Icon />,
			},
		],
	},
	{
		label: "Inbox",
		items: [
			{
				title: "Conversations",
				icon: <MessageSquareTextIcon />,
				subItems: [
					{ title: "Unassigned", path: "#/inbox/unassigned" },
					{ title: "Assigned to me", path: "#/inbox/assigned" },
					{ title: "Recently closed", path: "#/inbox/closed" },
				],
			},
			{ title: "Customers", path: "#/customers", icon: <UsersIcon /> },
			{ title: "Channels", path: "#/channels", icon: <PlugIcon /> },
		],
	},
	{
		label: "Organization",
		items: [
			{
				title: "Workspace",
				icon: <SettingsIcon />,
				subItems: [
					{ title: "Branding", path: "#/workspace/branding" },
					{ title: "Team & roles", path: "#/workspace/team" },
					{ title: "API keys", path: "#/workspace/api-keys" },
					{ title: "Webhooks", path: "#/workspace/webhooks" },
					{ title: "Billing", path: "#/workspace/billing" },
				],
			},
			{ title: "Settings", path: "#/settings", icon: <Settings2Icon /> },
		],
	},
];

export const footerNavLinks: SidebarNavItem[] = [
	{ title: "Help Center", path: "#/help", icon: <HelpCircleIcon /> },
	{ title: "System status", path: "#/status", icon: <ActivityIcon /> },
];

export const navLinks: SidebarNavItem[] = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item]
		)
	),
	...footerNavLinks,
];

const user = {
	name: "Maya Chen",
	email: "maya@relay.app",
	avatar: "https://i.pravatar.cc/150?img=47",
};

/* ----------------------------------------------------------------------------
 * Shell
 * --------------------------------------------------------------------------*/

export function AppShell({
	children,
	pathname = "#/overview",
}: {
	children: React.ReactNode;
	pathname?: string;
}) {
	return (
		<div className="overflow-hidden">
			<SidebarProvider className="relative h-svh">
				<AppSidebar pathname={pathname} />
				<SidebarInset className="md:peer-data-[variant=inset]:ml-0">
					<AppHeader pathname={pathname} />
					<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
						{children}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}

export function AppHeader({ pathname }: { pathname?: string }) {
	const activeItem = navLinks.find((item) => item.path === pathname);
	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6"
			)}
		>
			<div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
					className="mr-2 h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<AppBreadcrumbs page={activeItem} />
			</div>
			<div className="flex items-center gap-3">
				<Button aria-label="Send" size="icon-sm" variant="outline">
					<SendIcon />
				</Button>
				<Button aria-label="Notifications" size="icon-sm" variant="outline">
					<BellIcon />
				</Button>
				<Separator
					className="h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<NavUser />
			</div>
		</header>
	);
}

export function AppSidebar({ pathname }: { pathname?: string }) {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton asChild>
					<a href="#link">
						<LogoIcon />
						<span className="font-medium">Relay</span>
					</a>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
							tooltip="Quick Create"
						>
							<PlusIcon />
							<span>New Conversation</span>
						</SidebarMenuButton>
						<Button
							aria-label="Search conversations"
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							size="icon"
							variant="outline"
						>
							<SearchIcon />
							<span className="sr-only">Search conversations</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>
				{navGroups.map((group, index) => (
					<NavGroup
						key={`sidebar-group-${index}`}
						{...group}
						pathname={pathname}
					/>
				))}
			</SidebarContent>
			<SidebarFooter>
				<LatestChange />
				<SidebarMenu className="mt-2">
					{footerNavLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								className="text-muted-foreground"
								isActive={item.path === pathname}
								size="sm"
							>
								<a href={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

export function NavGroup({
	label,
	items,
	pathname,
}: SidebarNavGroup & { pathname?: string }) {
	return (
		<SidebarGroup>
			{label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						asChild
						className="group/collapsible"
						defaultOpen={
							item.path === pathname ||
							item.subItems?.some((subItem) => subItem.path === pathname)
						}
						key={item.title}
					>
						<SidebarMenuItem>
							{item.subItems?.length ? (
								<>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton isActive={item.path === pathname}>
											{item.icon}
											<span>{item.title}</span>
											<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.subItems?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton
														asChild
														isActive={subItem.path === pathname}
													>
														<a href={subItem.path}>
															{subItem.icon}
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</>
							) : (
								<SidebarMenuButton asChild isActive={item.path === pathname}>
									<a href={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

/** Current page segment shown in the header: pass a nav item or `{ title, icon? }`. */
export type AppBreadcrumbPage = {
	title: string;
	icon?: ReactNode;
};

export function AppBreadcrumbs({ page }: { page?: AppBreadcrumbPage | null }) {
	if (!page?.title) {
		return null;
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbPage className="flex items-center gap-2 [&>svg]:size-3.5">
						{page.icon}
						{page.title}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export function CustomSidebarTrigger() {
	return (
		<Tooltip delayDuration={1000}>
			<TooltipTrigger asChild>
				<SidebarTrigger />
			</TooltipTrigger>
			<TooltipContent className="px-2 py-1" side="right">
				Toggle Sidebar{" "}
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>b</Kbd>
				</KbdGroup>
			</TooltipContent>
		</Tooltip>
	);
}

const latestChange = {
	badge: "NEW",
	title: "Smarter queue triage",
	description: "One-click triage for your queue.",
	readMore: { href: "#", label: "Release notes" },
} as const;

export function LatestChange() {
	const [isOpen, setIsOpen] = useState(true);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={cn(
				"rounded-lg group/latest-change size-full min-h-27 justify-center border bg-background",
				"relative flex size-full flex-col gap-1 overflow-hidden px-4 pt-3 pb-1 *:text-nowrap",
				"transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0"
			)}
		>
			<span className="font-light font-mono text-[10px] text-muted-foreground">
				{latestChange.badge}
			</span>
			<p className="font-heading font-medium text-xs">{latestChange.title}</p>
			<span className="text-[10px] text-muted-foreground">
				{latestChange.description}
			</span>
			<Button
				asChild
				className="w-max px-0 font-light text-xs"
				size="sm"
				variant="link"
			>
				<a href={latestChange.readMore.href}>{latestChange.readMore.label}</a>
			</Button>
			<Button
				aria-label="Dismiss"
				className="absolute top-2 right-2 z-10 size-6 rounded-full opacity-0 transition-opacity group-hover/latest-change:opacity-100"
				onClick={() => setIsOpen(false)}
				size="icon-sm"
				variant="ghost"
			>
				<XIcon className="size-3.5 text-muted-foreground" />
			</Button>
		</div>
	);
}

export function NavUser() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="size-8">
					<AvatarImage src={user.avatar} />
					<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuGroup>
					<DropdownMenuLabel className="pointer-events-none flex items-center gap-2">
						<Avatar className="isolate size-8">
							<AvatarImage src={user.avatar} />
							<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<span className="font-medium text-foreground">{user.name}</span>{" "}
							<br />
							<div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-xs">
								{user.email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon />
						Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BellIcon />
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CommandIcon />
						Keyboard shortcuts
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<LifeBuoyIcon />
						Help center
					</DropdownMenuItem>
					<DropdownMenuItem>
						<GraduationCapIcon />
						Agent training
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<CreditCardIcon />
						Subscription
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem variant="destructive">
						<LogOutIcon />
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function DashboardSkeleton() {
	return (
		<div className="flex flex-1 flex-col gap-4">
			<div
				className={cn(
					"grid grid-cols-2 gap-4 lg:grid-cols-4",
					"*:min-h-48 *:w-full *:bg-muted *:dark:bg-muted/50"
				)}
			>
				<div className="rounded-lg" />
				<div className="rounded-lg" />
				<div className="rounded-lg" />
				<div className="rounded-lg" />
				<div className="rounded-lg col-span-2 min-h-114! lg:col-span-4" />
				<div className="rounded-lg col-span-2 min-h-92! lg:col-span-2" />
				<div className="rounded-lg col-span-2 min-h-92! lg:col-span-2" />
			</div>
		</div>
	);
}

/** Neutral placeholder mark: two stacked rounded squares. */
export const LogoIcon = (props: React.ComponentProps<"svg">) => (
	<svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
		<rect height="13" opacity="0.45" rx="3.5" width="13" x="2" y="2" />
		<rect height="13" rx="3.5" width="13" x="9" y="9" />
	</svg>
);

export default AppShell;
