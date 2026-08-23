import { motion } from "framer-motion";
import { Star, Sparkles, BookOpen, Trophy, BarChart3, Gamepad2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import mascot from "@/assets/mascot.png";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingStars } from "@/components/FloatingStars";
import { GameCard } from "@/components/GameCard";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const games = [
    { id: "syllabes", title: t("game.syllabes.title"), desc: t("game.syllabes.desc"), icon: "✨", color: "bg-kids-green-light", level: t("games.adaptive"), route: "/jeu/syllabes" },
    { id: "chasse", title: t("game.chasse.title"), desc: t("game.chasse.desc"), icon: "🎈", color: "bg-kids-yellow", level: t("games.adaptive"), route: "/jeu/chasse" },
    { id: "memoire", title: t("game.memoire.title"), desc: t("game.memoire.desc"), icon: "🔊", color: "bg-kids-blue", level: t("games.adaptive"), route: "/jeu/memoire" },
    { id: "phonemes", title: t("game.phonemes.title"), desc: t("game.phonemes.desc"), icon: "💃", color: "bg-kids-pink", level: t("games.adaptive"), route: "/jeu/phonemes" },
    { id: "dictee", title: t("game.dictee.title"), desc: t("game.dictee.desc"), icon: "📝", color: "bg-kids-purple", level: t("games.adaptive"), route: "/jeu/dictee" },
    { id: "lettres", title: t("game.lettres.title"), desc: t("game.lettres.desc"), icon: "🧲", color: "bg-kids-orange", level: t("games.adaptive"), route: "/jeu/lettres" },
    { id: "burger", title: t("game.burger.title"), desc: t("game.burger.desc"), icon: "🍔", color: "bg-kids-red", level: t("games.adaptive"), route: "/jeu/burger" },
    { id: "graphemes", title: t("game.graphemes.title"), desc: t("game.graphemes.desc"), icon: "🏴‍☠️", color: "bg-sky-700", level: t("games.adaptive"), route: "/jeu/graphemes" },
    { id: "train", title: t("game.train.title"), desc: t("game.train.desc"), icon: "🚂", color: "bg-emerald-600", level: t("games.adaptive"), route: "/jeu/train" },
    { id: "miroir", title: t("game.miroir.title"), desc: t("game.miroir.desc"), icon: "🪞", color: "bg-violet-600", level: t("games.adaptive"), route: "/jeu/miroir" },
    { id: "fauxamis", title: t("game.fauxamis.title"), desc: t("game.fauxamis.desc"), icon: "🤝", color: "bg-amber-700", level: t("games.adaptive"), route: "/jeu/faux-amis" },
    { id: "phare", title: t("game.phare.title"), desc: t("game.phare.desc"), icon: "🏠", color: "bg-cyan-800", level: t("games.adaptive"), route: "/jeu/phare" },
    { id: "peintre", title: t("game.peintre.title"), desc: t("game.peintre.desc"), icon: "🎨", color: "bg-pink-700", level: t("games.adaptive"), route: "/jeu/peintre" },
    { id: "puzzle", title: t("game.puzzle.title"), desc: t("game.puzzle.desc"), icon: "🧩", color: "bg-teal-700", level: t("games.adaptive"), route: "/jeu/puzzle" },
    { id: "pont", title: t("game.pont.title"), desc: t("game.pont.desc"), icon: "🌉", color: "bg-indigo-700", level: t("games.adaptive"), route: "/jeu/pont" },
    { id: "trieur", title: t("game.trieur.title"), desc: t("game.trieur.desc"), icon: "🗂️", color: "bg-lime-700", level: t("games.adaptive"), route: "/jeu/trieur" },
    { id: "mur", title: t("game.mur.title"), desc: t("game.mur.desc"), icon: "🧱", color: "bg-red-800", level: t("games.adaptive"), route: "/jeu/mur" },
    { id: "oreille", title: t("game.oreille.title"), desc: t("game.oreille.desc"), icon: "👂", color: "bg-fuchsia-700", level: t("games.adaptive"), route: "/jeu/oreille" },
    { id: "tir", title: t("game.tir.title"), desc: t("game.tir.desc"), icon: "🎯", color: "bg-rose-700", level: t("games.adaptive"), route: "/jeu/tir" },
    { id: "mottroue", title: t("game.mottroue.title"), desc: t("game.mottroue.desc"), icon: "🕳️", color: "bg-stone-700", level: t("games.adaptive"), route: "/jeu/mot-troue" },
    { id: "chrono", title: t("game.chrono.title"), desc: t("game.chrono.desc"), icon: "⏱️", color: "bg-blue-800", level: t("games.adaptive"), route: "/jeu/chrono" },
    { id: "mouton", title: t("game.mouton.title"), desc: t("game.mouton.desc"), icon: "🐑", color: "bg-neutral-800", level: t("games.adaptive"), route: "/jeu/mouton" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        </div>
        <FloatingStars />
        
        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-8 px-4 py-16">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 text-center lg:text-left">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }} className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-medium text-secondary-foreground">{t("hero.badge")}</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
              {t("hero.title1")}{" "}
              <span className="text-primary">{t("hero.title2")}</span>
              <br />
              {t("hero.title3")}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 font-dyslexic">{t("hero.desc")}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/profils">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" /> {t("hero.play")}
                </motion.button>
              </Link>
              <Link to="/parents">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-card text-foreground border-2 border-border px-8 py-4 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-shadow flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" /> {t("hero.parents")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex-shrink-0">
            <motion.img src={mascot} alt="Kikker, la mascotte" className="w-48 md:w-72 drop-shadow-2xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary/5 py-8">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16 px-4">
          {[
            { icon: <Gamepad2 />, val: "30", label: t("stats.games") },
            { icon: <Star />, val: "100%", label: t("stats.adapted") },
            { icon: <BookOpen />, val: "500+", label: t("stats.words") },
            { icon: <Trophy />, val: "🏆", label: t("stats.badges") },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-1">
              <div className="text-primary w-6 h-6">{s.icon}</div>
              <span className="text-2xl font-bold text-foreground">{s.val}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("games.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("games.subtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {games.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="kids-gradient-hero py-16 px-4">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">{t("features.title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: t("feature.ai.title"), desc: t("feature.ai.desc") },
              { icon: "🎯", title: t("feature.phono.title"), desc: t("feature.phono.desc") },
              { icon: "👨‍👩‍👧", title: t("feature.parent.title"), desc: t("feature.parent.desc") },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="bg-card rounded-2xl p-6 kids-shadow-card text-center">
                <span className="text-4xl mb-3 block">{f.icon}</span>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="container max-w-xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("cta.title")}</h2>
          <p className="text-muted-foreground mb-6">{t("cta.desc")}</p>
          <Link to="/profils">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-xl font-bold shadow-lg">
              {t("cta.button")}
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4 text-center">
        <p className="text-muted-foreground text-sm">{t("footer.line1")}</p>
        <p className="text-muted-foreground text-xs mt-1">{t("footer.line2")}</p>
      </footer>
    </div>
  );
};

export default Index;
