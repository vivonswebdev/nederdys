import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
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
              <Route path="/jeu/syllabes" element={<SyllabesGame />} />
              <Route path="/jeu/chasse" element={<ChasseGame />} />
              <Route path="/jeu/memoire" element={<MemoireGame />} />
              <Route path="/parents" element={<ParentsDashboard />} />
              <Route path="/jeu/phonemes" element={<PhonemesGame />} />
              <Route path="/jeu/dictee" element={<DicteeGame />} />
              <Route path="/jeu/lettres" element={<LettresGame />} />
              <Route path="/jeu/burger" element={<BurgerGame />} />
              <Route path="/jeu/graphemes" element={<GraphemesGame />} />
              <Route path="/jeu/train" element={<TrainGame />} />
              <Route path="/jeu/miroir" element={<MiroirGame />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
