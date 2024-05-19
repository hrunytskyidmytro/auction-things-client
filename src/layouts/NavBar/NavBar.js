import React, { useState } from "react";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "../../shared/components/ToggleColorMode";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../../shared/hooks/useAuth";

// const logoStyle = {
//   width: "140px",
//   height: "auto",
//   cursor: "pointer",
// };

const AppAppBar = ({ mode, toggleColorMode }) => {
  const [open, setOpen] = useState(false);

  const { isLoggedIn, logOut } = useAuth();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const scrollToSection = (sectionId) => {
  //   const sectionElement = document.getElementById(sectionId);
  //   const offset = 128;
  //   if (sectionElement) {
  //     const targetScroll = sectionElement.offsetTop - offset;
  //     sectionElement.scrollIntoView({ behavior: "smooth" });
  //     window.scrollTo({
  //       top: targetScroll,
  //       behavior: "smooth",
  //     });
  //     setOpen(false);
  //   }
  // };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          fontSize: 7,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "#01579b" }}
              >
                <Link to="/" component={RouterLink} underline="hover">
                  AUCTION-THINGS
                </Link>
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  // onClick={() => scrollToSection("features")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    <Link to="/lots" component={RouterLink} underline="hover">
                      Lots
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem
                  // onClick={() => scrollToSection("testimonials")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>
                <MenuItem
                  // onClick={() => scrollToSection("highlights")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem
                  // onClick={() => scrollToSection("pricing")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  // onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {isLoggedIn ? (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={logOut}
                  >
                    Вийти
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component={RouterLink}
                    to="/login"
                  >
                    Увійти
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component={RouterLink}
                    to="/select-role"
                  >
                    Зареєструватися
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem>Features</MenuItem>
                  <MenuItem>Testimonials</MenuItem>
                  <MenuItem>Highlights</MenuItem>
                  <MenuItem>Pricing</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component={RouterLink}
                      to="#"
                      sx={{ width: "100%" }}
                    >
                      Зареєструватися
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={RouterLink}
                      to="/login"
                      sx={{ width: "100%" }}
                    >
                      Увійти
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
