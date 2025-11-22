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
      `${API_ENDPOINTS.ALPHA_VANTAGE}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEYS.ALPHA_VANTAGE}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    const data = await response.json()

    if (data['Error Message']) {
      return NextResponse.json(
        { error: data['Error Message'] },
        { status: 400 }
      )
    }

    const timeSeriesData = data['Time Series (Daily)']
    if (!timeSeriesData) {
      return NextResponse.json(
        { error: 'No data available for this symbol' },
        { status: 404 }
      )
    }

    const formattedData = Object.entries(timeSeriesData)
      .slice(0, 30) // Get last 30 days
      .map(([date, values]: [string, any]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume']),
      }))
      .reverse()

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Stock API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}