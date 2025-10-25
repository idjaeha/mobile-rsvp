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

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      <div className="text-center space-y-8 max-w-md">
        <h2 className="text-3xl font-serif text-gray-800">날짜 및 식장 정보</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xl text-gray-700">
              {year}년 {month}월 {day}일 {dayOfWeek}
            </p>
            <p className="text-lg text-gray-600">
              {period} {displayHour}시 {minute}분
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <p className="text-xl font-medium text-gray-800">{venueName}</p>
            <p className="text-gray-600">{venueAddress}</p>
            {venueHall && <p className="text-gray-500">{venueHall}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
