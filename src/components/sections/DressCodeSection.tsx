export default function DressCodeSection() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white via-rose-50 to-pink-50 p-6">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* 아이콘과 제목 */}
        <div className="space-y-4">
          <div className="flex justify-center"></div>
          <h2 className="text-4xl font-serif text-gray-800 tracking-wide">
            Dress Code
          </h2>
          <p className="text-sm text-gray-500 font-light">복장 안내</p>
        </div>

        {/* 메시지 카드 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <p className="text-base text-gray-700 leading-relaxed">
            예식 참석 시 화사한 옷차림으로
            <br />
            함께해 주신다면
            <br />그 날이 한층 더 빛날 것 같습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
