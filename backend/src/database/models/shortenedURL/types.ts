import { Types } from "mongoose";

export default interface ShortenedURL{
  _id?: Types.ObjectId;
  original_url: string;
  short_code: string;
  click_count?: number;
  email: string;
  expires_at: Date;
  created_at?: Date;
  updated_at?: Date;
}
