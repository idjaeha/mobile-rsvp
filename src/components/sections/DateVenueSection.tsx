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
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-6">
      <div className="max-w-md w-full">
        {/* 청첩장 카드 */}
        <div
          ref={cardRef}
          className={`bg-white rounded-lg shadow-2xl p-8 border-2 border-rose-100 relative overflow-hidden transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {/* 장식 요소 - 상단 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

          {/* 장식 요소 - 코너 */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-rose-200 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-rose-200 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-rose-200 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-rose-200 rounded-br-lg"></div>

          {/* 콘텐츠 */}
          <div className="text-center space-y-8 relative z-10 py-4">
            {/* 제목 장식 */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-rose-300"></div>
              <h2 className="text-2xl font-serif text-gray-800 tracking-wider">
                Wedding Day
              </h2>
              <div className="w-8 h-px bg-rose-300"></div>
            </div>

            {/* 날짜 정보 */}
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                <p className="text-2xl font-serif text-gray-800 tracking-wide">
                  {year}년 {month}월 {day}일
                </p>
                <p className="text-lg text-gray-600 font-medium">{dayOfWeek}</p>
                <p className="text-lg text-rose-500 font-medium">
                  {period} {displayHour}시 {minute}분
                </p>
              </div>

              {/* 구분선 */}
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="w-2 h-2 rounded-full bg-rose-300"></div>
                <div className="w-16 h-px bg-rose-200"></div>
                <div className="w-2 h-2 rounded-full bg-rose-300"></div>
                <div className="w-16 h-px bg-rose-200"></div>
                <div className="w-2 h-2 rounded-full bg-rose-300"></div>
              </div>

              {/* 식장 정보 */}
              <div className="space-y-3 pt-4">
                <p className="text-xl font-serif text-gray-800 font-semibold">
                  {venueName}
                </p>
                {venueHall && (
                  <p className="text-base text-rose-600 font-medium">
                    {venueHall}
                  </p>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {venueAddress}
                </p>
              </div>
            </div>
          </div>

          {/* 장식 요소 - 하단 */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
