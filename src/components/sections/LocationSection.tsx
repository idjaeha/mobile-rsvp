interface LocationSectionProps {
  mapUrl?: string;
  mapImageUrl?: string;
  placeName?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  subway?: string;
  bus?: string;
  parking?: string;
}

export default function LocationSection({
  mapUrl = "https://map.kakao.com/?urlX=509642&urlY=1113296&urlLevel=3&map_type=TYPE_MAP&map_hybrid=false",
  mapImageUrl = "https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=509642&MY=1113296&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo",
  placeName = "식장 이름",
  address = "식장 주소",
  latitude = 37.4979,
  longitude = 127.0276,
  subway = "지하철 안내 정보",
  bus = "버스 안내 정보",
  parking = "주차 안내 정보",
}: LocationSectionProps) {
  // 네이버 지도 URL
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(placeName)}?c=${longitude},${latitude},15,0,0,0,dh`;

  // 카카오맵 URL (기본 제공된 것 사용)
  const kakaoMapUrl = mapUrl;

  // 티맵 URL
  const tmapUrl = `tmap://route?goalname=${encodeURIComponent(placeName)}&goalx=${longitude}&goaly=${latitude}`;

  const handleNavigation = (type: 'naver' | 'kakao' | 'tmap') => {
    const urls = {
      naver: naverMapUrl,
      kakao: kakaoMapUrl,
      tmap: tmapUrl,
    };

    window.open(urls[type], '_blank');
  };
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      <div className="space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800 text-center">
          교통 안내
        </h2>

        <div className="space-y-6">
          {/* 카카오맵 이미지 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={mapImageUrl}
                alt="카카오맵 위치"
                className="w-full h-auto"
                style={{ maxHeight: "310px", objectFit: "cover" }}
              />
            </a>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png"
                    width="72"
                    height="16"
                    alt="카카오맵"
                  />
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-700 hover:text-gray-900 underline"
                >
                  지도 크게 보기
                </a>
              </div>
            </div>
          </div>

          {/* 장소 정보 */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">{placeName}</h3>
              <p className="text-sm text-gray-600">{address}</p>
            </div>

            {/* 길찾기 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={() => handleNavigation('naver')}
                className="flex-1 py-3 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>N</span>
                <span>네이버</span>
              </button>
              <button
                onClick={() => handleNavigation('kakao')}
                className="flex-1 py-3 bg-yellow-400 text-gray-800 text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
              >
                <span>K</span>
                <span>카카오</span>
              </button>
              <button
                onClick={() => handleNavigation('tmap')}
                className="flex-1 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>T</span>
                <span>티맵</span>
              </button>
            </div>
          </div>

          {/* 교통 안내 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚇</span>
                <h3 className="font-medium text-gray-800">지하철</h3>
              </div>
              <p className="text-sm text-gray-600 pl-7">{subway}</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚌</span>
                <h3 className="font-medium text-gray-800">버스</h3>
              </div>
              <p className="text-sm text-gray-600 pl-7">{bus}</p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚗</span>
                <h3 className="font-medium text-gray-800">주차</h3>
              </div>
              <p className="text-sm text-gray-600 pl-7">{parking}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
