import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../shared/hooks/useAuth";
import { setUser } from "../../store/authSlice";
import { useLazyGetCurrentUserInfoQuery } from "../../api/userApi";
import { useDispatch } from "react-redux";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [getCurrentUser] = useLazyGetCurrentUserInfoQuery();

  const { saveToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      saveToken(token);
      getCurrentUser({ token })
        .unwrap()
        .then((res) => dispatch(setUser(res)))
        .catch((error) => console.log(error));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, location]);

  return <div>Перенаправлення...</div>;
};

export default GoogleAuthCallback;
