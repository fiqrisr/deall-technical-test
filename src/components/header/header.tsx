import { useState } from "react";
import Link from "next/link";
import {
  ActionIcon,
  Group,
  Burger,
  Header as MantineHeader,
  MediaQuery,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import { Logo } from "./logo";
import { useHeaderStyles } from "./header.styles";

const Header = () => {
  const [navbarOpened, setNavbarOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useHeaderStyles();
  const theme = useMantineTheme();

  return (
    <MantineHeader height={60} px="md">
      <div className={classes.container}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={navbarOpened}
            onClick={() => setNavbarOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="sm"
          />
        </MediaQuery>
        <Group className={classes.mainContentContainer} position="apart">
          <Link href="/" className={classes.logo}>
            <Logo colorScheme={colorScheme} />
          </Link>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? (
              <IconSun size={16} />
            ) : (
              <IconMoonStars size={16} />
            )}
          </ActionIcon>
        </Group>
      </div>
    </MantineHeader>
  );
};

export { Header };
