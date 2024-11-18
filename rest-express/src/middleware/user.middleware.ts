import fs from "fs";
import { IUser } from "../types";
import { NextFunction, Request, Response } from "express";

export class UserMiddleware {
  checkId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );
    const data = users.find((item) => item.id == +id);
    if (data) {
      next();
      res.status(200).send({ user: data });
    } else {
      res.status(404).send({ message: "User Not Found!" });
    }
  }
}
