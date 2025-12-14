import ProgressiveImage from "../ProgressiveImage";
import parentsLetterLqip from "../../assets/main/2-lqip.webp";
import parentsLetterImage from "../../assets/main/2.webp";

export default function ParentsSection() {
  return (
    <section className="w-full flex justify-center">
      <ProgressiveImage
        lowQualitySrc={parentsLetterLqip}
        highQualitySrc={parentsLetterImage}
        alt="부모님 편지"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
