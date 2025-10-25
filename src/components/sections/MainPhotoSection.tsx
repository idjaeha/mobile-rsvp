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
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-6">
      <div className="text-center space-y-6">
        {/* Main Photo */}
        <div className="w-full max-w-md mx-auto"></div>
        <h1 className="text-4xl font-serif text-gray-800">
          {brideName} & {groomName}
        </h1>
        <p className="text-lg text-gray-500">{formattedDate}</p>
      </div>
    </section>
  );
}
