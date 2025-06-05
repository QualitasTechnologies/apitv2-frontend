
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Camera, Save, Trash2, Play, Pause } from "lucide-react";

const LiveAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  
  // Mock analysis results
  const [results, setResults] = useState({
    goodGrains: 85.6,
    defectiveGrains: 8.2,
    brokenGrains: 4.1,
    fullGrains: 91.8,
    chalkyGrains: 2.1
  });

  const handleStartStop = () => {
    setIsAnalyzing(!isAnalyzing);
    console.log(isAnalyzing ? "Stopping analysis" : "Starting analysis");
  };

  const handleSaveSample = () => {
    console.log("Saving sample with results:", results);
  };

  const handleDeleteSample = () => {
    console.log("Deleting current sample");
    setResults({
      goodGrains: 0,
      defectiveGrains: 0,
      brokenGrains: 0,
      fullGrains: 0,
      chalkyGrains: 0
    });
  };

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

                      {/* Good Grain Indicator */}
                      {isAnalyzing && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                          Good Grain Detected
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
              <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="text-rice-primary">Real-time Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">Good Grains</span>
                      <span className="font-bold text-xl text-green-600">{results.goodGrains}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium text-red-800">Defective Grains</span>
                      <span className="font-bold text-xl text-red-600">{results.defectiveGrains}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-800">Broken Grains</span>
                      <span className="font-bold text-xl text-orange-600">{results.brokenGrains}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">Full Grains</span>
                      <span className="font-bold text-xl text-blue-600">{results.fullGrains}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-800">Chalky Grains</span>
                      <span className="font-bold text-xl text-purple-600">{results.chalkyGrains}%</span>
                    </div>
                  </div>
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
