import { api } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardCustomer = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate(); // Hook para redirecionar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post('/customers', { name, phone });
            console.log('Cliente cadastrado com sucesso:', res.data);

            const customerId = res.data.id; // Supondo que a resposta inclui o ID do cliente
            setName('');
            setPhone('');

            // Redireciona para a página de criação de compromissos
            navigate(`/customers/${customerId}/appointments`);
        } catch {
            console.log('Erro ao cadastrar cliente:');
        }
    }

    return ( 
        <div className="h-screen justify-center flex items-center">
            <Card className="w-[350px] lg:w-[550px]  mx-auto">
                <CardHeader>
                <CardTitle className="lg:text-3xl font-semibold">Cadastrar-se como cliente</CardTitle>
                </CardHeader>

                <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="gap-2 flex flex-col">
                            <Label>Nome</Label>
                            <Input 
                                id="name" 
                                placeholder="Digite o seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="gap-2 flex flex-col">
                            <Label>Telefone</Label>
                            <Input 
                                id="phone" 
                                placeholder="Digite o seu telefone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        className="mt-4 flex w-full"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </form>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default CardCustomer;
