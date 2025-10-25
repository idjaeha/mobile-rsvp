import WeddingCalendar from "../WeddingCalendar";

export default function CalendarSection() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
      <div className="text-center space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800">날짜 상세</h2>
        <WeddingCalendar year={2026} month={3} day={28} />
      </div>
    </section>
  );
}
