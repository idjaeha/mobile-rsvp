interface ShareSectionProps {
  onKakaoShare: () => void;
  onCopyLink: () => void;
}

export default function ShareSection({
  onKakaoShare,
  onCopyLink,
}: ShareSectionProps) {
  return (
    <section className="pt-60 pb-60 w-full flex flex-col items-center justify-center p-6">
      <div className="space-y-12 max-w-md w-full">
        {/* Title */}
        <div
          className="text-center space-y-3"
          style={{ animation: "fadeInUp 0.8s ease-out both" }}
        >
          <h2
            className="text-3xl tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
              fontWeight: 500,
            }}
          >
            청첩장 공유하기
          </h2>
          <div className="flex items-center justify-center">
            <div
              className="w-16 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-rose-primary), transparent)",
              }}
            ></div>
          </div>
        </div>

        {/* Share Buttons */}
        <div
          className="space-y-4"
          style={{ animation: "fadeInScale 0.8s ease-out 0.2s both" }}
        >
          <button
            onClick={onKakaoShare}
            className="w-full py-4 font-medium rounded-xl transition-all btn-elegant flex items-center justify-center gap-3"
            style={{
              backgroundColor: "#FEE500",
              color: "#3C1E1E",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
            }}
          >
            <span className="text-xl">💬</span>
            <span>카카오톡 공유</span>
          </button>
          <button
            onClick={onCopyLink}
            className="w-full py-4 font-medium rounded-xl transition-all btn-elegant flex items-center justify-center gap-3"
            style={{
              backgroundColor: "transparent",
              border: "1.5px solid var(--color-rose-primary)",
              color: "var(--color-charcoal)",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
            }}
          >
            <span className="text-xl">🔗</span>
            <span>링크 복사</span>
          </button>
        </div>

        {/* Footer */}
        <div
          className="text-center pt-12 text-xs tracking-wider"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.4s both",
            fontFamily: "var(--font-body)",
            color: "var(--color-gray-soft)",
            fontWeight: 300,
          }}
        >
          <p>© 2026 Wedding Invitation</p>
          <p className="mt-2" style={{ color: "var(--color-rose-primary)" }}>
            최유진 ♥ 권동현
          </p>
        </div>
      </div>
    </section>
  );
}
