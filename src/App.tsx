import { createBrowserRouter } from "react-router-dom";
import CardCustomer from "./pages/customer/card-customer";
import CreateAppointment from "./pages/appointments/create-appointment";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <CardCustomer />
      },
      {
        path: "/customers/:customerId/appointments",
        element: <CreateAppointment />
      }
    ]
  }
])

export { router }