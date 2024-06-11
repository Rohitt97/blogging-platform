//createBlog
//deleteBlog()
//editblog()

import { axios } from "../config/axios";
import { Post } from "../types/post";

export async function createBlog(blogData: any) {
  const response = await axios.post("/blogs", blogData);
  console.log(response.data);
  return response.data;
}

export async function getAllPosts() {
  const response = await axios.get("/blogs");
  return response.data;
}

export async function getBlog(id?: string) {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
}

export async function deleteBlog(id?: string) {
  const response = await axios.delete(`/blogs/${id}`);
  return response.data;
}

export async function editBlog(item: Post) {
  const response = await axios.patch(`/blogs/${item._id}`, {
    title: item.title,
    content: item.content,
  });
  return response.data;
}
