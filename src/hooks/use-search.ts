import { useDebouncedState } from "@mantine/hooks";
import { useQueryState } from "next-usequerystate";
import { useEffect } from "react";

export const useSearch = (value: string): [string, (v: string) => void] => {
  const [query, setQuery] = useQueryState("search");
  const [debouncedValue, setDebouncedValue] = useDebouncedState(
    query || value,
    250
  );

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  return [debouncedValue, setDebouncedValue];
};
