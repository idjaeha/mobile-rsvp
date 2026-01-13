import { useState, useEffect, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { supabase } from "../../lib/supabase";
import type { GuestbookEntry } from "../../types/guestbook";

const ITEMS_PER_PAGE = 5;

export default function GuestbookSection() {
  const { ref, isVisible } = useScrollAnimation();
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // List state
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);

      // Get total count
      const { count } = await supabase
        .from("guestbook")
        .select("*", { count: "exact", head: true });

      setTotalCount(count || 0);

      // Get entries
      const { data, error } = await supabase
        .from("guestbook")
        .select("id, created_at, name, message")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Failed to fetch guestbook entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Validate Turnstile token (skip in development)
      const isDev = import.meta.env.DEV;

      if (!isDev) {
        if (!turnstileToken) {
          throw new Error("보안 인증을 완료해주세요.");
        }

        // Verify token with Edge Function
        const { data: verifyData, error: verifyError } =
          await supabase.functions.invoke("verify-turnstile", {
            body: { token: turnstileToken },
          });

        if (verifyError || !verifyData?.success) {
          throw new Error("보안 인증에 실패했습니다. 다시 시도해주세요.");
        }
      }

      // Validate input
      const trimmedName = name.trim();
      const trimmedMessage = message.trim();

      if (!trimmedName || !trimmedMessage) {
        throw new Error("이름과 메시지를 입력해주세요.");
      }

      // Insert entry
      const { error: insertError } = await supabase.from("guestbook").insert([
        {
          name: trimmedName,
          message: trimmedMessage,
        },
      ]);

      if (insertError) throw insertError;

      // Success
      setSubmitSuccess(true);
      setName("");
      setMessage("");
      setTurnstileToken("");
      turnstileRef.current?.reset();

      // Refresh entries
      await fetchEntries();

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "메시지 전송에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayedEntries = entries.slice(0, displayCount);
  const hasMore = displayCount < entries.length;

  return (
    <section
      ref={ref}
      className={`pt-10 pb-10 w-full flex flex-col items-center justify-center p-6 ${
        isVisible ? "scroll-visible" : "scroll-hidden"
      }`}
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
            방명록
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="p-6 rounded-xl space-y-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--color-rose-light)",
              boxShadow: "0 4px 20px rgba(232, 169, 182, 0.1)",
            }}
          >
            {/* Name Input */}
            <div className="space-y-2">
              <label
                className="text-sm tracking-wide"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                이름
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={20}
                disabled={isSubmitting}
                placeholder="성함을 입력해주세요"
                className="w-full px-4 py-3 text-sm rounded-lg transition-all focus:outline-none focus:ring-2"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-rose-whisper)",
                  border: "1px solid var(--color-rose-light)",
                  color: "var(--color-charcoal)",
                }}
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label
                className="text-sm tracking-wide"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                메시지
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={300}
                rows={3}
                disabled={isSubmitting}
                placeholder="축하 메시지를 남겨주세요"
                className="w-full px-4 py-3 text-sm rounded-lg transition-all focus:outline-none focus:ring-2 resize-none"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-rose-whisper)",
                  border: "1px solid var(--color-rose-light)",
                  color: "var(--color-charcoal)",
                }}
              />
              <p
                className="text-xs text-right"
                style={{ color: "var(--color-gray-soft)" }}
              >
                {message.length}/300
              </p>
            </div>

            {/* Turnstile Widget (Invisible) */}
            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ""}
              onSuccess={setTurnstileToken}
              onError={() => setSubmitError("보안 인증에 실패했습니다.")}
              onExpire={() => setTurnstileToken("")}
              options={{
                size: "invisible",
              }}
            />

            {/* Error Message */}
            {submitError && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: "#fef2f2",
                  color: "#dc2626",
                  fontFamily: "var(--font-body)",
                }}
              >
                {submitError}
              </div>
            )}

            {/* Success Message */}
            {submitSuccess && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: "#f0fdf4",
                  color: "#16a34a",
                  fontFamily: "var(--font-body)",
                }}
              >
                메시지가 등록되었습니다. 감사합니다!
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken || !name || !message}
              className="w-full py-3 text-sm rounded-lg transition-all btn-elegant disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--color-charcoal)",
                color: "white",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              {isSubmitting ? "전송 중..." : "메시지 남기기"}
            </button>
          </div>
        </form>

        {/* Entry List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gray-soft)",
                }}
              >
                메시지를 불러오는 중...
              </p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8">
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gray-soft)",
                }}
              >
                아직 남겨진 메시지가 없습니다.
                <br />첫 번째로 축하 메시지를 남겨주세요!
              </p>
            </div>
          ) : (
            <>
              <p
                className="text-sm text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gray-soft)",
                }}
              >
                총 {totalCount}개의 메시지
              </p>

              {displayedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-xl"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid var(--color-rose-light)",
                    boxShadow: "0 2px 10px rgba(232, 169, 182, 0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-charcoal)",
                      }}
                    >
                      {entry.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-gray-soft)",
                      }}
                    >
                      {formatDate(entry.created_at)}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-charcoal)",
                      fontWeight: 300,
                    }}
                  >
                    {entry.message}
                  </p>
                </div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="w-full py-3 text-sm rounded-lg transition-all btn-elegant"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--color-rose-primary)",
                    color: "var(--color-charcoal)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                  }}
                >
                  더보기 ({entries.length - displayCount}개 더)
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
