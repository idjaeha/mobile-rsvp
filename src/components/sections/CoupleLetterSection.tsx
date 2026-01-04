import ProgressiveImage from "../ProgressiveImage";
import coupleLetterLqip from "../../assets/main/4-lqip.webp";
import coupleLetterImage from "../../assets/main/4.webp";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function CoupleLetterSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full flex justify-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
    >
      <ProgressiveImage
        lowQualitySrc={coupleLetterLqip}
        highQualitySrc={coupleLetterImage}
        alt="서로에게 쓴 편지"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
