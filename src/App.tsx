import { createBrowserRouter } from "react-router-dom";
import CreateAppointment from "./pages/appointments/create-appointment";
import RegisterCustomer from "./pages/customer/create-customer";
import LoginCustomer from "./pages/customer/login-customer";
import ListAppointments from "./pages/appointments/list-appointment";

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
      },
      {
        path: "/customers/:customerId/appointments/:id",
        element: <ListAppointments />  
      }
    ]
  }
])

export { router }