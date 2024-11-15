import { Request, Response } from "express";
import fs from "fs";
import { IUser } from "../types";

export class UserController {
  getUsers(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );
    res.status(200).send({ users });
  }
  //   getUserId(req: Request, res: Response) {
  //     const users = JSON.parse(fs.readFileSync("./db/user.json", "utf-8"));
  //     const { id } = req.params;
  //     const userdoang = users.find((userdoang: any) => userdoang.id == id);
  //     res.status(200).send({ userdoang });
  //   }

  getUserId(req: Request, res: Response) {
    const { id } = req.params;
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );
    const data = users.find((item) => item.id == +id);
    if (data) {
      res.status(200).send({ user: data });
    } else {
      res.status(400).send({ message: "User Not Found!" });
    }
  }
  addUser(req: Request, res: Response) {
    const users: IUser[] = JSON.parse(
      fs.readFileSync("./db/user.json", "utf-8")
    );
    const id = Math.max(...users.map((item) => item.id)) + 1;
    const { name, email, password } = req.body;
    const newData: IUser = { id, name, email, password };
    users.push(newData);

    fs.writeFileSync("./db/user.json", JSON.stringify(users), "utf-8");

    res.status(200).send({ user: newData });
  }
}
