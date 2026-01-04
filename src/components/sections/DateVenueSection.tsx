import ProgressiveImage from "../ProgressiveImage";
import coupleLetterLqip from "../../assets/main/2-lqip.webp";
import coupleLetterImage from "../../assets/main/2.webp";

export default function DateVenueSection() {
  return (
    <section className="w-full flex justify-center">
      <ProgressiveImage
        lowQualitySrc={coupleLetterLqip}
        highQualitySrc={coupleLetterImage}
        alt="서로에게 쓴 편지"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
