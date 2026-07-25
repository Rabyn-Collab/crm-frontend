import { api } from "./api";
import { Customer } from "@/types/customer";

export interface CustomerDto {
  name: string;
  email: string;
  phone?: string;
}

export const customerApi = {
  getAll: async () => {
    //console.log('Fetching....');
    const { data } = await api.get<Customer[]>("/customers");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Customer>(`/customers/${id}`);
    return data;
  },

  create: async (dto: CustomerDto) => {
    const { data } = await api.post("/customers", dto);
    return data;
  },

  update: async (id: number, dto: CustomerDto) => {
    const { data } = await api.patch(`/customers/${id}`, dto);
    return data;
  },

  remove: async (id: number) => {
    await api.delete(`/customers/${id}`);
  },
};