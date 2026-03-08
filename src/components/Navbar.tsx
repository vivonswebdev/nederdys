import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, BarChart3, Home, LogIn, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
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
            { to: "/", icon: <Home className="w-4 h-4" />, label: "Accueil" },
            { to: "/jeu/syllabes", icon: <Gamepad2 className="w-4 h-4" />, label: "Jouer" },
            { to: "/parents", icon: <BarChart3 className="w-4 h-4" />, label: "Parents" },
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
          
          {user ? (
            <>
              <Link to="/ajouter-enfant"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">+ Enfant</span>
              </Link>
              <button onClick={signOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déco</span>
              </button>
            </>
          ) : (
            <Link to="/auth"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Connexion</span>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
