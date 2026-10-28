import { defineConfig } from "prisma/config";

// Prisma does not read .env on its own when a config file exists.
try {
  process.loadEnvFile();
} catch {
  // No .env file: rely on the environment (CI sets DATABASE_URL directly).
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
