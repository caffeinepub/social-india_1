export interface SamplePost {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: SampleComment[];
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
  tags: string[];
}

export interface SampleComment {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
}

export interface SampleStory {
  id: string;
  username: string;
  avatar: string;
  seen: boolean;
}

export interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutual: string;
  following: boolean;
}

export const sampleStories: SampleStory[] = [
  {
    id: "1",
    username: "priya.sharma",
    avatar:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=D946EF&color=fff&size=80",
    seen: false,
  },
  {
    id: "2",
    username: "arjun.kapoor",
    avatar:
      "https://ui-avatars.com/api/?name=Arjun+Kapoor&background=7C3AED&color=fff&size=80",
    seen: false,
  },
  {
    id: "3",
    username: "neha.gupta",
    avatar:
      "https://ui-avatars.com/api/?name=Neha+Gupta&background=F97316&color=fff&size=80",
    seen: false,
  },
  {
    id: "4",
    username: "rahul.singh",
    avatar:
      "https://ui-avatars.com/api/?name=Rahul+Singh&background=22C55E&color=fff&size=80",
    seen: true,
  },
  {
    id: "5",
    username: "ananya.patel",
    avatar:
      "https://ui-avatars.com/api/?name=Ananya+Patel&background=EF4444&color=fff&size=80",
    seen: false,
  },
  {
    id: "6",
    username: "vikram.nair",
    avatar:
      "https://ui-avatars.com/api/?name=Vikram+Nair&background=3B82F6&color=fff&size=80",
    seen: true,
  },
];

