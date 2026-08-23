import { useEffect } from "react";
import { ParentShell } from "@/components/parent/ParentShell";
import { SettingsPanel } from "@/components/parent/SettingsPanel";

const ParentSettings = () => {
  useEffect(() => {
    document.title = "Paramètres parent — NederDys";
  }, []);

  return (
    <ParentShell title="Paramètres">
      <SettingsPanel />
    </ParentShell>
  );
};

export default ParentSettings;
