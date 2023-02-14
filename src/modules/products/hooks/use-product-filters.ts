import { queryTypes, useQueryState, useQueryStates } from "next-usequerystate";

export const useProductFilters = () => {
  const [filterList, setFilterList] = useQueryStates(
    {
      brand: queryTypes.array(queryTypes.string).withDefault([]),
      category: queryTypes.array(queryTypes.string).withDefault([]),
    },
    { history: "push" }
  );

  // const [filteredBrands, setFilteredBrands] = useQueryState(
  //   "brand",
  //   queryTypes.array(queryTypes.string)
  // );

  // const [filteredCategories, setFilteredCategories] = useQueryState(
  //   "category",
  //   queryTypes.array(queryTypes.string)
  // );

  return {
    filteredBrands: filterList.brand,
    filteredCategories: filterList.category,
    setFilterList,
  };
};
