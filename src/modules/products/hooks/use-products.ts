import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePagination, useSearch } from "@/hooks";
import { Product } from "@/types";

import { getProducts } from "../services/products-services";

type useProductsArgs = {
  filteredBrands: string[];
  filteredCategories: string[];
  minPrice: number;
  maxPrice: number;
};

export const useProducts = ({
  filteredBrands = [],
  filteredCategories = [],
  minPrice,
  maxPrice,
}: useProductsArgs) => {
  const { limit, skip, page, setPage, setLimit } = usePagination();

  const { data: initialData, isLoading } = useQuery(["products"], () =>
    getProducts({ limit: 0, skip: 0 })
  );

  const [records, setRecords] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState(initialData?.total || 0);
  const [searchQuery, setSearchQuery] = useSearch("");

  const categoryList = useMemo(() => {
    if (initialData) {
      return [...new Set(initialData.products.map((p) => p.category))];
    }

    return [];
  }, [initialData]);

  const brandList = useMemo(() => {
    if (initialData) {
      return [...new Set(initialData.products.map((p) => p.brand))];
    }

    return [];
  }, [initialData]);

  useEffect(() => {
    if (!page) setPage(1);
    // trunk-ignore(eslint/react-hooks/exhaustive-deps)
  }, [totalRecords, page]);

  const filterProducts = useCallback(
    ({
      search,
      brands,
      categories,
      priceRange,
    }: {
      search: string;
      brands: string[];
      categories: string[];
      priceRange: [number, number];
    }) => {
      if (initialData) {
        let filteredProducts = [];

        filteredProducts = initialData.products.filter((product) =>
          product.title.toLowerCase().includes(search)
        );

        if (brands.length > 0 && brands[0] !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            brands.includes(product.brand)
          );
        }

        if (categories.length > 0 && categories[0] !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            categories.includes(product.category)
          );
        }

        if (priceRange[0] >= 0 && priceRange[1] > 0) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.price >= priceRange[0] && product.price <= priceRange[1]
          );
        }

        return filteredProducts;
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
      const filteredProducts = filterProducts({
        search: searchQuery,
        brands: filteredBrands,
        categories: filteredCategories,
        priceRange: [minPrice, maxPrice],
      });

      setRecords(filteredProducts.slice(skip, limit * page));
      setTotalRecords(filteredProducts.length);
    }
  }, [
    initialData,
    searchQuery,
    filteredBrands,
    filteredCategories,
    minPrice,
    maxPrice,
    limit,
    skip,
    page,
    filterProducts,
  ]);

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
    brandList,
    categoryList,
  };
};
