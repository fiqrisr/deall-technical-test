import { PropsWithChildren, useState } from "react";
import { AppShell, Navbar, Footer, Text, useMantineTheme } from "@mantine/core";

import { Header } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={<Header />}
    >
      {children}
    </AppShell>
  );
};

export { MainLayout };
