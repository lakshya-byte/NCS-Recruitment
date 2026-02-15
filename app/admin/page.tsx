import { prisma } from "@/app/lib/prisma";
import { verifyJWT, getToken } from "@/app/lib/jwt";

export default async function AdminDashboard() {
	const token = await getToken();
	const user = token ? verifyJWT(token) : null;
	if (!user || user.role !== "ADMIN") throw new Error("Access denied");

	const users = await prisma.user.findMany({
		select: { id: true, name: true, email: true, role: true },
	});

	return (
		<div className="p-12 max-w-6xl mx-auto">
			<h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
				Admin Dashboard
			</h1>
			<div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
				<table className="w-full">
					<thead className="bg-white/5">
						<tr>
							<th className="p-6 text-left font-bold">Name</th>
							<th className="p-6 text-left font-bold">Email</th>
							<th className="p-6 text-left font-bold">Role</th>
						</tr>
					</thead>
					<tbody>
						{users.map(
							(u: {
								id: string | null;
								name: string | null;
								email: string;
								role: string;
							}) => (
								<tr
									key={u.id}
									className="border-t border-white/10 hover:bg-white/5"
								>
									<td className="p-6">{u.name || "N/A"}</td>
									<td className="p-6">{u.email}</td>
									<td>
										<span
											className={`px-3 py-1 rounded-full text-sm font-bold ${u.role === "ADMIN" ? "bg-green-500" : "bg-blue-500"}`}
										>
											{u.role}
										</span>
									</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
