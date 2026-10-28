// Creates .env from .env.example on first run and fills in a random AUTH_SECRET.
import { randomBytes } from "node:crypto";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const envPath = ".env";
const placeholder = "replaced-by-npm-run-setup";

if (!existsSync(envPath)) {
  copyFileSync(".env.example", envPath);
  console.log("Created .env from .env.example");
}

let env = readFileSync(envPath, "utf8");

if (env.includes(placeholder)) {
  env = env.replace(placeholder, randomBytes(32).toString("base64"));
  writeFileSync(envPath, env);
  console.log("Generated AUTH_SECRET in .env");
}

const dbLine = env.split(/\r?\n/).find((line) => line.startsWith("DATABASE_URL="));
if (dbLine && !dbLine.includes("file:")) {
  console.warn(
    'Warning: DATABASE_URL in .env is not a SQLite file URL. This project expects DATABASE_URL="file:./dev.db".',
  );
}
