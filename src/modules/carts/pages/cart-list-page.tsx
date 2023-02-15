import Head from "next/head";
import {
  Title,
  Image,
  TextInput,
  MediaQuery,
  Popover,
  Button,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

import { RECORD_PER_PAGE } from "@/configs";
import { renderBreadcrumbs } from "@/utils/render-breadcrumbs";
import { Cart, BreadcrumbItem } from "@/types";

import { useCarts } from "../hooks/use-carts";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";

const breadcrumbs: BreadcrumbItem[] = [
  {
    key: "carts",
    title: "Carts",
    href: "/carts",
  },
];

const cartsTableColumns: DataTableColumn<Cart>[] = [
  { accessor: "id", title: "#" },
  { accessor: "userId", title: "User" },
  {
    accessor: "totalProducts",
    title: "Total Products",
    textAlignment: "right",
  },
  {
    accessor: "totalQuantity",
    title: "Total Quantity",
    textAlignment: "right",
  },
  {
    accessor: "total",
    title: "Total Price",
    textAlignment: "right",
    render: ({ total }) =>
      total.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
  {
    accessor: "discounteTotal",
    title: "Discounted Total",
    textAlignment: "right",
    render: ({ discountedTotal }) =>
      discountedTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  },
  {
    accessor: "actions",
    title: "Actions",
    render: ({ id }) => (
      <Link href={`/carts/${id}`}>
        <ActionIcon title="Check cart details">
          <IconEye />
        </ActionIcon>
      </Link>
    ),
  },
];

export const CartListPage = () => {
  const { data, total, isLoading, limit, page, setPaginationState } =
    useCarts();

  return (
    <>
      <Head>
        <title>Carts</title>
      </Head>

      <Title order={1} mb="xs">
        Carts
      </Title>

      {renderBreadcrumbs(breadcrumbs)}

      <DataTable<Cart>
        columns={cartsTableColumns}
        records={data}
        totalRecords={total}
        recordsPerPage={limit}
        page={page}
        onPageChange={(p) => setPaginationState({ page: p })}
        recordsPerPageOptions={RECORD_PER_PAGE}
        onRecordsPerPageChange={(v) => setPaginationState({ limit: v })}
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
