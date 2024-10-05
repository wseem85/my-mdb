import { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Homepage from "./routes/homepage";
const Homepage = lazy(() => import("./routes/homepage"));
const Multimediapage = lazy(() => import("./routes/multimedia"));
import { loader as multimediaLoader } from "./routes/multimedia";
const WatchList = lazy(() => import("./routes/watch"));
const WatchedList = lazy(() => import("./routes/watched"));
import Errorpage from "./routes/error";
const AppLayout = lazy(() => import("./ui/appLayout"));
// import { loader as trendingLoader } from "./routes/homepage";
import Loading from "./ui/loading";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Errorpage />,

    children: [
      {
        // path: "homepage",
        index: true,
        element: <Homepage />,
      },
      {
        path: "multimedia/:type/:id",
        element: <Multimediapage />,
        loader: multimediaLoader,
      },
      {
        path: "watched",
        element: <WatchedList />,
      },
      {
        path: "watch",
        element: <WatchList />,
      },
      { path: "*", element: <Errorpage /> },
    ],
  },
]);
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

export default App;
