import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Camera, Save, Trash2, Play, Pause, BarChart3, Percent, CheckCircle, Circle, Settings } from "lucide-react";

const LiveAnalysis = () => {
  const location = useLocation();
  const analysisData = location.state as any;
  
  // Check if this is TAM analysis
  const isTamAnalysis = analysisData?.analysisType === "tam";
  const machines = isTamAnalysis ? analysisData?.machines || [] : [];
  
  // TAM Analysis state
  const [currentMachineIndex, setCurrentMachineIndex] = useState(0);
  const [completedMachines, setCompletedMachines] = useState<string[]>([]);
  const [accordionValue, setAccordionValue] = useState<string>(machines[0] || "");
  
  // Sample progression state (per machine for TAM, global for others)
  const [currentSample, setCurrentSample] = useState(1);
  const [completedSamples, setCompletedSamples] = useState<number[]>([]);
  const [sampleWeights, setSampleWeights] = useState<{[key: number]: string}>({
    1: '',
    2: '',
    3: ''
  });
  
  // Analysis state
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
    },
    qualityIndices: {
      whitenessIndex: 85.5,
      glossyIndex: 0.75,
      branPercentage: 2.3,
      degreeOfMilling: 92.8,
      degreeOfNutrition: 78.4
    }
  };

  // Function to normalize metrics to sum to 100%
  const normalizeMetrics = (metrics: typeof baseMetrics) => {
    // Calculate all individual values (excluding quality indices which have different ranges)
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
      },
      // Quality indices are not normalized as they have specific ranges
      qualityIndices: {
        whitenessIndex: metrics.qualityIndices.whitenessIndex,
        glossyIndex: metrics.qualityIndices.glossyIndex,
        branPercentage: metrics.qualityIndices.branPercentage,
        degreeOfMilling: metrics.qualityIndices.degreeOfMilling,
        degreeOfNutrition: metrics.qualityIndices.degreeOfNutrition
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
      },
      qualityIndices: {
        whitenessIndex: Math.max(0, Math.min(100, baseMetrics.qualityIndices.whitenessIndex + variation() * 5)),
        glossyIndex: Math.max(0, Math.min(1, baseMetrics.qualityIndices.glossyIndex + variation() * 0.1)),
        branPercentage: Math.max(0, Math.min(10, baseMetrics.qualityIndices.branPercentage + variation() * 0.5)),
        degreeOfMilling: Math.max(0, Math.min(100, baseMetrics.qualityIndices.degreeOfMilling + variation() * 3)),
        degreeOfNutrition: Math.max(0, Math.min(100, baseMetrics.qualityIndices.degreeOfNutrition + variation() * 4))
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

  // Sample progression functions
  const handleWeightChange = (sampleNumber: number, weight: string) => {
    setSampleWeights(prev => ({
      ...prev,
      [sampleNumber]: weight
    }));
  };

  const canStartAnalysis = () => {
    return sampleWeights[currentSample] && sampleWeights[currentSample].trim() !== '';
  };

  const handleStartStop = () => {
    if (!canStartAnalysis() && !isAnalyzing) {
      return; // Don't start if no weight entered
    }
    
    setIsAnalyzing(!isAnalyzing);
    if (!isAnalyzing) {
      console.log(`Starting analysis for Sample ${currentSample} with weight: ${sampleWeights[currentSample]}kg`);
    } else {
      console.log("Stopping analysis");
      setMetrics(initialMetrics); // Reset to initial values
    }
  };

  const handleCompleteSample = () => {
    if (isAnalyzing) {
      setIsAnalyzing(false);
    }
    
    setCompletedSamples(prev => [...prev, currentSample]);
    
    if (isTamAnalysis) {
      const currentMachine = machines[currentMachineIndex];
      console.log(`Sample ${currentSample} completed for machine ${currentMachine} with weight: ${sampleWeights[currentSample]}kg and results:`, metrics);
    } else {
      console.log(`Sample ${currentSample} completed with weight: ${sampleWeights[currentSample]}kg and results:`, metrics);
    }
    
    // Move to next sample if available
    if (currentSample < 3) {
      setCurrentSample(currentSample + 1);
      setMetrics(initialMetrics); // Reset metrics for new sample
    } else if (isTamAnalysis && currentSample === 3) {
      // All samples completed for current machine, move to next machine
      handleCompleteMachine();
    }
  };

  const handleCompleteMachine = () => {
    const currentMachine = machines[currentMachineIndex];
    setCompletedMachines(prev => [...prev, currentMachine]);
    
    // Reset sample progression for next machine
    setCurrentSample(1);
    setCompletedSamples([]);
    setSampleWeights({ 1: '', 2: '', 3: '' });
    setMetrics(initialMetrics);
    
    // Move to next machine
    if (currentMachineIndex < machines.length - 1) {
      const nextMachineIndex = currentMachineIndex + 1;
      setCurrentMachineIndex(nextMachineIndex);
      setAccordionValue(machines[nextMachineIndex]);
    }
    
    console.log(`Machine ${currentMachine} analysis completed. Moving to next machine.`);
  };

  const handleSaveSample = () => {
    handleCompleteSample();
  };

  const handleDeleteSample = () => {
    console.log("Deleting current sample");
    setMetrics(initialMetrics);
    setSampleWeights(prev => ({
      ...prev,
      [currentSample]: ''
    }));
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
      
      // Quality & Indices
      { category: 'Quality & Indices', name: 'Whiteness Index', value: metrics.qualityIndices.whitenessIndex, color: 'bg-blue-500', textColor: 'text-blue-700', isIndex: true },
      { category: 'Quality & Indices', name: 'Glossy Index', value: metrics.qualityIndices.glossyIndex, color: 'bg-blue-400', textColor: 'text-blue-700', isIndex: true },
      { category: 'Quality & Indices', name: 'Bran Percentage', value: metrics.qualityIndices.branPercentage, color: 'bg-blue-300', textColor: 'text-blue-700', isIndex: true },
      { category: 'Quality & Indices', name: 'DOM (Degree of Milling)', value: metrics.qualityIndices.degreeOfMilling, color: 'bg-blue-200', textColor: 'text-blue-700', isIndex: true },
      { category: 'Quality & Indices', name: 'DON (Degree of Nutrition)', value: metrics.qualityIndices.degreeOfNutrition, color: 'bg-blue-100', textColor: 'text-blue-700', isIndex: true },
    ];
  };

  const MetricBar = ({ metric }: { metric: any }) => {
    // Handle different display formats for quality indices
    let displayValue: number | string;
    let maxValue: number;
    let progressValue: number;
    
    if (metric.isIndex) {
      // Quality indices have specific ranges and formats
      if (metric.name === 'Whiteness Index') {
        displayValue = metric.value.toFixed(1);
        maxValue = 100;
        progressValue = (metric.value / maxValue) * 100;
      } else if (metric.name === 'Glossy Index') {
        displayValue = metric.value.toFixed(3);
        maxValue = 1;
        progressValue = (metric.value / maxValue) * 100;
      } else if (metric.name === 'Bran Percentage') {
        displayValue = metric.value.toFixed(1);
        maxValue = 10; // Assuming max 10% bran
        progressValue = (metric.value / maxValue) * 100;
      } else if (metric.name.includes('DOM') || metric.name.includes('DON')) {
        displayValue = metric.value.toFixed(1);
        maxValue = 100;
        progressValue = (metric.value / maxValue) * 100;
      } else {
        displayValue = metric.value.toFixed(1);
        maxValue = 100;
        progressValue = (metric.value / maxValue) * 100;
      }
    } else {
      // Regular percentage-based metrics
      displayValue = showPercentage ? metric.value : generateCounts(metric.value);
      maxValue = showPercentage ? 50 : 500; // Max for visual scaling
      progressValue = (Number(displayValue) / maxValue) * 100;
    }

    const getDisplayText = () => {
      if (metric.isIndex) {
        if (metric.name === 'Glossy Index') {
          return displayValue; // No unit for decimal values
        } else if (metric.name === 'Whiteness Index') {
          return `${displayValue}/100`; // Show as index out of 100
        } else {
          return `${displayValue}%`; // Percentage values
        }
      } else {
        return showPercentage ? `${Number(displayValue).toFixed(Number(displayValue) < 1 ? 2 : 1)}%` : displayValue;
      }
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${metric.textColor}`}>{metric.name}</span>
          <span className={`text-sm font-bold ${metric.textColor}`}>
            {getDisplayText()}
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
          {/* Conditional Rendering: TAM Analysis vs Regular Analysis */}
          {isTamAnalysis ? (
            /* TAM Analysis - Machine Accordion */
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-rice-primary">
                  <Settings className="w-6 h-6" />
                  <span>TAM Analysis - Machine Progression</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Complete 3 samples for each machine - Machine {currentMachineIndex + 1} of {machines.length}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>Overall Progress</span>
                      <span>{completedMachines.length}/{machines.length} Machines Complete</span>
                    </div>
                    <Progress value={(completedMachines.length / machines.length) * 100} className="h-3" />
                  </div>

                  {/* Machine Accordion */}
                  <Accordion 
                    type="single" 
                    value={accordionValue} 
                    onValueChange={setAccordionValue}
                    className="w-full"
                  >
                    {machines.map((machine: string, index: number) => {
                      const isCompleted = completedMachines.includes(machine);
                      const isCurrent = index === currentMachineIndex;
                      const isAccessible = index <= currentMachineIndex;
                      
                      return (
                        <AccordionItem 
                          key={machine} 
                          value={machine}
                          className={`border rounded-lg mb-2 ${
                            isCompleted ? 'border-green-500 bg-green-50' : 
                            isCurrent ? 'border-rice-primary bg-rice-secondary' : 
                            'border-gray-200'
                          }`}
                        >
                          <AccordionTrigger 
                            className={`px-4 hover:no-underline ${
                              !isAccessible ? 'cursor-not-allowed opacity-60' : ''
                            }`}
                            disabled={!isAccessible}
                          >
                            <div className="flex items-center space-x-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : isCurrent ? (
                                <Circle className="w-5 h-5 text-rice-primary" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <span className={`font-semibold ${
                                isCompleted ? 'text-green-700' : 
                                isCurrent ? 'text-rice-primary' : 'text-gray-600'
                              }`}>
                                {machine}
                              </span>
                              {isCompleted && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Completed
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            {isCurrent && (
                              <div className="space-y-6">
                                {/* Sample Progress for Current Machine */}
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm font-medium text-gray-600">
                                    <span>Sample Progress</span>
                                    <span>{completedSamples.length}/3 Samples Complete</span>
                                  </div>
                                  <Progress value={(completedSamples.length / 3) * 100} className="h-2" />
                                </div>

                                {/* Sample Steps */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {[1, 2, 3].map((sampleNum) => {
                                    const isCompleted = completedSamples.includes(sampleNum);
                                    const isCurrent = currentSample === sampleNum;
                                    const isAccessible = sampleNum <= currentSample;
                                    
                                    return (
                                      <div 
                                        key={sampleNum}
                                        className={`p-3 rounded-lg border transition-all duration-200 ${
                                          isCompleted 
                                            ? 'border-green-400 bg-green-50' 
                                            : isCurrent 
                                              ? 'border-rice-primary bg-rice-secondary' 
                                              : isAccessible
                                                ? 'border-gray-300 bg-gray-50'
                                                : 'border-gray-200 bg-gray-100 opacity-60'
                                        }`}
                                      >
                                        <div className="flex items-center space-x-2 mb-2">
                                          {isCompleted ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                          ) : (
                                            <Circle className={`w-4 h-4 ${isCurrent ? 'text-rice-primary' : 'text-gray-400'}`} />
                                          )}
                                          <span className={`text-sm font-semibold ${
                                            isCompleted ? 'text-green-700' : isCurrent ? 'text-rice-primary' : 'text-gray-600'
                                          }`}>
                                            Sample {sampleNum}
                                          </span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor={`weight-${sampleNum}`} className="text-xs font-medium">
                                            Weight (kg)
                                          </Label>
                                          <Input
                                            id={`weight-${sampleNum}`}
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={sampleWeights[sampleNum]}
                                            onChange={(e) => handleWeightChange(sampleNum, e.target.value)}
                                            disabled={!isCurrent || isCompleted}
                                            className={`h-8 text-sm ${
                                              isCompleted ? 'bg-green-50 border-green-300' : 
                                              isCurrent ? 'border-rice-primary' : 'bg-gray-100'
                                            }`}
                                          />
                                          {isCompleted && (
                                            <p className="text-xs text-green-600 font-medium">
                                              ✓ {sampleWeights[sampleNum]}kg
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Analysis Controls */}
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t">
                                  <div className="flex items-center space-x-4">
                                    <Button
                                      onClick={handleStartStop}
                                      disabled={!canStartAnalysis() && !isAnalyzing}
                                      className={`${
                                        isAnalyzing 
                                          ? 'bg-red-500 hover:bg-red-600' 
                                          : canStartAnalysis()
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-gray-400 cursor-not-allowed'
                                      } text-white px-4 py-2`}
                                    >
                                      {isAnalyzing ? (
                                        <>
                                          <Pause className="w-4 h-4 mr-2" />
                                          Stop
                                        </>
                                      ) : (
                                        <>
                                          <Play className="w-4 h-4 mr-2" />
                                          Start
                                        </>
                                      )}
                                    </Button>
                                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isAnalyzing ? 'bg-green-100' : 'bg-gray-100'}`}>
                                      <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                      <span className="text-xs font-medium">
                                        {isAnalyzing ? `Analyzing ${machine} - Sample ${currentSample}` : 'Stopped'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Metric Toggle */}
                                  <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
                                    <BarChart3 className={`w-3 h-3 ${!showPercentage ? 'text-rice-primary' : 'text-gray-400'}`} />
                                    <Switch 
                                      checked={showPercentage}
                                      onCheckedChange={setShowPercentage}
                                    />
                                    <Percent className={`w-3 h-3 ${showPercentage ? 'text-rice-primary' : 'text-gray-400'}`} />
                                    <span className="text-xs font-medium text-gray-700">
                                      {showPercentage ? '%' : 'Count'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Regular Analysis - Sample Progression */
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Sample Analysis Progression</CardTitle>
                <p className="text-sm text-gray-600">Complete samples in sequence - Sample {currentSample} of 3</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>Progress</span>
                      <span>{completedSamples.length}/3 Samples Complete</span>
                    </div>
                    <Progress value={(completedSamples.length / 3) * 100} className="h-3" />
                  </div>

                  {/* Sample Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((sampleNum) => {
                      const isCompleted = completedSamples.includes(sampleNum);
                      const isCurrent = currentSample === sampleNum;
                      const isAccessible = sampleNum <= currentSample;
                      
                      return (
                        <div 
                          key={sampleNum}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            isCompleted 
                              ? 'border-green-500 bg-green-50' 
                              : isCurrent 
                                ? 'border-rice-primary bg-rice-secondary' 
                                : isAccessible
                                  ? 'border-gray-300 bg-gray-50'
                                  : 'border-gray-200 bg-gray-100 opacity-60'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-3">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className={`w-5 h-5 ${isCurrent ? 'text-rice-primary' : 'text-gray-400'}`} />
                            )}
                            <span className={`font-semibold ${
                              isCompleted ? 'text-green-700' : isCurrent ? 'text-rice-primary' : 'text-gray-600'
                            }`}>
                              Sample {sampleNum}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`weight-${sampleNum}`} className="text-sm font-medium">
                              Weight (kg)
                            </Label>
                            <Input
                              id={`weight-${sampleNum}`}
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              value={sampleWeights[sampleNum]}
                              onChange={(e) => handleWeightChange(sampleNum, e.target.value)}
                              disabled={!isCurrent || isCompleted}
                              className={`${
                                isCompleted ? 'bg-green-50 border-green-300' : 
                                isCurrent ? 'border-rice-primary' : 'bg-gray-100'
                              }`}
                            />
                            {isCompleted && (
                              <p className="text-xs text-green-600 font-medium">
                                ✓ Completed with {sampleWeights[sampleNum]}kg
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Analysis Controls for Current Sample */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={handleStartStop}
                        disabled={!canStartAnalysis() && !isAnalyzing}
                        className={`${
                          isAnalyzing 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : canStartAnalysis()
                              ? 'bg-green-500 hover:bg-green-600'
                              : 'bg-gray-400 cursor-not-allowed'
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
                        <span className="text-sm font-medium">
                          {isAnalyzing ? `Analyzing Sample ${currentSample}` : 'Stopped'}
                        </span>
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
                </div>
              </CardContent>
            </Card>
          )}

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
                  <CardTitle className="text-rice-primary">
                    {isTamAnalysis ? `${machines[currentMachineIndex]} - Sample ${currentSample} Controls` : `Sample ${currentSample} Controls`}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {sampleWeights[currentSample] ? `Weight: ${sampleWeights[currentSample]}kg` : 'Enter weight to begin'}
                  </p>
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
                        disabled={!sampleWeights[currentSample] || completedSamples.includes(currentSample)}
                        className="w-full bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90 disabled:bg-gray-200 disabled:text-gray-400"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {completedSamples.includes(currentSample) ? 'Sample Completed' : 'Complete Sample'}
                      </Button>
                      
                      <Button 
                        onClick={handleDeleteSample}
                        variant="destructive"
                        disabled={completedSamples.includes(currentSample)}
                        className="w-full disabled:bg-gray-200 disabled:text-gray-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reset Sample
                      </Button>
                    </div>

                    {/* Progress Info */}
                    <div className="pt-3 border-t text-sm text-gray-600">
                      {isTamAnalysis ? (
                        <>
                          <div className="flex justify-between">
                            <span>Current Machine:</span>
                            <span className="font-medium">{machines[currentMachineIndex]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Machine Progress:</span>
                            <span className="font-medium">{currentMachineIndex + 1} of {machines.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current Sample:</span>
                            <span className="font-medium">{currentSample} of 3</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Samples Completed:</span>
                            <span className="font-medium">{completedSamples.length}/3</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Machines Completed:</span>
                            <span className="font-medium">{completedMachines.length}/{machines.length}</span>
                          </div>
                          {currentMachineIndex === machines.length - 1 && currentSample === 3 && completedSamples.includes(3) && (
                            <div className="mt-2 p-2 bg-green-50 rounded-lg text-green-700 text-center font-medium">
                              ✓ TAM Analysis Complete!
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span>Current Sample:</span>
                            <span className="font-medium">{currentSample} of 3</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Completed:</span>
                            <span className="font-medium">{completedSamples.length} samples</span>
                          </div>
                          {currentSample === 3 && completedSamples.includes(3) && (
                            <div className="mt-2 p-2 bg-green-50 rounded-lg text-green-700 text-center font-medium">
                              ✓ All samples completed!
                            </div>
                          )}
                        </>
                      )}
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

                    {/* Quality & Indices Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Quality & Indices
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAllMetrics().filter(m => m.category === 'Quality & Indices').map((metric, idx) => (
                          <MetricBar key={`quality-${idx}`} metric={metric} />
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
              <CardTitle className="text-rice-primary">
                {isTamAnalysis ? `${machines[currentMachineIndex]} - Sample ${currentSample} Information` : `Sample ${currentSample} Information`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Sample ID:</span>
                  <p className="font-medium">
                    {isTamAnalysis 
                      ? `TAM-${machines[currentMachineIndex]?.replace(/\s+/g, '')}-S${currentSample}-${new Date().getTime().toString().slice(-6)}`
                      : `RD-S${currentSample}-${new Date().getTime().toString().slice(-6)}`
                    }
                  </p>
                </div>
                {isTamAnalysis && (
                  <div>
                    <span className="font-semibold text-gray-600">Machine:</span>
                    <p className="font-medium">{machines[currentMachineIndex]}</p>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-600">Weight:</span>
                  <p className="font-medium">
                    {sampleWeights[currentSample] ? `${sampleWeights[currentSample]} kg` : 'Not entered'}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Status:</span>
                  <p className={`font-medium ${
                    completedSamples.includes(currentSample) ? 'text-green-600' : 
                    isAnalyzing ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {completedSamples.includes(currentSample) ? 'Completed' : 
                     isAnalyzing ? 'Analyzing' : 'Pending'}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Variety:</span>
                  <p className="font-medium">{analysisData?.variety?.toUpperCase() || 'BASMATI'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Process:</span>
                  <p className="font-medium">{analysisData?.process || 'Raw'}</p>
                </div>
              </div>
              
              {/* Progress Summary */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-600">
                    {isTamAnalysis ? 'Current Machine Progress:' : 'Overall Progress:'}
                  </span>
                  <div className="flex space-x-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="flex items-center space-x-1">
                        <span className={`text-xs ${
                          completedSamples.includes(num) ? 'text-green-600' : 
                          num === currentSample ? 'text-rice-primary' : 'text-gray-400'
                        }`}>
                          S{num}
                        </span>
                        {completedSamples.includes(num) ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : num === currentSample ? (
                          <Circle className="w-3 h-3 text-rice-primary" />
                        ) : (
                          <Circle className="w-3 h-3 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {isTamAnalysis && (
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="font-semibold text-gray-600">Machine Progress:</span>
                    <div className="flex space-x-2">
                      {machines.map((machine: string, index: number) => (
                        <div key={machine} className="flex items-center space-x-1">
                          <span className={`text-xs ${
                            completedMachines.includes(machine) ? 'text-green-600' : 
                            index === currentMachineIndex ? 'text-rice-primary' : 'text-gray-400'
                          }`}>
                            {machine.split(' ')[0]}
                          </span>
                          {completedMachines.includes(machine) ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : index === currentMachineIndex ? (
                            <Circle className="w-3 h-3 text-rice-primary" />
                          ) : (
                            <Circle className="w-3 h-3 text-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;
