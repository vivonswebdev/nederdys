import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChildren,
  getChildCoins,
  getPurchasedItems,
  purchaseItem,
  spendCoins,
  toggleEquipItem,
} from "@/lib/database";
import { sounds } from "@/lib/sounds";
import { Navbar } from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

interface ShopItem {
  id: string;
  name: { fr: string; nl: string };
  category: "hat" | "background" | "skin";
  price: number;
  emoji: string;
  preview: string; // CSS class or emoji for preview
}

const SHOP_ITEMS: ShopItem[] = [
  // Hats
  { id: "hat_crown", name: { fr: "Couronne royale", nl: "Koninklijke kroon" }, category: "hat", price: 30, emoji: "👑", preview: "👑" },
  { id: "hat_wizard", name: { fr: "Chapeau magicien", nl: "Toverhoed" }, category: "hat", price: 25, emoji: "🎩", preview: "🎩" },
  { id: "hat_party", name: { fr: "Chapeau de fête", nl: "Feesthoed" }, category: "hat", price: 15, emoji: "🥳", preview: "🎉" },
  { id: "hat_pirate", name: { fr: "Bandana pirate", nl: "Piratenbandana" }, category: "hat", price: 20, emoji: "🏴‍☠️", preview: "🏴‍☠️" },
  { id: "hat_flower", name: { fr: "Couronne de fleurs", nl: "Bloemenkrans" }, category: "hat", price: 20, emoji: "🌸", preview: "🌸" },
  { id: "hat_cap", name: { fr: "Casquette sport", nl: "Sportpet" }, category: "hat", price: 10, emoji: "🧢", preview: "🧢" },
  // Backgrounds
  { id: "bg_beach", name: { fr: "Plage tropicale", nl: "Tropisch strand" }, category: "background", price: 40, emoji: "🏖️", preview: "bg-gradient-to-b from-sky-400 to-yellow-200" },
  { id: "bg_space", name: { fr: "Espace sidéral", nl: "De ruimte" }, category: "background", price: 50, emoji: "🚀", preview: "bg-gradient-to-b from-indigo-950 to-purple-900" },
  { id: "bg_forest", name: { fr: "Forêt enchantée", nl: "Betoverd bos" }, category: "background", price: 35, emoji: "🌲", preview: "bg-gradient-to-b from-green-800 to-emerald-500" },
  { id: "bg_candy", name: { fr: "Pays des bonbons", nl: "Snoepjesland" }, category: "background", price: 45, emoji: "🍭", preview: "bg-gradient-to-b from-pink-400 to-fuchsia-300" },
  // Skins
  { id: "skin_gold", name: { fr: "Grenouille dorée", nl: "Gouden kikker" }, category: "skin", price: 60, emoji: "✨", preview: "text-yellow-400" },
  { id: "skin_blue", name: { fr: "Grenouille glacée", nl: "IJskikker" }, category: "skin", price: 40, emoji: "❄️", preview: "text-cyan-400" },
  { id: "skin_pink", name: { fr: "Grenouille rose", nl: "Roze kikker" }, category: "skin", price: 35, emoji: "🌸", preview: "text-pink-400" },
  { id: "skin_rainbow", name: { fr: "Grenouille arc-en-ciel", nl: "Regenboogkikker" }, category: "skin", price: 80, emoji: "🌈", preview: "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400" },
];

const CATEGORIES = [
  { id: "hat" as const, fr: "Chapeaux", nl: "Hoeden", icon: "🎩" },
  { id: "background" as const, fr: "Décors", nl: "Decors", icon: "🖼️" },
  { id: "skin" as const, fr: "Couleurs", nl: "Kleuren", icon: "🎨" },
];

