import { model, Schema } from "mongoose";
import ShortenedURL from "./types";
import { COLLECTION_NAME, DOCUMENT_NAME } from "./consts";

const schema = new Schema<ShortenedURL>({
  original_url: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
  },
  short_code: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
  },
  click_count: {
    type: Schema.Types.Number,
    default: 0,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  expires_at: {
    type: Schema.Types.Date,
    required: true,
  },
  created_at: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now,
  },
});

schema.index({ short_code: 1, original_url: 1 });

export const ShortenedURLModel = model<ShortenedURL>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME
);

