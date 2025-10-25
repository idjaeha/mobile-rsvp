import { useEffect, useState } from 'react';

interface WeddingCalendarProps {
  year: number;
  month: number; // 1-12
  day: number;
}

export default function WeddingCalendar({ year, month, day }: WeddingCalendarProps) {
  const [dDay, setDDay] = useState<number>(0);

  // Calculate D-day
  useEffect(() => {
    const calculateDDay = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const weddingDate = new Date(year, month - 1, day);
      weddingDate.setHours(0, 0, 0, 0);

      const diffTime = weddingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDDay(diffDays);
    };

    calculateDDay();
    // Update daily
    const interval = setInterval(calculateDDay, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, [year, month, day]);

  // Get calendar data for the wedding month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Create calendar grid
  const calendarDays: (number | null)[] = [];

  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Calendar */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* Month and Year */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-serif text-gray-800">
            {year}년 {month}월
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {monthNames[month - 1]} {year}
          </p>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((weekDay, index) => (
            <div
              key={weekDay}
              className={`text-center text-xs font-medium py-2 ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
              }`}
            >
              {weekDay}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayNum, index) => {
            const isWeddingDay = dayNum === day;
            const dayOfWeek = index % 7;
            const isSunday = dayOfWeek === 0;
            const isSaturday = dayOfWeek === 6;

            return (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${
                  dayNum === null
                    ? ''
                    : isWeddingDay
                    ? 'bg-rose-500 text-white font-bold shadow-md scale-110'
                    : isSunday
                    ? 'text-red-500 hover:bg-red-50'
                    : isSaturday
                    ? 'text-blue-500 hover:bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {dayNum}
              </div>
            );
          })}
        </div>

        {/* Wedding Date Label */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <span className="text-sm text-gray-700">
              {year}년 {month}월 {day}일 결혼식
            </span>
          </div>
        </div>
      </div>

      {/* D-day Counter */}
      <div className="bg-white rounded-lg p-6 shadow-sm text-center">
        <p className="text-gray-600 mb-2">결혼식까지</p>
        {dDay > 0 ? (
          <div className="space-y-1">
            <p className="text-4xl font-bold text-rose-600">D-{dDay}</p>
            <p className="text-sm text-gray-500">{dDay}일 남았습니다</p>
          </div>
        ) : dDay === 0 ? (
          <div className="space-y-1">
            <p className="text-4xl font-bold text-rose-600">D-Day</p>
            <p className="text-sm text-gray-500">오늘이 결혼식 날입니다! 💒</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-4xl font-bold text-gray-600">D+{Math.abs(dDay)}</p>
            <p className="text-sm text-gray-500">결혼한지 {Math.abs(dDay)}일 되었습니다 💕</p>
          </div>
        )}
      </div>
    </div>
  );
}
