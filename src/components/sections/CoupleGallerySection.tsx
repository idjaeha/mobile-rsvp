import PhotoGallery from "../PhotoGallery";

interface CoupleGallerySectionProps {
  images: string[];
}

export default function CoupleGallerySection({
  images,
}: CoupleGallerySectionProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center p-6 py-12">
      <div className="text-center space-y-12 max-w-md w-full">
        {/* Photo Gallery */}
        <div style={{ animation: "fadeInScale 0.8s ease-out 0.2s both" }}>
          <PhotoGallery images={images} />
        </div>
      </div>
    </section>
  );
}
