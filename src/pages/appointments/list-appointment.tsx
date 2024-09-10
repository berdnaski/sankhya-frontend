import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Edit } from "lucide-react";  

const ListAppointments = () => {

    return (
        <div className="h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Listagem de Compromissos</CardTitle>
                </CardHeader>
                <CardContent>
                        <ul className="space-y-4">
                                <li className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <h3 className="text-lg font-medium">Corte de cabelo</h3>
                                        <p className="text-sm text-gray-500">27-06-2003:22:00</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </li>
                        </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default ListAppointments;
