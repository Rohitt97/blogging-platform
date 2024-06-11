import { Author } from "./author";

export type Post = {
  _id: string;
  title: string;
  content: string;
  status: "draft" | "published";
  publishDate: Date;
  author: Author;
};
