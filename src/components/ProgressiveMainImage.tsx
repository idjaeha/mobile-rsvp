import { useState, useEffect } from "react";

interface ProgressiveImageProps {
  lowQualitySrc: string;
  highQualitySrc: string;
  lowQualityTextSrc: string;
  highQualityTextSrc: string;
  alt: string;
  textAlt: string;
  className?: string;
}

export default function ProgressiveMainImage({
  lowQualitySrc,
  highQualitySrc,
  lowQualityTextSrc,
  highQualityTextSrc,
  alt,
  textAlt,
  className = "",
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <>
      <img
        src={isLoaded ? highQualityTextSrc : lowQualityTextSrc}
        alt={textAlt}
        className={`absolute z-10 w-full max-w-md h-auto object-cover transition-all duration-500 ${
          isLoaded ? "" : "blur-sm scale-[1.02]"
        }`}
      />
      <img
        src={isLoaded ? highQualitySrc : lowQualitySrc}
        alt={alt}
        className={`${className} transition-all duration-500 ${
          isLoaded ? "" : "blur-sm scale-[1.02]"
        }`}
      />
    </>
  );
}
