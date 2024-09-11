import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateAppointment } from '@/lib/hooks/services/appointments/use-create-appointment';
import { useStorage } from '@/lib/hooks/useStorage';

const CreateAppointment = () => {
    const { customerId } = useParams(); 
    const navigate = useNavigate();
    const { mutate, isPending, isError, isSuccess, error } = useCreateAppointment();
    const { removeStorageItem } = useStorage();

    const [description, setDescription] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!customerId) {
            console.error('Customer ID is required');
            return;
        }

        mutate({ customerId, appointment: { description, appointmentDate } }, {
            onSuccess: () => {
                navigate(`/customers/${customerId}/appointments`);
            },
            onError: (error) => {
                console.error('Failed to create appointment:', error);
            }
        });
    };

    const handleLogout = () => {
        removeStorageItem('auth-token');
        navigate('/login');
    };

    return (
        <div className="h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Criar Novo Compromisso</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Digite a descrição do compromisso"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="appointmentDate">Data</Label>
                                <Input
                                    id="appointmentDate"
                                    type="datetime-local"
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-4"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? 'Criando...' : 'Criar Compromisso'}
                            </Button>
                            {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
                            {isSuccess && <p className="text-green-500 mt-2">Compromisso criado com sucesso!</p>}
                        </div>
                    </form>
                    <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateAppointment;
