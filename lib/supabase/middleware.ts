import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Define route types
  const isLandingPage = pathname === "/";
  const isLoginPage = pathname.startsWith("/login");
  const isOnboardingPage = pathname.startsWith("/onboarding");
  
  // Public SEO pages that should not be treated as username routes
  const publicPages = [
    "/reading-tracker",
    "/track-reading-progress",
    "/book-tracking-app",
  ];
  const isPublicPage = publicPages.some(page => pathname.startsWith(page));
  
  const isDynamicUserRoute = /^\/[^/]+(\/.*)?$/.test(pathname) && !isLandingPage && !isLoginPage && !isOnboardingPage && !isPublicPage;

  // Redirect unauthorized users trying to access protected routes to `/`
  if (!user && (isDynamicUserRoute || isOnboardingPage)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Redirect users without a username to `/onboarding`
  if (user && !user.user_metadata?.username && !isOnboardingPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users trying to access public routes to their dashboard `/[username]`
  if (user && (isLandingPage || isLoginPage)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${user.user_metadata?.username}`;
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users trying to access other users' page
  if (user && isDynamicUserRoute && user.user_metadata?.username !== pathname.split("/")[1]) {
    const url = request.nextUrl.clone();
    url.pathname = `/${user.user_metadata?.username}`;
    return NextResponse.redirect(url);
  }

  // Allow access to all other cases
  return supabaseResponse;
}
