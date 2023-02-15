import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/services";

export const useProducts = () => {
  const { data: initialData, isLoading } = useQuery(["products"], () =>
    getProducts({ limit: 0, skip: 0 })
  );

  const [brandDataset, setBrandDataset] = useState<Record<string, number>>({});
  const [categoryDataset, setCategoryDataset] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (initialData) {
      const { products } = initialData;
      let brandData: Record<string, number> = {};
      let categoryData: Record<string, number> = {};

      products.forEach((p) => {
        if (brandData[p.brand]) brandData[p.brand] = brandData[p.brand] += 1;
        else brandData[p.brand] = 1;

        if (categoryData[p.category])
          categoryData[p.category] = categoryData[p.category] += 1;
        else categoryData[p.category] = 1;
      });

      setBrandDataset(brandData);
      setCategoryDataset(categoryData);
    }
  }, [initialData]);

  return {
    brandDataset,
    categoryDataset,
    isLoading,
  };
};
