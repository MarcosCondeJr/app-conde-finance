import { bankService } from "@/services/bank.service";
import { useQuery } from "@tanstack/react-query";

export function useBankOptions() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["get-bank-options"],
    queryFn: async () => bankService.getBankOptions(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    banksOptions: data,
    isLoading,
  };
}