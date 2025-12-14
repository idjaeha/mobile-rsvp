import weddingDateImage from "../../assets/main/4.png";

export default function CalendarSection() {
  return (
    <section className="w-full flex justify-center">
      <img
        src={weddingDateImage}
        alt="웨딩 날짜"
        className="w-full max-w-md h-auto object-contain"
      />
    </section>
  );
}
