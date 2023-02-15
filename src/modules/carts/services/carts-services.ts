import { httpClient } from "@/http";
import { BaseGetAllParams, BaseResponse, Cart } from "@/types";

export const getCarts = async ({ limit, skip }: BaseGetAllParams) => {
  return await httpClient
    .get("carts", {
      searchParams: {
        limit,
        skip,
      },
    })
    .json<BaseResponse & { carts: Cart[] }>();
};

export const getOneCart = async (id: number) => {
  return await httpClient.get(`carts/${id}`).json<Cart>();
};
