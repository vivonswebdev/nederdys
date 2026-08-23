import { useEffect, useState } from "react";
import { ArrowLeft, RotateCcw, Save, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useChild } from "@/contexts/ChildContext";
import {
  AvatarCategory,
  AvatarConfig,
  AvatarItem,
  CATEGORY_LABELS,
  CATEGORY_TO_OPTION,
  getAvatarConfig,
  getOwnedItems,
  saveAvatarConfig,
} from "@/lib/avatar";
import { AvatarRenderer } from "@/components/child/AvatarRenderer";
import { sounds } from "@/lib/sounds";

const TABS: AvatarCategory[] = ["hairstyle", "hair", "accessory", "background", "clothing"];

const AvatarEditor = () => {
  const { id: childId } = useParams<{ id: string }>();
  const { children } = useChild();
  const child = children.find((c) => c.id === childId);
  const [config, setConfig] = useState<AvatarConfig>({});
  const [activeTab, setActiveTab] = useState<AvatarCategory>("hairstyle");
  const [saving, setSaving] = useState(false);

  const { data: owned = [] } = useQuery({
    queryKey: ["avatarOwned", childId],
    queryFn: () => getOwnedItems(childId!),
    enabled: !!childId,
  });
  const { data: savedConfig } = useQuery({
    queryKey: ["avatarConfig", childId],
    queryFn: () => getAvatarConfig(childId!),
    enabled: !!childId,
  });

  useEffect(() => {
    if (savedConfig) setConfig(savedConfig);
  }, [savedConfig]);

  const seed = child?.first_name ?? "nederdys";

  function handleSelect(item: AvatarItem) {
    sounds.click();
    const option = CATEGORY_TO_OPTION[item.category];
    setConfig((prev) => ({
      ...prev,
      [option]: prev[option] === item.dicebear_value ? null : item.dicebear_value,
    }));
  }

  async function handleSave() {
    if (!childId) return;
    setSaving(true);
    try {
      await saveAvatarConfig(childId, config);
      sounds.victory();
      toast.success("Avatar sauvegardé ! 🎉");
    } catch {
      toast.error("Impossible de sauvegarder l'avatar.");
    } finally {
      setSaving(false);
    }
  }

  const tabItems = owned.filter((i) => i.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-4xl px-4 py-3 flex items-center gap-4">
          <Link
            to={childId ? `/child/${childId}` : "/profils"}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <h1 className="text-lg font-bold text-foreground flex-1">🎨 Mon avatar</h1>
          <Link
            to={childId ? `/child/${childId}/boutique` : "#"}
            className="inline-flex items-center gap-1 text-sm font-bold text-kids-orange"
          >
            <ShoppingBag className="w-4 h-4" /> Boutique
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-8 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <AvatarRenderer seed={seed} options={config} size="lg" animated />
          <p className="font-bold text-foreground">{child?.first_name}</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-bold text-sm ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {CATEGORY_LABELS[tab]}
              </button>
            ))}
          </div>

          {tabItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun item dans cette catégorie. Va faire un tour à la boutique 🛍️
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {tabItems.map((item) => {
                const option = CATEGORY_TO_OPTION[item.category];
                const selected = config[option] === item.dicebear_value;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    title={item.name}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition-colors ${
                      selected ? "border-kids-green-dark bg-kids-green-light/20" : "border-transparent bg-muted"
                    }`}
                  >
                    <AvatarRenderer seed={seed} options={{ [option]: item.dicebear_value }} size="xs" />
                    <span className="text-[11px] text-center text-muted-foreground">{item.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold disabled:opacity-60"
            >
              <Save className="w-4 h-4" /> Sauvegarder
            </button>
            <button
              onClick={() => setConfig({})}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-muted text-foreground py-3 rounded-xl font-bold"
            >
              <RotateCcw className="w-4 h-4" /> Réinitialiser
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvatarEditor;
