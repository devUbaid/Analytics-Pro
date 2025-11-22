"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "./movie-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Film } from "lucide-react"
import { MOVIE_CATEGORIES } from "@/lib/api-config"

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

export function MovieSection({ onSearch }: { onSearch: (query: string) => void }) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("popular")
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      
      if (searchQuery) {
        params.append('query', searchQuery)
        onSearch(searchQuery)
      } else {
        params.append('category', selectedCategory)
      }
      
      params.append('page', page.toString())
      
      const response = await fetch(`/api/movies?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch movies')
      
      const data = await response.json()
      
      if (!data.results || data.results.length === 0) {
        setMovies([])
        setError('No movies found.')
        return
      }
      
      setTotalPages(data.total_pages)
      setMovies(page === 1 ? data.results : [...movies, ...data.results])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    fetchMovies()
  }, [selectedCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchMovies()
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
    fetchMovies()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {MOVIE_CATEGORIES.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => {
              setSelectedCategory(category)
              setSearchQuery("")
            }}
          >
            {category.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </Badge>
        ))}
      </div>

      {loading && movies.length === 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-[400px] w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} {...movie} index={index} />
            ))}
          </div>
          {page < totalPages && !loading && (
            <div className="text-center mt-8">
              <Button onClick={loadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}