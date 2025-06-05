
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import MassBalance from "./pages/MassBalance";
import TellUsAboutGrain from "./pages/TellUsAboutGrain";
import KnowYourGrains from "./pages/KnowYourGrains";
import LiveAnalysis from "./pages/LiveAnalysis";
import Analytics from "./pages/Analytics";
import DataReports from "./pages/DataReports";
import LoadConfigurations from "./pages/LoadConfigurations";
import Manuals from "./pages/Manuals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mass-balance" element={<MassBalance />} />
                <Route path="/tell-us-about-grain" element={<TellUsAboutGrain />} />
                <Route path="/know-your-grains" element={<KnowYourGrains />} />
                <Route path="/live-analysis" element={<LiveAnalysis />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/data-reports" element={<DataReports />} />
                <Route path="/load-configurations" element={<LoadConfigurations />} />
                <Route path="/manuals" element={<Manuals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
