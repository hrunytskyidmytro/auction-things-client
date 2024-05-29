import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GavelIcon from "@mui/icons-material/Gavel";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";

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
      <MainListItem
        to="/admin/users"
        primary="Користувачі"
        icon={<PeopleIcon />}
      />
      <MainListItem to="/admin/lots" primary="Лоти" icon={<GavelIcon />} />
      <MainListItem
        to="/admin/auction-history"
        primary="Історія лотів"
        icon={<HistoryEduOutlinedIcon />}
      />
      <MainListItem
        to="/admin/bids"
        primary="Ставки"
        icon={<AttachMoneyIcon />}
      />
      <MainListItem
        to="/admin/payments"
        primary="Платежі"
        icon={<PaymentsOutlinedIcon />}
      />
      <MainListItem
        to="/admin/transactions"
        primary="Транзакції"
        icon={<PaidOutlinedIcon />}
      />
      <MainListItem
        to="/admin/categories"
        primary="Категорії"
        icon={<CategoryIcon />}
      />
      <MainListItem
        to="/admin/reviews"
        primary="Відгуки"
        icon={<RateReviewIcon />}
      />
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
