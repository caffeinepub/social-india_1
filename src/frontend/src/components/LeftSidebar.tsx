import { Home, LogOut, PlusSquare, Search, User } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type View = "feed" | "search" | "explore" | "profile" | "create";

interface LeftSidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const navItems = [
  { id: "feed" as View, label: "Home", icon: Home },
  { id: "search" as View, label: "Search", icon: Search },
  { id: "create" as View, label: "Create", icon: PlusSquare },
  { id: "profile" as View, label: "Profile", icon: User },
];

export function LeftSidebar({ currentView, onNavigate }: LeftSidebarProps) {
  const { clear, identity } = useInternetIdentity();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-border px-4 py-6 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <img
          src="/assets/uploads/black_and_white_modern_personal_logo-019d3425-4c26-710f-8fd1-3d8297e1d3a9-1.png"
          alt="Social India"
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-lg font-bold tracking-tight text-foreground">
          Social India
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            type="button"
            key={id}
            data-ocid={`nav.${id}.link`}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentView === id
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>

      {/* User/Logout */}
      {identity && (
        <div className="mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground truncate flex-1">
              {identity.getPrincipal().toString().slice(0, 12)}...
            </span>
          </div>
          <button
            type="button"
            data-ocid="nav.logout.button"
            onClick={clear}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      )}
    </aside>
  );
}
