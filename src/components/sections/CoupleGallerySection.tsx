import PhotoGallery from "../PhotoGallery";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

interface CoupleGallerySectionProps {
  images: string[];
}

export default function CoupleGallerySection({
  images,
}: CoupleGallerySectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full flex flex-col items-center justify-center pb-6 pt-20 ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
    >
      <div className="text-center space-y-12 max-w-md w-full">
        {/* Photo Gallery */}
        <div>
          <PhotoGallery images={images} />
        </div>
      </div>
    </section>
  );
}
