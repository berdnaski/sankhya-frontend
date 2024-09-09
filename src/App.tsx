import { createBrowserRouter } from "react-router-dom";
import CreateAppointment from "./pages/appointments/create-appointment";
import RegisterCustomer from "./pages/customer/create-customer";
import LoginCustomer from "./pages/customer/login-customer";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <RegisterCustomer />
      },
      {
        path: "/login",
        element: <LoginCustomer />
      },
      {
        path: "/customers/:customerId/appointments",
        element: <CreateAppointment />
      }
    ]
  }
])

export { router }