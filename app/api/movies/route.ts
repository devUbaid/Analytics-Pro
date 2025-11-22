import { NextResponse } from 'next/server'
import { API_KEYS, API_ENDPOINTS } from '@/lib/api-config'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'popular'
    const query = searchParams.get('query')
    const page = searchParams.get('page') || '1'

    let endpoint = query
      ? `${API_ENDPOINTS.TMDB}/search/movie`
      : `${API_ENDPOINTS.TMDB}/movie/${category}`

    const params = new URLSearchParams()
    if (query) params.set('query', query)
    params.set('page', page)

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${API_KEYS.TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Movies API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    )
  }
}