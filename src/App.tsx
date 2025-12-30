import { useEffect } from "react";
import BackgroundMusic from "./components/BackgroundMusic";
import MainPhotoSection from "./components/sections/MainPhotoSection";
import mainPhoto from "./assets/main/1.webp";
// import DateVenueSection from "./components/sections/DateVenueSection"; // 임시 비활성화
import ParentsSection from "./components/sections/ParentsSection";
import CoupleLetterSection from "./components/sections/CoupleLetterSection";
import CoupleGallerySection from "./components/sections/CoupleGallerySection";
import CalendarSection from "./components/sections/CalendarSection";
import LocationSection from "./components/sections/LocationSection";
import DressCodeSection from "./components/sections/DressCodeSection";
import GiftSection from "./components/sections/GiftSection";
import ShareSection from "./components/sections/ShareSection";
import { initKakao, shareKakao } from "./utils/kakao";
import weddingData from "./data/wedding.json";
import type { WeddingData } from "./types/wedding";
import DateVenueSection from "./components/sections/DateVenueSection";
import CoupleContactSection from "./components/sections/CoupleContactSection";

function App() {
  const data = weddingData as WeddingData;

  // Initialize Kakao SDK on mount + Preload first image
  useEffect(() => {
    initKakao();

    // Preload main photo for faster first paint
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = mainPhoto;
    document.head.appendChild(link);
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
        <MainPhotoSection />
      </div>

      <div className="snap-section">
        <DateVenueSection />
      </div>

      <div className="snap-section">
        <ParentsSection />
      </div>

      <div className="snap-section">
        <CoupleGallerySection images={data.gallery.images} />
      </div>

      <div className="snap-section">
        <CoupleLetterSection />
      </div>

      <div className="snap-section">
        <CoupleContactSection
          groomPhone={data.couple.groom.phone}
          bridePhone={data.couple.bride.phone}
          onCall={handleCall}
        />
      </div>

      <div className="snap-section">
        <CalendarSection />
      </div>

      <div className="snap-section">
        <LocationSection
          placeName={data.wedding.venue.name}
          address={data.wedding.venue.address}
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
