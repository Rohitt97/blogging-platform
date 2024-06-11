import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import { Post } from "../../types/post";
import { Button } from "@mui/material";
import { deleteBlog, editBlog } from "../../services/blogService";
import React from "react";
import { PostContext } from "../PostProvider/PostContext";

export function PostControls({ item }: { item: Post }) {
  const { authUser } = useAuth();
  const { deletePost } = React.useContext(PostContext);
  const navigate = useNavigate();

  React.useEffect(() => {});

  const handleEdit = async () => {
    try {
      const editData = await editBlog(item);
      if (editData) {
        console.log("data is going to edit:", item._id);
      }
    } catch (error: any) {
      throw new Error("Something went wrong.", error);
    }
  };

  if (authUser?._id !== item.author._id && authUser?.role !== "admin")
    return null;

  return (
    <div>
      <Link to={`/post/${item._id}/edit`}>Edit</Link>
      <Button onClick={() => deletePost(item._id)}>Delete</Button>
    </div>
  );
}
