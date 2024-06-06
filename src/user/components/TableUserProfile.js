import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const roleMap = {
  ADMIN: { label: "Адміністратор", color: "primary" },
  SELLER: { label: "Продавець", color: "success" },
  BUYER: { label: "Покупець", color: "secondary" },
};

const TableUserProfile = ({ user, isSeller }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCompanySite, setCopiedCompanySite] = useState(false);

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 1500);
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Ім'я:</TableCell>
          <TableCell>{user?.firstName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Прізвище:</TableCell>
          <TableCell>{user?.lastName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>По-батькові:</TableCell>
          <TableCell>{user?.patronymic || "Поле порожнє"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Email:</TableCell>
          <TableCell>
            {user?.email}
            <Tooltip
              open={copiedEmail}
              onClose={() => setCopiedEmail(false)}
              title="Скопійовано"
            >
              <IconButton
                size="small"
                onClick={() => handleCopy(user?.email, setCopiedEmail)}
                sx={{ ml: 1 }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Номер телефону:</TableCell>
          <TableCell>{user?.phoneNumber || "Поле порожнє"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Роль:</TableCell>
          <TableCell>
            {roleMap[user?.role] && (
              <Chip
                label={roleMap[user?.role].label}
                color={roleMap[user?.role].color}
              />
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Дата реєстрації:</TableCell>
          <TableCell>
            {user?.createdAt && format(new Date(user?.createdAt), "dd.MM.yyyy")}
          </TableCell>
        </TableRow>
        {isSeller && (
          <>
            <TableRow>
              <TableCell>Назва компанії</TableCell>
              <TableCell>{user?.companyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Сайт компанії</TableCell>
              <TableCell>
                {user?.companySite || "Поле порожнє"}
                {user?.companySite && (
                  <Tooltip
                    open={copiedCompanySite}
                    onClose={() => setCopiedCompanySite(false)}
                    title="Скопійовано"
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleCopy(user?.companySite, setCopiedCompanySite)
                      }
                      sx={{ ml: 1 }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Позиція в компанії</TableCell>
              <TableCell>{user?.position}</TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default TableUserProfile;
