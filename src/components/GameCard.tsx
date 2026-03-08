import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: {
    id: string;
    title: string;
    desc: string;
    icon: string;
    color: string;
    level: string;
    route: string;
  };
  index: number;
}

export const GameCard = ({ game, index }: GameCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ y: -6, scale: 1.02 }}
  >
    <Link to={game.route}>
      <div className="bg-card rounded-2xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow cursor-pointer border border-border group">
        <div className={`w-14 h-14 ${game.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:animate-wiggle`}>
          {game.icon}
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">{game.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{game.desc}</p>
        <span className="inline-block bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
          {game.level}
        </span>
      </div>
    </Link>
  </motion.div>
);
