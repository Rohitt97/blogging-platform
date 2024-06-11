import React from "react";
import SignupForm from "../../components/SignupForm";
import { Box, Typography } from "@mui/material";

export default function SignupPage() {
  return (
    <Box>
      <Typography variant="h2">Signup</Typography>
      <SignupForm />
    </Box>
  );
}
