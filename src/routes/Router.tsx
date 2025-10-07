// import { createBrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "@datadog/browser-rum-react/react-router-v6";
import { Layout } from "@/views/Layout";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <h1>Login</h1>
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Navigate to="datos-personales/sadasdas" replace /> },
      { path: "datos-personales/:clientId", element: <h1>Datos personales</h1> },
      { path: "situacion-laboral/:clientId", element: <h1>Datos personales</h1> },
      { path: "deudas/:clientId", element: <h1>Datos personales</h1> },
      { path: "bienes/:clientId", element: <h1>Datos personales</h1> },
      { path: "historia-se/:clientId", element: <h1>Datos personales</h1> },
      { path: "distribucion/:clientId", element: <h1>Datos personales</h1> },
    ]
  },
  {
    path: "*",
    element: <h1>Error 404</h1>
  }
]);
