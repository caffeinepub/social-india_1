import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useState } from "react";
import type {
  SamplePost,
  SampleStory,
  SuggestedUser,
} from "../data/sampleData";

export interface ViewableUser {
  name: string;
  username: string;
  avatar: string;
}

interface PostCardProps {
  post: SamplePost;
  onOpenDetail?: (post: SamplePost) => void;
  onViewUser?: (user: ViewableUser) => void;
  compact?: boolean;
}

export function PostCard({
  post,
  onOpenDetail,
  onViewUser,
  compact,
}: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const handleOpen = () => onOpenDetail?.(post);

  const handleViewAuthor = () => {
    if (onViewUser) {
      onViewUser({
        name: post.authorName,
        username: post.authorUsername,
        avatar: post.authorAvatar,
      });
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square w-full"
        onClick={handleOpen}
      >
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <span className="flex items-center gap-1 text-white text-sm font-semibold">
            <Heart className="w-4 h-4 fill-white" />
            {likeCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-white text-sm font-semibold">
            <MessageCircle className="w-4 h-4 fill-white" />
            {post.comments.length}
          </span>
        </div>
      </button>
    );
  }

  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={handleViewAuthor}
          data-ocid="feed.row"
        >
          <div className="story-ring">
            <div className="bg-card rounded-full p-0.5">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">
              {post.authorUsername}
            </p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-muted-foreground"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Image */}
      <button
        type="button"
        className="relative cursor-pointer w-full"
        onClick={handleOpen}
      >
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full object-cover max-h-[500px]"
        />
      </button>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              data-ocid="feed.toggle"
              onClick={handleLike}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  liked
                    ? "fill-[oklch(0.76_0.17_60)] text-[oklch(0.76_0.17_60)]"
                    : "text-foreground"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={handleOpen}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-foreground" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Send className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setBookmarked((b) => !b)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 transition-colors ${
                bookmarked
                  ? "fill-foreground text-foreground"
                  : "text-foreground"
              }`}
            />
          </button>
        </div>
        <p className="text-sm font-semibold text-foreground mb-1">
          {likeCount.toLocaleString()} likes
        </p>
        <p className="text-sm text-foreground">
          <button
            type="button"
            className="font-semibold hover:underline"
            onClick={handleViewAuthor}
          >
            {post.authorUsername}
          </button>{" "}
          {post.caption}
        </p>
        {post.comments.length > 0 && (
          <button
            type="button"
            onClick={handleOpen}
            className="text-xs text-muted-foreground mt-1 hover:text-foreground transition-colors"
          >
            View all {post.comments.length} comments
          </button>
        )}
      </div>
    </article>
  );
}
