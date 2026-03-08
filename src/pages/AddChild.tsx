import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const AVATARS = ["🐸", "🦁", "🐯", "🦊", "🐻", "🐼", "🐰", "🦒"];

const AddChild = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState(8);
  const [avatar, setAvatar] = useState("🐸");
  const [dysLevel, setDysLevel] = useState("moderate");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("children").insert({ user_id: user.id, first_name: name, age, avatar_emoji: avatar, dys_level: dysLevel });
      if (error) throw error;
      toast.success(`${name} ${t("addChild.success")}`);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-md mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">{t("addChild.title")}</h1>
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-6 kids-shadow-card border border-border space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">{t("addChild.name")}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-dyslexic" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">{t("addChild.age")}</label>
              <input type="number" min={3} max={16} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">{t("addChild.avatar")}</label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((a) => (<button key={a} type="button" onClick={() => setAvatar(a)} className={`text-3xl p-2 rounded-xl transition-all ${avatar === a ? "bg-primary/20 ring-2 ring-primary scale-110" : "bg-muted hover:bg-accent"}`}>{a}</button>))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">{t("addChild.level")}</label>
              <select value={dysLevel} onChange={(e) => setDysLevel(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="mild">{t("addChild.mild")}</option>
                <option value="moderate">{t("addChild.moderate")}</option>
                <option value="severe">{t("addChild.severe")}</option>
              </select>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-lg disabled:opacity-50">
              {loading ? "⏳" : t("addChild.submit")}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddChild;
