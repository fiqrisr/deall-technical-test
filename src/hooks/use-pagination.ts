import { useState, useEffect } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    setSkip((page - 1) * limit);
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  return {
    page,
    limit,
    skip,
    setPage,
    setLimit,
    setSkip,
  };
};
