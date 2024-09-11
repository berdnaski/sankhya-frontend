import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Edit, Loader } from "lucide-react";
import { useListAppointments } from "@/lib/hooks/services/appointments/use-list-appointment";

const ListAppointments = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const { data: appointments, isLoading, isError, error } = useListAppointments(customerId || '');
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Erro ao carregar compromissos: {error?.message}</p>
            </div>
        );
    }

    if (!appointments || appointments.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen flex-col gap-2">
              <p>Sem compromissos agendados.</p>
              <Button
                variant="outline"
                aria-label="Adicionar compromisso"
                onClick={() => {
                  const path = window.location.pathname;
                  navigate(`${path}/create`);
                }}
              >
                Adicionar compromisso
              </Button>
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Seus Compromissos</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {appointments.map((appointment) => (
                            <li key={appointment.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <h3 className="text-lg font-medium">{appointment.description}</h3>
                                    <p className="text-sm text-gray-500">{appointment.appointmentDate}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" aria-label="Excluir compromisso">
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" aria-label="Editar compromisso">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default ListAppointments;
