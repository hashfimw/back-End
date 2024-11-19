import express, { Request, Response } from "express";
import { ExpenseRouter } from "./routers/expense.router";
import cors from "cors";

const app = express();
const PORT = 4000;
const expenseRouter = new ExpenseRouter();

app.use(express.json());
app.use(cors());
app.use("/api/expenses", expenseRouter.getRouter());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello, Welcome to my API");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
