import { motion } from "framer-motion";
import { Star, Sparkles, BookOpen, Trophy, BarChart3, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import mascot from "@/assets/mascot.png";
import heroBg from "@/assets/hero-bg.jpg";
import { FloatingStars } from "@/components/FloatingStars";
import { GameCard } from "@/components/GameCard";
import { Navbar } from "@/components/Navbar";

const games = [
  { id: "syllabes", title: "Syllabes Magiques", desc: "Glisse les syllabes dans les bonnes cases !", icon: "✨", color: "bg-kids-green-light", level: "Adaptatif", route: "/jeu/syllabes" },
  { id: "chasse", title: "Chasse aux Mots", desc: "Attrape les bons mots qui volent !", icon: "🎈", color: "bg-kids-yellow", level: "Adaptatif", route: "/jeu/chasse" },
  { id: "memoire", title: "Mémoire Sonore", desc: "Retrouve les paires de sons NL !", icon: "🔊", color: "bg-kids-blue", level: "Adaptatif", route: "/jeu/memoire" },
  { id: "phonemes", title: "Phonèmes Danseurs", desc: "Clique les sons dans le bon ordre !", icon: "💃", color: "bg-kids-pink", level: "Adaptatif", route: "/jeu/phonemes" },
  { id: "dictee", title: "Dictée IA Visuelle", desc: "Écoute et choisis la bonne phrase !", icon: "📝", color: "bg-kids-purple", level: "Adaptatif", route: "/jeu/dictee" },
  { id: "lettres", title: "Lettres Magnétiques", desc: "Construis des mots NL lettre par lettre !", icon: "🧲", color: "bg-kids-orange", level: "Adaptatif", route: "/jeu/lettres" },
];

const Index = () => {
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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-medium text-secondary-foreground">Spécialement conçu pour la dyslexie</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
              Apprends le{" "}
              <span className="text-primary">néerlandais</span>
              <br />
              en t'amusant ! 🎉
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 font-dyslexic">
              30 jeux adaptés aux enfants DYS de 6-12 ans. 
              Phonologie, vocabulaire et lecture en néerlandais avec IA personnalisée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/jeu/syllabes">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Jouer maintenant !
                </motion.button>
              </Link>
              <Link to="/parents">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-card text-foreground border-2 border-border px-8 py-4 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Espace Parents
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <motion.img
              src={mascot}
              alt="Kikker, la mascotte"
              className="w-48 md:w-72 drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary/5 py-8">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16 px-4">
          {[
            { icon: <Gamepad2 />, val: "30", label: "Jeux IA" },
            { icon: <Star />, val: "100%", label: "Adapté DYS" },
            { icon: <BookOpen />, val: "500+", label: "Mots NL" },
            { icon: <Trophy />, val: "🏆", label: "Badges" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Choisis ton jeu ! 🎮
            </h2>
            <p className="text-muted-foreground text-lg">
              Chaque jeu s'adapte à ton niveau grâce à l'IA
            </p>
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
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            Pourquoi NederDys ? 🌟
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "IA Personnalisée", desc: "L'IA détecte tes erreurs et adapte les exercices à tes besoins DYS" },
              { icon: "🎯", title: "Focus Phonologie NL", desc: "Sons spécifiques néerlandais /ʏ/ /œ/ avec surlignage syllabique" },
              { icon: "👨‍👩‍👧", title: "Dashboard Parents", desc: "Suivez les progrès avec des graphiques détaillés et des alertes" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-6 kids-shadow-card text-center"
              >
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="container max-w-xl"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prêt à apprendre ? 🚀
          </h2>
          <p className="text-muted-foreground mb-6">
            Essai gratuit · 5 jeux offerts · Sans engagement
          </p>
          <Link to="/jeu/syllabes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-xl font-bold shadow-lg"
            >
              Commencer gratuitement ⭐
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © 2026 NederDys · Apprentissage néerlandais adapté dyslexie · Meise, Belgique
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Conforme RGPD enfants · Police OpenDyslexic · IA adaptative
        </p>
      </footer>
    </div>
  );
};

export default Index;
