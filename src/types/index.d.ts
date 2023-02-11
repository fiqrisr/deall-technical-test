import type { AppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";

export type CustomAppProps = AppProps & {
  colorScheme: ColorScheme;
};
