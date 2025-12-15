import ProgressiveImage from "../ProgressiveImage";
import weddingDateLqip from "../../assets/main/5-lqip.webp";
import weddingDateImage from "../../assets/main/5.webp";

export default function CalendarSection() {
  return (
    <section className="w-full flex justify-center">
      <ProgressiveImage
        lowQualitySrc={weddingDateLqip}
        highQualitySrc={weddingDateImage}
        alt="웨딩 날짜"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
