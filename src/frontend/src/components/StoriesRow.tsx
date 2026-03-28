import { Plus } from "lucide-react";
import { useRef } from "react";
import { OWNER_PROFILE } from "../data/ownerProfile";
import { sampleStories } from "../data/sampleData";

interface Story {
  username: string;
  avatar: string;
}

interface StoriesRowProps {
  onViewStory?: (story: Story) => void;
  myAvatar?: string | null;
  myName?: string;
  myStory?: string | null;
  onCreateStory?: (dataUrl: string) => void;
  onViewMyStory?: () => void;
}

export function StoriesRow({
  onViewStory,
  myAvatar,
  myName,
  myStory,
  onCreateStory,
  onViewMyStory,
}: StoriesRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = (myName || "Me")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleMyStoryClick() {
    if (myStory) {
      onViewMyStory?.();
    } else {
      fileInputRef.current?.click();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      onCreateStory?.(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
      {/* My story */}
      <button
        type="button"
        className="flex flex-col items-center gap-1.5 min-w-[64px] group"
        onClick={handleMyStoryClick}
      >
        <div className="relative">
          <div className={myStory ? "story-ring" : "p-0.5"}>
            <div className="bg-card rounded-full p-0.5">
              {myStory ? (
                <img
                  src={myStory}
                  alt="Your story"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : myAvatar ? (
                <img
                  src={myAvatar}
                  alt="Your story"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[oklch(0.76_0.17_60)] flex items-center justify-center text-sm font-bold text-white">
                  {initials}
                </div>
              )}
            </div>
          </div>
          {!myStory && (
            <span
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #FF9933, #FF5733)",
              }}
            >
              <Plus className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground truncate w-full text-center">
          Your Story
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Owner story — always first in feed */}
      <button
        type="button"
        className="flex flex-col items-center gap-1.5 min-w-[64px] group"
        onClick={() =>
          onViewStory?.({
            username: OWNER_PROFILE.username,
            avatar: OWNER_PROFILE.avatar,
          })
        }
        data-ocid="feed.owner_story"
      >
        <div className="story-ring">
          <div className="bg-card rounded-full p-0.5">
            <img
              src={OWNER_PROFILE.avatar}
              alt={OWNER_PROFILE.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground truncate w-full text-center">
          {OWNER_PROFILE.name.split(" ")[0]} ✅
        </span>
      </button>

      {sampleStories.map((story) => (
        <button
          type="button"
          key={story.id}
          className="flex flex-col items-center gap-1.5 min-w-[64px] group"
          onClick={() =>
            onViewStory?.({
              username: story.username,
              avatar: story.avatar,
            })
          }
          data-ocid="feed.item.1"
        >
          <div
            className={
              story.seen ? "p-0.5 rounded-full bg-muted" : "story-ring"
            }
          >
            <div className="bg-card rounded-full p-0.5">
              <img
                src={story.avatar}
                alt={story.username}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs text-muted-foreground truncate w-full text-center">
            {story.username.split(".")[0]}
          </span>
        </button>
      ))}
    </div>
  );
}
