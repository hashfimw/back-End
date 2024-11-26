import { Router } from "express";
import { BlogController } from "../controllers/blog.controllers";

export class BlogRouter {
  private blogController: BlogController;
  private router: Router;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.blogController.getBlogs);
  }
  getRouters(): Router {
    return this.router;
  }
}
