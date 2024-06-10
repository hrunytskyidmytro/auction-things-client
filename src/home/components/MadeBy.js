import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";

const whiteLogos = [
  "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Status_iucn_EX_icon_blank.svg/120px-Status_iucn_EX_icon_blank.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  "https://cdn.worldvectorlogo.com/logos/redux.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/993px-Postgresql_elephant.svg.png",
  "https://static-00.iconduck.com/assets.00/material-ui-icon-2048x1626-on580ia9.png",
];

const darkLogos = [
  "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
  "https://www.svgrepo.com/show/330398/express.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  "https://cdn.worldvectorlogo.com/logos/redux.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/993px-Postgresql_elephant.svg.png",
  "https://static-00.iconduck.com/assets.00/material-ui-icon-2048x1626-on580ia9.png",
];

const logoStyle = {
  width: "84px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

const MadeBy = () => {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="h6"
        align="center"
        color="text.secondary"
        fontWeight={600}
        sx={{ mb: 5 }}
      >
        Зроблено за допомогою
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={{
                ...logoStyle,
                width: index === 0 ? "85px" : "96px",
                margin: index === 0 ? "0 16px" : "0 32px",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MadeBy;
