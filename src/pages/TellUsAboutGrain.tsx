
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Wheat, ArrowRight, Plus, X, Save } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomProperty {
  id: string;
  name: string;
  value: string;
  unit?: string;
}

const TellUsAboutGrain = () => {
  const { t } = useLanguage();
  
  // TellUsAboutGrain state
  const [variety, setVariety] = useState("");
  const [process, setProcess] = useState("");
  const [testing, setTesting] = useState("");
  const [sampling, setSampling] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [machine, setMachine] = useState("");

  // Dialog states for "Others" option
  const [isVarietyDialogOpen, setIsVarietyDialogOpen] = useState(false);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [customVariety, setCustomVariety] = useState("");
  const [customProcess, setCustomProcess] = useState("");

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

  const isFormComplete = variety && process && testing && sampling && batchNumber && (testing !== "batch" || machine);

  // Machine options for batch testing
  const machineOptions = [
    "Clean I (Precleaner)",
    "Stone Sort I (Destoner)",
    "Shell I (Husker)",
    "Paddy Sort I (Tray seperator)",
    "White I (Whitener)",
    "Bright I (Silky polisher)",
    "Thickthin Sort I (Thickness grader)",
    "Sift I (Sifter)",
    "Length Sort I (Length grader)",
    "Blend & Pack I (Blend and Pack)",
    "Intel Vision (Sortex/color sorter)"
  ];

  // TellUsAboutGrain handlers
  const handleVarietyChange = (value: string) => {
    if (value === "others") {
      setIsVarietyDialogOpen(true);
    } else {
      setVariety(value);
    }
  };

  const handleProcessChange = (value: string) => {
    if (value === "others") {
      setIsProcessDialogOpen(true);
    } else {
      setProcess(value);
    }
  };

  const handleTestingChange = (value: string) => {
    setTesting(value);
    // Reset machine selection when changing testing type
    if (value !== "batch") {
      setMachine("");
    }
  };

  const handleCustomVarietySubmit = () => {
    if (customVariety.trim()) {
      setVariety(customVariety.trim());
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        {process && !["parboiled", "super-aging", "raw", "others"].includes(process) ? process : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parboiled">Parboiled</SelectItem>
                      <SelectItem value="super-aging">Super Aging</SelectItem>
                      <SelectItem value="raw">Raw</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                      {process && !["parboiled", "super-aging", "raw", "others"].includes(process) && (
                        <SelectItem value={process}>{process}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Parameters */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="text-rice-primary">Testing Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Testing Type */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Testing Type</Label>
                  <Select value={testing} onValueChange={handleTestingChange}>
                    <SelectTrigger className="h-12 border-2 hover:border-rice-primary transition-colors">
                      <SelectValue placeholder="Select testing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="batch">Batch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Machine - Only show when testing type is "batch" */}
                {testing === "batch" && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Machine</Label>
                    <Select value={machine} onValueChange={setMachine}>
                      <SelectTrigger className="h-12 border-2 hover:border-rice-primary transition-colors">
                        <SelectValue placeholder="Select machine" />
                      </SelectTrigger>
                      <SelectContent>
                        {machineOptions.map((machineOption) => (
                          <SelectItem key={machineOption} value={machineOption}>
                            {machineOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Sampling Technique */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Sampling Technique</Label>
                  <Select value={sampling} onValueChange={setSampling}>
                    <SelectTrigger className="h-12 border-2 hover:border-rice-primary transition-colors">
                      <SelectValue placeholder="Select sampling technique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="systematic">Systematic</SelectItem>
                      <SelectItem value="stratified">Stratified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Batch Number */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Batch Number</Label>
                  <Input 
                    value={batchNumber} 
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="Enter batch number"
                    className="h-12 border-2 hover:border-rice-primary transition-colors"
                  />
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-600">Variety:</span>
                    <p className="font-medium uppercase">{variety}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Process:</span>
                    <p className="font-medium capitalize">{process}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Testing:</span>
                    <p className="font-medium capitalize">{testing}</p>
                  </div>
                  {testing === "batch" && machine && (
                    <div>
                      <span className="font-semibold text-gray-600">Machine:</span>
                      <p className="font-medium">{machine}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-gray-600">Sampling:</span>
                    <p className="font-medium capitalize">{sampling}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Batch Number:</span>
                    <p className="font-medium">{batchNumber}</p>
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
                    <Label htmlFor="gelatinization" className="font-medium">{t('knowGrains.gelatinization')}</Label>
                    <Input
                      id="gelatinization"
                      type="number"
                      placeholder="65"
                      value={gmadProperties.gelatinization}
                      onChange={(e) => updateGmadProperty('gelatinization', e.target.value)}
                      className="h-12"
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
                    <Label htmlFor="density" className="font-medium">{t('knowGrains.density')}</Label>
                    <Input
                      id="density"
                      type="number"
                      placeholder="1.4"
                      value={gmadProperties.density}
                      onChange={(e) => updateGmadProperty('density', e.target.value)}
                      className="h-12"
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
            
            <Link to="/live-analysis">
              <Button 
                className="bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90 px-8 py-3 font-bold"
              >
                {t('knowGrains.continueToLive')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
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
    </div>
  );
};

export default TellUsAboutGrain;
