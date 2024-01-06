import sqlite3 from "better-sqlite3";

export const db = new sqlite3("./main.db", {
  verbose(message, ...additionalArgs) {
    console.log(`[db]: ${message}`, ...additionalArgs);
  },
});

export async function runMigrations() {
  db.exec(
    "CREATE TABLE IF NOT EXISTS users (uuid TEXT, username TEXT, password TEXT)"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS posts (uuid TEXT, content TEXT, userUuid TEXT, createdAt TEXT)"
  );
}
