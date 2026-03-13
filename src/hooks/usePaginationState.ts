import { useState } from "react";

export function usePaginationState(initialSize = 10) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(initialSize);
  const [search, setSearch] = useState("");

  function goToNextPage(totalPages: number) {
    setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  }

  function goToPreviousPage() {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  }

  function updateSearch(value: string) {
    setSearch(value);
    setPage(0);
  }

  return {
    page,
    size,
    search,
    setPage,
    setSize,
    setSearch: updateSearch,
    goToNextPage,
    goToPreviousPage,
  };
}