import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import ListPage from "../pages/ListPage/ListPage";
import ItemPage from "../pages/ItemPage/ItemPage";
import StatsPage from "../pages/StatsPage/StatsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ListPage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "item/:id",
        element: <ItemPage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function RouterBuilder() {
  return <RouterProvider router={router} />;
}

export default RouterBuilder;
