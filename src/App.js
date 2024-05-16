import React from "react";
import { RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

import { router } from "./routes/router";

import "./App.css";
import { AuthMiddleware } from "./shared/middleware/AuthMiddleware";

const App = () => {
  return (
    <Provider store={store}>
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>
    </Provider>
  );
};

export default App;
