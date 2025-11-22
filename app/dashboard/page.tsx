"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card } from '@/components/ui/card';
import { NewsSection } from '@/components/news/news-section';
import { StockSection } from '@/components/stocks/stock-section';
import { WeatherSection } from '@/components/weather/weather-section';
import { MovieSection } from '@/components/movies/movie-section';
import { UserDashboard } from '@/components/user/user-dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  LineChart, 
  Cloud, 
  Newspaper,
  Menu,
  User,
  Film
} from 'lucide-react';

// Define a type for the keys of searchHistory
type SectionType = 'stocks' | 'weather' | 'news' | 'movies';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionType | 'dashboard'>('dashboard');
  const [searchHistory, setSearchHistory] = useState<Record<SectionType, string[]>>({
    stocks: [],
    weather: [],
    news: [],
    movies: []
  });

  // Read section from URL params on mount
  useEffect(() => {
    const section = searchParams.get('section') as SectionType | 'dashboard' | null;
    if (section && (section === 'dashboard' || section === 'stocks' || section === 'weather' || section === 'news' || section === 'movies')) {
      setActiveSection(section);
    }
  }, [searchParams]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Update URL when section changes
  const handleSectionChange = (section: SectionType | 'dashboard') => {
    setActiveSection(section);
    const params = new URLSearchParams(searchParams.toString());
    if (section === 'dashboard') {
      params.delete('section');
      const newUrl = params.toString() ? `/dashboard?${params.toString()}` : '/dashboard';
      router.replace(newUrl);
    } else {
      params.set('section', section);
      router.replace(`/dashboard?${params.toString()}`);
    }
  };

  function updateHistory(section: SectionType, query: string, prev: Record<SectionType, string[]>) {
    const newHistory = {
      ...prev,
      [section]: [query, ...prev[section].filter(item => item !== query)].slice(0, 5)
    };
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    return newHistory;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex relative">
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
            fixed lg:static top-[3.5rem] bottom-0 w-64 transition-transform duration-300 
            border-r bg-background z-40 lg:z-0
          `}
        >
          <nav className="space-y-2 p-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleSectionChange('dashboard');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent ${
                activeSection === 'dashboard' ? 'bg-accent' : ''
              }`}
            >
              <User className="h-5 w-5" />
              <span>Dashboard</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleSectionChange('stocks');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent ${
                activeSection === 'stocks' ? 'bg-accent' : ''
              }`}
            >
              <LineChart className="h-5 w-5" />
              <span>Stocks</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleSectionChange('weather');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent ${
                activeSection === 'weather' ? 'bg-accent' : ''
              }`}
            >
              <Cloud className="h-5 w-5" />
              <span>Weather</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleSectionChange('news');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent ${
                activeSection === 'news' ? 'bg-accent' : ''
              }`}
            >
              <Newspaper className="h-5 w-5" />
              <span>News</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleSectionChange('movies');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent ${
                activeSection === 'movies' ? 'bg-accent' : ''
              }`}
            >
              <Film className="h-5 w-5" />
              <span>Movies</span>
            </motion.button>
          </nav>
        </aside>

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'dashboard' && (
                <UserDashboard 
                  searchHistory={searchHistory} 
                  onSectionChange={handleSectionChange}
                />
              )}
              {activeSection === 'news' && (
                <NewsSection onSearch={(query) => setSearchHistory(prev => updateHistory('news', query, prev))} />
              )}
              {activeSection === 'stocks' && (
                <StockSection onSearch={(query) => setSearchHistory(prev => updateHistory('stocks', query, prev))} />
              )}
              {activeSection === 'weather' && (
                <WeatherSection onSearch={(query) => setSearchHistory(prev => updateHistory('weather', query, prev))} />
              )}
              {activeSection === 'movies' && (
                <MovieSection onSearch={(query) => setSearchHistory(prev => updateHistory('movies', query, prev))} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}