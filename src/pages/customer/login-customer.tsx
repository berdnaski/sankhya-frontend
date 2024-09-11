import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginService } from "@/lib/hooks/services/customer/useLoginService";
import { toast } from "sonner";

const LoginCustomer = () => {
    const { execute, isLoading } = useLoginService(); 
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await execute({ phone, password });
            toast.success("Login realizado com sucesso!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Ocorreu um erro ao realizar o login.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-[350px] lg:w-[550px] mx-auto">
                <CardHeader>
                    <CardTitle className="lg:text-3xl font-semibold">Entrar como cliente</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="gap-2 flex flex-col">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input 
                                    id="phone" 
                                    placeholder="Digite o seu telefone" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="gap-2 flex flex-col">
                                <Label htmlFor="password">Senha</Label>
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
                            disabled={isLoading} // Use isLoading para o estado de carregamento
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginCustomer;
