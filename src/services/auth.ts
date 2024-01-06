import bcrypt from "bcrypt";
import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

export interface User {
  uuid: string;
  username: string;
  password: string;
}

export interface UserWithoutPassword {
  uuid: string;
  username: string;
}

export async function createUser(username: string, password: string) {
  const userExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (userExists) {
    throw new Error("User already exists");
  }

  const uuid = uuidv4();
  const hashedPassword = await hashPassword(password);

  db.prepare(
    "INSERT INTO users (uuid, username, password) VALUES (?, ?, ?)"
  ).run(uuid, username, hashedPassword);

  const user = db
    .prepare("SELECT * FROM users WHERE uuid = ?")
    .get(uuid) as User;

  return {
    uuid: user.uuid,
    username: user.username,
  };
}

export async function loginUser(username: string, password: string) {
  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username) as User;

  if (!user) {
    return null;
  }

  const isMatch = await checkPassword(password, user.password);

  if (!isMatch) {
    return null;
  }

  return {
    uuid: user.uuid,
    username: user.username,
  };
}

async function hashPassword(plainTextPassword: string) {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

  return hashedPassword;
}

export async function checkPassword(
  plainTextPassword: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

  return isMatch;
}
