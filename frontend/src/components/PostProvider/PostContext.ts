import React from "react";
import { Post } from "../../types/post";

export type PostContextType = {
  posts: Post[];
  deletePost: (id: string) => void;
  createPost: (title: string, content: string) => void;
  updatePost: (post: Post) => void;
};

export const PostContext = React.createContext<PostContextType>({
  posts: [],
  deletePost: function (id: string) {},
  createPost: function (title: string, content: string) {},
  updatePost: function (post: Post) {},
});
