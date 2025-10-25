import { useState, useEffect, useRef } from "react";

interface PhotoGalleryProps {
  images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Auto-focus modal when opened
  useEffect(() => {
    if (selectedIndex !== null && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedIndex]);

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

  const goToPrevious = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  // Handle touch events for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      {/* 3x4 Grid Gallery */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openModal(index)}
            className="aspect-square overflow-hidden rounded-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <img
              src={image}
              alt={`Wedding photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Modal Viewer */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-0 m-0"
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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[selectedIndex]}
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
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
