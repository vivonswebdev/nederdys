import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ParentLogin } from "@/components/parent/ParentLogin";
import { isParentSessionActive } from "@/lib/pin";

const ParentGate = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    document.title = "Espace parent — NederDys";
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth");
    else if (isParentSessionActive()) navigate("/parent/dashboard");
  }, [loading, user, navigate]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <ParentLogin onSuccess={() => navigate("/parent/dashboard")} />
    </main>
  );
};

export default ParentGate;
