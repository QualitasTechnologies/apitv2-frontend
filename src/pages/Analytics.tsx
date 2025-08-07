import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  CalendarIcon, 
  LineChart as LineChartIcon, 
  BarChart3, 
  PieChart as PieChartIcon,
  Settings,
  Check,
  ChevronsUpDown
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Type definitions
interface DateRange {
  from?: Date;
  to?: Date;
}

interface AnalyticsFilters {
  dateRange: DateRange;
  viewMode: 'machine-wise' | 'batch-wise';
  selectedMachine?: string;
  chartType: 'bar' | 'pie' | 'line';
  selectedCategories: string[];
}

const Analytics = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      from: new Date(2024, 0, 1), // January 1, 2024
      to: new Date(2024, 5, 30)   // June 30, 2024
    },
    viewMode: 'machine-wise',
    selectedMachine: 'polisher',
    chartType: 'bar',
    selectedCategories: ['accepted', 'rejected']
  });

  const [datePickerOpen, setDatePickerOpen] = useState({ from: false, to: false });
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Machine options
  const machineOptions = [
    { value: 'polisher', label: 'Polisher' },
    { value: 'whitener', label: 'Whitener' },
    { value: 'destoner', label: 'Destoner' },
    { value: 'sorter', label: 'Sorter' },
    { value: 'husk-separator', label: 'Husk Separator' },
    { value: 'sifter', label: 'Sifter' }
  ];

  // Category options
  const categoryOptions = [
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'brokens', label: 'Brokens' },
    { value: 'chalky', label: 'Chalky' },
    { value: 'moisture', label: 'Moisture' },
    { value: 'weight', label: 'Weight' },
    { value: 'variety', label: 'Variety' }
  ];

  // Sample data - this would come from your API based on filters
  const generateSampleData = () => {
    const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'];
    return months.map(month => ({
      date: month,
      accepted: Math.floor(Math.random() * 30) + 70, // 70-100%
      rejected: Math.floor(Math.random() * 15) + 5,  // 5-20%
      brokens: Math.floor(Math.random() * 10) + 5,   // 5-15%
      chalky: Math.floor(Math.random() * 8) + 2,     // 2-10%
      moisture: Math.floor(Math.random() * 5) + 10,  // 10-15%
      weight: Math.floor(Math.random() * 100) + 400, // 400-500kg
      variety: Math.floor(Math.random() * 3) + 1     // 1-4 varieties
    }));
  };

  const [chartData, setChartData] = useState(generateSampleData());

  // Colors for pie chart
  const pieColors = ['#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  // Update data when filters change
  useEffect(() => {
    // In a real app, you would fetch data based on filters here
    setChartData(generateSampleData());
  }, [filters]);

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }));
  };

  const renderChart = () => {
    const { chartType, selectedCategories } = filters;

    if (chartType === 'pie') {
      // For pie chart, show latest data point
      const latestData = chartData[chartData.length - 1];
      const pieData = selectedCategories.map((category, index) => ({
        name: categoryOptions.find(opt => opt.value === category)?.label || category,
        value: latestData[category as keyof typeof latestData] as number,
        fill: pieColors[index % pieColors.length]
      }));

      return (
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    }

    if (chartType === 'line') {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedCategories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={pieColors[index % pieColors.length]}
              strokeWidth={3}
              dot={{ fill: pieColors[index % pieColors.length], strokeWidth: 2, r: 4 }}
              name={categoryOptions.find(opt => opt.value === category)?.label || category}
              animationDuration={1000}
            />
          ))}
        </LineChart>
      );
    }

    // Default: Bar chart
    return (
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedCategories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={pieColors[index % pieColors.length]}
            name={categoryOptions.find(opt => opt.value === category)?.label || category}
            animationDuration={1000}
          />
        ))}
      </BarChart>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <PageHeader 
        title="Analytics" 
        subtitle="Visual representation of rice quality data with advanced filtering"
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Filters Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-rice-primary">
                <Settings className="w-5 h-5" />
                <span>Filters & Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                
                {/* Date Range Picker */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date From - To</Label>
                  <div className="space-y-2">
                    <Popover open={datePickerOpen.from} onOpenChange={(open) => setDatePickerOpen(prev => ({ ...prev, from: open }))}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filters.dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.from ? format(filters.dateRange.from, "MMM dd, yyyy") : "From date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.from}
                          onSelect={(date) => {
                            setFilters(prev => ({
                              ...prev,
                              dateRange: { ...prev.dateRange, from: date }
                            }));
                            setDatePickerOpen(prev => ({ ...prev, from: false }));
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover open={datePickerOpen.to} onOpenChange={(open) => setDatePickerOpen(prev => ({ ...prev, to: open }))}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filters.dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.to ? format(filters.dateRange.to, "MMM dd, yyyy") : "To date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.to}
                          onSelect={(date) => {
                            setFilters(prev => ({
                              ...prev,
                              dateRange: { ...prev.dateRange, to: date }
                            }));
                            setDatePickerOpen(prev => ({ ...prev, to: false }));
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* View Mode Selector */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">View Mode</Label>
                  <RadioGroup
                    value={filters.viewMode}
                    onValueChange={(value) => setFilters(prev => ({ 
                      ...prev, 
                      viewMode: value as 'machine-wise' | 'batch-wise',
                      selectedMachine: value === 'batch-wise' ? undefined : prev.selectedMachine
                    }))}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="machine-wise" id="machine-wise" />
                      <Label htmlFor="machine-wise" className="text-sm cursor-pointer">Machine-wise</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="batch-wise" id="batch-wise" />
                      <Label htmlFor="batch-wise" className="text-sm cursor-pointer">Batch-wise</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Machine Selector (Conditional) */}
                {filters.viewMode === 'machine-wise' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Machine</Label>
                    <Select
                      value={filters.selectedMachine}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, selectedMachine: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose machine..." />
                      </SelectTrigger>
                      <SelectContent>
                        {machineOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Chart Type Selector */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Chart Type</Label>
                  <ToggleGroup
                    type="single"
                    value={filters.chartType}
                    onValueChange={(value) => value && setFilters(prev => ({ ...prev, chartType: value as any }))}
                    className="grid grid-cols-3 w-full"
                  >
                    <ToggleGroupItem value="bar" aria-label="Bar Chart" className="flex flex-col items-center space-y-1 p-3">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-xs">Bar</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="pie" aria-label="Pie Chart" className="flex flex-col items-center space-y-1 p-3">
                      <PieChartIcon className="w-4 h-4" />
                      <span className="text-xs">Pie</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="line" aria-label="Line Chart" className="flex flex-col items-center space-y-1 p-3">
                      <LineChartIcon className="w-4 h-4" />
                      <span className="text-xs">Line</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Category Selector */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Data for Chart</Label>
                  <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoryOpen}
                        className="w-full justify-between"
                      >
                        {filters.selectedCategories.length > 0
                          ? `${filters.selectedCategories.length} selected`
                          : "Select categories..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandList>
                          <CommandEmpty>No categories found.</CommandEmpty>
                          <CommandGroup>
                            {categoryOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={() => handleCategoryToggle(option.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    filters.selectedCategories.includes(option.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {filters.selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {filters.selectedCategories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground"
                        >
                          {categoryOptions.find(opt => opt.value === category)?.label}
                          <button
                            onClick={() => handleCategoryToggle(category)}
                            className="ml-1 text-primary-foreground hover:text-primary-foreground/80"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Chart Display Area */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="text-rice-primary">
                {filters.viewMode === 'machine-wise' 
                  ? `${machineOptions.find(m => m.value === filters.selectedMachine)?.label || 'Machine'} Analysis`
                  : 'Batch Analysis'
                } - {filters.chartType.charAt(0).toUpperCase() + filters.chartType.slice(1)} Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filters.selectedCategories.length > 0 ? (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Please select at least one category to display the chart</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          {filters.selectedCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filters.selectedCategories.map((category, index) => {
                const values = chartData.map(d => d[category as keyof typeof d] as number);
                const avg = values.reduce((a, b) => a + b, 0) / values.length;
                const max = Math.max(...values);
                const min = Math.min(...values);
                const categoryLabel = categoryOptions.find(opt => opt.value === category)?.label || category;

                return (
                  <Card key={category} className="animate-fade-in">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div 
                          className="w-4 h-4 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: pieColors[index % pieColors.length] }}
                        />
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {categoryLabel}
                        </h3>
                        <div className="mt-4 space-y-2">
                          <div>
                            <span className="text-sm text-gray-600">Average</span>
                            <p className="text-xl font-bold" style={{ color: pieColors[index % pieColors.length] }}>
                              {avg.toFixed(1)}{category === 'weight' ? 'kg' : category === 'variety' ? '' : '%'}
                            </p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Min: {min.toFixed(1)}{category === 'weight' ? 'kg' : category === 'variety' ? '' : '%'}</span>
                            <span>Max: {max.toFixed(1)}{category === 'weight' ? 'kg' : category === 'variety' ? '' : '%'}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
