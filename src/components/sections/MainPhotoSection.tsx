import { CiCalendar } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";

interface MainPhotoSectionProps {
  groomName: string;
  brideName: string;
  date: string;
}

export default function MainPhotoSection({
  groomName,
  brideName,
  date,
}: MainPhotoSectionProps) {
  const formattedDate = date.replace(/-/g, ".");

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url('/images/main/main3.jpeg')`,
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center space-y-3 relative z-10">
        {/* Main Photo */}
        <div className="w-full max-w-md mx-auto"></div>
        <p className="text-2xl text-gray-900 drop-shadow-lg font-extrabold font-serif">
          {groomName}
        </p>
        <p className="text-rose-500">♥︎</p>
        <p className="text-2xl text-gray-900 drop-shadow-lg font-extrabold font-serif">
          {brideName}
        </p>
        <p className="text-[1rem] drop-shadow-md font-serif mt-10 flex justify-center items-center gap-1.5">
          <FaRegCalendarCheck /> {formattedDate}
        </p>
      </div>
    </section>
  );
}
