import mainPhotoLqip from "../../assets/main/1-lqip.webp";
import mainPhoto from "../../assets/main/1.webp";
import mainTextLqip from "../../assets/main/main-text-lqip.webp";
import mainText from "../../assets/main/main-text.png";
import ProgressiveMainImage from "../ProgressiveMainImage";

export default function MainPhotoSection() {
  return (
    <section
      className="w-full flex justify-center relative"
      style={{ height: "100dvh" }}
    >
      <ProgressiveMainImage
        lowQualitySrc={mainPhotoLqip}
        highQualitySrc={mainPhoto}
        lowQualityTextSrc={mainTextLqip}
        highQualityTextSrc={mainText}
        alt="메인 사진"
        textAlt="메인 사진 텍스트"
        className="w-full max-w-md h-auto object-cover"
      />
    </section>
  );
}
