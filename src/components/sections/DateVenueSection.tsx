import { useEffect, useRef, useState } from "react";

interface DateVenueSectionProps {
  date: string;
  time: string;
  dayOfWeek: string;
  venueName: string;
  venueAddress: string;
  venueHall?: string;
}

export default function DateVenueSection({
  date,
  time,
  dayOfWeek,
  venueName,
  venueAddress,
  venueHall,
}: DateVenueSectionProps) {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  const hourNum = parseInt(hour);
  const period = hourNum >= 12 ? "오후" : "오전";
  const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;

  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center grain-overlay p-6"
             style={{
               background: 'linear-gradient(to bottom, var(--color-rose-whisper), var(--color-warm-white))'
             }}>
      <div className="max-w-md w-full">
        {/* Refined Invitation Card */}
        <div
          ref={cardRef}
          className={`relative overflow-hidden transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '3rem 2rem',
            border: '1px solid var(--color-rose-light)',
            boxShadow: '0 20px 60px rgba(232, 169, 182, 0.15)'
          }}
        >
          {/* Elegant Corner Ornaments */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l border-t opacity-30"
               style={{ borderColor: 'var(--color-rose-primary)' }}></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-r border-t opacity-30"
               style={{ borderColor: 'var(--color-rose-primary)' }}></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b opacity-30"
               style={{ borderColor: 'var(--color-rose-primary)' }}></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b opacity-30"
               style={{ borderColor: 'var(--color-rose-primary)' }}></div>

          {/* Content */}
          <div className="text-center space-y-10 relative z-10">
            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-rose-primary))' }}></div>
                <span className="text-xs tracking-[0.2em] uppercase"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-gray-soft)',
                        fontWeight: 300
                      }}>
                  Wedding Day
                </span>
                <div className="w-10 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--color-rose-primary))' }}></div>
              </div>
            </div>

            {/* Date Information */}
            <div className="space-y-5 py-4">
              <div className="space-y-3">
                <h2 className="text-3xl tracking-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-charcoal)',
                      fontWeight: 500,
                      letterSpacing: '-0.02em'
                    }}>
                  {year}년 {month}월 {day}일
                </h2>
                <p className="text-base tracking-wide"
                   style={{
                     fontFamily: 'var(--font-body)',
                     color: 'var(--color-gray-soft)',
                     fontWeight: 400
                   }}>
                  {dayOfWeek}
                </p>
                <p className="text-lg font-medium"
                   style={{ color: 'var(--color-rose-primary)' }}>
                  {period} {displayHour}시 {minute}분
                </p>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-3 py-6">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-rose-primary)', opacity: 0.4 }}></div>
                <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-rose-light)' }}></div>
                <div className="w-2 h-2 rounded-full border" style={{ borderColor: 'var(--color-rose-primary)' }}></div>
                <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-rose-light)' }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-rose-primary)', opacity: 0.4 }}></div>
              </div>

              {/* Venue Information */}
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl tracking-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-charcoal)',
                      fontWeight: 500
                    }}>
                  {venueName}
                </h3>
                {venueHall && (
                  <p className="text-base font-medium"
                     style={{ color: 'var(--color-rose-dark)' }}>
                    {venueHall}
                  </p>
                )}
                <p className="text-sm leading-relaxed px-4"
                   style={{
                     fontFamily: 'var(--font-body)',
                     color: 'var(--color-gray-soft)',
                     fontWeight: 300
                   }}>
                  {venueAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Subtle Top & Bottom Accent Lines */}
          <div className="absolute top-0 left-0 right-0 h-px"
               style={{ background: 'linear-gradient(to right, transparent, var(--color-rose-primary), transparent)' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-px"
               style={{ background: 'linear-gradient(to right, transparent, var(--color-rose-primary), transparent)' }}></div>
        </div>
      </div>
    </section>
  );
}
