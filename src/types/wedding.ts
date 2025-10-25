export interface PersonInfo {
  name: string;
  fullName?: string;
  phone?: string;
  father?: string;
  mother?: string;
}

export interface AccountInfo {
  name: string;
  bank: string;
  account: string;
  kakaoPayLink?: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  hall?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface WeddingInfo {
  date: string;
  time: string;
  dayOfWeek: string;
  venue: VenueInfo;
}

export interface WeddingData {
  couple: {
    groom: PersonInfo;
    bride: PersonInfo;
  };
  wedding: WeddingInfo;
  accounts: {
    groom: {
      groom: AccountInfo;
      father: AccountInfo;
      mother: AccountInfo;
    };
    bride: {
      bride: AccountInfo;
      father: AccountInfo;
      mother: AccountInfo;
    };
  };
  transportation: {
    subway: string;
    bus: string;
    parking: string;
  };
  map: {
    kakao: {
      url: string;
      imageUrl: string;
    };
  };
  gallery: {
    images: string[];
  };
  metadata: {
    title: string;
    description: string;
    ogImage: string;
    bgmUrl: string;
  };
}
