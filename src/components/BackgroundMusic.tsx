import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface BackgroundMusicProps {
  bgmUrl: string;
}

export default function BackgroundMusic({ bgmUrl }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 브라우저의 자동 재생 정책 때문에 사용자 인터랙션 후 재생
    const handleFirstInteraction = async () => {
      if (!hasInteracted) {
        try {
          await audio.play();
          setHasInteracted(true);
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      }
    };

    // 다양한 인터랙션 이벤트 리스너
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src={bgmUrl} loop preload="auto" />

      {/* Floating Music Toggle Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--color-rose-light)",
          boxShadow: "0 4px 20px rgba(232, 169, 182, 0.2)",
          color: "var(--color-rose-primary)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow =
            "0 8px 30px rgba(232, 169, 182, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(232, 169, 182, 0.2)";
        }}
        aria-label={isPlaying ? "음악 일시정지" : "음악 재생"}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </>
  );
}
