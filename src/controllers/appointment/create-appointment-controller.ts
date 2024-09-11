import { api } from "@/api/axios";
import { z } from "zod";

const createAppointmentSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória"),

    appointmentDate: z.string().min(1, "Data do compromisso é obrigatória"), 
});

export type AppointmentDTO = z.infer<typeof createAppointmentSchema>;

export const createAppointment = async (customerId: string, data: AppointmentDTO) => {
    try {
        createAppointmentSchema.parse(data);

        const response = await api.post(`/customers/${customerId}/appointments/create`, data);

        return response.data;
    } catch (error) {
        console.error("Failed to create appointment:", error);
        throw error;
    }
};
