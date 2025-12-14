import parentsLetterImage from "../../assets/main/2.png";

export default function ParentsSection() {
  return (
    <section className="w-full flex justify-center">
      <img
        src={parentsLetterImage}
        alt="부모님 편지"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
