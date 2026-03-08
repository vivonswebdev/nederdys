import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SyllabesGame from "./pages/SyllabesGame";
import ChasseGame from "./pages/ChasseGame";
import MemoireGame from "./pages/MemoireGame";
import ParentsDashboard from "./pages/ParentsDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jeu/syllabes" element={<SyllabesGame />} />
          <Route path="/jeu/chasse" element={<ChasseGame />} />
          <Route path="/jeu/memoire" element={<MemoireGame />} />
          <Route path="/parents" element={<ParentsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
