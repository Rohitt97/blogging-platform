import { Box, CardContent, Typography, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import AuthorSummary from "../../components/AuthorSummary";
import { getBlog } from "../../services/blogService";
import React from "react";
import { Post } from "../../types/post";

export default function PostDetailPage() {
  const [post, setPost] = React.useState<Post | null>(null);
  let { id } = useParams();

  React.useEffect(() => {
    async function getBlogPost() {
      const response = await getBlog(id);
      setPost(response);
    }
    getBlogPost();
  }, []);

  if (!id) {
    return (
      <Box>
        <div>Something went wrong</div>
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <AuthorSummary author={post?.author} />
        <Typography variant="h6" color={"#888888"} sx={{ paddingLeft: "45px" }}>
          {post?.title}
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: "10px" }}>
          {post?.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
