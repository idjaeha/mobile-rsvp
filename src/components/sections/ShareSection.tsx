interface ShareSectionProps {
  onKakaoShare: () => void;
  onCopyLink: () => void;
  showCopyNotification: boolean;
}

export default function ShareSection({
  onKakaoShare,
  onCopyLink,
  showCopyNotification,
}: ShareSectionProps) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      <div className="space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800 text-center">
          청첩장 공유하기
        </h2>
        <div className="space-y-4">
          <button
            onClick={onKakaoShare}
            className="w-full py-4 bg-yellow-400 text-gray-800 font-medium rounded-lg hover:bg-yellow-500 transition-colors active:bg-yellow-600"
          >
            💬 카카오톡 공유
          </button>
          <button
            onClick={onCopyLink}
            className="w-full py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            🔗 링크 복사
          </button>
        </div>

        {/* Copy Success Notification */}
        {showCopyNotification && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
            <p className="text-center">✅ 링크가 복사되었습니다!</p>
          </div>
        )}

        <div className="text-center pt-8 text-sm text-gray-500">
          <p>© 2026 Wedding Invitation</p>
        </div>
      </div>
    </section>
  );
}
