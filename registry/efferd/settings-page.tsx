"use client";

import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import {
	AtSignIcon,
	MonitorCogIcon,
	MoonStarIcon,
	SunIcon,
	UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "./settings-page-field";

/* ---- dashboard-card ---- */
export function DashboardCard({
	className,
	...props
}: React.ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn("rounded-none bg-background shadow-none ring-0", className)}
			{...props}
		/>
	);
}

/* ---- settings-section ---- */
export function SettingsSection({
	title,
	description,
	children,
	...props
}: Omit<React.ComponentProps<typeof DashboardCard>, "title"> & {
	title: string;
	description: string;
}) {
	return (
		<DashboardCard {...props}>
			<CardHeader className="gap-0 border-b">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pt-(--card-spacing)">
				<FieldGroup className="gap-5">{children}</FieldGroup>
			</CardContent>
		</DashboardCard>
	);
}

/* ---- settings-field ---- */
export function SettingField({
	label,
	description,
	htmlFor,
	children,
	className,
	...props
}: React.ComponentProps<typeof Field> & {
	label: string;
	description: string;
	htmlFor: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Field
			className={cn(
				"@md/field-group:has-[>[data-slot=field-content]]:items-center",
				className
			)}
			orientation="responsive"
			{...props}
		>
			<FieldContent>
				<FieldLabel className="font-normal" htmlFor={htmlFor}>
					{label}
				</FieldLabel>
				<FieldDescription className="text-xs">{description}</FieldDescription>
			</FieldContent>
			{children}
		</Field>
	);
}

/* ---- profile-settings ---- */
const defaultSrc = "https://i.pravatar.cc/150?img=47";

export function ProfileSettings() {
	return (
		<SettingsSection
			className="lg:col-span-2"
			description="How you appear to teammates."
			title="Profile"
		>
			<SettingField
				description="Click to upload a square image, at least 256px."
				htmlFor="avatar"
				label="Avatar"
				orientation="horizontal"
			>
				<div className="flex shrink-0">
					<SettingsAvatar />
				</div>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Used in comments, invoices, and the sidebar."
				htmlFor="display-name"
				label="Display name"
			>
				<InputGroup>
					<InputGroupAddon>
						<UserIcon
							aria-hidden
							className="size-4"
						/>
					</InputGroupAddon>
					<InputGroupInput
						autoComplete="name"
						defaultValue="Maya Chen"
						id="display-name"
					/>
				</InputGroup>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Sign-in and billing receipts go here."
				htmlFor="email"
				label="Email"
			>
				<InputGroup>
					<InputGroupAddon>
						<AtSignIcon
							aria-hidden
							className="size-4"
						/>
					</InputGroupAddon>
					<InputGroupInput
						autoComplete="email"
						defaultValue="maya@relay.app"
						id="email"
						type="email"
					/>
				</InputGroup>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Your public profile link."
				htmlFor="slug"
				label="Slug"
			>
				<InputGroup>
					<InputGroupAddon>
						<InputGroupText>relay.app/</InputGroupText>
					</InputGroupAddon>
					<InputGroupInput
						autoComplete="slug"
						defaultValue="maya"
						id="slug"
					/>
				</InputGroup>
			</SettingField>
		</SettingsSection>
	);
}

function SettingsAvatar() {
	const [src, setSrc] = useState(defaultSrc);

	useEffect(() => {
		if (!src.startsWith("blob:")) {
			return;
		}
		return () => URL.revokeObjectURL(src);
	}, [src]);

	return (
		<label className="group/avatar relative inline-flex cursor-pointer rounded-full outline-none focus-within:ring-3 focus-within:ring-ring/50">
			<input
				accept="image/*"
				aria-label="Change photo"
				className="sr-only"
				id="avatar"
				onChange={(event) => {
					const file = event.target.files?.[0];
					if (!file) {
						return;
					}
					setSrc(URL.createObjectURL(file));
				}}
				type="file"
			/>
			<Avatar className="size-12 hover:opacity-50">
				<AvatarImage alt="" src={src} />
				<AvatarFallback>MC</AvatarFallback>
			</Avatar>
		</label>
	);
}

/* ---- notification-settings ---- */
const notifications = [
	{
		id: "product-updates",
		label: "Product updates",
		description: "New features and release notes.",
		defaultChecked: true,
	},
	{
		id: "weekly-digest",
		label: "Weekly digest",
		description: "A Monday summary of activity.",
		defaultChecked: true,
	},
	{
		id: "mentions",
		label: "Mentions",
		description: "When someone @mentions you.",
		defaultChecked: true,
	},
	{
		id: "billing-alerts",
		label: "Billing alerts",
		description: "Failed payments and renewals.",
		defaultChecked: false,
	},
] as const;

