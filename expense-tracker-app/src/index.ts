import express, { Request, Response } from "express";
import { ExpenseRouter } from "./routers/expense.router";
import "dotenv/config";
import cors from "cors";
import pool from "./config/db";
import { ExpenseV2Router } from "./routers/expensev2.router";

const app = express();
const PORT = 4000;
const expenseRouter = new ExpenseRouter();
const expenseV2Router = new ExpenseV2Router();

app.use(express.json());
app.use(cors());
app.use("/api/expenses", expenseRouter.getRouter());
app.use("/api/v2/expenses", expenseV2Router.getRouter());

pool.connect((err, client, release) => {
  if (err) {
    return console.log("Error acquiring client", err.stack);
  }
  if (client) {
    client.query("SET search_path TO test", (queryErr) => {
      if (queryErr) {
        console.log("Error setting search path", queryErr.stack);
      } else {
        console.log('Success connection "test" 🦴');
      }
      release();
    });
  }
});

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello, Welcome to my API");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
