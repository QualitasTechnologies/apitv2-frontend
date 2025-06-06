import {
  BarChart3,
  Calculator,
  Camera,
  FileText,
  Home,
  LineChart,
  Settings,
  BookOpen,
  Wheat,
  Eye,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    titleKey: "nav.dashboard",
    url: "/",
    icon: Home,
  },
  {
    titleKey: "nav.massBalance",
    url: "/mass-balance",
    icon: Calculator,
  },
  {
    titleKey: "nav.tellUsAboutGrain",
    url: "/tell-us-about-grain",
    icon: Wheat,
  },
  {
    titleKey: "nav.knowYourGrains",
    url: "/know-your-grains",
    icon: Eye,
  },
  {
    titleKey: "nav.liveAnalysis",
    url: "/live-analysis",
    icon: Camera,
  },
  {
    titleKey: "nav.analytics",
    url: "/analytics",
    icon: LineChart,
  },
  {
    titleKey: "nav.dataReports",
    url: "/data-reports",
    icon: FileText,
  },
  {
    titleKey: "nav.settings",
    url: "/settings",
    icon: Settings,
  },
  {
    titleKey: "nav.manuals",
    url: "/manuals",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <Sidebar className="bg-rice-primary border-0">
      <SidebarHeader className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-rice-secondary rounded-full flex items-center justify-center">
            <Wheat className="w-5 h-5 text-rice-primary" />
          </div>
          <div className="text-white">
            <div className="font-bold text-lg">APIT</div>
            <div className="text-sm opacity-80">Rice Doctor</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-rice-secondary font-semibold mb-4">
            {t('nav.navigation')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton
                    asChild
                    className={`text-white/90 hover:bg-white/10 hover:text-white hover:shadow-lg hover:border-l-4 hover:border-rice-secondary transition-all duration-300 ease-in-out hover:scale-[1.02] mb-1 rounded-lg backdrop-blur-sm ${
                      location.pathname === item.url 
                        ? 'bg-white/15 text-white border-l-4 border-rice-secondary shadow-md' 
                        : 'hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5'
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium transition-all duration-300">{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
