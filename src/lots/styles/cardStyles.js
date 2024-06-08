import { Card, CardActions, styled } from "@mui/material";

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
  p: 1,
  height: "530px",
  width: "100%",
  position: "relative",
  borderRadius: 30,
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
});

export const StyledImage = styled("img")({
  width: "100%",
  height: "250px",
  objectFit: "cover",
});

export const StyledCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
});

export const StyledFilterCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
  p: 1,
  height: "100vh",
  width: "100%",
  position: "relative",
  borderRadius: 30,
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
});
