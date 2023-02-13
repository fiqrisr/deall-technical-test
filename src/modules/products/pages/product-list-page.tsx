import Head from "next/head";
import { Title, Image, TextInput, MediaQuery } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IconSearch } from "@tabler/icons-react";

import { RECORD_PER_PAGE } from "@/configs";
import { renderBreadcrumbs } from "@/utils/render-breadcrumbs";
import { Product, BreadcrumbItem } from "@/types";

import { useProducts } from "../hooks/use-products";

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
  { accessor: "title", title: "Product Name", sortable: true },
  { accessor: "brand", title: "Brand", sortable: true },
  { accessor: "category", title: "Category", sortable: true },
  {
    accessor: "price",
    textAlignment: "right",
    sortable: true,
    render: ({ price }) =>
      price.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
  { accessor: "stock", textAlignment: "right" },
];

export const ProductListPage = () => {
  const {
    data,
    total,
    isLoading,
    limit,
    page,
    searchQuery,
    setPage,
    setLimit,
    setSearchQuery,
  } = useProducts();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Title order={1} mb="xs">
        Products
      </Title>

      {renderBreadcrumbs(breadcrumbs)}

      <MediaQuery smallerThan="xs" styles={{ width: "100%" }}>
        <TextInput
          icon={<IconSearch size={14} />}
          sx={{ width: 200 }}
          mb="md"
          defaultValue={searchQuery}
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </MediaQuery>

      <DataTable<Product>
        columns={productsTableColumns}
        records={data}
        totalRecords={total}
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
