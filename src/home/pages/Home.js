import * as React from "react";
import { Typography } from "@mui/material";
import CategoriesList from "../components/CategoriesList";

import { useAuth } from "../../shared/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: "#01579b", mt: 15, textAlign: "center", mb: 2 }}
      >
        {user?.firstName}
      </Typography>
      <CategoriesList />
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
      ></Typography>
    </>
  );
};

export default Home;
