import StayPicker from "./stay-picker";

export default function StayPickerDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6">
      <StayPicker minNights={2} month="2026-11" />
    </div>
  );
}
