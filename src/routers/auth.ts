import express, { Request, Response } from "express";
import { createUser, loginUser } from "../services/auth";

const router = express.Router();

router.get("/register", (req: Request, res: Response) => {
  res.render("register", { error: req.flash("error") });
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, password, passwordConfirmation } = req.body;

  if (username.length < 3) {
    req.flash("error", "Username must be at least 3 characters");
    res.redirect("/register");
    return;
  }

  if (password !== passwordConfirmation) {
    req.flash("error", "Passwords do not match");
    res.redirect("/register");
    return;
  }

  // min 8 chars, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=q.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!passwordRegex.test(password)) {
    req.flash(
      "error",
      "Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 number"
    );
    res.redirect("/register");
    return;
  }

  try {
    const user = await createUser(username, password);

    req.session.user = user;

    res.redirect("/");
  } catch (error) {
    req.flash("error", "User already exists");
    res.redirect("/register");
  }
});

router.get("/login", (req: Request, res: Response) => {
  res.render("login", { error: req.flash("error") });
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await loginUser(username, password);

    if (!user) {
      req.flash("error", "Invalid username or password");
      res.redirect("/login");
      return;
    }

    req.session.user = user;

    res.redirect("/");
  } catch (error) {
    req.flash("error", "Invalid username or password");
    res.redirect("/login");
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
