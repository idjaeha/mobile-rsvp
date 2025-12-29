import PhotoGallery from "../PhotoGallery";

interface CoupleGallerySectionProps {
  images: string[];
}

export default function CoupleGallerySection({
  images,
}: CoupleGallerySectionProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center pb-6 pt-24">
      <div className="text-center space-y-12 max-w-md w-full">
        {/* Photo Gallery */}
        <div>
          <PhotoGallery images={images} />
        </div>
      </div>
    </section>
  );
}
