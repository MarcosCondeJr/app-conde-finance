import { bankService } from "@/services/bank.service";
import type { PageInfo } from "@/types/pagination/PageInfo";
import type { Bank } from "@/types/bank/Bank";
import type { BankRequest } from "@/types/bank/BankRequest";
import { useCallback, useEffect, useState } from "react";
import { usePaginationState } from "./usePaginationState";

const initialPageInfo: PageInfo = {
  size: 10,
  number: 0,
  totalElements: 0,
  totalPages: 0,
};

export function useBank() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);

  const {
    page,
    size,
    search,
    setPage,
    setSearch,
    goToNextPage,
    goToPreviousPage,
  } = usePaginationState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBanks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await bankService.getBanks({
        page,
        size,
        search,
      });

      setBanks(response.content);
      setPageInfo(response.page);
    } catch (err) {
      console.error("Erro ao buscar bancos:", err);
      setError("Não foi possível carregar os bancos.");
    } finally {
      setIsLoading(false);
    }
  }, [page, size, search]);

  const createBank = useCallback(
    async (payload: BankRequest) => {
      try {
        setIsSaving(true);
        setError(null);

        await bankService.saveBank(payload);

        setPage(0);
      } catch (err) {
        console.error("Erro ao cadastrar banco:", err);
        setError("Não foi possível cadastrar o banco.");
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [setPage],
  );

  const updateBank = useCallback(
    async (id: string, payload: Partial<BankRequest>) => {
      try {
        setIsSaving(true);
        setError(null);

        await bankService.editBank(id, payload);
        await fetchBanks();
      } catch (err) {
        console.error("Erro ao editar banco:", err);
        setError("Não foi possível editar o banco.");
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [fetchBanks],
  );

  const removeBank = useCallback(
    async (id: string) => {
      try {
        setIsSaving(true);
        setError(null);

        await bankService.deleteBank(id);

        const isLastItemOnPage = banks.length === 1 && page > 0;

        if (isLastItemOnPage) {
          setPage(page - 1);
        } else {
          await fetchBanks();
        }
      } catch (err) {
        console.error("Erro ao remover banco:", err);
        setError("Não foi possível remover o banco.");
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [banks.length, page, fetchBanks, setPage],
  );

  const nextPage = useCallback(() => {
    goToNextPage(pageInfo.totalPages);
  }, [goToNextPage, pageInfo.totalPages]);

  const previousPage = useCallback(() => {
    goToPreviousPage();
  }, [goToPreviousPage]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  return {
    banks,
    pageInfo,
    page,
    size,
    search,
    isLoading,
    isSaving,
    error,
    setPage,
    setSearch,
    fetchBanks,
    createBank,
    updateBank,
    removeBank,
    nextPage,
    previousPage,
  };
}
