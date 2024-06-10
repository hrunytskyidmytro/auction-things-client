import * as React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import Logout from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";

const MainListItem = ({ to, primary, icon, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};

const MainListItems = () => {
  const { logOut } = useAuth();

  return (
    <>
      <MainListItem to="/admin" primary="Головна панель" icon={<DashboardIcon />} />
      <MainListItem
        to="/admin/users"
        primary="Користувачі"
        icon={<PeopleIcon />}
      />
      <MainListItem to="/admin/lots" primary="Лоти" icon={<GavelIcon />} />
      <MainListItem
        to="/admin/auction-histories"
        primary="Історія лотів"
        icon={<HistoryEduOutlinedIcon />}
      />
      <MainListItem
        to="/admin/bids"
        primary="Ставки"
        icon={<AttachMoneyIcon />}
      />
      <MainListItem
        to="/admin/categories"
        primary="Категорії"
        icon={<CategoryIcon />}
      />
      <MainListItem
        to="/admin/payments"
        primary="Платежі"
        icon={<PaymentsOutlinedIcon />}
      />
      <MainListItem
        to="/admin/orders"
        primary="Замовлення"
        icon={<ListAltIcon />}
      />
      <MainListItem
        to="/admin/statistics"
        primary="Статистика"
        icon={<BarChartIcon />}
      />
      <MainListItem primary="Вихід" icon={<Logout />} onClick={logOut} />
    </>
  );
};

export default MainListItems;
