import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
 const uid = request.cookies.get('uid')?.value
  const signInURL = new URL("/", request.url);
  const homeURL = new URL("/home", request.url);
  if(!uid){
    if(request.nextUrl.pathname === "/"){
      return NextResponse.next()
    }
    return NextResponse.redirect(signInURL)
  }
 
  if(request.nextUrl.pathname === "/"){
    return NextResponse.redirect(homeURL)
  }
}

export const config = {
  matcher: ["/", "/home/:path*"],
};
