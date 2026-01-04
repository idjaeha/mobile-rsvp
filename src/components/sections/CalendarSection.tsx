import ProgressiveImage from "../ProgressiveImage";
import weddingDateLqip from "../../assets/main/5-lqip.webp";
import weddingDateImage from "../../assets/main/5.webp";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function CalendarSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full flex justify-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
    >
      <ProgressiveImage
        lowQualitySrc={weddingDateLqip}
        highQualitySrc={weddingDateImage}
        alt="웨딩 날짜"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
