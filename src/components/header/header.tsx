import {
  ActionIcon,
  Group,
  Header as MantineHeader,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import { Logo } from "./logo";

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader height={50}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Logo colorScheme={colorScheme} />
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
