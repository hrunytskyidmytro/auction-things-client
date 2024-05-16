import { useDispatch, useSelector } from "react-redux";
import { logOut as resetState } from "../../store/authSlice";
import { setToken, selectUser, selectToken } from "../../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    dispatch(setToken(userToken));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(resetState());
  };

  return {
    saveToken,
    logOut,
    token,
    user,
    isLoggedIn: !!token,
  };
};
