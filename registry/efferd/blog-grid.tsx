import { cn } from "@/lib/utils";
import { FullWidthDivider } from "./blog-grid-divider";
import { LazyImage } from "./blog-grid-image";

type BlogType = {
	title: string;
	href: string;
	description: string;
	author: string;
	createdAt: string;
	readTime: string;
	image: string;
};

const blogs: BlogType[] = [
	{
		title: "Design Systems That Scale",
		href: "#",
		description:
			"Learn how to build and maintain scalable design systems that empower teams to move faster while staying consistent.",
		image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
		createdAt: "2025-08-25",
		author: "Ava Mitchell",
		readTime: "7 min read",
	},
	{
		title: "The Psychology of Color in UI",
		href: "#",
		description:
			"Explore how different colors influence user perception, emotion, and conversion in digital product design.",
		image: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?w=800&q=80",
		createdAt: "2025-07-14",
		author: "Liam Carter",
		readTime: "5 min read",
	},
	{
		title: "Microinteractions That Delight",
		href: "#",
		description:
			"Discover how subtle animations and interactions can enhance usability and bring joy to your users.",
		image: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=800&q=80",
		createdAt: "2025-06-30",
		author: "Sophia Kim",
		readTime: "6 min read",
	},
	{
		title: "Accessibility Beyond Compliance",
		href: "#",
		description:
			"Practical steps to make your UI accessible, not just legally compliant, but genuinely inclusive for everyone.",
		image: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=800&q=80",
		createdAt: "2025-06-18",
		author: "Ethan Rodriguez",
		readTime: "8 min read",
	},
	{
		title: "Dark Mode Done Right",
		href: "#",
		description:
			"Tips and tricks to design beautiful and functional dark mode experiences that users will love.",
		image: "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=800&q=80",
		createdAt: "2025-05-20",
		author: "Maya Chen",
		readTime: "4 min read",
	},
	{
		title: "Typography That Speaks",
		href: "#",
		description:
			"How to select and pair typefaces that enhance readability, hierarchy, and brand personality.",
		image: "https://images.unsplash.com/photo-1761775915848-467e41c1c4db?w=800&q=80",
		createdAt: "2025-05-02",
		author: "Noah Patel",
		readTime: "9 min read",
	},
	{
		title: "The Future of UI Animation",
		href: "#",
		description:
			"From motion guidelines to advanced prototyping: discover where UI animation is headed in 2025.",
		image: "https://images.unsplash.com/photo-1760389005000-bf02bf24f463?w=800&q=80",
		createdAt: "2025-04-15",
		author: "Chloe Ramirez",
		readTime: "10 min read",
	},
	{
		title: "Minimalism vs Maximalism",
		href: "#",
		description:
			"A deep dive into two opposing design philosophies and how to decide which fits your product.",
		image: "https://images.unsplash.com/photo-1761882835101-02ab45ac0726?w=800&q=80",
		createdAt: "2025-04-01",
		author: "Benjamin Scott",
		readTime: "6 min read",
	},
	{
		title: "Designing for Mobile-First",
		href: "#",
		description:
			"Best practices for mobile-first design, from layout decisions to performance optimization.",
		image: "https://images.unsplash.com/photo-1761078980679-e89e25fe279b?w=800&q=80",
		createdAt: "2025-03-22",
		author: "Isabella White",
		readTime: "7 min read",
	},
	{
		title: "Figma Hacks for Power Users",
		href: "#",
		description:
			"Hidden features, shortcuts, and workflows in Figma that can dramatically speed up your design process.",
		image: "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=800&q=80",
		createdAt: "2025-03-09",
		author: "James Walker",
		readTime: "5 min read",
	},
	{
		title: "Designing With AI Tools",
		href: "#",
		description:
			"A practical look at how AI tools are shaping UI/UX workflows: from ideation to final delivery.",
		image: "https://images.unsplash.com/photo-1754968230523-052635c98f99?w=800&q=80",
		createdAt: "2025-02-28",
		author: "Olivia Brooks",
		readTime: "8 min read",
	},
	{
		title: "The Art of Prototyping",
		href: "#",
		description:
			"How to create prototypes that effectively communicate your ideas and speed up stakeholder feedback.",
		image: "https://images.unsplash.com/photo-1618220649687-ba860f3176e7?w=800&q=80",
		createdAt: "2025-02-14",
		author: "Daniel Green",
		readTime: "6 min read",
	},
];

export function BlogsSection() {
	return (
		<div className="mx-auto w-full max-w-5xl grow">
			<div className="space-y-1 px-4 py-8 md:px-6">
				<h1 className="font-heading font-semibold text-2xl tracking-wide md:text-4xl">
					From the journal
				</h1>
				<p className="text-muted-foreground text-sm md:text-base">
					Discover the latest trends and insights in the world of design and
					technology.
				</p>
			</div>
			<FullWidthDivider contained={true} />
			<div className="z-10 grid p-4 md:grid-cols-2 lg:grid-cols-3">
				{blogs.map((blog) => (
					<BlogCard {...blog} key={blog.title} />
				))}
			</div>
		</div>
	);
}

function BlogCard({
	title,
	description,
	createdAt,
	readTime,
	image,
	author,
	className,
	...props
}: React.ComponentProps<"a"> & BlogType) {
	return (
		<a
			className={cn(
				"rounded-lg group flex flex-col gap-2 p-3 hover:bg-muted/50 active:bg-muted",
				className
			)}
			key={title}
			{...props}
		>
			<LazyImage
				alt={title}
				className="transition-all duration-500 group-hover:scale-105"
				containerClassName="cn-rounded shadow-md outline outline-offset-3 outline-border/50"
				
				inView={true}
				ratio={16 / 9}
				src={image}
			/>
			<div className="space-y-2 px-2 pb-2">
				<div className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-foreground sm:text-xs">
					<p>by {author}</p>
					<div className="size-1 rounded-full bg-muted-foreground" />
					<p>{createdAt}</p>
					<div className="size-1 rounded-full bg-muted-foreground" />
					<p>{readTime}</p>
				</div>
				<h2 className="line-clamp-2 font-heading font-semibold text-lg">{title}</h2>
				<p className="line-clamp-3 text-muted-foreground text-sm group-active:text-foreground">
					{description}
				</p>
			</div>
		</a>
	);
}
