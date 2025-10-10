// import { createBrowserRouter } from "react-router-dom";
import { createBrowserRouter } from "@datadog/browser-rum-react/react-router-v6";
import { Layout } from "@views/Layout";
import { Navigate } from "react-router-dom";
import DatosPersonales from "@views/DatosPersonales";
import { Login } from "@views/Login";
import { ContextWrapper } from "@context/Wrapper";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ContextWrapper isPrivate>
        <Layout />
      </ContextWrapper>
    ),
    children: [
      {
        path: "",
        element: <Navigate to='datos-personales/sadasdas' replace />,
      },
      {
        path: "datos-personales/:idDefensoria",
        element: <DatosPersonales />,
      },
      {
        path: "situacion-laboral/:idDefensoria",
        element: <h1>Situacion Laboral</h1>,
      },
      { path: "deudas/:idDefensoria", element: <h1>Deudas</h1> },
      { path: "bienes/:idDefensoria", element: <h1>Bienes</h1> },
      { path: "historia-se/:idDefensoria", element: <h1>Historia</h1> },
      {
        path: "distribucion/:idDefensoria",
        element: <h1>Datos personales</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Error 404</h1>,
  },
]);
