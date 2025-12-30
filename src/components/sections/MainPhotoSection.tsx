import ProgressiveImage from "../ProgressiveImage";
import mainPhotoLqip from "../../assets/main/1-lqip.webp";
import mainPhoto from "../../assets/main/1.webp";

export default function MainPhotoSection() {
  return (
    <section
      className="w-full flex justify-center"
      style={{ height: "100dvh" }}
    >
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProgressiveImage
          lowQualitySrc={mainPhotoLqip}
          highQualitySrc={mainPhoto}
          alt="메인 사진"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </section>
  );
}
