import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Settings as SettingsIcon, Monitor, Image, FileText, Globe } from "lucide-react";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
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
              <TabsTrigger value="image" className="flex items-center space-x-2">
                <Image className="w-4 h-4" />
                <span>{t('settings.image')}</span>
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
                <CardContent>
                  <p className="text-gray-600">Hardware configuration settings will be available here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-rice-primary flex items-center space-x-2">
                    <Image className="w-5 h-5" />
                    <span>{t('settings.image')} Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Image processing and analysis settings will be available here.</p>
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
    </div>
  );
};

export default Settings; 