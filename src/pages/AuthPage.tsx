import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AuthPage = () => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(t("auth.loginSuccess"));
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { display_name: displayName } } });
        if (error) throw error;
        if (data.user && data.user.identities?.length === 0) {
          toast.error("Cet email est déjà utilisé.");
        } else if (data.user && !data.session) {
          // Confirmation email activée : l'utilisateur n'est pas encore connecté
          toast.success("Vérifiez vos emails pour confirmer votre compte !");
          setIsLogin(true);
        } else {
          toast.success(t("auth.signupSuccess"));
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-4xl">🐸</span>
          <span className="text-3xl font-bold text-primary">NederDys</span>
        </Link>
        <div className="bg-card rounded-3xl p-8 kids-shadow-card border border-border">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">{isLogin ? t("auth.loginTitle") : t("auth.signupTitle")}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder={t("auth.name")} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input type="email" placeholder={t("auth.email")} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} placeholder={t("auth.password")} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-11 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" required minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-muted-foreground">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg disabled:opacity-50">
              {loading ? t("auth.loading") : isLogin ? t("auth.login") : t("auth.signup")}
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{isLogin ? t("auth.noAccount") : t("auth.hasAccount")}</button>
          </div>
          {isLogin && (<div className="mt-2 text-center"><Link to="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">{t("auth.forgot")}</Link></div>)}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">{t("auth.gdpr")}</p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
