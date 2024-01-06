import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
// @ts-ignore
import human from "human-time";

interface Post {
  uuid: string;
  content: string;
  userUuid: string;
  createdAt: Date;
}

export function createPost({
  content,
  userUuid,
}: {
  content: string;
  userUuid: string;
}): Post {
  const uuid = uuidv4();
  const createdAt = new Date();

  db.prepare(
    "INSERT INTO posts (uuid, content, userUuid, createdAt) VALUES (?, ?, ?, ?)"
  ).run(uuid, content, userUuid, createdAt.toISOString());

  return {
    uuid,
    content,
    userUuid,
    createdAt,
  };
}

export function getPosts(): Post[] {
  return (db.prepare("SELECT * FROM posts").all() as Post[]).map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
  }));
}

export function getPostsWithUsers(): (Post & { username: string })[] {
  return (
    db
      .prepare(
        "SELECT posts.uuid, posts.content, posts.userUuid, posts.createdAt, users.username FROM posts INNER JOIN users ON posts.userUuid = users.uuid"
      )
      .all() as (Post & { username: string })[]
  )
    .map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      createdAtRelative: human(new Date(post.createdAt)),
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getPostsForUser(userUuid: string): Post[] {
  return (
    db.prepare("SELECT * FROM posts WHERE userUuid = ?").all(userUuid) as Post[]
  )
    .map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      createdAtRelative: human(new Date(post.createdAt)),
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
