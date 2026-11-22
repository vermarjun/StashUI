import ChangeablePricingSection, {
  type Plan,
} from "./changeable-pricing-section";

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For solo makers shipping their first product.",
    priceMonthly: "$12",
    priceYearly: "$9",
    featuresLabel: "Everything to get going",
    features: [
      { text: "Up to 3 projects" },
      { text: "5 GB asset storage" },
      { text: "Community support", hasInfo: true },
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "Shared workspaces and reviews for small teams.",
    priceMonthly: "$29",
    priceYearly: "$24",
    badge: "Popular",
    featuresLabel: "Everything in Starter, plus",
    features: [
      { text: "Unlimited projects" },
      { text: "Roles and permissions", hasInfo: true },
      { text: "Version history for 90 days" },
      { text: "Priority email support" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "SSO, audit logs and a dedicated success manager.",
    priceMonthly: "$79",
    priceYearly: "$64",
    featuresLabel: "Everything in Team, plus",
    features: [
      { text: "SAML single sign-on" },
      { text: "Audit log export", hasInfo: true },
      { text: "99.99% uptime SLA" },
    ],
  },
];

export default function ChangeablePricingSectionDemo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <ChangeablePricingSection plans={plans} defaultPlanId="team" />
    </div>
  );
}
