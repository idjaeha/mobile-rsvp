import data from "../../data/wedding.json";

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
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-[#e8a9b6] p-12">
      <div className="text-center space-y-16 max-w-2xl w-full">
        {/* 신랑 부모님 */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-widest text-rose-400 uppercase font-semibold">
              Groom's Parents
            </p>
            <p className="text-sm text-gray-600">{groomName}의 부모님</p>
            <p className="text-2xl font-serif text-gray-800 tracking-wide">
              {groomFather} · {groomMother}
            </p>
          </div>
          {data.letter.images[5] && (
            <div className="mt-6 relative">
              {/* 편지지 배경 */}
              <div className="">
                <img
                  src={data.letter.images[5]}
                  alt="신랑 부모님 편지"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* 구분선 */}
        <div className="flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent w-full max-w-xs"></div>
        </div>

        {/* 신부 부모님 */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-widest text-rose-400 uppercase font-semibold">
              Bride's Parents
            </p>
            <p className="text-sm text-gray-600">{brideName}의 부모님</p>
            <p className="text-2xl font-serif text-gray-800 tracking-wide">
              {brideMother} · {brideFather}
            </p>
          </div>
          {data.letter.images[4] && (
            <div className="mt-6 relative">
              {/* 편지지 배경 */}
              <img
                src={data.letter.images[4]}
                alt="신부 부모님 편지 1"
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
