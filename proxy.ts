import { NextResponse, type NextRequest } from "next/server";

/*
 * Nederlands staat op de gewone URL's (/werk), Engels op /en (/en/werk).
 * Intern draaien alle pagina's onder app/[lang], dus NL-URL's worden herschreven naar /nl/...
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  // /nl/... bestaat niet als publieke URL: stuur door naar de versie zonder prefix
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/nl${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
