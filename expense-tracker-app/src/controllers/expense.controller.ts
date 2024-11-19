import { Request, Response } from "express";
import fs from "fs";
import { IExpense } from "../types";

export class ExpenseController {
  getExpenses(req: Request, res: Response) {
    const { category, start, end } = req.query;
    let expense: IExpense[] = JSON.parse(
      fs.readFileSync("./db/data.json", "utf-8")
    );

    expense = expense.filter((item) => {
      let isValid: boolean = true;
      if (category) {
        isValid = isValid && item.category == category;
      }
      if (start && end) {
        const startDate = new Date(start as string);
        const endDate = new Date(end as string);
        const expenseDate = new Date(item.date);

        isValid = isValid && expenseDate >= startDate && expenseDate <= endDate;
      }
      return isValid;
    });

    const nominal_income = expense
      .filter((item) => item.type == "income")
      .reduce((a, b) => a + b.nominal, 0);
    const nominal_expence = expense
      .filter((item) => item.type == "expense")
      .reduce((a, b) => a + b.nominal, 0);

    res.status(200).send({ nominal_income, nominal_expence, expense });
  }

  getExpenseById(req: Request, res: Response) {
    const { id } = req.params;
    const expenses: IExpense[] = JSON.parse(
      fs.readFileSync("./db/data.json", "utf-8")
    );
    const expense = expenses.find((item) => item.id === +id);

    if (expense) {
      res.status(200).send({ expense });
    } else {
      res.status(400).send({ message: "Expense Not Found!" });
    }
  }

  addExpense(req: Request, res: Response) {
    const expenses: IExpense[] = JSON.parse(
      fs.readFileSync("./db/data.json", "utf-8")
    );
    const id = Math.max(...expenses.map((item) => item.id)) + 1;
    const { title, nominal, type, category, date } = req.body;
    const newExpense: IExpense = { id, title, nominal, type, category, date };

    expenses.push(newExpense);
    fs.writeFileSync(
      "./db/data.json",
      JSON.stringify(expenses, null, 2),
      "utf-8"
    );

    res.status(200).send({ expense: newExpense });
  }

  editExpense(req: Request, res: Response) {
    const { id } = req.params;
    const expenses: IExpense[] = JSON.parse(
      fs.readFileSync("./db/data.json", "utf-8")
    );
    const idx: number = expenses.findIndex((item) => item.id === +id);

    if (idx !== -1) {
      expenses[idx] = { ...expenses[idx], ...req.body };
      fs.writeFileSync(
        "./db/data.json",
        JSON.stringify(expenses, null, 2),
        "utf-8"
      );
      res.status(200).send(`Expence with id ${id} edited!`);
    } else {
      res.status(400).send({ message: "Expense Not Found!" });
    }
  }

  deleteExpense(req: Request, res: Response) {
    const { id } = req.params;
    const expenses: IExpense[] = JSON.parse(
      fs.readFileSync("./db/data.json", "utf-8")
    );
    const newExpenses = expenses.filter((item) => item.id !== +id);

    if (newExpenses.length !== expenses.length) {
      fs.writeFileSync(
        "./db/data.json",
        JSON.stringify(newExpenses, null, 2),
        "utf-8"
      );
      res.status(200).send("Delete successful!");
    } else {
      res.status(400).send({ message: "Expense Not Found!" });
    }
  }
  // getTotalExpensebyDate(req: Request, res: Response) {
  //   const { startDate, endDate } = req.query;

  //   if (!startDate || !endDate) {
  //     return res
  //       .status(400)
  //       .send({ message: "Please provide startDate and endDate" });
  //   }

  //   const expenses: IExpense[] = JSON.parse(
  //     fs.readFileSync("./db/data.json", "utf-8")
  //   );

  //   const filteredExpenses = expenses.filter((expense) => {
  //     const expenseDate = new Date(expense.date);
  //     return (
  //       expenseDate >= new Date(startDate as string) &&
  //       expenseDate <= new Date(endDate as string)
  //     );
  //   });
  //   const totalNominal = filteredExpenses.reduce((total, expense) => {
  //     return total + expense.nominal;
  //   }, 0);
  //   res.status(200).send({ total: totalNominal });
  // }
  // getTotalExpenseByCategory(req: Request, res: Response) {
  //   const { category } = req.query;

  //   if (!category) {
  //     return res.status(400).send({ message: "Please provide a category" });
  //   }

  //   const expenses: IExpense[] = JSON.parse(
  //     fs.readFileSync("./db/data.json", "utf-8")
  //   );

  //   const filteredExpenses = expenses.filter(
  //     (expense) => expense.category === category
  //   );

  //   const totalNominal = filteredExpenses.reduce((total, expense) => {
  //     return total + expense.nominal;
  //   }, 0);

  //   res.status(200).send({ category, total: totalNominal });
  // }
}
