import Cmp from "@/registry/ui-layouts/notification";

export default function Demo() {
  return (
    <div className="flex min-h-[560px] w-full items-end justify-center bg-cover bg-center p-8 pb-10"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1534259070436-a95806b8621a?q=80&w=1170&auto=format&fit=crop")',
      }}
    >
      <Cmp />
    </div>
  );
}
