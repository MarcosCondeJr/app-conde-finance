import { AccountService } from "@/services/account.service";
import { useQuery } from "@tanstack/react-query";

export function useAccountOptions() {
    const { data = [], isLoading } = useQuery({
        queryKey: ['get-accountoptions'],
        queryFn: async () => await AccountService.getAccountOptions(),
        staleTime: 1000 * 60 * 5,
    });

    return {
        accountsOptions: data,
        isLoading
    }
}