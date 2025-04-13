import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  if (hostname === 'tools.meric.rocks') {
    const url = request.nextUrl.clone();
    if (url.pathname === '/') {
      url.pathname = '/tools';
      return NextResponse.rewrite(url);
    }
    
    if (!url.pathname.startsWith('/tools')) {
      const newPath = `/tools${url.pathname}`;
      url.pathname = newPath;
      return NextResponse.rewrite(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};