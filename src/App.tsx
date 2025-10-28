import { useEffect } from "react";
import BackgroundMusic from "./components/BackgroundMusic";
import MainPhotoSection from "./components/sections/MainPhotoSection";
import DateVenueSection from "./components/sections/DateVenueSection";
import ParentsSection from "./components/sections/ParentsSection";
import CoupleGallerySection from "./components/sections/CoupleGallerySection";
import CalendarSection from "./components/sections/CalendarSection";
import LocationSection from "./components/sections/LocationSection";
import DressCodeSection from "./components/sections/DressCodeSection";
import GiftSection from "./components/sections/GiftSection";
import ShareSection from "./components/sections/ShareSection";
import { initKakao, shareKakao } from "./utils/kakao";
import weddingData from "./data/wedding.json";
import type { WeddingData } from "./types/wedding";

function App() {
  const data = weddingData as WeddingData;

  // Initialize Kakao SDK on mount
  useEffect(() => {
    initKakao();
  }, []);

  // Event Handlers
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("링크가 복사되었습니다!");
    } catch (error) {
      console.error("링크 복사 실패:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("링크가 복사되었습니다!");
      } catch (err) {
        alert("링크 복사에 실패했습니다.");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleKakaoShare = () => {
    shareKakao(
      data.metadata.title,
      data.metadata.description,
      data.metadata.ogImage
    );
  };

  return (
    <div className="snap-container">
      <BackgroundMusic bgmUrl={data.metadata.bgmUrl} />

      <div className="snap-section">
        <MainPhotoSection
          groomName={data.couple.groom.name}
          brideName={data.couple.bride.name}
          date={data.wedding.date}
        />
      </div>

      <div className="snap-section">
        <DateVenueSection
          date={data.wedding.date}
          time={data.wedding.time}
          dayOfWeek={data.wedding.dayOfWeek}
          venueName={data.wedding.venue.name}
          venueAddress={data.wedding.venue.address}
          venueHall={data.wedding.venue.hall}
        />
      </div>

      <div className="snap-section">
        <ParentsSection
          groomName={data.couple.groom.name}
          groomFather={data.couple.groom.father}
          groomMother={data.couple.groom.mother}
          brideName={data.couple.bride.name}
          brideFather={data.couple.bride.father}
          brideMother={data.couple.bride.mother}
        />
      </div>

      <div className="snap-section">
        <CoupleGallerySection
          groomPhone={data.couple.groom.phone}
          bridePhone={data.couple.bride.phone}
          onCall={handleCall}
          images={data.gallery.images}
        />
      </div>

      <div className="snap-section">
        <CalendarSection date={data.wedding.date} />
      </div>

      <div className="snap-section">
        <LocationSection
          placeName={data.wedding.venue.name}
          address={data.wedding.venue.address}
          latitude={data.wedding.venue.location.latitude}
          longitude={data.wedding.venue.location.longitude}
          mapUrl={data.map.kakao.url}
          mapImageUrl={data.map.kakao.imageUrl}
          subway={data.transportation.subway}
          bus={data.transportation.bus}
          parking={data.transportation.parking}
        />
      </div>

      <div className="snap-section">
        <DressCodeSection />
      </div>

      <div className="snap-section">
        <GiftSection
          groomAccounts={data.accounts.groom}
          brideAccounts={data.accounts.bride}
        />
      </div>

      <div className="snap-section">
        <ShareSection
          onKakaoShare={handleKakaoShare}
          onCopyLink={handleCopyLink}
        />
      </div>
    </div>
  );
}

export default App;
