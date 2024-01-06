import express, { Request, Response } from "express";
import { createPost } from "../services/post";

const router = express.Router();

router.post("/post", async (req: Request, res: Response) => {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }

  const { content } = req.body;

  if (!content) {
    res.redirect("/");
    return;
  }

  await createPost({ content, userUuid: req.session.user.uuid });

  res.redirect("/");
});

export default router;
