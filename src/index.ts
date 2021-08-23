import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import DB from "./model";
import { URL } from "./config/db.config";
import authRouter from "./route/auth.route";
import testRouter from "./route/test.route";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const db = new DB();

db.mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use("/auth", authRouter);
app.use("/test", testRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
