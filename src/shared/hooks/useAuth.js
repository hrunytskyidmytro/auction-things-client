import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut as resetState } from "../../store/authSlice";
import {
  setUser,
  setToken,
  selectUser,
  selectToken,
} from "../../store/authSlice";

import { useLazyGetCurrentUserInfoQuery } from "../../api/userApi";

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const [getCurrentUser, { error }] = useLazyGetCurrentUserInfoQuery();

  const [errorToken, setErrorToken] = useState(false);

  useEffect(() => {
    if (token) {
      getCurrentUser({ token })
        .unwrap()
        .then((res) => dispatch(setUser(res)))
        .catch((error) => console.log(error));
    }
  }, [token, getCurrentUser]);

  useEffect(() => {
    if (error && error.status === 401) {
      localStorage.removeItem("token");
      dispatch(resetState());
      setErrorToken(true);
    }
  }, [error, dispatch]);

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    dispatch(setToken(userToken));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(resetState());
  };

  const isAdmin = user?.role === "ADMIN";
  const isSeller = user?.role === "SELLER";
  const isBuyer = user?.role === "BUYER";

  return {
    saveToken,
    logOut,
    token,
    user,
    isLoggedIn: !!token,
    errorToken,
    setErrorToken,
    isAdmin,
    isSeller,
    isBuyer,
  };
};
