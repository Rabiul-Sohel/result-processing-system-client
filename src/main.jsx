import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/MainRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProviders from "./Providers/Auth/AuthProviders.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router}></RouterProvider>
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
