import { api } from "./api";
import { LoginFormData } from "@/components/login-form";

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
  role: "SUPER_ADMIN" | "ADMIN" | "MEMBER";
  tenantId: number;
  createdAt: string;
  updatedAt: string;
  tenant: Tenant;
}

export interface CreateUserFormData {
  email: string;
  password: string;
  tenantId: number;
}

export const authApi = {
  async login(loginData: LoginFormData) {
    const { data } = await api.post("/auth/login", loginData);
    return data;
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  async createUser(userData: CreateUserFormData) {
    console.log('helllllllllllllllo jee');
    const { data } = await api.post("/users", userData);
    return data;
  },

  async logout() {
    await api.post("/auth/logout");
  },
};