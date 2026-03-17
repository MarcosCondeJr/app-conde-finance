import { bankService } from "@/services/bank.service";
import type { Bank } from "@/types/bank/Bank";
import type { BankRequest } from "@/types/bank/BankRequest";
import { useCallback, useEffect, useState } from "react";
import type { BankFilters } from "@/types/bank/BankFilters";

const initialFilters: BankFilters = {
  name: "",
  code: "",
  active: "",
  page: 0,
  size: 10,
  sort: "code",
  direction: "asc",
};

export function useBank() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filters, setFilters] = useState<BankFilters>(initialFilters);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBanks = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await bankService.getBanks(filters);

      setBanks(response.content);
      setTotalPages(response.page.totalPages);
      setTotalElements(response.page.totalElements);
    } catch (err) {
      console.error("Erro ao buscar bancos:", err);
      setBanks([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const createBank = useCallback(async (payload: BankRequest) => {
    try {
      await bankService.saveBank(payload);
      await fetchBanks();
      clearFilters();
    } catch (err) {
      console.error("Erro ao cadastrar banco:", err);
      throw err;
    } 
  }, []);

  const updateBank = useCallback(
    async (id: string, payload: Partial<BankRequest>) => {
      try {
        await bankService.editBank(id, payload);
        await fetchBanks();
        clearFilters();
      } catch (err) {
        console.error("Erro ao editar banco:", err);
        throw err;
      }
    },[],
  );

  const removeBank = useCallback(async (id: string) => {
    try {
      await bankService.deleteBank(id);
      await fetchBanks();
      clearFilters();
    } catch (err) {
      console.error("Erro ao remover banco:", err);
      throw err;
    }
  }, []);

  function clearFilters() {
    setFilters(initialFilters);
  }

  function changePage(page: number) {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }

  function changeSorting(sort: string) {
    setFilters((prev) => ({
      ...prev,
      page: 0,
      sort,
      direction:
        prev.sort === sort
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  }

  function updateFilter<K extends keyof BankFilters>(
    key: K,
    value: BankFilters[K],
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? Number(value) : 0,
    }));
  }

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  return {
    banks,
    filters,
    totalPages,
    totalElements,
    isLoading,
    updateFilter,
    clearFilters,
    changePage,
    changeSorting,
    refetch: fetchBanks,
    fetchBanks,
    createBank,
    updateBank,
    removeBank,
  };
}
