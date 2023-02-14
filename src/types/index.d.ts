import type { AppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";

export type CustomAppProps = AppProps & {
  colorScheme: ColorScheme;
};

export type NavItem = {
  link: string;
  label: string;
  icon: (props) => JSX.Element;
};

export type BreadcrumbItem = {
  key: string;
  title?: string;
  href: string;
};

export type BaseGetAllParams = {
  limit: number;
  skip: number;
};

export type BaseResponse = Required<BaseGetAllParams> & {
  total: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
