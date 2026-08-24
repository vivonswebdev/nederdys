import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Row {
  kind: "parent" | "child";
  id: string;
  label: string;
  school_level: string | null;
  parent_email: string | null;
  created_at: string;
}

const AdminUsers = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<"all" | "parent" | "child">("all");

  useEffect(() => {
    supabase.rpc("get_admin_users").then(({ data, error }) => {
      if (error) console.error(error);
      setRows((data as Row[] | null) ?? []);
    });
  }, []);

  const filtered = useMemo(
    () => rows.filter((r) => (filter === "all" ? true : r.kind === filter)),
    [rows, filter],
  );

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold mr-auto">👥 Utilisateurs</h1>
        {(["all", "parent", "child"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "secondary"} onClick={() => setFilter(f)}>
            {f === "all" ? "Tous" : f === "parent" ? "Parents" : "Enfants"}
          </Button>
        ))}
      </div>

      <div className="bg-card border-2 border-border rounded-2xl p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Nom / Email</th>
              <th className="py-2 pr-3">Niveau</th>
              <th className="py-2 pr-3">Parent</th>
              <th className="py-2">Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={`${r.kind}-${r.id}`} className="border-t border-border">
                <td className="py-2 pr-3">{r.kind === "parent" ? "👨‍👩‍👧" : "👶"}</td>
                <td className="py-2 pr-3 font-medium">{r.label}</td>
                <td className="py-2 pr-3 uppercase">{r.school_level ?? "-"}</td>
                <td className="py-2 pr-3">{r.parent_email ?? "-"}</td>
                <td className="py-2">{new Date(r.created_at).toLocaleDateString("fr-BE")}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-muted-foreground">
                  Aucun utilisateur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
