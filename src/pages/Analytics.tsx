
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { BarChart3, LineChart as LineChartIcon, TrendingUp } from "lucide-react";

const Analytics = () => {
  const [selectedParameters, setSelectedParameters] = useState({
    headRice: true,
    brokenRice: true,
    defectiveGrain: false,
    goodGrain: true
  });
  
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Mock data for charts
  const data = [
    { date: '2024-01', headRice: 92.5, brokenRice: 5.2, defectiveGrain: 2.3, goodGrain: 97.7 },
    { date: '2024-02', headRice: 91.8, brokenRice: 6.1, defectiveGrain: 2.1, goodGrain: 97.9 },
    { date: '2024-03', headRice: 93.2, brokenRice: 4.8, defectiveGrain: 2.0, goodGrain: 98.0 },
    { date: '2024-04', headRice: 94.1, brokenRice: 4.2, defectiveGrain: 1.7, goodGrain: 98.3 },
    { date: '2024-05', headRice: 93.8, brokenRice: 4.5, defectiveGrain: 1.7, goodGrain: 98.3 },
    { date: '2024-06', headRice: 95.2, brokenRice: 3.8, defectiveGrain: 1.0, goodGrain: 99.0 }
  ];

  const handleParameterChange = (parameter: string, checked: boolean) => {
    setSelectedParameters(prev => ({ ...prev, [parameter]: checked }));
  };

  const getLineColor = (parameter: string) => {
    const colors: { [key: string]: string } = {
      headRice: '#3B82F6',
      brokenRice: '#EF4444',
      defectiveGrain: '#F59E0B',
      goodGrain: '#10B981'
    };
    return colors[parameter] || '#6B7280';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Analytics" 
        subtitle="Visual representation of rice quality data"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Parameter Selection */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Select Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(selectedParameters).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                      />
                      <Label 
                        htmlFor={key} 
                        className="capitalize cursor-pointer font-medium"
                      >
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <div 
                        className="w-4 h-4 rounded-full ml-2"
                        style={{ backgroundColor: getLineColor(key) }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chart Type Selection */}
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">Visualization Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant={chartType === 'line' ? 'default' : 'outline'}
                    onClick={() => setChartType('line')}
                    className="w-full flex items-center space-x-2"
                  >
                    <LineChartIcon className="w-4 h-4" />
                    <span>Line Chart</span>
                  </Button>
                  
                  <Button
                    variant={chartType === 'bar' ? 'default' : 'outline'}
                    onClick={() => setChartType('bar')}
                    className="w-full flex items-center space-x-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Bar Chart</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Display */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <TrendingUp className="w-6 h-6" />
                <span>Quality Metrics Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {Object.entries(selectedParameters).map(([key, selected]) => 
                        selected && (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={getLineColor(key)}
                            strokeWidth={3}
                            dot={{ fill: getLineColor(key), strokeWidth: 2, r: 4 }}
                            name={key.replace(/([A-Z])/g, ' $1').trim()}
                            animationDuration={1000}
                          />
                        )
                      )}
                    </LineChart>
                  ) : (
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {Object.entries(selectedParameters).map(([key, selected]) => 
                        selected && (
                          <Bar
                            key={key}
                            dataKey={key}
                            fill={getLineColor(key)}
                            name={key.replace(/([A-Z])/g, ' $1').trim()}
                            animationDuration={1000}
                          />
                        )
                      )}
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(selectedParameters).map(([key, selected]) => {
              if (!selected) return null;
              
              const values = data.map(d => d[key as keyof typeof d] as number);
              const avg = values.reduce((a, b) => a + b, 0) / values.length;
              const max = Math.max(...values);
              const min = Math.min(...values);

              return (
                <Card key={key} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div 
                        className="w-4 h-4 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: getLineColor(key) }}
                      />
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="mt-4 space-y-2">
                        <div>
                          <span className="text-sm text-gray-600">Average</span>
                          <p className="text-xl font-bold" style={{ color: getLineColor(key) }}>
                            {avg.toFixed(1)}%
                          </p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Min: {min.toFixed(1)}%</span>
                          <span>Max: {max.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
