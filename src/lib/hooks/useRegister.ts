import { api } from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useStorage } from './useStorage';
import { AuthResponse, LoginUser, RegisterUser } from '@/@types/auth';

export function useRegister() {
  const { setStorageItem } = useStorage();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userData: RegisterUser) => {
      const { data } = await api.post<AuthResponse>('/auth/register', userData);
      return data;
    },
    onSuccess: (data) => {
      setStorageItem('authToken', data.token);
      navigate(`/customers/${data.phone}/appointments`);
      toast.success('Cliente cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}

export function useLogin() {
  const { setStorageItem, removeStorageItem } = useStorage();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (userData: LoginUser) => {
      const { data } = await api.post<AuthResponse>('/auth/login', userData);
      return data;
    },
    onSuccess: (data) => {
      setStorageItem('authToken', data.token);
      navigate(`/customers/${data.phone}/appointments`);
      toast.success('Login realizado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const logout = () => {
    removeStorageItem('authToken');
    navigate("/login");
  };

  return { ...mutation, logout };
}
