import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMiddleware } from "../middleware/user.middleware";

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.userController = new UserController();
    this.userMiddleware = new UserMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.userController.getUsers);
    this.router.get("/:id", this.userController.getUserId);
    this.router.post("/", this.userController.addUser);
    this.router.patch("/:id", this.userController.editUser);
    this.router.delete(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.deleteUser
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
