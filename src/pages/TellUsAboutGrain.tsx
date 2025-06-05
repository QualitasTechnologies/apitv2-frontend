
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Wheat, ArrowRight } from "lucide-react";

const TellUsAboutGrain = () => {
  const [grainType, setGrainType] = useState("");
  const [variety, setVariety] = useState("");
  const [process, setProcess] = useState("");
  const [testing, setTesting] = useState("");
  const [sampling, setSampling] = useState("");
  const [batch, setBatch] = useState("");

  const isFormComplete = grainType && variety && process && testing && sampling && batch;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Tell Us About Your Grain" 
        subtitle="Provide sample categorization information"
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
                {/* Grain Type */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Grain Type</Label>
                  <RadioGroup value={grainType} onValueChange={setGrainType}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="paddy" id="paddy" />
                      <Label htmlFor="paddy" className="cursor-pointer font-medium">Paddy</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="rice" id="rice" />
                      <Label htmlFor="rice" className="cursor-pointer font-medium">Rice</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Variety */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Variety</Label>
                  <RadioGroup value={variety} onValueChange={setVariety}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="jsr" id="jsr" />
                      <Label htmlFor="jsr" className="cursor-pointer font-medium">JSR</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="hmt" id="hmt" />
                      <Label htmlFor="hmt" className="cursor-pointer font-medium">HMT</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="basmati" id="basmati" />
                      <Label htmlFor="basmati" className="cursor-pointer font-medium">BASMATI</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Process */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Process</Label>
                  <RadioGroup value={process} onValueChange={setProcess}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="parboiled" id="parboiled" />
                      <Label htmlFor="parboiled" className="cursor-pointer font-medium">Parboiled</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="super-aging" id="super-aging" />
                      <Label htmlFor="super-aging" className="cursor-pointer font-medium">Super Aging</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="raw" id="raw" />
                      <Label htmlFor="raw" className="cursor-pointer font-medium">Raw</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Selection */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="text-rice-primary">Testing Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Testing Options */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Testing Type</Label>
                  <RadioGroup value={testing} onValueChange={setTesting}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="cursor-pointer font-medium">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="batch" id="batch" />
                      <Label htmlFor="batch" className="cursor-pointer font-medium">Batch</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="milling-batch" id="milling-batch" />
                      <Label htmlFor="milling-batch" className="cursor-pointer font-medium">Milling Batch</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Sampling Technique */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Sampling Technique</Label>
                  <RadioGroup value={sampling} onValueChange={setSampling}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="random" id="random" />
                      <Label htmlFor="random" className="cursor-pointer font-medium">Random</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="systematic" id="systematic" />
                      <Label htmlFor="systematic" className="cursor-pointer font-medium">Systematic</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="stratified" id="stratified" />
                      <Label htmlFor="stratified" className="cursor-pointer font-medium">Stratified</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Batch Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Batch Type</Label>
                  <RadioGroup value={batch} onValueChange={setBatch}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="bin" id="bin" />
                      <Label htmlFor="bin" className="cursor-pointer font-medium">Bin</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="dryer" id="dryer" />
                      <Label htmlFor="dryer" className="cursor-pointer font-medium">Dryer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="parboiling" id="parboiling" />
                      <Label htmlFor="parboiling" className="cursor-pointer font-medium">Parboiling</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          {isFormComplete && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Selection Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-600">Grain Type:</span>
                    <p className="font-medium capitalize">{grainType}</p>
                  </div>
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
                  <div>
                    <span className="font-semibold text-gray-600">Sampling:</span>
                    <p className="font-medium capitalize">{sampling}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Batch:</span>
                    <p className="font-medium capitalize">{batch}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            <Link to="/know-your-grains">
              <Button 
                disabled={!isFormComplete}
                className="bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90 px-12 py-6 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                GO
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TellUsAboutGrain;
