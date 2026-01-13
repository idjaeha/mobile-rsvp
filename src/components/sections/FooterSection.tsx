import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import footerImage from "../../assets/footer/footer.png";

export default function FooterSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`w-full flex flex-col items-center justify-center ${
        isVisible ? "scroll-visible" : "scroll-hidden"
      }`}
    >
      <div className="max-w-md w-full">
        <img
          src={footerImage}
          alt="Wedding footer"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
