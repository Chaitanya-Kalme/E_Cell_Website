// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",   // path to your Prisma schema
  datasource: {
    url: env("DATABASE_URL"),       // load your database URL here
  },
  // Optional: migrations config (if you use prisma migrate)
  migrations: {
    path: "prisma/migrations",
  },
});
