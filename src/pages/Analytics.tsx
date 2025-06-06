import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    // Good Rice parameters
    headRice: true,
    threeFourthHead: false,
    halfBrokens: false,
    quarterFineBrokens: false,
    tips: false,
    
    // Rejection parameters
    chalkyBellyCore: false,
    yellow: false,
    black: false,
    immatureGreen: false,
    peckyGrains: false,
    discolored: false,
    chalkyWhole: false,
    blackTips: false,
    burnt: false,
    spot: false,
    discoloration: false,
    
    // Foreign Matter parameters
    red: false,
    husk: false,
    paddy: false,
    chaff: false,
    straw: false,
    sticks: false,
    brownRice: false,
    stones: false,
    mud: false,
    thread: false,
    plastic: false,
    metals: false,
    glass: false,
    
    // Category totals
    goodRiceTotal: true,
    rejectionsTotal: true,
    foreignMatterTotal: false
  });
  
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Function to normalize a data point to sum to 100%
  const normalizeDataPoint = (dataPoint: any) => {
    // Extract all individual parameter values (excluding date and totals)
    const parameterKeys = [
      'headRice', 'threeFourthHead', 'halfBrokens', 'quarterFineBrokens', 'tips',
      'chalkyBellyCore', 'yellow', 'black', 'immatureGreen', 'peckyGrains', 'discolored',
      'chalkyWhole', 'blackTips', 'burnt', 'spot', 'discoloration',
      'red', 'husk', 'paddy', 'chaff', 'straw', 'sticks', 'brownRice',
      'stones', 'mud', 'thread', 'plastic', 'metals', 'glass'
    ];
    
    // Calculate current total
    const currentTotal = parameterKeys.reduce((sum, key) => sum + (dataPoint[key] || 0), 0);
    
    // Normalization factor
    const normalizationFactor = 100 / currentTotal;
    
    // Create normalized data point
    const normalized = { ...dataPoint };
    
    // Normalize all parameters
    parameterKeys.forEach(key => {
      if (normalized[key]) {
        normalized[key] = normalized[key] * normalizationFactor;
      }
    });
    
    // Calculate normalized totals
    const goodRiceKeys = ['headRice', 'threeFourthHead', 'halfBrokens', 'quarterFineBrokens', 'tips'];
    const harvestRejectionKeys = ['chalkyBellyCore', 'yellow', 'black', 'immatureGreen', 'peckyGrains', 'discolored'];
    const processRejectionKeys = ['chalkyWhole', 'blackTips', 'burnt', 'spot', 'discoloration'];
    const organicForeignKeys = ['red', 'husk', 'paddy', 'chaff', 'straw', 'sticks', 'brownRice'];
    const inorganicForeignKeys = ['stones', 'mud', 'thread', 'plastic', 'metals', 'glass'];
    
    normalized.goodRiceTotal = goodRiceKeys.reduce((sum, key) => sum + (normalized[key] || 0), 0);
    normalized.rejectionsTotal = 
      harvestRejectionKeys.reduce((sum, key) => sum + (normalized[key] || 0), 0) +
      processRejectionKeys.reduce((sum, key) => sum + (normalized[key] || 0), 0);
    normalized.foreignMatterTotal = 
      organicForeignKeys.reduce((sum, key) => sum + (normalized[key] || 0), 0) +
      inorganicForeignKeys.reduce((sum, key) => sum + (normalized[key] || 0), 0);
    
    return normalized;
  };

  // Raw data that will be normalized
  const rawData = [
    { 
      date: '2024-01',
      // Good Rice
      headRice: 45.2, threeFourthHead: 25.8, halfBrokens: 12.3, quarterFineBrokens: 8.1, tips: 3.6,
      // Harvest Rejections
      chalkyBellyCore: 1.2, yellow: 0.8, black: 0.3, immatureGreen: 0.5, peckyGrains: 0.2, discolored: 0.4,
      // Process Rejections
      chalkyWhole: 0.6, blackTips: 0.3, burnt: 0.1, spot: 0.2, discoloration: 0.3,
      // Organic Foreign Matter
      red: 0.1, husk: 0.2, paddy: 0.1, chaff: 0.1, straw: 0.05, sticks: 0.05, brownRice: 0.1,
      // Inorganic Foreign Matter
      stones: 0.05, mud: 0.02, thread: 0.01, plastic: 0.01, metals: 0.005, glass: 0.005
    },
    { 
      date: '2024-02',
      headRice: 46.1, threeFourthHead: 26.2, halfBrokens: 11.8, quarterFineBrokens: 7.9, tips: 3.5,
      chalkyBellyCore: 1.1, yellow: 0.7, black: 0.2, immatureGreen: 0.4, peckyGrains: 0.2, discolored: 0.3,
      chalkyWhole: 0.5, blackTips: 0.2, burnt: 0.1, spot: 0.1, discoloration: 0.2,
      red: 0.09, husk: 0.18, paddy: 0.09, chaff: 0.09, straw: 0.04, sticks: 0.04, brownRice: 0.09,
      stones: 0.04, mud: 0.018, thread: 0.009, plastic: 0.009, metals: 0.004, glass: 0.004
    },
    { 
      date: '2024-03',
      headRice: 47.3, threeFourthHead: 26.8, halfBrokens: 11.2, quarterFineBrokens: 7.5, tips: 3.2,
      chalkyBellyCore: 1.0, yellow: 0.6, black: 0.2, immatureGreen: 0.3, peckyGrains: 0.1, discolored: 0.3,
      chalkyWhole: 0.4, blackTips: 0.2, burnt: 0.05, spot: 0.1, discoloration: 0.15,
      red: 0.08, husk: 0.16, paddy: 0.08, chaff: 0.08, straw: 0.03, sticks: 0.03, brownRice: 0.08,
      stones: 0.03, mud: 0.015, thread: 0.008, plastic: 0.008, metals: 0.003, glass: 0.003
    },
    { 
      date: '2024-04',
      headRice: 48.1, threeFourthHead: 27.2, halfBrokens: 10.8, quarterFineBrokens: 7.2, tips: 3.0,
      chalkyBellyCore: 0.9, yellow: 0.5, black: 0.15, immatureGreen: 0.25, peckyGrains: 0.1, discolored: 0.25,
      chalkyWhole: 0.35, blackTips: 0.15, burnt: 0.05, spot: 0.08, discoloration: 0.12,
      red: 0.07, husk: 0.14, paddy: 0.07, chaff: 0.07, straw: 0.025, sticks: 0.025, brownRice: 0.07,
      stones: 0.025, mud: 0.012, thread: 0.007, plastic: 0.007, metals: 0.002, glass: 0.002
    },
    { 
      date: '2024-05',
      headRice: 48.8, threeFourthHead: 27.5, halfBrokens: 10.5, quarterFineBrokens: 7.0, tips: 2.9,
      chalkyBellyCore: 0.8, yellow: 0.4, black: 0.12, immatureGreen: 0.2, peckyGrains: 0.08, discolored: 0.2,
      chalkyWhole: 0.3, blackTips: 0.12, burnt: 0.04, spot: 0.06, discoloration: 0.1,
      red: 0.06, husk: 0.12, paddy: 0.06, chaff: 0.06, straw: 0.02, sticks: 0.02, brownRice: 0.06,
      stones: 0.02, mud: 0.01, thread: 0.006, plastic: 0.006, metals: 0.002, glass: 0.002
    },
    { 
      date: '2024-06',
      headRice: 49.5, threeFourthHead: 28.0, halfBrokens: 10.2, quarterFineBrokens: 6.8, tips: 2.8,
      chalkyBellyCore: 0.7, yellow: 0.3, black: 0.1, immatureGreen: 0.15, peckyGrains: 0.05, discolored: 0.15,
      chalkyWhole: 0.25, blackTips: 0.1, burnt: 0.03, spot: 0.05, discoloration: 0.08,
      red: 0.05, husk: 0.1, paddy: 0.05, chaff: 0.05, straw: 0.015, sticks: 0.015, brownRice: 0.05,
      stones: 0.015, mud: 0.008, thread: 0.005, plastic: 0.005, metals: 0.001, glass: 0.001
    }
  ];

  // Normalize all data points to ensure each sums to 100%
  const data = rawData.map(normalizeDataPoint);

  const handleParameterChange = (parameter: string, checked: boolean) => {
    setSelectedParameters(prev => ({ ...prev, [parameter]: checked }));
  };

  const getLineColor = (parameter: string) => {
    const colors: { [key: string]: string } = {
      // Good Rice - Green shades
      headRice: '#10B981', threeFourthHead: '#34D399', halfBrokens: '#6EE7B7', 
      quarterFineBrokens: '#A7F3D0', tips: '#D1FAE5',
      goodRiceTotal: '#059669',
      
      // Rejections - Red shades
      chalkyBellyCore: '#EF4444', yellow: '#F87171', black: '#FCA5A5', 
      immatureGreen: '#FECACA', peckyGrains: '#FEE2E2', discolored: '#DC2626',
      chalkyWhole: '#B91C1C', blackTips: '#991B1B', burnt: '#7F1D1D',
      spot: '#EF4444', discoloration: '#F87171',
      rejectionsTotal: '#DC2626',
      
      // Foreign Matter - Orange/Yellow shades
      red: '#F59E0B', husk: '#FBBF24', paddy: '#FCD34D', chaff: '#FDE68A',
      straw: '#FEF3C7', sticks: '#FFFBEB', brownRice: '#D97706',
      stones: '#92400E', mud: '#78350F', thread: '#451A03',
      plastic: '#F59E0B', metals: '#D97706', glass: '#B45309',
      foreignMatterTotal: '#D97706'
    };
    return colors[parameter] || '#6B7280';
  };

  const getParameterLabel = (parameter: string) => {
    const labels: { [key: string]: string } = {
      headRice: 'Head Rice',
      threeFourthHead: '≥ 3/4 (Head rice)',
      halfBrokens: '≥ 1/2 (Brokens)',
      quarterFineBrokens: '≤ 1/4 (Fine brokens)',
      tips: 'Tips (less than 1/4)',
      chalkyBellyCore: 'Chalky (Belly, core)',
      yellow: 'Yellow',
      black: 'Black',
      immatureGreen: 'Immature (Green)',
      peckyGrains: 'Pecky grains',
      discolored: 'Discolored',
      chalkyWhole: 'Chalky (Whole)',
      blackTips: 'Black Tips',
      burnt: 'Burnt',
      spot: 'Spot',
      discoloration: 'Discoloration',
      red: 'Red',
      husk: 'Husk',
      paddy: 'Paddy',
      chaff: 'Chaff',
      straw: 'Straw',
      sticks: 'Sticks',
      brownRice: 'Brown rice',
      stones: 'Stones',
      mud: 'Mud',
      thread: 'Thread',
      plastic: 'Plastic',
      metals: 'Metals',
      glass: 'Glass',
      goodRiceTotal: 'Good Rice Total',
      rejectionsTotal: 'Rejections Total',
      foreignMatterTotal: 'Foreign Matter Total'
    };
    return labels[parameter] || parameter;
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
            {/* Parameter Selection with Accordions */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Select Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {/* Category Totals */}
                  <AccordionItem value="category-totals">
                    <AccordionTrigger className="text-blue-700 font-semibold">
                      Category Totals
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {['goodRiceTotal', 'rejectionsTotal', 'foreignMatterTotal'].map((key) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={key}
                              checked={selectedParameters[key as keyof typeof selectedParameters]}
                              onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                            />
                            <Label htmlFor={key} className="cursor-pointer font-medium text-sm">
                              {getParameterLabel(key)}
                            </Label>
                            <div 
                              className="w-3 h-3 rounded-full ml-2"
                              style={{ backgroundColor: getLineColor(key) }}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Good Rice */}
                  <AccordionItem value="good-rice">
                    <AccordionTrigger className="text-green-700 font-semibold">
                      Good Rice Parameters
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {['headRice', 'threeFourthHead', 'halfBrokens', 'quarterFineBrokens', 'tips'].map((key) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={key}
                              checked={selectedParameters[key as keyof typeof selectedParameters]}
                              onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                            />
                            <Label htmlFor={key} className="cursor-pointer font-medium text-sm">
                              {getParameterLabel(key)}
                            </Label>
                            <div 
                              className="w-3 h-3 rounded-full ml-2"
                              style={{ backgroundColor: getLineColor(key) }}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Rejections */}
                  <AccordionItem value="rejections">
                    <AccordionTrigger className="text-red-700 font-semibold">
                      Rejection Parameters
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">Harvest Rejections</h4>
                          <div className="space-y-2 ml-4">
                            {['chalkyBellyCore', 'yellow', 'black', 'immatureGreen', 'peckyGrains', 'discolored'].map((key) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={key}
                                  checked={selectedParameters[key as keyof typeof selectedParameters]}
                                  onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                                />
                                <Label htmlFor={key} className="cursor-pointer font-medium text-sm">
                                  {getParameterLabel(key)}
                                </Label>
                                <div 
                                  className="w-3 h-3 rounded-full ml-2"
                                  style={{ backgroundColor: getLineColor(key) }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">Process Rejections</h4>
                          <div className="space-y-2 ml-4">
                            {['chalkyWhole', 'blackTips', 'burnt', 'spot', 'discoloration'].map((key) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={key}
                                  checked={selectedParameters[key as keyof typeof selectedParameters]}
                                  onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                                />
                                <Label htmlFor={key} className="cursor-pointer font-medium text-sm">
                                  {getParameterLabel(key)}
                                </Label>
                                <div 
                                  className="w-3 h-3 rounded-full ml-2"
                                  style={{ backgroundColor: getLineColor(key) }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Foreign Matter */}
                  <AccordionItem value="foreign-matter">
                    <AccordionTrigger className="text-orange-700 font-semibold">
                      Foreign Matter Parameters
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2">Organic Foreign Matter</h4>
                          <div className="space-y-2 ml-4">
                            {['red', 'husk', 'paddy', 'chaff', 'straw', 'sticks', 'brownRice'].map((key) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={key}
                                  checked={selectedParameters[key as keyof typeof selectedParameters]}
                                  onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                                />
                                <Label htmlFor={key} className="cursor-pointer font-medium text-sm">
                                  {getParameterLabel(key)}
                                </Label>
                                <div 
                                  className="w-3 h-3 rounded-full ml-2"
                                  style={{ backgroundColor: getLineColor(key) }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2">Inorganic Foreign Matter</h4>
                          <div className="space-y-2 ml-4">
                            {['stones', 'mud', 'thread', 'plastic', 'metals', 'glass'].map((key) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={key}
                                  checked={selectedParameters[key as keyof typeof selectedParameters]}
                                  onCheckedChange={(checked) => handleParameterChange(key, checked as boolean)}
                                />
                                <Label htmlFor={key} className="cursor-pointer font-medium text-sm">
                                  {getParameterLabel(key)}
                                </Label>
                                <div 
                                  className="w-3 h-3 rounded-full ml-2"
                                  style={{ backgroundColor: getLineColor(key) }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                            name={getParameterLabel(key)}
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
                            name={getParameterLabel(key)}
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
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {getParameterLabel(key)}
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
