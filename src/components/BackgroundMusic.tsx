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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label={isPlaying ? "음악 일시정지" : "음악 재생"}
      >
        {isPlaying ? (
          // Pause Icon
          <FaPause />
        ) : (
          // Play Icon
          <FaPlay />
        )}
      </button>
    </>
  );
}
