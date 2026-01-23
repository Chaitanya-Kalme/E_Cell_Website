// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasources: {
    db: {
      adapter: "postgresql",
      url: env("DATABASE_URL"),
    },
  },
});
