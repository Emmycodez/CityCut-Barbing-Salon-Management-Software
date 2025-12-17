"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Repeat, Award } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function DetailedReports() {
  // Mock data for charts
  const revenueByService = [
    { service: "Haircut", amount: 4500, count: 150 },
    { service: "Haircut & Beard", amount: 3800, count: 85 },
    { service: "Beard Trim", amount: 2400, count: 96 },
    { service: "Hot Shave", amount: 1750, count: 50 },
  ]

  const monthlyTrends = [
    { month: "Jul", revenue: 8500, expenses: 3200, profit: 5300, customers: 120 },
    { month: "Aug", revenue: 9200, expenses: 3400, profit: 5800, customers: 128 },
    { month: "Sep", revenue: 10100, expenses: 3600, profit: 6500, customers: 135 },
    { month: "Oct", revenue: 11300, expenses: 3800, profit: 7500, customers: 145 },
    { month: "Nov", revenue: 11800, expenses: 4000, profit: 7800, customers: 152 },
    { month: "Dec", revenue: 12450, expenses: 4200, profit: 8250, customers: 156 },
  ]

  const paymentMethods = [
    { method: "Cash", amount: 5600, percentage: 45 },
    { method: "Card", amount: 5200, percentage: 42 },
    { method: "Mobile", amount: 1650, percentage: 13 },
  ]

  // Key metrics calculations
  const totalRevenue = 12450
  const totalExpenses = 4200
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1)
  const customerRetention = 87.5
  const avgCustomerValue = 79.81
  const growthRate = 12.5

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Detailed Reports</h2>
        <p className="text-muted-foreground">Comprehensive analytics and business insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-bold text-foreground">${netProfit.toLocaleString()}</span>
              <p className="text-xs text-muted-foreground">Profit Margin: {profitMargin}%</p>
              <div className="flex items-center gap-1 text-accent text-sm mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+{growthRate}% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Repeat className="w-4 h-4" />
              Customer Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-bold text-foreground">{customerRetention}%</span>
              <p className="text-xs text-muted-foreground">Returning customers</p>
              <div className="flex items-center gap-1 text-accent text-sm mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+3.2% improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              Avg Customer Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-bold text-foreground">${avgCustomerValue}</span>
              <p className="text-xs text-muted-foreground">Per customer</p>
              <div className="flex items-center gap-1 text-accent text-sm mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+$5.20 from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Monthly Financial Trends</CardTitle>
            <CardDescription>Revenue, expenses, and profit over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
                profit: { label: "Profit", color: "hsl(var(--chart-3))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="hsl(var(--accent))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>Total customers over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                customers: { label: "Customers", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="customers" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Service Performance */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Revenue by Service Type</CardTitle>
          <CardDescription>Performance breakdown of different services</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amount: { label: "Revenue", color: "hsl(var(--chart-1))" },
              count: { label: "Count", color: "hsl(var(--chart-2))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByService}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="service" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Payment Method Distribution</CardTitle>
          <CardDescription>How customers prefer to pay</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.method}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">${item.amount.toLocaleString()}</span>
                    <span className="text-muted-foreground">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Health Summary */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Business Health Summary</CardTitle>
          <CardDescription>Overall performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Total Revenue (Dec)</span>
                <span className="font-semibold text-foreground">${totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Total Expenses (Dec)</span>
                <span className="font-semibold text-destructive">${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/30">
                <span className="text-sm font-medium text-foreground">Net Profit (Dec)</span>
                <span className="font-bold text-lg text-accent">${netProfit.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-semibold text-accent flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />+{growthRate}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Customer Retention</span>
                <span className="font-semibold text-accent">{customerRetention}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <span className="font-semibold text-accent">{profitMargin}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
