import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CardComponent = ({
  image,
  title,
  description,
  buttonText,
  handleClick,
  buttonLink,
}) => {
  return (
    <Card sx={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={buttonLink && buttonLink}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