export function NotificationSettings() {
	return (
		<SettingsSection
			description="Choose what we email you."
			title="Notifications"
		>
			{notifications.map((item, index) => (
				<Fragment key={item.id}>
					{index > 0 && <FieldSeparator />}
					<SettingField
						description={item.description}
						htmlFor={item.id}
						label={item.label}
						orientation="horizontal"
					>
						<Switch defaultChecked={item.defaultChecked} id={item.id} />
					</SettingField>
				</Fragment>
			))}
		</SettingsSection>
	);
}

/* ---- appearance-settings ---- */
const themeOptions = [
	{
		value: "light",
		label: "Light",
		icon: (
			<SunIcon
				aria-hidden
				className="text-muted-foreground"
			/>
		),
	},
	{
		value: "dark",
		label: "Dark",
		icon: (
			<MoonStarIcon
				aria-hidden
				className="text-muted-foreground"
			/>
		),
	},
	{
		value: "system",
		label: "System",
		icon: (
			<MonitorCogIcon
				aria-hidden
				className="text-muted-foreground"
			/>
		),
	},
] as const;

const languages = [
	{ value: "en", label: "English" },
	{ value: "de", label: "Deutsch" },
	{ value: "fr", label: "Français" },
	{ value: "ja", label: "日本語" },
] as const;

export function AppearanceSettings() {
	return (
		<SettingsSection
			description="Customize how Relay looks for you."
			title="Appearance"
		>
			<SettingField
				description="Match your system or pick one."
				htmlFor="theme"
				label="Theme"
			>
				<ToggleGroup
					aria-label="Theme"
					defaultValue="system"
					id="theme"
					type="single"
					variant="outline"
				>
					{themeOptions.map((option) => (
						<ToggleGroupItem key={option.value} value={option.value}>
							<span className="flex items-center gap-1.5">
								{option.icon}
								{option.label}
							</span>
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Used across the interface."
				htmlFor="language"
				label="Language"
			>
				<Select defaultValue="en">
					<SelectTrigger id="language">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Languages</SelectLabel>
							{languages.map((language) => (
								<SelectItem key={language.value} value={language.value}>
									{language.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Tighter spacing in tables and lists."
				htmlFor="compact-mode"
				label="Compact mode"
				orientation="horizontal"
			>
				<Switch id="compact-mode" />
			</SettingField>
		</SettingsSection>
	);
}

/* ---- security-settings ---- */
export function SecuritySettings() {
	return (
		<SettingsSection description="Keep your account safe." title="Security">
			<SettingField
				description="Require a code when signing in."
				htmlFor="two-factor"
				label="Two-factor auth"
				orientation="horizontal"
			>
				<Switch defaultChecked id="two-factor" />
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Last changed 3 months ago."
				htmlFor="change-password"
				label="Password"
				orientation="horizontal"
			>
				<Button id="change-password" size="sm" type="button" variant="outline">
					Change
				</Button>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Signed in on 3 devices."
				htmlFor="sign-out-sessions"
				label="Sessions"
				orientation="horizontal"
			>
				<Button
					id="sign-out-sessions"
					size="sm"
					type="button"
					variant="outline"
				>
					Sign out all
				</Button>
			</SettingField>
		</SettingsSection>
	);
}

/* ---- danger-settings ---- */
export function DangerSettings() {
	return (
		<SettingsSection
			description="Irreversible and destructive actions."
			title="Danger zone"
		>
			<SettingField
				description="Download a copy of your data."
				htmlFor="export-data"
				label="Export data"
				orientation="horizontal"
			>
				<Button id="export-data" size="sm" type="button" variant="outline">
					Export
				</Button>
			</SettingField>
			<FieldSeparator />
			<SettingField
				description="Remove your account and all its data."
				htmlFor="delete-account"
				label="Delete account"
				orientation="horizontal"
			>
				<Button
					id="delete-account"
					size="sm"
					type="button"
					variant="destructive"
				>
					Delete
				</Button>
			</SettingField>
		</SettingsSection>
	);
}

/* ---- settings ---- */
export function SettingsPage() {
	return (
		<div className="overflow-hidden border">
			<div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
				<ProfileSettings />
				<NotificationSettings />
				<AppearanceSettings />
				<SecuritySettings />
				<DangerSettings />
				<div className="flex flex-col gap-3 bg-background px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:col-span-3">
					<p className="text-muted-foreground text-sm">
						Changes apply to your account only.
					</p>
					<div className="flex gap-2">
						<Button type="button" variant="outline">
							Cancel
						</Button>
						<Button type="button">Save changes</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
