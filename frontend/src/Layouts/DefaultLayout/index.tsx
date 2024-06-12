import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { AuthProvider } from "../../components/AuthProvider";
import { PostProvider } from "../../components/PostProvider";

export default function DefaultLayout() {
  return (
    <AuthProvider>
      <PostProvider>
        <Container sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Header />
          <Outlet />
        </Container>
      </PostProvider>
    </AuthProvider>
  );
}
