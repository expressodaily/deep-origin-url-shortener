  import { model, Schema } from "mongoose";

  import type { User } from "./types";

  import { DOCUMENT_NAME } from "./consts";

  const schema = new Schema<User>({
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
      default: Date.now,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
      default: Date.now,
    },
  });

  export const UserModel = model<User>(DOCUMENT_NAME, schema);