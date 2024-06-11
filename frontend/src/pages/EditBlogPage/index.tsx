import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { createBlog, editBlog, getBlog } from "../../services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider/AuthContext";
import { useForm } from "react-hook-form";
import React from "react";
import { Post } from "../../types/post";
import { PostContext } from "../../components/PostProvider/PostContext";

interface FormValues {
  title: string;
  content: string;
}

export function EditBlogPage() {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [post, setPost] = React.useState<Post | null>(null);
  const { updatePost } = React.useContext(PostContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: post?.title ?? "",
      content: post?.content ?? "",
    },
    values: {
      title: post?.title ?? "",
      content: post?.content ?? "",
    },
  });

  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const blogPost = await getBlog(id);
      console.log("blog post is: ", blogPost);
      setPost(blogPost);
    })();
  }, [id]);

  const handleEditBlog = async (data: FormValues) => {
    try {
      if (post) {
        updatePost({ ...post, ...data });
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            type="text"
            placeholder="Enter your Title"
            {...register("title", {
              required: "title is required",
              value: post?.title ?? "",
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            type="text"
            placeholder="Enter content"
            {...register("content", {
              required: "content is required",
              value: post?.content ?? "",
            })}
            error={!!errors.content}
            helperText={errors.content?.message}
            minRows={5}
            multiline={true}
          />
          <Button
            sx={{
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#000",
              },
              color: "#fff",
            }}
            onClick={handleSubmit(handleEditBlog)}
          >
            Save Changes
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
