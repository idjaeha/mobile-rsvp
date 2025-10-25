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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">{account.name}</p>
          <p className="text-xs text-gray-500">{account.bank}</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
        <span className="text-sm text-gray-700 font-mono">
          {account.account}
        </span>
        <button
          onClick={() => handleCopyAccount(account.account, label)}
          className="px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition-colors"
        >
          복사
        </button>
      </div>
      {account.kakaoPayLink && (
        <button
          onClick={() => window.open(account.kakaoPayLink, "_blank")}
          className="w-full py-2 bg-yellow-400 text-gray-800 text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors"
        >
          💛 카카오페이 송금
        </button>
      )}
    </div>
  );

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 p-6">
      <div className="space-y-8 max-w-md w-full">
        <h2 className="text-3xl font-serif text-gray-800 text-center">
          마음 전하실 곳
        </h2>

        <div className="space-y-4">
          {/* 신랑측 Accordion */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setGroomExpanded(!groomExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-800">신랑측 계좌</h3>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  groomExpanded ? "rotate-180" : ""
                }`}
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
              <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                <AccountCard account={groomAccounts.groom} label="신랑" />
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-3">혼주 계좌</p>
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

          {/* 신부측 Accordion */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setBrideExpanded(!brideExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-800">신부측 계좌</h3>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                  brideExpanded ? "rotate-180" : ""
                }`}
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
              <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                <AccountCard account={brideAccounts.bride} label="신부" />
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-3">혼주 계좌</p>
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
