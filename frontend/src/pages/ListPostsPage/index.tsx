import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import { PostSummary } from "../../components/PostSummary";
import { PostContext } from "../../components/PostProvider/PostContext";

export default function ListPostsPage() {
  const { posts } = React.useContext(PostContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h2">Recent Blog Posts</Typography>
      <Stack spacing={2}>
        {posts.map((item) => (
          <PostSummary item={item} key={item?._id} />
        ))}
      </Stack>
    </Box>
  );
}
