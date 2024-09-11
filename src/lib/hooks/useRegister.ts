import { useMutation } from "@tanstack/react-query";
import { registerCustomer } from "@/controllers/customer/authService";
import { RegisterCustomer } from "@/@types/auth";

export function useRegister() {
  const mutation = useMutation({
    mutationFn: registerCustomer,
    onError: (error) => {
      console.error('Erro ao registrar cliente:', error);
    },
  });

  return {
    mutate: mutation.mutate as (data: RegisterCustomer) => Promise<{ id: string }>, 
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error,
  };
}
