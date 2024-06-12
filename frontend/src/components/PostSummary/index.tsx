import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PostControls } from "../PostControls";
import { Post } from "../../types/post";

export function PostSummary({ item }: { item: Post }) {
  return (
    <Card key={item._id}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardActions sx={{ display: "table-column" }}>
          <Link to={`/post/${item._id}`}>
            <Typography variant="h3">{item.title}</Typography>
          </Link>
          <Typography variant="body1">{item.content}</Typography>
        </CardActions>
        <CardActions>
          <PostControls item={item} />
        </CardActions>
      </CardContent>
    </Card>
  );
}
