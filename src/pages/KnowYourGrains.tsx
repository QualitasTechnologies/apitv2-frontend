import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomProperty {
  id: string;
  name: string;
  value: string;
  unit?: string;
}

const KnowYourGrains = () => {
  const { t } = useLanguage();
  
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

  const [gmadProperties, setGmadProperties] = useState({
    gelatinization: "",
    moisture: "",
    age: "",
    density: ""
  });

  const [customProperties, setCustomProperties] = useState<CustomProperty[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    value: "",
    unit: ""
  });

  const updateGeoProperty = (property: string, value: string) => {
    setGeoProperties(prev => ({ ...prev, [property]: value }));
  };

  const updateChemicalProperty = (property: string, value: string) => {
    setChemicalProperties(prev => ({ ...prev, [property]: value }));
  };

  const updateGmadProperty = (property: string, value: string) => {
    setGmadProperties(prev => ({ ...prev, [property]: value }));
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
      setIsDialogOpen(false);
    }
  };

  const removeCustomProperty = (id: string) => {
    setCustomProperties(prev => prev.filter(prop => prop.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title={t('knowGrains.title')} 
        subtitle={t('knowGrains.subtitle')}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link to="/tell-us-about-grain">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{t('knowGrains.previous')}</span>
              </Button>
            </Link>
            <div className="text-sm text-gray-600">{t('knowGrains.pageOf')}</div>
            <Button variant="outline" disabled className="flex items-center space-x-2">
              <span>{t('knowGrains.next')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Grain Visualization */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-rice-primary">{t('knowGrains.grainVisualization')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="w-16 h-8 bg-amber-200 rounded-full mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-100 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">{t('knowGrains.visualDescription')}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('knowGrains.visualSubtext')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Geo Properties */}
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">{t('knowGrains.geoProperties')}</CardTitle>
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
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">{t('knowGrains.chemicalProperties')}</CardTitle>
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
            <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">{t('knowGrains.gmadProperties')}</CardTitle>
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
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
    </div>
  );
};

export default KnowYourGrains;
