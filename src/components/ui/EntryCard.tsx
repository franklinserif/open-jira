import { FC, DragEvent, useContext } from "react";
import { Card, CardActionArea, CardActions, Typography } from "@mui/material";
import { Entry } from "@/interfaces";
import { UIContext } from "@/Context/ui";
import { dateFunctions } from "@/utils";
import { useRouter } from "next/router";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDraggin, endDraggin } = useContext(UIContext);
  const router = useRouter();

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);
    startDraggin();
  };

  const handleDragEnd = () => {
    endDraggin();
  };

  const handleOnClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={handleOnClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardActionArea>
        <Typography sx={{ whiteSpace: "pre-line", padding: 2 }}>
          {entry.description}
        </Typography>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
