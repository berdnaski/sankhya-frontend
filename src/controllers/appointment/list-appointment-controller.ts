import { api } from "@/api/axios";
import { z } from "zod";

const appointmentSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    date: z.string(),
});

export type Appointment = z.infer<typeof appointmentSchema>;

const appointmentListSchema = z.array(appointmentSchema);

export type AppointmentList = z.infer<typeof appointmentListSchema>;

export const listAppointments = async (customerId: string): Promise<AppointmentList> => {
    try {
        const response = await api.get(`/customers/${customerId}/appointments`);
        
        return appointmentListSchema.parse(response.data);
    } catch (error) {
        console.error("Failed to list appointments:", error);
        throw error;
    }
};
