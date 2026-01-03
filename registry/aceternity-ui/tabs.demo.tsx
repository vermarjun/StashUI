"use client";

import { Tabs } from "@/registry/aceternity-ui/tabs";

export default function Demo() {
  const tabs = [
    {
      title: "Design",
      value: "design",
      content: (
        <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Design Tab</h3>
          <p className="text-purple-100 text-sm">
            Beautiful UI components crafted for modern web apps.
          </p>
        </div>
      ),
    },
    {
      title: "Development",
      value: "development",
      content: (
        <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Development Tab</h3>
          <p className="text-blue-100 text-sm">
            Ship features faster with reusable, composable code.
          </p>
        </div>
      ),
    },
    {
      title: "Analytics",
      value: "analytics",
      content: (
        <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Analytics Tab</h3>
          <p className="text-green-100 text-sm">
            Track performance and gain insights from your data.
          </p>
        </div>
      ),
    },
    {
      title: "Settings",
      value: "settings",
      content: (
        <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Settings Tab</h3>
          <p className="text-orange-100 text-sm">
            Configure your workspace to fit your needs.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8" style={{ height: "300px" }}>
      <Tabs tabs={tabs} />
    </div>
  );
}
