import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';

const authRoutes = ['/sign-in', '/sign-up'];
const privateRoutes = ['/notes', '/profile'];

enum CookiesKey {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(CookiesKey.accessToken)?.value;
  const refreshToken = cookieStore.get(CookiesKey.refreshToken)?.value;

  const { pathname } = request.nextUrl;

  const checkRoute = (routes: string[], pathname: string) => {
    const isMatch = routes.some((route) => {
      return pathname.startsWith(route);
    });

    return isMatch;
  };

  const isPrivateRoute = checkRoute(privateRoutes, pathname);

  const isAuthRoute = checkRoute(authRoutes, pathname);

  if (!accessToken) {
    if (refreshToken) {
      // Отримуємо нові cookie
      const data = await checkServerSession();
      const setCookie = data.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) {
            cookieStore.set(
              CookiesKey.accessToken,
              parsed.accessToken,
              options,
            );
          }
          if (parsed.refreshToken) {
            cookieStore.set(
              CookiesKey.refreshToken,
              parsed.refreshToken,
              options,
            );
          }
        }
        if (isAuthRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
