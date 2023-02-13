import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePagination, useSearch } from "@/hooks";
import { Product } from "@/types";

import { getProducts } from "../services/products-services";

export const useProducts = () => {
  const { limit, skip, page, setPage, setLimit } = usePagination();

  const { data: initialData, isLoading } = useQuery(["products"], () =>
    getProducts({ limit: 0, skip: 0 })
  );

  const [records, setRecords] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(initialData?.total || 0);
  const [searchQuery, setSearchQuery] = useSearch("");

  const searchProducts = useCallback(
    (search: string) => {
      if (initialData) {
        return initialData.products.filter((product) =>
          product.title.toLowerCase().includes(search)
        );
      }

      return [];
    },
    [initialData]
  );

  useEffect(() => {
    if (initialData) {
      setRecords(initialData.products.slice(skip, limit * page));
      setTotalRecords(initialData.total);
    }
  }, [initialData, limit, skip, page]);

  useEffect(() => {
    if (initialData) {
      const filteredProducts = searchProducts(searchQuery);
      setRecords(filteredProducts.slice(skip, limit * page));
      setTotalRecords(filteredProducts.length);
    }
  }, [initialData, searchQuery, limit, skip, page, searchProducts]);

  useEffect(() => {
    setPage(1);
    // trunk-ignore(eslint/react-hooks/exhaustive-deps)
  }, [totalRecords]);

  return {
    data: records,
    total: totalRecords,
    isLoading,
    limit,
    page,
    searchQuery,
    setPage,
    setLimit,
    setSearchQuery,
  };
};
