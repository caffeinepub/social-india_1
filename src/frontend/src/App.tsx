import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { LeftSidebar } from "./components/LeftSidebar";
import type { ViewableUser } from "./components/PostCard";
import type { SamplePost } from "./data/sampleData";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { CreatePostPage } from "./pages/CreatePostPage";
import { ExplorePage } from "./pages/ExplorePage";
import { FeedPage } from "./pages/FeedPage";
import { LoginPage } from "./pages/LoginPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { UserProfilePage } from "./pages/UserProfilePage";

type View = "feed" | "search" | "explore" | "profile" | "create";

function loadFollowedUsers(): Set<string> {
  try {
    const saved = localStorage.getItem("followed_users");
    if (saved) {
      return new Set(JSON.parse(saved) as string[]);
    }
  } catch {
    // ignore
  }
  return new Set();
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const [currentView, setCurrentView] = useState<View>("feed");
  const [selectedPost, setSelectedPost] = useState<SamplePost | null>(null);
  const [viewingUser, setViewingUser] = useState<ViewableUser | null>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(() =>
    loadFollowedUsers(),
  );
  const [myStory, setMyStory] = useState<string | null>(null);

  const myAvatar = localStorage.getItem("profile_photo");
  const myName = localStorage.getItem("profile_name") || "Social India User";

  // Persist followed users whenever they change
  useEffect(() => {
    localStorage.setItem("followed_users", JSON.stringify([...followedUsers]));
  }, [followedUsers]);

  const handleToggleFollow = (username: string) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(username)) {
        next.delete(username);
      } else {
        next.add(username);
      }
      return next;
    });
  };

  const handleViewUser = (user: ViewableUser) => {
    setViewingUser(user);
    setSelectedPost(null);
  };

  const handleNavigate = (v: View) => {
    setCurrentView(v);
    setSelectedPost(null);
    setViewingUser(null);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div
          data-ocid="app.loading_state"
          className="flex flex-col items-center gap-4"
        >
          <img
            src="/assets/uploads/black_and_white_modern_personal_logo-019d3425-4c26-710f-8fd1-3d8297e1d3a9-1.png"
            alt="Social India"
            className="w-20 h-20 rounded-full animate-pulse object-cover shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          />
          <p className="text-sm text-muted-foreground">
            Loading Social India...
          </p>
          <p className="text-xs font-medium" style={{ color: "#FF9933" }}>
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <>
        <LoginPage />
        <Toaster />
      </>
    );
  }

  const renderMain = () => {
    if (selectedPost) {
      return (
        <PostDetailPage
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      );
    }

    if (viewingUser) {
      return (
        <UserProfilePage
          user={viewingUser}
          onBack={() => setViewingUser(null)}
          onOpenPost={(post) => {
            setSelectedPost(post);
            setViewingUser(null);
          }}
          onViewUser={handleViewUser}
          followedUsers={followedUsers}
          onToggleFollow={handleToggleFollow}
        />
      );
    }

    if (currentView === "feed") {
      return (
        <FeedPage
          onOpenPost={setSelectedPost}
          onViewUser={handleViewUser}
          myAvatar={myAvatar}
          myName={myName}
          myStory={myStory}
          onCreateStory={setMyStory}
        />
      );
    }
    if (currentView === "search")
      return <SearchPage onViewUser={handleViewUser} />;
    if (currentView === "explore")
      return <ExplorePage onOpenPost={setSelectedPost} />;
    if (currentView === "profile")
      return (
        <ProfilePage
          onOpenPost={setSelectedPost}
          onViewUser={handleViewUser}
          followingCount={followedUsers.size}
        />
      );
    if (currentView === "create") return <CreatePostPage />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <LeftSidebar currentView={currentView} onNavigate={handleNavigate} />
      <main className="lg:pl-64 min-h-screen">
        <div className="px-4 py-6 lg:px-8 pb-24 lg:pb-6">{renderMain()}</div>
      </main>
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
      <Toaster />
    </div>
  );
}
