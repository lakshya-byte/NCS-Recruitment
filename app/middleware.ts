import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, getToken } from "@/app/lib/jwt";

export function middleware(req: NextRequest) {
	const token = getToken();
	if (!token) {
		if (req.nextUrl.pathname.startsWith("/dashboard"))
			return NextResponse.redirect(new URL("/login", req.url));
		return NextResponse.next();
	}

	const user = verifyJWT(token as unknown as string);
	if (!user) {
		const res = NextResponse.redirect(new URL("/login", req.url));
		res.cookies.delete("auth-token");
		return res;
	}

	req.cookies.set("user", JSON.stringify(user)); // Temp for server access

	if (
		req.nextUrl.pathname.startsWith("/dashboard/admin") &&
		user.role !== "ADMIN"
	) {
		return NextResponse.redirect(new URL("/dashboard/user", req.url));
	}

	return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/login"] };
