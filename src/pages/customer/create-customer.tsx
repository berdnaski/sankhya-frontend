import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/lib/hooks/useRegister"; 
import { toast } from 'sonner';

const RegisterCustomer = () => {
    const navigate = useNavigate();
    const { mutate, isPending, isError, error } = useRegister();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await mutate({ name, phone, password }); 
            toast.success('Cadastro realizado com sucesso!');
            navigate(`/customers/${data.id}/appointments/create`); 
        } catch {
            toast.error('Ocorreu um erro ao realizar o cadastro.');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[350px] lg:w-[550px] mx-auto">
                <CardHeader>
                    <CardTitle className="lg:text-3xl font-semibold">Cadastrar-se como cliente</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nome</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Digite o seu nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Telefone</Label>
                                <Input 
                                    id="phone" 
                                    placeholder="Digite o seu telefone" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Senha</Label>
                                <Input 
                                    id="password" 
                                    type="password"
                                    placeholder="Digite a sua senha" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="mt-4 flex w-full"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                        {isError && (
                            <p className="text-red-500 mt-2">{error.message}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterCustomer;
