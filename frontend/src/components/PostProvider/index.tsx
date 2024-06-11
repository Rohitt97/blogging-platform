import React from "react";
import { PostContext } from "./PostContext";
import { Post } from "../../types/post";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllPosts,
} from "../../services/blogService";

type ProviderAction = {
  type: string;
  payload: any;
};

function postReducer(state: Post[], action: ProviderAction) {
  switch (action.type) {
    case "CREATE_POST":
      //call to api
      //refresh the state
      return state;

    case "UPDATE_POST":
      //update a post
      //refresh the state
      return state;

    case "REFRESH_LIST":
      return [...action.payload];

    default:
      return state;
  }
}

const initPosts: Post[] = [];

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, dispatch] = React.useReducer(postReducer, initPosts);

  function deletePost(id: string) {
    console.log("deete post with id: ", id);
    (async function () {
      const deleteUser = await deleteBlog(id);
      console.log("deleted user: ", deleteUser);
      const posts = await getAllPosts();
      dispatch({ type: "REFRESH_LIST", payload: posts });
    })();
  }

  function updatePost(post: Post) {
    (async () => {
      const blogData = await editBlog(post);
      const posts = await getAllPosts();
      dispatch({ type: "REFRESH_LIST", payload: posts });
    })();
  }

  function createPost(title: string, content: string) {
    (async () => {
      const blogData = await createBlog({ title, content });
      const posts = await getAllPosts();
      dispatch({ type: "REFRESH_LIST", payload: posts });
    })();
  }

  React.useEffect(() => {
    (async () => {
      try {
        const posts = await getAllPosts();
        dispatch({ type: "REFRESH_LIST", payload: posts });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const contextValue = {
    posts,
    deletePost,
    updatePost,
    createPost,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
