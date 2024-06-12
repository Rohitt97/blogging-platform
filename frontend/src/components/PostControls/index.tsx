import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import { Post } from "../../types/post";
import { Button, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { PostContext } from "../PostProvider/PostContext";
import { FaRegEdit } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";

export function PostControls({ item }: { item: Post }) {
  const { authUser } = useAuth();
  const { deletePost } = React.useContext(PostContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (authUser?._id !== item.author._id && authUser?.role !== "admin")
    return null;

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to={`/post/${item._id}/edit`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FaRegEdit style={{ marginRight: 8 }} />
            Edit
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            deletePost(item._id);
            handleClose();
          }}
        >
          <DeleteIcon style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
