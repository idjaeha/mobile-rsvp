interface GiftSectionProps {
  kakaoPayLink: string;
}

export default function GiftSection({ kakaoPayLink }: GiftSectionProps) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
      <div className="space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800 text-center">
          마음 전하는 곳
        </h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
            <h3 className="font-medium text-gray-800">신랑측 계좌</h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
              <span className="text-sm text-gray-600">은행 계좌번호</span>
              <button className="px-4 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                복사
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
            <h3 className="font-medium text-gray-800">신부측 계좌</h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
              <span className="text-sm text-gray-600">은행 계좌번호</span>
              <button className="px-4 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                복사
              </button>
            </div>
          </div>
          <button
            className="w-full py-4 bg-yellow-400 text-gray-800 font-medium rounded-lg hover:bg-yellow-500 transition-colors"
            onClick={() => window.open(kakaoPayLink, "_blank")}
          >
            💛 카카오로 송금하기
          </button>
        </div>
      </div>
    </section>
  );
}
