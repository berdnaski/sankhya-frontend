import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CardCustomer = () => {
    return ( 
        <div className="h-screen justify-center flex items-center">
            <Card className="w-[350px] lg:w-[550px]  mx-auto">
                <CardHeader>
                <CardTitle className="lg:text-3xl font-semibold">Cadastrar-se como cliente</CardTitle>
                </CardHeader>

                <CardContent>
                <form>
                    <div className="flex flex-col gap-4">
                    <div className="gap-2 flex flex-col">
                        <Label>Nome</Label>
                        <Input id="name" placeholder="Digite o seu nome" />
                    </div>
                    <div className="gap-2 flex flex-col">
                        <Label>Telefone</Label>
                        <Input id="phone" placeholder="Digite o seu telefone" />
                    </div>
                    </div>
                    <Button variant="outline" className="mt-4 flex w-full">Cadastrar</Button>
                </form>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default CardCustomer;