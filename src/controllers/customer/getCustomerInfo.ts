import { api } from "@/api/axios";
import { z } from "zod";

export const AppointmentSchema = z.object({
    id: z.string(),
    data: z.string(),
});

export const CustomerSchema = z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    appointments: z.array(AppointmentSchema).optional(),
})

export type GetCustomerInfoResponse = z.infer<typeof CustomerSchema>;

export const getCustomerInfo = async (id: string, token: string): Promise<GetCustomerInfoResponse> => {
    const { data } = await api.get(`/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
