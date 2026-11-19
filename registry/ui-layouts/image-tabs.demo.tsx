"use client";
import {
  TabsProvider,
  TabList,
  TabItem,
  TabHeader,
  TabDes,
  TabImageContainer,
  TabImage,
} from "@/registry/ui-layouts/image-tabs";

const TABS = [
  {
    value: "design",
    title: "Design Systems",
    description:
      "A design system is a collection of reusable components guided by clear standards that teams use to build consistent digital products faster.",
    imageUrl: "https://images.unsplash.com/photo-1762503203754-62c5a0c969d9?w=1200&h=800&fit=crop&auto=format&q=80",
  },
  {
    value: "motion",
    title: "Motion & Animation",
    description:
      "Purposeful motion guides attention, communicates state, and adds delight — making interfaces feel alive without sacrificing performance.",
    imageUrl: "https://images.unsplash.com/photo-1718524767487-7f98d4e5eeeb?w=1200&h=800&fit=crop&auto=format&q=80",
  },
  {
    value: "typography",
    title: "Typography",
    description:
      "Type is the voice of your interface. Hierarchy, scale, and rhythm turn raw text into a reading experience that carries users through content effortlessly.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop&auto=format&q=80",
  },
];

export default function Demo() {
  return (
    <div className="w-full h-full p-6 flex items-center justify-center">
      <TabsProvider defaultValue="design" className="max-w-4xl w-full">
        <div className="md:grid md:grid-cols-12 gap-4 items-start">
          <TabList className="md:col-span-5">
            {TABS.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                <TabHeader value={tab.value}>{tab.title}</TabHeader>
                <TabDes value={tab.value}>
                  <p className="dark:bg-white bg-[#F2F2F2] text-black p-3 text-sm">
                    {tab.description}
                  </p>
                  <img
                    src={tab.imageUrl}
                    alt={tab.title}
                    className="mb-2 max-w-full h-auto md:hidden block rounded-md object-cover"
                    width={1200}
                    height={800}
                  />
                </TabDes>
              </TabItem>
            ))}
          </TabList>

          <TabImageContainer className="md:col-span-7">
            {TABS.map((tab) => (
              <TabImage key={tab.value} value={tab.value}>
                <img
                  src={tab.imageUrl}
                  alt={tab.title}
                  className="w-full h-full object-cover rounded-md"
                  width={1200}
                  height={800}
                />
              </TabImage>
            ))}
          </TabImageContainer>
        </div>
      </TabsProvider>
    </div>
  );
}
