import BackgroundMusic from "./components/BackgroundMusic";
import PhotoGallery from "./components/PhotoGallery";
import WeddingCalendar from "./components/WeddingCalendar";

function App() {
  const kakaoTalkAccountLink = "https://qr.kakaopay.com/Ej86awFY5"; // 카카오페이 송금 링크

  return (
    <div className="w-full overflow-x-hidden">
      {/* Background Music Component */}
      <BackgroundMusic />
      {/* 1. Main Photo Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-6">
        <div className="text-center space-y-6">
          {/* Main Photo */}
          <div className="w-full max-w-md mx-auto"></div>
          <h1 className="text-4xl font-serif text-gray-800">최유진 & 곽동현</h1>
          <p className="text-lg text-gray-500">2026.03.21</p>
        </div>
      </section>

      {/* 2. Date & Venue Info Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
        <div className="text-center space-y-8 max-w-md">
          <h2 className="text-3xl font-serif text-gray-800">
            날짜 및 식장 정보
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xl text-gray-700">2026년 03월 21일 토요일</p>
              <p className="text-lg text-gray-600">오후 X시 XX분</p>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <p className="text-xl font-medium text-gray-800">식장 이름</p>
              <p className="text-gray-600">주소 정보</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Parents Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
        <div className="text-center space-y-12 max-w-md">
          <h2 className="text-3xl font-serif text-gray-800">부모님 파트</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">동현의 부모님</p>
              <p className="text-lg text-gray-800">아버지 이름 · 어머니 이름</p>
            </div>
            <div className="border-t border-rose-200 pt-8 space-y-2">
              <p className="text-sm text-gray-500">유진의 부모님</p>
              <p className="text-lg text-gray-800">아버지 이름 · 어머니 이름</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Couple Section with Photo Gallery */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6 py-12">
        <div className="text-center space-y-12 max-w-md w-full">
          <h2 className="text-3xl font-serif text-gray-800">우리의 순간들</h2>

          {/* Photo Gallery */}
          <PhotoGallery />

          {/* Couple Contact Info */}
          <div className="space-y-8 pt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">신랑 곽동현</h3>
              <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                📞 연락하기
              </button>
            </div>
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <h3 className="text-xl font-medium text-gray-800">신부 최유진</h3>
              <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                📞 연락하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Calendar Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
        <div className="text-center space-y-8 max-w-md w-full">
          <h2 className="text-3xl font-serif text-gray-800">날짜 상세</h2>
          <WeddingCalendar year={2026} month={3} day={21} />
        </div>
      </section>

      {/* 6. Location Guide Section */}
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

      {/* 7. Gift Section */}
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
              onClick={() => window.open(kakaoTalkAccountLink, "_blank")}
            >
              💛 카카오로 송금하기
            </button>
          </div>
        </div>
      </section>

      {/* 8. Share Links Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
        <div className="space-y-8 max-w-md w-full">
          <h2 className="text-3xl font-serif text-gray-800 text-center">
            청첩장 공유하기
          </h2>
          <div className="space-y-4">
            <button className="w-full py-4 bg-yellow-400 text-gray-800 font-medium rounded-lg hover:bg-yellow-500 transition-colors">
              💬 카카오톡 공유
            </button>
            <button className="w-full py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              🔗 링크 복사
            </button>
          </div>
          <div className="text-center pt-8 text-sm text-gray-500">
            <p>© 2026 Wedding Invitation</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
