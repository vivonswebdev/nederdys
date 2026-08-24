import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ErrorRow {
  id: string;
  error_type: string;
  description: string | null;
  page_url: string | null;
  browser_info: string | null;
  resolved: boolean;
  created_at: string;
}

const AdminErrors = () => {
  const [rows, setRows] = useState<ErrorRow[]>([]);
  const [filter, setFilter] = useState<"all" | "resolved" | "unresolved">("unresolved");

  useEffect(() => {
    supabase
      .from("error_reports")
      .select("id, error_type, description, page_url, browser_info, resolved, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (error) console.error(error);
        setRows((data as ErrorRow[] | null) ?? []);
      });
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((e) =>
        filter === "all" ? true : filter === "resolved" ? e.resolved : !e.resolved,
      ),
    [rows, filter],
  );

  const resolve = async (id: string) => {
    const { error } = await supabase
      .from("error_reports")
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("Impossible de résoudre ce bug");
      return;
    }
    setRows((prev) => prev.map((e) => (e.id === id ? { ...e, resolved: true } : e)));
    toast.success("Bug marqué comme résolu");
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold mr-auto">🐛 Bugs signalés</h1>
        {(["all", "unresolved", "resolved"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "secondary"} onClick={() => setFilter(f)}>
            {f === "all" ? "Tous" : f === "unresolved" ? "Non résolus" : "Résolus"}
          </Button>
        ))}
      </div>

      <div className="bg-card border-2 border-border rounded-2xl p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Description</th>
              <th className="py-2 pr-3">Page</th>
              <th className="py-2 pr-3">Date</th>
              <th className="py-2 pr-3">Statut</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-t border-border align-top">
                <td className="py-2 pr-3 font-medium">{e.error_type}</td>
                <td className="py-2 pr-3 max-w-xs truncate" title={e.description ?? ""}>
                  {e.description ?? "-"}
                </td>
                <td className="py-2 pr-3 max-w-[12rem] truncate" title={e.page_url ?? ""}>
                  {e.page_url ?? "-"}
                </td>
                <td className="py-2 pr-3">{new Date(e.created_at).toLocaleString("fr-BE")}</td>
                <td className="py-2 pr-3">{e.resolved ? "✅ Résolu" : "⚠️ Ouvert"}</td>
                <td className="py-2">
                  {!e.resolved && (
                    <Button size="sm" onClick={() => resolve(e.id)}>
                      ✅ Résoudre
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-muted-foreground">
                  Aucun bug dans cette catégorie.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminErrors;
