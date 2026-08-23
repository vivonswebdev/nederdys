import { useCallback, useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Lecture de consignes audio en MP3 (aucune Web Speech API).
 * Les fichiers statiques de /public/audio/... sont joués directement.
 * Si le fichier n'existe pas encore, le MP3 est produit une fois par la
 * fonction serveur `math-tts` puis mis en cache pour la session.
 */
const cache = new Map<string, string>();

async function resolveMp3(url: string, text?: string): Promise<string | null> {
  const key = url || text || "";
  if (cache.has(key)) return cache.get(key)!;

  if (url) {
    try {
      const head = await fetch(url, { method: "HEAD" });
      const type = head.headers.get("content-type") ?? "";
      if (head.ok && type.includes("audio")) {
        cache.set(key, url);
        return url;
      }
    } catch {
      /* fichier absent : on bascule sur la génération */
    }
  }

  if (!text) return null;

  const { data, error } = await supabase.functions.invoke("math-tts", { body: { text } });
  if (error || !data) {
    console.error("math-tts", error);
    return null;
  }
  const blob = data instanceof Blob ? data : new Blob([data as BlobPart], { type: "audio/mpeg" });
  const objectUrl = URL.createObjectURL(blob);
  cache.set(key, objectUrl);
  return objectUrl;
}

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const playAudio = useCallback(async (url: string, text?: string) => {
    const src = await resolveMp3(url, text);
    if (!src) return;
    audioRef.current?.pause();
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const stopAudio = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  return { playAudio, stopAudio, isPlaying };
};
