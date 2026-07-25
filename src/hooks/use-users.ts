import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/users-api";
import { User } from "@/lib/users-api";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
  });
}