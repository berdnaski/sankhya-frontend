import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/api/axios";

const CreateAppointment = () => {
    const { customerId } = useParams();
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const appointmentData = {
                description,
                appointmentDate: date
            };
            const res = await api.post(`/customers/${customerId}/appointments`, appointmentData);
            console.log('Compromisso criado com sucesso:', res.data);

            setDescription('');
            setDate('');
        } catch {
            console.log('Erro ao criar compromisso:');
        }
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
                                    placeholder="Digite a descrição do compromisso"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="date">Data</Label>
                                <Input
                                    id="date"
                                    type="datetime-local"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-4"
                                type="submit"
                            >
                                Criar Compromisso
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateAppointment;
