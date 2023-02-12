import { PropsWithChildren, useState } from "react";
import { AppShell, Container, useMantineTheme } from "@mantine/core";

import { Header, Navbar } from "@/components";
import { NAV_ITEMS } from "@/configs";

const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();
  const [navbarOpened, setNavbarOpened] = useState(false);

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
      navbar={<Navbar navItems={NAV_ITEMS} hidden={!navbarOpened} />}
      header={
        <Header navbarOpened={navbarOpened} setNavbarOpened={setNavbarOpened} />
      }
    >
      <Container size="xl">{children}</Container>
    </AppShell>
  );
};

export { MainLayout };
