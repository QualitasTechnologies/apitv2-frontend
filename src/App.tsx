import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LoadingPage from "@/components/LoadingPage";
import Dashboard from "./pages/Dashboard";
import TellUsAboutGrain from "./pages/TellUsAboutGrain";
import LiveAnalysis from "./pages/LiveAnalysis";
import Analytics from "./pages/Analytics";
import DataReports from "./pages/DataReports";
import Settings from "./pages/Settings";
import Manuals from "./pages/Manuals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full bg-gray-50">
                <AppSidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tell-us-about-grain" element={<TellUsAboutGrain />} />
                    <Route path="/live-analysis" element={<LiveAnalysis />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/data-reports" element={<DataReports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/manuals" element={<Manuals />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
