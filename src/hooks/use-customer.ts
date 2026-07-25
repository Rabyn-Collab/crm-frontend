"use client";

import { customerApi, CustomerDto } from "@/lib/customer.api";
import { Customer } from "@/types/customer";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


export const customerKeys = {
  all: ["customers"] as const,
  detail: (id: number) => ["customers", id] as const,
};

export function useCustomers() {
  return useQuery<Customer[], Error>({
    queryKey: customerKeys.all,
    queryFn: customerApi.getAll,
  });
}

export function useCustomer(id: number) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customerApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: customerApi.create,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: customerKeys.all,
      });
    },
  });
}

export function useUpdateCustomer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: number;
      dto: CustomerDto;
    }) => customerApi.update(id, dto),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: customerKeys.all,
      });

      qc.invalidateQueries({
        queryKey: customerKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: customerApi.remove,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: customerKeys.all,
      });
    },
  });
}