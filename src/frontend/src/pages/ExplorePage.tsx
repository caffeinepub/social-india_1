import { PostCard } from "../components/PostCard";
import { type SamplePost, samplePosts } from "../data/sampleData";

interface ExplorePageProps {
  onOpenPost: (post: SamplePost) => void;
}

export function ExplorePage({ onOpenPost }: ExplorePageProps) {
  const allPosts = [
    ...samplePosts,
    ...samplePosts.map((p) => ({ ...p, id: `${p.id}_x` })),
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-6">Explore</h1>
      <div className="grid grid-cols-3 gap-1 md:gap-2" data-ocid="explore.list">
        {allPosts.map((post, i) => (
          <div key={post.id} data-ocid={`explore.item.${i + 1}`}>
            <PostCard post={post} onOpenDetail={onOpenPost} compact />
          </div>
        ))}
      </div>
    </div>
  );
}
