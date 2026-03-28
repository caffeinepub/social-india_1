import { Search } from "lucide-react";
import { useState } from "react";
import type { ViewableUser } from "../components/PostCard";
import { OWNER_PROFILE } from "../data/ownerProfile";
import { sampleStories, suggestedUsers } from "../data/sampleData";

interface SearchPageProps {
  onViewUser: (user: ViewableUser) => void;
}

function buildUserPool(): ViewableUser[] {
  const ownerUser: ViewableUser = {
    name: OWNER_PROFILE.name,
    username: OWNER_PROFILE.username,
    avatar: OWNER_PROFILE.avatar,
  };
  const storyUsers: ViewableUser[] = sampleStories.map((s) => ({
    name: s.username
      .split(".")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" "),
    username: s.username,
    avatar: s.avatar,
  }));
  const sugUsers: ViewableUser[] = suggestedUsers.map((u) => ({
    name: u.name,
    username: u.username,
    avatar: u.avatar,
  }));
  const seen = new Set<string>();
  return [ownerUser, ...storyUsers, ...sugUsers].filter((u) => {
    if (seen.has(u.username)) return false;
    seen.add(u.username);
    return true;
  });
}

const allUsers = buildUserPool();

export function SearchPage({ onViewUser }: SearchPageProps) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase()),
      )
    : allUsers;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground mb-6">
        Search People
      </h1>

      {/* Search input */}
      <div className="relative mb-6" data-ocid="search.input">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or username…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          data-ocid="search.search_input"
        />
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div
          data-ocid="search.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No users found for "{query}"</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2" data-ocid="search.list">
          {results.map((user, i) => (
            <button
              type="button"
              key={user.username}
              data-ocid={`search.item.${i + 1}`}
              onClick={() => onViewUser(user)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card hover:bg-accent transition-colors text-left group"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary transition-all"
              />
              <div className="flex flex-col flex-1">
                <span className="text-sm font-semibold text-foreground">
                  {user.name}
                  {user.username === OWNER_PROFILE.username && (
                    <span className="ml-1">✅</span>
                  )}
                </span>
                <span className="text-xs text-muted-foreground">
                  @{user.username}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
