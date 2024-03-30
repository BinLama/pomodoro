import "./scss/App.scss";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error, SignUpPage, LoginPage, Home, Report, Navbar } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "report",
        element: <Report />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
