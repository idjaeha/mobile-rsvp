import PhotoGallery from "../PhotoGallery";

interface CoupleGallerySectionProps {
  groomPhone?: string;
  bridePhone?: string;
  onCall: (phoneNumber: string) => void;
  images: string[];
}

export default function CoupleGallerySection({
  groomPhone,
  bridePhone,
  onCall,
  images,
}: CoupleGallerySectionProps) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center grain-overlay p-6 py-12"
             style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="text-center space-y-12 max-w-md w-full">
        {/* Title */}
        <div className="space-y-3" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-rose-primary))' }}></div>
            <h2 className="text-3xl tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500
                }}>
              우리의 순간들
            </h2>
            <div className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--color-rose-primary))' }}></div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div style={{ animation: 'fadeInScale 0.8s ease-out 0.2s both' }}>
          <PhotoGallery images={images} />
        </div>

        {/* Couple Contact Info */}
        <div className="space-y-10 pt-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
          {/* Groom Contact */}
          <div className="space-y-5">
            <h3 className="text-xl tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500
                }}>
              신랑 권동현
            </h3>
            {groomPhone && (
              <button
                onClick={() => onCall(groomPhone)}
                className="btn-elegant inline-flex items-center gap-2 px-8 py-3 rounded-full transition-all"
                style={{
                  backgroundColor: 'transparent',
                  border: '1.5px solid var(--color-rose-primary)',
                  color: 'var(--color-rose-dark)'
                }}
              >
                <span>📞</span>
                <span className="tracking-wide">연락하기</span>
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="w-24 h-px" style={{ backgroundColor: 'var(--color-rose-light)' }}></div>
          </div>

          {/* Bride Contact */}
          <div className="space-y-5">
            <h3 className="text-xl tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500
                }}>
              신부 최유진
            </h3>
            {bridePhone && (
              <button
                onClick={() => onCall(bridePhone)}
                className="btn-elegant inline-flex items-center gap-2 px-8 py-3 rounded-full transition-all"
                style={{
                  backgroundColor: 'transparent',
                  border: '1.5px solid var(--color-rose-primary)',
                  color: 'var(--color-rose-dark)'
                }}
              >
                <span>📞</span>
                <span className="tracking-wide">연락하기</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
