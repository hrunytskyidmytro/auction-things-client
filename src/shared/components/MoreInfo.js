import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Stack } from "@mui/material";

import { useAuth } from "../hooks/useAuth";

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
    price: "$15.00",
  },
];

export default function MoreInfo() {
  const { user } = useAuth();
  
  return (
    <>
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: "#01579b", mt: 15, textAlign: "center" }}
      >
        Free Lots || {user?.firstName}
      </Typography>
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
                <Link href="/lots" underline="hover">
                  Learn More
                </Link>
              </Button>
              <Button size="small" href="#">
                <Link href="/lots" underline="hover">
                  Place a bid
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: "#01579b", mt: 10, textAlign: "center" }}
      >
        About author
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          width: 500,
          textAlign: "center",
          fontSize: "1.2rem",
          ml: 87,
          mt: 2,
        }}
      >
        This is a real text about the developer. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at,
        interdum ex. Integer sodales odio eget nisl volutpat, in laoreet libero
        auctor.
      </Typography>
    </>
  );
}