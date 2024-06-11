import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListPostsPage from "./pages/ListPostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import DefaultLayout from "./Layouts/DefaultLayout";
import SoloLayout from "./Layouts/SoloLayout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { mainTheme } from "./theme";
import { BaseLayout } from "./Layouts/BaseLayout";
import { Page } from "./components/Page";
import { CreateBlogPage } from "./pages/CreateBlogPage";
import { EditBlogPage } from "./pages/EditBlogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            element: <Page PageComponent={ListPostsPage} />,
          },

          {
            path: "/post/:id",
            element: <Page PageComponent={PostDetailPage} />,
          },
          {
            path: "/post/create-blog",
            element: <Page PageComponent={CreateBlogPage} />,
          },
          {
            path: "/post/:id/edit",
            element: <Page PageComponent={EditBlogPage} />,
          },
        ],
      },

      {
        path: "/auth",
        element: <SoloLayout />,
        children: [
          {
            path: "/auth/signin",
            element: <Page PageComponent={SigninPage} />,
          },

          {
            path: "/auth/signup",
            element: <Page PageComponent={SignupPage} />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={createTheme(mainTheme)}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}
