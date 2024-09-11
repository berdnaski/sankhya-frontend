import { AppointmentDTO, createAppointment } from "@/controllers/appointment/create-appointment-controller";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateAppointment = () => {
    const createAppointmentMutation = useMutation({
        mutationFn: ({ customerId, appointment }: { customerId: string; appointment: AppointmentDTO }) => 
            createAppointment(customerId, appointment),
        onError: (error) => {
            console.error("Error creating appointment:", error);
            toast.error("Failed to create appointment.");
        },
        onSuccess: () => {
            toast.success("Appointment created successfully!");
        },
    });

    return createAppointmentMutation;
};
