import { api } from "@/api/axios";
import { z } from "zod";

const loginSchema = z.object({
  phone: z.string().regex(/\d{10,15}/),
  token: z.string(),
  id: z.string().uuid(),
});

export type LoginResponse = z.infer<typeof loginSchema>;

export const login = async (loginData: { phone: string, password: string }) => {
  const response = await api.post("/auth/login", loginData);
  return loginSchema.parse(response.data);
};
