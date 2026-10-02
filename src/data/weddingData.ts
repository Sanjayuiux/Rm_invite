export interface WeddingData {
  couple: {
    groom: string;
    groomQualification: string;
    bride: string;
    brideQualification: string;
    displayNames: {
      groom: string;
      bride: string;
      conjunction: string;
    };
    statement: string;
    subStatement: string;
  };
  wedding: {
    title: string;
    subtitle: string;
    date: string; // ISO
    day: string;
    dayNumber: string;
    monthYear: string;
    time: string;
    muhurtham: string;
    venue: string;
    address: string;
    city: string;
    fullAddress: string;
    googleMapsUrl: string;
    calendarDetails: {
      title: string;
      description: string;
      startDate: string; // YYYYMMDDTHHMMSSZ
      endDate: string;
    };
  };
  reception: {
    title: string;
    subtitle: string;
    date: string;
    day: string;
    time: string;
    venue: string;
    address: string;
    city: string;
    googleMapsUrl: string;
    calendarDetails: {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
    };
  };
  families: {
    introLabel: string;
    heading: string;
    familyOne: {
      father: string;
      mother: string;
      relation: string;
    };
    familyTwo: {
      father: string;
      mother: string;
      relation: string;
    };
    invitationCopy: string;
    closingBlessing: string;
  };
  timeline: Array<{
    id: string;
    date: string;
    day: string;
    time: string;
    title: string;
    tag: string;
    venue: string;
    address: string;
    description: string;
  }>;
  venue: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    googleMapsUrl: string;
    embedMapQuery: string;
    travelNotes: Array<{
      title: string;
      distance: string;
      description: string;
    }>;
  };
  gallery: Array<{
    id: string;
    src: string;
    alt: string;
    caption: string;
    aspectRatio: 'portrait' | 'landscape' | 'tall';
    placeholderLabel: string;
  }>;
  music: {
    src: string;
    title: string;
    artist: string;
  };
  meta: {
    siteTitle: string;
    siteDescription: string;
    shareUrl: string;
    whatsappMessage: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    groom: "R.S. Manoj",
    groomQualification: "MBA.",
    bride: "K. Ranjani",
    brideQualification: "M.Sc.",
    displayNames: {
      groom: "Manoj",
      bride: "Ranjani",
      conjunction: "&"
    },
    statement: "Two lives, one beautiful beginning.",
    subStatement: "A new chapter begins, surrounded by the love and blessings of the people who matter most."
  },

  wedding: {
    title: "The Wedding Ceremony",
    subtitle: "MUHURTHAM",
    date: "2026-11-22",
    day: "SUNDAY",
    dayNumber: "22",
    monthYear: "NOVEMBER 2026",
    time: "06:00 AM — 07:15 AM",
    muhurtham: "06:00 AM — 07:15 AM",
    venue: "Sri Lakshmi Mahal",
    address: "Kovai – Sathy Road, Kovilpalayam",
    city: "Coimbatore",
    fullAddress: "Sri Lakshmi Mahal, Kovai – Sathy Road, Kovilpalayam, Coimbatore",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Mahal+Kovilpalayam+Coimbatore",
    calendarDetails: {
      title: "Wedding Ceremony: Manoj & Ranjani",
      description: "Wedding Ceremony of R.S. Manoj & K. Ranjani at Sri Lakshmi Mahal, Kovilpalayam, Coimbatore.",
      startDate: "20261122T003000Z", // 06:00 AM IST = 00:30 UTC
      endDate: "20261122T014500Z"    // 07:15 AM IST = 01:45 UTC
    }
  },

  reception: {
    title: "The Celebration",
    subtitle: "RECEPTION",
    date: "2026-11-21",
    day: "SATURDAY",
    time: "06:00 PM — 09:00 PM",
    venue: "Sri Lakshmi Mahal",
    address: "Kovai – Sathy Road, Kovilpalayam",
    city: "Coimbatore",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Mahal+Kovilpalayam+Coimbatore",
    calendarDetails: {
      title: "Wedding Reception: Manoj & Ranjani",
      description: "Wedding Reception of Manoj & Ranjani at Sri Lakshmi Mahal, Kovilpalayam, Coimbatore.",
      startDate: "20261121T123000Z", // 18:00 IST = 12:30 UTC
      endDate: "20261121T153000Z"    // 21:00 IST = 15:30 UTC
    }
  },

  families: {
    introLabel: "WITH LOVE & BLESSINGS",
    heading: "Our families",
    familyOne: {
      father: "Mr. R. Sivasamy",
      mother: "Mrs. S. Devi",
      relation: "Parents of Groom"
    },
    familyTwo: {
      father: "Mr. P. Kathirvel",
      mother: "Mrs. K. Kavithamani",
      relation: "Parents of Bride"
    },
    invitationCopy: "Cordially invite you and your family to grace the joyous union of our families at the wedding of our children.",
    closingBlessing: "Your presence and blessings mean the world to us."
  },

  timeline: [
    {
      id: "event-01",
      date: "21 NOVEMBER 2026",
      day: "SATURDAY",
      time: "06:00 PM — 09:00 PM",
      title: "Reception",
      tag: "THE EVENING CELEBRATION",
      venue: "Sri Lakshmi Mahal",
      address: "Kovai – Sathy Road, Kovilpalayam, Coimbatore",
      description: "Join us for an enchanting evening of music, felicitations, and an authentic banquet dinner as both families unite."
    },
    {
      id: "event-02",
      date: "22 NOVEMBER 2026",
      day: "SUNDAY",
      time: "06:00 AM — 07:15 AM",
      title: "Wedding Ceremony",
      tag: "AUSPICIOUS MUHURTHAM",
      venue: "Sri Lakshmi Mahal",
      address: "Kovai – Sathy Road, Kovilpalayam, Coimbatore",
      description: "The traditional auspicious Vedic wedding rituals and Mangalya Dharanam, followed by traditional South Indian breakfast feast."
    }
  ],

  venue: {
    name: "Sri Lakshmi Mahal",
    addressLine1: "Kovai – Sathy Road",
    addressLine2: "Kovilpalayam",
    city: "Coimbatore, Tamil Nadu",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Mahal+Kovilpalayam+Coimbatore",
    embedMapQuery: "Sri+Lakshmi+Mahal+Kovilpalayam+Coimbatore",
    travelNotes: [
      {
        title: "Coimbatore Int'l Airport (CJB)",
        distance: "~ 18 km",
        description: "Approximately 30 minutes via NH 544 and Sathy Road."
      },
      {
        title: "Coimbatore Junction (CBE)",
        distance: "~ 21 km",
        description: "Around 40 minutes drive via Sathy Road / Kovai arterial route."
      },
      {
        title: "Valet & Guest Parking",
        distance: "On Premises",
        description: "Spacious dedicated parking available within the mahal grounds."
      }
    ]
  },

  gallery: [
    {
      id: "gal-1",
      src: "/images/gallery-01.jpg",
      alt: "Manoj & Ranjani - Editorial Portrait",
      caption: "Quiet glances, eternal promises.",
      aspectRatio: "portrait",
      placeholderLabel: "COUPLE PORTRAIT I"
    },
    {
      id: "gal-2",
      src: "/images/gallery-02.jpg",
      alt: "Manoj & Ranjani - Traditional Moment",
      caption: "Cherished traditions and family joy.",
      aspectRatio: "landscape",
      placeholderLabel: "TRADITIONAL CELEBRATION"
    },
    {
      id: "gal-3",
      src: "/images/gallery-03.jpg",
      alt: "Manoj & Ranjani - Candid Laughter",
      caption: "Moments of unspoken joy.",
      aspectRatio: "tall",
      placeholderLabel: "CANDID PORTRAIT"
    },
    {
      id: "gal-4",
      src: "/images/gallery-04.jpg",
      alt: "Manoj & Ranjani - Hand in Hand",
      caption: "Walking toward tomorrow, together.",
      aspectRatio: "portrait",
      placeholderLabel: "EDITORIAL MOMENT"
    },
    {
      id: "gal-5",
      src: "/images/gallery-05.jpg",
      alt: "Sri Lakshmi Mahal Atmosphere",
      caption: "The majestic venue awaiting our loved ones.",
      aspectRatio: "landscape",
      placeholderLabel: "VENUE AMBIENCE"
    },
    {
      id: "gal-6",
      src: "/images/gallery-06.jpg",
      alt: "Manoj & Ranjani - Sunset Silhouette",
      caption: "Where forever quietly begins.",
      aspectRatio: "landscape",
      placeholderLabel: "SUNSET EMBRACE"
    }
  ],

  music: {
    src: "/assets/wedding-music.mp3",
    title: "Auspicious Mangala Isai",
    artist: "Traditional Instrumental"
  },

  meta: {
    siteTitle: "Manoj & Ranjani — Wedding Invitation",
    siteDescription: "You are cordially invited to celebrate the joyous wedding of R.S. Manoj & K. Ranjani on 22 November 2026 at Sri Lakshmi Mahal, Kovilpalayam, Coimbatore.",
    shareUrl: typeof window !== "undefined" ? window.location.href : "https://rs-invite.vercel.app/",
    whatsappMessage: "We cordially invite you and your family to celebrate the wedding of R.S. Manoj & K. Ranjani on 21 & 22 November 2026 at Sri Lakshmi Mahal, Kovilpalayam, Coimbatore. Please view our interactive invitation: "
  }
};
