import express, { Request, Response } from "express";
import { createUser, loginUser } from "../services/auth";

const router = express.Router();

router.get("/register", (req: Request, res: Response) => {
  res.render("register");
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, password, passwordConfirmation } = req.body;

  try {
    const user = await createUser(username, password);

    req.session.user = user;

    console.log(req.session);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Unable to register user" });
  }
});

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    req.session.user = user;

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Unable to login" });
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Unable to logout" });
    }

    res.redirect("/");
  });
});

export default router;
