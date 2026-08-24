import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import PlayHub from "./pages/PlayHub";
import NotFound from "./pages/NotFound";
import MurDesNombres from "./pages/math/MurDesNombres";
import MemoryCalcul from "./pages/math/MemoryCalcul";
import PuzzleNumerique from "./pages/math/PuzzleNumerique";
import LabyrintheNombres from "./pages/math/LabyrintheNombres";
import PyramideNombres from "./pages/math/PyramideNombres";
import CompteEstBon from "./pages/math/CompteEstBon";
import ChainesCalcul from "./pages/math/ChainesCalcul";
import DroiteGraduee from "./pages/math/DroiteGraduee";
import BatailleNombres from "./pages/math/BatailleNombres";
import Tangram from "./pages/math/Tangram";
import MathChapters from "./pages/math/MathChapters";
import PlacementTest from "./pages/PlacementTest";
import ChapterLevelSelect from "./pages/math/ChapterLevelSelect";
import ChapterSession from "./pages/math/ChapterSession";
import ChronoCalcul from "./pages/math/ChronoCalcul";
import NombreTroue from "./pages/math/NombreTroue";
import OreilleDesNombres from "./pages/math/OreilleDesNombres";
import TirAuxNombres from "./pages/math/TirAuxNombres";
import MoutonNoirMaths from "./pages/math/MoutonNoirMaths";
import SyllabesGame from "./pages/SyllabesGame";
import ChasseGame from "./pages/ChasseGame";
import MemoireGame from "./pages/MemoireGame";
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddChild from "./pages/AddChild";
import PhonemesGame from "./pages/PhonemesGame";
import DicteeGame from "./pages/DicteeGame";
import LettresGame from "./pages/LettresGame";
import BurgerGame from "./pages/BurgerGame";
import GraphemesGame from "./pages/GraphemesGame";
import TrainGame from "./pages/TrainGame";
import MiroirGame from "./pages/MiroirGame";
import FauxAmisGame from "./pages/FauxAmisGame";
import PhareGame from "./pages/PhareGame";
import ShopPage from "./pages/ShopPage";
import PeintreGame from "./pages/PeintreGame";
import PuzzleGame from "./pages/PuzzleGame";
import PontGame from "./pages/PontGame";
import TrieurGame from "./pages/TrieurGame";
import MurGame from "./pages/MurGame";
import OreilleMagiqueGame from "./pages/OreilleMagiqueGame";
import TirGame from "./pages/TirGame";
import MotTroueGame from "./pages/MotTroueGame";
import ChronoBilingueGame from "./pages/ChronoBilingueGame";
import MoutonNoirGame from "./pages/MoutonNoirGame";
import RimeMalinGame from "./pages/RimeMalinGame";
import DeSyllabesGame from "./pages/DeSyllabesGame";
import CirqueMotsGame from "./pages/CirqueMotsGame";
import DialogueEclairGame from "./pages/DialogueEclairGame";
import ProfileSelect from "./pages/ProfileSelect";
import ChildDashboard from "./pages/ChildDashboard";
import ChildHome from "./pages/ChildHome";
import AvatarShop from "./pages/AvatarShop";
import AvatarEditor from "./pages/AvatarEditor";
import BadgesPage from "./pages/child/BadgesPage";
import ReviewPage from "./pages/child/ReviewPage";
import ChallengePage from "./pages/child/ChallengePage";
import ChildSettingsPage from "./pages/child/ChildSettingsPage";
import ManageChildren from "./pages/parent/ManageChildren";
import SubjectPage from "./pages/SubjectPage";
import GamesHub from "./pages/child/GamesHub";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminErrors from "./pages/admin/AdminErrors";
import StoriesPage from "./pages/nl/StoriesPage";
import StoryReader from "./pages/nl/StoryReader";
import NlChapters from "./pages/nl/NlChapters";
import FrExercises from "./pages/fr/FrExercises";
import EveilHome from "./pages/eveil/EveilHome";
import EveilActivity from "./pages/eveil/EveilActivity";
import MiniGamePause from "./pages/child/MiniGamePause";
import SiblingChallenges from "./pages/child/SiblingChallenges";
import ParentGate from "./pages/ParentGate";
import ParentDashboard from "./pages/ParentDashboard";
import ParentSettings from "./pages/ParentSettings";
import { ChildProvider } from "@/contexts/ChildContext";
import { ChildModeProvider } from "@/contexts/ChildModeContext";
import { RequireParentPin } from "@/components/parent/RequireParentPin";
import { ExitChildModeButton } from "@/components/child/ExitChildModeButton";
import { ChildModeGuard } from "@/components/child/ChildModeGuard";

