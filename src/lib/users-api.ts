import { api } from "./api";

export interface Tenant {
  id: number;
  name: string;
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
  tenantId: number | null;
  createdAt: string;
  updatedAt: string;
  tenant: Tenant | null;
}

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");
    return data;
  },
};