export default function LocationSection() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      <div className="space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800 text-center">
          교통 안내
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-600">지도 영역</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">🚇 지하철</h3>
              <p className="text-sm text-gray-600">지하철 안내 정보</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">🚌 버스</h3>
              <p className="text-sm text-gray-600">버스 안내 정보</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">🚗 주차</h3>
              <p className="text-sm text-gray-600">주차 안내 정보</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
