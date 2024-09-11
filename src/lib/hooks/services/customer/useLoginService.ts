import { getCustomerInfo, GetCustomerInfoResponse } from "@/controllers/customer/getCustomerInfo";
import { login, LoginResponse } from "@/controllers/customer/login";
import { AUTH_TOKEN, QK_CUSTOMER } from "@/lib/constants/query-constants";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStorage } from "../../useStorage";

export const useLoginService = () => {
  const { getStorageItem, setStorageItem, removeStorageItem } = useStorage();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data: LoginResponse) => {
      console.log("Login Response:", data);
      setStorageItem(AUTH_TOKEN, data.token);
  
      try {
        const token = data.token;
        const customer = await getCustomerInfo(data.id, token);
        console.log("Customer", customer);
        setStorageItem(QK_CUSTOMER, JSON.stringify(customer));
        
        // Redirecionar para a lista de compromissos
        navigate(`/customers/${customer.id}/appointments`);
      } catch (error) {
        console.error("Error fetching customer information or appointments:", error);
        toast.error("Não foi possível obter as informações do cliente ou compromissos.");
      }
    },
  });

  const execute = async ({
    phone,
    password,
  }: {
    phone: string;
    password: string;
  }) => {
    await loginMutation.mutateAsync({ phone, password });
  };

  const logout = () => {
    removeStorageItem(AUTH_TOKEN);
    removeStorageItem(QK_CUSTOMER);
    navigate("/login");
  };

  const getInfoToken = (): GetCustomerInfoResponse | null => {
    const customerStr = getStorageItem(QK_CUSTOMER);

    if (!customerStr) {
      return null;
    }

    return JSON.parse(customerStr);
  };

  return {
    execute,
    logout,
    getInfoToken,
    isLoading: loginMutation.isPending, 
    isFinished: loginMutation.isSuccess,
  };
};
