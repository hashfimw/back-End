import fs from "fs";
import { IExpense } from "../types";
import { NextFunction, Request, Response } from "express";

export class ExpenseMiddleware {
  checkId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const expenses: IExpense[] = JSON.parse(
      fs.readFileSync("./db/data.json", "utf-8")
    );

    const expense = expenses.find((item) => item.id === +id);
    if (expense) {
      next();
    } else {
      res.status(404).send({ message: "Expense Not Found!" });
    }
  }
}
