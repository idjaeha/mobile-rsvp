import { useState } from "react";

interface AccountInfo {
  name: string;
  bank: string;
  account: string;
  kakaoPayLink?: string;
}

interface GiftSectionProps {
  groomAccounts: {
    groom: AccountInfo;
    father: AccountInfo;
    mother: AccountInfo;
  };
  brideAccounts: {
    bride: AccountInfo;
    father: AccountInfo;
    mother: AccountInfo;
  };
}

export default function GiftSection({
  groomAccounts,
  brideAccounts,
}: GiftSectionProps) {
  const [groomExpanded, setGroomExpanded] = useState(false);
  const [brideExpanded, setBrideExpanded] = useState(false);

  const handleCopyAccount = async (accountNumber: string, label: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      alert(`${label} 계좌번호가 복사되었습니다.`);
    } catch (error) {
      console.error("계좌번호 복사 실패:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = accountNumber;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert(`${label} 계좌번호가 복사되었습니다.`);
      } catch (err) {
        alert("계좌번호 복사에 실패했습니다.");
      }
      document.body.removeChild(textArea);
    }
  };

  const AccountCard = ({
    account,
    label,
  }: {
    account: AccountInfo;
    label: string;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm tracking-wide"
             style={{
               fontFamily: 'var(--font-body)',
               color: 'var(--color-charcoal)',
               fontWeight: 500
             }}>
            {account.name}
          </p>
          <p className="text-xs tracking-wide"
             style={{
               fontFamily: 'var(--font-body)',
               color: 'var(--color-gray-soft)',
               fontWeight: 300
             }}>
            {account.bank}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg"
           style={{
             backgroundColor: 'var(--color-rose-whisper)',
             border: '1px solid var(--color-rose-light)'
           }}>
        <span className="text-sm font-mono tracking-wide"
              style={{ color: 'var(--color-charcoal)' }}>
          {account.account}
        </span>
        <button
          onClick={() => handleCopyAccount(account.account, label)}
          className="px-4 py-1.5 text-xs rounded-lg transition-all btn-elegant"
          style={{
            backgroundColor: 'var(--color-charcoal)',
            color: 'white'
          }}
        >
          복사
        </button>
      </div>
      {account.kakaoPayLink && (
        <button
          onClick={() => window.open(account.kakaoPayLink, "_blank")}
          className="w-full py-3 text-sm font-medium rounded-lg transition-all btn-elegant"
          style={{
            backgroundColor: '#FEE500',
            color: '#3C1E1E',
            fontFamily: 'var(--font-body)',
            fontWeight: 500
          }}
        >
          💛 카카오페이 송금
        </button>
      )}
    </div>
  );

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center grain-overlay p-6"
             style={{
               background: 'linear-gradient(to bottom, var(--color-warm-white), var(--color-rose-whisper))'
             }}>
      <div className="space-y-10 max-w-md w-full">
        {/* Title */}
        <div className="text-center space-y-3" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <h2 className="text-3xl tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-charcoal)',
                fontWeight: 500
              }}>
            마음 전하실 곳
          </h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-rose-primary), transparent)' }}></div>
          </div>
        </div>

        <div className="space-y-5" style={{ animation: 'fadeInScale 0.8s ease-out 0.2s both' }}>
          {/* Groom's Account Accordion */}
          <div className="overflow-hidden rounded-xl"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid var(--color-rose-light)',
                 boxShadow: '0 4px 20px rgba(232, 169, 182, 0.1)'
               }}>
            <button
              onClick={() => setGroomExpanded(!groomExpanded)}
              className="w-full p-6 flex items-center justify-between transition-all hover:bg-white/50"
            >
              <h3 className="text-lg tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-charcoal)',
                    fontWeight: 500
                  }}>
                신랑측 계좌
              </h3>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  groomExpanded ? "rotate-180" : ""
                }`}
                style={{ color: 'var(--color-rose-primary)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {groomExpanded && (
              <div className="px-6 pb-6 space-y-5 border-t"
                   style={{ borderColor: 'var(--color-rose-light)' }}>
                <AccountCard account={groomAccounts.groom} label="신랑" />
                <div className="border-t pt-5"
                     style={{ borderColor: 'var(--color-rose-light)' }}>
                  <p className="text-xs tracking-wider mb-4"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: 'var(--color-gray-soft)',
                       fontWeight: 300
                     }}>
                    혼주 계좌
                  </p>
                  <div className="space-y-4">
                    <AccountCard
                      account={groomAccounts.father}
                      label="신랑 아버지"
                    />
                    <AccountCard
                      account={groomAccounts.mother}
                      label="신랑 어머니"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bride's Account Accordion */}
          <div className="overflow-hidden rounded-xl"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid var(--color-rose-light)',
                 boxShadow: '0 4px 20px rgba(232, 169, 182, 0.1)'
               }}>
            <button
              onClick={() => setBrideExpanded(!brideExpanded)}
              className="w-full p-6 flex items-center justify-between transition-all hover:bg-white/50"
            >
              <h3 className="text-lg tracking-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-charcoal)',
                    fontWeight: 500
                  }}>
                신부측 계좌
              </h3>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  brideExpanded ? "rotate-180" : ""
                }`}
                style={{ color: 'var(--color-rose-primary)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {brideExpanded && (
              <div className="px-6 pb-6 space-y-5 border-t"
                   style={{ borderColor: 'var(--color-rose-light)' }}>
                <AccountCard account={brideAccounts.bride} label="신부" />
                <div className="border-t pt-5"
                     style={{ borderColor: 'var(--color-rose-light)' }}>
                  <p className="text-xs tracking-wider mb-4"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: 'var(--color-gray-soft)',
                       fontWeight: 300
                     }}>
                    혼주 계좌
                  </p>
                  <div className="space-y-4">
                    <AccountCard
                      account={brideAccounts.father}
                      label="신부 아버지"
                    />
                    <AccountCard
                      account={brideAccounts.mother}
                      label="신부 어머니"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
