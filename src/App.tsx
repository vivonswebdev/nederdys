import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import PlayHub from "./pages/PlayHub";
import NotFound from "./pages/NotFound";
import MurDesNombres from "./pages/math/MurDesNombres";
import MathChapters from "./pages/math/MathChapters";
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
import ParentsDashboard from "./pages/ParentsDashboard";
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
import ProfileSelect from "./pages/ProfileSelect";
import ChildDashboard from "./pages/ChildDashboard";
import ChildHome from "./pages/ChildHome";
import AvatarShop from "./pages/AvatarShop";
import AvatarEditor from "./pages/AvatarEditor";
import BadgesPage from "./pages/child/BadgesPage";
import ChallengePage from "./pages/child/ChallengePage";
import ChildSettingsPage from "./pages/child/ChildSettingsPage";
import ManageChildren from "./pages/parent/ManageChildren";
import SubjectPage from "./pages/SubjectPage";
import GamesHub from "./pages/child/GamesHub";
import NlChapters from "./pages/nl/NlChapters";
import FrExercises from "./pages/fr/FrExercises";
import ParentGate from "./pages/ParentGate";
import ParentDashboard from "./pages/ParentDashboard";
import ParentSettings from "./pages/ParentSettings";
import { ChildProvider } from "@/contexts/ChildContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <ChildProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
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
              <Route path="/child/:id/defi" element={<ChallengePage />} />
              <Route path="/child/:id/settings" element={<ChildSettingsPage />} />
              <Route path="/child/:id/games" element={<GamesHub />} />
              <Route path="/child/:id/jeux" element={<GamesHub />} />
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
              <Route path="/parents" element={<ParentsDashboard />} />
              <Route path="/parent" element={<ParentGate />} />
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              <Route path="/parent/settings" element={<ParentSettings />} />
              <Route path="/parent/children" element={<ManageChildren />} />
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
              <Route path="/child/:id/math/chapitres" element={<MathChapters />} />
              <Route path="/child/:id/math/chapitre/:chapterId" element={<ChapterLevelSelect />} />
              <Route path="/child/:id/math/chapitre/:chapterId/:level" element={<ChapterSession />} />
              <Route path="/child/:id/math/mur-des-nombres" element={<MurDesNombres />} />
              <Route path="/child/:id/math/mur-des-nombres/:level" element={<MurDesNombres />} />
              <Route path="/child/:id/math/chrono-calcul" element={<ChronoCalcul />} />
              <Route path="/child/:id/math/chrono-calcul/:level" element={<ChronoCalcul />} />
              <Route path="/jeu/mur-des-nombres" element={<MurDesNombres />} />
              <Route path="/jeu/mur-des-nombres/:level" element={<MurDesNombres />} />
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
          </BrowserRouter>
        </TooltipProvider>
        </ChildProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
