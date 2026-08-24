import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/contexts/AuthContext";
import { useChildSettings } from "@/hooks/useChildSettings";
import { BadgeCollection } from "@/components/child/BadgeCollection";

const BadgesPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { children, loading } = useChild();
  const navigate = useNavigate();
  useChildSettings(id);

  const child = children.find((c) => c.id === id) ?? null;

  useEffect(() => {
    document.title = "Mes badges — NederDys";
  }, []);

  useEffect(() => {
    if (authLoading || loading) return;
    if (!user) navigate("/auth");
    else if (!child) navigate("/profils", { replace: true });
  }, [authLoading, loading, user, child, navigate]);

  if (!child) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-5xl px-4 py-8">
        <button
          onClick={() => navigate(`/child/${child.id}`)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> <BilingualText {...biFromFr("Retour")} />
        </button>
        <BadgeCollection childId={child.id} />
      </main>
    </div>
  );
};

export default BadgesPage;
