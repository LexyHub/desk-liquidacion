import { createBrowserRouter } from "react-router-dom";
// import { createBrowserRouter } from "@datadog/browser-rum-react/react-router-v6";
import { Layout } from "@app/Layout";
import { Navigate } from "react-router-dom";
import { Login } from "@features/auth/views/Login";
import { ContextWrapper } from "@app/Wrapper";
import { lazy } from "react";

const DatosPersonales = lazy(
  () => import("@features/datos-personales/views/DatosPersonales")
);
const SituacionLaboral = lazy(
  () => import("@features/situacion-laboral/views/SituacionLaboral")
);
const Deudas = lazy(() => import("@features/deudas/views/Deudas"));
const Bienes = lazy(() => import("@features/bienes/views/Bienes"));
const HSE = lazy(
  () => import("@features/historia-sobreendeudamiento/views/HSE")
);
const Distribucion = lazy(
  () => import("@features/distribucion/views/Distribucion")
);

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
      { path: "bienes/:idDefensoria", element: <Bienes /> },
      { path: "historia-se/:idDefensoria", element: <HSE /> },
      {
        path: "distribucion/:idDefensoria",
        element: <Distribucion />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Error 404</h1>,
  },
]);
