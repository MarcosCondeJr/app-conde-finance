import { bankService } from "@/services/bank.service";
import type { BankRequest } from "@/types/bank/BankRequest";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { BankFilters } from "@/types/bank/BankFilters";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { BankListResponse } from "@/types/bank/BankListResponse";

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
  const [searchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Math.max(pageParam - 1, 0);

  const size = Number(searchParams.get("size") || 10);
  const sort = searchParams.get("sort") || "id";
  const direction = searchParams.get("direction") || "asc";
  const name = searchParams.get("name") || "";
  const code = searchParams.get("code") || "";
  // const active = searchParams.get("active") || "" ;

  const filters = {
    ...initialFilters,
    page,
    size,
    sort,
    direction,
    name,
    code
    // active,
  };

  const { data, isLoading } = useQuery<BankListResponse>({
    queryKey: ["get-banks", filters],
    queryFn: async () => {
      const response = await bankService.getBanks(filters);

      await new Promise((resolve) => setTimeout(resolve, 500));

      return response;
    },
    placeholderData: keepPreviousData,
  });

  const createBank = useCallback(async (payload: BankRequest) => {
    try {
      await bankService.saveBank(payload);
      // clearFilters();
    } catch (err) {
      console.error("Erro ao cadastrar banco:", err);
      throw err;
    }
  }, []);

  const updateBank = useCallback(
    async (id: string, payload: Partial<BankRequest>) => {
      try {
        await bankService.editBank(id, payload);
        // clearFilters();
      } catch (err) {
        console.error("Erro ao editar banco:", err);
        throw err;
      }
    },
    [],
  );

  const removeBank = useCallback(async (id: string) => {
    try {
      await bankService.deleteBank(id);
      // clearFilters();
    } catch (err) {
      console.error("Erro ao remover banco:", err);
      throw err;
    }
  }, []);

  // function clearFilters() {
  //   updateSearchParams(initialFilters);
  // }

  // function changePage(page: number) {
  //   updateSearchParams({
  //     ...filters,
  //     page,
  //   });
  // }

  // function changeSorting(sort: string) {
  //   updateSearchParams({
  //     ...filters,
  //     page: 0,
  //     sort,
  //     direction:
  //       filters.sort === sort
  //         ? filters.direction === "asc"
  //           ? "desc"
  //           : "asc"
  //         : "asc",
  //   });
  // }

  // function updateFilter<K extends keyof BankFilters>(
  //   key: K,
  //   value: BankFilters[K],
  // ) {
  //   updateSearchParams({
  //     ...filters,
  //     [key]: value,
  //     page: key === "page" ? Number(value) : 0,
  //   });
  // }

  return {
    banks: data?.content ?? [],
    page: pageParam,
    totalPages: data?.page.totalPages ?? 0,
    totalElements: data?.page.totalElements ?? 0,
    isLoading,
    // filters,
    // isLoading,
    // updateFilter,
    // clearFilters,
    // changeSorting,
    createBank,
    updateBank,
    removeBank,
  };
}
