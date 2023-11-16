import "./scss/App.scss";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error, SignUp, Login, Home, Report, Navbar } from "./pages";

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
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
