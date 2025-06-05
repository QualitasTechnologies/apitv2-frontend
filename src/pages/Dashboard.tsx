
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calculator,
  Camera,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Wheat,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Samples Processed",
      value: "1,247",
      icon: CheckCircle,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Processing Time (Avg)",
      value: "3.2 min",
      icon: Clock,
      change: "-8%",
      changeType: "positive" as const,
    },
    {
      title: "Quality Score (Avg)",
      value: "94.5%",
      icon: TrendingUp,
      change: "+2.1%",
      changeType: "positive" as const,
    },
    {
      title: "Active Batches",
      value: "15",
      icon: Wheat,
      change: "+3",
      changeType: "positive" as const,
    },
  ];

  const quickActions = [
    {
      title: "Mass Balance",
      description: "Calculate component breakdown",
      icon: Calculator,
      url: "/mass-balance",
      color: "bg-blue-500",
    },
    {
      title: "Live Analysis",
      description: "Start real-time detection",
      icon: Camera,
      url: "/live-analysis",
      color: "bg-green-500",
    },
    {
      title: "Analytics",
      description: "View quality metrics",
      icon: BarChart3,
      url: "/analytics",
      color: "bg-purple-500",
    },
    {
      title: "Reports",
      description: "Generate and export data",
      icon: FileText,
      url: "/data-reports",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Dashboard" 
        subtitle="Central hub for rice quality management"
      />
      
      <div className="flex-1 overflow-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-rice-primary">{stat.value}</p>
                    <p className={`text-sm mt-2 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-rice-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-rice-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-rice-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.url}>
                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center space-y-3 hover:scale-105 transition-all duration-200 w-full bg-white hover:bg-rice-secondary/10 hover:border-rice-secondary"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-rice-primary">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.description}</div>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-rice-primary">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 mins ago", action: "Sample analysis completed", batch: "Batch #1247" },
                  { time: "15 mins ago", action: "Mass balance calculated", batch: "Batch #1246" },
                  { time: "1 hour ago", action: "Quality report generated", batch: "Batch #1245" },
                  { time: "2 hours ago", action: "New batch started", batch: "Batch #1244" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.batch}</p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-rice-primary">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { system: "Camera Module", status: "Online", color: "bg-green-500" },
                  { system: "Analysis Engine", status: "Online", color: "bg-green-500" },
                  { system: "Database", status: "Online", color: "bg-green-500" },
                  { system: "Export Service", status: "Online", color: "bg-green-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{item.system}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                      <span className="text-sm text-gray-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
