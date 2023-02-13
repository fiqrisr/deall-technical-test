import { MultiSelect, Stack, Button, Text, Group, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";

type ProductFiltersProps = {
  brandList: string[];
  categoryList: string[];
  filteredBrands: string[] | null;
  filteredCategories: string[] | null;
  setFilteredBrands: (value: string[]) => Promise<boolean>;
  setFilteredCategories: (value: string[]) => Promise<boolean>;
};

export const ProductFilters = ({
  brandList,
  categoryList,
  filteredBrands,
  filteredCategories,
  setFilteredBrands,
  setFilteredCategories,
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
        await setFilteredBrands(values.brands);
        await setFilteredCategories(values.categories);
      })}
      onReset={async () => {
        await setFilteredBrands([]);
        await setFilteredCategories([]);
        filtersForm.reset();
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
