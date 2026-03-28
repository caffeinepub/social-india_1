import { Home, PlusSquare, Search, User } from "lucide-react";

type View = "feed" | "search" | "explore" | "profile" | "create";

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const items = [
    { id: "feed" as View, icon: Home },
    { id: "search" as View, icon: Search },
    { id: "create" as View, icon: PlusSquare },
    { id: "profile" as View, icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md border border-border rounded-full px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {items.map(({ id, icon: Icon }) => (
          <button
            type="button"
            key={id}
            data-ocid={`bottom.${id}.button`}
            onClick={() => onNavigate(id)}
            className={`p-2.5 rounded-full transition-all ${
              currentView === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
