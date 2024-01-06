import express, { Express, NextFunction, Request, Response } from "express";
import hbs from "hbs";
import { NotFoundError } from "./errors";

const app: Express = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
