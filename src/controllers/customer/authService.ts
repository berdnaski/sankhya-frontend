import { api } from "@/api/axios";
import { CustomerProps, LoginCustomer, RegisterCustomer } from "@/@types/auth";

export const registerCustomer = async (customerData: RegisterCustomer): Promise<{ id: string }> => {
  try {
      const response = await api.post("/auth/register", customerData);
      return response.data;
  } catch (error) {
      console.error("Error registering customer:", error);
      throw new Error("Failed to register customer. Please try again later.");
  }
};
  

export const loginCustomer = async (customerData: LoginCustomer): Promise<string> => {
  try {
    const res = await api.post("/auth/login", customerData);
    if (res.data && res.data.token) {
      localStorage.setItem("token", res.data.token);
      return res.data.token;
    } else {
      throw new Error("Login failed! No token received.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(
      "Failed to log in. Please check your credentials and try again."
    );
  }
};

export async function fetchCustomer(token: string): Promise<CustomerProps> {
  try {
    const res = await api.get("/customers/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Customer fetched:", res.data); 
    return res.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error("Failed to fetch customer. Please try again later.");
  }
}
