import { QueryCache, QueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      showNotification({
        title: "Something went wrong",
        message: err?.message || "Try again later",
        color: "red",
        autoClose: 6000,
      });
    },
  }),
});
