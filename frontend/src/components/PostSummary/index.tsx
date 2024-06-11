import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PostControls } from "../PostControls";
import { Post } from "../../types/post";

export function PostSummary({ item }: { item: Post }) {
  return (
    <Card key={item._id}>
      <CardContent>
        <Link to={`/post/${item._id}`}>
          <Typography variant="h3">{item.title}</Typography>
        </Link>
        <Typography variant="body1">{item.content}</Typography>
        <PostControls item={item} />
      </CardContent>
    </Card>
  );
}
