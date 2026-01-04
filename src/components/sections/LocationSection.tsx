import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number }
        ) => KakaoMap;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: {
          map: KakaoMap;
          position: unknown;
        }) => KakaoMarker;
        event: {
          addListener: (
            target: unknown,
            type: string,
            handler: () => void
          ) => void;
        };
        services: {
          Places: new () => KakaoPlaces;
          Status: {
            OK: string;
          };
        };
      };
    };
  }
}

interface KakaoPlaces {
  keywordSearch: (
    keyword: string,
    callback: (data: KakaoPlaceResult[], status: string) => void
  ) => void;
}

interface KakaoPlaceResult {
  place_name: string;
  address_name: string;
  x: string; // longitude
  y: string; // latitude
}

interface KakaoMap {
  setCenter: (latlng: unknown) => void;
}

interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
}

interface LocationSectionProps {
  placeName?: string;
  address?: string;
}

export default function LocationSection({
  placeName = "라시따시어터",
  address = "서울 서초구 매헌로 16 하이브랜드 패션관 1층",
}: LocationSectionProps) {
  const { ref: scrollRef, isVisible } = useScrollAnimation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [placeCoords, setPlaceCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // 카카오맵 SDK 동적 로드
  useEffect(() => {
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

    if (!KAKAO_API_KEY) {
      console.error("카카오맵 API 키가 설정되지 않았습니다.");
      return;
    }

    // 이미 스크립트가 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      setIsMapLoaded(true);
      return;
    }

    // 스크립트가 이미 추가되어 있는지 확인
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsMapLoaded(true));
      return;
    }

    // 동적으로 스크립트 로드 (services 라이브러리 추가)
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => setIsMapLoaded(true);
    script.onerror = () => console.error("카카오맵 SDK 로드 실패");
    document.head.appendChild(script);
  }, []);

  // 지도 초기화 및 키워드 검색
  useEffect(() => {
    if (!isMapLoaded || !window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      if (!mapContainerRef.current) return;

      // 키워드로 장소 검색
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(placeName, (data, status) => {
        if (status !== window.kakao.maps.services.Status.OK || !data[0]) {
          console.error("장소 검색 실패:", placeName);
          return;
        }

        const place = data[0];
        const lat = parseFloat(place.y);
        const lng = parseFloat(place.x);

        // 좌표 저장
        setPlaceCoords({ lat, lng });

        // 지도 생성
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainerRef.current!, options);
        mapRef.current = map;

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: markerPosition,
        });

        // 마커 클릭 시 카카오맵으로 이동
        window.kakao.maps.event.addListener(marker, "click", () => {
          window.open(
            `https://map.kakao.com/link/map/${encodeURIComponent(placeName)},${lat},${lng}`,
            "_blank"
          );
        });

        // 지도 클릭 시에도 카카오맵으로 이동
        window.kakao.maps.event.addListener(map, "click", () => {
          window.open(
            `https://map.kakao.com/link/map/${encodeURIComponent(placeName)},${lat},${lng}`,
            "_blank"
          );
        });
      });
    });
  }, [isMapLoaded, placeName]);

  // 네이버 지도 URL (장소명으로 검색)
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(placeName)}`;

  // 카카오맵 URL (장소명으로 검색)
  const kakaoMapUrl = placeCoords
    ? `https://map.kakao.com/link/map/${encodeURIComponent(placeName)},${placeCoords.lat},${placeCoords.lng}`
    : `https://map.kakao.com/link/search/${encodeURIComponent(placeName)}`;

  // 티맵 URL (장소명으로 검색)
  const tmapUrl = `tmap://search?name=${encodeURIComponent(placeName)}`;

  const handleNavigation = (type: "naver" | "kakao" | "tmap") => {
    const urls = {
      naver: naverMapUrl,
      kakao: kakaoMapUrl,
      tmap: tmapUrl,
    };

    window.open(urls[type], "_blank");
  };
  return (
    <section
      ref={scrollRef}
      className={`pt-30 pb-10 w-full flex flex-col items-center justify-center p-6 ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
    >
      <div className="space-y-10 max-w-md w-full">
        {/* Title */}
        <div className="text-center space-y-5">
          <h2
            className="text-2xl tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-charcoal)",
              fontWeight: 500,
            }}
          >
            교통 안내
          </h2>
          <div className="flex items-center justify-center">
            <div
              className="w-16 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-rose-primary), transparent)",
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 카카오맵 */}
          <div
            className="overflow-hidden rounded-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--color-rose-light)",
              boxShadow: "0 4px 20px rgba(232, 169, 182, 0.1)",
            }}
          >
            <div
              ref={mapContainerRef}
              className="w-full cursor-pointer"
              style={{ height: "280px" }}
            />
            <div
              className="p-4 border-t"
              style={{
                backgroundColor: "var(--color-rose-whisper)",
                borderColor: "var(--color-rose-light)",
              }}
            >
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
                  href={kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline tracking-wide"
                  style={{
                    fontFamily: "var(--font-pretendard-gothic)",
                    color: "var(--color-charcoal)",
                  }}
                >
                  지도 크게 보기
                </a>
              </div>
            </div>
          </div>

          {/* 장소 정보 */}
          <div
            className="rounded-xl p-5 space-y-5"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--color-rose-light)",
              boxShadow: "0 4px 20px rgba(232, 169, 182, 0.1)",
            }}
          >
            <div>
              <h3
                className="mb-2 tracking-tight"
                style={{
                  fontFamily: "var(--font-pretendard-gothic)",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                }}
              >
                {placeName}
              </h3>
              <p
                className="text-sm tracking-wide"
                style={{
                  fontFamily: "var(--font-pretendard-gothic)",
                  color: "var(--color-gray-soft)",
                  fontWeight: 300,
                }}
              >
                {address}
              </p>
            </div>

            {/* 길찾기 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={() => handleNavigation("naver")}
                className="flex-1 py-3 text-sm font-medium rounded-lg transition-all btn-elegant flex items-center justify-center gap-2"
                style={{
                  fontFamily: "var(--font-pretendard-gothic)",
                  backgroundColor: "#03C75A",
                  color: "white",
                }}
              >
                <span>N</span>
                <span>네이버</span>
              </button>
              <button
                onClick={() => handleNavigation("kakao")}
                className="flex-1 py-3 text-sm font-medium rounded-lg transition-all btn-elegant flex items-center justify-center gap-2"
                style={{
                  fontFamily: "var(--font-pretendard-gothic)",
                  backgroundColor: "#FEE500",
                  color: "#3C1E1E",
                }}
              >
                <span>K</span>
                <span>카카오</span>
              </button>
              <button
                onClick={() => handleNavigation("tmap")}
                className="flex-1 py-3 text-sm font-medium rounded-lg transition-all btn-elegant flex items-center justify-center gap-2"
                style={{
                  fontFamily: "var(--font-pretendard-gothic)",
                  backgroundColor: "#1E88E5",
                  color: "white",
                }}
              >
                <span>T</span>
                <span>티맵</span>
              </button>
            </div>
          </div>

          {/* 교통 안내 */}
          <div className="space-y-4">
            {/* 지하철 안내 */}
            <div
              className="rounded-xl p-5"
              style={{
                fontFamily: "var(--font-pretendard-gothic)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--color-rose-light)",
                boxShadow: "0 4px 20px rgba(232, 169, 182, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚇</span>
                <h3 className="font-semibold text-gray-800 text-lg">지하철</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        양재시민의 숲 역 하차
                      </p>
                      <p className="text-xs text-gray-600 mt-1">신분당선</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-rose-400 text-lg"></div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        5번 출구로 나오기
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-rose-400 text-lg"></div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-700">
                        셔틀버스 탑승
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        예식 1시간 전부터 10분 간격 순환 운행
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 버스 안내 */}
            <div
              className="rounded-xl p-5"
              style={{
                fontFamily: "var(--font-pretendard-gothic)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--color-rose-light)",
                boxShadow: "0 4px 20px rgba(232, 169, 182, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚌</span>
                <h3 className="font-semibold text-gray-800 text-lg">버스</h3>
              </div>

              {/* 중요 안내 */}
              <div
                className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-200"
                style={{ fontFamily: "var(--font-pretendard-gothic)" }}
              >
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  📍 버스 이용 시
                </p>
                <p className="text-xs text-blue-700">
                  라시따 A 게이트를 이용해 주세요
                </p>
              </div>

              <div className="space-y-3">
                {/* 하이브랜드 정류장 */}
                <div
                  className="border-l-4 border-green-400 pl-3 py-2"
                  style={{ fontFamily: "var(--font-pretendard-gothic)" }}
                >
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    하이브랜드 정류장 하차 [22384]
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      서초08
                    </span>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      서초20
                    </span>
                  </div>
                </div>

                {/* 양곡 도매시장 정류장 */}
                <div
                  className="border-l-4 border-blue-400 pl-3 py-2"
                  style={{ fontFamily: "var(--font-pretendard-gothic)" }}
                >
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    양곡 도매시장 정류장 하차 [22299]
                  </p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">간선버스</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          441
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">지선버스</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          8442
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">광역버스</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          9100
                        </span>
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          9200
                        </span>
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          9201
                        </span>
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          9300
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        일반/직행버스
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          6
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          11-3
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          1006
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          3000
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          3003
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          3030
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          3100
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          3101
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          6501
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          G9633
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 주차 안내 */}
            <div
              className="rounded-xl p-5"
              style={{
                fontFamily: "var(--font-pretendard-gothic)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--color-rose-light)",
                boxShadow: "0 4px 20px rgba(232, 169, 182, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚗</span>
                <h3 className="font-semibold text-gray-800 text-lg">주차</h3>
              </div>
              <div className="space-y-4">
                {/* 네비게이션 안내 */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    네비게이션 검색
                  </p>
                  <p className="text-xs text-gray-600">
                    "라시따시어터" 또는 "하이브랜드" 입력
                  </p>
                </div>

                {/* 주소 안내 */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    주소 검색
                  </p>
                  <p className="text-xs text-gray-600">
                    "매헌로 16" 또는 "양재동 215" 검색
                  </p>
                </div>

                {/* 무료주차 안내 */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-medium text-green-700">
                    3시간 무료 주차 가능
                  </p>
                </div>

                {/* 주차장 안내 */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    주차장 안내
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-gray-700">
                        파랑색 유도선 → 지하 3층 주차장
                      </p>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-pink-50 rounded">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <p className="text-sm text-gray-700">
                        분홍색 유도선 → 타워주차장
                      </p>
                    </div>
                  </div>
                </div>

                {/* 주의사항 */}
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    주차 공간은 넉넉히 마련되어 있으나 근처 쇼핑센터로 인해 주차
                    진입로가 다소 혼잡할 수 있습니다. 여유로운 마음으로 조금
                    일찍 와주시면 감사하겠습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
