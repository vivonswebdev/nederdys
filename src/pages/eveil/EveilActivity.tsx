import { Navigate, useParams } from "react-router-dom";
import { ArcEnCiel } from "@/components/eveil/ArcEnCiel";
import { TraceLaForme } from "@/components/eveil/TraceLaForme";
import { MonPremierMot } from "@/components/eveil/MonPremierMot";
import { AssembleLaPhrase } from "@/components/eveil/AssembleLaPhrase";

const EveilActivity = () => {
  const { id, activityId } = useParams<{ id: string; activityId: string }>();
  if (!id) return <Navigate to="/profils" replace />;

  switch (activityId) {
    case "arc-en-ciel":
      return <ArcEnCiel childId={id} />;
    case "trace-la-forme":
      return <TraceLaForme childId={id} />;
    case "mon-premier-mot":
      return <MonPremierMot childId={id} />;
    case "assemble-la-phrase":
      return <AssembleLaPhrase childId={id} />;
    default:
      return <Navigate to={`/child/${id}/eveil`} replace />;
  }
};

export default EveilActivity;
