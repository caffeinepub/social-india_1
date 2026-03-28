import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Camera, Grid3X3, MapPin, Users } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PostCard } from "../components/PostCard";
import type { ViewableUser } from "../components/PostCard";
import {
  type SamplePost,
  samplePosts,
  sampleStories,
  suggestedUsers,
} from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface ProfilePageProps {
  onOpenPost: (post: SamplePost) => void;
  onViewUser?: (user: ViewableUser) => void;
  followingCount?: number;
}

export function ProfilePage({
  onOpenPost,
  onViewUser,
  followingCount = 0,
}: ProfilePageProps) {
  const { identity } = useInternetIdentity();
  const [isEditing, setIsEditing] = useState(false);

  const [displayName, setDisplayName] = useState(
    () => localStorage.getItem("profile_name") || "Social India User",
  );
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    () => localStorage.getItem("profile_photo") || null,
  );
  const [bio, setBio] = useState(
    () =>
      localStorage.getItem("profile_bio") ||
      "📸 Capturing India's beauty one frame at a time",
  );

  const [nameInput, setNameInput] = useState(displayName);
  const [bioInput, setBioInput] = useState(bio);
  const [photoPreview, setPhotoPreview] = useState<string | null>(profilePhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const myPosts = samplePosts;
  const savedPosts = samplePosts.filter((_, i) => i % 2 !== 0);

  const principal = identity?.getPrincipal().toString() ?? "Anonymous";
  const shortPrincipal =
    principal.length > 16
      ? `${principal.slice(0, 8)}...${principal.slice(-4)}`
      : principal;

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    setDisplayName(nameInput);
    setBio(bioInput);
    localStorage.setItem("profile_name", nameInput);
    localStorage.setItem("profile_bio", bioInput);
    if (photoPreview) {
      setProfilePhoto(photoPreview);
      localStorage.setItem("profile_photo", photoPreview);
    }
    setIsEditing(false);
    toast.success("Profile saved!");
  }

  function handleEdit() {
    setNameInput(displayName);
    setBioInput(bio);
    setPhotoPreview(profilePhoto);
    setIsEditing(true);
  }

  const allFollowers = [
    ...sampleStories.map((s) => ({
      id: s.id,
      name: s.username
        .split(".")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" "),
      username: s.username,
      avatar: s.avatar,
    })),
    ...suggestedUsers.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
    })),
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile header */}
      <div className="flex items-start gap-8 mb-8">
        <div className="relative shrink-0">
          <div className="story-ring">
            <div className="bg-background rounded-full p-0.5">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={displayName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[oklch(0.76_0.17_60)] flex items-center justify-center text-2xl font-bold text-white">
                  {initials || "SI"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
            {identity && (
              <span title="Owner" className="text-lg select-none">
                ✅
              </span>
            )}
            {!isEditing && (
              <Button
                data-ocid="profile.edit_button"
                variant="secondary"
                size="sm"
                onClick={handleEdit}
                className="bg-muted text-foreground hover:bg-accent"
              >
                Edit Profile
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-3">
            @{shortPrincipal}
          </p>

          <div className="flex gap-6 mb-3">
            <span className="text-sm">
              <strong>{myPosts.length}</strong>{" "}
              <span className="text-muted-foreground">posts</span>
            </span>
            <span className="text-sm">
              <strong>{allFollowers.length}</strong>{" "}
              <span className="text-muted-foreground">followers</span>
            </span>
            <span className="text-sm">
              <strong>{followingCount}</strong>{" "}
              <span className="text-muted-foreground">following</span>
            </span>
          </div>

          {!isEditing && (
            <>
              <p className="text-sm text-foreground mb-1">{bio}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> India
              </p>
            </>
          )}

          {isEditing && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <Button
                  data-ocid="profile.upload_button"
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs"
                >
                  Change Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              <Input
                data-ocid="profile.input"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Display name"
                className="bg-muted border-border text-foreground"
              />

              <textarea
                data-ocid="profile.textarea"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full bg-muted rounded-lg p-2 text-sm text-foreground resize-none border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                rows={2}
                placeholder="Bio"
              />

              <div className="flex gap-2">
                <Button
                  data-ocid="profile.save_button"
                  size="sm"
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Profile
                </Button>
                <Button
                  data-ocid="profile.cancel_button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts">
        <TabsList className="w-full bg-muted border-b border-border rounded-none mb-4">
          <TabsTrigger
            data-ocid="profile.posts.tab"
            value="posts"
            className="flex-1 gap-2"
          >
            <Grid3X3 className="w-4 h-4" /> Posts
          </TabsTrigger>
          <TabsTrigger
            data-ocid="profile.saved.tab"
            value="saved"
            className="flex-1 gap-2"
          >
            <Bookmark className="w-4 h-4" /> Saved
          </TabsTrigger>
          <TabsTrigger
            data-ocid="profile.followers.tab"
            value="followers"
            className="flex-1 gap-2"
          >
            <Users className="w-4 h-4" /> Followers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1" data-ocid="profile.list">
            {myPosts.map((post, i) => (
              <div key={post.id} data-ocid={`profile.item.${i + 1}`}>
                <PostCard post={post} onOpenDetail={onOpenPost} compact />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <div className="grid grid-cols-3 gap-1">
            {savedPosts.map((post, i) => (
              <div key={post.id} data-ocid={`profile.saved.item.${i + 1}`}>
                <PostCard post={post} onOpenDetail={onOpenPost} compact />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="followers">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            data-ocid="profile.followers.list"
          >
            {allFollowers.map((follower, i) => (
              <button
                key={follower.id}
                type="button"
                data-ocid={`profile.item.${i + 1}`}
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
