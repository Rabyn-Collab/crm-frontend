import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number;

  tenantId: number;

  role: string;

  email: string;
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");

  if (!token) return null;

  return jwtDecode<JwtPayload>(token);
}

export function logout() {
  localStorage.removeItem("token");

  window.location.href = "/login";
}