import "express";
import { RoleUser } from "@prisma/client";

export type UserPayLoad = {
  id: number;
  role: RoleUser;
};

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
