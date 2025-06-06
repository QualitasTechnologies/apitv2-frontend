import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight, Settings, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type MachineType = 'A' | 'B';

const MassBalance = () => {
  const { t } = useLanguage();
  const [totalWeight, setTotalWeight] = useState("");
  const [selectedMachine, setSelectedMachine] = useState<MachineType>('A');
  
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

  const handleMachineToggle = (checked: boolean) => {
    setSelectedMachine(checked ? 'B' : 'A');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title={t('massBalance.title')} 
        subtitle={t('massBalance.subtitle')}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Machine Selection Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <Settings className="w-6 h-6" />
                <span>{t('massBalance.machineSelection')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Machine Toggle */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Cpu className="w-5 h-5 text-rice-primary" />
                      <span className="font-medium">{t('massBalance.machineA')}</span>
                    </div>
                    <Switch
                      checked={selectedMachine === 'B'}
                      onCheckedChange={handleMachineToggle}
                      className="data-[state=checked]:bg-rice-primary"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{t('massBalance.machineB')}</span>
                      <Cpu className="w-5 h-5 text-rice-primary" />
                    </div>
                  </div>
                  
                  {/* Machine Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">
                      {t('massBalance.selected')}: {t(`massBalance.machine${selectedMachine}`)}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      {selectedMachine === 'A' ? (
                        <>
                          <p>{t('massBalance.machineADesc1')}</p>
                          <p>{t('massBalance.machineADesc2')}</p>
                          <p>{t('massBalance.machineADesc3')}</p>
                          <p>{t('massBalance.machineADesc4')}</p>
                        </>
                      ) : (
                        <>
                          <p>{t('massBalance.machineBDesc1')}</p>
                          <p>{t('massBalance.machineBDesc2')}</p>
                          <p>{t('massBalance.machineBDesc3')}</p>
                          <p>{t('massBalance.machineBDesc4')}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Machine Image */}
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="w-64 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center transition-all duration-300">
                      {selectedMachine === 'A' ? (
                        <div className="text-center">
                          <div className="w-20 h-16 bg-rice-primary rounded-lg mx-auto mb-3 flex items-center justify-center">
                            <Cpu className="w-10 h-10 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">{t('massBalance.machineA')}</p>
                          <p className="text-xs text-gray-500">{t('massBalance.precisionAnalyzer')}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-20 h-16 bg-rice-secondary rounded-lg mx-auto mb-3 flex items-center justify-center">
                            <Cpu className="w-10 h-10 text-rice-primary" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">{t('massBalance.machineB')}</p>
                          <p className="text-xs text-gray-500">{t('massBalance.advancedMultiAnalyzer')}</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Section */}
          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <Calculator className="w-6 h-6" />
                <span>{t('massBalance.totalWeightInput')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="weight" className="text-lg font-medium">
                      {t('massBalance.enterTotalWeight')}
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
                {selectedMachine && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium">
                      {t('massBalance.usingMachine')} {selectedMachine} {t('massBalance.forAnalysis')}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Formula Display */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="text-rice-primary">{t('massBalance.breakdownFormula')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">65%</div>
                  <div className="text-sm font-medium text-gray-700">{t('massBalance.brownRice')}</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">20%</div>
                  <div className="text-sm font-medium text-gray-700">{t('massBalance.husk')}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8%</div>
                  <div className="text-sm font-medium text-gray-700">{t('massBalance.bran')}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">7%</div>
                  <div className="text-sm font-medium text-gray-700">{t('massBalance.paddy')}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {breakdown && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">{t('massBalance.calculatedBreakdown')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Brown Rice */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-600">{t('massBalance.brownRice')}</span>
                      <span className="font-bold text-xl">
                        {breakdown.brownRice.toFixed(2)} gms (65%)
                      </span>
                    </div>
                    <Progress value={65} className="h-3" />
                  </div>

                  {/* Husk */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-orange-600">{t('massBalance.husk')}</span>
                      <span className="font-bold text-xl">
                        {breakdown.husk.toFixed(2)} gms (20%)
                      </span>
                    </div>
                    <Progress value={20} className="h-3" />
                  </div>

                  {/* Bran */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">{t('massBalance.bran')}</span>
                      <span className="font-bold text-xl">
                        {breakdown.bran.toFixed(2)} gms (8%)
                      </span>
                    </div>
                    <Progress value={8} className="h-3" />
                  </div>

                  {/* Paddy */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-purple-600">{t('massBalance.paddy')}</span>
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
                  {t('massBalance.proceedToGrain')}
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