import { useErrorTracker } from "@/hooks/useErrorTracker";

const queryClient = new QueryClient();

const ErrorTracking = () => {
  useErrorTracker();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <ChildProvider>
        <ChildModeProvider>
        <TooltipProvider>
          <ErrorTracking />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ChildModeGuard>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/accueil" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/utilisateurs" element={<AdminUsers />} />
              <Route path="/admin/bugs" element={<AdminErrors />} />
              <Route path="/classement" element={<Leaderboard />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/ajouter-enfant" element={<AddChild />} />
              <Route path="/profils" element={<ProfileSelect />} />
              <Route path="/jouer" element={<PlayHub />} />
              <Route path="/enfant" element={<ChildDashboard />} />
              <Route path="/child/:id" element={<ChildHome />} />
              <Route path="/child/:id/boutique" element={<AvatarShop />} />
              <Route path="/child/:id/avatar" element={<AvatarEditor />} />
              <Route path="/child/:id/badges" element={<BadgesPage />} />
              <Route path="/child/:id/reviser" element={<ReviewPage />} />
              <Route path="/child/:id/defi" element={<ChallengePage />} />
              <Route path="/child/:id/settings" element={<ChildSettingsPage />} />
              <Route path="/child/:id/eveil" element={<EveilHome />} />
              <Route path="/child/:id/eveil/:activityId" element={<EveilActivity />} />
              <Route path="/child/:id/pause" element={<MiniGamePause />} />
              <Route path="/child/:id/defis" element={<SiblingChallenges />} />
              <Route path="/child/:id/games" element={<GamesHub />} />
              <Route path="/child/:id/jeux" element={<GamesHub />} />
              <Route path="/child/:id/nl/histoires" element={<StoriesPage />} />
              <Route path="/child/:id/nl/histoires/:storyId" element={<StoryReader />} />
              <Route path="/child/:id/nl/exercices" element={<NlChapters />} />
              <Route path="/child/:id/nl/exercises" element={<NlChapters />} />
              <Route path="/child/:id/nl/chapitre/:chapterId" element={<ChapterLevelSelect />} />
              <Route path="/child/:id/nl/chapitre/:chapterId/:level" element={<ChapterSession />} />
              <Route path="/child/:id/fr/exercices" element={<FrExercises />} />
              <Route path="/child/:id/fr/exercises" element={<FrExercises />} />
              <Route path="/child/:id/math/exercices" element={<MathChapters />} />
              <Route path="/child/:id/math/exercises" element={<MathChapters />} />
              <Route path="/child/:id/:subject" element={<SubjectPage />} />
              <Route path="/matiere/:subject" element={<SubjectPage />} />
              <Route path="/jeu/syllabes" element={<SyllabesGame />} />
              <Route path="/jeu/chasse" element={<ChasseGame />} />
              <Route path="/jeu/memoire" element={<MemoireGame />} />
              <Route path="/parents" element={<Navigate to="/parent" replace />} />
              <Route path="/parent" element={<ParentGate />} />
              <Route path="/parent/dashboard" element={<RequireParentPin><ParentDashboard /></RequireParentPin>} />
              <Route path="/parent/settings" element={<RequireParentPin><ParentSettings /></RequireParentPin>} />
              <Route path="/parent/children" element={<RequireParentPin><ManageChildren /></RequireParentPin>} />
              <Route path="/jeu/phonemes" element={<PhonemesGame />} />
              <Route path="/jeu/dictee" element={<DicteeGame />} />
              <Route path="/jeu/lettres" element={<LettresGame />} />
              <Route path="/jeu/burger" element={<BurgerGame />} />
              <Route path="/jeu/graphemes" element={<GraphemesGame />} />
              <Route path="/jeu/train" element={<TrainGame />} />
              <Route path="/jeu/miroir" element={<MiroirGame />} />
              <Route path="/jeu/faux-amis" element={<FauxAmisGame />} />
              <Route path="/jeu/phare" element={<PhareGame />} />
              <Route path="/boutique" element={<ShopPage />} />
              <Route path="/jeu/peintre" element={<PeintreGame />} />
              <Route path="/jeu/puzzle" element={<PuzzleGame />} />
              <Route path="/jeu/pont" element={<PontGame />} />
              <Route path="/jeu/trieur" element={<TrieurGame />} />
              <Route path="/jeu/mur" element={<MurGame />} />
              <Route path="/jeu/oreille" element={<OreilleMagiqueGame />} />
              <Route path="/jeu/tir" element={<TirGame />} />
              <Route path="/jeu/mot-troue" element={<MotTroueGame />} />
              <Route path="/jeu/chrono" element={<ChronoBilingueGame />} />
              <Route path="/jeu/mouton" element={<MoutonNoirGame />} />
              <Route path="/child/:id/test-placement/:subject" element={<PlacementTest />} />
              <Route path="/child/:id/math/chapitres" element={<MathChapters />} />
              <Route path="/child/:id/math/chapitre/:chapterId" element={<ChapterLevelSelect />} />
              <Route path="/child/:id/math/chapitre/:chapterId/:level" element={<ChapterSession />} />
              <Route path="/child/:id/math/mur-des-nombres" element={<MurDesNombres />} />
              <Route path="/child/:id/math/mur-des-nombres/:level" element={<MurDesNombres />} />
              <Route path="/child/:id/math/chrono-calcul" element={<ChronoCalcul />} />
              <Route path="/child/:id/math/chrono-calcul/:level" element={<ChronoCalcul />} />
              <Route path="/jeu/mur-des-nombres" element={<MurDesNombres />} />
              <Route path="/jeu/mur-des-nombres/:level" element={<MurDesNombres />} />
          <Route path="/child/:id/math/pyramide-nombres" element={<PyramideNombres />} />
          <Route path="/child/:id/math/pyramide-nombres/:level" element={<PyramideNombres />} />
          <Route path="/jeu/pyramide-nombres" element={<PyramideNombres />} />
          <Route path="/jeu/pyramide-nombres/:level" element={<PyramideNombres />} />
          <Route path="/child/:id/math/compte-est-bon" element={<CompteEstBon />} />
          <Route path="/child/:id/math/compte-est-bon/:level" element={<CompteEstBon />} />
          <Route path="/jeu/compte-est-bon" element={<CompteEstBon />} />
          <Route path="/jeu/compte-est-bon/:level" element={<CompteEstBon />} />
          <Route path="/child/:id/math/chaines-calcul" element={<ChainesCalcul />} />
          <Route path="/child/:id/math/chaines-calcul/:level" element={<ChainesCalcul />} />
          <Route path="/jeu/chaines-calcul" element={<ChainesCalcul />} />
          <Route path="/jeu/chaines-calcul/:level" element={<ChainesCalcul />} />
          <Route path="/child/:id/math/droite-graduee" element={<DroiteGraduee />} />
          <Route path="/child/:id/math/droite-graduee/:level" element={<DroiteGraduee />} />
          <Route path="/jeu/droite-graduee" element={<DroiteGraduee />} />
          <Route path="/jeu/droite-graduee/:level" element={<DroiteGraduee />} />
          <Route path="/child/:id/math/bataille-nombres" element={<BatailleNombres />} />
          <Route path="/child/:id/math/bataille-nombres/:level" element={<BatailleNombres />} />
          <Route path="/jeu/bataille-nombres" element={<BatailleNombres />} />
          <Route path="/jeu/bataille-nombres/:level" element={<BatailleNombres />} />
          <Route path="/child/:id/math/tangram" element={<Tangram />} />
          <Route path="/child/:id/math/tangram/:level" element={<Tangram />} />
          <Route path="/jeu/tangram" element={<Tangram />} />
          <Route path="/jeu/tangram/:level" element={<Tangram />} />
          <Route path="/child/:id/math/memory-calcul" element={<MemoryCalcul />} />
          <Route path="/child/:id/math/memory-calcul/:level" element={<MemoryCalcul />} />
          <Route path="/jeu/memory-calcul" element={<MemoryCalcul />} />
          <Route path="/jeu/memory-calcul/:level" element={<MemoryCalcul />} />
          <Route path="/child/:id/math/puzzle-numerique" element={<PuzzleNumerique />} />
          <Route path="/child/:id/math/puzzle-numerique/:level" element={<PuzzleNumerique />} />
          <Route path="/jeu/puzzle-numerique" element={<PuzzleNumerique />} />
          <Route path="/jeu/puzzle-numerique/:level" element={<PuzzleNumerique />} />
          <Route path="/child/:id/math/labyrinthe-nombres" element={<LabyrintheNombres />} />
          <Route path="/child/:id/math/labyrinthe-nombres/:level" element={<LabyrintheNombres />} />
          <Route path="/jeu/labyrinthe-nombres" element={<LabyrintheNombres />} />
          <Route path="/jeu/labyrinthe-nombres/:level" element={<LabyrintheNombres />} />
              <Route path="/jeu/chrono-calcul" element={<ChronoCalcul />} />
              <Route path="/jeu/chrono-calcul/:level" element={<ChronoCalcul />} />
              <Route path="/child/:id/math/nombre-troue" element={<NombreTroue />} />
              <Route path="/child/:id/math/nombre-troue/:level" element={<NombreTroue />} />
              <Route path="/jeu/nombre-troue" element={<NombreTroue />} />
              <Route path="/jeu/nombre-troue/:level" element={<NombreTroue />} />
              <Route path="/child/:id/math/oreille-des-nombres" element={<OreilleDesNombres />} />
              <Route path="/child/:id/math/oreille-des-nombres/:level" element={<OreilleDesNombres />} />
              <Route path="/jeu/oreille-des-nombres" element={<OreilleDesNombres />} />
              <Route path="/jeu/oreille-des-nombres/:level" element={<OreilleDesNombres />} />
              <Route path="/child/:id/math/tir-aux-nombres" element={<TirAuxNombres />} />
              <Route path="/child/:id/math/tir-aux-nombres/:level" element={<TirAuxNombres />} />
              <Route path="/jeu/tir-aux-nombres" element={<TirAuxNombres />} />
              <Route path="/jeu/tir-aux-nombres/:level" element={<TirAuxNombres />} />
              <Route path="/child/:id/math/mouton-noir" element={<MoutonNoirMaths />} />
              <Route path="/child/:id/math/mouton-noir-maths" element={<MoutonNoirMaths />} />
              <Route path="/child/:id/math/mouton-noir-maths/:level" element={<MoutonNoirMaths />} />
              <Route path="/child/:id/math/mouton-noir/:level" element={<MoutonNoirMaths />} />
              <Route path="/jeu/mouton-noir-maths" element={<MoutonNoirMaths />} />
              <Route path="/jeu/mouton-noir-maths/:level" element={<MoutonNoirMaths />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ExitChildModeButton />
            </ChildModeGuard>
          </BrowserRouter>
        </TooltipProvider>
        </ChildModeProvider>
        </ChildProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
