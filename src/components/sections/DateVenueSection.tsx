export default function DateVenueSection() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      <div className="text-center space-y-8 max-w-md">
        <h2 className="text-3xl font-serif text-gray-800">날짜 및 식장 정보</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xl text-gray-700">2026년 03월 28일 토요일</p>
            <p className="text-lg text-gray-600">오후 3시 30분</p>
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <p className="text-xl font-medium text-gray-800">식장 이름</p>
            <p className="text-gray-600">주소 정보</p>
          </div>
        </div>
      </div>
    </section>
  );
}
