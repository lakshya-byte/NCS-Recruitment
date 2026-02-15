"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

type AuthState = {
	error?: string;
};

export async function signup(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Missing fields" };
	}

	const existing = await prisma.user.findUnique({ where: { email } });

	if (existing) {
		return { error: "Email already in use" };
	}

	const hashed = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: { name, email, password: hashed },
	});
	console.log(user);
	await createSession(user.id, user.role);

	redirect("/dashboard");
}

export async function login(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !user.password) throw new Error("Invalid credentials");

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new Error("Invalid credentials");

	await createSession(user.id, user.role);

	redirect("/dashboard");
}
