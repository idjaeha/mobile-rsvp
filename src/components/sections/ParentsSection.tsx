interface ParentsSectionProps {
  groomName: string;
  groomFather?: string;
  groomMother?: string;
  brideName: string;
  brideFather?: string;
  brideMother?: string;
}

export default function ParentsSection({
  groomName,
  groomFather,
  groomMother,
  brideName,
  brideFather,
  brideMother,
}: ParentsSectionProps) {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
      <div className="text-center space-y-12 max-w-md">
        <h2 className="text-3xl font-serif text-gray-800">부모님 파트</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{groomName}의 부모님</p>
            <p className="text-lg text-gray-800">
              {groomFather} · {groomMother}
            </p>
          </div>
          <div className="border-t border-rose-200 pt-8 space-y-2">
            <p className="text-sm text-gray-500">{brideName}의 부모님</p>
            <p className="text-lg text-gray-800">
              {brideFather} · {brideMother}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
