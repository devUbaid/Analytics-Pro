"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ParticlesBackground } from '@/components/particles-background';
import { BarChart3, LineChart, CloudSun, ArrowRight, Shield, Zap, Users, Film } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Stock Analytics",
      description: "Real-time stock market data and comprehensive analysis tools with AI-powered insights",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <CloudSun className="h-8 w-8" />,
      title: "Weather Insights",
      description: "Accurate weather forecasts with detailed meteorological data and predictive analytics",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "News Feed",
      description: "Latest news updates from trusted sources with personalized recommendations",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: <Film className="h-8 w-8" />,
      title: "Movie Discovery",
      description: "Explore trending movies, search by genre, and discover your next favorite film",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized performance with real-time updates and instant notifications",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "50+", label: "Data Sources" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <ParticlesBackground />
      
      {/* Header */}
      <header className="relative z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              AnalyticsPro
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              asChild
              className="hidden sm:flex"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              className="hidden sm:flex"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="text-sm font-medium text-primary">
                🚀 Now with AI-powered insights
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Ultimate{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-cyan-600">
                Analytics
              </span>
              <br />
              Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Unlock powerful insights with real-time data analytics, weather intelligence, 
              curated news, and movie discovery—all in one seamless dashboard experience.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Button
                size="lg"
                asChild
                className="text-lg px-8 py-3 h-auto rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-3 h-auto rounded-2xl border-2"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make data-driven decisions with confidence and precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                
                {/* Gradient overlay effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Analytics Workflow?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams who trust AnalyticsPro for their data-driven decisions.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="text-lg px-8 py-3 h-auto rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-3 h-auto rounded-2xl border-2"
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-muted-foreground mt-6"
            >
              No credit card required • 14-day free trial • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-blue-600 rounded" />
              <span className="text-lg font-bold">AnalyticsPro</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2025 AnalyticsPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}