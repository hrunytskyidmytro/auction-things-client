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
