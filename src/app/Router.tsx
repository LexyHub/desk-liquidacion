import { createBrowserRouter } from "react-router-dom";
// import { createBrowserRouter } from "@datadog/browser-rum-react/react-router-v6";
import { Layout } from "@app/Layout";
import { Navigate } from "react-router-dom";
// import DatosPersonales from "@views/DatosPersonales";
import { Login } from "@features/auth/views/Login";
import { ContextWrapper } from "@app/Wrapper";
import { lazy } from "react";
// import { SituacionLaboral } from "@views/SituacionLaboral";

const DatosPersonales = lazy(
  () => import("@features/clientes/views/DatosPersonales")
);
const SituacionLaboral = lazy(
  () => import("@features/clientes/views/SituacionLaboral")
);
const Deudas = lazy(() => import("@features/deudas/views/Deudas"));

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
        element: <SituacionLaboral />,
      },
      { path: "deudas/:idDefensoria", element: <Deudas /> },
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
