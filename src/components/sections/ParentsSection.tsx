import data from "../../data/wedding.json";

interface ParentsSectionProps {
  groomName: string;
  groomFather?: string;
  groomMother?: string;
  brideName: string;
  brideFather?: string;
  brideMother?: string;
}

export default function ParentsSection({
  groomName,
  groomFather,
  groomMother,
  brideName,
  brideFather,
  brideMother,
}: ParentsSectionProps) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center grain-overlay p-12"
             style={{ backgroundColor: 'var(--color-rose-primary)' }}>
      <div className="text-center space-y-16 max-w-2xl w-full">
        {/* Groom's Parents */}
        <div className="space-y-8" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <div className="space-y-4">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase font-light"
               style={{
                 fontFamily: 'var(--font-body)',
                 color: 'rgba(255, 255, 255, 0.7)'
               }}>
              Groom's Parents
            </p>
            <p className="text-sm tracking-wide"
               style={{
                 fontFamily: 'var(--font-body)',
                 color: 'rgba(45, 45, 45, 0.8)',
                 fontWeight: 300
               }}>
              {groomName}의 부모님
            </p>
            <h3 className="text-2xl tracking-tight pt-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}>
              {groomFather} · {groomMother}
            </h3>
          </div>

          {data.letter.images[5] && (
            <div className="mt-8 relative rounded-lg overflow-hidden"
                 style={{
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   padding: '1.5rem',
                   boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                   border: '1px solid rgba(255, 255, 255, 0.5)'
                 }}>
              <img
                src={data.letter.images[5]}
                alt="신랑 부모님 편지"
                className="w-full h-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          )}
        </div>

        {/* Elegant Divider */}
        <div className="flex items-center justify-center py-4"
             style={{ animation: 'fadeInScale 0.8s ease-out 0.3s both' }}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}></div>
            <div className="w-20 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)' }}></div>
            <div className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}></div>
            </div>
            <div className="w-20 h-px" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 0.4), transparent)' }}></div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}></div>
          </div>
        </div>

        {/* Bride's Parents */}
        <div className="space-y-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
          <div className="space-y-4">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase font-light"
               style={{
                 fontFamily: 'var(--font-body)',
                 color: 'rgba(255, 255, 255, 0.7)'
               }}>
              Bride's Parents
            </p>
            <p className="text-sm tracking-wide"
               style={{
                 fontFamily: 'var(--font-body)',
                 color: 'rgba(45, 45, 45, 0.8)',
                 fontWeight: 300
               }}>
              {brideName}의 부모님
            </p>
            <h3 className="text-2xl tracking-tight pt-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}>
              {brideMother} · {brideFather}
            </h3>
          </div>

          {data.letter.images[4] && (
            <div className="mt-8 relative rounded-lg overflow-hidden"
                 style={{
                   backgroundColor: 'rgba(255, 255, 255, 0.95)',
                   padding: '1.5rem',
                   boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                   border: '1px solid rgba(255, 255, 255, 0.5)'
                 }}>
              <img
                src={data.letter.images[4]}
                alt="신부 부모님 편지"
                className="w-full h-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
