import { useQuery } from "@tanstack/react-query";
import { QK_LIST_APPOINTMENT } from "@/lib/constants/query-constants";
import { Appointment, listAppointments } from "@/controllers/appointment/list-appointment-controller";

export const useListAppointments = (customerId: string) => {
    const query = useQuery({
        queryKey: [QK_LIST_APPOINTMENT, customerId],
        queryFn: () => listAppointments(customerId),
        enabled: !!customerId,
    });

    return {
        data: query.data as Appointment[] | undefined,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
};
