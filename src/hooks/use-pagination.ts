import { useState, useEffect } from "react";
import { queryTypes, useQueryStates } from "next-usequerystate";

export const usePagination = () => {
  const [paginationQueryState, setPaginationQueryState] = useQueryStates({
    page: queryTypes.integer.withDefault(1),
    limit: queryTypes.integer.withDefault(10),
  });

  // for server client html mismatch occurs on first render
  const [limitState, setLimitState] = useState<number>(10);

  const { limit, page } = paginationQueryState;

  const [skip, setSkip] = useState(0);

  useEffect(() => {
    setLimitState(paginationQueryState.limit);
  }, [paginationQueryState.limit]);

  useEffect(() => {
    setSkip((page - 1) * limit);
  }, [page, limit]);

  return {
    page,
    limit: limitState,
    skip,
    setPage: (value: number) =>
      setPaginationQueryState(
        { page: value },
        { scroll: false, shallow: true }
      ),
    setLimit: (value: number) =>
      setPaginationQueryState(
        { limit: value, page: 1 },
        { scroll: false, shallow: true }
      ),
    setSkip,
  };
};
