import { useEffect } from "react";
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
  // Constants
  const groomPhone = "01029473827";
  const bridePhone = "01029473827";

  // Account Information
  const groomAccounts = {
    groom: {
      name: "신랑 곽동현",
      bank: "카카오뱅크",
      account: "3333-01-2345678",
      kakaoPayLink: "https://qr.kakaopay.com/Ej86awFY5",
    },
    father: {
      name: "아버지 곽○○",
      bank: "국민은행",
      account: "123-456-789012",
    },
    mother: {
      name: "어머니 ○○○",
      bank: "신한은행",
      account: "110-123-456789",
    },
  };

  const brideAccounts = {
    bride: {
      name: "신부 최유진",
      bank: "카카오뱅크",
      account: "3333-09-8765432",
      kakaoPayLink: "https://qr.kakaopay.com/Ej86awFY5",
    },
    father: {
      name: "아버지 최○○",
      bank: "우리은행",
      account: "1002-123-456789",
    },
    mother: {
      name: "어머니 ○○○",
      bank: "하나은행",
      account: "123-910-123456",
    },
  };

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
      <GiftSection
        groomAccounts={groomAccounts}
        brideAccounts={brideAccounts}
      />
      <ShareSection
        onKakaoShare={handleKakaoShare}
        onCopyLink={handleCopyLink}
      />
    </div>
  );
}

export default App;
