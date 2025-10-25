import WeddingCalendar from "../WeddingCalendar";

interface CalendarSectionProps {
  date: string;
}

export default function CalendarSection({ date }: CalendarSectionProps) {
  const [year, month, day] = date.split("-").map(Number);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
      <div className="text-center space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800">날짜 상세</h2>
        <WeddingCalendar year={year} month={month} day={day} />
      </div>
    </section>
  );
}
