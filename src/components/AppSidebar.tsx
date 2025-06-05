
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
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Mass Balance",
    url: "/mass-balance",
    icon: Calculator,
  },
  {
    title: "Tell Us About Grain",
    url: "/tell-us-about-grain",
    icon: Wheat,
  },
  {
    title: "Know Your Grains",
    url: "/know-your-grains",
    icon: Eye,
  },
  {
    title: "Live Analysis",
    url: "/live-analysis",
    icon: Camera,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: LineChart,
  },
  {
    title: "Data Reports",
    url: "/data-reports",
    icon: FileText,
  },
  {
    title: "Load Configurations",
    url: "/load-configurations",
    icon: Settings,
  },
  {
    title: "Manuals",
    url: "/manuals",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const location = useLocation();

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
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`text-white hover:bg-white hover:text-rice-primary transition-all duration-200 hover:scale-105 mb-1 ${
                      location.pathname === item.url 
                        ? 'bg-white text-rice-primary' 
                        : ''
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
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
