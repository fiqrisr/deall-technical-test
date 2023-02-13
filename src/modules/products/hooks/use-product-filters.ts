import { queryTypes, useQueryState } from "next-usequerystate";

export const useProductFilters = () => {
  const [filteredBrands, setFilteredBrands] = useQueryState(
    "brand",
    queryTypes.array(queryTypes.string)
  );

  const [filteredCategories, setFilteredCategories] = useQueryState(
    "category",
    queryTypes.array(queryTypes.string)
  );

  return {
    filteredBrands,
    filteredCategories,
    setFilteredBrands,
    setFilteredCategories,
  };
};
