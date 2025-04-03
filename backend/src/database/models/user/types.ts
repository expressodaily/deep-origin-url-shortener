import { Types } from "mongoose";

export interface User {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
