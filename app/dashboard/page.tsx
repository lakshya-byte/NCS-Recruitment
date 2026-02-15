import { requireUser } from "@/app/lib/auth";
import { logout } from "../lib/session";

export default async function Dashboard() {
	const session = await requireUser();

	return (
		<div>
			Welcome {session.userId}
			<form action={logout}>
				<button>Logout</button>
			</form>
		</div>
	);
}
