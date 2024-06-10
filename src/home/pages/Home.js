import * as React from "react";
import { Typography, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CategoriesList from "../components/CategoriesList";
import MadeBy from "../components/MadeBy";
import FAQ from "../components/FAQ";
import LatestLots from "../components/LatestLots";
import SpeedDialComponent from "../components/SpeedDialComponent";

const Home = () => {
  const handleAuctionClick = () => {
    const url = window.location.href;
    navigator.share({ url });
  };

  const actions = [
    { name: "Поділитися", icon: <ShareIcon />, onClick: handleAuctionClick },
  ];

  return (
    <>
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: "#01579b", mt: 15, textAlign: "center", mb: 2 }}
      ></Typography>
      <LatestLots />
      <CategoriesList />
      <FAQ />
      <Box sx={{ mt: 5, mb: 5 }}>
        <MadeBy />
      </Box>
      <SpeedDialComponent actions={actions} />
    </>
  );
};

export default Home;
