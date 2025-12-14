import weddingDateImage from "../../assets/main/4.webp";

export default function CalendarSection() {
  return (
    <section className="w-full flex justify-center">
      <img
        src={weddingDateImage}
        alt="웨딩 날짜"
        loading="lazy"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
