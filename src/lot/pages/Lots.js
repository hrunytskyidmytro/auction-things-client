import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";

const lots = [
  {
    id: "1",
    title: "Lot 1",
    description: "Some long description about the lot.",
    price: "$15.00",
  },
  {
    id: "2",
    title: "Lot 2",
    description: "Some long description about the lot.",
    price: "$16.00",
  },
  {
    id: "3",
    title: "Lot 3",
    description: "Some long description about the lot.",
    price: "$17.00",
  },
  {
    id: "4",
    title: "Lot 4",
    description: "Some long description about the lot.",
    price: "$17.00",
  },
  {
    id: "5",
    title: "Lot 5",
    description: "Some long description about the lot.",
    price: "$15.00",
  },
];

const lots2 = [
  {
    id: "6",
    title: "Lot 6",
    description: "Some long description about the lot.",
    price: "$17.00",
  },
  {
    id: "7",
    title: "Lot 7",
    description: "Some long description about the lot.",
    price: "$15.00",
  },
  {
    id: "8",
    title: "Lot 8",
    description: "Some long description about the lot.",
    price: "$16.00",
  },
  {
    id: "9",
    title: "Lot 9",
    description: "Some long description about the lot.",
    price: "$17.00",
  },
  {
    id: "10",
    title: "Lot 10",
    description: "Some long description about the lot.",
    price: "$15.00",
  },
];

const Lot = () => {
  const navigate = useNavigate();

  const handleCreateNewLot = () => {
    navigate("/admin/lots/new");
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateNewLot}
        >
          Create New Lot
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          mt: 5,
        }}
      >
        {lots.map((lot) => (
          <Card key={lot.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              title={lot.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {lot.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lot.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lot.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="#">
                Learn More
              </Button>
              <Button size="small" href="#">
                Place a bid
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          mt: 5,
        }}
      >
        {lots2.map((lot) => (
          <Card key={lot.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              title={lot.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {lot.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lot.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lot.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="#">
                Learn More
              </Button>
              <Button size="small" href="#">
                Place a bid
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Lot;
