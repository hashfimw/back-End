import { Router } from "express";

import { ExpenseController } from "../controllers/expense.controller";
import { ExpenseMiddleware } from "../middleware/expense.middleware";

export class ExpenseRouter {
  private router: Router;
  private expenseController: ExpenseController;
  private expenseMiddleware: ExpenseMiddleware;

  constructor() {
    this.expenseController = new ExpenseController();
    this.expenseMiddleware = new ExpenseMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.expenseController.getExpenses);
    this.router.get("/:id", this.expenseController.getExpenseById);
    this.router.post("/", this.expenseController.addExpense);
    this.router.patch("/:id", this.expenseController.editExpense);
    this.router.delete(
      "/:id",
      this.expenseMiddleware.checkId,
      this.expenseController.deleteExpense
    );
    // this.router.get(
    //   "/total/date-range",
    //   this.expenseController.getTotalExpenseByDateRange.bind
    // );
    // this.router.get(
    //   "/total/category",
    //   this.expenseController.getTotalExpenseByCategory
    // );
  }

  getRouter(): Router {
    return this.router;
  }
}
