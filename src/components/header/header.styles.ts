import { createStyles } from "@mantine/core";

export const useHeaderStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },

  mainContentContainer: {
    height: "100%",
    width: "100%",
    padding: `0 ${theme.spacing.sm}px`,
  },

  logo: {
    display: "flex",
    alignItems: "center",
  },
}));
