import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OWNER_PROFILE } from "../data/ownerProfile";
import { suggestedUsers, trendingTags } from "../data/sampleData";
import type { ViewableUser } from "./PostCard";

interface RightSidebarProps {
  onViewUser?: (user: ViewableUser) => void;
}

export function RightSidebar({ onViewUser }: RightSidebarProps) {
  const [users, setUsers] = useState(suggestedUsers);

  const toggleFollow = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, following: !u.following } : u)),
    );
  };

  return (
    <aside className="hidden xl:flex flex-col w-80 shrink-0 gap-5">
      {/* Suggested */}
      <div className="bg-card rounded-xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Suggested for You
        </h3>
        <div className="flex flex-col gap-3">
          {/* Owner always first */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity text-left"
              onClick={() =>
                onViewUser?.({
                  name: OWNER_PROFILE.name,
                  username: OWNER_PROFILE.username,
                  avatar: OWNER_PROFILE.avatar,
                })
              }
              data-ocid="suggest.owner"
            >
              <img
                src={OWNER_PROFILE.avatar}
                alt={OWNER_PROFILE.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {OWNER_PROFILE.username} ✅
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Official Account
                </p>
              </div>
            </button>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              Follow
            </span>
          </div>

          {users.map((user, i) => (
            <div key={user.id} className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity text-left"
                onClick={() =>
                  onViewUser?.({
                    name: user.name,
                    username: user.username,
                    avatar: user.avatar,
                  })
                }
                data-ocid={`suggest.item.${i + 1}`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.mutual}
                  </p>
                </div>
              </button>
              <Button
                data-ocid="suggest.follow.button"
                size="sm"
                variant={user.following ? "secondary" : "default"}
                onClick={() => toggleFollow(user.id)}
                className={`text-xs px-3 h-7 ${
                  user.following
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {user.following ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      <div className="bg-card rounded-xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Trending Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-accent transition-colors text-xs"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground px-1">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Built with love using caffeine.ai
        </a>
      </p>
    </aside>
  );
}
