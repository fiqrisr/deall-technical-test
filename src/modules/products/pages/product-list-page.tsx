import { useEffect, useState } from "react";
import Head from "next/head";
import { Title, Image } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

import { RECORD_PER_PAGE } from "@/configs";
import { usePagination } from "@/hooks";
import { renderBreadcrumbs } from "@/utils/render-breadcrumbs";
import { Product, BreadcrumbItem } from "@/types";

import { useGetProducts } from "../hooks/use-get-products";

const breadcrumbs: BreadcrumbItem[] = [
  {
    key: "product",
    title: "Products",
    href: "/products",
  },
];

const productsTableColumns: DataTableColumn<Product>[] = [
  {
    accessor: "thumbnail",
    title: "",
    width: 65,
    render: ({ thumbnail, title }) => (
      <Image src={thumbnail} alt={title} width={40} />
    ),
  },
  { accessor: "title", title: "Product Name" },
  { accessor: "brand", title: "Brand" },
  { accessor: "category", title: "Category" },
  {
    accessor: "price",
    textAlignment: "right",
    render: ({ price }) =>
      price.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
  { accessor: "stock", textAlignment: "right" },
];

export const ProductListPage = () => {
  const { limit, skip, page, setPage, setLimit } = usePagination();
  const { data, isLoading } = useGetProducts({ limit: 0, skip: 0 });
  const [records, setRecords] = useState<Product[]>([]);

  useEffect(() => {
    if (data) setRecords(data.products.slice(skip, limit * page));
  }, [data, limit, skip, page]);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Title order={1} mb="xs">
        Products
      </Title>

      {renderBreadcrumbs(breadcrumbs)}

      <DataTable<Product>
        columns={productsTableColumns}
        records={records}
        totalRecords={data?.total || 0}
        recordsPerPage={limit}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={RECORD_PER_PAGE}
        onRecordsPerPageChange={setLimit}
        withBorder
        borderRadius="md"
        horizontalSpacing="xl"
        verticalSpacing="md"
        fetching={isLoading}
        minHeight={250}
      />
    </>
  );
};
