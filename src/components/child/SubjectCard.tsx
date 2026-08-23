import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SubjectCardProps {
  subject: "nl" | "fr" | "math";
  title: string;
  icon: string;
  colorClass: string;
  available: boolean;
  gameCount: number;
  childId: string;
  index?: number;
}

export const SubjectCard = ({
  subject,
  title,
  icon,
  colorClass,
  available,
  gameCount,
  childId,
  index = 0,
}: SubjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (available) navigate(`/child/${childId}/${subject}`);
    else toast("Bientôt disponible ! 🚧", { description: `${title} arrive très vite.` });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: available ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative block w-full text-left rounded-3xl p-6 border-2 border-border kids-shadow-card bg-card ${
        available ? "" : "opacity-60"
      }`}
      aria-disabled={!available}
    >
      <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl ${colorClass}`}>
        {icon}
      </span>
      <span className="block font-bold text-foreground text-lg mt-3">{title}</span>
      <span className="block text-sm text-muted-foreground font-dyslexic mt-1">
        {available ? `${gameCount} jeux` : "Bientôt !"}
      </span>
      {!available && (
        <span className="absolute top-4 right-4 text-[11px] font-bold uppercase tracking-wide bg-muted text-muted-foreground rounded-full px-2.5 py-1">
          Coming soon
        </span>
      )}
    </motion.button>
  );
};
