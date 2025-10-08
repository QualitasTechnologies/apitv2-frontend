
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { Wheat, ArrowRight, Plus, X, Save, Settings, Play } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { useMachine } from "@/contexts/MachineContext";

interface CustomProperty {
  id: string;
  name: string;
  value: string;
  unit?: string;
}

interface ProcessDetailsFormProps {
  process: string;
  processDetails: Record<string, any>;
  setProcessDetails: (details: Record<string, any>) => void;
  onClose: () => void;
}

const ProcessDetailsForm = ({ process, processDetails, setProcessDetails, onClose }: ProcessDetailsFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(processDetails[process] || {});

  const processConfigs: Record<string, Array<{stage: string, parameter: string, unit: string, key: string}>> = {
    "double-boiled": [
      { stage: "Presteaming", parameter: "Type", unit: "Holding/Continuous", key: "presteaming_type" },
      { stage: "Presteaming", parameter: "Temperature", unit: "°C or °F", key: "presteaming_temperature" },
      { stage: "Presteaming", parameter: "Steaming time (Holding)", unit: "mins", key: "presteaming_time" },
      { stage: "Soaking time", parameter: "Temperature", unit: "°C or °F", key: "soaking_temperature" },
      { stage: "Soaking time", parameter: "Time", unit: "mins", key: "soaking_time" },
      { stage: "Final Steaming", parameter: "Type", unit: "Holding/Continuous", key: "final_steaming_type" },
      { stage: "Final Steaming", parameter: "Temperature", unit: "°C or °F", key: "final_steaming_temperature" },
      { stage: "Final Steaming", parameter: "Steaming time (Holding)", unit: "mins", key: "final_steaming_time" },
      { stage: "Drying", parameter: "Time", unit: "mins", key: "drying_time" },
      { stage: "Drying", parameter: "Max temp", unit: "°C or °F", key: "drying_max_temp" },
      { stage: "Drying", parameter: "Min temp", unit: "°C or °F", key: "drying_min_temp" },
      { stage: "Drying", parameter: "Final Moisture", unit: "%", key: "drying_final_moisture" }
    ],
    "single-boiled": [
      { stage: "Soaking time", parameter: "Temperature", unit: "°C or °F", key: "soaking_temperature" },
      { stage: "Soaking time", parameter: "Time", unit: "mins", key: "soaking_time" },
      { stage: "Final Steaming", parameter: "Type", unit: "Holding/Continuous", key: "final_steaming_type" },
      { stage: "Final Steaming", parameter: "Temperature", unit: "°C or °F", key: "final_steaming_temperature" },
      { stage: "Final Steaming", parameter: "Steaming time (Holding)", unit: "mins", key: "final_steaming_time" },
      { stage: "Drying", parameter: "Time", unit: "mins", key: "drying_time" },
      { stage: "Drying", parameter: "Max temp", unit: "°C or °F", key: "drying_max_temp" },
      { stage: "Drying", parameter: "Min temp", unit: "°C or °F", key: "drying_min_temp" },
      { stage: "Drying", parameter: "Final Moisture", unit: "%", key: "drying_final_moisture" }
    ],
    "half-boiled": [
      { stage: "Soaking time", parameter: "Temperature", unit: "°C or °F", key: "soaking_temperature" },
      { stage: "Soaking time", parameter: "Time", unit: "mins", key: "soaking_time" },
      { stage: "Final Steaming", parameter: "Type", unit: "Holding/Continuous", key: "final_steaming_type" },
      { stage: "Final Steaming", parameter: "Temperature", unit: "°C or °F", key: "final_steaming_temperature" },
      { stage: "Final Steaming", parameter: "Steaming time (Holding)", unit: "mins", key: "final_steaming_time" },
      { stage: "Drying", parameter: "Time", unit: "mins", key: "drying_time" },
      { stage: "Drying", parameter: "Max temp", unit: "°C or °F", key: "drying_max_temp" },
      { stage: "Drying", parameter: "Min temp", unit: "°C or °F", key: "drying_min_temp" },
      { stage: "Drying", parameter: "Final Moisture", unit: "%", key: "drying_final_moisture" }
    ],
    "sap": [
      { stage: "Presteaming", parameter: "Type", unit: "Holding/Continuous", key: "presteaming_type" },
      { stage: "Presteaming", parameter: "Temperature", unit: "°C or °F", key: "presteaming_temperature" },
      { stage: "Presteaming", parameter: "Steaming time (Holding)", unit: "mins", key: "presteaming_time" },
      { stage: "Resting time", parameter: "Temperature", unit: "°C or °F", key: "resting_temperature" },
      { stage: "Resting time", parameter: "Time", unit: "mins", key: "resting_time" },
      { stage: "Drying", parameter: "Time", unit: "mins", key: "drying_time" },
      { stage: "Drying", parameter: "Max temp", unit: "°C or °F", key: "drying_max_temp" },
      { stage: "Drying", parameter: "Min temp", unit: "°C or °F", key: "drying_min_temp" },
      { stage: "Drying", parameter: "Final Moisture", unit: "%", key: "drying_final_moisture" }
    ],
    "super-parboiling": [
      { stage: "Steaming", parameter: "Type", unit: "Holding/Continuous", key: "steaming_type" },
      { stage: "Steaming", parameter: "Temperature", unit: "°C or °F", key: "steaming_temperature" },
      { stage: "Steaming", parameter: "Steaming time (Holding)", unit: "mins", key: "steaming_time" },
      { stage: "Resting time", parameter: "Temperature", unit: "°C or °F", key: "resting_temperature" },
      { stage: "Resting time", parameter: "Time", unit: "mins", key: "resting_time" },
      { stage: "Soaking time", parameter: "Temperature", unit: "°C or °F", key: "soaking_temperature" },
      { stage: "Soaking time", parameter: "Time", unit: "mins", key: "soaking_time" },
      { stage: "Final Steaming", parameter: "Type", unit: "Holding/Continuous", key: "final_steaming_type" },
      { stage: "Final Steaming", parameter: "Temperature", unit: "°C or °F", key: "final_steaming_temperature" },
      { stage: "Final Steaming", parameter: "Steaming time (Holding)", unit: "mins", key: "final_steaming_time" },
      { stage: "Drying", parameter: "Time", unit: "mins", key: "drying_time" },
      { stage: "Drying", parameter: "Max temp", unit: "°C or °F", key: "drying_max_temp" },
      { stage: "Drying", parameter: "Min temp", unit: "°C or °F", key: "drying_min_temp" },
      { stage: "Drying", parameter: "Final Moisture", unit: "%", key: "drying_final_moisture" }
    ]
  };

  const currentConfig = processConfigs[process] || [];

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setProcessDetails(prev => ({ ...prev, [process]: formData }));
    onClose();
  };

  const groupedByStage = currentConfig.reduce((acc, item) => {
    if (!acc[item.stage]) {
      acc[item.stage] = [];
    }
    acc[item.stage].push(item);
    return acc;
  }, {} as Record<string, typeof currentConfig>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedByStage).map(([stageName, stageItems]) => (
        <div key={stageName} className="space-y-4">
          <h3 className="text-lg font-semibold text-rice-primary border-b border-gray-200 pb-2">
            {stageName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stageItems.map((item) => (
              <div key={item.key} className="space-y-2">
                <Label htmlFor={item.key} className="font-medium">
                  {item.parameter} ({item.unit})
                </Label>
                {item.unit === "Holding/Continuous" ? (
                  <Select 
                    value={formData[item.key] || ""} 
                    onValueChange={(value) => handleInputChange(item.key, value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="holding">Holding</SelectItem>
                      <SelectItem value="continuous">Continuous</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={item.key}
                    type={item.unit === "%" || item.unit.includes("°") || item.unit === "mins" ? "number" : "text"}
                    value={formData[item.key] || ""}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder={`Enter ${item.parameter.toLowerCase()}`}
                    className="h-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-rice-primary hover:bg-rice-primary/90">
          Save Details
        </Button>
      </div>
    </div>
  );
};

const TellUsAboutGrain = () => {
  const { t } = useLanguage();
  const { setHasStartedAnalysis } = useAnalysis();
  const { machines } = useMachine();
  
  // TellUsAboutGrain state
  const [variety, setVariety] = useState("");
  const [process, setProcess] = useState("");
  const [harvestSeason, setHarvestSeason] = useState("");

  // Dialog states for "Others" option
  const [isVarietyDialogOpen, setIsVarietyDialogOpen] = useState(false);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [customVariety, setCustomVariety] = useState("");
  const [customProcess, setCustomProcess] = useState("");

  // Process details dialog state
  const [isProcessDetailsDialogOpen, setIsProcessDetailsDialogOpen] = useState(false);
  const [processDetails, setProcessDetails] = useState<Record<string, any>>({});

  // Continue to analysis state
  const [showAnalysisOptions, setShowAnalysisOptions] = useState(false);
  const navigate = useNavigate();

  // ID Generation state
  const [idGenerationType, setIdGenerationType] = useState<"auto" | "custom">("auto");
  const [customId, setCustomId] = useState("");

  // Analysis type states
  const [selectedAnalysisMode, setSelectedAnalysisMode] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [tmaSelectedSeries, setTmaSelectedSeries] = useState("");
  const [samplingStrategy, setSamplingStrategy] = useState<"random" | "systematic">("random");
  const [systematicValue, setSystematicValue] = useState("");

  // Default values for properties
  const defaultGeoProperties = {
    length: "5.5",
    breadth: "2.3",
    weight: "22.5",
    aspectRatio: "2.4",
    hardness: "45"
  };

  const defaultChemicalProperties = {
    protein: "7.2",
    carbohydrate: "78.9",
    vitamin: "0.4",
    mineral: "1.3",
    lipids: "2.8"
  };

  const defaultGmadProperties = {
    gelatinization: "65",
    moisture: "14.5",
    age: "6",
    density: "1.4"
  };

  // Variety-based fixed values for gelatinization and density
  const getVarietyProperties = (selectedVariety: string) => {
    const varietyData: Record<string, { gelatinization: string; density: string }> = {
      "ambemohar": { gelatinization: "68", density: "1.42" },
      "sona": { gelatinization: "72", density: "1.38" },
      "adt": { gelatinization: "70", density: "1.40" },
      "jsr": { gelatinization: "69", density: "1.41" },
      "gobindobhog": { gelatinization: "71", density: "1.39" },
      "hmt": { gelatinization: "73", density: "1.37" },
      "indrayani": { gelatinization: "67", density: "1.43" },
      "jeera samba": { gelatinization: "74", density: "1.36" },
      "rnr": { gelatinization: "66", density: "1.44" },
      "mogra": { gelatinization: "75", density: "1.35" },
      "jaya": { gelatinization: "69", density: "1.41" },
      "matta": { gelatinization: "76", density: "1.34" },
      "parmal": { gelatinization: "68", density: "1.42" },
      "ponni": { gelatinization: "70", density: "1.40" },
      "pusa basmati": { gelatinization: "77", density: "1.33" },
      "sharbati": { gelatinization: "71", density: "1.39" },
      "sona masuri": { gelatinization: "72", density: "1.38" },
      "kolam": { gelatinization: "69", density: "1.41" },
      "bpt": { gelatinization: "70", density: "1.40" },
      "katarni": { gelatinization: "73", density: "1.37" },
      "mtu 1010": { gelatinization: "68", density: "1.42" },
      "ir 64": { gelatinization: "71", density: "1.39" },
      "rpn": { gelatinization: "69", density: "1.41" },
      "ranjith": { gelatinization: "72", density: "1.38" },
      "cauvery": { gelatinization: "70", density: "1.40" },
      "baismutti": { gelatinization: "74", density: "1.36" },
      "vnr": { gelatinization: "67", density: "1.43" },
      "1509": { gelatinization: "75", density: "1.35" },
      "1121": { gelatinization: "76", density: "1.34" }
    };
    
    return varietyData[selectedVariety] || { gelatinization: "65", density: "1.4" };
  };

  // KnowYourGrains state - initialized with default values
  const [geoProperties, setGeoProperties] = useState(defaultGeoProperties);
  const [chemicalProperties, setChemicalProperties] = useState(defaultChemicalProperties);
  const [gmadProperties, setGmadProperties] = useState(defaultGmadProperties);

  // Track if properties have been modified
  const [isGeoModified, setIsGeoModified] = useState(false);
  const [isChemicalModified, setIsChemicalModified] = useState(false);
  const [isGmadModified, setIsGmadModified] = useState(false);

  const [customProperties, setCustomProperties] = useState<CustomProperty[]>([]);
  const [isCustomPropertyDialogOpen, setIsCustomPropertyDialogOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    value: "",
    unit: ""
  });

  const isFormComplete = variety && process && harvestSeason;
  const canContinueToAnalysis = variety && process;

  // Machine and series options
  const machineOptions = machines;

  const seriesOptions = [
    "I-5 Series",
    "Uni-2 Series", 
    "Classic Series"
  ];


  // TellUsAboutGrain handlers
  const handleVarietyChange = (value: string) => {
    if (value === "others") {
      setIsVarietyDialogOpen(true);
    } else {
      setVariety(value);
      // Update gelatinization and density based on variety
      const varietyProps = getVarietyProperties(value);
      setGmadProperties(prev => ({
        ...prev,
        gelatinization: varietyProps.gelatinization,
        density: varietyProps.density
      }));
    }
  };

  const handleProcessChange = (value: string) => {
    if (value === "others") {
      setIsProcessDialogOpen(true);
    } else {
      setProcess(value);
    }
  };


  const handleCustomVarietySubmit = () => {
    if (customVariety.trim()) {
      const varietyValue = customVariety.trim();
      setVariety(varietyValue);
      // Update gelatinization and density based on variety
      const varietyProps = getVarietyProperties(varietyValue);
      setGmadProperties(prev => ({
        ...prev,
        gelatinization: varietyProps.gelatinization,
        density: varietyProps.density
      }));
      setCustomVariety("");
      setIsVarietyDialogOpen(false);
    }
  };

  const handleCustomProcessSubmit = () => {
    if (customProcess.trim()) {
      setProcess(customProcess.trim());
      setCustomProcess("");
      setIsProcessDialogOpen(false);
    }
  };

  // KnowYourGrains handlers
  const updateGeoProperty = (property: string, value: string) => {
    setGeoProperties(prev => ({ ...prev, [property]: value }));
    setIsGeoModified(true);
  };

  const updateChemicalProperty = (property: string, value: string) => {
    setChemicalProperties(prev => ({ ...prev, [property]: value }));
    setIsChemicalModified(true);
  };

  const updateGmadProperty = (property: string, value: string) => {
    setGmadProperties(prev => ({ ...prev, [property]: value }));
    setIsGmadModified(true);
  };

  // Save handlers
  const saveGeoProperties = () => {
    setIsGeoModified(false);
    // Here you could also save to localStorage or send to API
  };

  const saveChemicalProperties = () => {
    setIsChemicalModified(false);
    // Here you could also save to localStorage or send to API
  };

  const saveGmadProperties = () => {
    setIsGmadModified(false);
    // Here you could also save to localStorage or send to API
  };

  const handleAddProperty = () => {
    if (newProperty.name && newProperty.value) {
      const property: CustomProperty = {
        id: Date.now().toString(),
        name: newProperty.name,
        value: newProperty.value,
        unit: newProperty.unit || undefined
      };
      setCustomProperties(prev => [...prev, property]);
      setNewProperty({ name: "", value: "", unit: "" });
      setIsCustomPropertyDialogOpen(false);
    }
  };

  const removeCustomProperty = (id: string) => {
    setCustomProperties(prev => prev.filter(prop => prop.id !== id));
  };

  // Analysis navigation handlers
  const handleContinueToAnalysis = () => {
    setShowAnalysisOptions(true);
    
    // Scroll to the new sections after a brief delay to allow for rendering
    setTimeout(() => {
      const analysisSection = document.getElementById('analysis-sections');
      if (analysisSection) {
        analysisSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const handleAnalyze = (analysisType: string, additionalData?: any) => {
    const analysisData = {
      variety,
      process,
      harvestSeason,
      idType: idGenerationType,
      customId: idGenerationType === "custom" ? customId : undefined,
      analysisType,
      ...additionalData
    };
    
    console.log("Starting analysis with data:", analysisData);
    navigate("/live-analysis", { state: analysisData });
  };


  // Validation functions
  const isBatchAnalysisValid = () => batchInput.trim() !== "";
  const isMachineWiseValid = () => selectedMachine !== "" && selectedSeries !== "";
  const isTmaValid = () => 
    tmaSelectedSeries !== "" && 
    (samplingStrategy === "random" || (samplingStrategy === "systematic" && systematicValue !== ""));
  
  // Check if analyze button should be enabled
  const isAnalyzeEnabled = () => {
    switch (selectedAnalysisMode) {
      case "individual":
        return true;
      case "batch":
        return isBatchAnalysisValid();
      case "machine-wise":
        return isMachineWiseValid();
      case "tma":
        return isTmaValid();
      default:
        return false;
    }
  };
  
  // Handle analyze button click
  const handleAnalyzeClick = () => {
    let additionalData = {};
    
    switch (selectedAnalysisMode) {
      case "batch":
        additionalData = { batchId: batchInput };
        break;
      case "machine-wise":
        additionalData = { machine: selectedMachine, series: selectedSeries };
        break;
      case "tma":
        additionalData = {
          machines: machineOptions,
          series: tmaSelectedSeries,
          samplingStrategy,
          systematicValue: samplingStrategy === "systematic" ? systematicValue : undefined
        };
        break;
    }
    
    // Set the analysis state to show Live Analysis in navigation
    setHasStartedAnalysis(true);
    
    handleAnalyze(selectedAnalysisMode, additionalData);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Tell Us About Your Grain" 
        subtitle="Provide sample categorization information and grain properties"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Primary Selection */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <Wheat className="w-6 h-6" />
                <span>Primary Classification</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Variety */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Variety</Label>
                  <Select value={variety} onValueChange={handleVarietyChange}>
                    <SelectTrigger className="h-12 border-2 hover:border-rice-primary transition-colors">
                      <SelectValue placeholder="Select variety">
                        {variety && ![
                          "ambemohar", "sona", "adt", "jsr", "gobindobhog", "hmt", "indrayani", "jeera samba", 
                          "rnr", "mogra", "jaya", "matta", "parmal", "ponni", "pusa basmati", "sharbati", 
                          "sona masuri", "kolam", "bpt", "katarni", "mtu 1010", "ir 64", "rpn", "ranjith", 
                          "cauvery", "baismutti", "vnr", "1509", "1121", "others"
                        ].includes(variety) ? variety : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ambemohar">Ambemohar</SelectItem>
                      <SelectItem value="sona">Sona</SelectItem>
                      <SelectItem value="adt">ADT</SelectItem>
                      <SelectItem value="jsr">JSR</SelectItem>
                      <SelectItem value="gobindobhog">Gobindobhog</SelectItem>
                      <SelectItem value="hmt">HMT</SelectItem>
                      <SelectItem value="indrayani">Indrayani</SelectItem>
                      <SelectItem value="jeera samba">Jeera Samba</SelectItem>
                      <SelectItem value="rnr">RNR</SelectItem>
                      <SelectItem value="mogra">Mogra</SelectItem>
                      <SelectItem value="jaya">Jaya</SelectItem>
                      <SelectItem value="matta">Matta</SelectItem>
                      <SelectItem value="parmal">Parmal</SelectItem>
                      <SelectItem value="ponni">Ponni</SelectItem>
                      <SelectItem value="pusa basmati">Pusa Basmati</SelectItem>
                      <SelectItem value="sharbati">Sharbati</SelectItem>
                      <SelectItem value="sona masuri">Sona Masuri</SelectItem>
                      <SelectItem value="kolam">Kolam</SelectItem>
                      <SelectItem value="bpt">BPT</SelectItem>
                      <SelectItem value="katarni">Katarni</SelectItem>
                      <SelectItem value="mtu 1010">MTU 1010</SelectItem>
                      <SelectItem value="ir 64">IR 64</SelectItem>
                      <SelectItem value="rpn">RPN</SelectItem>
                      <SelectItem value="ranjith">Ranjith</SelectItem>
                      <SelectItem value="cauvery">Cauvery</SelectItem>
                      <SelectItem value="baismutti">Baismutti</SelectItem>
                      <SelectItem value="vnr">VNR</SelectItem>
                      <SelectItem value="1509">1509</SelectItem>
                      <SelectItem value="1121">1121</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                      {variety && ![
                        "ambemohar", "sona", "adt", "jsr", "gobindobhog", "hmt", "indrayani", "jeera samba", 
                        "rnr", "mogra", "jaya", "matta", "parmal", "ponni", "pusa basmati", "sharbati", 
                        "sona masuri", "kolam", "bpt", "katarni", "mtu 1010", "ir 64", "rpn", "ranjith", 
                        "cauvery", "baismutti", "vnr", "1509", "1121", "others"
                      ].includes(variety) && (
                        <SelectItem value={variety}>{variety}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Process */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Process</Label>
                  <Select value={process} onValueChange={handleProcessChange}>
                    <SelectTrigger className="h-12 border-2 hover:border-rice-primary transition-colors">
                      <SelectValue placeholder="Select process">
                        {process && !["raw", "double-boiled", "single-boiled", "half-boiled", "sap", "super-parboiling", "others"].includes(process) ? process : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="raw">Raw</SelectItem>
                      <SelectItem value="double-boiled">Double Boiled</SelectItem>
                      <SelectItem value="single-boiled">Single Boiled</SelectItem>
                      <SelectItem value="half-boiled">Half Boiled</SelectItem>
                      <SelectItem value="sap">SAP</SelectItem>
                      <SelectItem value="super-parboiling">Super Parboiling</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                      {process && !["raw", "double-boiled", "single-boiled", "half-boiled", "sap", "super-parboiling", "others"].includes(process) && (
                        <SelectItem value={process}>{process}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  
                  {/* Process Details Button - Only show when process is selected and is one of the detailed processes */}
                  {process && ["double-boiled", "single-boiled", "half-boiled", "sap", "super-parboiling"].includes(process) && (
                    <Button
                      variant="outline"
                      onClick={() => setIsProcessDetailsDialogOpen(true)}
                      className="w-full mt-2 border-rice-primary text-rice-primary hover:bg-rice-primary hover:text-white"
                    >
                      Add Process Details (Optional)
                    </Button>
                  )}
                </div>

                {/* Harvest Season */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Harvest Season</Label>
                  <Select value={harvestSeason} onValueChange={setHarvestSeason}>
                    <SelectTrigger className="h-12 border-2 hover:border-rice-primary transition-colors">
                      <SelectValue placeholder="Select harvest season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rabi">Rabi</SelectItem>
                      <SelectItem value="kharif">Kharif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Selection Summary */}
          {isFormComplete && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Selection Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-600">Variety:</span>
                    <p className="font-medium uppercase">{variety}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Process:</span>
                    <p className="font-medium capitalize">{process}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Harvest Season:</span>
                    <p className="font-medium capitalize">{harvestSeason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Properties Tables from KnowYourGrains */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Geo Properties */}
            <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-rice-primary">Morphological Properties</CardTitle>
                  {isGeoModified && (
                    <Button 
                      onClick={saveGeoProperties}
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="font-medium">{t('knowGrains.length')}</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="5.5"
                      value={geoProperties.length}
                      onChange={(e) => updateGeoProperty('length', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="breadth" className="font-medium">{t('knowGrains.breadth')}</Label>
                    <Input
                      id="breadth"
                      type="number"
                      placeholder="2.3"
                      value={geoProperties.breadth}
                      onChange={(e) => updateGeoProperty('breadth', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="font-medium">{t('knowGrains.weight')}</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="22.5"
                      value={geoProperties.weight}
                      onChange={(e) => updateGeoProperty('weight', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aspectRatio" className="font-medium">{t('knowGrains.aspectRatio')}</Label>
                    <Input
                      id="aspectRatio"
                      type="number"
                      placeholder="2.4"
                      value={geoProperties.aspectRatio}
                      onChange={(e) => updateGeoProperty('aspectRatio', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hardness" className="font-medium">{t('knowGrains.hardness')}</Label>
                    <Input
                      id="hardness"
                      type="number"
                      placeholder="45"
                      value={geoProperties.hardness}
                      onChange={(e) => updateGeoProperty('hardness', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chemical Properties */}
            <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-rice-primary">Nutritional Properties</CardTitle>
                  {isChemicalModified && (
                    <Button 
                      onClick={saveChemicalProperties}
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="protein" className="font-medium">{t('knowGrains.protein')}</Label>
                    <Input
                      id="protein"
                      type="number"
                      placeholder="7.2"
                      value={chemicalProperties.protein}
                      onChange={(e) => updateChemicalProperty('protein', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carbohydrate" className="font-medium">{t('knowGrains.carbohydrate')}</Label>
                    <Input
                      id="carbohydrate"
                      type="number"
                      placeholder="78.9"
                      value={chemicalProperties.carbohydrate}
                      onChange={(e) => updateChemicalProperty('carbohydrate', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vitamin" className="font-medium">{t('knowGrains.vitamin')}</Label>
                    <Input
                      id="vitamin"
                      type="number"
                      placeholder="0.4"
                      value={chemicalProperties.vitamin}
                      onChange={(e) => updateChemicalProperty('vitamin', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mineral" className="font-medium">{t('knowGrains.mineral')}</Label>
                    <Input
                      id="mineral"
                      type="number"
                      placeholder="1.3"
                      value={chemicalProperties.mineral}
                      onChange={(e) => updateChemicalProperty('mineral', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lipids" className="font-medium">{t('knowGrains.lipids')}</Label>
                    <Input
                      id="lipids"
                      type="number"
                      placeholder="2.8"
                      value={chemicalProperties.lipids}
                      onChange={(e) => updateChemicalProperty('lipids', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gmad Properties */}
            <Card className="animate-fade-in" style={{ animationDelay: "600ms" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-rice-primary">GMAD Properties</CardTitle>
                  {isGmadModified && (
                    <Button 
                      onClick={saveGmadProperties}
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="gelatinization" className="font-medium">Gelatinization Temperature (°C)</Label>
                    <Input
                      id="gelatinization"
                      type="number"
                      placeholder="65"
                      value={gmadProperties.gelatinization}
                      readOnly
                      className="h-12 bg-gray-100 cursor-not-allowed"
                      title="This value is automatically set based on the selected variety"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="moisture" className="font-medium">{t('knowGrains.moisture')}</Label>
                    <Input
                      id="moisture"
                      type="number"
                      placeholder="14.5"
                      value={gmadProperties.moisture}
                      onChange={(e) => updateGmadProperty('moisture', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age" className="font-medium">{t('knowGrains.age')}</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="6"
                      value={gmadProperties.age}
                      onChange={(e) => updateGmadProperty('age', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="density" className="font-medium">Density (g/cm³)</Label>
                    <Input
                      id="density"
                      type="number"
                      placeholder="1.4"
                      value={gmadProperties.density}
                      readOnly
                      className="h-12 bg-gray-100 cursor-not-allowed"
                      title="This value is automatically set based on the selected variety"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Custom Properties */}
          {customProperties.length > 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Custom Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{property.name}</div>
                        <div className="text-sm text-gray-600">
                          {property.value} {property.unit && `(${property.unit})`}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomProperty(property.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Dialog open={isCustomPropertyDialogOpen} onOpenChange={setIsCustomPropertyDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="flex items-center space-x-2 px-6 py-3"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('knowGrains.addMoreInfo')}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t('knowGrains.addProperty')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-name">{t('knowGrains.propertyName')}</Label>
                    <Input
                      id="property-name"
                      value={newProperty.name}
                      onChange={(e) => setNewProperty(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Starch Content"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-value">{t('knowGrains.propertyValue')}</Label>
                    <Input
                      id="property-value"
                      value={newProperty.value}
                      onChange={(e) => setNewProperty(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="e.g., 75.2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-unit">{t('knowGrains.propertyUnit')}</Label>
                    <Input
                      id="property-unit"
                      value={newProperty.unit}
                      onChange={(e) => setNewProperty(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="e.g., %"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCustomPropertyDialogOpen(false)}>
                      {t('knowGrains.cancel')}
                    </Button>
                    <Button onClick={handleAddProperty}>
                      {t('knowGrains.add')}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {canContinueToAnalysis && (
              <Button 
                onClick={handleContinueToAnalysis}
                className="bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90 px-8 py-3 font-bold"
              >
                Continue to Mode Selection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* ID Generation and Analysis Type Sections - Only show after Continue button is clicked */}
          {showAnalysisOptions && (
            <div id="analysis-sections">
              {/* ID Generation Section */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-rice-primary">
                    <Settings className="w-6 h-6" />
                    <span>ID Generation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 mb-4">
                    <Button
                      variant={idGenerationType === "auto" ? "default" : "outline"}
                      onClick={() => setIdGenerationType("auto")}
                      className={idGenerationType === "auto" ? "bg-rice-primary hover:bg-rice-primary/90" : ""}
                    >
                      Auto ID Generation
                    </Button>
                    <Button
                      variant={idGenerationType === "custom" ? "default" : "outline"}
                      onClick={() => setIdGenerationType("custom")}
                      className={idGenerationType === "custom" ? "bg-rice-primary hover:bg-rice-primary/90" : ""}
                    >
                      Custom ID Generation
                    </Button>
                  </div>
                  
                  {idGenerationType === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="custom-id">Enter Custom ID</Label>
                      <Input
                        id="custom-id"
                        type="number"
                        value={customId}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Only allow numeric input up to 4 characters
                          if (value === '' || (/^\d{1,4}$/.test(value))) {
                            setCustomId(value);
                          }
                        }}
                        placeholder="Enter 4-digit ID"
                        maxLength={4}
                        className="max-w-md"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Analysis Type Section */}
              <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-rice-primary">
                    <Play className="w-6 h-6" />
                    <span>Analysis Type</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Mode Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Select Analysis Mode</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Individual Mode */}
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedAnalysisMode === "individual" 
                              ? "border-rice-primary bg-rice-primary/5" 
                              : "border-gray-200 hover:border-rice-primary/50"
                          }`}
                          onClick={() => setSelectedAnalysisMode("individual")}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Checkbox 
                              checked={selectedAnalysisMode === "individual"}
                              onChange={() => {}}
                              className="pointer-events-none"
                            />
                            <h3 className="font-semibold text-gray-800">Individual</h3>
                          </div>
                          <p className="text-sm text-gray-600">Spot-check a single sample</p>
                        </div>

                        {/* Batch Mode */}
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedAnalysisMode === "batch" 
                              ? "border-rice-primary bg-rice-primary/5" 
                              : "border-gray-200 hover:border-rice-primary/50"
                          }`}
                          onClick={() => setSelectedAnalysisMode("batch")}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Checkbox 
                              checked={selectedAnalysisMode === "batch"}
                              onChange={() => {}}
                              className="pointer-events-none"
                            />
                            <h3 className="font-semibold text-gray-800">Batch</h3>
                          </div>
                          <p className="text-sm text-gray-600">Analyze a particular batch</p>
                        </div>

                        {/* Machine Wise Mode */}
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedAnalysisMode === "machine-wise" 
                              ? "border-rice-primary bg-rice-primary/5" 
                              : "border-gray-200 hover:border-rice-primary/50"
                          }`}
                          onClick={() => setSelectedAnalysisMode("machine-wise")}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Checkbox 
                              checked={selectedAnalysisMode === "machine-wise"}
                              onChange={() => {}}
                              className="pointer-events-none"
                            />
                            <h3 className="font-semibold text-gray-800">Machine Wise</h3>
                          </div>
                          <p className="text-sm text-gray-600">Evaluate specific machine performance</p>
                        </div>

                        {/* TMA Mode */}
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedAnalysisMode === "tma" 
                              ? "border-rice-primary bg-rice-primary/5" 
                              : "border-gray-200 hover:border-rice-primary/50"
                          }`}
                          onClick={() => setSelectedAnalysisMode("tma")}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Checkbox 
                              checked={selectedAnalysisMode === "tma"}
                              onChange={() => {}}
                              className="pointer-events-none"
                            />
                            <h3 className="font-semibold text-gray-800">TMA</h3>
                          </div>
                          <p className="text-sm text-gray-600">Total Mill Analyzer</p>
                        </div>
                      </div>
                    </div>

                    {/* Mode-specific Configuration */}
                    {selectedAnalysisMode && (
                      <div className="border-t pt-6">
                        {selectedAnalysisMode === "batch" && (
                          <div className="space-y-4">
                            <Label className="text-lg font-semibold">Batch Configuration</Label>
                            <div className="max-w-md">
                              <Label className="text-sm font-medium">Bin Number</Label>
                              <Input
                                type="number"
                                value={batchInput}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Only allow numeric input
                                  if (value === '' || /^\d+$/.test(value)) {
                                    setBatchInput(value);
                                  }
                                }}
                                placeholder="Enter Bin number"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        )}

                        {selectedAnalysisMode === "machine-wise" && (
                          <div className="space-y-4">
                            <Label className="text-lg font-semibold">Machine Configuration</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                              <div>
                                <Label className="text-sm font-medium">Machine Name</Label>
                                <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select machine" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {machineOptions.map((machine) => (
                                      <SelectItem key={machine} value={machine}>
                                        {machine}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Series</Label>
                                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select series" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {seriesOptions.map((series) => (
                                      <SelectItem key={series} value={series}>
                                        {series}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedAnalysisMode === "tma" && (
                          <div className="space-y-4">
                            <Label className="text-lg font-semibold">TMA Configuration</Label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Machine Selection - Fixed Display */}
                              <div>
                                <Label className="text-sm font-medium mb-2 block">Selected Machines</Label>
                                <div className="border border-gray-200 rounded p-3 bg-gray-50">
                                  <div className="grid grid-cols-1 gap-2">
                                    {machineOptions.map((machine) => (
                                      <div key={machine} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-rice-primary rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-700">
                                          {machine}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                {/* Series Selection */}
                                <div>
                                  <Label className="text-sm font-medium">Series</Label>
                                  <Select value={tmaSelectedSeries} onValueChange={setTmaSelectedSeries}>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Select series" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {seriesOptions.map((series) => (
                                        <SelectItem key={series} value={series}>
                                          {series}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                {/* Sampling Strategy */}
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">Sampling Strategy</Label>
                                  <div className="flex space-x-4 mb-2">
                                    <Button
                                      variant={samplingStrategy === "random" ? "default" : "outline"}
                                      onClick={() => setSamplingStrategy("random")}
                                      size="sm"
                                      className={samplingStrategy === "random" ? "bg-rice-primary hover:bg-rice-primary/90" : ""}
                                    >
                                      Random
                                    </Button>
                                    <Button
                                      variant={samplingStrategy === "systematic" ? "default" : "outline"}
                                      onClick={() => setSamplingStrategy("systematic")}
                                      size="sm"
                                      className={samplingStrategy === "systematic" ? "bg-rice-primary hover:bg-rice-primary/90" : ""}
                                    >
                                      Systematic
                                    </Button>
                                  </div>
                                  
                                  {samplingStrategy === "systematic" && (
                                    <Input
                                      type="number"
                                      value={systematicValue}
                                      onChange={(e) => setSystematicValue(e.target.value)}
                                      placeholder="Enter systematic value"
                                      className="w-full"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedAnalysisMode === "individual" && (
                          <div className="space-y-4">
                            <Label className="text-lg font-semibold">Individual Analysis</Label>
                            <p className="text-gray-600">Ready to analyze a single sample. Click Analyze to proceed.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Single Analyze Button */}
                    {selectedAnalysisMode && (
                      <div className="flex justify-center pt-6 border-t">
                        <Button 
                          onClick={handleAnalyzeClick}
                          disabled={!isAnalyzeEnabled()}
                          className="bg-rice-primary hover:bg-rice-primary/90 disabled:bg-gray-300 px-12 py-3 text-lg font-semibold"
                        >
                          Analyze
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Variety Dialog */}
      <Dialog open={isVarietyDialogOpen} onOpenChange={setIsVarietyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Custom Variety</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-variety">Variety Name</Label>
              <Input
                id="custom-variety"
                value={customVariety}
                onChange={(e) => setCustomVariety(e.target.value)}
                placeholder="Enter variety name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCustomVarietySubmit();
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsVarietyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCustomVarietySubmit}>
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Dialog */}
      <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Custom Process</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-process">Process Name</Label>
              <Input
                id="custom-process"
                value={customProcess}
                onChange={(e) => setCustomProcess(e.target.value)}
                placeholder="Enter process name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCustomProcessSubmit();
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsProcessDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCustomProcessSubmit}>
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Details Dialog */}
      <Dialog open={isProcessDetailsDialogOpen} onOpenChange={setIsProcessDetailsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {process && `${process.charAt(0).toUpperCase() + process.slice(1).replace('-', ' ')} Process Details`}
            </DialogTitle>
          </DialogHeader>
          <ProcessDetailsForm 
            process={process} 
            processDetails={processDetails}
            setProcessDetails={setProcessDetails}
            onClose={() => setIsProcessDetailsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TellUsAboutGrain;
