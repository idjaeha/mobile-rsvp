import mainPhoto from "../../assets/main/1.png";

export default function MainPhotoSection() {
  return (
    <section className="w-full flex justify-center">
      <img
        src={mainPhoto}
        alt="메인 사진"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
