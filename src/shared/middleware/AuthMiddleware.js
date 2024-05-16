import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/authSlice";
import { useLazyGetCurrentUserInfoQuery } from "../../api/userApi";

export const AuthMiddleware = ({ children }) => {
  const dispatch = useDispatch();
  const [getCurrentUser] = useLazyGetCurrentUserInfoQuery();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    dispatch(setToken(token));
    getCurrentUser({ token })
      .unwrap()
      .then((res) => dispatch(setUser(res)))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return "Завантаження...";
  }

  return children;
};
