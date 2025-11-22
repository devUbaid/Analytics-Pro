"use client"

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Cloud, Newspaper, History, X, Film, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserDashboardProps {
  searchHistory: {
    stocks: string[];
    weather: string[];
    news: string[];
    movies: string[];
  };
  onSectionChange?: (section: 'stocks' | 'weather' | 'news' | 'movies' | 'dashboard') => void;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
}

export function UserDashboard({ searchHistory, onSectionChange }: UserDashboardProps) {
  const router = useRouter();
  const [stockData, setStockData] = useState<StockData[]>([
    { symbol: 'AAPL', price: 0, change: 0 },
    { symbol: 'GOOGL', price: 0, change: 0 },
    { symbol: 'MSFT', price: 0, change: 0 }
  ]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Fetch stock data for watchlist
    stockData.forEach(async (stock) => {
      try {
        const response = await fetch(`/api/stocks/timeseries?symbol=${stock.symbol}`);
        const data = await response.json();
        if (data && data.length > 1) {
          const latestPrice = data[0].close;
          const previousPrice = data[1].close;
          const change = ((latestPrice - previousPrice) / previousPrice) * 100;
          
          setStockData(prev => prev.map(s => 
            s.symbol === stock.symbol 
              ? { ...s, price: latestPrice, change } 
              : s
          ));
        }
      } catch (error) {
        console.error(`Error fetching ${stock.symbol} data:`, error);
      }
    });

    // Fetch weather for user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          if (data && data.list && data.list[0]) {
            setWeatherData({
              city: data.city.name,
              temp: data.list[0].temp,
              condition: data.list[0].weather.main
            });
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    }
  }, []);

  const clearHistory = (section: string) => {
    const currentHistory = JSON.parse(localStorage.getItem('searchHistory') || '{}');
    currentHistory[section] = [];
    localStorage.setItem('searchHistory', JSON.stringify(currentHistory));
    window.location.reload();
  };

  const sections = [
    {
      title: 'Recent Stock Searches',
      icon: <LineChart className="h-5 w-5" />,
      data: searchHistory.stocks,
      section: 'stocks'
    },
    {
      title: 'Recent Weather Searches',
      icon: <Cloud className="h-5 w-5" />,
      data: searchHistory.weather,
      section: 'weather'
    },
    {
      title: 'Recent News Searches',
      icon: <Newspaper className="h-5 w-5" />,
      data: searchHistory.news,
      section: 'news'
    },
    {
      title: 'Recent Movie Searches',
      icon: <Film className="h-5 w-5" />,
      data: searchHistory.movies,
      section: 'movies'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Stock Watchlist */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Stock Watchlist
            </h3>
          </div>
          <div className="space-y-4">
            {stockData.map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center">
                <span className="font-medium">{stock.symbol}</span>
                <div className="flex items-center gap-2">
                  <span>${stock.price.toFixed(2)}</span>
                  <span className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {Math.abs(stock.change).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weather Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Current Weather
            </h3>
          </div>
          {weatherData ? (
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">{weatherData.city}</h4>
              <p className="text-3xl font-bold mb-2">{Math.round(weatherData.temp)}°C</p>
              <p className="text-muted-foreground">{weatherData.condition}</p>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Loading weather data...</p>
          )}
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearHistory(section.section)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {section.data && section.data.length > 0 ? (
                <ul className="space-y-2">
                  {section.data.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <History className="h-4 w-4" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No recent searches</p>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Button
              onClick={() => onSectionChange ? onSectionChange('stocks') : router.push('/dashboard?section=stocks')}
              className="flex items-center gap-2"
            >
              <LineChart className="h-5 w-5" />
              View Stocks
            </Button>
            <Button
              onClick={() => onSectionChange ? onSectionChange('weather') : router.push('/dashboard?section=weather')}
              className="flex items-center gap-2"
            >
              <Cloud className="h-5 w-5" />
              Check Weather
            </Button>
            <Button
              onClick={() => onSectionChange ? onSectionChange('news') : router.push('/dashboard?section=news')}
              className="flex items-center gap-2"
            >
              <Newspaper className="h-5 w-5" />
              Read News
            </Button>
            <Button
              onClick={() => onSectionChange ? onSectionChange('movies') : router.push('/dashboard?section=movies')}
              className="flex items-center gap-2"
            >
              <Film className="h-5 w-5" />
              Browse Movies
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}