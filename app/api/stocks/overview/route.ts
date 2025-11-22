import { NextResponse } from 'next/server'
import { API_KEYS, API_ENDPOINTS } from '@/lib/api-config'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')

    if (!symbol) {
      return NextResponse.json(
        { error: 'Stock symbol is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${API_ENDPOINTS.ALPHA_VANTAGE}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEYS.ALPHA_VANTAGE}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    const data = await response.json()

    if (data['Error Message']) {
      return NextResponse.json(
        { error: data['Error Message'] },
        { status: 400 }
      )
    }

    if (!data.Symbol) {
      return NextResponse.json(
        { error: 'No data available for this symbol' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Stock API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}