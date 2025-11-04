import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"


// Middleware to check on every route that admin is first logged in or not.
export async function middleware(req: NextRequest) {
    // Get the token from the cookies.
    const token = req.cookies.get("token")?.value
    const isAdminRoute = req.nextUrl.pathname.startsWith('/E_Cell_IITRPR_Admin')
    try {
        // If token is not present and adminRoute then redirect it to login page. 
        if (!token && isAdminRoute && req.nextUrl.pathname !== '/E_Cell_IITRPR_Admin/login') {
            return NextResponse.redirect(new URL("/E_Cell_IITRPR_Admin/login", req.url))
        }
        // If token is present and adminRoute then verify it is correct or not. 
        else if (token && isAdminRoute) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret)
        }
        return NextResponse.next()

    } catch (error) {
        if (isAdminRoute && req.nextUrl.pathname !== '/E_Cell_IITRPR_Admin/login') {
            const res = NextResponse.redirect(new URL("/E_Cell_IITRPR_Admin/login", req.url));
            // Clear token cookie
            res.cookies.set('token', '', {
                path: '/E_Cell_IITRPR_Admin',
                expires: new Date(0),
            });

            return res;
        }
    }
}


export const config = {
    matcher: ['/E_Cell_IITRPR_Admin/:path*', '/E_Cell_IITRPR_Admin'], // apply middleware to /admin routes only
};