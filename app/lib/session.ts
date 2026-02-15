"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createSession(userId: string, role: string) {
	const token = await new SignJWT({ userId, role })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("7d")
		.sign(key);

	(await cookies()).set("session", token, {
		httpOnly: true,
		secure: true,
		path: "/",
	});
}

export async function getSession() {
	const token = (await cookies()).get("session")?.value;
	if (!token) return null;

	const { payload } = await jwtVerify(token, key);
	return payload as { userId: string; role: string };
}

export async function logout() {
	(await cookies()).delete("session");
}
