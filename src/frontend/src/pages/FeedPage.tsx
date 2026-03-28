import { useState } from "react";
import { PostCard } from "../components/PostCard";
import type { ViewableUser } from "../components/PostCard";
import { RightSidebar } from "../components/RightSidebar";
import { StoriesRow } from "../components/StoriesRow";
import { StoryViewerModal } from "../components/StoryViewerModal";
import { type SamplePost, samplePosts } from "../data/sampleData";

interface FeedPageProps {
  onOpenPost: (post: SamplePost) => void;
  onViewUser?: (user: ViewableUser) => void;
  myAvatar?: string | null;
  myName?: string;
  myStory?: string | null;
  onCreateStory?: (dataUrl: string) => void;
}

export function FeedPage({
  onOpenPost,
  onViewUser,
  myAvatar,
  myName,
  myStory,
  onCreateStory,
}: FeedPageProps) {
  const [featured, ...rest] = samplePosts;
  const [viewingStory, setViewingStory] = useState<{
    username: string;
    avatar: string;
  } | null>(null);

  const handleViewMyStory = () => {
    if (myStory) {
      setViewingStory({ username: myName || "You", avatar: myStory });
    }
  };

  return (
    <div className="flex gap-8 max-w-5xl mx-auto">
      {/* Main feed */}
      <div className="flex-1 min-w-0">
        {/* App heading */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src="/assets/uploads/black_and_white_modern_personal_logo-019d3425-4c26-710f-8fd1-3d8297e1d3a9-1.png"
            alt="Social India"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Social India
          </h1>
        </div>

        {/* Stories */}
        <section className="bg-card rounded-xl p-4 mb-5 shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
          <StoriesRow
            onViewStory={setViewingStory}
            myAvatar={myAvatar}
            myName={myName}
            myStory={myStory}
            onCreateStory={onCreateStory}
            onViewMyStory={handleViewMyStory}
          />
        </section>

        {/* Featured post */}
        <div className="mb-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Feed
          </h2>
          <PostCard
            post={featured}
            onOpenDetail={onOpenPost}
            onViewUser={onViewUser}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4" data-ocid="feed.list">
          {rest.map((post, i) => (
            <div key={post.id} data-ocid={`feed.item.${i + 1}`}>
              <PostCard
                post={post}
                onOpenDetail={onOpenPost}
                onViewUser={onViewUser}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <RightSidebar onViewUser={onViewUser} />

      {/* Story viewer */}
      <StoryViewerModal
        story={viewingStory}
        onClose={() => setViewingStory(null)}
      />
    </div>
  );
}
