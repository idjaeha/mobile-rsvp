import { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  lowQualitySrc: string;
  highQualitySrc: string;
  alt: string;
  className?: string;
}

export default function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  alt,
  className = ''
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <img
      src={isLoaded ? highQualitySrc : lowQualitySrc}
      alt={alt}
      className={`${className} transition-all duration-500 ${
        isLoaded ? '' : 'blur-sm scale-[1.02]'
      }`}
    />
  );
}
