import { queryTypes, useQueryStates } from "next-usequerystate";

export const useProductFilters = () => {
  const [filterList, setFilterList] = useQueryStates(
    {
      brand: queryTypes.array(queryTypes.string).withDefault([]),
      category: queryTypes.array(queryTypes.string).withDefault([]),
      minPrice: queryTypes.integer.withDefault(0),
      maxPrice: queryTypes.integer.withDefault(0),
    },
    { history: "push" }
  );

  return {
    filteredBrands: filterList.brand,
    filteredCategories: filterList.category,
    minPrice: filterList.minPrice,
    maxPrice: filterList.maxPrice,
    setFilterList,
  };
};