const ShopPage = () => {
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const queryClient = useQueryClient();
  const [activeCategory, setActiveCategory] = useState<"hat" | "background" | "skin">("hat");
  const [purchasing, setPurchasing] = useState(false);

  const { data: children = [] } = useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });

  const activeChild = children[0];

  const { data: coinsData } = useQuery({
    queryKey: ["childCoins", activeChild?.id],
    queryFn: () => getChildCoins(activeChild!.id),
    enabled: !!activeChild,
  });

  const { data: purchasedItems = [] } = useQuery({
    queryKey: ["purchasedItems", activeChild?.id],
    queryFn: () => getPurchasedItems(activeChild!.id),
    enabled: !!activeChild,
  });

  const coins = coinsData?.coins ?? 0;

  const purchasedIds = useMemo(
    () => new Set(purchasedItems.map((p) => p.item_id)),
    [purchasedItems]
  );
  const equippedIds = useMemo(
    () => new Set(purchasedItems.filter((p) => p.equipped).map((p) => p.item_id)),
    [purchasedItems]
  );

  const filteredItems = SHOP_ITEMS.filter((item) => item.category === activeCategory);

  const handlePurchase = useCallback(
    async (item: ShopItem) => {
      if (!user || !activeChild || purchasing) return;
      if (purchasedIds.has(item.id)) return;
      if (coins < item.price) {
        toast({ title: lang === "fr" ? "Pas assez de Mouche-Coins !" : "Niet genoeg Vlieg-Munten!", variant: "destructive" });
        return;
      }

      setPurchasing(true);
      const success = await spendCoins(activeChild.id, item.price);
      if (success) {
        await purchaseItem(user.id, activeChild.id, item.id);
        sounds.correct();
        toast({ title: lang === "fr" ? `${item.name.fr} acheté ! 🎉` : `${item.name.nl} gekocht! 🎉` });
        queryClient.invalidateQueries({ queryKey: ["childCoins"] });
        queryClient.invalidateQueries({ queryKey: ["purchasedItems"] });
      }
      setPurchasing(false);
    },
    [user, activeChild, purchasing, purchasedIds, coins, lang, queryClient]
  );

  const handleEquip = useCallback(
    async (itemId: string) => {
      if (!activeChild) return;
      const isEquipped = equippedIds.has(itemId);
      await toggleEquipItem(activeChild.id, itemId, !isEquipped);
      sounds.click();
      queryClient.invalidateQueries({ queryKey: ["purchasedItems"] });
    },
    [activeChild, equippedIds, queryClient]
  );

  // Find equipped items for mascot preview
  const equippedHat = SHOP_ITEMS.find((i) => i.category === "hat" && equippedIds.has(i.id));
  const equippedBg = SHOP_ITEMS.find((i) => i.category === "background" && equippedIds.has(i.id));
  const equippedSkin = SHOP_ITEMS.find((i) => i.category === "skin" && equippedIds.has(i.id));

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-2xl py-16 text-center">
          <p className="text-muted-foreground">{t("dashboard.loginRequired")}</p>
          <Link to="/auth" className="text-primary underline mt-2 inline-block">{t("dashboard.loginLink")}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-4xl py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" /> {t("game.back")}
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              {lang === "fr" ? "Boutique 🐸" : "Winkel 🐸"}
            </h1>
          </div>
          <motion.div
            className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2"
            key={coins}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-lg">🪙</span>
            <span className="font-bold text-secondary-foreground">{coins}</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mascot Preview */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
                {lang === "fr" ? "Ta mascotte" : "Jouw mascotte"}
              </h3>
              <motion.div
                className={`relative rounded-3xl p-8 flex flex-col items-center justify-center aspect-square border-2 border-border ${
                  equippedBg ? equippedBg.preview : "bg-gradient-to-b from-emerald-100 to-emerald-50 dark:from-emerald-950 dark:to-emerald-900"
                }`}
                layout
              >
                {/* Hat */}
                {equippedHat && (
                  <motion.div
                    className="text-4xl -mb-2 z-10"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    key={equippedHat.id}
                  >
                    {equippedHat.preview}
                  </motion.div>
                )}
                {/* Frog */}
                <motion.div
                  className={`text-7xl ${equippedSkin?.preview || ""}`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🐸
                </motion.div>
                {/* Name */}
                {activeChild && (
                  <p className="mt-3 text-sm font-bold text-foreground bg-background/70 rounded-full px-3 py-1">
                    {activeChild.avatar_emoji} {activeChild.first_name}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Shop Items */}
          <div className="md:col-span-2 space-y-6">
            {/* Category Tabs */}
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{lang === "fr" ? cat.fr : cat.nl}</span>
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const owned = purchasedIds.has(item.id);
                  const equipped = equippedIds.has(item.id);
                  const canAfford = coins >= item.price;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative rounded-2xl border-2 p-4 transition-all ${
                        equipped
                          ? "border-primary bg-primary/10"
                          : owned
                          ? "border-border bg-card"
                          : canAfford
                          ? "border-border bg-card hover:border-primary/50 cursor-pointer"
                          : "border-border bg-muted/50 opacity-60"
                      }`}
                    >
                      {/* Item emoji */}
                      <div className="text-center mb-3">
                        <span className="text-4xl">{item.emoji}</span>
                      </div>

                      {/* Name */}
                      <h4 className="text-sm font-bold text-foreground text-center mb-1">
                        {lang === "fr" ? item.name.fr : item.name.nl}
                      </h4>

                      {/* Price or status */}
                      <div className="text-center mt-3">
                        {owned ? (
                          <Button
                            size="sm"
                            variant={equipped ? "default" : "outline"}
                            onClick={() => handleEquip(item.id)}
                            className="w-full"
                          >
                            {equipped ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                {lang === "fr" ? "Équipé" : "Uitgerust"}
                              </>
                            ) : (
                              lang === "fr" ? "Équiper" : "Uitrusten"
                            )}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handlePurchase(item)}
                            disabled={!canAfford || purchasing}
                            className="w-full"
                          >
                            {canAfford ? (
                              <>
                                <ShoppingBag className="w-3 h-3 mr-1" />
                                🪙 {item.price}
                              </>
                            ) : (
                              <>
                                <Lock className="w-3 h-3 mr-1" />
                                🪙 {item.price}
                              </>
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Equipped badge */}
                      {equipped && (
                        <motion.div
                          className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Sparkles className="w-3 h-3" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
