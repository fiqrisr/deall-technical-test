import React from "react";
import { ColorScheme } from "@mantine/core";

const Logo = ({ colorScheme }: { colorScheme: ColorScheme }) => {
  return (
    <svg
      fill={colorScheme === "dark" ? "#fff" : "#000"}
      width={42}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill-rule="evenodd" d="M256,48,496,464H16Z" />
    </svg>
  );
};

export { Logo };
