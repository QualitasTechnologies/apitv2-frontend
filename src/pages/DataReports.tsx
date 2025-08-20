
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, Factory, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessData {
  id: string;
  name: string;
  date: string;
  goodRice: number;
  rejection: number;
  foreignMatter: number;
  totalQuantity: number;
}

const DataReports = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reportType, setReportType] = useState("machine");
  
  // Sample data for machine processes
  const machineProcesses: ProcessData[] = [
    {
      id: "M001",
      name: "Stone Sort I",
      date: "2024-11-15",
      goodRice: 93.5,
      rejection: 4.2,
      foreignMatter: 0.3,
      totalQuantity: 500
    },
    {
      id: "M002", 
      name: "Paddy Sort I",
      date: "2024-12-20",
      goodRice: 92.8,
      rejection: 5.1,
      foreignMatter: 0.5,
      totalQuantity: 750
    },
    {
      id: "M003",
      name: "Shell Sort I", 
      date: "2025-01-10",
      goodRice: 94.2,
      rejection: 3.8,
      foreignMatter: 0.2,
      totalQuantity: 600
    },
    {
      id: "M004",
      name: "Shell Sort II",
      date: "2025-02-05", 
      goodRice: 91.9,
      rejection: 6.2,
      foreignMatter: 0.7,
      totalQuantity: 450
    }
  ];

  // Sample data for batch processes
  const batchProcesses: ProcessData[] = [
    {
      id: "B001",
      name: "Batch #2024-001",
      date: "2024-10-25",
      goodRice: 95.1,
      rejection: 3.2,
      foreignMatter: 0.1,
      totalQuantity: 1000
    },
    {
      id: "B002",
      name: "Batch #2024-002", 
      date: "2024-12-08",
      goodRice: 93.7,
      rejection: 4.8,
      foreignMatter: 0.4,
      totalQuantity: 850
    },
    {
      id: "B003",
      name: "Batch #2025-001",
      date: "2025-01-22",
      goodRice: 96.3,
      rejection: 2.9,
      foreignMatter: 0.2,
      totalQuantity: 1200
    },
    {
      id: "B004",
      name: "Batch #2025-002",
      date: "2025-03-12",
      goodRice: 92.4,
      rejection: 5.5,
      foreignMatter: 0.6,
      totalQuantity: 900
    }
  ];

  // Filter processes based on selected date range
  const getFilteredProcesses = () => {
    const processes = reportType === "machine" ? machineProcesses : batchProcesses;
    
    if (!fromDate || !toDate) {
      return processes;
    }
    
    return processes.filter(process => {
      const processDate = new Date(process.date);
      return processDate >= fromDate && processDate <= toDate;
    });
  };

  const currentProcesses = getFilteredProcesses();

  const handleDownloadReport = (processId: string, processName: string) => {
    console.log(`Downloading report for ${processName} (ID: ${processId})`);
    
    // Create a dummy PDF download
    const pdfFileName = reportType === "machine" ? "machine_analysis_report.pdf" : "batch_analysis_report.pdf";
    const link = document.createElement('a');
    link.href = `/${pdfFileName}`;
    link.download = `${processName.replace(/[^a-zA-Z0-9]/g, '_')}_report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getQualityStatus = (goodRice: number) => {
    if (goodRice >= 95) return { status: "Excellent", color: "text-green-600" };
    if (goodRice >= 90) return { status: "Good", color: "text-blue-600" };
    if (goodRice >= 85) return { status: "Average", color: "text-yellow-600" };
    return { status: "Poor", color: "text-red-600" };
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Data Reports" 
        subtitle="Generate and download process-specific quality reports"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Filters Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-rice-primary">Report Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Date Range */}
                <div className="space-y-4">
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
                          onSelect={(date) => {
                            setFromDate(date);
                            // If to date is before the new from date, reset it
                            if (toDate && date && toDate < date) {
                              setToDate(undefined);
                            }
                          }}
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
                          disabled={(date) => fromDate ? date < fromDate : false}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Report Type */}
                <div className="lg:col-span-2">
                  <Label className="font-medium mb-4 block">Report Type</Label>
                  <RadioGroup value={reportType} onValueChange={setReportType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="machine" id="machine" />
                      <Label htmlFor="machine" className="cursor-pointer flex items-center space-x-3 flex-1">
                        <Factory className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">Machine Process</div>
                          <div className="text-sm text-gray-600">Individual machine line reports</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="batch" id="batch" />
                      <Label htmlFor="batch" className="cursor-pointer flex items-center space-x-3 flex-1">
                        <Package className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Batch Process</div>
                          <div className="text-sm text-gray-600">Batch-wise analysis reports</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process List */}
          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                {reportType === "machine" ? <Factory className="w-6 h-6" /> : <Package className="w-6 h-6" />}
                <span>{reportType === "machine" ? "Machine Processes" : "Batch Processes"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentProcesses.map((process) => {
                  const qualityInfo = getQualityStatus(process.goodRice);
                  return (
                    <div key={process.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{process.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${qualityInfo.color} bg-gray-100`}>
                              {qualityInfo.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Date: {format(new Date(process.date), "PPP")}</p>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-green-600 font-semibold">Good Rice</div>
                              <div className="text-xl font-bold text-green-700">{process.goodRice}%</div>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <div className="text-red-600 font-semibold">Rejection</div>
                              <div className="text-xl font-bold text-red-700">{process.rejection}%</div>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <div className="text-yellow-600 font-semibold">Foreign Matter</div>
                              <div className="text-xl font-bold text-yellow-700">{process.foreignMatter}%</div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-blue-600 font-semibold">Total Quantity</div>
                              <div className="text-xl font-bold text-blue-700">{process.totalQuantity}kg</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:ml-6">
                          <Button
                            onClick={() => handleDownloadReport(process.id, process.name)}
                            className="bg-rice-primary hover:bg-rice-primary/90 text-white px-6 py-2"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
                             {currentProcesses.length === 0 && (
                 <div className="text-center py-8 text-gray-500">
                   {fromDate && toDate 
                     ? `No ${reportType} processes found for the selected date range (${format(fromDate, "MMM dd, yyyy")} - ${format(toDate, "MMM dd, yyyy")}).`
                     : `No ${reportType} processes available. Select a date range to view processes.`
                   }
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataReports;
