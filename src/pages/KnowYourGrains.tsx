
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

const KnowYourGrains = () => {
  const [geoProperties, setGeoProperties] = useState({
    length: "",
    breadth: "",
    weight: "",
    aspectRatio: "",
    hardness: ""
  });

  const [chemicalProperties, setChemicalProperties] = useState({
    protein: "",
    carbohydrate: "",
    vitamin: "",
    mineral: "",
    lipids: ""
  });

  const updateGeoProperty = (property: string, value: string) => {
    setGeoProperties(prev => ({ ...prev, [property]: value }));
  };

  const updateChemicalProperty = (property: string, value: string) => {
    setChemicalProperties(prev => ({ ...prev, [property]: value }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Know Your Grains" 
        subtitle="Detailed grain properties and parameters"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link to="/tell-us-about-grain">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
            </Link>
            <div className="text-sm text-gray-600">Page 1 of 1</div>
            <Button variant="outline" disabled className="flex items-center space-x-2">
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Grain Visualization */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-rice-primary">Grain Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="w-16 h-8 bg-amber-200 rounded-full mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-100 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Rice Grain Sample Visualization</p>
                  <p className="text-sm text-gray-500 mt-1">Visual representation updates based on entered data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Geo Properties */}
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">Geo Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="font-medium">Length (mm)</Label>
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
                    <Label htmlFor="breadth" className="font-medium">Breadth (mm)</Label>
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
                    <Label htmlFor="weight" className="font-medium">Weight (mg)</Label>
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
                    <Label htmlFor="aspectRatio" className="font-medium">Aspect Ratio</Label>
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
                    <Label htmlFor="hardness" className="font-medium">Hardness (HV)</Label>
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
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">Chemical Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="protein" className="font-medium">Protein (%)</Label>
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
                    <Label htmlFor="carbohydrate" className="font-medium">Carbohydrate (%)</Label>
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
                    <Label htmlFor="vitamin" className="font-medium">Vitamin (mg/100g)</Label>
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
                    <Label htmlFor="mineral" className="font-medium">Mineral (%)</Label>
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
                    <Label htmlFor="lipids" className="font-medium">Lipids (%)</Label>
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
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              className="flex items-center space-x-2 px-6 py-3"
            >
              <Plus className="w-4 h-4" />
              <span>Add More Info</span>
            </Button>
            
            <Link to="/live-analysis">
              <Button 
                className="bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90 px-8 py-3 font-bold"
              >
                Continue to Live Analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowYourGrains;
