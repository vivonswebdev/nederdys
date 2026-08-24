import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  BarChart3,
  Home,
  LogIn,
  LogOut,
  UserPlus,
  Globe,
  ShoppingBag,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getChildLevel, getChildCoins } from "@/lib/database";
import { useChild } from "@/contexts/ChildContext";
import { LevelBadge } from "./LevelBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChildMode } from "@/contexts/ChildModeContext";
import { ChildSwitcher } from "./child/ChildSwitcher";

export const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { activeChild } = useChild();
  const { isChildMode } = useChildMode();
  // Espaces enfants : on masque aussi les accès parent (+ Enfant, Déconnexion).
  const inChildSpace =
    isChildMode ||
    ["/child", "/jouer", "/eveil", "/jeu", "/classement", "/boutique", "/avatar"].some((p) =>
      location.pathname.startsWith(p)
    );
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const { data: childLevel } = useQuery({
    queryKey: ["childLevel", activeChild?.id],
    queryFn: () => getChildLevel(activeChild!.id),
    enabled: !!activeChild,
  });

  const { data: coinsData } = useQuery({
    queryKey: ["childCoins", activeChild?.id],
    queryFn: () => getChildCoins(activeChild!.id),
    enabled: !!activeChild,
  });

  const links = [
    { to: user ? "/accueil" : "/", icon: <Home className="w-4 h-4" />, label: t("nav.home") },
    { to: "/jouer", icon: <Gamepad2 className="w-4 h-4" />, label: t("nav.play") },
    { to: "/classement", icon: <Trophy className="w-4 h-4" />, label: "Classement" },
    ...(inChildSpace
      ? []
      : [{ to: "/parents", icon: <BarChart3 className="w-4 h-4" />, label: t("nav.parents") }]),
  ];

  const linkClass = (to: string) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      location.pathname === to
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border"
    >
      <div className="container flex items-center justify-between h-16 gap-2 px-3 sm:px-4">
        <Link to={user ? "/accueil" : "/"} className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🐸</span>
          <span className="hidden sm:inline text-lg sm:text-xl font-bold text-primary">
            NederDys
          </span>
        </Link>

        {user && <ChildSwitcher />}

        {/* Desktop / tablet navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.icon}
              <span className="hidden lg:inline">{link.label}</span>
            </Link>
          ))}

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
              {childLevel && <LevelBadge level={childLevel.level} xp={childLevel.xp} compact />}
              <Link
                to="/boutique"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden lg:inline">🪙 {coinsData?.coins ?? 0}</span>
              </Link>
              {!inChildSpace && (
                <>
                  <Link
                    to="/ajouter-enfant"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden lg:inline">{t("nav.child")}</span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">{t("nav.logout")}</span>
                  </button>
                </>
              )}
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden lg:inline">{t("nav.login")}</span>
            </Link>
          )}
        </div>

        {/* Mobile: coins + burger */}
        <div className="flex md:hidden items-center gap-1">
          {user && (
            <Link
              to="/boutique"
              aria-label="Boutique"
              className="flex items-center gap-1 px-2 py-2 rounded-full text-sm font-bold text-muted-foreground hover:bg-accent"
            >
              🪙 <span className="tabular-nums">{coinsData?.coins ?? 0}</span>
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="p-2 rounded-xl text-foreground hover:bg-accent transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col p-3 gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${linkClass(link.to)} !rounded-xl py-3 text-base`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/boutique"
                    className={`${linkClass("/boutique")} !rounded-xl py-3 text-base`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Boutique · 🪙 {coinsData?.coins ?? 0}</span>
                  </Link>
                  {!inChildSpace && (
                    <Link
                      to="/ajouter-enfant"
                      className={`${linkClass("/ajouter-enfant")} !rounded-xl py-3 text-base`}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{t("nav.child")}</span>
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/auth" className={`${linkClass("/auth")} !rounded-xl py-3 text-base`}>
                  <LogIn className="w-4 h-4" />
                  <span>{t("nav.login")}</span>
                </Link>
              )}

              <div className="flex items-center gap-2 pt-2 mt-1 border-t border-border">
                <button
                  onClick={() => setLang(lang === "fr" ? "nl" : "fr")}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-sm font-bold bg-muted text-muted-foreground"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{lang === "fr" ? "NL" : "FR"}</span>
                </button>
                {user && !inChildSpace && (
                  <button
                    onClick={signOut}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-sm font-bold bg-destructive/10 text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("nav.logout")}</span>
                  </button>
                )}
              </div>

              {user && childLevel && (
                <div className="pt-2">
                  <LevelBadge level={childLevel.level} xp={childLevel.xp} compact />
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
