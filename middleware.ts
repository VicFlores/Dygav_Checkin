import { NextRequest, NextResponse } from 'next/server';
import {
  getLocale,
  hasPathnameLocale,
  supportedLocales,
  defaultLocale,
} from './utils/i18n';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // I18n
  // -------------

  // 1. Ignore todo lo que no sea de nuestra ruta /
  if (!pathname.startsWith('/')) return;

  // 2. Check if path contains a locale segment
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // If the first segment is a locale but not supported, redirect to default locale
  if (
    firstSegment &&
    firstSegment.length === 2 &&
    !supportedLocales.includes(firstSegment)
  ) {
    // Replace unsupported locale with default locale
    const newPathname = pathname.replace(
      `/${firstSegment}`,
      `/${defaultLocale}`
    );
    request.nextUrl.pathname = newPathname;
    return NextResponse.redirect(request.nextUrl);
  }

  // 3. Si el path ya contiene un local, ignorelo (ya esta ok)
  //    e.j.: /i18n/es
  const hasLocal = hasPathnameLocale(pathname);
  if (hasLocal) return;

  // 4. Si no hay local, agregar el local a la URL
  //    e.j.: / -> /es
  const locale = getLocale({
    'accept-language': request.headers.get('Accept-Language') || '',
  });
  request.nextUrl.pathname = `${pathname}/${locale}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