export const samplePosts: SamplePost[] = [
  {
    id: "1",
    authorName: "Priya Sharma",
    authorUsername: "priya.sharma",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=D946EF&color=fff&size=80",
    imageUrl: "https://picsum.photos/seed/india1/800/600",
    caption:
      "Golden hour at the Taj Mahal — nothing compares to this magic ✨ #TajMahal #IncredibleIndia",
    likes: 2847,
    comments: [
      {
        id: "c1",
        authorName: "Arjun Kapoor",
        authorUsername: "arjun.kapoor",
        authorAvatar:
          "https://ui-avatars.com/api/?name=Arjun+Kapoor&background=7C3AED&color=fff&size=40",
        text: "Absolutely breathtaking shot! 😍",
        timestamp: "2h ago",
      },
      {
        id: "c2",
        authorName: "Neha Gupta",
        authorUsername: "neha.gupta",
        authorAvatar:
          "https://ui-avatars.com/api/?name=Neha+Gupta&background=F97316&color=fff&size=40",
        text: "On my bucket list forever 🙏",
        timestamp: "1h ago",
      },
    ],
    timestamp: "3h ago",
    liked: false,
    bookmarked: false,
    tags: ["TajMahal", "IncredibleIndia"],
  },
  {
    id: "2",
    authorName: "Arjun Kapoor",
    authorUsername: "arjun.kapoor",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Arjun+Kapoor&background=7C3AED&color=fff&size=80",
    imageUrl: "https://picsum.photos/seed/india2/800/900",
    caption:
      "Street food tour through Old Delhi — the flavours are unreal 🍛 #DelhiFood #StreetFood",
    likes: 1523,
    comments: [
      {
        id: "c3",
        authorName: "Vikram Nair",
        authorUsername: "vikram.nair",
        authorAvatar:
          "https://ui-avatars.com/api/?name=Vikram+Nair&background=3B82F6&color=fff&size=40",
        text: "Now I'm hungry 😋",
        timestamp: "45m ago",
      },
    ],
    timestamp: "5h ago",
    liked: true,
    bookmarked: false,
    tags: ["DelhiFood", "StreetFood"],
  },
  {
    id: "3",
    authorName: "Neha Gupta",
    authorUsername: "neha.gupta",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Neha+Gupta&background=F97316&color=fff&size=80",
    imageUrl: "https://picsum.photos/seed/india3/800/700",
    caption:
      "Holi festival colours — when the whole world becomes a canvas 🎨 #Holi #FestivalOfColours",
    likes: 4102,
    comments: [
      {
        id: "c4",
        authorName: "Priya Sharma",
        authorUsername: "priya.sharma",
        authorAvatar:
          "https://ui-avatars.com/api/?name=Priya+Sharma&background=D946EF&color=fff&size=40",
        text: "Best festival in the world! 🌈",
        timestamp: "2h ago",
      },
    ],
    timestamp: "8h ago",
    liked: false,
    bookmarked: true,
    tags: ["Holi", "FestivalOfColours"],
  },
  {
    id: "4",
    authorName: "Rahul Singh",
    authorUsername: "rahul.singh",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Rahul+Singh&background=22C55E&color=fff&size=80",
    imageUrl: "https://picsum.photos/seed/india4/800/800",
    caption:
      "Kerala backwaters at dawn — serenity personified 🌊 #Kerala #Backwaters",
    likes: 892,
    comments: [],
    timestamp: "1d ago",
    liked: false,
    bookmarked: false,
    tags: ["Kerala", "Backwaters"],
  },
  {
    id: "5",
    authorName: "Ananya Patel",
    authorUsername: "ananya.patel",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Ananya+Patel&background=EF4444&color=fff&size=80",
    imageUrl: "https://picsum.photos/seed/india5/800/600",
    caption:
      "Jaipur's Pink City architecture never gets old 🏰 #Jaipur #PinkCity #Rajasthan",
    likes: 1670,
    comments: [
      {
        id: "c5",
        authorName: "Arjun Kapoor",
        authorUsername: "arjun.kapoor",
        authorAvatar:
          "https://ui-avatars.com/api/?name=Arjun+Kapoor&background=7C3AED&color=fff&size=40",
        text: "The architecture is incredible 🏛️",
        timestamp: "5h ago",
      },
    ],
    timestamp: "1d ago",
    liked: true,
    bookmarked: true,
    tags: ["Jaipur", "PinkCity", "Rajasthan"],
  },
  {
    id: "6",
    authorName: "Vikram Nair",
    authorUsername: "vikram.nair",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Vikram+Nair&background=3B82F6&color=fff&size=80",
    imageUrl: "https://picsum.photos/seed/india6/800/1000",
    caption:
      "Sunrise trek at Hampi ruins — 5am but worth every step 🌅 #Hampi #Karnataka #Ruins",
    likes: 3245,
    comments: [
      {
        id: "c6",
        authorName: "Neha Gupta",
        authorUsername: "neha.gupta",
        authorAvatar:
          "https://ui-avatars.com/api/?name=Neha+Gupta&background=F97316&color=fff&size=40",
        text: "Goals! 🙌",
        timestamp: "3h ago",
      },
    ],
    timestamp: "2d ago",
    liked: false,
    bookmarked: false,
    tags: ["Hampi", "Karnataka", "Ruins"],
  },
];

export const suggestedUsers: SuggestedUser[] = [
  {
    id: "s1",
    name: "Kavya Reddy",
    username: "kavya.reddy",
    avatar:
      "https://ui-avatars.com/api/?name=Kavya+Reddy&background=EC4899&color=fff&size=60",
    mutual: "Followed by priya.sharma",
    following: false,
  },
  {
    id: "s2",
    name: "Rohan Mehta",
    username: "rohan.mehta",
    avatar:
      "https://ui-avatars.com/api/?name=Rohan+Mehta&background=8B5CF6&color=fff&size=60",
    mutual: "Followed by arjun.kapoor",
    following: false,
  },
  {
    id: "s3",
    name: "Deepika Iyer",
    username: "deepika.iyer",
    avatar:
      "https://ui-avatars.com/api/?name=Deepika+Iyer&background=06B6D4&color=fff&size=60",
    mutual: "New to Social India",
    following: false,
  },
  {
    id: "s4",
    name: "Aditya Joshi",
    username: "aditya.joshi",
    avatar:
      "https://ui-avatars.com/api/?name=Aditya+Joshi&background=F59E0B&color=fff&size=60",
    mutual: "Followed by rahul.singh",
    following: false,
  },
];

export const trendingTags = [
  "IncredibleIndia",
  "Diwali2026",
  "MonsoonVibes",
  "DesiFood",
  "Heritage",
  "MumbaiDiaries",
  "BollywoodLife",
  "YogaDay",
];
