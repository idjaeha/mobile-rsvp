// Kakao SDK 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

// Kakao SDK 초기화
export const initKakao = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    // JavaScript 키를 여기에 입력하세요
    // https://developers.kakao.com/ 에서 앱 생성 후 JavaScript 키를 받을 수 있습니다
    window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');
    console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
  }
};

// 카카오톡 공유하기
export const shareKakao = () => {
  if (!window.Kakao) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.');
    return;
  }

  const currentUrl = window.location.href;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '최유진과 곽동현 결혼합니다 🤵🏻‍♂️👰🏻‍♀️',
      description: '2026년 03월 21일 토요일 오후\n두 사람의 소중한 날에 함께해 주세요 💒',
      imageUrl: window.location.origin + '/thumbnail.jpeg',
      link: {
        mobileWebUrl: currentUrl,
        webUrl: currentUrl,
      },
    },
    buttons: [
      {
        title: '청첩장 보기',
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
    ],
  });
};
