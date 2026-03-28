import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useState } from "react";
import type { SamplePost } from "../data/sampleData";

interface PostDetailPageProps {
  post: SamplePost;
  onBack: () => void;
}

export function PostDetailPage({ post, onBack }: PostDetailPageProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        authorName: "You",
        authorUsername: "you",
        authorAvatar:
          "https://ui-avatars.com/api/?name=You&background=22C55E&color=fff&size=40",
        text: commentText,
        timestamp: "Just now",
      },
    ]);
    setCommentText("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        type="button"
        data-ocid="detail.back.button"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-card rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-3/5">
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sidebar */}
        <div className="md:w-2/5 flex flex-col">
          {/* Author */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-9 h-9 rounded-full"
              />
              <p className="text-sm font-semibold text-foreground">
                {post.authorUsername}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Caption */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm text-foreground">
              <span className="font-semibold">{post.authorUsername}</span>{" "}
              {post.caption}
            </p>
          </div>

          {/* Comments */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
            style={{ maxHeight: "300px" }}
          >
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3"
                data-ocid="detail.comment.row"
              >
                <img
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  className="w-7 h-7 rounded-full shrink-0"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">
                      {comment.authorUsername}
                    </span>{" "}
                    <span className="text-foreground">{comment.text}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {comment.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p
                className="text-sm text-muted-foreground text-center py-4"
                data-ocid="detail.empty_state"
              >
                No comments yet. Be the first!
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleLike}
                  data-ocid="detail.like.toggle"
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${liked ? "fill-[oklch(0.76_0.17_60)] text-[oklch(0.76_0.17_60)]" : "text-foreground"}`}
                  />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-foreground" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <Send className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Bookmark className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <p className="text-sm font-semibold text-foreground mb-3">
              {likeCount.toLocaleString()} likes
            </p>
          </div>

          {/* Comment input */}
          <div className="border-t border-border px-4 py-3 flex gap-2">
            <Input
              data-ocid="detail.comment.input"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
              className="bg-muted border-none text-sm h-9 text-foreground"
            />
            <Button
              data-ocid="detail.comment.submit_button"
              size="sm"
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
