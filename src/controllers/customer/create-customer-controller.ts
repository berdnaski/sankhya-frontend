import { z } from "zod";
import { api } from "@/api/axios";

const createCustomerSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    phone: z.string().min(1, "O telefone é obrigatório"),
    password: z.string().min(1, "A senha é obrigatória"),
});

export type CreateCustomerDTO = z.infer<typeof createCustomerSchema>;

export const createCustomer = async (data: CreateCustomerDTO) => {
    try {
        createCustomerSchema.parse(data);

        const response = await api.post('/auth/register', data);

        return response.data; 
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        throw error;
    }
};
