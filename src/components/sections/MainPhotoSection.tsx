import { FaRegCalendarCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

interface MainPhotoSectionProps {
  groomName: string;
  brideName: string;
  date: string;
}

export default function MainPhotoSection({
  groomName,
  brideName,
  date,
}: MainPhotoSectionProps) {
  const formattedDate = date.replace(/-/g, ".");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden grain-overlay"
      style={{
        backgroundImage: `linear-gradient(rgba(254, 249, 243, 0.35), rgba(253, 245, 247, 0.45)), url('/images/main/main3.jpeg')`,
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-8 w-20 h-20 border border-[var(--color-rose-primary)] opacity-20 rounded-full"
             style={{
               animation: 'fadeInScale 1.2s ease-out 0.3s both'
             }}></div>
        <div className="absolute bottom-24 right-12 w-16 h-16 border border-[var(--color-gold)] opacity-15 rounded-full"
             style={{
               animation: 'fadeInScale 1.2s ease-out 0.5s both'
             }}></div>
      </div>

      <div className={`text-center space-y-6 relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Names with Elegant Typography */}
        <div className="space-y-5" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
          <h1 className="text-4xl tracking-tight drop-shadow-sm"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-charcoal)',
                fontWeight: 500,
                letterSpacing: '-0.01em'
              }}>
            {groomName}
          </h1>

          <div className="flex items-center justify-center gap-4 py-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--color-rose-primary)] to-transparent"></div>
            <span className="text-2xl" style={{ color: 'var(--color-rose-primary)' }}>♥</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-[var(--color-rose-primary)] to-transparent"></div>
          </div>

          <h1 className="text-4xl tracking-tight drop-shadow-sm"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-charcoal)',
                fontWeight: 500,
                letterSpacing: '-0.01em'
              }}>
            {brideName}
          </h1>
        </div>

        {/* Date with Icon */}
        <div className="pt-8" style={{ animation: 'fadeInUp 0.8s ease-out 0.5s both' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.7)',
                 backdropFilter: 'blur(8px)',
                 border: '1px solid rgba(232, 169, 182, 0.2)',
                 boxShadow: '0 4px 16px rgba(232, 169, 182, 0.15)'
               }}>
            <FaRegCalendarCheck style={{ color: 'var(--color-rose-primary)' }} />
            <span className="text-base tracking-wide"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-charcoal)',
                    fontWeight: 400
                  }}>
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Subtle Invitation Text */}
        <p className="text-sm tracking-widest uppercase pt-6"
           style={{
             animation: 'fadeInUp 0.8s ease-out 0.7s both',
             fontFamily: 'var(--font-body)',
             color: 'var(--color-gray-soft)',
             fontWeight: 300,
             letterSpacing: '0.15em'
           }}>
          Wedding Invitation
        </p>
      </div>
    </section>
  );
}
