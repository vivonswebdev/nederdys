import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Pencil, BarChart3, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { supabase } from "@/integrations/supabase/client";
import {
  ChildSettings,
  DEFAULT_CHILD_SETTINGS,
  exportAllData,
  getChildSettings,
  getParentSettings,
  resetChildProgress,
  updateParentSettings,
  upsertChildSettings,
} from "@/lib/parent";
import { setPin as savePin } from "@/lib/pin";
import { SCHOOL_LEVELS, normalizeSchoolLevel, schoolLevelLabel } from "@/lib/schoolLevels";

const TOGGLES: { key: keyof ChildSettings; label: string; hint: string }[] = [
  { key: "timer_enabled", label: "Chrono activé", hint: "Affiche un compte à rebours dans les jeux rapides" },
  { key: "dyslexic_font", label: "Police OpenDyslexic", hint: "Police adaptée à la dyslexie" },
  { key: "sound_effects", label: "Effets sonores", hint: "Sons de réussite et d'erreur" },
  { key: "reduced_motion", label: "Animations réduites", hint: "Limite les mouvements à l'écran" },
  { key: "colorblind_mode", label: "Mode daltonien", hint: "Palette à fort contraste" },
];

export const SettingsPanel = () => {
  const { user } = useAuth();
  const { children, activeChild, setActiveChildId } = useChild();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<ChildSettings>(DEFAULT_CHILD_SETTINGS);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmoji, setEditEmoji] = useState("");
  const [editLevel, setEditLevel] = useState("");

  const { data: childSettings } = useQuery({
    queryKey: ["childSettings", activeChild?.id],
    queryFn: () => getChildSettings(activeChild!.id),
    enabled: !!activeChild,
  });

  const { data: parentSettings } = useQuery({
    queryKey: ["parentSettings", user?.id],
    queryFn: () => getParentSettings(user!.id),
    enabled: !!user,
  });

  const [email, setEmail] = useState("");
  const [weekly, setWeekly] = useState(false);
  const [stagnation, setStagnation] = useState(false);

  useEffect(() => {
    if (childSettings) {
      setSettings({
        timer_enabled: childSettings.timer_enabled,
        dyslexic_font: childSettings.dyslexic_font,
        sound_effects: childSettings.sound_effects,
        reduced_motion: childSettings.reduced_motion,
        colorblind_mode: childSettings.colorblind_mode,
        dark_mode: childSettings.dark_mode ?? false,
      });
    }
  }, [childSettings]);

  useEffect(() => {
    if (parentSettings) {
      setEmail(parentSettings.parent_email ?? "");
      setWeekly(parentSettings.weekly_email);
      setStagnation(parentSettings.stagnation_alert);
    }
  }, [parentSettings]);

  const toggleSetting = async (key: keyof ChildSettings, value: boolean) => {
    if (!user || !activeChild) return;
    setSettings((s) => ({ ...s, [key]: value }));
    await upsertChildSettings(user.id, activeChild.id, { [key]: value });
    queryClient.invalidateQueries({ queryKey: ["childSettings", activeChild.id] });
    toast.success("Réglage enregistré");
  };

  const saveNotifications = async () => {
    if (!user) return;
    await updateParentSettings(user.id, {
      parent_email: email || null,
      weekly_email: weekly,
      stagnation_alert: stagnation,
    });
    queryClient.invalidateQueries({ queryKey: ["parentSettings", user.id] });
    toast.success("Notifications enregistrées");
  };

  const submitPin = async () => {
    if (!user) return;
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      toast.error("Le nouveau code doit contenir 4 chiffres.");
      return;
    }
    if (newPin !== confirmPin) {
      toast.error("Les deux nouveaux codes ne correspondent pas.");
      return;
    }
    const res = await savePin(newPin, oldPin);
    if (res.ok === true) {
      toast.success("Code PIN mis à jour");
      setOldPin("");
      setNewPin("");
      setConfirmPin("");
    } else if (res.reason === "wrong_old_pin") {
      toast.error("Ancien code incorrect");
    } else {
      toast.error("Modification impossible");
    }
  };

  const startEdit = (c: (typeof children)[number]) => {
    setEditing(c.id);
    setEditName(c.first_name);
    setEditEmoji(c.avatar_emoji);
    setEditLevel(normalizeSchoolLevel(c.school_level));
  };

  const saveEdit = async (id: string) => {
    const { error } = await supabase
      .from("children")
      .update({ first_name: editName, avatar_emoji: editEmoji, school_level: editLevel })
      .eq("id", id);
    if (error) return toast.error("Échec de la modification");
    setEditing(null);
    queryClient.invalidateQueries({ queryKey: ["children"] });
    toast.success("Profil mis à jour");
  };

  const deleteChild = async (id: string) => {
    const { error } = await supabase.from("children").delete().eq("id", id);
    if (error) return toast.error("Suppression impossible");
    queryClient.invalidateQueries({ queryKey: ["children"] });
    toast.success("Profil supprimé");
  };

  const doResetProgress = async () => {
    if (!activeChild) return;
    await resetChildProgress(activeChild.id);
    queryClient.invalidateQueries();
    toast.success("Progression réinitialisée");
  };

  const doExport = async () => {
    if (!user) return;
    const data = await exportAllData(user.id);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nederdys-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Accessibilité */}
      <section className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-1">Accessibilité</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Réglages appliqués au profil {activeChild ? activeChild.first_name : "sélectionné"}.
        </p>
        <div className="space-y-4">
          {TOGGLES.map((t) => (
            <div key={t.key} className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor={t.key} className="text-foreground">
                  {t.label}
                </Label>
                <p className="text-xs text-muted-foreground">{t.hint}</p>
              </div>
              <Switch
                id={t.key}
                checked={settings[t.key]}
                disabled={!activeChild}
                onCheckedChange={(v) => toggleSetting(t.key, v)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Profils */}
      <section className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-4">Gestion des profils</h2>
        <div className="space-y-3">
          {children.map((c) => (
            <div key={c.id} className="border border-border rounded-lg p-3">
              {editing === c.id ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    value={editEmoji}
                    onChange={(e) => setEditEmoji(e.target.value)}
                    className="w-16 text-center"
                    aria-label="Avatar"
                  />
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-40"
                    aria-label="Prénom"
                  />
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    aria-label="Niveau scolaire"
                  >
                    {SCHOOL_LEVELS.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                  <Button size="sm" onClick={() => saveEdit(c.id)}>
                    Enregistrer
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                    Annuler
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl">{c.avatar_emoji}</span>
                  <span className="font-medium text-foreground">{c.first_name}</span>
                  <span className="text-xs text-muted-foreground">{schoolLevelLabel(c.school_level)}</span>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => startEdit(c)}>
                      <Pencil className="w-3.5 h-3.5" /> Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() => {
                        setActiveChildId(c.id);
                        navigate("/parent/dashboard");
                      }}
                    >
                      <BarChart3 className="w-3.5 h-3.5" /> Voir les stats
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive gap-1.5">
                          <Trash2 className="w-3.5 h-3.5" /> Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer {c.first_name} ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Toutes les données de ce profil seront définitivement effacées.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteChild(c.id)}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 gap-1.5" onClick={() => navigate("/ajouter-enfant")}>
          <Plus className="w-4 h-4" /> Ajouter un enfant
        </Button>
      </section>

      {/* Sécurité */}
      <section className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-4">Sécurité</h2>
        <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
          <div>
            <Label htmlFor="oldpin">Ancien code</Label>
            <Input id="oldpin" type="password" maxLength={4} inputMode="numeric" value={oldPin}
              onChange={(e) => setOldPin(e.target.value.replace(/\D/g, "").slice(0, 4))} />
          </div>
          <div>
            <Label htmlFor="newpin">Nouveau code</Label>
            <Input id="newpin" type="password" maxLength={4} inputMode="numeric" value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4))} />
          </div>
          <div>
            <Label htmlFor="confpin">Confirmer</Label>
            <Input id="confpin" type="password" maxLength={4} inputMode="numeric" value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 4))} />
          </div>
        </div>
        <Button className="mt-3" onClick={submitPin}>
          Changer le code PIN
        </Button>

        <div className="border border-destructive/40 rounded-lg p-4 mt-6">
          <p className="font-medium text-destructive mb-2">Zone sensible</p>
          <div className="flex flex-wrap gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={!activeChild}>
                  Réinitialiser la progression
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Réinitialiser la progression ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    XP, niveaux, badges et séries de {activeChild?.first_name} seront remis à zéro.
                    L'historique des parties est conservé.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={doResetProgress}>Réinitialiser</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" className="gap-1.5" onClick={doExport}>
              <Download className="w-4 h-4" /> Exporter toutes les données (JSON)
            </Button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-4">Notifications</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="pmail">Email parent</Label>
            <Input id="pmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly">Résumé hebdomadaire</Label>
            <Switch id="weekly" checked={weekly} onCheckedChange={setWeekly} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="stagn">Alerte stagnation (7 jours sans progrès)</Label>
            <Switch id="stagn" checked={stagnation} onCheckedChange={setStagnation} />
          </div>
          <Button onClick={saveNotifications}>Enregistrer</Button>
        </div>
      </section>
    </div>
  );
};
