import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useMachine } from "@/contexts/MachineContext";
import { Settings as SettingsIcon, Monitor, FileText, Globe, Lightbulb, Package, Truck, Factory, Plus, Edit, Trash2, Save } from "lucide-react";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { machines, lineOutput, setLineOutput, addMachine, updateMachine, deleteMachine } = useMachine();
  
  // Hardware control states
  const [testLight, setTestLight] = useState(false);
  const [testHopper, setTestHopper] = useState(false);
  const [testConveyor, setTestConveyor] = useState(false);
  const [conveyorSpeed, setConveyorSpeed] = useState([50]);

  // Machine management states
  const [isAddMachineDialogOpen, setIsAddMachineDialogOpen] = useState(false);
  const [isEditMachineDialogOpen, setIsEditMachineDialogOpen] = useState(false);
  const [newMachineName, setNewMachineName] = useState("");
  const [editMachineIndex, setEditMachineIndex] = useState(-1);
  const [editMachineName, setEditMachineName] = useState("");

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleAddMachine = () => {
    if (newMachineName.trim()) {
      addMachine(newMachineName);
      setNewMachineName("");
      setIsAddMachineDialogOpen(false);
    }
  };

  const handleEditMachine = (index: number) => {
    setEditMachineIndex(index);
    setEditMachineName(machines[index]);
    setIsEditMachineDialogOpen(true);
  };

  const handleUpdateMachine = () => {
    if (editMachineName.trim() && editMachineIndex >= 0) {
      updateMachine(editMachineIndex, editMachineName);
      setEditMachineName("");
      setEditMachineIndex(-1);
      setIsEditMachineDialogOpen(false);
    }
  };

  const handleDeleteMachine = (index: number) => {
    deleteMachine(index);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title={t('nav.settings')} 
        subtitle="Configure application settings and preferences"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="language" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="language" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{t('settings.language')}</span>
              </TabsTrigger>
              <TabsTrigger value="hardware" className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>{t('settings.hardware')}</span>
              </TabsTrigger>
              <TabsTrigger value="line-info" className="flex items-center space-x-2">
                <Factory className="w-4 h-4" />
                <span>Line Info</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>{t('settings.reports')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="language" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-rice-primary flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>{t('settings.language')} Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="language-select" className="text-base font-medium">
                      Select Application Language
                    </Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue placeholder="Choose language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'Changes will be applied immediately across the entire application.'
                        : 'ಬದಲಾವಣೆಗಳು ಇಡೀ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ತಕ್ಷಣವೇ ಅನ್ವಯಿಸಲ್ಪಡುತ್ತವೆ.'
                      }
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Current Language: {language === 'en' ? 'English' : 'ಕನ್ನಡ'}</h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'All text throughout the application will be displayed in the selected language.'
                        : 'ಅಪ್ಲಿಕೇಶನ್‌ನ ಎಲ್ಲಾ ಪಠ್ಯವು ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲ್ಪಡುತ್ತದೆ.'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hardware" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-rice-primary flex items-center space-x-2">
                    <Monitor className="w-5 h-5" />
                    <span>{t('settings.hardware')} Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Test Light Control */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600" />
                        <div>
                          <Label className="text-base font-medium">Test Light</Label>
                          <p className="text-sm text-gray-600">Control the test light for grain analysis</p>
                        </div>
                      </div>
                      <Switch
                        checked={testLight}
                        onCheckedChange={setTestLight}
                        className="data-[state=checked]:bg-rice-primary"
                      />
                    </div>
                    <div className="ml-8 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        testLight ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {testLight ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  {/* Test Hopper Control */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <div>
                          <Label className="text-base font-medium">Test Hopper</Label>
                          <p className="text-sm text-gray-600">Control the test hopper mechanism</p>
                        </div>
                      </div>
                      <Switch
                        checked={testHopper}
                        onCheckedChange={setTestHopper}
                        className="data-[state=checked]:bg-rice-primary"
                      />
                    </div>
                    <div className="ml-8 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        testHopper ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {testHopper ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  {/* Test Conveyor Control */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-green-600" />
                        <div>
                          <Label className="text-base font-medium">Test Conveyor</Label>
                          <p className="text-sm text-gray-600">Control the test conveyor belt</p>
                        </div>
                      </div>
                      <Switch
                        checked={testConveyor}
                        onCheckedChange={setTestConveyor}
                        className="data-[state=checked]:bg-rice-primary"
                      />
                    </div>
                    
                    {/* Conveyor Speed Control */}
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Conveyor Speed</Label>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          testConveyor ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {testConveyor ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Slider
                          value={conveyorSpeed}
                          onValueChange={setConveyorSpeed}
                          max={100}
                          min={0}
                          step={1}
                          disabled={!testConveyor}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0%</span>
                          <span className="font-semibold">{conveyorSpeed[0]}%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Status Summary */}
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-3 text-gray-800">Hardware Status Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Test Light</div>
                        <div className={`font-semibold ${
                          testLight ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {testLight ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Test Hopper</div>
                        <div className={`font-semibold ${
                          testHopper ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {testHopper ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">Test Conveyor</div>
                        <div className={`font-semibold ${
                          testConveyor ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {testConveyor ? `Active (${conveyorSpeed[0]}%)` : 'Inactive'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="line-info" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-rice-primary flex items-center space-x-2">
                    <Factory className="w-5 h-5" />
                    <span>Line Information Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Line Output Configuration */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <div>
                        <Label className="text-base font-medium">Line Output Configuration</Label>
                        <p className="text-sm text-gray-600">Set the production line output capacity</p>
                      </div>
                    </div>
                    
                    <div className="max-w-md">
                      <Label htmlFor="line-output" className="text-sm font-medium">
                        Line Output (TPH)
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="line-output"
                          type="number"
                          step="0.1"
                          min="0"
                          value={lineOutput}
                          onChange={(e) => setLineOutput(e.target.value)}
                          placeholder="10.0"
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-600 min-w-[40px]">TPH</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Tonnes Per Hour - Current setting: {lineOutput || '0'} TPH
                      </p>
                    </div>
                  </div>

                  {/* Machine Management */}
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-green-600" />
                        <div>
                          <Label className="text-base font-medium">Machine Configuration</Label>
                          <p className="text-sm text-gray-600">Manage production line machines</p>
                        </div>
                      </div>
                      <Dialog open={isAddMachineDialogOpen} onOpenChange={setIsAddMachineDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-rice-primary hover:bg-rice-primary/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Machine
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add New Machine</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-machine-name">Machine Name</Label>
                              <Input
                                id="new-machine-name"
                                value={newMachineName}
                                onChange={(e) => setNewMachineName(e.target.value)}
                                placeholder="Enter machine name"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleAddMachine();
                                  }
                                }}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsAddMachineDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddMachine} disabled={!newMachineName.trim()}>
                                Add Machine
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Machine List */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                        {machines.map((machine, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-rice-primary rounded-full"></div>
                              <span className="font-medium text-gray-800">{machine}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditMachine(index)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteMachine(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={machines.length <= 1}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {machines.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p>No machines configured</p>
                          <p className="text-sm">Add your first machine to get started</p>
                        </div>
                      )}
                    </div>

                    {/* Machine Summary */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3 text-gray-800">Configuration Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Total Machines</div>
                          <div className="font-semibold text-rice-primary text-lg">
                            {machines.length}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Line Output</div>
                          <div className="font-semibold text-rice-primary text-lg">
                            {lineOutput || '0'} TPH
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-rice-primary flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>{t('settings.reports')} Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Report generation and export settings will be available here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Machine Dialog */}
      <Dialog open={isEditMachineDialogOpen} onOpenChange={setIsEditMachineDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Machine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-machine-name">Machine Name</Label>
              <Input
                id="edit-machine-name"
                value={editMachineName}
                onChange={(e) => setEditMachineName(e.target.value)}
                placeholder="Enter machine name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateMachine();
                  }
                }}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditMachineDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateMachine} disabled={!editMachineName.trim()}>
                <Save className="w-4 h-4 mr-2" />
                Update Machine
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings; 