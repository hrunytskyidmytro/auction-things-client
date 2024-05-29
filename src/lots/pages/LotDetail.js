import React from "react";
import { useParams } from "react-router-dom";
import { useGetLotByIdQuery } from "../../api/lotApi";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Skeleton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { format } from "date-fns";

const LotDetail = () => {
  const { id } = useParams();
  const { data: lot, isLoading, error } = useGetLotByIdQuery(id);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="400px" />;
  }

  if (error) {
    return <div>Error loading lot details</div>;
  }

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };
  console.log("Сторінка про лот!");

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="lot"
            {...stringAvatar(
              `${lot.creator?.firstName} ${lot.creator?.lastName}`
            )}
          />
        }
        title={`${lot.creator?.firstName} ${lot.creator?.lastName}`}
        subheader={
          lot.createdAt && format(new Date(lot.createdAt), "dd.MM.yyyy")
        }
      />
      <CardContent>
        <Typography variant="h5">{lot.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {lot.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LotDetail;
