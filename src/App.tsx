import { useEffect, useState } from "react";
import BackgroundMusic from "./components/BackgroundMusic";
import MainPhotoSection from "./components/sections/MainPhotoSection";
import DateVenueSection from "./components/sections/DateVenueSection";
import ParentsSection from "./components/sections/ParentsSection";
import CoupleGallerySection from "./components/sections/CoupleGallerySection";
import CalendarSection from "./components/sections/CalendarSection";
import LocationSection from "./components/sections/LocationSection";
import GiftSection from "./components/sections/GiftSection";
import ShareSection from "./components/sections/ShareSection";
import { initKakao, shareKakao } from "./utils/kakao";

function App() {
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // Constants
  const kakaoTalkAccountLink = "https://qr.kakaopay.com/Ej86awFY5";
  const groomPhone = "01029473827";
  const bridePhone = "01029473827";

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

      setShowCopyNotification(true);
      setTimeout(() => {
        setShowCopyNotification(false);
      }, 2000);
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
        setShowCopyNotification(true);
        setTimeout(() => {
          setShowCopyNotification(false);
        }, 2000);
      } catch (err) {
        alert("링크 복사에 실패했습니다.");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleKakaoShare = () => {
    shareKakao();
  };

  return (
    <div className="w-full overflow-x-hidden">
      <BackgroundMusic />

      <MainPhotoSection />
      <DateVenueSection />
      <ParentsSection />
      <CoupleGallerySection
        groomPhone={groomPhone}
        bridePhone={bridePhone}
        onCall={handleCall}
      />
      <CalendarSection />
      <LocationSection />
      <GiftSection kakaoPayLink={kakaoTalkAccountLink} />
      <ShareSection
        onKakaoShare={handleKakaoShare}
        onCopyLink={handleCopyLink}
        showCopyNotification={showCopyNotification}
      />
    </div>
  );
}

export default App;
