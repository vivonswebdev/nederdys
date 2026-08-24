import { useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

async function report(row: {
  error_type: string;
  description?: string | null;
  page_url?: string | null;
  stack_trace?: string | null;
}) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return; // les signalements sont liés à un compte
  const { error } = await supabase.from("error_reports").insert({
    user_id: data.user.id,
    error_type: row.error_type,
    description: (row.description ?? "").slice(0, 2000),
    page_url: row.page_url ?? window.location.href,
    browser_info: navigator.userAgent,
    stack_trace: row.stack_trace ? row.stack_trace.slice(0, 4000) : null,
  });
  if (error) console.error("error_reports insert", error);
}

/** Intercepte les crashs JS et expose logError() pour les signalements manuels. */
export function useErrorTracker() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      void report({
        error_type: "crash",
        description: e.message,
        stack_trace: e.error?.stack ?? null,
      });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      void report({
        error_type: "crash",
        description: String(e.reason?.message ?? e.reason ?? "unhandledrejection"),
        stack_trace: e.reason?.stack ?? null,
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  const logError = useCallback(
    (type: string, description: string, page?: string) =>
      report({ error_type: type, description, page_url: page }),
    [],
  );

  return { logError };
}
