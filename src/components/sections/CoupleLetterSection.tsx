import coupleLetterImage from "../../assets/main/3.webp";

export default function CoupleLetterSection() {
  return (
    <section className="w-full flex justify-center">
      <img
        src={coupleLetterImage}
        alt="서로에게 쓴 편지"
        loading="lazy"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
