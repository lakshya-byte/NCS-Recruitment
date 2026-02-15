import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* In Next.js 15, this is now a TOP-LEVEL property.
     It NO LONGER goes inside "experimental".
  */
	serverExternalPackages: ["@prisma/client", "pg"],

	experimental: {
		// Keep other experimental flags here if you have them,
		// but move serverExternalPackages out.
	},
};

export default nextConfig;
