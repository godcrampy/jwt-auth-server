import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import DB from "./model";
import { URL } from "./config/db.config";
import Role from "./model/role.model";
import { CallbackError } from "mongoose";

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
    init();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

function init() {
  Role.estimatedDocumentCount({}, (err: CallbackError, count: number): void => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
