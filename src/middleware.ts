import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path ==='/login' || path === '/register';
    const token = request.cookies.get('token')?.value || false;

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
}

export const config = {
  matcher: ["/", "/login", "/register", "/profile", "/profile/(.*)"],
};
