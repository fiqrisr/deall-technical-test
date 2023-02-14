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
import { SerializersWithDefaultFactory, SetValues } from "next-usequerystate";

type ProductFiltersProps = {
  brandList: string[];
  categoryList: string[];
  filteredBrands: string[] | null;
  filteredCategories: string[] | null;
  setFilterList: SetValues<{
    brand: SerializersWithDefaultFactory<string[]>;
    category: SerializersWithDefaultFactory<string[]>;
  }>;
};

export const ProductFilters = ({
  brandList,
  categoryList,
  filteredBrands,
  filteredCategories,
  setFilterList,
}: ProductFiltersProps) => {
  const filtersForm = useForm({
    initialValues: {
      brands: filteredBrands || [],
      categories: filteredCategories || [],
    },
  });

  return (
    <form
      onSubmit={filtersForm.onSubmit(async (values) => {
        await setFilterList({
          brand: values.brands,
          category: values.categories,
        });
      })}
      onReset={async () => {
        await setFilterList({ brand: [], category: [] });
        filtersForm.setValues({ brands: [], categories: [] });
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
            <NumberInput />
            <span>—</span>
            <NumberInput />
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
