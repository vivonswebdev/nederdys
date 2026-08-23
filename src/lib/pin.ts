import { supabase } from "@/integrations/supabase/client";

export type PinResult =
  | { ok: true }
  | { ok: false; reason: "wrong"; attemptsLeft: number }
  | { ok: false; reason: "locked"; lockedUntil: string }
  | { ok: false; reason: "no_pin" | "unauthenticated" | "invalid_format" | "wrong_old_pin" | "error" };

interface RpcPayload {
  ok: boolean;
  reason?: string;
  attempts_left?: number;
  locked_until?: string;
}

const normalize = (payload: RpcPayload | null): PinResult => {
  if (!payload) return { ok: false, reason: "error" };
  if (payload.ok) return { ok: true };
  if (payload.reason === "wrong")
    return { ok: false, reason: "wrong", attemptsLeft: payload.attempts_left ?? 0 };
  if (payload.reason === "locked")
    return { ok: false, reason: "locked", lockedUntil: payload.locked_until ?? new Date().toISOString() };
  return { ok: false, reason: (payload.reason as "no_pin") ?? "error" };
};

/** Un code PIN a-t-il déjà été défini par ce parent ? */
export const hasPin = async (): Promise<boolean> => {
  const { data, error } = await supabase.rpc("has_parent_pin");
  if (error) {
    console.error("Error checking PIN:", error.message);
    return false;
  }
  return data === true;
};

/** Vérification côté serveur : 3 essais puis blocage 5 min. */
export const verifyPin = async (inputPin: string): Promise<PinResult> => {
  const { data, error } = await supabase.rpc("verify_parent_pin", { input_pin: inputPin });
  if (error) {
    console.error("Error verifying PIN:", error.message);
    return { ok: false, reason: "error" };
  }
  return normalize(data as unknown as RpcPayload);
};

/** Définit le premier PIN, ou le change en fournissant l'ancien. */
export const setPin = async (newPin: string, oldPin?: string): Promise<PinResult> => {
  const { data, error } = await supabase.rpc("set_parent_pin", {
    new_pin: newPin,
    old_pin: oldPin ?? null,
  });
  if (error) {
    console.error("Error setting PIN:", error.message);
    return { ok: false, reason: "error" };
  }
  return normalize(data as unknown as RpcPayload);
};

// ---------- Session parent (30 min, barrière UX) ----------

const SESSION_KEY = "nederdys.parentSession";
const SESSION_MS = 30 * 60 * 1000;

export const setParentSession = (active: boolean) => {
  if (active) localStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_MS));
  else localStorage.removeItem(SESSION_KEY);
};

export const isParentSessionActive = (): boolean => {
  const expiry = localStorage.getItem(SESSION_KEY);
  if (!expiry) return false;
  if (Date.now() >= Number(expiry)) {
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
  return true;
};
