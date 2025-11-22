"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface MovieCardProps {
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  index: number
}

export function MovieCard({
  title,
  overview,
  poster_path,
  release_date,
  vote_average,
  index,
}: MovieCardProps) {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-[400px] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {vote_average.toFixed(1)}
          </Badge>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 hover:text-primary">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
            {overview}
          </p>
          <div className="flex items-center text-sm text-muted-foreground mt-auto">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(release_date).toLocaleDateString()}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}