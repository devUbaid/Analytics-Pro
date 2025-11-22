export const API_KEYS = {
  NEWS_API: '713c1456081242508bc753569797129d',
  ALPHA_VANTAGE: 'RPZP770QBLQI7UU2',
  WEATHER_API: '28f6cf5e3257a0d2b673cd40bcdc5a02',
  TMDB_API: '4dee3e36ed15f3d5f7d0d621c74fc018',
  TMDB_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGVlM2UzNmVkMTVmM2Q1ZjdkMGQ2MjFjNzRmYzAxOCIsIm5iZiI6MTc2MzgxMDExNS43NzMsInN1YiI6IjY5MjE5YjQzMzNkMjg4OWY2YTE4NmE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e7BeugFn_sx2sQeK19balcxRCAcqfIzhRu1wwVZNk4Q'
};

export const API_ENDPOINTS = {
  NEWS_HEADLINES: 'https://newsapi.org/v2/top-headlines',
  NEWS_SOURCES: 'https://newsapi.org/v2/top-headlines/sources',
  ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
  WEATHER: 'https://api.openweathermap.org/data/2.5',
  TMDB: 'https://api.themoviedb.org/3'
};

export const NEWS_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
] as const;

export const NEWS_COUNTRIES = [
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' },
] as const;

export const NEWS_API_PARAMS = {
  SORT_BY: ['publishedAt', 'relevancy', 'popularity'] as const,
  LANGUAGES: ['en', 'es', 'fr', 'de'] as const,
  PAGE_SIZE: 20,
};

export const MOVIE_CATEGORIES = [
  'popular',
  'top_rated',
  'upcoming',
  'now_playing'
] as const;