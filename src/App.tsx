import { createBrowserRouter } from "react-router-dom";
import CardCustomer from "./pages/card-customer";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <CardCustomer />
      },
    ]
  }
])

export { router }