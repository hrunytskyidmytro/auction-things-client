import * as React from "react";
import {
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

import CategoriesList from "../components/CategoriesList";

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
        {user?.firstName}
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
        <CategoriesList />
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
          textAlign: "center",
          fontSize: "1.2rem",
          ml: 87,
          mt: 2,
        }}
      >
        {/* This is a real text about the developer. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at,
        interdum ex. Integer sodales odio eget nisl volutpat, in laoreet libero
        auctor. */}
      </Typography>
    </>
  );
}
