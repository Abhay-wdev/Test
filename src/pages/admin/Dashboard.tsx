
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
} from "recharts";
import { CalendarIcon } from "lucide-react";
import { format, parseISO, getWeek, getYear } from "date-fns";
import { useOrdersAnalytics } from "@/hooks/useOrders";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [customDateFrom, setCustomDateFrom] = useState<Date>();
  const [customDateTo, setCustomDateTo] = useState<Date>();
  
  const { data: ordersData = [], isLoading } = useOrdersAnalytics();

  // Process orders data for analytics
  const processedData = useMemo(() => {
    if (!ordersData || ordersData.length === 0) {
      return {
        dailyData: [],
        weeklyData: [],
        monthlyData: [],
        recentOrders: []
      };
    }

    // Group orders by date for daily data
    const dailyMap = new Map();

    ordersData.forEach(order => {
      const date = format(parseISO(order.created_at), 'yyyy-MM-dd');
      
      // Daily data
      if (!dailyMap.has(date)) {
        dailyMap.set(date, { date, revenue: 0, orders: 0 });
      }
      const dailyEntry = dailyMap.get(date);
      dailyEntry.revenue += Number(order.total_price);
      dailyEntry.orders += 1;
    });

    const dailyData = Array.from(dailyMap.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Generate weekly data from daily data
    const weeklyData = [];
    const weekMap = new Map();
    dailyData.forEach(day => {
      const dayDate = new Date(day.date);
      const year = getYear(dayDate);
      const week = getWeek(dayDate);
      const weekKey = `${year}-W${week}`;
      
      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, { 
          week: `Week ${week}`, 
          revenue: 0, 
          orders: 0 
        });
      }
      const weekEntry = weekMap.get(weekKey);
      weekEntry.revenue += day.revenue;
      weekEntry.orders += day.orders;
    });
    weeklyData.push(...Array.from(weekMap.values()));

    // Generate monthly data from daily data
    const monthlyData = [];
    const monthMap = new Map();
    dailyData.forEach(day => {
      const month = format(parseISO(day.date), 'MMM yyyy');
      if (!monthMap.has(month)) {
        monthMap.set(month, { month: format(parseISO(day.date), 'MMM'), revenue: 0, orders: 0 });
      }
      const monthEntry = monthMap.get(month);
      monthEntry.revenue += day.revenue;
      monthEntry.orders += day.orders;
    });
    monthlyData.push(...Array.from(monthMap.values()));

    return {
      dailyData,
      weeklyData,
      monthlyData,
      recentOrders: ordersData.slice(0, 5)
    };
  }, [ordersData]);

  // Get current sales data based on selected range
  const getCurrentSalesData = () => {
    switch (dateRange) {
      case "daily":
        return processedData.dailyData;
      case "weekly":
        return processedData.weeklyData;
      case "monthly":
        return processedData.monthlyData;
      case "custom":
        // Filter daily data by custom dates if provided
        if (customDateFrom && customDateTo) {
          return processedData.dailyData.filter(item => {
            const itemDate = parseISO(item.date);
            return itemDate >= customDateFrom && itemDate <= customDateTo;
          });
        }
        return processedData.dailyData;
      default:
        return processedData.dailyData;
    }
  };

  // Calculate summary metrics
  const currentData = getCurrentSalesData();
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + (item.orders || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Chart configuration
  const chartConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#8B5CF6",
        dark: "#A78BFA",
      },
    },
    orders: {
      label: "Orders",
      theme: {
        light: "#F97316",
        dark: "#FB923C",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-spice-earth">Sales Dashboard</h1>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-spice-earth">Sales Dashboard</h1>
        <p className="text-muted-foreground">Overview of store performance and sales analytics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            {totalRevenue === 0 && (
              <div className="text-xs text-muted-foreground mt-1">No sales data available</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            {totalOrders === 0 && (
              <div className="text-xs text-muted-foreground mt-1">No orders yet</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            {averageOrderValue === 0 && (
              <div className="text-xs text-muted-foreground mt-1">No orders to calculate</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart - Made Smaller */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Revenue Trend</CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <Button
                variant={dateRange === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange("daily")}
              >
                Daily
              </Button>
              <Button
                variant={dateRange === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={dateRange === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange("monthly")}
              >
                Monthly
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={dateRange === "custom" ? "default" : "outline"}
                    size="sm"
                    className="w-auto"
                  >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Custom
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium">From Date</label>
                      <Calendar
                        mode="single"
                        selected={customDateFrom}
                        onSelect={(date) => {
                          setCustomDateFrom(date);
                          setDateRange("custom");
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">To Date</label>
                      <Calendar
                        mode="single"
                        selected={customDateTo}
                        onSelect={(date) => {
                          setCustomDateTo(date);
                          setDateRange("custom");
                        }}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {dateRange === "custom" && customDateFrom && customDateTo && (
            <p className="text-sm text-muted-foreground">
              {format(customDateFrom, "MMM dd")} - {format(customDateTo, "MMM dd, yyyy")}
            </p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {currentData.length > 0 ? (
            <ChartContainer config={chartConfig} className="aspect-[2/1] h-64">
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={dateRange === "monthly" ? "month" : dateRange === "weekly" ? "week" : "date"} 
                  tickFormatter={(value) => {
                    if (dateRange === "daily") {
                      return format(new Date(value), "MM/dd");
                    }
                    return value;
                  }}
                />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => {
                    if (dateRange === "daily") {
                      return format(new Date(value), "MMM dd, yyyy");
                    }
                    return value;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue" 
                  stroke="var(--color-revenue)" 
                  fill="var(--color-revenue)" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium">No sales data available</p>
                <p className="text-sm">Sales will appear here once orders are placed</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <p className="text-sm text-muted-foreground">Latest customer orders and details</p>
        </CardHeader>
        <CardContent>
          {processedData.recentOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{format(parseISO(order.created_at), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{order.order_items?.length || 0} items</TableCell>
                    <TableCell>₹{Number(order.total_price).toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${order.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "processing" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-sm">Orders will appear here once customers start purchasing</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
