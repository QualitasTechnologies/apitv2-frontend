import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Camera, Save, Trash2, Play, Pause, BarChart3, Percent } from "lucide-react";

const LiveAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [showPercentage, setShowPercentage] = useState(true);
  
  // Initial metrics structure based on JSON - these will be normalized to sum to 100%
  const baseMetrics = {
    goodRice: {
      headRice: 45.2,
      threeFourthHead: 25.8,
      halfBrokens: 12.3,
      quarterFineBrokens: 8.1,
      tips: 3.6
    },
    rejections: {
      harvest: {
        chalkyBellyCore: 1.2,
        yellow: 0.8,
        black: 0.3,
        immatureGreen: 0.5,
        peckyGrains: 0.2,
        discolored: 0.4
      },
      process: {
        chalkyWhole: 0.6,
        blackTips: 0.3,
        burnt: 0.1,
        spot: 0.2,
        discoloration: 0.3
      }
    },
    foreignMatter: {
      organic: {
        red: 0.1,
        husk: 0.2,
        paddy: 0.1,
        chaff: 0.1,
        straw: 0.05,
        sticks: 0.05,
        brownRice: 0.1
      },
      inorganic: {
        stones: 0.05,
        mud: 0.02,
        thread: 0.01,
        plastic: 0.01,
        metals: 0.005,
        glass: 0.005
      }
    }
  };

  // Function to normalize metrics to sum to 100%
  const normalizeMetrics = (metrics: typeof baseMetrics) => {
    // Calculate all individual values
    const allValues: number[] = [];
    
    // Add good rice values
    Object.values(metrics.goodRice).forEach(val => allValues.push(val));
    
    // Add rejection values
    Object.values(metrics.rejections.harvest).forEach(val => allValues.push(val));
    Object.values(metrics.rejections.process).forEach(val => allValues.push(val));
    
    // Add foreign matter values
    Object.values(metrics.foreignMatter.organic).forEach(val => allValues.push(val));
    Object.values(metrics.foreignMatter.inorganic).forEach(val => allValues.push(val));
    
    // Calculate current total
    const currentTotal = allValues.reduce((sum, val) => sum + val, 0);
    
    // Normalization factor to make total = 100
    const normalizationFactor = 100 / currentTotal;
    
    // Apply normalization
    const normalized = {
      goodRice: {
        headRice: metrics.goodRice.headRice * normalizationFactor,
        threeFourthHead: metrics.goodRice.threeFourthHead * normalizationFactor,
        halfBrokens: metrics.goodRice.halfBrokens * normalizationFactor,
        quarterFineBrokens: metrics.goodRice.quarterFineBrokens * normalizationFactor,
        tips: metrics.goodRice.tips * normalizationFactor
      },
      rejections: {
        harvest: {
          chalkyBellyCore: metrics.rejections.harvest.chalkyBellyCore * normalizationFactor,
          yellow: metrics.rejections.harvest.yellow * normalizationFactor,
          black: metrics.rejections.harvest.black * normalizationFactor,
          immatureGreen: metrics.rejections.harvest.immatureGreen * normalizationFactor,
          peckyGrains: metrics.rejections.harvest.peckyGrains * normalizationFactor,
          discolored: metrics.rejections.harvest.discolored * normalizationFactor
        },
        process: {
          chalkyWhole: metrics.rejections.process.chalkyWhole * normalizationFactor,
          blackTips: metrics.rejections.process.blackTips * normalizationFactor,
          burnt: metrics.rejections.process.burnt * normalizationFactor,
          spot: metrics.rejections.process.spot * normalizationFactor,
          discoloration: metrics.rejections.process.discoloration * normalizationFactor
        }
      },
      foreignMatter: {
        organic: {
          red: metrics.foreignMatter.organic.red * normalizationFactor,
          husk: metrics.foreignMatter.organic.husk * normalizationFactor,
          paddy: metrics.foreignMatter.organic.paddy * normalizationFactor,
          chaff: metrics.foreignMatter.organic.chaff * normalizationFactor,
          straw: metrics.foreignMatter.organic.straw * normalizationFactor,
          sticks: metrics.foreignMatter.organic.sticks * normalizationFactor,
          brownRice: metrics.foreignMatter.organic.brownRice * normalizationFactor
        },
        inorganic: {
          stones: metrics.foreignMatter.inorganic.stones * normalizationFactor,
          mud: metrics.foreignMatter.inorganic.mud * normalizationFactor,
          thread: metrics.foreignMatter.inorganic.thread * normalizationFactor,
          plastic: metrics.foreignMatter.inorganic.plastic * normalizationFactor,
          metals: metrics.foreignMatter.inorganic.metals * normalizationFactor,
          glass: metrics.foreignMatter.inorganic.glass * normalizationFactor
        }
      }
    };
    
    return normalized;
  };

  const initialMetrics = normalizeMetrics(baseMetrics);
  const [metrics, setMetrics] = useState(initialMetrics);

  // Calculate totals for each category
  const calculateTotals = (metricsData: typeof initialMetrics) => {
    const goodRiceTotal = Object.values(metricsData.goodRice).reduce((sum, val) => sum + val, 0);
    const harvestRejectionsTotal = Object.values(metricsData.rejections.harvest).reduce((sum, val) => sum + val, 0);
    const processRejectionsTotal = Object.values(metricsData.rejections.process).reduce((sum, val) => sum + val, 0);
    const organicForeignTotal = Object.values(metricsData.foreignMatter.organic).reduce((sum, val) => sum + val, 0);
    const inorganicForeignTotal = Object.values(metricsData.foreignMatter.inorganic).reduce((sum, val) => sum + val, 0);
    
    const rejectionsTotal = harvestRejectionsTotal + processRejectionsTotal;
    const foreignMatterTotal = organicForeignTotal + inorganicForeignTotal;
    const grandTotal = goodRiceTotal + rejectionsTotal + foreignMatterTotal;
    
    return {
      goodRice: goodRiceTotal,
      rejections: rejectionsTotal,
      foreignMatter: foreignMatterTotal,
      total: grandTotal
    };
  };

  // Generate random variations for live analysis with normalization
  const generateRandomMetrics = () => {
    const variation = () => (Math.random() - 0.5) * 2; // -1 to +1 variation
    
    // Create variations but ensure they don't go negative
    const rawMetrics = {
      goodRice: {
        headRice: Math.max(0.1, baseMetrics.goodRice.headRice + variation()),
        threeFourthHead: Math.max(0.1, baseMetrics.goodRice.threeFourthHead + variation()),
        halfBrokens: Math.max(0.1, baseMetrics.goodRice.halfBrokens + variation()),
        quarterFineBrokens: Math.max(0.1, baseMetrics.goodRice.quarterFineBrokens + variation()),
        tips: Math.max(0.05, baseMetrics.goodRice.tips + variation() * 0.5)
      },
      rejections: {
        harvest: {
          chalkyBellyCore: Math.max(0.01, baseMetrics.rejections.harvest.chalkyBellyCore + variation() * 0.5),
          yellow: Math.max(0.01, baseMetrics.rejections.harvest.yellow + variation() * 0.3),
          black: Math.max(0.01, baseMetrics.rejections.harvest.black + variation() * 0.2),
          immatureGreen: Math.max(0.01, baseMetrics.rejections.harvest.immatureGreen + variation() * 0.3),
          peckyGrains: Math.max(0.01, baseMetrics.rejections.harvest.peckyGrains + variation() * 0.1),
          discolored: Math.max(0.01, baseMetrics.rejections.harvest.discolored + variation() * 0.2)
        },
        process: {
          chalkyWhole: Math.max(0.01, baseMetrics.rejections.process.chalkyWhole + variation() * 0.3),
          blackTips: Math.max(0.01, baseMetrics.rejections.process.blackTips + variation() * 0.2),
          burnt: Math.max(0.01, baseMetrics.rejections.process.burnt + variation() * 0.1),
          spot: Math.max(0.01, baseMetrics.rejections.process.spot + variation() * 0.1),
          discoloration: Math.max(0.01, baseMetrics.rejections.process.discoloration + variation() * 0.2)
        }
      },
      foreignMatter: {
        organic: {
          red: Math.max(0.005, baseMetrics.foreignMatter.organic.red + variation() * 0.05),
          husk: Math.max(0.005, baseMetrics.foreignMatter.organic.husk + variation() * 0.1),
          paddy: Math.max(0.005, baseMetrics.foreignMatter.organic.paddy + variation() * 0.05),
          chaff: Math.max(0.005, baseMetrics.foreignMatter.organic.chaff + variation() * 0.05),
          straw: Math.max(0.002, baseMetrics.foreignMatter.organic.straw + variation() * 0.02),
          sticks: Math.max(0.002, baseMetrics.foreignMatter.organic.sticks + variation() * 0.02),
          brownRice: Math.max(0.005, baseMetrics.foreignMatter.organic.brownRice + variation() * 0.05)
        },
        inorganic: {
          stones: Math.max(0.001, baseMetrics.foreignMatter.inorganic.stones + variation() * 0.02),
          mud: Math.max(0.001, baseMetrics.foreignMatter.inorganic.mud + variation() * 0.01),
          thread: Math.max(0.001, baseMetrics.foreignMatter.inorganic.thread + variation() * 0.005),
          plastic: Math.max(0.001, baseMetrics.foreignMatter.inorganic.plastic + variation() * 0.005),
          metals: Math.max(0.001, baseMetrics.foreignMatter.inorganic.metals + variation() * 0.002),
          glass: Math.max(0.001, baseMetrics.foreignMatter.inorganic.glass + variation() * 0.002)
        }
      }
    };
    
    // Normalize to ensure total = 100%
    return normalizeMetrics(rawMetrics);
  };

  // Update metrics when analyzing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setMetrics(generateRandomMetrics());
      }, 2000); // Update every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleStartStop = () => {
    setIsAnalyzing(!isAnalyzing);
    if (!isAnalyzing) {
      console.log("Starting analysis");
    } else {
      console.log("Stopping analysis");
      setMetrics(initialMetrics); // Reset to initial values
    }
  };

  const handleSaveSample = () => {
    console.log("Saving sample with results:", metrics);
  };

  const handleDeleteSample = () => {
    console.log("Deleting current sample");
    setMetrics(initialMetrics);
  };

  const totals = calculateTotals(metrics);

  // Generate sample counts for demonstration (simulating actual grain counts)
  const generateCounts = (percentage: number) => Math.round(percentage * 10); // 10x multiplier for demo

  // Create flat array of all metrics with their properties
  const getAllMetrics = () => {
    return [
      // Good Rice
      { category: 'Good Rice', name: 'Head Rice', value: metrics.goodRice.headRice, color: 'bg-green-500', textColor: 'text-green-700' },
      { category: 'Good Rice', name: '≥ 3/4 (Head rice)', value: metrics.goodRice.threeFourthHead, color: 'bg-green-400', textColor: 'text-green-700' },
      { category: 'Good Rice', name: '≥ 1/2 (Brokens)', value: metrics.goodRice.halfBrokens, color: 'bg-green-300', textColor: 'text-green-700' },
      { category: 'Good Rice', name: '≤ 1/4 (Fine brokens)', value: metrics.goodRice.quarterFineBrokens, color: 'bg-green-200', textColor: 'text-green-700' },
      { category: 'Good Rice', name: 'Tips (less than 1/4)', value: metrics.goodRice.tips, color: 'bg-green-100', textColor: 'text-green-700' },
      
      // Harvest Rejections
      { category: 'Harvest Rejections', name: 'Chalky (Belly, core)', value: metrics.rejections.harvest.chalkyBellyCore, color: 'bg-red-500', textColor: 'text-red-700' },
      { category: 'Harvest Rejections', name: 'Yellow', value: metrics.rejections.harvest.yellow, color: 'bg-red-400', textColor: 'text-red-700' },
      { category: 'Harvest Rejections', name: 'Black', value: metrics.rejections.harvest.black, color: 'bg-red-300', textColor: 'text-red-700' },
      { category: 'Harvest Rejections', name: 'Immature (Green)', value: metrics.rejections.harvest.immatureGreen, color: 'bg-red-200', textColor: 'text-red-700' },
      { category: 'Harvest Rejections', name: 'Pecky grains', value: metrics.rejections.harvest.peckyGrains, color: 'bg-red-100', textColor: 'text-red-700' },
      { category: 'Harvest Rejections', name: 'Discolored', value: metrics.rejections.harvest.discolored, color: 'bg-red-50', textColor: 'text-red-700' },
      
      // Process Rejections
      { category: 'Process Rejections', name: 'Chalky (Whole)', value: metrics.rejections.process.chalkyWhole, color: 'bg-pink-500', textColor: 'text-pink-700' },
      { category: 'Process Rejections', name: 'Black Tips', value: metrics.rejections.process.blackTips, color: 'bg-pink-400', textColor: 'text-pink-700' },
      { category: 'Process Rejections', name: 'Burnt', value: metrics.rejections.process.burnt, color: 'bg-pink-300', textColor: 'text-pink-700' },
      { category: 'Process Rejections', name: 'Spot', value: metrics.rejections.process.spot, color: 'bg-pink-200', textColor: 'text-pink-700' },
      { category: 'Process Rejections', name: 'Discoloration', value: metrics.rejections.process.discoloration, color: 'bg-pink-100', textColor: 'text-pink-700' },
      
      // Organic Foreign Matter
      { category: 'Organic Foreign Matter', name: 'Red', value: metrics.foreignMatter.organic.red, color: 'bg-orange-500', textColor: 'text-orange-700' },
      { category: 'Organic Foreign Matter', name: 'Husk', value: metrics.foreignMatter.organic.husk, color: 'bg-orange-400', textColor: 'text-orange-700' },
      { category: 'Organic Foreign Matter', name: 'Paddy', value: metrics.foreignMatter.organic.paddy, color: 'bg-orange-300', textColor: 'text-orange-700' },
      { category: 'Organic Foreign Matter', name: 'Chaff', value: metrics.foreignMatter.organic.chaff, color: 'bg-orange-200', textColor: 'text-orange-700' },
      { category: 'Organic Foreign Matter', name: 'Straw', value: metrics.foreignMatter.organic.straw, color: 'bg-orange-100', textColor: 'text-orange-700' },
      { category: 'Organic Foreign Matter', name: 'Sticks', value: metrics.foreignMatter.organic.sticks, color: 'bg-orange-50', textColor: 'text-orange-700' },
      { category: 'Organic Foreign Matter', name: 'Brown rice', value: metrics.foreignMatter.organic.brownRice, color: 'bg-amber-200', textColor: 'text-orange-700' },
      
      // Inorganic Foreign Matter
      { category: 'Inorganic Foreign Matter', name: 'Stones', value: metrics.foreignMatter.inorganic.stones, color: 'bg-gray-500', textColor: 'text-gray-700' },
      { category: 'Inorganic Foreign Matter', name: 'Mud', value: metrics.foreignMatter.inorganic.mud, color: 'bg-gray-400', textColor: 'text-gray-700' },
      { category: 'Inorganic Foreign Matter', name: 'Thread', value: metrics.foreignMatter.inorganic.thread, color: 'bg-gray-300', textColor: 'text-gray-700' },
      { category: 'Inorganic Foreign Matter', name: 'Plastic', value: metrics.foreignMatter.inorganic.plastic, color: 'bg-gray-200', textColor: 'text-gray-700' },
      { category: 'Inorganic Foreign Matter', name: 'Metals', value: metrics.foreignMatter.inorganic.metals, color: 'bg-gray-100', textColor: 'text-gray-700' },
      { category: 'Inorganic Foreign Matter', name: 'Glass', value: metrics.foreignMatter.inorganic.glass, color: 'bg-gray-50', textColor: 'text-gray-700' },
    ];
  };

  const MetricBar = ({ metric }: { metric: any }) => {
    const displayValue = showPercentage ? metric.value : generateCounts(metric.value);
    const maxValue = showPercentage ? 50 : 500; // Max for visual scaling
    const progressValue = (displayValue / maxValue) * 100;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${metric.textColor}`}>{metric.name}</span>
          <span className={`text-sm font-bold ${metric.textColor}`}>
            {showPercentage ? `${displayValue.toFixed(displayValue < 1 ? 2 : 1)}%` : displayValue}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${metric.color} transition-all duration-500 ease-in-out ${isAnalyzing ? 'animate-pulse' : ''}`}
            style={{ width: `${Math.min(progressValue, 100)}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Live Detection & Analysis" 
        subtitle="Real-time rice grain quality analysis"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Analysis Controls Header */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleStartStop}
                className={`${
                  isAnalyzing 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white px-6 py-3`}
              >
                {isAnalyzing ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Stop Analysis
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isAnalyzing ? 'bg-green-100' : 'bg-gray-100'}`}>
                <div className={`w-3 h-3 rounded-full ${isAnalyzing ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">{isAnalyzing ? 'Analyzing' : 'Stopped'}</span>
              </div>
            </div>

            {/* Metric Toggle */}
            <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
              <BarChart3 className={`w-4 h-4 ${!showPercentage ? 'text-rice-primary' : 'text-gray-400'}`} />
              <Switch 
                checked={showPercentage}
                onCheckedChange={setShowPercentage}
              />
              <Percent className={`w-4 h-4 ${showPercentage ? 'text-rice-primary' : 'text-gray-400'}`} />
              <span className="text-sm font-medium text-gray-700">
                {showPercentage ? 'Percentage' : 'Count'}
              </span>
            </div>
          </div>

          {/* Main Analysis Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Camera Feed */}
            <div className="xl:col-span-1">
              <Card className="animate-fade-in h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-rice-primary">
                    <Camera className="w-6 h-6" />
                    <span>Live Camera Feed</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Mock Camera Feed */}
                    <div className="aspect-square bg-gray-900 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                      
                      {/* Mock Rice Grains */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-6 gap-2 p-6">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-2 rounded-full ${
                                i % 6 === 0 ? 'bg-red-400' : 'bg-amber-200'
                              } ${isAnalyzing ? 'animate-pulse' : ''}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Analysis Status */}
                      {isAnalyzing && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                          Analyzing...
                        </div>
                      )}

                      {/* Analysis Overlay */}
                      {isAnalyzing && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/70 text-white p-3 rounded-lg">
                            <div className="text-sm">Frame {Math.floor(Math.random() * 1000)}</div>
                            <div className="text-xs opacity-80">1920x1080 | 30fps</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls Card */}
              <Card className="animate-fade-in mt-6" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle className="text-rice-primary">Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-save" className="font-medium">Auto Save</Label>
                      <Switch 
                        id="auto-save"
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={handleSaveSample}
                        className="w-full bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Sample
                      </Button>
                      
                      <Button 
                        onClick={handleDeleteSample}
                        variant="destructive"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Sample
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Metrics with Individual Bars */}
            <div className="xl:col-span-2">
              <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="text-rice-primary">Detailed Metrics - Individual Components</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Real-time analysis of individual rice grain components with {showPercentage ? 'percentage' : 'count'} values
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Good Rice Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Good Rice ({totals.goodRice.toFixed(1)}%)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {getAllMetrics().filter(m => m.category === 'Good Rice').map((metric, idx) => (
                          <MetricBar key={`good-${idx}`} metric={metric} />
                        ))}
                      </div>
                    </div>

                    {/* Harvest Rejections Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Harvest Rejections
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAllMetrics().filter(m => m.category === 'Harvest Rejections').map((metric, idx) => (
                          <MetricBar key={`harvest-${idx}`} metric={metric} />
                        ))}
                      </div>
                    </div>

                    {/* Process Rejections Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                        Process Rejections
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAllMetrics().filter(m => m.category === 'Process Rejections').map((metric, idx) => (
                          <MetricBar key={`process-${idx}`} metric={metric} />
                        ))}
                      </div>
                    </div>

                    {/* Organic Foreign Matter Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        Organic Foreign Matter
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAllMetrics().filter(m => m.category === 'Organic Foreign Matter').map((metric, idx) => (
                          <MetricBar key={`organic-${idx}`} metric={metric} />
                        ))}
                      </div>
                    </div>

                    {/* Inorganic Foreign Matter Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                        Inorganic Foreign Matter
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAllMetrics().filter(m => m.category === 'Inorganic Foreign Matter').map((metric, idx) => (
                          <MetricBar key={`inorganic-${idx}`} metric={metric} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sample Information */}
          <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="text-rice-primary">Current Sample Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Sample ID:</span>
                  <p className="font-medium">RD-{new Date().getTime().toString().slice(-6)}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Timestamp:</span>
                  <p className="font-medium">{new Date().toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Variety:</span>
                  <p className="font-medium">BASMATI</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Process:</span>
                  <p className="font-medium">Raw</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;
