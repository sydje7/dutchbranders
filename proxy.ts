import { NextResponse, type NextRequest } from "next/server";

/*
 * Nederlands staat op de gewone URL's (/werk), Engels op /en (/en/werk).
 * Intern draaien alle pagina's onder app/[lang], dus NL-URL's worden herschreven naar /nl/...
 *
 * Staat SITE_PASSWORD ingesteld, dan zit de hele site achter een wachtwoord
 * en vragen we zoekmachines de site niet op te nemen (handig voor een preview).
 */
const PASSWORD = process.env.SITE_PASSWORD;

export function proxy(request: NextRequest) {
  if (PASSWORD && !authorized(request)) {
    return new NextResponse("Deze preview is beveiligd met een wachtwoord.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Dutch Branders preview", charset="UTF-8"', "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const res = route(request);
  if (PASSWORD) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

function route(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

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

// Basic auth: de gebruikersnaam maakt niet uit, alleen het wachtwoord telt
function authorized(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice(6));
    return decoded.slice(decoded.indexOf(":") + 1) === PASSWORD;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
