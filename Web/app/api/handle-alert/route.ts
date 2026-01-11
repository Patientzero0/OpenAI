import { NextRequest, NextResponse } from 'next/server';
import { getBackendUrl } from '@/lib/api-config';

/**
 * Proxy endpoint for handling alerts
 * Forwards requests to the backend API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/api/handle-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to handle alert' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error handling alert:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
