import type { AppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";

export type CustomAppProps = AppProps & {
  colorScheme: ColorScheme;
};

export type NavItem = {
  link: string;
  label: string;
  icon: (props) => JSX.Element;
};
