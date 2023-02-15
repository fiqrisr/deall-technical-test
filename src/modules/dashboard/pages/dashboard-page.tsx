import Head from "next/head";
import { Title } from "@mantine/core";

import { renderBreadcrumbs } from "@/utils/render-breadcrumbs";
import { BreadcrumbItem } from "@/types";

import { useProducts } from "../hooks/use-products";
import { CategoryChart } from "../components/category-chart";
import { BrandChart } from "../components/brand-chart";

const breadcrumbs: BreadcrumbItem[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
  },
];

export const DashboardPage = () => {
  const { isLoading } = useProducts();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Title order={1} mb="xs">
        Dashboard
      </Title>

      {renderBreadcrumbs(breadcrumbs)}

      <BrandChart isLoading={isLoading} />
      <CategoryChart isLoading={isLoading} />
    </>
  );
};
