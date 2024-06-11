import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Divider,
  Typography,
  MenuItem,
  Drawer,
  Avatar,
  Tooltip,
  Menu,
  IconButton,
  ListItemIcon,
  Chip,
  alpha,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import ToggleColorMode from "../../shared/components/ToggleColorMode";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";
import WatchlistModal from "../../watchlists/components/WatchlistModal";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { useGetWatchlistByUserIdQuery } from "../../api/watchlistApi";

const logoStyle = {
  marginTop: "9px",
  marginLeft: "16px",
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const AppAppBar = ({ mode, toggleColorMode }) => {
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openWatchlistModal, setOpenWatchlistModal] = useState(false);

  const {
    isLoggedIn,
    logOut,
    user,
    errorToken,
    setErrorToken,
    isAdmin,
    isSeller,
  } = useAuth();

  const { data: watchlist } = useGetWatchlistByUserIdQuery(user?.id);

  const navigate = useNavigate();

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCloseMenuAndDrawer = (path) => () => {
    navigate(path);
    handleCloseUserMenu();
    setOpen(false);
  };

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const handleOpenWatchlistModal = () => {
    setOpenWatchlistModal(true);
    handleCloseUserMenu();
  };

  const handleCloseWatchlistModal = () => {
    setOpenWatchlistModal(false);
    handleCloseUserMenu();
  };

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
                  ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                  : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
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
                fontWeight={500}
                sx={{ color: "#01579b" }}
                onClick={() => navigate("/")}
              >
                <img src="/logo.png" style={logoStyle} alt="Логотип" />
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => navigate("lots")}
                >
                  <Typography variant="body2" color="text.primary">
                    Лоти
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => navigate("sell-on-bid&win")}
                >
                  <Typography variant="body2" color="text.primary">
                    Продати на Bid&Win
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => navigate("buying-tips")}
                >
                  <Typography variant="body2" color="text.primary">
                    Поради щодо купівлі
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => navigate("about-us")}
                >
                  <Typography variant="body2" color="text.primary">
                    Про нас
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => navigate("faq")}
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
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Відкрити налаштування">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          sx={{ bgcolor: blue[700] }}
                          {...stringAvatar(
                            `${user?.firstName} ${user?.lastName}`
                          )}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transitionDuration={400}
                    >
                      <MenuItem
                        onClick={handleCloseMenuAndDrawer("/user-profile")}
                      >
                        <Avatar
                          sx={{ mr: 1 }}
                          alt={`${user?.firstName} ${user?.lastName}`}
                        />
                        {`${user?.firstName} ${user?.lastName}`}
                        {isAdmin && (
                          <Chip
                            label="Admin"
                            size="small"
                            color="primary"
                            sx={{ m: 1 }}
                          />
                        )}
                        {isSeller && (
                          <Chip
                            label="Seller"
                            size="small"
                            color="success"
                            sx={{ m: 1 }}
                          />
                        )}
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={handleCloseMenuAndDrawer(
                          "/change-balance-action"
                        )}
                      >
                        <ListItemIcon>
                          <CreditCardIcon fontSize="small" />
                        </ListItemIcon>
                        Баланс:{" "}
                        <Chip
                          label={`${user?.balance} грн.`}
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </MenuItem>
                      <Divider />
                      {isAdmin && (
                        <MenuItem onClick={handleCloseMenuAndDrawer("/admin")}>
                          <ListItemIcon>
                            <AdminPanelSettingsTwoToneIcon fontSize="small" />
                          </ListItemIcon>
                          Адмін панель
                        </MenuItem>
                      )}
                      {isSeller && (
                        <MenuItem
                          onClick={handleCloseMenuAndDrawer(
                            `/seller/${user.id}`
                          )}
                        >
                          <ListItemIcon>
                            <GavelTwoToneIcon fontSize="small" />
                          </ListItemIcon>
                          Мої лоти
                        </MenuItem>
                      )}
                      <MenuItem onClick={handleOpenWatchlistModal}>
                        <ListItemIcon>
                          <BookmarkIcon fontSize="small" />
                        </ListItemIcon>
                        Список відстеження
                      </MenuItem>
                      <MenuItem onClick={logOut}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Вихід
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="outlined"
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
                  <MenuItem
                    sx={{ py: "6px", px: "12px" }}
                    onClick={handleCloseMenuAndDrawer("lots")}
                  >
                    <Typography variant="body2" color="text.primary">
                      Лоти
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ py: "6px", px: "12px" }}
                    onClick={handleCloseMenuAndDrawer("sell-on-bid&win")}
                  >
                    <Typography variant="body2" color="text.primary">
                      Продати на Bid&Win
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ py: "6px", px: "12px" }}
                    onClick={handleCloseMenuAndDrawer("buying-tips")}
                  >
                    <Typography variant="body2" color="text.primary">
                      Поради щодо купівлі
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ py: "6px", px: "12px" }}
                    onClick={handleCloseMenuAndDrawer("about-us")}
                  >
                    <Typography variant="body2" color="text.primary">
                      Про нас
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ py: "6px", px: "12px" }}
                    onClick={handleCloseMenuAndDrawer("faq")}
                  >
                    <Typography variant="body2" color="text.primary">
                      FAQ
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {isLoggedIn ? (
                    <>
                      <Box
                        sx={{
                          flexGrow: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Відкрити налаштування">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
                            <Avatar
                              sx={{ bgcolor: blue[700] }}
                              {...stringAvatar(
                                `${user?.firstName} ${user?.lastName}`
                              )}
                            />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                        >
                          <MenuItem
                            onClick={handleCloseMenuAndDrawer("/user-profile")}
                          >
                            <Avatar
                              sx={{ mr: 1 }}
                              alt={`${user?.firstName} ${user?.lastName}`}
                            />
                            {`${user?.firstName} ${user?.lastName}`}
                            {isAdmin && (
                              <Chip
                                label="Admin"
                                size="small"
                                color="primary"
                                sx={{ m: 1 }}
                              />
                            )}
                            {isSeller && (
                              <Chip
                                label="Seller"
                                size="small"
                                color="success"
                                sx={{ m: 1 }}
                              />
                            )}
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            onClick={handleCloseMenuAndDrawer(
                              "/change-balance-action"
                            )}
                          >
                            <ListItemIcon>
                              <CreditCardIcon fontSize="small" />
                            </ListItemIcon>
                            Баланс:{" "}
                            <Chip
                              label={`${user?.balance} грн.`}
                              variant="outlined"
                              sx={{ ml: 1 }}
                            />
                          </MenuItem>
                          <Divider />
                          {isAdmin && (
                            <MenuItem
                              onClick={handleCloseMenuAndDrawer("/admin")}
                            >
                              <ListItemIcon>
                                <AdminPanelSettingsTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              Адмін панель
                            </MenuItem>
                          )}
                          {isSeller && (
                            <MenuItem
                              onClick={handleCloseMenuAndDrawer(
                                `/seller/${user.id}`
                              )}
                            >
                              <ListItemIcon>
                                <GavelTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              Мої лоти
                            </MenuItem>
                          )}
                          <MenuItem onClick={handleOpenWatchlistModal}>
                            <ListItemIcon>
                              <BookmarkIcon fontSize="small" />
                            </ListItemIcon>
                            Список відстеження
                          </MenuItem>
                          <MenuItem onClick={logOut}>
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            Вихід
                          </MenuItem>
                        </Menu>
                      </Box>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                          component={RouterLink}
                          to="/select-role"
                        >
                          Зареєструватися
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          size="small"
                          component={RouterLink}
                          to="/login"
                        >
                          Увійти
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <WatchlistModal
        openWatchlistModal={openWatchlistModal}
        handleCloseWatchlistModal={handleCloseWatchlistModal}
        watchlist={watchlist}
        user={user}
      />
      <MessageSnackbar
        open={errorToken}
        onClose={() => setErrorToken(false)}
        severity="error"
        message={"Час токену вийшов, будь ласка, авторизуйтесь знову."}
      />
    </div>
  );
};

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
