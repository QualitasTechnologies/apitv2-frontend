
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, Factory, Package, User, Settings, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface SampleData {
  sampleNumber: number;
  weight: string;
  goodRice: number;
  rejection: number;
  foreignMatter: number;
  completed: boolean;
}

interface ProcessData {
  id: string;
  name: string;
  date: string;
  sessionType: string;
  variety: string;
  process: string;
  samples: SampleData[];
  totalQuantity: number;
  overallGoodRice: number;
  overallRejection: number;
  overallForeignMatter: number;
}

const DataReports = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reportType, setReportType] = useState("individual");
  
  // Sample data for individual sessions
  const individualSessions: ProcessData[] = [
    {
      id: "IND001",
      name: "Individual Session #001",
      date: "2024-11-15",
      sessionType: "individual",
      variety: "BASMATI",
      process: "Raw",
      samples: [
        { sampleNumber: 1, weight: "2.5", goodRice: 94.2, rejection: 4.1, foreignMatter: 0.3, completed: true },
        { sampleNumber: 2, weight: "2.3", goodRice: 93.8, rejection: 4.5, foreignMatter: 0.4, completed: true },
        { sampleNumber: 3, weight: "2.7", goodRice: 95.1, rejection: 3.8, foreignMatter: 0.2, completed: true }
      ],
      totalQuantity: 7.5,
      overallGoodRice: 94.4,
      overallRejection: 4.1,
      overallForeignMatter: 0.3
    },
    {
      id: "IND002",
      name: "Individual Session #002",
      date: "2024-12-20",
      sessionType: "individual",
      variety: "JASMINE",
      process: "Parboiled",
      samples: [
        { sampleNumber: 1, weight: "2.1", goodRice: 92.5, rejection: 5.2, foreignMatter: 0.5, completed: true },
        { sampleNumber: 2, weight: "2.4", goodRice: 91.8, rejection: 5.8, foreignMatter: 0.6, completed: true },
        { sampleNumber: 3, weight: "2.2", goodRice: 93.2, rejection: 4.9, foreignMatter: 0.4, completed: true }
      ],
      totalQuantity: 6.7,
      overallGoodRice: 92.5,
      overallRejection: 5.3,
      overallForeignMatter: 0.5
    }
  ];

  // Sample data for batch sessions
  const batchSessions: ProcessData[] = [
    {
      id: "BAT001",
      name: "Batch #2024-001",
      date: "2024-10-25",
      sessionType: "batch",
      variety: "BASMATI",
      process: "Raw",
      samples: [
        { sampleNumber: 1, weight: "5.0", goodRice: 95.1, rejection: 3.2, foreignMatter: 0.1, completed: true },
        { sampleNumber: 2, weight: "4.8", goodRice: 94.8, rejection: 3.5, foreignMatter: 0.2, completed: true },
        { sampleNumber: 3, weight: "5.2", goodRice: 95.4, rejection: 2.9, foreignMatter: 0.1, completed: true }
      ],
      totalQuantity: 15.0,
      overallGoodRice: 95.1,
      overallRejection: 3.2,
      overallForeignMatter: 0.1
    },
    {
      id: "BAT002",
      name: "Batch #2024-002",
      date: "2024-12-08",
      sessionType: "batch",
      variety: "LONG_GRAIN",
      process: "Parboiled",
      samples: [
        { sampleNumber: 1, weight: "4.9", goodRice: 93.7, rejection: 4.8, foreignMatter: 0.4, completed: true },
        { sampleNumber: 2, weight: "5.1", goodRice: 93.2, rejection: 5.1, foreignMatter: 0.5, completed: true },
        { sampleNumber: 3, weight: "4.7", goodRice: 94.1, rejection: 4.5, foreignMatter: 0.3, completed: true }
      ],
      totalQuantity: 14.7,
      overallGoodRice: 93.7,
      overallRejection: 4.8,
      overallForeignMatter: 0.4
    }
  ];

  // Sample data for machine wise sessions
  const machineWiseSessions: ProcessData[] = [
    {
      id: "MAC001",
      name: "Stone Sort I",
      date: "2025-01-10",
      sessionType: "machine",
      variety: "BASMATI",
      process: "Raw",
      samples: [
        { sampleNumber: 1, weight: "3.2", goodRice: 94.2, rejection: 3.8, foreignMatter: 0.2, completed: true },
        { sampleNumber: 2, weight: "3.0", goodRice: 93.8, rejection: 4.1, foreignMatter: 0.3, completed: true },
        { sampleNumber: 3, weight: "3.4", goodRice: 94.6, rejection: 3.5, foreignMatter: 0.2, completed: true }
      ],
      totalQuantity: 9.6,
      overallGoodRice: 94.2,
      overallRejection: 3.8,
      overallForeignMatter: 0.2
    },
    {
      id: "MAC002",
      name: "Paddy Sort I",
      date: "2025-02-05",
      sessionType: "machine",
      variety: "JASMINE",
      process: "Parboiled",
      samples: [
        { sampleNumber: 1, weight: "2.8", goodRice: 91.9, rejection: 6.2, foreignMatter: 0.7, completed: true },
        { sampleNumber: 2, weight: "3.1", goodRice: 92.3, rejection: 5.9, foreignMatter: 0.6, completed: true },
        { sampleNumber: 3, weight: "2.9", goodRice: 91.5, rejection: 6.5, foreignMatter: 0.8, completed: true }
      ],
      totalQuantity: 8.8,
      overallGoodRice: 91.9,
      overallRejection: 6.2,
      overallForeignMatter: 0.7
    }
  ];

  // Sample data for TAM sessions
  const tamSessions: ProcessData[] = [
    {
      id: "TAM001",
      name: "TAM Analysis - Complete Mill Run",
      date: "2025-01-22",
      sessionType: "tam",
      variety: "BASMATI",
      process: "Raw",
      samples: [
        { sampleNumber: 1, weight: "10.0", goodRice: 96.3, rejection: 2.9, foreignMatter: 0.2, completed: true },
        { sampleNumber: 2, weight: "9.8", goodRice: 95.9, rejection: 3.2, foreignMatter: 0.3, completed: true },
        { sampleNumber: 3, weight: "10.2", goodRice: 96.7, rejection: 2.6, foreignMatter: 0.1, completed: true }
      ],
      totalQuantity: 30.0,
      overallGoodRice: 96.3,
      overallRejection: 2.9,
      overallForeignMatter: 0.2
    },
    {
      id: "TAM002",
      name: "TAM Analysis - Multi-Machine Setup",
      date: "2025-03-12",
      sessionType: "tam",
      variety: "LONG_GRAIN",
      process: "Parboiled",
      samples: [
        { sampleNumber: 1, weight: "9.5", goodRice: 92.4, rejection: 5.5, foreignMatter: 0.6, completed: true },
        { sampleNumber: 2, weight: "10.1", goodRice: 92.8, rejection: 5.2, foreignMatter: 0.5, completed: true },
        { sampleNumber: 3, weight: "9.7", goodRice: 92.1, rejection: 5.8, foreignMatter: 0.7, completed: true }
      ],
      totalQuantity: 29.3,
      overallGoodRice: 92.4,
      overallRejection: 5.5,
      overallForeignMatter: 0.6
    }
  ];

  // Filter processes based on selected date range
  const getFilteredProcesses = () => {
    let processes: ProcessData[] = [];
    
    switch (reportType) {
      case "individual":
        processes = individualSessions;
        break;
      case "batch":
        processes = batchSessions;
        break;
      case "machine":
        processes = machineWiseSessions;
        break;
      case "tam":
        processes = tamSessions;
        break;
      default:
        processes = individualSessions;
    }
    
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
    
    // Create a dummy PDF download based on report type
    let pdfFileName = "";
    switch (reportType) {
      case "individual":
        pdfFileName = "individual_session_report.pdf";
        break;
      case "batch":
        pdfFileName = "batch_analysis_report.pdf";
        break;
      case "machine":
        pdfFileName = "machine_analysis_report.pdf";
        break;
      case "tam":
        pdfFileName = "tam_analysis_report.pdf";
        break;
      default:
        pdfFileName = "analysis_report.pdf";
    }
    
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

  const getReportTypeConfig = (type: string) => {
    switch (type) {
      case "individual":
        return { icon: User, label: "Individual Sessions", description: "Single session analysis reports", color: "text-purple-600" };
      case "batch":
        return { icon: Package, label: "Batch Sessions", description: "Batch-wise analysis reports", color: "text-green-600" };
      case "machine":
        return { icon: Factory, label: "Machine Wise Sessions", description: "Individual machine line reports", color: "text-blue-600" };
      case "tam":
        return { icon: Microscope, label: "TAM Sessions", description: "Total Mill Analyser reports", color: "text-orange-600" };
      default:
        return { icon: User, label: "Individual Sessions", description: "Single session analysis reports", color: "text-purple-600" };
    }
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
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="cursor-pointer flex items-center space-x-3 flex-1">
                        <User className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-semibold">Individual Sessions</div>
                          <div className="text-sm text-gray-600">Single session analysis reports</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="batch" id="batch" />
                      <Label htmlFor="batch" className="cursor-pointer flex items-center space-x-3 flex-1">
                        <Package className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Batch Sessions</div>
                          <div className="text-sm text-gray-600">Batch-wise analysis reports</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="machine" id="machine" />
                      <Label htmlFor="machine" className="cursor-pointer flex items-center space-x-3 flex-1">
                        <Factory className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">Machine Wise Sessions</div>
                          <div className="text-sm text-gray-600">Individual machine line reports</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="tam" id="tam" />
                      <Label htmlFor="tam" className="cursor-pointer flex items-center space-x-3 flex-1">
                        <Microscope className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="font-semibold">TAM Sessions</div>
                          <div className="text-sm text-gray-600">Total Mill Analyser reports</div>
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
                {(() => {
                  const config = getReportTypeConfig(reportType);
                  const IconComponent = config.icon;
                  return (
                    <>
                      <IconComponent className="w-6 h-6" />
                      <span>{config.label}</span>
                    </>
                  );
                })()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentProcesses.map((process) => {
                  const qualityInfo = getQualityStatus(process.overallGoodRice);
                  return (
                    <div key={process.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col space-y-4">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-xl">{process.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${qualityInfo.color} bg-gray-100`}>
                                {qualityInfo.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span>Date: {format(new Date(process.date), "PPP")}</span>
                              <span>Variety: {process.variety}</span>
                              <span>Process: {process.process}</span>
                              <span>Total Weight: {process.totalQuantity}kg</span>
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

                        {/* Overall Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-green-600 font-semibold">Overall Good Rice</div>
                            <div className="text-2xl font-bold text-green-700">{process.overallGoodRice.toFixed(1)}%</div>
                          </div>
                          <div className="bg-red-50 p-4 rounded-lg">
                            <div className="text-red-600 font-semibold">Overall Rejection</div>
                            <div className="text-2xl font-bold text-red-700">{process.overallRejection.toFixed(1)}%</div>
                          </div>
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="text-yellow-600 font-semibold">Overall Foreign Matter</div>
                            <div className="text-2xl font-bold text-yellow-700">{process.overallForeignMatter.toFixed(1)}%</div>
                          </div>
                        </div>

                        {/* Sample Details */}
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-lg mb-3 text-gray-800">Sample Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {process.samples.map((sample) => (
                              <div key={sample.sampleNumber} className="bg-gray-50 p-4 rounded-lg border">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-semibold text-rice-primary">Sample {sample.sampleNumber}</h5>
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    {sample.weight}kg
                                  </span>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Good Rice:</span>
                                    <span className="font-semibold text-green-600">{sample.goodRice.toFixed(1)}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Rejection:</span>
                                    <span className="font-semibold text-red-600">{sample.rejection.toFixed(1)}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Foreign Matter:</span>
                                    <span className="font-semibold text-yellow-600">{sample.foreignMatter.toFixed(1)}%</span>
                                  </div>
                                </div>

                                {/* Sample Progress Bars */}
                                <div className="mt-3 space-y-1">
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${sample.goodRice}%` }}
                                    ></div>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${sample.rejection}%` }}
                                    ></div>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${sample.foreignMatter * 10}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {currentProcesses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {fromDate && toDate 
                    ? `No ${getReportTypeConfig(reportType).label.toLowerCase()} found for the selected date range (${format(fromDate, "MMM dd, yyyy")} - ${format(toDate, "MMM dd, yyyy")}).`
                    : `No ${getReportTypeConfig(reportType).label.toLowerCase()} available. Select a date range to view sessions.`
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
