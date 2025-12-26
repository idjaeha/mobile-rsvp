export default function DressCodeSection() {
  return (
    <section className="pt-30 pb-30 w-full flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-12 max-w-md w-full">
        {/* Title */}
        <div className="space-y-5">
          <h2
            className="text-3xl tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
              fontWeight: 500,
            }}
          >
            Dress Code
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
          <p
            className="text-sm tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-gray-soft)",
              fontWeight: 300,
            }}
          >
            복장 안내
          </p>
        </div>

        {/* Message Card */}
        <div
          className="rounded-2xl p-10"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--color-rose-light)",
            boxShadow: "0 20px 60px rgba(232, 169, 182, 0.2)",
          }}
        >
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-charcoal)",
              fontWeight: 300,
              lineHeight: "1.8",
            }}
          >
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
