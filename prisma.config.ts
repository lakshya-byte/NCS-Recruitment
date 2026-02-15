import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		// Uses the 'env' helper from prisma/config to safely load your URL
		url: env("DATABASE_URL"),
	},
});
