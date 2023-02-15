import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePagination } from "@/hooks";
import { Cart, CartProduct } from "@/types";

import { getCarts, getOneCart } from "../services/carts-services";

export const useCarts = () => {
  const { limit, skip, page, setPaginationState } = usePagination();

  const { data: initialData, isLoading } = useQuery(["carts"], () =>
    getCarts({ limit: 0, skip: 0 })
  );

  const [records, setRecords] = useState<Cart[]>([]);
  const [totalRecords, setTotalRecords] = useState(initialData?.total || 0);

  useEffect(() => {
    if (initialData) {
      setRecords(initialData.carts.slice(skip, limit * page));
      setTotalRecords(initialData.total);
    }
  }, [initialData, limit, skip, page]);

  return {
    data: records,
    total: totalRecords,
    isLoading,
    limit,
    page,
    setPaginationState,
  };
};

export const useOneCart = (id: number) => {
  const { data: initialData, ...result } = useQuery(["carts", id], () =>
    getOneCart(id)
  );

  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (initialData) {
      setProducts(initialData.products);
    }
  }, [initialData]);

  return { data: initialData, products, ...result };
};
