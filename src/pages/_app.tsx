import { useState } from "react";
import App, { type AppContext } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";

import { MainLayout } from "@/layouts";
import { RouterTransition } from "@/components";
import type { CustomAppProps } from "@/types";

const CustomApp = (props: CustomAppProps) => {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>Deall Technical Test</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterTransition />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

CustomApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const colorScheme: ColorScheme =
    (getCookie("mantine-color-scheme", context.ctx) as ColorScheme) || "light";

  return {
    ...appProps,
    colorScheme,
  };
};

export default CustomApp;
