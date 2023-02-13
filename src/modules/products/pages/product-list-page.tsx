import Head from "next/head";
import {
  Title,
  Image,
  TextInput,
  MediaQuery,
  Popover,
  Button,
  Flex,
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import { RECORD_PER_PAGE } from "@/configs";
import { renderBreadcrumbs } from "@/utils/render-breadcrumbs";
import { Product, BreadcrumbItem } from "@/types";

import { ProductFilters } from "../components/product-filters";
import { useProducts } from "../hooks/use-products";
import { useProductFilters } from "../hooks/use-product-filters";

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
  const filtersState = useProductFilters();

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
    brandList,
    categoryList,
  } = useProducts({
    filteredBrands: filtersState.filteredBrands || [],
    filteredCategories: filtersState.filteredCategories || [],
  });

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Title order={1} mb="xs">
        Products
      </Title>

      {renderBreadcrumbs(breadcrumbs)}

      <Flex justify="space-between" align="center" gap="md" mb="md">
        <MediaQuery smallerThan="xs" styles={{ width: "100%" }}>
          <TextInput
            icon={<IconSearch size={14} />}
            sx={{ width: 200 }}
            defaultValue={searchQuery}
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
        </MediaQuery>

        <Popover position="bottom-end">
          <Popover.Target>
            <Button leftIcon={<IconFilter size={18} />}>Filters</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <ProductFilters
              brandList={brandList}
              categoryList={categoryList}
              {...filtersState}
            />
          </Popover.Dropdown>
        </Popover>
      </Flex>

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
        minHeight={total > 0 ? 0 : 250}
      />
    </>
  );
};
