import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";

export default function Header() {
  const { authUser, setAuthUser } = useAuth();

  const handleSignout = () => {
    setAuthUser();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" color={"#fff"} sx={{ flexGrow: 1 }}>
            Blogging Platform
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Stack direction={"row"} spacing={2}>
              <MuiLink component={Link} to="/" color="inherit">
                Home
              </MuiLink>
              {authUser && (
                <MuiLink
                  component={Link}
                  to="/post/create-blog"
                  color="inherit"
                >
                  Create Blog
                </MuiLink>
              )}
            </Stack>
            {authUser ? (
              <Button
                onClick={handleSignout}
                variant="outlined"
                color="secondary"
              >
                Signout
              </Button>
            ) : (
              <Stack direction={"row"} spacing={2}>
                <MuiLink component={Link} to="/auth/signin" color="inherit">
                  Signin
                </MuiLink>
                <MuiLink component={Link} to="/auth/signup" color="inherit">
                  Signup
                </MuiLink>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
