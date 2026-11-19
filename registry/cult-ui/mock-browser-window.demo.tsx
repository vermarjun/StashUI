import { BrowserWindow } from "@/registry/cult-ui/mock-browser-window";

const bars = [42, 68, 55, 80, 62, 91, 74, 88, 66, 95, 78, 84];

export default function Demo() {
  return (
    <div className="w-full max-w-4xl p-6">
      <BrowserWindow
        size="lg"
        variant="chrome"
        headerStyle="full"
        url="https://app.stashui.dev/dashboard"
        showSidebar
        sidebarItems={[
          { label: "Overview", active: true },
          { label: "Analytics", badge: 3 },
          { label: "Customers" },
          { label: "Billing" },
          { label: "Settings" },
        ]}
        className="w-full"
      >
        <div className="flex h-full flex-col gap-4 p-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Revenue", "$48.2k", "+12.4%"],
              ["Active users", "3,912", "+5.1%"],
              ["Churn", "1.8%", "-0.3%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
                <p className="text-xs text-emerald-500">{delta}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-2 rounded-lg border border-border bg-muted/20 p-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-foreground/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </BrowserWindow>
    </div>
  );
}
