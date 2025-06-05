
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, FileText, Download, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

const DataReports = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reportType, setReportType] = useState("consolidated");
  
  const handleExportPDF = () => {
    console.log("Exporting to PDF with options:", {
      fromDate,
      toDate,
      reportType
    });
    // Here would be the actual PDF export logic
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel with options:", {
      fromDate,
      toDate,
      reportType
    });
    // Here would be the actual Excel export logic
  };

  const previewData = [
    { parameter: "Head Rice (%)", value: "93.5", target: "≥90", status: "Pass" },
    { parameter: "Broken Rice (%)", value: "4.2", target: "≤5", status: "Pass" },
    { parameter: "Defective Grains (%)", value: "1.8", target: "≤3", status: "Pass" },
    { parameter: "Chalky Grains (%)", value: "0.5", target: "≤2", status: "Pass" },
    { parameter: "Foreign Matter (%)", value: "0.1", target: "≤0.5", status: "Pass" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Data Reports" 
        subtitle="Generate and export detailed quality reports"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Report Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date Range Selection */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-rice-primary">Date Range Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-medium">From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Type Selection */}
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-rice-primary">Report Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={reportType} onValueChange={setReportType}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="consolidated" id="consolidated" />
                    <Label htmlFor="consolidated" className="cursor-pointer font-medium flex-1">
                      <div>
                        <div className="font-semibold">Consolidated Report</div>
                        <div className="text-sm text-gray-600">Summary of all parameters with averages</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="detailed" id="detailed" />
                    <Label htmlFor="detailed" className="cursor-pointer font-medium flex-1">
                      <div>
                        <div className="font-semibold">Detailed Report</div>
                        <div className="text-sm text-gray-600">Individual sample data with complete analysis</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Report Preview */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <FileText className="w-6 h-6" />
                <span>Report Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Report Header */}
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-rice-primary">Rice Quality Analysis Report</h2>
                      <p className="text-gray-600">Rice Mill Private Limited</p>
                      <p className="text-sm text-gray-500">
                        Period: {fromDate ? format(fromDate, "PPP") : "Start Date"} to {toDate ? format(toDate, "PPP") : "End Date"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Report Type: {reportType}</p>
                      <p className="text-sm text-gray-500">Generated: {format(new Date(), "PPP")}</p>
                    </div>
                  </div>
                </div>

                {/* Sample Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Parameter</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Value</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Target</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 font-medium">{row.parameter}</td>
                          <td className="border border-gray-300 px-4 py-2">{row.value}</td>
                          <td className="border border-gray-300 px-4 py-2">{row.target}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                              row.status === 'Pass' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Samples:</span>
                      <span className="font-semibold ml-2">156</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Average Quality Score:</span>
                      <span className="font-semibold ml-2 text-green-600">94.8%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Compliance Rate:</span>
                      <span className="font-semibold ml-2 text-green-600">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="text-rice-primary">Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleExportPDF}
                  disabled={!fromDate || !toDate}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export to PDF
                </Button>
                
                <Button
                  onClick={handleExportExcel}
                  disabled={!fromDate || !toDate}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
                  size="lg"
                >
                  <FileSpreadsheet className="w-5 h-5 mr-2" />
                  Export to Excel
                </Button>
              </div>
              
              {(!fromDate || !toDate) && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Please select both start and end dates to enable export
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataReports;
