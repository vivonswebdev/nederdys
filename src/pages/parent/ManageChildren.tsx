import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { ParentShell } from "@/components/parent/ParentShell";
import { useChild } from "@/contexts/ChildContext";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SCHOOL_LEVELS = ["cp", "ce1", "ce2", "cm1", "cm2"];

const ManageChildren = () => {
  const { children: kids } = useChild();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ first_name: "", age: 8, school_level: "ce2" });
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Gérer les profils enfants — Espace parent";
  }, []);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["children"] });

  const handleUpdate = async (childId: string) => {
    if (!form.first_name.trim()) {
      toast.error("Le prénom est obligatoire.");
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("children")
      .update({
        first_name: form.first_name.trim(),
        age: form.age,
        school_level: form.school_level,
      })
      .eq("id", childId);
    setBusy(false);
    if (error) {
      toast.error("Impossible de mettre à jour le profil.");
      return;
    }
    setEditingId(null);
    await refresh();
    toast.success("Profil mis à jour !");
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    const { error } = await supabase.from("children").delete().eq("id", pendingDelete.id);
    setBusy(false);
    setPendingDelete(null);
    if (error) {
      toast.error("Impossible de supprimer ce profil.");
      return;
    }
    await refresh();
    toast.success("Profil supprimé.");
  };

  return (
    <ParentShell title="Gérer les enfants">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Modifiez le prénom, l'âge et le niveau scolaire, ou supprimez un profil. La suppression
          efface aussi toute la progression associée.
        </p>

        {kids.length === 0 && (
          <p className="text-muted-foreground">Aucun profil enfant pour l'instant.</p>
        )}

        <ul className="space-y-3">
          {kids.map((child) => (
            <li key={child.id} className="bg-card border border-border rounded-3xl p-4">
              {editingId === child.id ? (
                <div className="space-y-3">
                  <input
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    placeholder="Prénom"
                    aria-label="Prénom"
                    className="w-full border border-border bg-background rounded-xl p-2.5"
                  />
                  <div className="flex flex-wrap gap-3">
                    <input
                      type="number"
                      min={4}
                      max={14}
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                      aria-label="Âge"
                      className="w-28 border border-border bg-background rounded-xl p-2.5"
                    />
                    <select
                      value={form.school_level}
                      onChange={(e) => setForm({ ...form, school_level: e.target.value })}
                      aria-label="Niveau scolaire"
                      className="flex-1 min-w-[8rem] border border-border bg-background rounded-xl p-2.5"
                    >
                      {SCHOOL_LEVELS.map((l) => (
                        <option key={l} value={l}>
                          {l.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={busy}
                      onClick={() => handleUpdate(child.id)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold disabled:opacity-60"
                    >
                      ✅ Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="border border-border px-4 py-2 rounded-xl font-bold text-muted-foreground"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{child.avatar_emoji}</span>
                    <div>
                      <p className="font-bold text-foreground">{child.first_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {child.age} ans · {String(child.school_level).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(child.id);
                        setForm({
                          first_name: child.first_name,
                          age: child.age,
                          school_level: String(child.school_level),
                        });
                      }}
                      className="inline-flex items-center gap-1.5 border border-border px-3 py-2 rounded-xl font-bold text-sm text-foreground"
                    >
                      <Pencil className="w-4 h-4" /> Modifier
                    </button>
                    <button
                      onClick={() => setPendingDelete({ id: child.id, name: child.first_name })}
                      className="inline-flex items-center gap-1.5 bg-destructive text-destructive-foreground px-3 py-2 rounded-xl font-bold text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Supprimer
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/ajouter-enfant")}
          className="inline-flex items-center gap-2 border border-dashed border-border rounded-2xl px-4 py-3 font-bold text-foreground"
        >
          <UserPlus className="w-4 h-4" /> Ajouter un enfant
        </button>
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le profil de {pendingDelete?.name} ?</AlertDialogTitle>
            <AlertDialogDescription>
              Toute la progression (parties, badges, séries, pièces) sera définitivement effacée.
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={busy}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ParentShell>
  );
};

export default ManageChildren;
