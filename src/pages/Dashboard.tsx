
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
      value: "1,250",
      icon: CheckCircle,
    },
    {
      title: "Avg. Processing Time (sec)",
      value: "18.3",
      icon: Clock,
    },
    {
      title: "Most Analyzed Variety",
      value: "IR64",
      icon: Wheat,
    },
    {
      title: "Total Weight (kg)",
      value: "456.7",
      icon: TrendingUp,
    },
  ];

  const quickActions = [
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
    {
      title: "Tell Us About Grain",
      description: "Provide sample categorization",
      icon: Wheat,
      url: "/tell-us-about-grain",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <PageHeader 
        title="Dashboard" 
        subtitle="Central hub for rice quality management"
      />
      
      <div className="flex-1 overflow-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 hover:from-rice-primary/5 hover:to-rice-secondary/5" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">{stat.title}</p>
                    <p className="text-4xl font-bold text-rice-primary group-hover:text-rice-secondary transition-colors duration-300">{stat.value}</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-rice-primary/10 to-rice-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <stat.icon className="w-8 h-8 text-rice-primary group-hover:text-rice-secondary transition-colors duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '400ms' }}>
          <CardHeader className="bg-gradient-to-r from-rice-primary/5 to-rice-secondary/5 border-b">
            <CardTitle className="text-rice-primary flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.url} className="group">
                  <div 
                    className="animate-fade-in"
                    style={{ animationDelay: `${500 + index * 150}ms` }}
                  >
                    <Button
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center space-y-4 hover:scale-110 transition-all duration-300 w-full bg-gradient-to-br from-white to-gray-50 hover:from-rice-secondary/5 hover:to-rice-primary/5 hover:border-rice-secondary hover:shadow-lg group-hover:shadow-2xl border-2"
                    >
                      <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <action.icon className="w-7 h-7 text-white group-hover:animate-pulse" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-rice-primary text-lg group-hover:text-rice-secondary transition-colors duration-300">{action.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{action.description}</div>
                      </div>
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Previous Sample Summary */}
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <CardHeader className="bg-gradient-to-r from-rice-primary/5 to-rice-secondary/5 border-b">
            <CardTitle className="text-rice-primary flex items-center gap-2">
              <Wheat className="w-5 h-5" />
              Previous Sample Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sample Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rice-primary/5 to-rice-secondary/5 p-4 rounded-xl border border-rice-primary/10 hover:border-rice-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Variety</span>
                  </div>
                  <div className="text-2xl font-bold text-rice-primary animate-pulse">IR64</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xl font-semibold text-green-700">Head-Rice</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">RGB Index</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">73</div>
                </div>
              </div>

              {/* Quality Metrics - Visual Grid */}
              <div className="lg:col-span-2">
                <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center">Quality Breakdown</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 hover:border-green-400 hover:scale-105 transition-all duration-300 transform hover:shadow-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <span className="text-xl font-bold text-white">65%</span>
                        </div>
                        <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Head-Rice</span>
                        <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-[slideIn_1.5s_ease-out] w-[65%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border-2 border-red-200 hover:border-red-400 hover:scale-105 transition-all duration-300 transform hover:shadow-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <span className="text-xl font-bold text-white">12%</span>
                        </div>
                        <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">Defects & Impurities</span>
                        <div className="mt-2 h-2 bg-red-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-[slideIn_1.8s_ease-out] w-[12%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 hover:scale-105 transition-all duration-300 transform hover:shadow-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <span className="text-xl font-bold text-white">10%</span>
                        </div>
                        <span className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Brokens</span>
                        <div className="mt-2 h-2 bg-yellow-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-[slideIn_2.1s_ease-out] w-[10%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 hover:border-orange-400 hover:scale-105 transition-all duration-300 transform hover:shadow-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <span className="text-xl font-bold text-white">8%</span>
                        </div>
                        <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Chalky</span>
                        <div className="mt-2 h-2 bg-orange-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-[slideIn_2.4s_ease-out] w-[8%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-fade-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '800ms' }}>
          <CardHeader className="bg-gradient-to-r from-rice-primary/5 to-rice-secondary/5 border-b">
            <CardTitle className="text-rice-primary flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { time: "10 min ago", action: "Sample #1250 analyzed, Variety: IR64", type: "analysis", color: "bg-green-500" },
                { time: "30 min ago", action: "Total processed samples reached 1250", type: "milestone", color: "bg-blue-500" },
                { time: "30 Jan", action: "Sample #1249 analyzed, Variety: Basmati 370", type: "analysis", color: "bg-purple-500" },
              ].map((activity, index) => (
                <div 
                  key={index} 
                  className="group animate-fade-in hover:bg-gradient-to-r hover:from-rice-primary/5 hover:to-rice-secondary/5 p-4 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer border border-transparent hover:border-rice-primary/20"
                  style={{ animationDelay: `${900 + index * 200}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 ${activity.color} rounded-full animate-pulse shadow-lg`}></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-rice-primary transition-colors duration-300">{activity.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <p className="text-sm text-gray-500 font-medium">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
