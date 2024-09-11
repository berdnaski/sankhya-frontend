import { createBrowserRouter } from "react-router-dom";
import CreateAppointment from "./pages/appointments/create-appointment";
import RegisterCustomer from "./pages/customer/create-customer";
import LoginCustomer from "./pages/customer/login-customer";
import ListAppointments from "./pages/appointments/list-appointment";
import { AuthComponent } from "./components/ui/auth-component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterCustomer />,
  },
  {
    path: "/login",
    element: <LoginCustomer />,
  },
  {
    path: "/customers/:customerId/appointments/create",
    element: (
      <AuthComponent>
        <CreateAppointment />
      </AuthComponent>
    ),
  },
  {
    path: "/customers/:customerId/appointments",
    element: (
      <AuthComponent>
        <ListAppointments />
      </AuthComponent>
    ),
  },
]);

export { router };
