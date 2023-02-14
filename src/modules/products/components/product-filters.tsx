import {
  MultiSelect,
  Stack,
  Button,
  Text,
  Group,
  Anchor,
  NumberInput,
  Flex,
  Input,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Serializers, SetValues } from "next-usequerystate";
import { IconCurrencyDollar } from "@tabler/icons-react";

type ProductFiltersProps = {
  brandList: string[];
  categoryList: string[];
  filteredBrands: string[] | null;
  filteredCategories: string[] | null;
  minPrice: number;
  maxPrice: number;
  setFilterList: SetValues<{
    brand: Serializers<string[]>;
    category: Serializers<string[]>;
    minPrice: Serializers<number>;
    maxPrice: Serializers<number>;
  }>;
};

export const ProductFilters = ({
  brandList,
  categoryList,
  filteredBrands,
  filteredCategories,
  minPrice,
  maxPrice,
  setFilterList,
}: ProductFiltersProps) => {
  const filtersForm = useForm({
    initialValues: {
      brands: filteredBrands || [],
      categories: filteredCategories || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    },
  });

  return (
    <form
      onSubmit={filtersForm.onSubmit(async (values) => {
        await setFilterList({
          brand: values.brands,
          category: values.categories,
          minPrice: values.minPrice,
          maxPrice: values.maxPrice,
        });
      })}
      onReset={async () => {
        await setFilterList({
          brand: [],
          category: [],
          minPrice: 0,
          maxPrice: 0,
        });
        filtersForm.setValues({
          brands: [],
          categories: [],
          minPrice: 0,
          maxPrice: 0,
        });
      }}
      style={{ maxWidth: 280 }}
    >
      <Text weight="500" mb="md">
        Filters
      </Text>
      <Stack>
        <MultiSelect
          label="Brands"
          data={brandList}
          {...filtersForm.getInputProps("brands")}
        />
        <MultiSelect
          label="Categories"
          data={categoryList}
          {...filtersForm.getInputProps("categories")}
        />

        <Input.Wrapper label="Price">
          <Flex gap="md" align="center" justify="space-between" wrap="nowrap">
            <NumberInput
              {...filtersForm.getInputProps("minPrice")}
              min={0}
              icon={<IconCurrencyDollar size={16} />}
            />
            <span>—</span>
            <NumberInput
              {...filtersForm.getInputProps("maxPrice")}
              min={0}
              icon={<IconCurrencyDollar size={16} />}
            />
          </Flex>
        </Input.Wrapper>
      </Stack>

      <Group position="apart" mt="xl">
        <Anchor component="button" color="gray" size="sm" type="reset">
          Reset
        </Anchor>
        <Button type="submit" size="sm">
          Apply
        </Button>
      </Group>
    </form>
  );
};
