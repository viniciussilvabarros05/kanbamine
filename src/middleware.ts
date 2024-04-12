import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
 
  const signInURL = new URL("/", request.url);
  if(true){
    return NextResponse.redirect(signInURL)
  }
}

export const config = {
  matcher: ["/home/:path*"],
};
