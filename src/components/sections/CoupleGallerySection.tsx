import { FaCameraRetro } from "react-icons/fa";
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
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6 py-12">
      <div className="text-center space-y-12 max-w-md w-full">
        <h2 className="text-2xl font-serif text-gray-800 flex items-center justify-center gap-2 font-bold">
          우리의 순간들
        </h2>

        {/* Photo Gallery */}
        <PhotoGallery images={images} />

        {/* Couple Contact Info */}
        <div className="space-y-8 pt-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-800">신랑 권동현</h3>
            {groomPhone && (
              <button
                onClick={() => onCall(groomPhone)}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors active:bg-gray-100"
              >
                📞 연락하기
              </button>
            )}
          </div>
          <div className="border-t border-gray-200 pt-8 space-y-4">
            <h3 className="text-xl font-medium text-gray-800">신부 최유진</h3>
            {bridePhone && (
              <button
                onClick={() => onCall(bridePhone)}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors active:bg-gray-100"
              >
                📞 연락하기
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
