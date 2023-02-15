import Head from "next/head";
import { useRouter } from "next/router";
import {
  Skeleton,
  Grid,
  Flex,
  Title,
  Card,
  Text,
  createStyles,
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

import { CartProduct } from "@/types";

import { useOneCart } from "../hooks/use-carts";

const useStyles = createStyles((theme) => ({
  label: {
    fontWeight: 700,
    lineHeight: 1.5,
  },

  lead: {
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },
}));

const productsTableColumns: DataTableColumn<CartProduct>[] = [
  { accessor: "title", title: "Product Name" },
  { accessor: "quantity", textAlignment: "right" },
  {
    accessor: "price",
    textAlignment: "right",
    render: ({ price }) =>
      price.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
  {
    accessor: "discountPercentage",
    title: "Discount",
    textAlignment: "right",
    render: ({ discountPercentage }) => `${discountPercentage} %`,
  },
  {
    accessor: "discountedPrice",
    title: "Total",
    textAlignment: "right",
    render: ({ discountedPrice }) =>
      discountedPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  },
];

export const CartDetailPage = () => {
  const { query } = useRouter();
  const { classes } = useStyles();

  const { data, products, isLoading } = useOneCart(
    parseInt(query.id as string, 10)
  );

  return (
    <>
      <Head>
        <title>Carts</title>
      </Head>

      <Skeleton visible={isLoading} width={120}>
        <Title order={1} mb="xs">
          Cart {data && data.id}
        </Title>
      </Skeleton>

      <Grid mt="xl">
        <Grid.Col span={12} md={5} lg={4}>
          <Card withBorder p="xl" radius="md">
            <Text size="xl" className={classes.label}>
              Details
            </Text>

            <Grid mt="sm">
              <Grid.Col span={6}>
                <Text size="xs" color="dimmed" mt={5}>
                  User
                </Text>
                <Skeleton visible={isLoading} height={30} width={70}>
                  <Text className={classes.lead}>{data?.userId}</Text>
                </Skeleton>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" color="dimmed" mt={5}>
                  Added On
                </Text>
                <Skeleton visible={isLoading} height={30} width={115}>
                  <Text className={classes.lead}>15 Feb</Text>
                </Skeleton>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" color="dimmed" mt={5}>
                  Total Items
                </Text>
                <Skeleton visible={isLoading} height={30} width={50}>
                  <Text className={classes.lead}>{data?.totalQuantity}</Text>
                </Skeleton>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" color="dimmed" mt={5}>
                  Total Price
                </Text>
                <Skeleton visible={isLoading} height={30} width={160}>
                  <Text className={classes.lead}>
                    {data?.total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Text>
                </Skeleton>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={7} lg={8}>
          <DataTable<CartProduct>
            columns={productsTableColumns}
            records={products}
            withBorder
            borderRadius="md"
            horizontalSpacing="xl"
            verticalSpacing="md"
            fetching={isLoading}
            minHeight={products.length > 0 ? 0 : 250}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
