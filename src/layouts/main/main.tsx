import { PropsWithChildren, useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";

import { Header, Navbar } from "@/components";
import { NAV_ITEMS } from "@/configs";

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
      navbar={<Navbar navItems={NAV_ITEMS} hidden={!opened} />}
      header={<Header />}
    >
      {children}
    </AppShell>
  );
};

export { MainLayout };
