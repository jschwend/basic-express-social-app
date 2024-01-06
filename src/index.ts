import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from "hbs";
import authRouter from "./routers/auth";
import { NotFoundError } from "./errors";
import { runMigrations } from "./db";
import type { UserWithoutPassword } from "./services/auth";

declare module "express-session" {
  interface SessionData {
    user?: UserWithoutPassword;
  }
}

const app: Express = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1); // trust first proxy
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
  })
);

app.get("/", (req: Request, res: Response) => {
  console.log(req.session);
  res.render("index", { user: req.session.user });
});

app.use(authRouter);

app.get("/*", (req: Request, res: Response) => {
  throw new NotFoundError("Page not found");
});

app.use(function (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    res.status(404).render("error", { status: 404, message: err.message });
    return;
  }

  res
    .status(500)
    .render("error", { status: 500, message: "Something went wrong" });
});

app.listen(port, async () => {
  await runMigrations();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
