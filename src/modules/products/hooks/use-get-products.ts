import { useQuery } from "@tanstack/react-query";

import { BaseGetAllParams } from "@/types";
import { getProducts } from "../services/products-services";

export const useGetProducts = ({ limit, skip }: BaseGetAllParams) => {
  return useQuery(["products", limit, skip], () =>
    getProducts({ limit, skip })
  );
};
