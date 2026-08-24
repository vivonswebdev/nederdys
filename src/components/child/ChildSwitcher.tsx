import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Lock } from "lucide-react";
import { useChild } from "@/contexts/ChildContext";
import { useChildMode } from "@/contexts/ChildModeContext";
import { ParentLogin } from "@/components/parent/ParentLogin";
import { setParentSession } from "@/lib/pin";
import { AvatarRenderer } from "./AvatarRenderer";

/**
 * Pastille en haut à gauche : avatar + prénom de l'enfant connecté.
 * Clic → menu de changement de profil. En mode enfant, le changement
 * exige le code PIN parent (protection de l'espace des frères/sœurs).
 */
export function ChildSwitcher() {
  const { children, activeChild, setActiveChildId } = useChild();
  const { isChildMode, enterChildMode } = useChildMode();
  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!activeChild) return null;

  const applySwitch = (id: string) => {
    setActiveChildId(id);
    if (isChildMode) {
      setParentSession(false);
      enterChildMode(id);
    }
    setOpen(false);
    setPendingId(null);
    navigate(`/child/${id}`);
  };

  const handlePick = (id: string) => {
    if (id === activeChild.id) {
      setOpen(false);
      navigate(`/child/${id}`);
      return;
    }
    if (isChildMode) {
      setPendingId(id);
      setOpen(false);
      return;
    }
    applySwitch(id);
  };

  return (
    <>
      <div className="relative shrink-0">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-muted hover:bg-accent transition-colors min-h-[44px]"
        >
          <AvatarRenderer
            seed={activeChild.first_name}
            gender={(activeChild as { gender?: string }).gender}
            size="xs"
            className="!w-9 !h-9 !border-2"
          />
          <span className="font-bold text-sm text-foreground max-w-[7rem] truncate">
            {activeChild.first_name}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div
              role="menu"
              className="absolute left-0 mt-2 z-50 w-56 rounded-2xl border border-border bg-card shadow-lg p-2"
            >
              {children.map((c) => (
                <button
                  key={c.id}
                  role="menuitem"
                  onClick={() => handlePick(c.id)}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-xl text-left min-h-[44px] ${
                    c.id === activeChild.id
                      ? "bg-primary/10 text-primary font-bold"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  <AvatarRenderer
                    seed={c.first_name}
                    gender={(c as { gender?: string }).gender}
                    size="xs"
                    className="!w-8 !h-8 !border-2"
                  />
                  <span className="flex-1 truncate text-sm">{c.first_name}</span>
                  {isChildMode && c.id !== activeChild.id && (
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {pendingId && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <ParentLogin
              onSuccess={() => applySwitch(pendingId)}
              onCancel={() => setPendingId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ChildSwitcher;
