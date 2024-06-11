import React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import { Author } from "../../types/author";

type AuthorSummaryProps = {
  author?: Author;
};

export default function AuthorSummary({ author }: AuthorSummaryProps) {
  if (!author) {
    return null;
  }

  return (
    <Box>
      <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
        <Avatar alt={author.name} />
        <Typography variant="h5">{author.name}</Typography>
      </Stack>
    </Box>
  );
}
