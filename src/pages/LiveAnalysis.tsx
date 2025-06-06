import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Camera, Save, Trash2, Play, Pause } from "lucide-react";

const LiveAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  
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

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Live Detection & Analysis" 
        subtitle="Real-time rice grain quality analysis"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Analysis Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Camera Feed */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-rice-primary">
                      <Camera className="w-6 h-6" />
                      <span>Live Camera Feed</span>
                    </CardTitle>
                    <div className={`w-3 h-3 rounded-full ${isAnalyzing ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Mock Camera Feed */}
                    <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                      
                      {/* Mock Rice Grains */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-8 gap-2 p-8">
                          {Array.from({ length: 32 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-3 rounded-full ${
                                i % 6 === 0 ? 'bg-red-400' : 'bg-amber-200'
                              } ${isAnalyzing ? 'animate-pulse' : ''}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Analysis Status */}
                      {isAnalyzing && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                          Analyzing Grains...
                        </div>
                      )}

                      {/* Analysis Overlay */}
                      {isAnalyzing && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/70 text-white p-3 rounded-lg">
                            <div className="text-sm">Processing... Frame {Math.floor(Math.random() * 1000)}</div>
                            <div className="text-xs opacity-80">Resolution: 1920x1080 | FPS: 30</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center space-x-4 mt-4">
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Summary Totals */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-rice-primary">Quality Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">Good Rice</span>
                      <span className="font-bold text-xl text-green-600">{totals.goodRice.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">Rejections</span>
                      <span className="font-bold text-xl text-red-600">{totals.rejections.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-800">Foreign Matter</span>
                      <span className="font-bold text-xl text-orange-600">{totals.foreignMatter.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <span className="font-bold text-blue-800">Total</span>
                      <span className="font-bold text-xl text-blue-600">{totals.total.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Metrics with Accordions */}
              <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="text-rice-primary">Detailed Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {/* Good Rice */}
                    <AccordionItem value="good-rice">
                      <AccordionTrigger className="text-green-700 font-semibold">
                        Good Rice ({totals.goodRice.toFixed(1)}%)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Head Rice</span>
                            <span className="font-medium">{metrics.goodRice.headRice.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>≥ 3/4 (Head rice)</span>
                            <span className="font-medium">{metrics.goodRice.threeFourthHead.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>≥ 1/2 (Brokens)</span>
                            <span className="font-medium">{metrics.goodRice.halfBrokens.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>≤ 1/4 (Fine brokens)</span>
                            <span className="font-medium">{metrics.goodRice.quarterFineBrokens.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tips (less than 1/4)</span>
                            <span className="font-medium">{metrics.goodRice.tips.toFixed(1)}%</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Rejections */}
                    <AccordionItem value="rejections">
                      <AccordionTrigger className="text-red-700 font-semibold">
                        Rejections ({totals.rejections.toFixed(1)}%)
                      </AccordionTrigger>
                      <AccordionContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="harvest-rejections">
                            <AccordionTrigger className="text-red-600 text-sm">
                              Harvest Rejections
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 ml-4">
                                <div className="flex justify-between text-sm">
                                  <span>Chalky (Belly, core)</span>
                                  <span className="font-medium">{metrics.rejections.harvest.chalkyBellyCore.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Yellow</span>
                                  <span className="font-medium">{metrics.rejections.harvest.yellow.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Black</span>
                                  <span className="font-medium">{metrics.rejections.harvest.black.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Immature (Green)</span>
                                  <span className="font-medium">{metrics.rejections.harvest.immatureGreen.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Pecky grains</span>
                                  <span className="font-medium">{metrics.rejections.harvest.peckyGrains.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Discolored</span>
                                  <span className="font-medium">{metrics.rejections.harvest.discolored.toFixed(2)}%</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="process-rejections">
                            <AccordionTrigger className="text-red-600 text-sm">
                              Process Rejections
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 ml-4">
                                <div className="flex justify-between text-sm">
                                  <span>Chalky (Whole)</span>
                                  <span className="font-medium">{metrics.rejections.process.chalkyWhole.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Black Tips</span>
                                  <span className="font-medium">{metrics.rejections.process.blackTips.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Burnt</span>
                                  <span className="font-medium">{metrics.rejections.process.burnt.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Spot</span>
                                  <span className="font-medium">{metrics.rejections.process.spot.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Discoloration</span>
                                  <span className="font-medium">{metrics.rejections.process.discoloration.toFixed(2)}%</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Foreign Matter */}
                    <AccordionItem value="foreign-matter">
                      <AccordionTrigger className="text-orange-700 font-semibold">
                        Foreign Matter ({totals.foreignMatter.toFixed(1)}%)
                      </AccordionTrigger>
                      <AccordionContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="organic-foreign">
                            <AccordionTrigger className="text-orange-600 text-sm">
                              Organic Foreign Matter
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 ml-4">
                                <div className="flex justify-between text-sm">
                                  <span>Red</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.red.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Husk</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.husk.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Paddy</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.paddy.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Chaff</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.chaff.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Straw</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.straw.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Sticks</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.sticks.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Brown rice</span>
                                  <span className="font-medium">{metrics.foreignMatter.organic.brownRice.toFixed(3)}%</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="inorganic-foreign">
                            <AccordionTrigger className="text-orange-600 text-sm">
                              Inorganic Foreign Matter
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 ml-4">
                                <div className="flex justify-between text-sm">
                                  <span>Stones</span>
                                  <span className="font-medium">{metrics.foreignMatter.inorganic.stones.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Mud</span>
                                  <span className="font-medium">{metrics.foreignMatter.inorganic.mud.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Thread</span>
                                  <span className="font-medium">{metrics.foreignMatter.inorganic.thread.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Plastic</span>
                                  <span className="font-medium">{metrics.foreignMatter.inorganic.plastic.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Metals</span>
                                  <span className="font-medium">{metrics.foreignMatter.inorganic.metals.toFixed(3)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Glass</span>
                                  <span className="font-medium">{metrics.foreignMatter.inorganic.glass.toFixed(3)}%</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
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
