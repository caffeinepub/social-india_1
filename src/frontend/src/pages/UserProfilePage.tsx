import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Grid3X3, MapPin, Users } from "lucide-react";
import { OWNER_USERNAME } from "../App";
import { PostCard } from "../components/PostCard";
import type { ViewableUser } from "../components/PostCard";
import { OWNER_PROFILE } from "../data/ownerProfile";
import { samplePosts, sampleStories, suggestedUsers } from "../data/sampleData";
import type { SamplePost } from "../data/sampleData";

const BIO_MAP: Record<string, string> = {
  "priya.sharma":
    "✨ Travel & photography enthusiast | Taj Mahal sunrise chaser 📸 | Delhi based",
  "arjun.kapoor":
    "🍛 Foodie exploring every lane of India | Street food evangelist | Chef wannabe",
  "neha.gupta":
    "🎨 Artist & festival lover | Holi is life | Colors make the world beautiful 🌈",
  "rahul.singh":
    "🌊 Kerala backwaters soul | Sunrise trekker | Nature over everything",
  "ananya.patel":
    "🏰 Heritage & architecture lover | Jaipur is home | Rajasthan diaries 🐪",
  "vikram.nair":
    "🌅 Adventure seeker | Hampi ruins & Karnataka stories | 5am club member",
  "kavya.reddy":
    "🌸 Hyderabad queen | Biryani connoisseur | Fashion & lifestyle ✨",
  "rohan.mehta":
    "🏏 Cricket fanatic | Mumbai streets | Dreaming of Bollywood stardom 🎬",
  "deepika.iyer":
    "🌿 Yoga & wellness journey | Chennai sunrise | New to Social India 🇮🇳",
  "aditya.joshi":
    "🎵 Pune music scene | Chai conversations | Exploring India one city at a time",
  [OWNER_USERNAME]: OWNER_PROFILE.bio,
};

const FOLLOWERS_MAP: Record<string, number> = {
  "priya.sharma": 12400,
  "arjun.kapoor": 8720,
  "neha.gupta": 5300,
  "rahul.singh": 3100,
  "ananya.patel": 7650,
  "vikram.nair": 9870,
  [OWNER_USERNAME]: OWNER_PROFILE.followers,
};

interface UserProfilePageProps {
  user: ViewableUser;
  onBack: () => void;
  onOpenPost: (post: SamplePost) => void;
  onViewUser?: (user: ViewableUser) => void;
  followedUsers: Set<string>;
  onToggleFollow: (username: string) => void;
}

export function UserProfilePage({
  user,
  onBack,
  onOpenPost,
  onViewUser,
  followedUsers,
  onToggleFollow,
}: UserProfilePageProps) {
  const isOwner = user.username === OWNER_USERNAME;
  const following = followedUsers.has(user.username);

  const userPosts = samplePosts.filter(
    (p) => p.authorUsername === user.username,
  );

  const bio =
    BIO_MAP[user.username] ||
    `👋 Hello from ${user.name}! Sharing India's beauty one post at a time 🇮🇳`;
  const followersCount = FOLLOWERS_MAP[user.username] ?? 1200;
  const displayedFollowers = followersCount + (following ? 1 : 0);
  const followingCount = isOwner
    ? OWNER_PROFILE.following
    : Math.floor(followersCount * 0.3);

  const allFollowers = [
    ...sampleStories
      .filter((s) => s.username !== user.username)
      .slice(0, 4)
      .map((s) => ({
        id: s.id,
        name: s.username
          .split(".")
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(" "),
        username: s.username,
        avatar: s.avatar,
      })),
    ...suggestedUsers.slice(0, 2).map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
    })),
  ];

  const formatCount = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-ocid="userprofile.button"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm">Back</span>
      </button>

      {/* Profile header */}
      <div className="flex items-start gap-8 mb-8">
        <div className="shrink-0">
          <div className="story-ring">
            <div className="bg-background rounded-full p-0.5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            {isOwner && (
              <span title="Official Owner" className="text-lg select-none">
                ✅
              </span>
            )}
            {!isOwner && (
              <Button
                data-ocid="userprofile.primary_button"
                size="sm"
                onClick={() => onToggleFollow(user.username)}
                className={
                  following
                    ? "bg-muted text-foreground hover:bg-accent"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                {following ? "Following" : "Follow"}
              </Button>
            )}
            {isOwner && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                Following
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-3">@{user.username}</p>

          <div className="flex gap-6 mb-3">
            <span className="text-sm">
              <strong>{isOwner ? "50+" : userPosts.length}</strong>{" "}
              <span className="text-muted-foreground">posts</span>
            </span>
            <span className="text-sm">
              <strong>{formatCount(displayedFollowers)}</strong>{" "}
              <span className="text-muted-foreground">followers</span>
            </span>
            <span className="text-sm">
              <strong>{formatCount(followingCount)}</strong>{" "}
              <span className="text-muted-foreground">following</span>
            </span>
          </div>

          <p className="text-sm text-foreground mb-1">{bio}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" /> India
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts">
        <TabsList className="w-full bg-muted border-b border-border rounded-none mb-4">
          <TabsTrigger
            data-ocid="userprofile.posts.tab"
            value="posts"
            className="flex-1 gap-2"
          >
            <Grid3X3 className="w-4 h-4" /> Posts
          </TabsTrigger>
          <TabsTrigger
            data-ocid="userprofile.followers.tab"
            value="followers"
            className="flex-1 gap-2"
          >
            <Users className="w-4 h-4" /> Followers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {userPosts.length > 0 ? (
            <div
              className="grid grid-cols-3 gap-1"
              data-ocid="userprofile.list"
            >
              {userPosts.map((post, i) => (
                <div key={post.id} data-ocid={`userprofile.item.${i + 1}`}>
                  <PostCard post={post} onOpenDetail={onOpenPost} compact />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
              data-ocid="userprofile.empty_state"
            >
              <Grid3X3 className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">No posts yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="followers">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            data-ocid="userprofile.followers.list"
          >
            {allFollowers.map((follower, i) => (
              <button
                key={follower.id}
                type="button"
                data-ocid={`userprofile.item.${i + 1}`}
                className="flex flex-col items-center gap-2 bg-card rounded-xl p-4 hover:bg-accent transition-colors"
                onClick={() =>
                  onViewUser?.({
                    name: follower.name,
                    username: follower.username,
                    avatar: follower.avatar,
                  })
                }
              >
                <img
                  src={follower.avatar}
                  alt={follower.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    {follower.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{follower.username}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
