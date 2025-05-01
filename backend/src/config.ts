import { MigrationConfig } from "drizzle-orm/migrator";

type Config = {
  api: APIConfig;
  db: DBConfig;
  jwt: JWTConfig;
};

type APIConfig = {
  port: number;
  platform: string;
};

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

type JWTConfig = {
  secretKey: string;
  tokenHeader: string;
};

process.loadEnvFile();

function envOrThrow(key: string) {
  const value = process.env[key];
  try {
    if (!value) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
  } catch (err) {
    console.error(err);
  }
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

export const config = {
  api: {
    port: Number(envOrThrow("PORT")),
  },
  db: {
    url: envOrThrow("DATABASE_URL"),
    migrationConfig: migrationConfig,
  },
  jwt: {
    secretKey: envOrThrow("JWT_SECRET_KEY"),
    tokenHeader: envOrThrow("TOKEN_HEADER_KEY"),
  },
};
