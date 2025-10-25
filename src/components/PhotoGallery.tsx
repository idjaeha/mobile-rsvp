import { useState } from "react";

// Import all gallery images
import image1 from "../assets/gallery/image1.jpeg";
import image2 from "../assets/gallery/image2.jpeg";
import image3 from "../assets/gallery/image3.jpeg";
import image4 from "../assets/gallery/image4.jpeg";
import image5 from "../assets/gallery/image5.jpeg";
import image7 from "../assets/gallery/image7.jpeg";
import image8 from "../assets/gallery/image8.jpeg";
import image9 from "../assets/gallery/image9.jpeg";
import image10 from "../assets/gallery/image10.jpeg";

const photos = [
  image2,
  image9,
  image8,
  image5,
  image1,
  image10,
  image7,
  image4,
  image3,
  // image6,
];

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedIndex(null);
    // Restore body scroll
    document.body.style.overflow = "auto";
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious(e as any);
    } else if (e.key === "ArrowRight") {
      goToNext(e as any);
    } else if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      {/* 3x4 Grid Gallery */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => openModal(index)}
            className="aspect-square overflow-hidden rounded-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <img
              src={photo}
              alt={`Wedding photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Modal Viewer */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-0 m-0"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          style={{ height: "100vh", width: "100vw" }}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="w-full h-full flex items-center justify-center px-16 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedIndex]}
              alt={`Wedding photo ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
