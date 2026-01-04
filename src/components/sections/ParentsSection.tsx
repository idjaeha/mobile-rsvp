import ProgressiveImage from "../ProgressiveImage";
import parentsLetterLqip from "../../assets/main/3-lqip.webp";
import parentsLetterImage from "../../assets/main/3.webp";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function ParentsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full flex justify-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
    >
      <ProgressiveImage
        lowQualitySrc={parentsLetterLqip}
        highQualitySrc={parentsLetterImage}
        alt="부모님 편지"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
