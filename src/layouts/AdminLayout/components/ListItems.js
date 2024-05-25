import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useNavigate } from "react-router-dom";

const MainListItem = ({ to, primary, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};

export const mainListItems = (
  <>
    <>
      <MainListItem to="/" primary="Головна панель" icon={<DashboardIcon />} />
      <MainListItem to="#" primary="Замовлення" icon={<ShoppingCartIcon />} />
      <MainListItem to="#" primary="Користувачі" icon={<PeopleIcon />} />
      <MainListItem to="/admin/lots" primary="Лоти" icon={<BarChartIcon />} />
      <MainListItem to="#" primary="Інтеграції" icon={<LayersIcon />} />
    </>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);
