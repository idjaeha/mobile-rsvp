import WeddingCalendar from "../WeddingCalendar";

interface CalendarSectionProps {
  date: string;
}

export default function CalendarSection({ date }: CalendarSectionProps) {
  const [year, month, day] = date.split("-").map(Number);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center grain-overlay p-6"
             style={{
               background: 'linear-gradient(135deg, var(--color-rose-whisper) 0%, var(--color-warm-white) 100%)'
             }}>
      <div className="text-center space-y-10 max-w-md w-full">
        {/* Title */}
        <div className="space-y-3" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <h2 className="text-3xl tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-charcoal)',
                fontWeight: 500
              }}>
            날짜 상세
          </h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-rose-primary), transparent)' }}></div>
          </div>
        </div>

        {/* Calendar */}
        <div style={{ animation: 'fadeInScale 0.8s ease-out 0.3s both' }}>
          <WeddingCalendar year={year} month={month} day={day} />
        </div>
      </div>
    </section>
  );
}
