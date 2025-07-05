import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/data/mockData';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Demo authentication - check against mock users
    const demoCredentials = [
      { email: 'admin@threatzone.com', password: 'admin123', role: 'admin' },
      { email: 'operator@threatzone.com', password: 'operator123', role: 'operator' },
      { email: 'analyst@threatzone.com', password: 'analyst123', role: 'analyst' },
    ];

    const validCredential = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (!validCredential) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Find the corresponding user
    const user = mockUsers.find(u => u.email === email) || {
      id: 'demo-user',
      name: validCredential.role === 'admin' ? 'Admin User' : 
            validCredential.role === 'operator' ? 'Operator User' : 'Analyst User',
      email: email,
      role: validCredential.role as 'admin' | 'operator' | 'analyst',
      permissions: validCredential.role === 'admin' ? ['read', 'write', 'delete', 'admin'] :
                   validCredential.role === 'operator' ? ['read', 'write'] : ['read']
    };

    // Generate a mock JWT token (in production, use a proper JWT library)
    const token = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }));

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
