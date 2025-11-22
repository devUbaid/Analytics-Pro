"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Search, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StockData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface CompanyOverview {
  Symbol: string
  Name: string
  Description: string
  MarketCapitalization: string
  PERatio: string
  DividendYield: string
  Industry: string
  Exchange: string
}

interface StockSectionProps {
  onSearch: (query: string) => void;
}

export function StockSection({ onSearch }: StockSectionProps) {
  // Use the onSearch prop as needed
  const [symbol, setSymbol] = useState("AAPL")
  const [stockData, setStockData] = useState<StockData[]>([])
  const [overview, setOverview] = useState<CompanyOverview | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chartType, setChartType] = useState("line")

  const fetchStockData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch time series data
      const timeSeriesResponse = await fetch(`/api/stocks/timeseries?symbol=${symbol}`)
      if (!timeSeriesResponse.ok) throw new Error("Failed to fetch stock data")
      const timeSeriesData = await timeSeriesResponse.json()

      // Fetch company overview
      const overviewResponse = await fetch(`/api/stocks/overview?symbol=${symbol}`)
      if (!overviewResponse.ok) throw new Error("Failed to fetch company overview")
      const overviewData = await overviewResponse.json()

      setStockData(timeSeriesData)
      setOverview(overviewData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStockData()
  }, [symbol])

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        {chartType === "area" ? (
          <AreaChart data={stockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="close"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.3}
            />
          </AreaChart>
        ) : chartType === "bar" ? (
          <BarChart data={stockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar
              dataKey="close"
              fill="hsl(var(--chart-1))"
            />
          </BarChart>
        ) : (
          <LineChart data={stockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="close"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.3}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    );
  };

  const priceChange = stockData.length > 1 
    ? stockData[0].close - stockData[1].close 
    : 0
  const priceChangePercent = stockData.length > 1
    ? ((priceChange / stockData[1].close) * 100).toFixed(2)
    : "0.00"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter stock symbol..."
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="pl-9"
          />
        </div>
        <Button onClick={fetchStockData}>
          <TrendingUp className="mr-2 h-4 w-4" />
          Fetch Data
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[100px]" />
            ))}
          </div>
        </div>
      ) : error ? (
        <Card className="p-6 text-center text-destructive">
          <p>{error}</p>
          <Button onClick={fetchStockData} className="mt-4">
            Retry
          </Button>
        </Card>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {overview && (
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{overview.Name} ({overview.Symbol})</h2>
                    <p className="text-muted-foreground">{overview.Exchange}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${stockData[0]?.close.toFixed(2)}
                    </div>
                    <div className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {priceChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      <span>{priceChangePercent}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{overview.Description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Market Cap</h3>
                    <p className="text-2xl font-bold">${(parseInt(overview.MarketCapitalization) / 1e9).toFixed(2)}B</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">P/E Ratio</h3>
                    <p className="text-2xl font-bold">{overview.PERatio}</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Dividend Yield</h3>
                    <p className="text-2xl font-bold">{overview.DividendYield}%</p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                    <p className="text-2xl font-bold">{overview.Industry}</p>
                  </Card>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <Tabs defaultValue="line" className="mb-6">
                <TabsList>
                  <TabsTrigger value="line" onClick={() => setChartType("line")}>Line</TabsTrigger>
                  <TabsTrigger value="area" onClick={() => setChartType("area")}>Area</TabsTrigger>
                  <TabsTrigger value="bar" onClick={() => setChartType("bar")}>Bar</TabsTrigger>
                </TabsList>
              </Tabs>
              {renderChart()}
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}