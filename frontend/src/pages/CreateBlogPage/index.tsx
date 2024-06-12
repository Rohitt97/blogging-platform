import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PostContext } from "../../components/PostProvider/PostContext";
import React from "react";

interface FormValues {
  title: string;
  content: string;
}

export function CreateBlogPage() {
  const navigate = useNavigate();
  const { createPost } = React.useContext(PostContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleCreateBlog = async (data: FormValues) => {
    try {
      createPost(data.title, data.content);
      navigate("/");
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
            {...register("title", { required: "title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            type="text"
            placeholder="Enter content"
            {...register("content", { required: "content is required" })}
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
            onClick={handleSubmit(handleCreateBlog)}
          >
            Add Post
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
