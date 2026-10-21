import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OfflineBanner } from "@/components/OfflineBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const PlayHub = lazy(() => import("./pages/PlayHub"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MurDesNombres = lazy(() => import("./pages/math/MurDesNombres"));
const MemoryCalcul = lazy(() => import("./pages/math/MemoryCalcul"));
const PuzzleNumerique = lazy(() => import("./pages/math/PuzzleNumerique"));
const LabyrintheNombres = lazy(() => import("./pages/math/LabyrintheNombres"));
const PyramideNombres = lazy(() => import("./pages/math/PyramideNombres"));
const CompteEstBon = lazy(() => import("./pages/math/CompteEstBon"));
const ChainesCalcul = lazy(() => import("./pages/math/ChainesCalcul"));
const DroiteGraduee = lazy(() => import("./pages/math/DroiteGraduee"));
const BatailleNombres = lazy(() => import("./pages/math/BatailleNombres"));
const Tangram = lazy(() => import("./pages/math/Tangram"));
const MathChapters = lazy(() => import("./pages/math/MathChapters"));
const MathGamesChapters = lazy(() => import("./pages/math/MathGamesChapters"));
const PlacementTest = lazy(() => import("./pages/PlacementTest"));
const ChapterLevelSelect = lazy(() => import("./pages/math/ChapterLevelSelect"));
const ChapterSession = lazy(() => import("./pages/math/ChapterSession"));
const ChronoCalcul = lazy(() => import("./pages/math/ChronoCalcul"));
const NombreTroue = lazy(() => import("./pages/math/NombreTroue"));
const RoueDuHasard = lazy(() => import("./pages/math/RoueDuHasard"));
const MarathonMental = lazy(() => import("./pages/math/MarathonMental"));
const CoffreFort = lazy(() => import("./pages/math/CoffreFort"));
const DesMaths = lazy(() => import("./pages/math/DesMaths"));
const OreilleDesNombres = lazy(() => import("./pages/math/OreilleDesNombres"));
const TirAuxNombres = lazy(() => import("./pages/math/TirAuxNombres"));
const MoutonNoirMaths = lazy(() => import("./pages/math/MoutonNoirMaths"));
const SyllabesGame = lazy(() => import("./pages/SyllabesGame"));
const ChasseGame = lazy(() => import("./pages/ChasseGame"));
const MemoireGame = lazy(() => import("./pages/MemoireGame"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AddChild = lazy(() => import("./pages/AddChild"));
const PhonemesGame = lazy(() => import("./pages/PhonemesGame"));
const DicteeGame = lazy(() => import("./pages/DicteeGame"));
const LettresGame = lazy(() => import("./pages/LettresGame"));
const BurgerGame = lazy(() => import("./pages/BurgerGame"));
const GraphemesGame = lazy(() => import("./pages/GraphemesGame"));
const TrainGame = lazy(() => import("./pages/TrainGame"));
const MiroirGame = lazy(() => import("./pages/MiroirGame"));
const FauxAmisGame = lazy(() => import("./pages/FauxAmisGame"));
const PhareGame = lazy(() => import("./pages/PhareGame"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const PeintreGame = lazy(() => import("./pages/PeintreGame"));
const PuzzleGame = lazy(() => import("./pages/PuzzleGame"));
const PontGame = lazy(() => import("./pages/PontGame"));
const TrieurGame = lazy(() => import("./pages/TrieurGame"));
const MurGame = lazy(() => import("./pages/MurGame"));
const OreilleMagiqueGame = lazy(() => import("./pages/OreilleMagiqueGame"));
const TirGame = lazy(() => import("./pages/TirGame"));
const MotTroueGame = lazy(() => import("./pages/MotTroueGame"));
const ChronoBilingueGame = lazy(() => import("./pages/ChronoBilingueGame"));
const MoutonNoirGame = lazy(() => import("./pages/MoutonNoirGame"));
const RimeMalinGame = lazy(() => import("./pages/RimeMalinGame"));
const DeSyllabesGame = lazy(() => import("./pages/DeSyllabesGame"));
const CirqueMotsGame = lazy(() => import("./pages/CirqueMotsGame"));
const DialogueEclairGame = lazy(() => import("./pages/DialogueEclairGame"));
const ChasseurErreursGame = lazy(() => import("./pages/ChasseurErreursGame"));
const MagicienMotsGame = lazy(() => import("./pages/MagicienMotsGame"));
const RoueGenresGame = lazy(() => import("./pages/RoueGenresGame"));
const EchoSonsGame = lazy(() => import("./pages/EchoSonsGame"));
const ProfileSelect = lazy(() => import("./pages/ProfileSelect"));
const ChildDashboard = lazy(() => import("./pages/ChildDashboard"));
const ChildHome = lazy(() => import("./pages/ChildHome"));
const AvatarShop = lazy(() => import("./pages/AvatarShop"));
const AvatarEditor = lazy(() => import("./pages/AvatarEditor"));
const BadgesPage = lazy(() => import("./pages/child/BadgesPage"));
const ReviewPage = lazy(() => import("./pages/child/ReviewPage"));
const ChallengePage = lazy(() => import("./pages/child/ChallengePage"));
const ChildSettingsPage = lazy(() => import("./pages/child/ChildSettingsPage"));
const ManageChildren = lazy(() => import("./pages/parent/ManageChildren"));
const SubjectPage = lazy(() => import("./pages/SubjectPage"));
const GamesHub = lazy(() => import("./pages/child/GamesHub"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminErrors = lazy(() => import("./pages/admin/AdminErrors"));
const AdminShop = lazy(() => import("./pages/admin/AdminShop"));
const StoriesPage = lazy(() => import("./pages/nl/StoriesPage"));
const CodeHome = lazy(() => import("./pages/code/CodeHome"));
const LearnHome = lazy(() => import("./pages/learn/LearnHome"));
const SubjectLessons = lazy(() => import("./pages/learn/SubjectLessons"));
const LessonPage = lazy(() => import("./pages/learn/LessonPage"));
const LearnRedirect = lazy(() => import("./pages/learn/LearnRedirect"));
const CodeEpisodePage = lazy(() => import("./pages/code/CodeEpisodePage"));

const StoryReader = lazy(() => import("./pages/nl/StoryReader"));
const NlChapters = lazy(() => import("./pages/nl/NlChapters"));
const LearningActivitiesPage = lazy(() => import("./pages/nl/LearningActivitiesPage"));
const SpeakingPracticePage = lazy(() => import("./pages/nl/SpeakingPracticePage"));
const FrExercises = lazy(() => import("./pages/fr/FrExercises"));
const SyllabesEnFetePage = lazy(() => import("./pages/fr/SyllabesEnFetePage"));
const ChasseSonsPage = lazy(() => import("./pages/fr/ChasseSonsPage"));
const RimeMalinFrPage = lazy(() => import("./pages/fr/RimeMalinFrPage"));
const DeSyllabesFrPage = lazy(() => import("./pages/fr/DeSyllabesFrPage"));
const JardinMotsPage = lazy(() => import("./pages/fr/JardinMotsPage"));
const BullesSynonymesPage = lazy(() => import("./pages/fr/BullesSynonymesPage"));
const BullesMotsFrPage = lazy(() => import("./pages/fr/BullesMotsFrPage"));
const CarteTresorFrPage = lazy(() => import("./pages/fr/CarteTresorFrPage"));
const BatisseurPhrasesPage = lazy(() => import("./pages/fr/BatisseurPhrasesPage"));
const CompleteHistoirePage = lazy(() => import("./pages/fr/CompleteHistoirePage"));
const DialogueEclairFrPage = lazy(() => import("./pages/fr/DialogueEclairFrPage"));
const PiegeHomophonesPage = lazy(() => import("./pages/fr/PiegeHomophonesPage"));
const ChasseurErreursFrPage = lazy(() => import("./pages/fr/ChasseurErreursFrPage"));
const RoueGenresFrPage = lazy(() => import("./pages/fr/RoueGenresFrPage"));
const DicteeMuettePage = lazy(() => import("./pages/fr/DicteeMuettePage"));
const EchoSonsFrPage = lazy(() => import("./pages/fr/EchoSonsFrPage"));
const EveilHome = lazy(() => import("./pages/eveil/EveilHome"));
const EveilActivity = lazy(() => import("./pages/eveil/EveilActivity"));
const MiniGamePause = lazy(() => import("./pages/child/MiniGamePause"));
const SiblingChallenges = lazy(() => import("./pages/child/SiblingChallenges"));
import { SiblingChallengeNotifier } from "@/components/child/SiblingChallengeNotifier";
const ParentGate = lazy(() => import("./pages/ParentGate"));
const ParentDashboard = lazy(() => import("./pages/ParentDashboard"));
const ParentSettings = lazy(() => import("./pages/ParentSettings"));
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
           <OfflineBanner />
          <BrowserRouter>
            <SiblingChallengeNotifier />
            <ChildModeGuard>
            <Suspense fallback={<div className="grid min-h-[60vh] place-items-center bg-background" role="status" aria-live="polite">Chargement… / Laden…</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/accueil" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/utilisateurs" element={<AdminUsers />} />
              <Route path="/admin/bugs" element={<AdminErrors />} />
              <Route path="/admin/boutique" element={<AdminShop />} />
              <Route path="/classement" element={<Leaderboard />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/ajouter-enfant" element={<AddChild />} />
              <Route path="/profils" element={<ProfileSelect />} />
              <Route path="/jouer" element={<PlayHub />} />
              <Route path="/apprendre" element={<LearnRedirect />} />
              <Route path="/child/:id/apprendre" element={<LearnHome />} />
              <Route path="/child/:id/apprendre/:subject" element={<SubjectLessons />} />
              <Route path="/child/:id/apprendre/:subject/:lessonId" element={<LessonPage />} />
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
              <Route path="/child/:id/code" element={<CodeHome />} />
              <Route path="/child/:id/code/:episodeId" element={<CodeEpisodePage />} />

              <Route path="/child/:id/pause" element={<MiniGamePause />} />
              <Route path="/child/:id/defis" element={<SiblingChallenges />} />
              <Route path="/child/:id/games" element={<GamesHub />} />
              <Route path="/child/:id/jeux" element={<GamesHub />} />
              <Route path="/child/:id/nl/histoires" element={<StoriesPage />} />
              <Route path="/child/:id/nl/histoires/:storyId" element={<StoryReader />} />
              <Route path="/child/:id/nl/exercices" element={<NlChapters />} />
              <Route path="/child/:id/nl/activiteiten" element={<LearningActivitiesPage />} />
              <Route path="/child/:id/nl/parler" element={<SpeakingPracticePage />} />
              <Route path="/child/:id/nl/exercises" element={<NlChapters />} />
              <Route path="/child/:id/nl/chapitre/:chapterId" element={<ChapterLevelSelect />} />
              <Route path="/child/:id/nl/chapitre/:chapterId/:level" element={<ChapterSession />} />
              <Route path="/child/:id/fr/exercices" element={<FrExercises />} />
              <Route path="/child/:id/fr/exercises" element={<FrExercises />} />
              <Route path="/child/:id/fr/chapitre/:chapterId" element={<ChapterLevelSelect />} />
              <Route path="/child/:id/fr/chapitre/:chapterId/:level" element={<ChapterSession />} />
              <Route path="/jeu/syllabes-fete" element={<SyllabesEnFetePage />} />
              <Route path="/child/:id/fr/syllabes-fete" element={<SyllabesEnFetePage />} />
              <Route path="/jeu/chasse-sons-fr" element={<ChasseSonsPage />} />
              <Route path="/child/:id/fr/chasse-sons-fr" element={<ChasseSonsPage />} />
              <Route path="/jeu/rime-malin-fr" element={<RimeMalinFrPage />} />
              <Route path="/child/:id/fr/rime-malin-fr" element={<RimeMalinFrPage />} />
              <Route path="/jeu/de-syllabes-fr" element={<DeSyllabesFrPage />} />
              <Route path="/child/:id/fr/de-syllabes-fr" element={<DeSyllabesFrPage />} />
              <Route path="/jeu/jardin-mots" element={<JardinMotsPage />} />
              <Route path="/child/:id/fr/jardin-mots" element={<JardinMotsPage />} />
              <Route path="/jeu/bulles-synonymes" element={<BullesSynonymesPage />} />
              <Route path="/child/:id/fr/bulles-synonymes" element={<BullesSynonymesPage />} />
              <Route path="/jeu/bulles-mots-fr" element={<BullesMotsFrPage />} />
              <Route path="/child/:id/fr/bulles-mots-fr" element={<BullesMotsFrPage />} />
              <Route path="/jeu/carte-tresor-fr" element={<CarteTresorFrPage />} />
              <Route path="/child/:id/fr/carte-tresor-fr" element={<CarteTresorFrPage />} />
              <Route path="/jeu/batisseur-phrases" element={<BatisseurPhrasesPage />} />
              <Route path="/child/:id/fr/batisseur-phrases" element={<BatisseurPhrasesPage />} />
              <Route path="/jeu/complete-histoire" element={<CompleteHistoirePage />} />
              <Route path="/child/:id/fr/complete-histoire" element={<CompleteHistoirePage />} />
              <Route path="/jeu/dialogue-eclair-fr" element={<DialogueEclairFrPage />} />
              <Route path="/child/:id/fr/dialogue-eclair-fr" element={<DialogueEclairFrPage />} />
              <Route path="/jeu/piege-homophones" element={<PiegeHomophonesPage />} />
              <Route path="/child/:id/fr/piege-homophones" element={<PiegeHomophonesPage />} />
              <Route path="/jeu/chasseur-erreurs-fr" element={<ChasseurErreursFrPage />} />
              <Route path="/child/:id/fr/chasseur-erreurs-fr" element={<ChasseurErreursFrPage />} />
              <Route path="/jeu/roue-genres-fr" element={<RoueGenresFrPage />} />
              <Route path="/child/:id/fr/roue-genres-fr" element={<RoueGenresFrPage />} />
              <Route path="/jeu/dictee-muette" element={<DicteeMuettePage />} />
              <Route path="/child/:id/fr/dictee-muette" element={<DicteeMuettePage />} />
              <Route path="/jeu/echo-sons-fr" element={<EchoSonsFrPage />} />
              <Route path="/child/:id/fr/echo-sons-fr" element={<EchoSonsFrPage />} />
              <Route path="/child/:id/math/jeux" element={<MathGamesChapters />} />
              <Route path="/jeux-math" element={<MathGamesChapters />} />
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
              <Route path="/jeu/rime-malin" element={<RimeMalinGame />} />
              <Route path="/jeu/de-syllabes" element={<DeSyllabesGame />} />
              <Route path="/jeu/cirque-mots" element={<CirqueMotsGame />} />
              <Route path="/jeu/dialogue-eclair" element={<DialogueEclairGame />} />
              <Route path="/jeu/chasseur-erreurs" element={<ChasseurErreursGame />} />
              <Route path="/jeu/magicien-mots" element={<MagicienMotsGame />} />
              <Route path="/jeu/roue-genres" element={<RoueGenresGame />} />
              <Route path="/jeu/echo-sons" element={<EchoSonsGame />} />
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
              <Route path="/child/:id/math/roue-du-hasard" element={<RoueDuHasard />} />
              <Route path="/child/:id/math/roue-du-hasard/:level" element={<RoueDuHasard />} />
              <Route path="/jeu/roue-du-hasard" element={<RoueDuHasard />} />
              <Route path="/jeu/roue-du-hasard/:level" element={<RoueDuHasard />} />
              <Route path="/child/:id/math/marathon-mental" element={<MarathonMental />} />
              <Route path="/child/:id/math/marathon-mental/:level" element={<MarathonMental />} />
              <Route path="/jeu/marathon-mental" element={<MarathonMental />} />
              <Route path="/jeu/marathon-mental/:level" element={<MarathonMental />} />
              <Route path="/child/:id/math/coffre-fort" element={<CoffreFort />} />
              <Route path="/child/:id/math/coffre-fort/:level" element={<CoffreFort />} />
              <Route path="/jeu/coffre-fort" element={<CoffreFort />} />
              <Route path="/jeu/coffre-fort/:level" element={<CoffreFort />} />
              <Route path="/child/:id/math/des-mathematiques" element={<DesMaths />} />
              <Route path="/child/:id/math/des-mathematiques/:level" element={<DesMaths />} />
              <Route path="/jeu/des-mathematiques" element={<DesMaths />} />
              <Route path="/jeu/des-mathematiques/:level" element={<DesMaths />} />
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
            </Suspense>
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
