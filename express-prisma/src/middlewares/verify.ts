import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserPayLoad } from "../custom";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw "Unauthorize!";

    const verifiedUser = verify(token, process.env.JWT_KEY!);
    req.user = verifiedUser as UserPayLoad;

    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role == "Admin") {
    next();
  } else {
    res.status(400).send("Admin Only!");
  }
};
