
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";

const MassBalance = () => {
  const [totalWeight, setTotalWeight] = useState("");
  
  // Predefined percentages for breakdown calculation
  const breakdownPercentages = {
    brownRice: 0.65, // 65%
    husk: 0.20,      // 20%
    bran: 0.08,      // 8%
    paddy: 0.07      // 7%
  };

  const calculateBreakdown = (weight: number) => {
    return {
      brownRice: weight * breakdownPercentages.brownRice,
      husk: weight * breakdownPercentages.husk,
      bran: weight * breakdownPercentages.bran,
      paddy: weight * breakdownPercentages.paddy
    };
  };

  const breakdown = totalWeight ? calculateBreakdown(parseFloat(totalWeight) || 0) : null;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Mass Balance" 
        subtitle="Calculate component breakdown from total sample weight"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <Calculator className="w-6 h-6" />
                <span>Total Sample Weight Input</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="weight" className="text-lg font-medium">
                      Enter Total Weight
                    </Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="100"
                        value={totalWeight}
                        onChange={(e) => setTotalWeight(e.target.value)}
                        className="text-2xl h-16 text-center font-bold"
                      />
                      <span className="text-xl font-semibold text-gray-600">gms</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formula Display */}
          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-rice-primary">Breakdown Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">65%</div>
                  <div className="text-sm font-medium text-gray-700">Brown Rice</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">20%</div>
                  <div className="text-sm font-medium text-gray-700">Husk</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8%</div>
                  <div className="text-sm font-medium text-gray-700">Bran</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">7%</div>
                  <div className="text-sm font-medium text-gray-700">Paddy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {breakdown && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Calculated Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Brown Rice */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-600">Brown Rice</span>
                      <span className="font-bold text-xl">
                        {breakdown.brownRice.toFixed(2)} gms (65%)
                      </span>
                    </div>
                    <Progress value={65} className="h-3" />
                  </div>

                  {/* Husk */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-orange-600">Husk</span>
                      <span className="font-bold text-xl">
                        {breakdown.husk.toFixed(2)} gms (20%)
                      </span>
                    </div>
                    <Progress value={20} className="h-3" />
                  </div>

                  {/* Bran */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">Bran</span>
                      <span className="font-bold text-xl">
                        {breakdown.bran.toFixed(2)} gms (8%)
                      </span>
                    </div>
                    <Progress value={8} className="h-3" />
                  </div>

                  {/* Paddy */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-purple-600">Paddy</span>
                      <span className="font-bold text-xl">
                        {breakdown.paddy.toFixed(2)} gms (7%)
                      </span>
                    </div>
                    <Progress value={7} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          {breakdown && (
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/tell-us-about-grain">
                <Button 
                  className="bg-rice-secondary text-rice-primary hover:bg-rice-secondary/90 px-8 py-4 text-lg font-bold"
                  size="lg"
                >
                  Proceed to Grain Information
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MassBalance;
