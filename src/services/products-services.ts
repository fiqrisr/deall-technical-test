import { httpClient } from "@/http";
import { BaseGetAllParams, BaseResponse, Product } from "@/types";

export const getProducts = async ({ limit, skip }: BaseGetAllParams) => {
  return await httpClient
    .get("products", {
      searchParams: {
        limit,
        skip,
      },
    })
    .json<BaseResponse & { products: Product[] }>();
};
