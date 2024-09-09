import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/lib/hooks/useAuth";

const RegisterCustomer = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { mutate: register, isPending, isError, error } = useRegister(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        register({ name, phone, password }, {
            onSuccess: (data) => {
                navigate(`/customers/${data.phone}/appointments`);
            },
            onError: (error) => {
                console.error('Erro ao cadastrar cliente:', error);
            }
        });
    };

    return ( 
        <div className="h-screen justify-center flex items-center">
            <Card className="w-[350px] lg:w-[550px] mx-auto">
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
                            <div className="gap-2 flex flex-col">
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
