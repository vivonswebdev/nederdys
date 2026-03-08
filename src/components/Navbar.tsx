import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, BarChart3, Home, LogIn, LogOut, UserPlus, Globe, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getChildren, getChildLevel, getChildCoins } from "@/lib/database";
import { LevelBadge } from "./LevelBadge";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { lang, setLang, t } = useLanguage();

  const { data: children = [] } = useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });

  const activeChild = children[0];

  const { data: childLevel } = useQuery({
    queryKey: ["childLevel", activeChild?.id],
    queryFn: () => getChildLevel(activeChild!.id),
    enabled: !!activeChild,
  });
  
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🐸</span>
          <span className="text-xl font-bold text-primary">NederDys</span>
        </Link>
        
        <div className="flex items-center gap-1">
          {[
            { to: "/", icon: <Home className="w-4 h-4" />, label: t("nav.home") },
            { to: "/jeu/syllabes", icon: <Gamepad2 className="w-4 h-4" />, label: t("nav.play") },
            { to: "/parents", icon: <BarChart3 className="w-4 h-4" />, label: t("nav.parents") },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}

          {/* Language selector */}
          <button
            onClick={() => setLang(lang === "fr" ? "nl" : "fr")}
            className="flex items-center gap-1 px-2 py-2 rounded-full text-sm font-bold text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title={lang === "fr" ? "Switch to Nederlands" : "Passer en français"}
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{lang === "fr" ? "NL" : "FR"}</span>
          </button>
          
          {user ? (
            <>
              {childLevel && (
                <LevelBadge level={childLevel.level} xp={childLevel.xp} compact />
              )}
              <Link to="/ajouter-enfant"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.child")}</span>
              </Link>
              <button onClick={signOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.logout")}</span>
              </button>
            </>
          ) : (
            <Link to="/auth"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">{t("nav.login")}</span>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
