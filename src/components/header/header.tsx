import Link from "next/link";
import {
  ActionIcon,
  Group,
  Header as MantineHeader,
  useMantineColorScheme,
  createStyles,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import { Logo } from "./logo";

const useStyles = createStyles(() => ({
  logo: {
    display: "flex",
    alignItems: "center",
  },
}));

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
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
    </MantineHeader>
  );
};

export { Header };
