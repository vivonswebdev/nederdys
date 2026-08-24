import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChildMode } from "@/contexts/ChildModeContext";

const ProfileSelect = () => {
  const { children, setActiveChildId, loading } = useChild();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isChildMode, enterChildMode } = useChildMode();
  const navigate = useNavigate();

  // Choisir un enfant verrouille l'appareil sur son espace :
  // ses jeux, son classement, sa page dédiée. Retour au menu parent = code PIN.
  const pick = (id: string) => {
    setActiveChildId(id);
    setParentSession(false);
    enterChildMode(id);
    navigate(`/child/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
          {t("profiles.title")}
        </h1>
        <p className="text-center text-muted-foreground mb-10 font-dyslexic">
          {t("profiles.subtitle")}
        </p>

        {!user ? (
          <div className="text-center">
            <Link
              to="/auth"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold"
            >
              {t("nav.login")}
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {children.map((c, i) => (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => pick(c.id)}
                  className="bg-card border-2 border-border rounded-3xl p-6 kids-shadow-card flex flex-col items-center gap-2"
                >
                  <span className="text-5xl">{c.avatar_emoji}</span>
                  <span className="font-bold text-foreground">{c.first_name}</span>
                  <span className="text-xs text-muted-foreground">{c.age} ans</span>
                </motion.button>
              ))}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/ajouter-enfant"
                  className="h-full bg-muted border-2 border-dashed border-border rounded-3xl p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground"
                >
                  <UserPlus className="w-8 h-8" />
                  <span className="text-sm font-medium text-center">{t("profiles.add")}</span>
                </Link>
              </motion.div>
            </div>

            {!loading && children.length === 0 && (
              <p className="text-center text-muted-foreground mt-8">{t("profiles.empty")}</p>
            )}

            {!isChildMode && (
              <div className="text-center mt-12">
                <Link
                  to="/parents"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <BarChart3 className="w-4 h-4" /> {t("profiles.parents")}
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ProfileSelect;
