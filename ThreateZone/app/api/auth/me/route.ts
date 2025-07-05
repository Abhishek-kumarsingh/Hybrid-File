import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/data/mockData';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    try {
      // Decode the mock JWT token
      const payload = JSON.parse(atob(token));

      // Check if token is expired
      if (payload.exp < Date.now()) {
        return NextResponse.json(
          { message: 'Token expired' },
          { status: 401 }
        );
      }

      // Find the user
      const user = mockUsers.find(u => u.id === payload.userId) || {
        id: payload.userId,
        name: payload.role === 'admin' ? 'Admin User' :
              payload.role === 'operator' ? 'Operator User' : 'Analyst User',
        email: payload.email,
        role: payload.role,
        permissions: payload.role === 'admin' ? ['read', 'write', 'delete', 'admin'] :
                     payload.role === 'operator' ? ['read', 'write'] : ['read']
      };

      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      });

    } catch (_error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
